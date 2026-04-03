import { cn } from "@/lib/cn";

type ProgressRingProps = {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
};

export function ProgressRing({
  value,
  max,
  size = 120,
  strokeWidth = 10,
  label,
  className,
}: ProgressRingProps) {
  const normalized = Math.max(0, Math.min(value, max));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = max === 0 ? 0 : Math.round((normalized / max) * 100);
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(148, 163, 184, 0.25)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#tasse-ring-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="tasse-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p className="text-xl font-semibold text-slate-50">{value}</p>
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">/{max}</p>
        {label ? (
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-teal-300">
            {label}
          </p>
        ) : null}
      </div>
    </div>
  );
}
