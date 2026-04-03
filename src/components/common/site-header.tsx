import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Methodology", href: "/methodology" },
  { label: "Assessment", href: "/assessment" },
  { label: "Results", href: "/results" },
  { label: "Report", href: "/report" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(5,16,33,0.75)] backdrop-blur-xl print:hidden">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Risk Intelligence</p>
            <p className="font-display text-xl text-slate-100">TASSE Score</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
