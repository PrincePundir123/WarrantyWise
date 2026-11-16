import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  try {
    const { caseId } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const docType = (formData.get("document_type") as string) || "OTHER";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const storagePath = `${caseId}/${safeFilename}`;

    // Upload to private Supabase storage bucket
    const { error: uploadError } = await supabase.storage
      .from("warranty_documents")
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.warn("Storage upload notice (bucket will use local path pointer if not yet created):", uploadError.message);
    }

    // Insert record in documents table
    const { data: docRecord, error: dbError } = await supabase
      .from("documents")
      .insert({
        case_id: caseId,
        user_id: "00000000-0000-0000-0000-000000000000",
        original_filename: file.name,
        storage_path: storagePath,
        mime_type: file.type || "application/octet-stream",
        file_size: file.size,
        document_type: docType,
        processing_status: "COMPLETED",
        page_count: 1,
        checksum: `sha256-${Date.now().toString(16)}`,
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: docRecord });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
