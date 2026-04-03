"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { PageShell } from "@/components/common/page-shell";
import { ProgressRing } from "@/components/charts/progress-ring";
import { calculateAssessmentResult, getInsights } from "@/lib/scoring";
import { loadAssessment, resetAssessment } from "@/lib/storage";
import { StoredAssessment } from "@/types/tasse";

export function ResultsDashboard() {
  const [stored] = useState<StoredAssessment | null>(() => loadAssessment());

  if (!stored) {
    return (
      <PageShell>
        <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-950/65 p-8 text-center">
          <p className="text-slate-300">Loading assessment analytics...</p>
        </section>
      </PageShell>
    );
  }

  if (!stored.submittedAt) {
    return (
      <PageShell>
        <section className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-slate-950/65 p-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">No Submitted Assessment</p>
          <h1 className="mt-3 font-display text-4xl text-slate-100">Results will appear after submission</h1>
          <p className="mt-4 text-slate-300">
            Complete the 5-domain assessment flow to generate your executive analytics dashboard.
          </p>
          <Link
            href="/assessment"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-900"
          >
            Start Assessment <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </PageShell>
    );
  }

  const result = calculateAssessmentResult(stored.answers, stored.submittedAt);
  const insights = getInsights(stored.answers);

  const radarData = result.domains.map((domain) => ({
    domain: domain.title.split(" ")[0],
    score: domain.score,
  }));

  const barData = result.domains.map((domain) => ({
    domain: domain.title,
    score: domain.score,
  }));

  const submittedLabel = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(result.submittedAt ?? new Date().toISOString()));

  const strongestFocus = insights.strongestAreas.map((domain) => domain.title).join(" • ");

  return (
    <PageShell>
      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Final Vulnerability Score</p>
          <h1 className="mt-3 font-display text-4xl text-slate-100 md:text-5xl">Executive Results Dashboard</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            Interpretable board-level view of risk exposure across all five TASSE domains.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Total Score</p>
              <p className="mt-2 text-3xl font-semibold text-slate-100">{result.totalScore}/100</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Questions Completed</p>
              <p className="mt-2 text-3xl font-semibold text-slate-100">{result.completedQuestions}/50</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Assessment Date</p>
              <p className="mt-2 text-lg font-semibold text-slate-100">{submittedLabel}</p>
            </div>
          </div>

          <p className="mt-6 rounded-2xl border border-cyan-300/30 bg-cyan-400/10 p-4 text-sm leading-relaxed text-cyan-100">
            {result.globalStatement}
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 md:p-8">
          <div className="flex items-center justify-center">
            <ProgressRing value={result.totalScore} max={100} size={180} label="Total" />
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {result.domains.map((domain) => {
              const width = Math.round((domain.score / domain.maxScore) * 100);
              return (
                <article
                  key={domain.categoryId}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                >
                  <p className="text-sm font-semibold text-slate-100">{domain.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{domain.level}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-cyan-200">{domain.score}/20</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">Radar Overview</p>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(148, 163, 184, 0.32)" />
                <PolarAngleAxis dataKey="domain" tick={{ fill: "#e2e8f0", fontSize: 12 }} />
                <Radar
                  dataKey="score"
                  stroke="#22d3ee"
                  fill="#14b8a6"
                  fillOpacity={0.35}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-400">Domain Comparison</p>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 10 }}>
                <CartesianGrid stroke="rgba(148, 163, 184, 0.15)" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 20]}
                  tick={{ fill: "#cbd5e1", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="domain"
                  width={130}
                  tick={{ fill: "#e2e8f0", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(14, 165, 233, 0.08)" }}
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(148, 163, 184, 0.25)",
                    borderRadius: "12px",
                    color: "#e2e8f0",
                  }}
                />
                <Bar dataKey="score" radius={[6, 6, 6, 6]} fill="url(#barGradient)" />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Top Risk Exposures</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {insights.topRiskExposures.map((domain) => (
              <li key={domain.categoryId} className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                <p className="font-semibold">{domain.title}</p>
                <p className="mt-1 text-xs text-slate-400">Score {domain.score}/20 · {domain.level}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-rose-200">Immediate Attention</p>
          <p className="mt-2 text-sm text-slate-300">
            {insights.immediateAttention.length > 0
              ? insights.immediateAttention.map((domain) => domain.title).join(" • ")
              : "No domain currently in significant or severe range."}
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recommended Focus</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{insights.governanceSummary}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {insights.recommendations.map((item) => (
              <li key={item} className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs uppercase tracking-[0.16em] text-amber-200">Moderate Concern Areas</p>
          <p className="mt-2 text-sm text-slate-300">
            {insights.moderateConcerns.length > 0
              ? insights.moderateConcerns.map((domain) => domain.title).join(" • ")
              : "No domain currently in the moderate band."}
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Strongest Areas</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Domains currently showing stronger insulation: {strongestFocus}.
          </p>
          <div className="mt-3 space-y-2">
            {insights.strongestAreas.map((domain) => (
              <div
                key={domain.categoryId}
                className="rounded-xl border border-white/10 bg-slate-900/70 p-3"
              >
                <p className="font-semibold text-slate-100">{domain.title}</p>
                <p className="mt-1 text-xs text-teal-200">
                  Score {domain.score}/20 · {domain.level}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-200">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Executive Actions
            </p>
            <h2 className="mt-2 font-display text-3xl text-slate-100">Next Strategic Move</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-base">
              Convert this dashboard into a printable board brief and align action owners for the
              highest-risk domains in the next governance cycle.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/report"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-900"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Report View
            </Link>
            <Link
              href="/assessment"
              onClick={() => resetAssessment()}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:border-slate-400"
            >
              Start New Assessment
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
