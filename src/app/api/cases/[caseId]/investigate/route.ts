import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { InvestigationOrchestrator } from "@/services/investigation.service";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  try {
    const { caseId } = await params;
    const supabase = createAdminClient();

    // Fetch case and associated docs
    const { data: caseRecord, error: caseErr } = await supabase
      .from("cases")
      .select("*")
      .eq("id", caseId)
      .single();

    if (caseErr || !caseRecord) {
      return NextResponse.json({ success: false, error: "Case not found" }, { status: 404 });
    }

    // Run deterministic rules & multi-stage investigation orchestrator
    const result = await InvestigationOrchestrator.executeCaseInvestigation(
      caseRecord,
      [],
      [],
      []
    );

    // Update case record with the final reconciled verdict
    await supabase
      .from("cases")
      .update({
        status: "COMPLETED",
        final_conclusion: result.conclusion,
      })
      .eq("id", caseId);

    // Insert findings into database
    for (const finding of result.findings) {
      await supabase.from("investigation_findings").insert({
        case_id: caseId,
        investigation_run_id: caseId,
        finding_type: finding.finding_type,
        title: finding.title,
        description: finding.description,
        conclusion: finding.conclusion,
        severity: finding.severity,
        confidence: finding.confidence,
        verification_status: "CONFIRMED",
      });
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
