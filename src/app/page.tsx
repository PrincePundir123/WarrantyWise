import Link from "next/link";
import { ShieldAlert, ArrowRight, FileCheck, Network, Lock, HelpCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#172033] flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-[#14233B] flex items-center justify-center text-white shadow-sm">
              <ShieldAlert className="h-5 w-5 text-[#3867E8]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-[#14233B]">WarrantyWise</span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500">Dispute Intelligence</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#security" className="hover:text-slate-900 transition-colors">Evidence Integrity</a>
            <Link href="/cases/demo-washing-machine" className="text-[#3867E8] hover:text-[#2557E0] transition-colors font-semibold">
              Live Demo Case
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/cases/new">
              <Button variant="primary" size="sm">
                Start Investigation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#3867E8]">
                <FileCheck className="h-3.5 w-3.5" />
                Evidence-Based Warranty Rejection Audits
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#14233B] tracking-tight leading-[1.12]">
                Don&apos;t just accept a warranty rejection.{" "}
                <span className="text-[#3867E8]">Investigate the evidence.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                WarrantyWise compares the manufacturer&apos;s stated rejection reason against your purchase invoice, warranty policy, service technician reports, and physical inspection evidence.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/cases/new">
                  <Button variant="primary" size="lg" className="shadow-md">
                    Start an Investigation
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/cases/demo-washing-machine">
                  <Button variant="outline" size="lg">
                    Explore Demo Case
                  </Button>
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-200 grid grid-cols-3 gap-6 text-slate-600">
                <div>
                  <div className="text-2xl font-bold text-[#14233B]">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Traceable Citations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#14233B]">3-Valued</div>
                  <div className="text-xs text-slate-500 font-medium">Deterministic Rule Logic</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#14233B]">Adversarial</div>
                  <div className="text-xs text-slate-500 font-medium">Red-Team AI Auditor</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual: Live Specimen Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
                <div className="bg-[#14233B] text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                    <span className="text-xs font-mono tracking-wider uppercase text-slate-300">Case Audit #WW-2026-981</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-200 border border-red-400/30 font-semibold">
                    Contradicted Rejection
                  </span>
                </div>

                <div className="p-6 space-y-5 text-sm">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Manufacturer Denial Reason</span>
                    <p className="mt-1 font-medium text-slate-800 bg-red-50/70 p-3 rounded-lg border border-red-100 text-xs">
                      &ldquo;Claim rejected: The standard warranty period expired on Jan 9, 2026.&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-[11px] font-semibold text-slate-500 block">Purchase Date (Invoice)</span>
                      <span className="font-bold text-slate-800 text-xs">Jan 10, 2025 (Pg 1)</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-[11px] font-semibold text-slate-500 block">Policy Duration</span>
                      <span className="font-bold text-slate-800 text-xs">12 Months (Pg 2, §3.1)</span>
                    </div>
                  </div>

                  <div className="border-l-2 border-red-500 pl-3.5 py-1 space-y-1">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Contradiction Detected</span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Rejection was issued on Dec 20, 2025. Deterministic calendar calculation proves the product was within active coverage until Jan 10, 2026.
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-600 font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Red-Team Verified
                    </span>
                    <Link href="/cases/demo-washing-machine" className="text-[#3867E8] font-semibold hover:underline">
                      Inspect full evidence graph →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-[#14233B] tracking-tight">
                A rigorous, multi-stage investigation pipeline
              </h2>
              <p className="mt-4 text-base text-slate-600">
                We do not ask an AI chatbot for an ungrounded opinion. We compile policy logic, verify every documentary citation, and subject the findings to adversarial challenge.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Document Ingestion",
                  desc: "Upload purchase invoices, warranty PDFs, service tickets, and rejection letters into an encrypted private vault.",
                },
                {
                  step: "02",
                  title: "Structured Extraction",
                  desc: "Exact purchase dates, serial numbers, exclusion terms, and technical observations are extracted with page-level provenance.",
                },
                {
                  step: "03",
                  title: "Deterministic Check",
                  desc: "Deterministic calendar arithmetic and exclusion logic verify whether the manufacturer's assertions hold true.",
                },
                {
                  step: "04",
                  title: "Adversarial Audit",
                  desc: "An independent Red-Team AI challenges initial findings before producing an evidence graph and PDF report.",
                },
              ].map((item, idx) => (
                <div key={idx} className="relative p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-mono font-bold text-[#3867E8] mb-2">{item.step}</div>
                  <h3 className="text-base font-bold text-[#14233B] mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#14233B] tracking-tight">
              Built for technical scrutiny and objective fact-finding
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Every feature exists to eliminate conjecture and enforce source-backed transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-[#3867E8] flex items-center justify-center">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#14233B]">Interactive Evidence Graph</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explore every claim node, supporting clause, and contradicting fact visually using React Flow. Trace back to the exact document page.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#14233B]">Independent Red-Team Auditor</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our adversarial auditor stage searches for conflicting technician notes, ambiguous terms, and unproven claims before finalizing the report.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#14233B]">Private & Secure Storage</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                All uploaded documents are isolated behind PostgreSQL Row Level Security (RLS) with time-limited signed URLs and zero public exposure.
              </p>
            </div>
          </div>
        </section>

        {/* Security & Disclaimer */}
        <section id="security" className="py-16 bg-[#14233B] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-2">
                <h3 className="text-xl font-bold">Investigation Findings, Not Legal Counsel</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  WarrantyWise delivers objective documentary analysis and factual discrepancy reporting. Findings are categorized as <strong>SUPPORTED</strong>, <strong>CONTRADICTED</strong>, or <strong>INSUFFICIENT EVIDENCE</strong>. We never fabricate probabilities or offer legal representation.
                </p>
              </div>
              <Link href="/cases/new">
                <Button variant="secondary" size="lg">
                  Start Your Investigation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <ShieldAlert className="h-4 w-4 text-[#3867E8]" />
            WarrantyWise &copy; {new Date().getFullYear()} — Evidence Intelligence Platform
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-slate-900">Sign In</Link>
            <Link href="/cases/demo-washing-machine" className="hover:text-slate-900">Sample Audit</Link>
            <a href="#security" className="hover:text-slate-900">Privacy & Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
