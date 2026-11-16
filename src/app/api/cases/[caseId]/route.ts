import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  try {
    const { caseId } = await params;
    const supabase = createAdminClient();

    const { data: caseRecord, error } = await supabase
      .from("cases")
      .select("*")
      .eq("id", caseId)
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 });
    }

    // Also fetch associated documents, facts, and findings
    const [docs, facts, findings] = await Promise.all([
      supabase.from("documents").select("*").eq("case_id", caseId),
      supabase.from("extracted_facts").select("*").eq("case_id", caseId),
      supabase.from("investigation_findings").select("*").eq("case_id", caseId),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        case: caseRecord,
        documents: docs.data || [],
        facts: facts.data || [],
        findings: findings.data || [],
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
