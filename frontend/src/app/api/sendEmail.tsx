import EmailTemplate from '@/components/email-template';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY in environment variables.");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const body = await req.json();
    const { name, email, phone, company, message, profession } = body;

    if (!name || !email || !phone || !company || !message || !profession) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailHtml = EmailTemplate({ name, email, phone, company, message, profession });

    const data = await resend.emails.send({
      from: 'Get2Act <noreply@gettoact.onmicrosoft.com>',
      to: ['admin@get2act.in', email],
      subject: 'Contact Form Submission',
      react: emailHtml as React.ReactElement,
    });

    console.log("Resend API Response:", data);

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });

  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
