"use client";

import React, { useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  X,
  FileCheck,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const initialNodes: Node[] = [
  {
    id: "rejection-denial",
    type: "default",
    position: { x: 380, y: 30 },
    data: {
      label: "Manufacturer Rejection Notice",
      document: "Warranty-Rejection-Notice.pdf",
      page: 1,
      excerpt: "Claim rejected: The standard warranty period expired on Jan 9, 2026. Liquid damage suspected.",
      type: "REJECTION_ASSERTION",
      badge: "Denial Assertion",
      status: "contradicted",
    },
    style: {
      background: "#FEF2F2",
      border: "2px solid #EF4444",
      borderRadius: "12px",
      padding: "12px",
      width: 260,
      fontSize: "12px",
      fontWeight: "bold",
    },
  },
  {
    id: "invoice-purchase",
    type: "default",
    position: { x: 80, y: 190 },
    data: {
      label: "Invoice: Purchase Date Jan 10, 2025",
      document: "Invoice-Purchase-20250110.pdf",
      page: 1,
      excerpt: "Date of Sale: January 10, 2025. Item: SmartHome Washing Machine 9kg.",
      type: "INVOICE_FACT",
      badge: "Invoice Proof",
      status: "supported",
    },
    style: {
      background: "#F0FDF4",
      border: "2px solid #22C55E",
      borderRadius: "12px",
      padding: "12px",
      width: 250,
      fontSize: "12px",
      fontWeight: "bold",
    },
  },
  {
    id: "policy-duration",
    type: "default",
    position: { x: 80, y: 350 },
    data: {
      label: "Policy: 12-Month Coverage Clause",
      document: "Manufacturer-Warranty-Policy-EAC.pdf",
      page: 2,
      excerpt: "Section 3.1: Warranted against manufacturing defects for 12 months from original purchase date.",
      type: "POLICY_CLAUSE",
      badge: "Policy Clause §3.1",
      status: "supported",
    },
    style: {
      background: "#EFF6FF",
      border: "2px solid #3B82F6",
      borderRadius: "12px",
      padding: "12px",
      width: 250,
      fontSize: "12px",
      fontWeight: "bold",
    },
  },
  {
    id: "service-report",
    type: "default",
    position: { x: 680, y: 190 },
    data: {
      label: "Field Report: Liquid Damage Suspected",
      document: "Technician-Field-Inspection-Report.pdf",
      page: 1,
      excerpt: "Observation: Liquid damage suspected on exterior casing. Moisture sensor strip test not performed.",
      type: "SERVICE_REPORT",
      badge: "Service Report",
      status: "insufficient",
    },
    style: {
      background: "#FFFBEB",
      border: "2px solid #F59E0B",
      borderRadius: "12px",
      padding: "12px",
      width: 260,
      fontSize: "12px",
      fontWeight: "bold",
    },
  },
  {
    id: "missing-moisture-proof",
    type: "default",
    position: { x: 680, y: 350 },
    data: {
      label: "Missing: Moisture Sensor Test & Photos",
      document: "Technician-Field-Inspection-Report.pdf",
      page: 1,
      excerpt: "No diagnostic strip test or high-resolution PCB photographs attached to prove internal liquid entry.",
      type: "MISSING_EVIDENCE",
      badge: "Missing Proof",
      status: "insufficient",
    },
    style: {
      background: "#FFF1F2",
      border: "2px dashed #E11D48",
      borderRadius: "12px",
      padding: "12px",
      width: 260,
      fontSize: "12px",
      fontWeight: "bold",
    },
  },
  {
    id: "finding-reconciled",
    type: "default",
    position: { x: 380, y: 460 },
    data: {
      label: "Final Verdict: CONTRADICTED",
      document: "Final Investigation Report",
      page: 1,
      excerpt: "The claim rejection is contradicted by documentary facts. The unit was within the 12-month period and no liquid damage causation was proven.",
      type: "FINDING",
      badge: "Reconciled Finding",
      status: "contradicted",
    },
    style: {
      background: "#14233B",
      color: "#FFFFFF",
      border: "2px solid #3867E8",
      borderRadius: "12px",
      padding: "14px",
      width: 280,
      fontSize: "13px",
      fontWeight: "bold",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e-invoice-to-denial",
    source: "invoice-purchase",
    target: "rejection-denial",
    label: "CONTRADICTS (Active Coverage)",
    animated: true,
    style: { stroke: "#EF4444", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#EF4444" },
  },
  {
    id: "e-policy-to-invoice",
    source: "policy-duration",
    target: "invoice-purchase",
    label: "DEPENDS_ON (Start Trigger)",
    style: { stroke: "#3B82F6", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#3B82F6" },
  },
  {
    id: "e-service-to-denial",
    source: "service-report",
    target: "rejection-denial",
    label: "UNVERIFIED (Suspicion only)",
    style: { stroke: "#F59E0B", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#F59E0B" },
  },
  {
    id: "e-missing-to-service",
    source: "missing-moisture-proof",
    target: "service-report",
    label: "MISSING_EVIDENCE",
    animated: true,
    style: { stroke: "#E11D48", strokeWidth: 2, strokeDasharray: "4 4" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#E11D48" },
  },
  {
    id: "e-invoice-to-finding",
    source: "invoice-purchase",
    target: "finding-reconciled",
    style: { stroke: "#22C55E", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#22C55E" },
  },
  {
    id: "e-missing-to-finding",
    source: "missing-moisture-proof",
    target: "finding-reconciled",
    style: { stroke: "#E11D48", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#E11D48" },
  },
];

export function EvidenceGraphViewer() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<any>(initialNodes[0]);

  const onNodeClick = (_: any, node: Node) => {
    setSelectedNode(node);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[620px] rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
      {/* Interactive React Flow Canvas */}
      <div className="flex-1 h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background color="#cbd5e1" gap={16} />
          <Controls position="top-left" />
          <MiniMap
            nodeStrokeColor="#14233B"
            nodeColor="#E2E8F0"
            className="rounded-lg shadow-sm"
          />
        </ReactFlow>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs p-3 rounded-lg border border-slate-200 text-[11px] space-y-1.5 shadow-xs">
          <div className="font-bold text-slate-800">Edge Legend:</div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-4 bg-red-500 rounded"></span>
            <span className="text-slate-600">Contradicts Denial Statement</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-4 bg-blue-500 rounded"></span>
            <span className="text-slate-600">Policy Requirement Dependency</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-4 bg-amber-500 rounded"></span>
            <span className="text-slate-600">Missing Evidence Requirement</span>
          </div>
        </div>
      </div>

      {/* Selected Node Provenance Side Panel */}
      {selectedNode && (
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-slate-200 p-5 bg-slate-50 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Node Provenance
              </span>
              <Badge variant={selectedNode.data.status}>
                {selectedNode.data.badge}
              </Badge>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm">
                {selectedNode.data.label}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Type: <span className="font-mono text-[11px] font-semibold">{selectedNode.data.type}</span>
              </p>
            </div>

            <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-[#3867E8]" />
                  {selectedNode.data.document}
                </span>
                <span>Pg {selectedNode.data.page}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-100 text-slate-700 italic">
                &ldquo;{selectedNode.data.excerpt}&rdquo;
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] rounded-lg space-y-1">
              <div className="font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Citation
              </div>
              <p>
                Anchored to verbatim excerpt with SHA-256 document checksum.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 text-center">
            Click any graph node to inspect exact source proof.
          </div>
        </aside>
      )}
    </div>
  );
}

