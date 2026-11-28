import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, company, message, phone, type, date, time } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const targetPhone = process.env.NEXT_PUBLIC_CONSULTATION_PHONE || '919820144520';
    const cleanTargetPhone = targetPhone.replace(/[^0-9]/g, '');

    const whatsappText = encodeURIComponent(
      `🚀 *New Clip Matrix Consultation Request*\n\n` +
      `👤 *Name*: ${name}\n` +
      `📧 *Email*: ${email}\n` +
      `📱 *Client Phone*: ${phone || 'Not provided'}\n` +
      `🏢 *Company/Channel*: ${company || 'N/A'}\n` +
      (date ? `📅 *Preferred Date*: ${date}\n` : '') +
      (time ? `⏰ *Preferred Time*: ${time} IST\n` : '') +
      `💬 *Campaign Goals / Message*:\n${message || 'N/A'}`
    );

    const whatsappUrl = `https://wa.me/${cleanTargetPhone}?text=${whatsappText}`;

    // Log consultation details and target WhatsApp routing
    console.log(`📩 [Clip Matrix Inquiry] From: ${name} (${email}, Phone: ${phone || 'N/A'}, Co: ${company || 'N/A'}) Type: ${type || 'Consultation'}`);
    if (date && time) {
      console.log(`📅 Consultation scheduled for ${date} at ${time}`);
    }
    console.log(`📱 Forwarding URL to WhatsApp: ${whatsappUrl}`);

    return NextResponse.json({
      success: true,
      whatsappUrl,
      targetPhone: cleanTargetPhone,
      message: date
        ? `Consultation booked successfully for ${date} at ${time}! Our creator strategy team will contact you.`
        : 'Thank you for reaching out! Our team will respond within 2 business hours.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
