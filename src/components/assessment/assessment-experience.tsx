"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, ArrowRight, RotateCcw, Save } from "lucide-react";
import { PageShell } from "@/components/common/page-shell";
import { ProgressRing } from "@/components/charts/progress-ring";
import { ScoringLegend } from "@/components/assessment/scoring-legend";
import { riskOptions, tasseFramework } from "@/data/tasse-framework";
import {
  calculateAssessmentResult,
  getAnsweredCount,
  getDomainResults,
} from "@/lib/scoring";
import {
  loadAssessment,
  resetAssessment,
  saveAssessmentDraft,
  submitAssessment,
} from "@/lib/storage";
import { AssessmentAnswers, RiskScore } from "@/types/tasse";

const TOTAL_STEPS = tasseFramework.categories.length + 1;

export function AssessmentExperience() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AssessmentAnswers>(() => loadAssessment().answers);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    saveAssessmentDraft(answers);
  }, [answers]);

  const answeredCount = getAnsweredCount(answers);
  const completionPercent = Math.round(
    (answeredCount / (tasseFramework.categories.length * 10)) * 100,
  );
  const isReviewStep = activeStep === tasseFramework.categories.length;
  const currentCategory = tasseFramework.categories[activeStep];
  const domainResults = getDomainResults(answers);
  const currentDomainResult =
    !isReviewStep && currentCategory
      ? domainResults.find((item) => item.categoryId === currentCategory.id)
      : undefined;

  const currentDomainUnanswered = useMemo(() => {
    if (!currentCategory) {
      return [];
    }

    return currentCategory.questions.filter((question) => answers[question.id] === undefined);
  }, [answers, currentCategory]);

  const setScore = (questionId: string, score: RiskScore) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: score,
    }));
    setError(null);
  };

  const goNext = () => {
    if (!isReviewStep && currentDomainUnanswered.length > 0) {
      setError(
        `Please answer all questions in ${currentCategory.title} before continuing.`,
      );
      return;
    }

    setError(null);
    setActiveStep((step) => Math.min(step + 1, TOTAL_STEPS - 1));
  };

  const goPrevious = () => {
    setError(null);
    setActiveStep((step) => Math.max(step - 1, 0));
  };

  const handleSubmit = () => {
    const totalQuestions = tasseFramework.categories.length * 10;

    if (answeredCount < totalQuestions) {
      setError("All 50 questions must be answered before submitting the final score.");
      const firstIncomplete = tasseFramework.categories.findIndex((category) =>
        category.questions.some((question) => answers[question.id] === undefined),
      );
      if (firstIncomplete >= 0) {
        setActiveStep(firstIncomplete);
      }
      return;
    }

    submitAssessment(answers);
    router.push("/results");
  };

  const handleReset = () => {
    resetAssessment();
    setAnswers({});
    setActiveStep(0);
    setError(null);
  };

  const totalResult = calculateAssessmentResult(answers);

  return (
    <PageShell>
      <section className="mb-8 rounded-3xl border border-white/10 bg-slate-950/55 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">TASSE Assessment Flow</p>
            <h1 className="mt-2 font-display text-3xl text-slate-100 md:text-4xl">
              Board-Level Vulnerability Assessment
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
              Rate each question as Negligible (0), Moderate (1), or Severe (2). Domain scores
              are calculated out of 20 and rolled into a total score out of 100.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-300/40 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-400">
              <span>
                Progress: {answeredCount}/50 questions
              </span>
              <span>{completionPercent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>

          <p className="inline-flex items-center gap-2 text-xs text-slate-400">
            <Save className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            Draft auto-saved locally
          </p>
        </div>

        <div className="mt-5">
          <ScoringLegend />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.75fr_1fr]">
        <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Step {activeStep + 1} of {TOTAL_STEPS}
            </p>
            {!isReviewStep && currentCategory ? (
              <p className="text-sm font-semibold text-cyan-200">
                {currentCategory.shortTitle}
                {currentDomainResult ? ` · ${currentDomainResult.score}/20` : ""}
              </p>
            ) : (
              <p className="text-sm font-semibold text-teal-200">Review & Submit</p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!isReviewStep && currentCategory ? (
              <motion.div
                key={currentCategory.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
              >
                <h2 className="font-display text-3xl text-slate-100">{currentCategory.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-base">
                  {currentCategory.description}
                </p>

                <div className="mt-6 space-y-3">
                  {currentCategory.questions.map((question, index) => (
                    <article
                      key={question.id}
                      className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/45 p-4 shadow-lg shadow-slate-950/35 transition hover:border-cyan-300/30"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <p className="max-w-3xl text-sm leading-relaxed text-slate-100 md:text-base">
                          <span className="mr-2 text-cyan-300">{index + 1}.</span>
                          {question.text}
                        </p>

                        <div className="flex gap-2" role="radiogroup" aria-label={question.text}>
                          {riskOptions.map((option) => {
                            const selected = answers[question.id] === option.value;
                            const tone =
                              option.value === 0
                                ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-100"
                                : option.value === 1
                                  ? "border-amber-300/40 bg-amber-400/10 text-amber-100"
                                  : "border-rose-300/45 bg-rose-400/10 text-rose-100";

                            return (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => setScore(question.id, option.value)}
                                className={[
                                  "min-w-[112px] rounded-xl border px-3 py-2 text-left text-xs transition-transform duration-200",
                                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300",
                                  selected
                                    ? `${tone} scale-[1.02] shadow-md shadow-black/30`
                                    : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500 hover:-translate-y-0.5",
                                ].join(" ")}
                                aria-pressed={selected}
                                aria-label={`${option.label} score ${option.value}`}
                              >
                                <span className="block font-semibold">{option.label}</span>
                                <span className="mt-1 block text-[11px] text-slate-400">
                                  {option.hint}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <h2 className="font-display text-3xl text-slate-100">Review Before Submission</h2>
                <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                  Confirm your domain coverage and scores. You can jump back to any domain to
                  adjust responses before generating the final dashboard.
                </p>

                <div className="space-y-3">
                  {domainResults.map((domain, index) => (
                    <div
                      key={domain.categoryId}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                    >
                      <div>
                        <p className="font-semibold text-slate-100">{domain.title}</p>
                        <p className="text-sm text-slate-400">
                          Score {domain.score}/20 · {domain.level} · {domain.completion}% complete
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveStep(index)}
                        className="rounded-xl border border-slate-600 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                      >
                        Edit Domain
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error ? (
            <p className="mt-5 inline-flex items-center gap-2 rounded-xl border border-amber-300/45 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              {error}
            </p>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrevious}
              disabled={activeStep === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </button>

            {isReviewStep ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:brightness-105"
              >
                Submit Assessment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:brightness-105"
              >
                Next
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Live Total Score</p>
            <div className="mt-4 flex justify-center">
              <ProgressRing value={totalResult.totalScore} max={100} label="Total" />
            </div>
            <p className="mt-4 text-center text-sm text-slate-300">{totalResult.globalStatement}</p>
            <div className="mt-4 rounded-xl border border-cyan-300/25 bg-cyan-400/10 p-3 text-xs text-cyan-100">
              Threshold bands: 0-20 proactive, 21-40 insulated, 41-60 gaps to address, 61-80 serious gaps, 81-100 likely unprepared.
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Domain Completion</p>
            <div className="mt-4 space-y-3">
              {domainResults.map((domain, index) => (
                <button
                  key={domain.categoryId}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/50 p-3 text-left transition hover:border-cyan-300/55"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-200">{domain.title}</p>
                    <p className="text-xs text-cyan-200">{domain.score}/20</p>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 transition-all"
                      style={{ width: `${domain.completion}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{domain.level}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
