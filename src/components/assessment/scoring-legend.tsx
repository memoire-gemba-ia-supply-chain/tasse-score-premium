"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const scoreLegend = [
  {
    label: "Negligible",
    value: 0,
    icon: faCircleCheck,
    tone: "from-emerald-400/25 to-emerald-500/5",
    border: "border-emerald-300/35",
    text: "text-emerald-200",
    description: "Risk is contained with adequate controls.",
  },
  {
    label: "Moderate",
    value: 1,
    icon: faCircleExclamation,
    tone: "from-amber-400/25 to-amber-500/5",
    border: "border-amber-300/35",
    text: "text-amber-100",
    description: "Exposure exists and needs active mitigation.",
  },
  {
    label: "Severe",
    value: 2,
    icon: faTriangleExclamation,
    tone: "from-rose-400/25 to-rose-500/5",
    border: "border-rose-300/35",
    text: "text-rose-100",
    description: "Immediate vulnerability with high impact potential.",
  },
] as const;

export function ScoringLegend() {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Scoring Scale</p>
      <p className="mt-1 text-sm text-slate-300">
        Every question uses the same numeric logic across all 5 domains.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {scoreLegend.map((item, index) => (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * index, duration: 0.35 }}
            className={`rounded-2xl border bg-gradient-to-br ${item.tone} p-3 ${item.border}`}
          >
            <p className={`inline-flex items-center gap-2 text-sm font-semibold ${item.text}`}>
              <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
              {item.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-slate-100">{item.value}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
