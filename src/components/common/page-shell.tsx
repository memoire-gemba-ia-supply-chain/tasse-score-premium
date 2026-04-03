import { ReactNode } from "react";
import { SiteHeader } from "@/components/common/site-header";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(14,165,233,0.22),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(20,184,166,0.16),transparent_28%),linear-gradient(180deg,#061226_0%,#050b18_100%)] text-slate-100 print:bg-white print:text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.18] print:hidden" />
      <div className="pointer-events-none absolute -left-20 top-28 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl print:hidden" />
      <div className="pointer-events-none absolute right-0 top-52 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl print:hidden" />
      <div className="relative z-10">
        <SiteHeader />
        <main className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 print:max-w-none print:px-0 print:py-0">
          {children}
        </main>
      </div>
    </div>
  );
}
