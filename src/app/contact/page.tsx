'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, Send, CheckCircle2, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whatsappForwardUrl, setWhatsappForwardUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, message, date, time }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (data.whatsappUrl) {
          setWhatsappForwardUrl(data.whatsappUrl);
          // Auto-forward consultation details directly to WhatsApp
          try {
            window.open(data.whatsappUrl, '_blank');
          } catch {
            // Popup blocker fallback
          }
        }
      }
    } catch {
      alert('Failed to send inquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-800/60 uppercase tracking-widest font-mono">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display">
          Talk to Our <span className="text-gradient-neon">Creator Strategy Team</span>
        </h1>
        <p className="text-purple-200/70 text-base">
          Whether you want to launch a 10M-view clipping campaign or partner with our creator roster, we are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#130a24] border border-purple-900/50 space-y-6">
            <h2 className="text-xl font-bold text-white font-display">Contact Details</h2>

            <div className="space-y-4 text-sm text-purple-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-purple-400 font-medium">Email</div>
                  <a href="mailto:byclipmatrix@gmail.com" className="text-white font-semibold hover:text-cyan-400 transition-colors">
                    byclipmatrix@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-cyan-400 font-medium">Business Line</div>
                  <div className="text-white font-semibold">+91 98201 44520</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-pink-400 font-medium">Headquarters</div>
                  <div className="text-white font-semibold">Indiranagar, Bengaluru, Karnataka, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ info */}
          <div className="p-6 rounded-2xl bg-[#0e071c] border border-purple-900/40 text-xs text-purple-300 space-y-2">
            <div className="font-bold text-white">⚡ Response Time Guarantee</div>
            <p>Our campaign architects reply within 2 business hours between 9:00 AM - 8:00 PM IST.</p>
          </div>
        </div>

        {/* Contact & Consultation Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#140c26] border border-purple-900/50">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white font-display">Inquiry & Consultation Received!</h2>
              <p className="text-purple-200/80 text-sm max-w-md mx-auto">
                Thank you, {name}! Your consultation brief has been recorded. Click below to forward directly to our campaign architect on WhatsApp.
              </p>
              {whatsappForwardUrl && (
                <div className="pt-2">
                  <a
                    href={whatsappForwardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Forward to WhatsApp (+91 98201 44520)</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}
              <div className="pt-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-purple-400 underline hover:text-purple-200"
                >
                  Send another inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-white font-display mb-2">Book Consultation or Send Inquiry</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-purple-300 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-purple-300 font-medium">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vikram@brand.com"
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-purple-300 font-medium">Contact Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-purple-300 font-medium">Company or Channel Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. ZenPulse Nutrition"
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-purple-300 font-medium">Preferred Consultation Date (Optional)</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-purple-300 font-medium">Preferred Time (IST)</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-purple-300 font-medium">Campaign Goals or Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your product, podcast, or source footage, and estimated campaign budget..."
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Sending...' : 'Submit Inquiry & Reserve Slot'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
