"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  ChevronRight,
  LogOut,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SAMPLE_CASES } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";
import { Case } from "@/types";

export default function DashboardPage() {
  const [cases] = useState<Case[]>(SAMPLE_CASES);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("ALL");

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.product_name.toLowerCase().includes(search.toLowerCase()) ||
      c.manufacturer.toLowerCase().includes(search.toLowerCase());
    if (filter === "ALL") return matchesSearch;
    if (filter === "COMPLETED") return matchesSearch && c.status === "COMPLETED";
    if (filter === "NEEDS_REVIEW") return matchesSearch && c.status === "NEEDS_REVIEW";
    if (filter === "PROCESSING") return matchesSearch && c.status === "PROCESSING";
    return matchesSearch;
  });

  const totalCases = cases.length;
  const completedCount = cases.filter((c) => c.status === "COMPLETED").length;
  const needsReviewCount = cases.filter((c) => c.status === "NEEDS_REVIEW").length;
  const processingCount = cases.filter((c) => c.status === "PROCESSING" || c.status === "INVESTIGATING").length;

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#14233B] text-white flex flex-col shrink-0 border-r border-[#1B2F4E]">
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-[#1B2F4E]">
          <div className="h-8 w-8 rounded-lg bg-[#3867E8] flex items-center justify-center text-white">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <span className="font-bold text-base tracking-tight">WarrantyWise</span>
        </div>

        <div className="p-4 flex-1 space-y-6">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Workspace
            </div>
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#1B2F4E] text-white text-sm font-medium"
              >
                <FolderOpen className="h-4 w-4 text-[#3867E8]" />
                Investigations
              </Link>
              <Link
                href="/cases/demo-washing-machine"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-[#1B2F4E]/60 text-sm font-medium transition-colors"
              >
                <FileText className="h-4 w-4 text-emerald-400" />
                Featured Sample Case
              </Link>
            </nav>
          </div>

          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Quick Actions
            </div>
            <Link href="/cases/new">
              <Button variant="secondary" size="sm" className="w-full justify-start gap-2">
                <Plus className="h-4 w-4" />
                New Investigation
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-[#1B2F4E] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
              AV
            </div>
            <div className="text-xs">
              <div className="font-semibold text-white">Alex Vance</div>
              <div className="text-slate-400">Claims Analyst</div>
            </div>
          </div>
          <Link href="/login" className="text-slate-400 hover:text-white transition-colors" title="Sign out">
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-bold text-[#14233B]">Warranty Disputes Workspace</h1>
            <p className="text-xs text-slate-500">Documentary evidence intelligence & adversarial audit log</p>
          </div>
          <Link href="/cases/new">
            <Button variant="primary" size="sm" className="gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" />
              New Investigation
            </Button>
          </Link>
        </header>

        <main className="p-8 space-y-8 flex-1 overflow-y-auto">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Audits</div>
                  <div className="text-2xl font-bold text-[#14233B] mt-1">{totalCases}</div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-[#3867E8] flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Audits</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">{completedCount}</div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Needs Evidence</div>
                  <div className="text-2xl font-bold text-amber-600 mt-1">{needsReviewCount}</div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Processing Jobs</div>
                  <div className="text-2xl font-bold text-blue-600 mt-1">{processingCount}</div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table of Investigations */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Investigation Cases</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time status of submitted warranty dispute dossiers
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search product, brand, case..."
                    className="pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#3867E8] w-56"
                  />
                </div>

                <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
                  {["ALL", "COMPLETED", "NEEDS_REVIEW"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilter(tab)}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                        filter === tab ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {tab === "ALL" ? "All" : tab === "COMPLETED" ? "Completed" : "Needs Evidence"}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider">
                      <th className="py-3 px-6">Case Title & Product</th>
                      <th className="py-3 px-6">Manufacturer</th>
                      <th className="py-3 px-6">Rejection Date</th>
                      <th className="py-3 px-6">Status</th>
                      <th className="py-3 px-6">Conclusion</th>
                      <th className="py-3 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCases.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6">
                          <Link href={`/cases/${c.id}`} className="font-semibold text-slate-900 hover:text-[#3867E8]">
                            {c.title}
                          </Link>
                          <div className="text-slate-500 text-[11px] mt-0.5">
                            {c.product_name} &bull; Model: {c.model_number || "N/A"}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-700">{c.manufacturer}</td>
                        <td className="py-4 px-6 text-slate-600">{formatDate(c.rejection_date)}</td>
                        <td className="py-4 px-6">
                          <Badge variant={c.status === "COMPLETED" ? "neutral" : "processing"}>
                            {c.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          {c.final_conclusion === "CONTRADICTED" && (
                            <Badge variant="contradicted">Contradicted</Badge>
                          )}
                          {c.final_conclusion === "SUPPORTED" && (
                            <Badge variant="supported">Supported</Badge>
                          )}
                          {c.final_conclusion === "INSUFFICIENT_EVIDENCE" && (
                            <Badge variant="insufficient">Insufficient Evidence</Badge>
                          )}
                          {c.final_conclusion === "PENDING" && (
                            <Badge variant="neutral">Pending</Badge>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Link href={`/cases/${c.id}`}>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              Open Audit
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
