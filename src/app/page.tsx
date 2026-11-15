"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Check,
  FileText,
  Shield,
  Layers,
  Search,
  Scale,
  Compass,
  CornerDownRight,
} from "lucide-react";

// Dynamic import for the focused editorial 3D physical dossier
const EvidenceArchiveDossier3D = dynamic(
  () => import("@/components/3d/EvidenceArchiveDossier3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[460px] flex items-center justify-center bg-[#FAF8F5] border border-[#DED8CB]">
        <span className="text-xs font-mono tracking-widest uppercase text-[#5F665E]">
          Loading Evidence Dossier...
        </span>
      </div>
    ),
  }
);

export default function EditorialHomePage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1F231F] font-sans selection:bg-[#AD593E] selection:text-white">
      {/* 1. Header Navigation — Quiet, typographic, editorial */}
      <header className="border-b border-[#DED8CB] bg-[#F4F1EA] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-3 group">
            <span className="text-xl font-bold tracking-tight text-[#1F231F] font-serif">
              WarrantyWise
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#5F665E] hidden sm:inline">
              Evidence Archive &bull; Dossier Audit
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-10 text-xs font-medium tracking-wide text-[#383D38]">
            <a href="#premise" className="hover:text-[#1F231F] transition-colors">The Premise</a>
            <a href="#methodology" className="hover:text-[#1F231F] transition-colors">Methodology</a>
            <a href="#specimen" className="hover:text-[#1F231F] transition-colors">Forensic Case</a>
            <Link href="/cases/demo-washing-machine" className="text-[#AD593E] font-semibold hover:underline">
              Live Investigation
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-medium text-[#383D38] hover:text-[#1F231F] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/cases/new"
              className="px-4 py-2 bg-[#1F231F] hover:bg-[#383D38] text-[#F4F1EA] text-xs font-medium tracking-wide transition-colors"
            >
              Begin Investigation &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section — Asymmetric Editorial Composition + Physical 3D Archive */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 border-b border-[#DED8CB]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Typographic Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 border-b border-[#1F231F] pb-1 text-[11px] font-mono uppercase tracking-widest text-[#5F665E]">
              <span>VOL. 01 &bull; WARRANTY DISPUTE INVESTIGATION</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1F231F] font-serif leading-[1.08]">
              A rejection is merely a claim.{" "}
              <em className="italic font-serif text-[#AD593E]">Evidence tells the rest.</em>
            </h1>

            <p className="text-base sm:text-lg text-[#383D38] max-w-lg leading-relaxed font-light">
              We investigate warranty denials by comparing manufacturer statements directly against your purchase invoice, policy clauses, and technician notes — anchoring every finding to documentary source citations.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/cases/new"
                className="px-6 py-3.5 bg-[#1F231F] hover:bg-[#383D38] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium transition-colors"
              >
                Submit Case Dossier
              </Link>
              <Link
                href="/cases/demo-washing-machine"
                className="px-6 py-3.5 border border-[#1F231F] text-[#1F231F] hover:bg-[#EAE5D9] text-xs uppercase tracking-wider font-medium transition-colors"
              >
                Inspect Sample Audit
              </Link>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-[#DED8CB] text-xs text-[#5F665E]">
              <div>
                <div className="font-serif text-2xl text-[#1F231F]">100%</div>
                <div className="mt-0.5 tracking-tight">Traceable Citations</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#1F231F]">3-Valued</div>
                <div className="mt-0.5 tracking-tight">Deterministic Rules</div>
              </div>
              <div>
                <div className="font-serif text-2xl text-[#1F231F]">Red-Team</div>
                <div className="mt-0.5 tracking-tight">Adversarial Review</div>
              </div>
            </div>
          </div>

          {/* 3D Physical Archive Dossier Column */}
          <div className="lg:col-span-6 relative">
            <div className="bg-[#FAF8F5] border border-[#DED8CB] p-4 relative shadow-sm">
              <div className="flex items-center justify-between border-b border-[#DED8CB] pb-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-[#5F665E]">
                <span>ARCHIVAL DOSSIER &bull; SPECIMEN NO. 99812</span>
                <span className="text-[#AD593E] font-bold">PHYSICAL ARTIFACT VIEW</span>
              </div>

              {/* Realistic 3D Canvas */}
              <div className="h-[460px] w-full">
                <EvidenceArchiveDossier3D />
              </div>

              <div className="mt-2 pt-3 border-t border-[#DED8CB] flex items-center justify-between text-[11px] text-[#5F665E]">
                <span>Tactile interaction: hover and pan to tilt dossier</span>
                <span className="font-mono">FOLIO_04 // RESOLVED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Premise — Editorial Typography & Natural Layout */}
      <section id="premise" className="py-24 border-b border-[#DED8CB] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD593E] block mb-2">
                01 / THE IMBALANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1F231F] leading-snug">
                Warranty decisions rely on informational friction.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6 text-sm text-[#383D38] leading-relaxed">
              <p>
                When a manufacturer rejects a claim, they deliver a conclusion without showing their work. They claim the warranty expired, that liquid damage occurred, or that a cosmetic scratch voided coverage.
              </p>
              <p>
                For an individual consumer, refuting this requires cross-referencing invoice purchase dates with policy boundary definitions, reading technician inspection disclaimers, and proving that an exclusion condition was never legally satisfied.
              </p>
              <div className="p-6 bg-[#F4F1EA] border-l-2 border-[#AD593E] font-serif italic text-base text-[#1F231F]">
                &ldquo;WarrantyWise exists to eliminate conjecture. If a manufacturer asserts that coverage lapsed, we calculate the calendar boundary. If they allege liquid contamination, we inspect whether diagnostic causation was actually established.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Methodology — 4-Stage Sequential Flow */}
      <section id="methodology" className="py-24 border-b border-[#DED8CB]">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#55604A]">
              02 / THE METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#1F231F]">
              Structured investigation, bounded verification.
            </h2>
            <p className="text-sm text-[#5F665E] leading-relaxed">
              We never ask an LLM to guess an expiry date or provide subjective legal counsel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Document Ingestion",
                desc: "Original PDFs, receipts, and inspection tickets are ingested into a private vault with SHA-256 provenance checksums.",
              },
              {
                step: "02",
                title: "Fact & Clause Extraction",
                desc: "Purchase dates, serial numbers, and policy exclusions are extracted with page-number citations and confidence labels.",
              },
              {
                step: "03",
                title: "Deterministic Engine",
                desc: "TypeScript calendar logic handles leap years, month boundaries, and exclusion burden of proof under three-valued logic.",
              },
              {
                step: "04",
                title: "Adversarial Red-Team",
                desc: "An independent auditor stage challenges unproven assertions and checks contrary technician notes before release.",
              },
            ].map((item, idx) => (
              <div key={idx} className="border-t border-[#1F231F] pt-6 space-y-2">
                <span className="font-mono text-xs text-[#AD593E]">{item.step}</span>
                <h3 className="text-base font-serif font-medium text-[#1F231F]">{item.title}</h3>
                <p className="text-xs text-[#5F665E] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Live Specimen Case — Editorial Dossier Breakdown */}
      <section id="specimen" className="py-24 border-b border-[#DED8CB] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#AD593E]">
                03 / AUDIT SPECIMEN
              </span>
              <h2 className="text-3xl font-serif text-[#1F231F] leading-tight">
                Case Study: The Inverter Motor Denial
              </h2>
              <p className="text-xs text-[#383D38] leading-relaxed">
                Manufacturer denied claim alleging standard warranty expired on Jan 9, 2026 and cited suspected liquid damage.
              </p>
              <div className="space-y-3 text-xs text-[#5F665E]">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#55604A] shrink-0 mt-0.5" />
                  <span><strong>Fact:</strong> Purchase invoice dates sale to Jan 10, 2025. Claim was filed Dec 20, 2025.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#55604A] shrink-0 mt-0.5" />
                  <span><strong>Policy §3.1:</strong> 12 months coverage commences upon date of retail purchase.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#55604A] shrink-0 mt-0.5" />
                  <span><strong>Finding:</strong> Rejection was issued while product was under active coverage. Exclusion was unproven.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/cases/demo-washing-machine"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1F231F] border-b border-[#1F231F] pb-1 hover:text-[#AD593E] hover:border-[#AD593E] transition-colors"
                >
                  Explore Complete Case Dossier &rarr;
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#F4F1EA] p-8 border border-[#DED8CB] shadow-xs space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#DED8CB] pb-3 font-mono text-[11px] text-[#5F665E]">
                <span>AUDIT_RECORD // EAC-CLAIM-882194</span>
                <span className="text-[#AD593E] font-bold">CONCLUSION: CONTRADICTED</span>
              </div>
              <div className="space-y-2 font-serif text-sm text-[#1F231F]">
                <div>&ldquo;The claim rejection is mathematically contradicted by the purchase invoice date and policy duration terms.&rdquo;</div>
              </div>
              <div className="p-3 bg-[#FAF8F5] border border-[#DED8CB] text-[11px] text-[#5F665E] space-y-1">
                <div><strong>Primary Citation:</strong> Invoice-Purchase-20250110.pdf &bull; Pg 1</div>
                <div><strong>Clause Citation:</strong> Policy-Section-3.1 &bull; Pg 2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer — Clean Archival Colophon */}
      <footer className="py-16 bg-[#F4F1EA] text-[#5F665E] text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-serif font-bold text-[#1F231F] text-sm">WarrantyWise</div>
            <div>Evidence Intelligence &bull; Archival Investigation Software</div>
          </div>
          <div className="flex items-center space-x-8 text-xs font-mono">
            <Link href="/login" className="hover:text-[#1F231F]">Sign In</Link>
            <Link href="/cases/demo-washing-machine" className="hover:text-[#1F231F]">Specimen</Link>
            <Link href="/cases/new" className="hover:text-[#1F231F]">New Case</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
