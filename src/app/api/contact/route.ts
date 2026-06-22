import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    // 1. Try saving to Supabase (non-blocking — won't fail the request)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (supabaseUrl && serviceKey) {
        const supabase = createClient(supabaseUrl, serviceKey);
        const { error } = await supabase.from("leads").insert({
          name,
          email,
          phone:   phone   || null,
          company: company || null,
          message,
        });
        if (error) console.error("Supabase insert error:", error.message);
      }
    } catch (dbErr) {
      console.error("Supabase error (non-fatal):", dbErr);
    }

    // 2. Send email notification via Resend
    const resendKey  = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;

    if (!resendKey || !notifyEmail || notifyEmail === "you@youremail.com") {
      // Env not configured — still return success so form doesn't break
      console.warn("Resend not configured. Set RESEND_API_KEY and NOTIFY_EMAIL in .env.local");
      return NextResponse.json({ success: true });
    }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Monk Wise Media Website <onboarding@resend.dev>",
        to: notifyEmail,
        subject: `New lead: ${name} — ${company || email}`,
        html: `
          <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#071a1a;color:#e2f5f5;border-radius:12px;">
            <h2 style="color:#2dd4bf;margin-top:0;">New website lead 🎉</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#8ecece;width:120px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#8ecece;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#2dd4bf;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#8ecece;">Phone</td><td style="padding:8px 0;">${phone || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#8ecece;">Brand</td><td style="padding:8px 0;">${company || "—"}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#0d2626;border-radius:8px;border-left:3px solid #14b8a6;">
              <p style="margin:0;color:#8ecece;font-size:12px;margin-bottom:6px;">Message</p>
              <p style="margin:0;">${message}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Resend error:", errText);
      // Still return success — lead may be in Supabase
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
