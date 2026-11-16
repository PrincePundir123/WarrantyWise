"use client";

import React, { useState, useEffect, use, Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  FileText,
  Layers,
  Network,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Shield,
  FileCheck,
  Compass,
} from "lucide-react";
import { SAMPLE_CASES } from "@/lib/demo-data";
import { SAMPLE_DOCUMENTS, SAMPLE_FACTS, SAMPLE_CLAUSES } from "@/lib/demo-details";
import { EvidenceGraphViewer } from "@/components/evidence-graph/EvidenceGraphViewer";
import { formatDate } from "@/lib/utils";
import { Case, DocumentItem, ExtractedFact } from "@/types";

function CaseWorkspaceContent({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const resolvedParams = use(params);
  const caseId = resolvedParams.caseId;

  // Find in sample cases or use default
  const defaultCase = SAMPLE_CASES.find((c) => c.id === caseId) || SAMPLE_CASES[0];
  const [caseData, setCaseData] = useState<Case>(defaultCase);
  const [documents, setDocuments] = useState<DocumentItem[]>(SAMPLE_DOCUMENTS);
  const [facts, setFacts] = useState<ExtractedFact[]>(SAMPLE_FACTS);
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "investigation" | "graph" | "report">("overview");

  useEffect(() => {
    // Check if there is a real record in database for this caseId
    if (caseId && caseId !== "demo-washing-machine") {
      fetch(`/api/cases/${caseId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data?.case) {
            setCaseData(json.data.case);
            if (json.data.documents && json.data.documents.length > 0) {
              setDocuments(json.data.documents);
            }
            if (json.data.facts && json.data.facts.length > 0) {
              setFacts(json.data.facts);
            }
          }
        })
        .catch(() => {});
    }
  }, [caseId]);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1F231F] font-sans selection:bg-[#AD593E] selection:text-white flex flex-col">
      {/* 1. Header Navigation */}
      <header className="border-b border-[#DED8CB] bg-[#F4F1EA] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-[#5F665E] hover:text-[#1F231F] transition-colors p-1"
              title="Return to Registry"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5F665E]">
                  DOSSIER #{caseData.claim_reference || "EAC-CLAIM-882194"}
                </span>
                <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#AD593E] bg-[#FBF0EC] border border-[#AD593E]/30 font-semibold">
                  Conclusion: Contradicted
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-normal text-[#1F231F] tracking-tight mt-0.5">
                {caseData.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("report")}
              className="px-3.5 py-2 border border-[#1F231F] text-[#1F231F] hover:bg-[#EAE5D9] text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              Print Forensic Dossier
            </button>
            <Link
              href="/cases/new"
              className="px-4 py-2 bg-[#1F231F] hover:bg-[#383D38] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider transition-colors hidden sm:inline"
            >
              New Audit
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Editorial Tab Strip */}
      <div className="border-b border-[#DED8CB] bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8 text-xs font-mono uppercase tracking-wider">
            {[
              { id: "overview", label: "01 // Overview & Verdict" },
              { id: "documents", label: `02 // Evidence Vault (${SAMPLE_DOCUMENTS.length})` },
              { id: "investigation", label: "03 // 6-Stage Audit Trail" },
              { id: "graph", label: "04 // Lineage Graph" },
              { id: "report", label: "05 // Final Report" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`py-3.5 border-b-2 transition-colors cursor-pointer ${
                  activeTab === t.id
                    ? "border-[#1F231F] text-[#1F231F] font-bold"
                    : "border-transparent text-[#5F665E] hover:text-[#1F231F]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 3. Main Workspace Area */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full space-y-10">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 7 Cols: Claim vs Proof Ledger */}
            <div className="lg:col-span-8 space-y-10">
              {/* Manufacturer Statement vs Deterministic Proof */}
              <div className="border-t-2 border-[#1F231F] pt-6 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#5F665E] block">
                  MANUFACTURER DENIAL ASSERTION &bull; DEC 20, 2025
                </span>
                <blockquote className="font-serif italic text-lg sm:text-xl text-[#1F231F] leading-snug pl-4 border-l-2 border-[#AD593E]">
                  &ldquo;{caseData.rejection_reason}&rdquo;
                </blockquote>
              </div>

              {/* Forensic Examination Breakdown */}
              <div className="space-y-6 pt-4 border-t border-[#DED8CB]">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#55604A]">
                  DETERMINISTIC EVALUATION &bull; 2 IRRECONCILABLE CONTRADICTIONS
                </div>

                {/* Finding 1 */}
                <div className="bg-[#FAF8F5] border border-[#DED8CB] p-6 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#DED8CB] pb-3">
                    <span className="font-serif text-base font-bold text-[#1F231F]">
                      1. Expiry Assertion Contradicted by Purchase Invoice
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#AD593E] font-bold">
                      CONTRADICTED
                    </span>
                  </div>
                  <p className="text-xs text-[#383D38] leading-relaxed">
                    The manufacturer denied the claim citing that coverage expired on Jan 9, 2026. However, original purchase occurred on <strong>Jan 10, 2025</strong>. Policy Section 3.1 guarantees a 12-month period from retail purchase date (valid through <strong>Jan 10, 2026</strong>). Denial on Dec 20, 2025 was premature.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-[#5F665E] space-y-1 border-t border-[#DED8CB]/60">
                    <div>&bull; Citation 1: Invoice-Purchase-20250110.pdf &bull; Pg 1 (Purchase: 2025-01-10)</div>
                    <div>&bull; Citation 2: Policy-Section-3.1 &bull; Pg 2 (12 calendar months duration)</div>
                  </div>
                </div>

                {/* Finding 2 */}
                <div className="bg-[#FAF8F5] border border-[#DED8CB] p-6 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#DED8CB] pb-3">
                    <span className="font-serif text-base font-bold text-[#1F231F]">
                      2. Unsubstantiated Liquid Damage Exclusion
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#B0823C] font-bold">
                      UNPROVEN EXCLUSION
                    </span>
                  </div>
                  <p className="text-xs text-[#383D38] leading-relaxed">
                    Section 4.2 excludes liquid ingress only where diagnostic causation is verified. The service report explicitly records visual exterior suspicion only; the moisture sensor strip was not triggered or tested.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-[#5F665E] border-t border-[#DED8CB]/60">
                    &bull; Citation: Technician-Field-Inspection-Report.pdf &bull; Pg 1 (&ldquo;visual inspection external only; moisture strip test not performed&rdquo;)
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Product Profile & Recommended Action */}
            <div className="lg:col-span-4 space-y-8">
              {/* Product Specifications Ledger */}
              <div className="border border-[#DED8CB] bg-[#FAF8F5] p-6 space-y-4 text-xs font-mono">
                <span className="text-[10px] font-bold text-[#5F665E] uppercase tracking-widest block border-b border-[#DED8CB] pb-2">
                  SUBJECT PRODUCT SPECIFICATION
                </span>
                <div className="space-y-2.5 text-[#383D38]">
                  <div className="flex justify-between">
                    <span className="text-[#5F665E]">Product</span>
                    <span className="text-[#1F231F] font-bold">{caseData.product_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F665E]">Brand</span>
                    <span className="text-[#1F231F]">{caseData.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F665E]">Model #</span>
                    <span className="text-[#1F231F]">{caseData.model_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F665E]">Serial #</span>
                    <span className="text-[#1F231F]">{caseData.serial_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F665E]">Purchase Date</span>
                    <span className="text-[#1F231F] font-bold">{formatDate(caseData.purchase_date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5F665E]">Purchase Price</span>
                    <span className="text-[#1F231F]">${caseData.purchase_price?.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              {/* Recommended Action Notice */}
              <div className="border-l-2 border-[#1F231F] pl-4 space-y-3 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#AD593E] block font-bold">
                  RECOMMENDED NEXT DISPUTE ACTION
                </span>
                <p className="text-[#383D38] leading-relaxed">
                  Submit a formal Warranty Rejection Appeal letter enclosing:
                </p>
                <ol className="list-decimal list-inside space-y-1.5 text-[#5F665E] font-mono text-[11px]">
                  <li>Invoice copy verifying Jan 10, 2025 purchase date.</li>
                  <li>Section 3.1 policy clause establishing 12-month term.</li>
                  <li>Demand for photographic proof of internal liquid corrosion.</li>
                </ol>
                <button
                  onClick={() => setActiveTab("report")}
                  className="w-full mt-4 py-2.5 bg-[#1F231F] hover:bg-[#383D38] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Generate Appeal Letter &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5F665E] block">
                INGESTED DOSSIER ARTIFACTS ({SAMPLE_DOCUMENTS.length})
              </span>
              <div className="border border-[#DED8CB] divide-y divide-[#DED8CB] bg-[#FAF8F5]">
                {SAMPLE_DOCUMENTS.map((doc) => (
                  <div key={doc.id} className="p-4 space-y-1 text-xs font-mono">
                    <div className="flex items-center justify-between text-[#1F231F] font-bold">
                      <span>{doc.original_filename}</span>
                      <span className="text-[10px] text-[#55604A] uppercase">{doc.processing_status}</span>
                    </div>
                    <div className="text-[11px] text-[#5F665E] flex items-center justify-between">
                      <span>TYPE: {doc.document_type}</span>
                      <span>{doc.checksum?.substring(0, 16)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5F665E] block">
                EXTRACTED PROVENANCE LOG
              </span>
              <div className="space-y-4">
                {SAMPLE_FACTS.map((fact) => (
                  <div key={fact.id} className="p-4 bg-[#FAF8F5] border border-[#DED8CB] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[#5F665E]">
                      <span>{fact.fact_key}</span>
                      <span className="text-[#55604A] font-bold">Verified Citation</span>
                    </div>
                    <div className="font-serif text-sm font-medium text-[#1F231F]">{String(fact.fact_value)}</div>
                    <div className="text-[11px] font-mono text-[#5F665E] italic">
                      Pg {fact.source_page} &bull; &ldquo;{fact.source_excerpt}&rdquo;
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6-STAGE AUDIT TRAIL TAB */}
        {activeTab === "investigation" && (
          <div className="space-y-8 max-w-4xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#5F665E] block">
              BOUNDED MULTI-STAGE REASONING PIPELINE
            </span>
            <div className="space-y-6 border-l-2 border-[#1F231F] pl-6">
              {[
                { stage: "Stage A", name: "Claim Parser", desc: "Extracted stated assertions from manufacturer notice: 'Warranty expired Jan 9, 2026' and 'Liquid damage suspected'." },
                { stage: "Stage B", name: "Policy Analyst", desc: "Extracted Section 3.1 (12 months from purchase date) and Section 4.2 (Liquid damage requires diagnostic causation proof)." },
                { stage: "Stage C", name: "Evidence Analyst", desc: "Extracted purchase date (Jan 10, 2025) and technician notes ('visual inspection external only; moisture strip test not performed')." },
                { stage: "Stage D", name: "Deterministic Rules Engine", desc: "Evaluated TypeScript date arithmetic: Jan 10, 2025 + 12 months = Jan 10, 2026. Claim filed Dec 20, 2025 was legally active." },
                { stage: "Stage E", name: "Adversarial Red-Team Auditor", desc: "Challenged finding for ambiguous duration terms and inspected service report for sensor strip tests. Confirmed manufacturer failed to attach diagnostic proof." },
                { stage: "Stage F", name: "Final Reconciler", desc: "Reconciled findings and challenges. Rejection is formally CONTRADICTED by evidence." },
              ].map((s, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="font-mono text-[11px] font-bold text-[#AD593E] uppercase">{s.stage}: {s.name}</div>
                  <p className="text-[#383D38] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVIDENCE GRAPH TAB */}
        {activeTab === "graph" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#DED8CB] pb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5F665E]">
                EVIDENCE LINEAGE GRAPH // INTERACTIVE 2.5D SPECIMEN
              </span>
            </div>
            <EvidenceGraphViewer />
          </div>
        )}

        {/* REPORT TAB */}
        {activeTab === "report" && (
          <div className="max-w-4xl mx-auto bg-[#FAF8F5] p-10 sm:p-14 border border-[#DED8CB] shadow-xs space-y-8 text-xs text-[#1F231F]">
            {/* Header */}
            <div className="border-b-2 border-[#1F231F] pb-6 flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#AD593E] block">
                  WARRANTYWISE FORENSIC REPORT // OFFICIAL DOSSIER
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#1F231F] mt-1">
                  Warranty Claim Investigation Report
                </h2>
                <div className="font-mono text-[11px] text-[#5F665E] mt-1">
                  Reference: WW-EAC-2026-991 &bull; Date: 2026-11-16
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#AD593E] bg-[#FBF0EC] border border-[#AD593E]/30 font-bold">
                  CONTRADICTED
                </span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-4 text-xs leading-relaxed text-[#383D38]">
              <h3 className="font-serif font-bold text-sm text-[#1F231F] border-b border-[#DED8CB] pb-1 uppercase tracking-wider">
                1. Executive Summary
              </h3>
              <p>
                The manufacturer&apos;s warranty rejection has been subjected to deterministic calendar analysis and evidentiary verification. The available evidence <strong>CONTRADICTS</strong> the manufacturer&apos;s stated reason for rejection.
              </p>

              <h3 className="font-serif font-bold text-sm text-[#1F231F] border-b border-[#DED8CB] pb-1 uppercase tracking-wider pt-4">
                2. Factual Discrepancies
              </h3>
              <p>
                <strong>Finding 1 (Expiry Date Contradiction):</strong> The manufacturer asserted coverage lapsed on Jan 9, 2026. Purchase invoice verifies sale on Jan 10, 2025. Policy §3.1 provides 12 months coverage from retail purchase date (valid through Jan 10, 2026). Claim submitted Dec 20, 2025 was legally active.
              </p>
              <p>
                <strong>Finding 2 (Unproven Liquid Damage):</strong> Section 4.2 excludes liquid damage only where diagnostic causation is verified. The field technician report specifically noted &ldquo;visual inspection external only; moisture strip test not performed.&rdquo;
              </p>

              <h3 className="font-serif font-bold text-sm text-[#1F231F] border-b border-[#DED8CB] pb-1 uppercase tracking-wider pt-4">
                3. Recommended Consumer Action Plan
              </h3>
              <ol className="list-decimal list-inside space-y-1 font-mono text-[11px] text-[#5F665E]">
                <li>File a formal appeal quoting Policy Section 3.1 and Invoice Date.</li>
                <li>Request photographic evidence of PCB liquid damage and moisture indicator strip test records.</li>
                <li>Escalate dispute to regional consumer protection authorities if not resolved.</li>
              </ol>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function EditorialCaseWorkspacePage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center font-mono text-xs text-[#5F665E]">
          // INGESTING ARCHIVAL DOSSIER...
        </div>
      }
    >
      <CaseWorkspaceContent params={params} />
    </Suspense>
  );
}
