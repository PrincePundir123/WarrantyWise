"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ArrowLeft,
  FileText,
  Network,
  Download,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ChevronRight,
  ExternalLink,
  Layers,
  Printer,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SAMPLE_CASES } from "@/lib/demo-data";
import { SAMPLE_DOCUMENTS, SAMPLE_FACTS, SAMPLE_CLAUSES } from "@/lib/demo-details";
import { EvidenceGraphViewer } from "@/components/evidence-graph/EvidenceGraphViewer";
import { formatDate } from "@/lib/utils";

export default function CaseWorkspacePage() {
  const caseData = SAMPLE_CASES[0]; // Washing machine featured case
  const [activeTab, setActiveTab] = useState<"overview" | "documents" | "investigation" | "graph" | "report">("overview");

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-400 hover:text-slate-800 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
                Case #{caseData.claim_reference || "WW-2026-01"}
              </span>
              <Badge variant="contradicted">Rejection Contradicted</Badge>
              <Badge variant="outline">Deterministic & Red-Team Audited</Badge>
            </div>
            <h1 className="text-xl font-extrabold text-[#14233B] tracking-tight mt-0.5">
              {caseData.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("report")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
          >
            <Printer className="h-4 w-4 text-slate-500" />
            Print / PDF Report
          </button>
          <Link href="/cases/new">
            <Button variant="primary" size="sm">
              New Case
            </Button>
          </Link>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 px-6">
        <nav className="flex space-x-6 text-xs font-semibold">
          {[
            { id: "overview", label: "Overview & Findings", icon: Layers },
            { id: "documents", label: `Documents (${SAMPLE_DOCUMENTS.length})`, icon: FileText },
            { id: "investigation", label: "6-Stage Audit Trail", icon: Sparkles },
            { id: "graph", label: "Evidence Lineage Graph", icon: Network },
            { id: "report", label: "Final Investigation Report", icon: FileCheck },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`py-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === t.id
                    ? "border-[#3867E8] text-[#3867E8]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Workspace Body */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              {/* Manufacturer Stated Denial vs Deterministic Truth */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Manufacturer Rejection vs. Evidence Reality
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div className="p-3.5 bg-red-50/70 border border-red-200 rounded-lg">
                    <span className="font-bold text-red-800 uppercase tracking-wider text-[11px] block mb-1">
                      Manufacturer&apos;s Stated Reason (Dec 20, 2025)
                    </span>
                    <p className="text-slate-700 italic">
                      &ldquo;{caseData.rejection_reason}&rdquo;
                    </p>
                  </div>

                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2">
                    <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px] block">
                      Deterministic Investigation Outcome: CONTRADICTED
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      1. <strong>Warranty Duration Check:</strong> Purchase invoice dates sale to <strong>January 10, 2025</strong>. Policy Section 3.1 guarantees a 12-month duration commencing on purchase date (valid through <strong>January 10, 2026</strong>). The rejection date of December 20, 2025 was issued while product was fully covered.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      2. <strong>Exclusion Burden of Proof:</strong> Section 4.2 requires diagnostic verification of liquid causation. The technician filed only an external visual suspicion; the moisture sensor strip was never triggered or tested.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Key Findings List */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Verifiable Findings & Citations
                </h3>

                <Card className="border-l-4 border-l-red-500">
                  <CardContent className="p-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">
                        Expiry Date Contradiction
                      </span>
                      <Badge variant="contradicted">Contradicted</Badge>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Manufacturer assertion that coverage lapsed on Jan 9, 2026 is mathematically contradicted by the purchase invoice date (Jan 10, 2025) and claim timing (Dec 20, 2025).
                    </p>
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600 space-y-1">
                      <div><strong>Source Citation 1:</strong> Invoice-Purchase-20250110.pdf &bull; Page 1 &bull; <em>&ldquo;Invoice Date: 10 January 2025&rdquo;</em></div>
                      <div><strong>Source Citation 2:</strong> Manufacturer-Warranty-Policy-EAC.pdf &bull; Page 2 &bull; <em>&ldquo;12 months commencing upon date of original retail purchase&rdquo;</em></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-amber-500">
                  <CardContent className="p-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">
                        Unproven Liquid Damage Exclusion
                      </span>
                      <Badge variant="insufficient">Insufficient Evidence</Badge>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Field technician noted &apos;liquid damage suspected&apos; without completing internal moisture test or providing photos of PCB corrosion.
                    </p>
                    <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600">
                      <div><strong>Source Citation:</strong> Technician-Field-Inspection-Report.pdf &bull; Page 1 &bull; <em>&ldquo;visual inspection external only; moisture test not performed&rdquo;</em></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Side Metadata & Recommended Actions */}
            <div className="lg:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Product Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-400">Product</span>
                    <span className="font-bold text-slate-800">{caseData.product_name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-400">Brand</span>
                    <span className="font-semibold text-slate-800">{caseData.manufacturer}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-400">Model #</span>
                    <span className="font-mono text-slate-800">{caseData.model_number}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-400">Serial #</span>
                    <span className="font-mono text-slate-800">{caseData.serial_number}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="font-medium text-slate-400">Purchase Date</span>
                    <span className="font-semibold text-slate-800">{formatDate(caseData.purchase_date)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-slate-400">Purchase Price</span>
                    <span className="font-semibold text-slate-800">${caseData.purchase_price?.toFixed(2)} USD</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Action Card */}
              <Card className="bg-blue-50/50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-sm text-[#14233B] flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-[#3867E8]" />
                    Recommended Consumer Next Action
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-slate-700 space-y-3">
                  <p>
                    Submit a formal Warranty Denial Dispute Letter attaching:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>Invoice copy showing Jan 10, 2025 purchase date.</li>
                    <li>Section 3.1 policy excerpt proving active coverage window.</li>
                    <li>Demand for technician photographic proof of internal liquid corrosion.</li>
                  </ul>
                  <button
                    onClick={() => setActiveTab("report")}
                    className="w-full mt-2 py-2 px-3 bg-[#14233B] hover:bg-[#1B2F4E] text-white rounded-lg text-xs font-semibold text-center transition-colors"
                  >
                    View Ready-to-Send Investigation Report
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Documentary Evidence Vault ({SAMPLE_DOCUMENTS.length})
              </h3>
              {SAMPLE_DOCUMENTS.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 hover:border-[#3867E8] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                      <FileText className="h-4 w-4 text-[#3867E8]" />
                      {doc.original_filename}
                    </div>
                    <Badge variant="supported">{doc.processing_status}</Badge>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span>Type: {doc.document_type}</span>
                    <span>Pages: {doc.page_count}</span>
                    <span>Checksum: {doc.checksum?.substring(0, 14)}...</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-7">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Structured Fact Provenance Log</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  {SAMPLE_FACTS.map((fact) => (
                    <div key={fact.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
                          {fact.fact_key}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          {(fact.extraction_confidence * 100).toFixed(0)}% Confidence
                        </span>
                      </div>
                      <div className="text-slate-900 font-medium">{String(fact.fact_value)}</div>
                      <div className="text-slate-500 text-[11px] pt-1">
                        Citation: Pg {fact.source_page} &bull; <em>&ldquo;{fact.source_excerpt}&rdquo;</em>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-slate-200 pt-3">
                    <div className="font-bold text-slate-800 text-xs mb-2">Compiled Policy Clauses:</div>
                    {SAMPLE_CLAUSES.map((clause) => (
                      <div key={clause.id} className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-xs space-y-1 mb-2">
                        <div className="font-bold text-[#14233B]">{clause.clause_reference}: {clause.clause_title}</div>
                        <p className="text-slate-600 italic">&ldquo;{clause.clause_text}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* INVESTIGATION 6-STAGE AUDIT TRAIL */}
        {activeTab === "investigation" && (
          <Card>
            <CardHeader>
              <CardTitle>Bounded Multi-Stage Investigation Audit Log</CardTitle>
              <p className="text-xs text-slate-500 mt-1">
                Each stage executes bounded reasoning with deterministic checks and independent red-team verification.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  stage: "Stage A",
                  name: "Claim Parser",
                  desc: "Parsed manufacturer denial letter EAC-CLAIM-882194. Stated assertions: 'Warranty expired on Jan 9, 2026' and 'Liquid damage suspected'.",
                  badge: "Completed",
                  source: "Warranty-Rejection-Notice.pdf (Pg 1)",
                },
                {
                  stage: "Stage B",
                  name: "Policy Analyst",
                  desc: "Identified Section 3.1 (12-month coverage starting on purchase date) and Section 4.2 (Liquid damage exclusion requiring diagnostic proof).",
                  badge: "Completed",
                  source: "Manufacturer-Warranty-Policy-EAC.pdf (Pg 2, 4)",
                },
                {
                  stage: "Stage C",
                  name: "Evidence Analyst",
                  desc: "Extracted invoice purchase date (Jan 10, 2025) and service report observations ('external liquid suspected; internal sensors not tested').",
                  badge: "Completed",
                  source: "Invoice-Purchase-20250110.pdf (Pg 1), Technician-Field-Inspection-Report.pdf (Pg 1)",
                },
                {
                  stage: "Stage D",
                  name: "Deterministic Initial Investigator",
                  desc: "Evaluated TypeScript date calendar engine: Jan 10, 2025 + 12 months = Jan 10, 2026. Claim date was Dec 20, 2025. Result: TRUE (Within warranty).",
                  badge: "Completed",
                  source: "TypeScript Deterministic Calendar Engine",
                },
                {
                  stage: "Stage E",
                  name: "Independent Red-Team Auditor",
                  desc: "Challenged finding for ambiguous duration wording and checked service report for moisture indicator strip proof. Confirmed manufacturer failed to attach test results.",
                  badge: "Adversarial Challenge Passed",
                  source: "Red-Team Adversarial Engine",
                },
                {
                  stage: "Stage F",
                  name: "Final Reconciliation",
                  desc: "Synthesized conclusions: Manufacturer rejection is formally CONTRADICTED. Issued actionable dispute roadmap.",
                  badge: "Finalized",
                  source: "Final Reconciler",
                },
              ].map((s, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0 text-xs">
                  <div className="h-8 w-8 rounded-full bg-[#14233B] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-sm">{s.stage}: {s.name}</span>
                      <Badge variant="supported">{s.badge}</Badge>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{s.desc}</p>
                    <div className="text-[11px] text-slate-400 font-medium">Source: {s.source}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* EVIDENCE GRAPH TAB */}
        {activeTab === "graph" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#14233B]">Interactive Evidence Lineage Graph</h3>
                <p className="text-xs text-slate-500">
                  Visual representation of claims, policy dependencies, and documentary contradictions.
                </p>
              </div>
            </div>
            <EvidenceGraphViewer />
          </div>
        )}

        {/* REPORT TAB */}
        {activeTab === "report" && (
          <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-slate-300 shadow-sm space-y-8 text-xs text-slate-800">
            {/* Report Header */}
            <div className="border-b-2 border-[#14233B] pb-6 flex items-start justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-[#3867E8] uppercase tracking-wider">
                  WarrantyWise Dispute Dossier &bull; Forensic Audit
                </div>
                <h1 className="text-2xl font-extrabold text-[#14233B] tracking-tight mt-1">
                  Warranty Claim Investigation Report
                </h1>
                <div className="text-xs text-slate-500 mt-1">
                  Investigation Reference: <strong>WW-EAC-2026-991</strong> &bull; Generated: {new Date().toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <Badge variant="contradicted" className="text-sm px-3 py-1">
                  CONCLUSION: CONTRADICTED
                </Badge>
              </div>
            </div>

            {/* Case Overview */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Product & Model</span>
                <span className="font-bold text-slate-900">{caseData.product_name} ({caseData.model_number})</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Manufacturer / Retailer</span>
                <span className="font-bold text-slate-900">{caseData.manufacturer}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Purchase Date (Invoice)</span>
                <span className="font-semibold text-slate-800">{caseData.purchase_date}</span>
              </div>
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] block">Rejection Notice Date</span>
                <span className="font-semibold text-slate-800">{caseData.rejection_date}</span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                1. Executive Summary
              </h2>
              <p className="leading-relaxed text-slate-700">
                The manufacturer&apos;s formal warranty rejection has been investigated by comparing the stated denial notice against the original purchase invoice, manufacturer warranty policy, and service center inspection reports. The available evidence <strong>CONTRADICTS</strong> the manufacturer&apos;s stated reason for denial.
              </p>
            </div>

            {/* Findings */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                2. Key Factual Findings
              </h2>

              <div className="p-4 bg-red-50/70 rounded-lg border border-red-200 space-y-1">
                <div className="font-bold text-red-900">Finding 1: Expiry Date Assertion Contradicted</div>
                <p className="text-slate-700 leading-relaxed">
                  The manufacturer asserted that warranty coverage expired on Jan 9, 2026. However, purchase invoice verifies sale on Jan 10, 2025. Policy §3.1 specifies a 12-month period from purchase date. Deterministic calendar calculation confirms valid coverage through Jan 10, 2026. The claim was submitted Dec 20, 2025 and was fully active.
                </p>
              </div>

              <div className="p-4 bg-amber-50/70 rounded-lg border border-amber-200 space-y-1">
                <div className="font-bold text-amber-900">Finding 2: Unproven Liquid Damage Exclusion</div>
                <p className="text-slate-700 leading-relaxed">
                  Section 4.2 of the warranty policy excludes liquid damage only where diagnostic causation is verified. The service report explicitly notes external suspicion without conducting the required internal moisture strip test or providing PCB photographic evidence.
                </p>
              </div>
            </div>

            {/* Red Team Audit */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                3. Independent Red-Team Audit Summary
              </h2>
              <p className="text-slate-700 leading-relaxed">
                An adversarial challenge was conducted to test whether delivery delays or alternate policy clauses could justify denial. Review of Section 3.1 confirmed that warranty commencement is strictly pegged to original retail purchase date, and no contrary documentation exists from the service center.
              </p>
            </div>

            {/* Next Steps */}
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-1">
                4. Recommended Action Plan for Consumer
              </h2>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-700 leading-relaxed">
                <li>Submit a formal dispute reply citing Warranty Policy Section 3.1 and Invoice Purchase Date.</li>
                <li>Demand a copy of the internal inspection photo and moisture sensor strip test results.</li>
                <li>Request re-evaluation or escalation to the manufacturer executive dispute team.</li>
              </ol>
            </div>

            {/* Disclaimer */}
            <div className="border-t border-slate-200 pt-4 text-[10px] text-slate-400 leading-relaxed">
              <strong>DISCLAIMER:</strong> This report represents an objective documentary investigation comparing submitted files against policy rules. It does not constitute formal legal representation or a judicial determination. All findings are derived directly from provided records.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
