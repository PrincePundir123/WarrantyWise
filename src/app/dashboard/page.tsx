"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  ArrowUpRight,
  Archive,
  Compass,
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  SlidersHorizontal,
} from "lucide-react";
import { SAMPLE_CASES } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";
import { Case } from "@/types";

export default function EditorialDashboardPage() {
  const [cases] = useState<Case[]>(SAMPLE_CASES);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("ALL");

  const filteredCases = cases.filter((c) => {
    const matches =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.product_name.toLowerCase().includes(search.toLowerCase()) ||
      c.manufacturer.toLowerCase().includes(search.toLowerCase());
    if (filter === "ALL") return matches;
    if (filter === "COMPLETED") return matches && c.status === "COMPLETED";
    if (filter === "NEEDS_REVIEW") return matches && c.status === "NEEDS_REVIEW";
    return matches;
  });

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1F231F] font-sans selection:bg-[#AD593E] selection:text-white flex flex-col">
      {/* 1. Archival Masthead Header */}
      <header className="border-b border-[#DED8CB] bg-[#F4F1EA] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#1F231F]">
              WarrantyWise
            </Link>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#5F665E] hidden md:inline">
              // DISPUTE ARCHIVE &bull; REGISTRY
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/cases/demo-washing-machine"
              className="text-xs font-mono tracking-wider uppercase text-[#AD593E] hover:underline hidden sm:inline"
            >
              Exemplar Case &rarr;
            </Link>
            <Link
              href="/cases/new"
              className="px-4 py-2.5 bg-[#1F231F] hover:bg-[#383D38] text-[#FAF8F5] text-xs font-medium tracking-wide flex items-center gap-1.5 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              New Investigation
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 w-full space-y-12">
        {/* Editorial Title & Summary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#DED8CB] pb-8">
          <div className="lg:col-span-7 space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#AD593E]">
              DISPUTE DOSSIER INDEX &bull; AUTONOMOUS AUDITS
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1F231F] tracking-tight">
              Active Investigation Register
            </h1>
            <p className="text-sm text-[#5F665E] max-w-xl font-light">
              Autonomous forensic examinations comparing manufacturer denial statements against purchase invoices, diagnostic inspection reports, and policy boundary rules.
            </p>
          </div>

          {/* Minimalist Data Ledger (Replacing giant rounded cards) */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-4 text-xs font-mono">
            <div className="border-l border-[#DED8CB] pl-4 space-y-1">
              <span className="text-[#5F665E] text-[10px] uppercase block">Total Dossiers</span>
              <span className="font-serif text-2xl font-bold text-[#1F231F]">{cases.length}</span>
            </div>
            <div className="border-l border-[#DED8CB] pl-4 space-y-1">
              <span className="text-[#5F665E] text-[10px] uppercase block">Resolved</span>
              <span className="font-serif text-2xl font-bold text-[#55604A]">
                {cases.filter((c) => c.status === "COMPLETED").length}
              </span>
            </div>
            <div className="border-l border-[#DED8CB] pl-4 space-y-1">
              <span className="text-[#5F665E] text-[10px] uppercase block">Under Review</span>
              <span className="font-serif text-2xl font-bold text-[#AD593E]">
                {cases.filter((c) => c.status === "NEEDS_REVIEW").length}
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar — Minimal Archival Line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DED8CB] pb-4">
          <div className="flex items-center gap-2 max-w-md w-full">
            <Search className="h-4 w-4 text-[#5F665E]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by product, manufacturer, or claim reference..."
              className="bg-transparent text-xs text-[#1F231F] placeholder:text-[#929990] focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            {["ALL", "COMPLETED", "NEEDS_REVIEW"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`pb-1 transition-colors uppercase tracking-wider cursor-pointer ${
                  filter === tab
                    ? "text-[#1F231F] font-bold border-b border-[#1F231F]"
                    : "text-[#5F665E] hover:text-[#1F231F]"
                }`}
              >
                {tab === "ALL" ? "All Dossiers" : tab === "COMPLETED" ? "Resolved" : "Needs Proof"}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table — Clean Architectural Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#DED8CB] text-[10px] font-mono uppercase tracking-widest text-[#5F665E]">
                <th className="py-3 pr-6 font-medium">Claim Reference / Subject</th>
                <th className="py-3 px-6 font-medium">Manufacturer</th>
                <th className="py-3 px-6 font-medium">Denial Notice</th>
                <th className="py-3 px-6 font-medium">Audit Conclusion</th>
                <th className="py-3 pl-6 text-right font-medium">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED8CB]/60">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF8F5] transition-colors group">
                  <td className="py-4 pr-6">
                    <Link
                      href={`/cases/${c.id}`}
                      className="font-serif text-sm font-medium text-[#1F231F] group-hover:text-[#AD593E] transition-colors block"
                    >
                      {c.title}
                    </Link>
                    <div className="text-[11px] text-[#5F665E] mt-0.5">
                      {c.product_name} &bull; Model: {c.model_number || "—"}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#383D38] font-medium">{c.manufacturer}</td>
                  <td className="py-4 px-6 font-mono text-[11px] text-[#5F665E]">
                    {formatDate(c.rejection_date)}
                  </td>
                  <td className="py-4 px-6">
                    {c.final_conclusion === "CONTRADICTED" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#AD593E] bg-[#FBF0EC] border border-[#AD593E]/30">
                        Contradicted
                      </span>
                    )}
                    {c.final_conclusion === "SUPPORTED" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#55604A] bg-[#F2F5F0] border border-[#55604A]/30">
                        Supported
                      </span>
                    )}
                    {c.final_conclusion === "INSUFFICIENT_EVIDENCE" && (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#B0823C] bg-[#FDF7EE] border border-[#B0823C]/30">
                        Insufficient Evidence
                      </span>
                    )}
                  </td>
                  <td className="py-4 pl-6 text-right">
                    <Link
                      href={`/cases/${c.id}`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#1F231F] group-hover:text-[#AD593E] font-medium transition-colors"
                    >
                      Inspect File
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Archival Colophon Footer */}
      <footer className="border-t border-[#DED8CB] py-8 text-xs text-[#5F665E] mt-12 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[11px]">
            WARRANTYWISE // FORENSIC ARCHIVE REGISTRY &bull; 2026
          </div>
          <div className="flex items-center space-x-6 text-xs font-mono">
            <Link href="/" className="hover:text-[#1F231F]">Overview</Link>
            <Link href="/cases/demo-washing-machine" className="hover:text-[#1F231F]">Specimen</Link>
            <Link href="/cases/new" className="hover:text-[#1F231F]">New Audit</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
