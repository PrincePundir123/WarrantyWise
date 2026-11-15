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
  FileSearch,
  Check,
  Scale,
} from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

// Dynamic import with SSR disabled for optimal Three.js rendering
const InvestigationCore3D = dynamic(
  () => import("@/components/3d/InvestigationCore3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[460px] rounded-2xl bg-gradient-to-br from-[#101827] to-[#14233B] flex items-center justify-center border border-slate-700/50">
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
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-[#526DFF] selection:text-white">
      {/* Dynamic Ambient Background Illumination */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-tr from-[#526DFF]/15 via-[#50D9E8]/10 to-transparent blur-[140px]" />
        <div className="absolute top-[45%] -left-40 w-[600px] h-[500px] bg-[#526DFF]/10 blur-[130px]" />
        <div className="absolute bottom-10 -right-40 w-[600px] h-[500px] bg-[#50D9E8]/10 blur-[130px]" />
      </div>

      {/* Top Glass Navigation */}
      <header className="sticky top-0 z-50 bg-[#070B14]/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#526DFF] to-[#50D9E8] p-[1px] shadow-lg shadow-blue-500/20">
              <div className="h-full w-full bg-[#070B14] rounded-[7px] flex items-center justify-center">
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
            <a href="#intelligence" className="hover:text-white transition-colors">Bento Architecture</a>
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
        {/* HERO SECTION — CINEMATIC 3D INVESTIGATION CORE */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                  Investigate it in 3D.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
                Turn invoices, warranty policies, and service notes into a transparent, evidence-backed forensic dispute dossier. Verified by deterministic rules and adversarial red-team AI.
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
              <TiltCard className="p-2 border-slate-700/80 shadow-2xl">
                {/* 3D Canvas */}
                <InvestigationCore3D />

                {/* Floating HUD Badges */}
                <div className="absolute top-4 left-4 bg-[#070B14]/85 border border-slate-700/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-300 flex items-center gap-2 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Investigation Core: Real-time Lineage Active
                </div>

                <div className="absolute bottom-4 right-4 bg-[#070B14]/85 border border-slate-700/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] text-slate-400">
                  Interactive mouse parallax & rotation
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* SECTION B: BENTO GRID ARCHITECTURE (APPLE / STRIPE STYLE) */}
        <section id="intelligence" className="py-24 bg-[#0B1220]/70 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-3">
              <div className="text-xs font-mono font-bold tracking-wider uppercase text-[#50D9E8]">
                Forensic Architecture
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Designed for high scrutiny and documentary proof
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Every component is built around transparency. No black-box guesses; every claim links to page excerpts.
              </p>
            </div>

            {/* 3D Bento Grid with Tilt & Spotlight Glow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Large Span 2 */}
              <TiltCard className="md:col-span-2 p-8" glowColor="rgba(80, 217, 232, 0.15)">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#50D9E8] uppercase tracking-wider">
                    // DETERMINISTIC_ENGINE
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#50D9E8]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Three-Valued Logic Calendar Arithmetic
                </h3>
                <p className="text-sm text-slate-400 max-w-xl leading-relaxed mb-6">
                  LLMs hallucinate math. WarrantyWise uses strict TypeScript date evaluation for leap years, month-end edge cases, and boundary inclusive dates. If proof is missing, it yields <code className="text-[#50D9E8]">UNKNOWN</code> rather than guessing.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                  <div className="p-3 rounded-xl bg-[#070B14]/80 border border-slate-800">
                    <span className="text-slate-500 block text-[10px] font-bold">CALENDAR LOGIC</span>
                    <span className="text-white font-bold">Leap-Year Safe</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#070B14]/80 border border-slate-800">
                    <span className="text-slate-500 block text-[10px] font-bold">OUTPUT STATE</span>
                    <span className="text-emerald-400 font-bold">TRUE | FALSE | UNKNOWN</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#070B14]/80 border border-slate-800">
                    <span className="text-slate-500 block text-[10px] font-bold">BURDEN OF PROOF</span>
                    <span className="text-amber-400 font-bold">Exclusion Tested</span>
                  </div>
                </div>
              </TiltCard>

              {/* Card 2: Red Team Auditor */}
              <TiltCard className="p-8" glowColor="rgba(217, 91, 101, 0.15)">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider">
                    // RED_TEAM_AUDITOR
                  </span>
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Adversarial Challenge
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Stage E red-team auditor intentionally challenges findings for ambiguous wording, delivery delay exceptions, and unsubstantiated technician claims before finalizing the dossier.
                </p>
                <div className="mt-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-mono">
                  &ldquo;Liquid damage suspected&rdquo; OVERTURNED without sensor strip proof.
                </div>
              </TiltCard>

              {/* Card 3: Interactive Evidence Lineage Graph */}
              <TiltCard className="p-8" glowColor="rgba(82, 109, 255, 0.15)">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold text-[#8DA0FF] uppercase tracking-wider">
                    // REACT_FLOW_GRAPH
                  </span>
                  <Network className="h-4 w-4 text-[#8DA0FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Evidence Graph
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Explore full documentary lineage in an interactive 2.5D visual canvas. Trace claims to invoices and policy clauses in real time.
                </p>
                <Link href="/cases/demo-washing-machine" className="inline-flex items-center gap-1.5 text-xs text-[#50D9E8] font-bold mt-4 hover:underline">
                  Launch interactive graph →
                </Link>
              </TiltCard>

              {/* Card 4: Span 2 Security & Vault */}
              <TiltCard className="md:col-span-2 p-8" glowColor="rgba(21, 155, 114, 0.15)">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    // ZERO_LEAK_VAULT
                  </span>
                  <Lock className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  PostgreSQL Row-Level Security & Private Encrypted Buckets
                </h3>
                <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                  Uploaded invoices, denial emails, and photographic evidence are quarantined behind strict tenant isolation policies. No public storage buckets and time-limited signed URLs prevent cross-tenant access.
                </p>
              </TiltCard>
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
              <TiltCard key={idx} className="p-6">
                <div className="text-xs font-mono font-bold text-[#50D9E8] mb-2">{item.num}</div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#070B14] text-slate-300 border border-slate-700/60">
                  {item.tag}
                </span>
              </TiltCard>
            ))}
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
      <footer className="bg-[#070B14] border-t border-slate-800/80 py-10">
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
