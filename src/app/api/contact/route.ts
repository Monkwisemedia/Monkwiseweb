import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client using the service role key so inserts work
// even with restrictive Row Level Security policies on the table.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const { error: dbError } = await supabaseAdmin.from("leads").insert({
      name,
      email,
      phone: phone || null,
      company: company || null,
      message,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Could not save your message. Please try again." },
        { status: 500 }
      );
    }

    // Send an email notification via Resend, if configured.
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;

    if (resendKey && notifyEmail) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Monk Wise Media Website <onboarding@resend.dev>",
            to: notifyEmail,
            subject: `New lead: ${name}`,
            html: `
              <h2>New website lead</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "—"}</p>
              <p><strong>Company:</strong> ${company || "—"}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            `,
          }),
        });
      } catch (emailError) {
        // Don't fail the request if email sending fails — the lead is
        // already saved in Supabase and visible in the dashboard.
        console.error("Resend email error:", emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
