import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();
    const { data: cases, error } = await supabase
      .from("cases")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: cases });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    // Default anonymous user id if not authenticated yet
    const userId = body.user_id || "00000000-0000-0000-0000-000000000000";

    const { data, error } = await supabase
      .from("cases")
      .insert({
        user_id: userId,
        title: body.title || `${body.product_name} Dispute`,
        product_name: body.product_name,
        manufacturer: body.manufacturer,
        product_category: body.product_category || "Consumer Electronics",
        model_number: body.model_number,
        serial_number: body.serial_number,
        purchase_date: body.purchase_date,
        purchase_price: body.purchase_price ? parseFloat(body.purchase_price) : null,
        currency: body.currency || "USD",
        country: body.country || "United States",
        claim_reference: body.claim_reference,
        rejection_date: body.rejection_date,
        rejection_reason: body.rejection_reason,
        status: "PROCESSING",
        final_conclusion: "PENDING",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
