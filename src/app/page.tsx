"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ShieldAlert,
  ArrowRight,
  FileCheck,
  Network,
  Lock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  Search,
  Cpu,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// Dynamic import with SSR disabled for optimal Three.js rendering
const InvestigationCore3D = dynamic(
  () => import("@/components/3d/InvestigationCore3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[440px] rounded-2xl bg-gradient-to-br from-[#101827] to-[#14233B] flex items-center justify-center border border-slate-700/50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-[#50D9E8] border-t-transparent animate-spin" />
          <span className="text-xs font-mono tracking-wider uppercase text-slate-400">
            Initializing 3D Investigation Core...
          </span>
        </div>
      </div>
    ),
  }
);

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-100 flex flex-col font-sans selection:bg-[#526DFF] selection:text-white">
      {/* Top Glass Navigation */}
      <header className="sticky top-0 z-50 bg-[#0B1220]/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#526DFF] to-[#50D9E8] p-[1px] shadow-lg shadow-blue-500/20">
              <div className="h-full w-full bg-[#0B1220] rounded-[7px] flex items-center justify-center">
                <ShieldAlert className="h-5 w-5 text-[#50D9E8] group-hover:scale-105 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                WarrantyWise
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#526DFF]/20 text-[#8DA0FF] border border-[#526DFF]/30 font-mono">
                  v2.0
                </span>
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-400">
                Evidence Intelligence
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#problem" className="hover:text-white transition-colors">Dispute Friction</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">4-Stage Pipeline</a>
            <a href="#intelligence" className="hover:text-white transition-colors">Deterministic Engine</a>
            <Link
              href="/cases/demo-washing-machine"
              className="text-[#50D9E8] hover:text-[#8DA0FF] transition-colors font-semibold flex items-center gap-1"
            >
              Interactive Case Specimen
              <ChevronRight className="h-3 w-3" />
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link href="/cases/new">
              <button className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#526DFF] to-[#3867E8] hover:from-[#435ee8] hover:to-[#2b5ae0] shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer">
                Start Investigation
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION — 3D INVESTIGATION CORE */}
        <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Subtle Ambient Radial Backdrops */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#526DFF]/15 to-[#50D9E8]/10 blur-[130px] -z-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131F32] border border-[#526DFF]/30 text-xs font-semibold text-[#8DA0FF]">
                <Cpu className="h-3.5 w-3.5 text-[#50D9E8]" />
                Evidence Intelligence Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Don&apos;t just accept a warranty rejection.{" "}
                <span className="bg-gradient-to-r from-[#50D9E8] via-[#8DA0FF] to-[#526DFF] bg-clip-text text-transparent">
                  Investigate it.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Turn invoices, warranty policies, and service notes into a transparent, evidence-backed forensic dispute dossier. Verified by deterministic logic and adversarial red-team AI.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/cases/new">
                  <button className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#526DFF] to-[#3867E8] hover:opacity-95 shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer">
                    Start an Investigation
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href="/cases/demo-washing-machine">
                  <button className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-[#131F32] hover:bg-[#1B2F4E] border border-slate-700/80 transition-all flex items-center gap-2 cursor-pointer">
                    Explore Live Case
                  </button>
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-slate-400">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Traceable Citations</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#50D9E8]">3-Valued</div>
                  <div className="text-[11px] text-slate-400 font-medium">Deterministic Rule Logic</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#8DA0FF]">Red-Team</div>
                  <div className="text-[11px] text-slate-400 font-medium">Adversarial Verification</div>
                </div>
              </div>
            </div>

            {/* Right: Interactive 3D Investigation Core Canvas */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl bg-gradient-to-b from-[#131F32]/90 to-[#0B1220] border border-slate-700/60 shadow-2xl p-2 overflow-hidden backdrop-blur-xl">
                {/* 3D Canvas */}
                <InvestigationCore3D />

                {/* Floating HUD Badges */}
                <div className="absolute top-4 left-4 bg-[#0B1220]/80 border border-slate-700/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 flex items-center gap-2 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Core Status: Lineage Active
                </div>

                <div className="absolute bottom-4 right-4 bg-[#0B1220]/80 border border-slate-700/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] text-slate-400">
                  Rotate & pan to inspect document nodes
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION B: THE DISPUTE PROBLEM */}
        <section id="problem" className="py-20 bg-[#101827] border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <div className="text-xs font-mono font-bold tracking-wider uppercase text-[#50D9E8]">
                The Consumer Friction
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Why warranty rejections are difficult to challenge
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Manufacturers rely on information asymmetry. Critical proof is scattered across invoices, 30-page warranty fine-print, and brief technician tickets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800 hover:border-slate-700 transition-all space-y-3">
                <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center font-bold">
                  !
                </div>
                <h3 className="text-base font-bold text-white">Asserted Without Proof</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Technicians frequently cite &ldquo;customer liquid damage&rdquo; or &ldquo;cosmetic shock&rdquo; without conducting diagnostic sensor tests or attaching internal photos.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800 hover:border-slate-700 transition-all space-y-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  §
                </div>
                <h3 className="text-base font-bold text-white">Miscalculated Expiry Dates</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Support agents often count warranty from ship date rather than delivery or retail purchase date, prematurely denying legally active claims.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B1220] border border-slate-800 hover:border-slate-700 transition-all space-y-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[#50D9E8] flex items-center justify-center font-bold">
                  ?
                </div>
                <h3 className="text-base font-bold text-white">Scattered Provenance</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Consumers rarely have the forensic tools to correlate 4 different PDFs, calculate inclusive boundary days, and draft an airtight dispute letter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION C: 4-STAGE PIPELINE */}
        <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-mono font-bold tracking-wider uppercase text-[#526DFF]">
              Deterministic Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A 4-stage bounded investigation pipeline
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              We compile policy conditions into code rules and subject every conclusion to adversarial red-team verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                title: "Document Ingestion",
                desc: "Invoices, warranty policies, and denial letters are securely stored with SHA-256 provenance checksums.",
                tag: "Encrypted Vault",
              },
              {
                num: "02",
                title: "Structured Extraction",
                desc: "Dates, serial numbers, exclusion clauses, and technician notes are anchored to exact page citations.",
                tag: "Page-Level Provenance",
              },
              {
                num: "03",
                title: "Deterministic Engine",
                desc: "Strict TypeScript rules evaluate leap years, month boundaries, and exclusion burden of proof.",
                tag: "3-Valued Logic",
              },
              {
                num: "04",
                title: "Adversarial Audit",
                desc: "Our Red-Team AI challenges unproven claims before generating an interactive graph and dispute report.",
                tag: "Red-Team Verified",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#101827] border border-slate-800 hover:border-[#526DFF]/50 transition-all space-y-3 relative group"
              >
                <div className="text-xs font-mono font-bold text-[#50D9E8]">{item.num}</div>
                <h3 className="text-base font-bold text-white group-hover:text-[#8DA0FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#131F32] text-slate-300 border border-slate-700/60">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION D: EVIDENCE GRAPH PREVIEW */}
        <section id="intelligence" className="py-20 bg-[#101827] border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-5">
                <div className="text-xs font-mono font-bold tracking-wider uppercase text-[#50D9E8]">
                  Interactive Evidence Graph
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight">
                  Every conclusion is traced to verifiable proof
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  WarrantyWise connects every assertion, policy clause, and invoice fact into a dimensional graph. Inspect verbatim excerpts, page citations, and contradiction edges in real-time.
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Red edges highlight explicit factual contradictions.</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-[#50D9E8]" />
                    <span>Blue edges map policy condition dependencies.</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    <span>Dashed lines flag missing technician documentation.</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/cases/demo-washing-machine">
                    <button className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#526DFF] hover:bg-[#435ee8] transition-all flex items-center gap-1.5 cursor-pointer">
                      Open Graph Specimen
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-4 rounded-2xl bg-[#0B1220] border border-slate-800 shadow-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-slate-400">GRAPH_VIEW // SmartHome Washer Case</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-semibold">
                      Contradicted Rejection
                    </span>
                  </div>
                  <div className="h-64 rounded-xl bg-[#101827] border border-slate-800/80 p-4 flex flex-col justify-between text-xs">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-[11px]">
                        Denial: &ldquo;Expired Jan 9, 2026&rdquo;
                      </div>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-red-500/50 to-emerald-500/50 mx-4" />
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[11px]">
                        Invoice: Jan 10, 2025 (Pg 1)
                      </div>
                    </div>
                    <div className="p-3 bg-[#0B1220] rounded-lg border border-slate-800 text-slate-300 text-[11px] space-y-1">
                      <span className="font-bold text-[#50D9E8] block">Policy §3.1 Lineage:</span>
                      <p>
                        Warranted 12 months from original purchase date. Denial issued Dec 20, 2025 is conclusively premature.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION E: CALL TO ACTION */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to investigate your warranty dispute?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Upload your documents and receive a verifiable, evidence-linked report in minutes.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Link href="/cases/new">
                <button className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#526DFF] to-[#3867E8] hover:opacity-95 shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer">
                  Start Your Investigation
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1220] border-t border-slate-800/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <ShieldAlert className="h-4 w-4 text-[#50D9E8]" />
            WarrantyWise &copy; 2026 — Evidence Intelligence Platform
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="/cases/demo-washing-machine" className="hover:text-white transition-colors">Live Case</Link>
            <a href="#how-it-works" className="hover:text-white transition-colors">Methodology</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
