"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Gauge,
  Newspaper,
  Scale,
  ShieldAlert,
  Truck,
  UsersRound,
} from "lucide-react";
import { tasseFramework } from "@/data/tasse-framework";
import { PageShell } from "@/components/common/page-shell";

const iconByCategory: Record<string, ComponentType<{ className?: string }>> = {
  "technological-threats": ShieldAlert,
  "adverse-media-coverage": Newspaper,
  "supply-chain-challenges": Truck,
  "social-responsibility-expectations": UsersRound,
  "ethical-dilemmas-pressure": Scale,
};

const parentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export function LandingPage() {
  return (
    <PageShell>
      <motion.section
        variants={parentVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <motion.div variants={childVariants} className="space-y-8">
          <span className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Governance, Risk & Ethics Intelligence
          </span>

          <h1 className="font-display text-4xl leading-tight text-slate-100 md:text-6xl md:leading-[1.06]">
            A premium boardroom lens on vulnerability before it becomes a crisis.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
            TASSE Score transforms governance and risk discussions into a structured 5-domain
            assessment with clear scoring, strategic interpretation, and executive-ready outputs.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              Start Assessment <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:bg-slate-900"
            >
              Learn More
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Domains", value: "5" },
              { label: "Questions", value: "50" },
              { label: "Total Score", value: "/100" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold text-slate-100">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={childVariants} className="rounded-3xl border border-white/10 bg-slate-900/65 p-6 shadow-2xl shadow-cyan-900/20">
          <div className="mb-5 flex items-center justify-between">
            <p className="font-display text-2xl text-slate-100">TASSE Domains</p>
            <Gauge className="h-5 w-5 text-cyan-200" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            {tasseFramework.categories.map((category, index) => {
              const Icon = iconByCategory[category.id] ?? ShieldAlert;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.08, duration: 0.35 }}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <div className="mb-2 flex items-start gap-3">
                    <span className="mt-0.5 rounded-lg border border-cyan-300/35 bg-cyan-400/10 p-2 text-cyan-300">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-100">{category.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.section>

      <section className="mt-16 grid gap-5 md:grid-cols-3">
        {[
          "Built for board members, executives, and governance leaders.",
          "Structured for strategic conversations, not checkbox compliance.",
          "Designed for credible reporting and decision-grade clarity.",
        ].map((line) => (
          <div key={line} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm leading-relaxed text-slate-300">{line}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
