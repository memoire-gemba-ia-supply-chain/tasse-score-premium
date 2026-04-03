"use client";

import Link from "next/link";
import { useState } from "react";
import { Printer } from "lucide-react";
import { calculateAssessmentResult, getInsights } from "@/lib/scoring";
import { loadAssessment } from "@/lib/storage";
import { StoredAssessment } from "@/types/tasse";

export function ExecutiveReport() {
  const [stored] = useState<StoredAssessment | null>(() => loadAssessment());

  if (!stored) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-300 bg-white p-8 text-center text-slate-800 shadow-xl">
        <p className="text-slate-600">Loading report data...</p>
      </div>
    );
  }

  if (!stored.submittedAt) {
    return (
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-300 bg-white p-8 text-center text-slate-800 shadow-xl">
        <h1 className="font-display text-4xl text-slate-900">Executive Report</h1>
        <p className="mt-4 text-slate-600">
          No submitted assessment found. Complete an assessment first to generate this report.
        </p>
        <Link
          href="/assessment"
          className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Start Assessment
        </Link>
      </div>
    );
  }

  const result = calculateAssessmentResult(stored.answers, stored.submittedAt);
  const insights = getInsights(stored.answers);

  const submittedLabel = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(stored.submittedAt));

  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl md:p-10 print:rounded-none print:border-none print:shadow-none">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">TASSE Executive Report</p>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          Print / Save PDF
        </button>
      </div>

      <header className="border-b border-slate-200 pb-6">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Governance Risk Intelligence</p>
        <h1 className="mt-2 font-display text-5xl text-slate-950">TASSE Score Report</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          Structured risk vulnerability assessment across technological threats, adverse media,
          supply chain exposure, social responsibility, and ethical dilemma pressure.
        </p>
        <p className="mt-4 text-sm text-slate-500">Date of assessment: {submittedLabel}</p>
      </header>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Total Score</p>
          <p className="mt-2 text-4xl font-semibold">{result.totalScore}/100</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Global Interpretation</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{result.globalStatement}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Completion</p>
          <p className="mt-2 text-4xl font-semibold">{result.completedQuestions}/50</p>
        </article>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-3xl text-slate-950">Domain Scores</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Domain</th>
                <th className="px-4 py-3 font-semibold">Score / 20</th>
                <th className="px-4 py-3 font-semibold">Risk Level</th>
                <th className="px-4 py-3 font-semibold">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {result.domains.map((domain) => (
                <tr key={domain.categoryId} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-slate-900">{domain.title}</td>
                  <td className="px-4 py-3 text-slate-700">{domain.score}/20</td>
                  <td className="px-4 py-3 text-slate-700">{domain.level}</td>
                  <td className="px-4 py-3 text-slate-600">{domain.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 p-5">
          <h3 className="font-display text-2xl text-slate-950">Executive Synthesis</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{insights.governanceSummary}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Highest exposure areas: {insights.topRiskExposures.map((item) => item.title).join(", ")}.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Immediate attention domains: {insights.immediateAttention.length > 0
              ? insights.immediateAttention.map((item) => item.title).join(", ")
              : "No domain currently scores in the significant/severe range."}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 p-5">
          <h3 className="font-display text-2xl text-slate-950">Suggested Priority Actions</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700">
            {insights.recommendations.map((recommendation) => (
              <li key={recommendation} className="rounded-xl bg-slate-50 p-3">
                {recommendation}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
