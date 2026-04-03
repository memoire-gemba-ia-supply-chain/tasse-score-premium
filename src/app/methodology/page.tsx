import Link from "next/link";
import { PageShell } from "@/components/common/page-shell";
import { tasseFramework } from "@/data/tasse-framework";

export default function MethodologyPage() {
  return (
    <PageShell>
      <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Methodology</p>
        <h1 className="mt-3 font-display text-4xl text-slate-100 md:text-5xl">
          TASSE Score Framework 2026
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
          The TASSE Score assesses vulnerability to reputational, financial, and legal threats
          through 50 structured questions distributed across 5 strategic domains.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Question Score</p>
            <p className="mt-2 text-sm text-slate-200">Negligible = 0 · Moderate = 1 · Severe = 2</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Domain Score</p>
            <p className="mt-2 text-sm text-slate-200">10 questions per domain · Score range 0-20</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Total Score</p>
            <p className="mt-2 text-sm text-slate-200">5 domains combined · Score range 0-100</p>
          </article>
        </div>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-2">
        {tasseFramework.categories.map((category) => (
          <article key={category.id} className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
            <h2 className="font-display text-3xl text-slate-100">{category.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{category.description}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-400">
              10 board-level questions
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <h2 className="font-display text-3xl text-slate-100">Total Score Interpretation</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-4 py-3 font-semibold">Range</th>
                <th className="px-4 py-3 font-semibold">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {tasseFramework.totalInterpretations.map((band) => (
                <tr key={`${band.min}-${band.max}`} className="border-t border-white/10 text-slate-200">
                  <td className="px-4 py-3 font-medium">{band.min}-{band.max}</td>
                  <td className="px-4 py-3 text-slate-300">{band.statement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Link
            href="/assessment"
            className="inline-flex rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-900"
          >
            Start Assessment
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
