import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-sm text-purple-200/80 leading-relaxed">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">Privacy Policy</h1>
      <p className="text-xs text-purple-400 font-mono">Last updated: November 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Information Collection</h2>
        <p>
          Clip Matrix collects user account information (email, company details, social profile handles, and payout details
          such as UPI ID or bank account identifiers) required for campaign performance audits, view verification, and
          settlement execution.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Performance and API Data</h2>
        <p>
          We query public social media endpoints (such as Instagram Graph API, YouTube Data API, and TikTok public video
          metrics) to verify video view counts, engagement metrics, and timestamps submitted by platform clippers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Payout and Banking Data Security</h2>
        <p>
          Payout information is transmitted securely and handled through encrypted channels. We do not store raw credit
          card numbers or sensitive transaction passwords.
        </p>
      </section>
    </div>
  );
}
