import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, company, message, phone, type, date, time } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // In production this connects to Resend or SendGrid email service
    console.log(`📩 [Clip Matrix Inquiry] From: ${name} (${email}, Co: ${company || 'N/A'}) Type: ${type || 'Inquiry'}`);
    if (date && time) {
      console.log(`📅 Consultation scheduled for ${date} at ${time}`);
    }

    return NextResponse.json({
      success: true,
      message: date
        ? `Consultation booked successfully for ${date} at ${time}! Our creator strategy team will contact you.`
        : 'Thank you for reaching out! Our team will respond within 2 business hours.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
