"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileCheck,
  CheckCircle2,
  Trash2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { DocumentType } from "@/types";

interface UploadedFileEntry {
  id: string;
  file: File;
  name: string;
  size: number;
  type: DocumentType;
}

export default function NewCaseWizardPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Step 1: Product Information
  const [productName, setProductName] = useState("SmartHome Front Load Washing Machine 9kg");
  const [manufacturer, setManufacturer] = useState("Example Appliances Corp");
  const [category, setCategory] = useState("Home Appliances");
  const [modelNumber, setModelNumber] = useState("WM-9000X-INV");
  const [serialNumber, setSerialNumber] = useState("SN-EAC-2025-99812");
  const [purchaseDate, setPurchaseDate] = useState("2025-01-10");
  const [purchasePrice, setPurchasePrice] = useState("899.00");
  const [currency, setCurrency] = useState("USD");
  const [country, setCountry] = useState("United States");

  // Step 2: Rejection Information
  const [claimReference, setClaimReference] = useState("EAC-CLAIM-882194");
  const [rejectionDate, setRejectionDate] = useState("2025-12-20");
  const [rejectionReason, setRejectionReason] = useState(
    "Claim rejected. The manufacturer states that the standard 12-month warranty period expired on Jan 9, 2026, and physical liquid damage was suspected by the service agent."
  );

  // Step 3: Uploaded Documents
  const [documents, setDocuments] = useState<UploadedFileEntry[]>([
    {
      id: "doc-sample-invoice",
      file: new File(["Sample Invoice"], "Invoice-Purchase-20250110.pdf", { type: "application/pdf" }),
      name: "Invoice-Purchase-20250110.pdf",
      size: 142000,
      type: "INVOICE",
    },
    {
      id: "doc-sample-policy",
      file: new File(["Sample Policy"], "Manufacturer-Warranty-Policy-EAC.pdf", { type: "application/pdf" }),
      name: "Manufacturer-Warranty-Policy-EAC.pdf",
      size: 328000,
      type: "WARRANTY_POLICY",
    },
    {
      id: "doc-sample-rejection",
      file: new File(["Sample Denial Letter"], "Warranty-Rejection-Notice.pdf", { type: "application/pdf" }),
      name: "Warranty-Rejection-Notice.pdf",
      size: 89000,
      type: "REJECTION_EMAIL",
    },
    {
      id: "doc-sample-service",
      file: new File(["Sample Service Ticket"], "Technician-Field-Inspection-Report.pdf", { type: "application/pdf" }),
      name: "Technician-Field-Inspection-Report.pdf",
      size: 215000,
      type: "SERVICE_REPORT",
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: "doc-" + Math.random().toString(36).substring(7),
        file,
        name: file.name,
        size: file.size,
        type: "OTHER" as DocumentType,
      }));
      setDocuments((prev) => [...prev, ...newFiles]);
    }
  };

  const removeDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const updateDocType = (id: string, newType: DocumentType) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, type: newType } : d))
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulating deterministic orchestration launch
    setTimeout(() => {
      router.push("/cases/demo-washing-machine");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col font-sans">
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-[#3867E8]" />
          <span className="font-bold text-slate-800 text-sm">New Dispute Investigation Wizard</span>
        </div>
        <div className="text-xs text-slate-500 font-medium">Step {step} of 4</div>
      </header>

      <main className="max-w-3xl mx-auto w-full py-10 px-4 sm:px-6 flex-1">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 w-full -z-10" />
          {[
            { num: 1, label: "Product & Purchase" },
            { num: 2, label: "Rejection Assertions" },
            { num: 3, label: "Evidence Dossier" },
            { num: 4, label: "Review & Launch" },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center bg-[#F7F8FA] px-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s.num
                    ? "bg-[#3867E8] text-white ring-4 ring-blue-100"
                    : step > s.num
                    ? "bg-emerald-600 text-white"
                    : "bg-white border border-slate-300 text-slate-500"
                }`}
              >
                {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
              </div>
              <span className={`text-xs mt-1 font-medium ${step === s.num ? "text-slate-900 font-bold" : "text-slate-500"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Steps */}
        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Product & Purchase Information</CardTitle>
                <p className="text-xs text-slate-500 mt-1">
                  Enter the product identity and original purchase record for deterministic warranty calculation.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Product Name"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <Input
                    label="Manufacturer / Brand"
                    required
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <Input
                    label="Model Number"
                    value={modelNumber}
                    onChange={(e) => setModelNumber(e.target.value)}
                  />
                  <Input
                    label="Serial Number"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Purchase Date"
                    type="date"
                    required
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                  <Input
                    label="Purchase Price"
                    type="number"
                    step="0.01"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                  />
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-[#3867E8] focus:outline-none focus:ring-1 focus:ring-[#3867E8]"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="primary" onClick={() => setStep(2)}>
                  Next: Rejection Information
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Manufacturer Rejection Assertions</CardTitle>
                <p className="text-xs text-slate-500 mt-1">
                  Specify the exact denial statements and claim reference number provided by the manufacturer.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Claim Reference #"
                    value={claimReference}
                    onChange={(e) => setClaimReference(e.target.value)}
                    placeholder="e.g. CLAIM-98214"
                  />
                  <Input
                    label="Date of Rejection Notice"
                    type="date"
                    required
                    value={rejectionDate}
                    onChange={(e) => setRejectionDate(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Manufacturer&apos;s Stated Reason (Verbatim or Summary)
                  </label>
                  <textarea
                    rows={4}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 focus:border-[#3867E8] focus:outline-none focus:ring-1 focus:ring-[#3867E8]"
                    placeholder="Paste the manufacturer's denial text here..."
                  />
                  <p className="text-xs text-slate-500">
                    Our Stage A Claim Parser will extract specific factual assertions and cross-reference them.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button variant="primary" onClick={() => setStep(3)}>
                  Next: Upload Evidence
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Upload Evidence Dossier</CardTitle>
                <p className="text-xs text-slate-500 mt-1">
                  Attach invoices, policy warranties, denial emails, and service reports. Every claim is strictly grounded in these files.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Upload dropzone */}
                <label className="border-2 border-dashed border-slate-300 hover:border-[#3867E8] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/20 transition-colors">
                  <Upload className="h-8 w-8 text-slate-400 mb-2" />
                  <span className="text-sm font-semibold text-slate-800">
                    Click to select files or drag & drop
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    PDF, JPG, PNG, TXT supported (Max 25MB per file)
                  </span>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.txt"
                  />
                </label>

                {/* Attached files list */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Attached Documents ({documents.length})
                  </span>
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="h-5 w-5 text-[#3867E8] shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-800 truncate">{doc.name}</div>
                          <div className="text-slate-500 text-[11px]">
                            {(doc.size / 1024).toFixed(0)} KB
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <select
                          value={doc.type}
                          onChange={(e) => updateDocType(doc.id, e.target.value as DocumentType)}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
                        >
                          <option value="INVOICE">Purchase Invoice</option>
                          <option value="WARRANTY_POLICY">Warranty Policy</option>
                          <option value="REJECTION_EMAIL">Rejection Email</option>
                          <option value="SERVICE_REPORT">Service Report</option>
                          <option value="PRODUCT_PHOTO">Product Photo</option>
                          <option value="OTHER">Other Evidence</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removeDoc(doc.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button variant="primary" onClick={() => setStep(4)}>
                  Next: Review & Launch
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </>
          )}

          {step === 4 && (
            <>
              <CardHeader>
                <CardTitle>Review & Initiate Investigation</CardTitle>
                <p className="text-xs text-slate-500 mt-1">
                  Confirm the dossier details before initiating the bounded multi-stage AI reasoning workflow.
                </p>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="font-bold text-slate-900 text-sm">Product Summary</div>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <div><span className="text-slate-400 font-medium">Product:</span> {productName}</div>
                    <div><span className="text-slate-400 font-medium">Brand:</span> {manufacturer}</div>
                    <div><span className="text-slate-400 font-medium">Purchase Date:</span> {purchaseDate}</div>
                    <div><span className="text-slate-400 font-medium">Serial #:</span> {serialNumber || "N/A"}</div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm">Manufacturer Stated Reason</div>
                  <p className="text-slate-700 italic bg-white p-3 rounded-lg border border-slate-200">
                    &ldquo;{rejectionReason}&rdquo;
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm">Document Inventory ({documents.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {documents.map((d) => (
                      <span key={d.id} className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-700">
                        {d.name} ({d.type})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 text-[#3867E8] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Once initiated, WarrantyWise will run deterministic date calculations, extract policy clauses, check for contradictions, and subject all claims to an independent Red-Team audit.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button variant="primary" onClick={handleSubmit} isLoading={loading}>
                  Launch Investigation
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </main>
    </div>
  );
}
