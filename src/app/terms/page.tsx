import React from 'react';

export default function LegalPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-sm text-purple-200/80 leading-relaxed">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">Terms of Service & Platform Policies</h1>
      <p className="text-xs text-purple-400 font-mono">Last updated: November 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Platform Nature and Escrow Workflows</h2>
        <p>
          Clip Matrix operates a decentralized marketplace connecting brand advertisers ("Brands") with independent
          short-form video editors and creators ("Clippers"). All campaign budgets deposited by Brands are held in
          non-custodial escrow balances until video performance benchmarks (verified views) are audited.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. View Verification and Anti-Fraud</h2>
        <p>
          Payouts on CPM and bounty campaigns are contingent on authentic views generated from genuine audience reach.
          Artificial view inflation, automated bots, click farms, or deceptive metrics result in immediate termination of
          the clipper account and permanent forfeiture of pending balances.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Content Rights and Ad Whitelisting</h2>
        <p>
          By submitting video edits under a Brand campaign, Clippers grant the Brand a non-exclusive, worldwide digital
          distribution license to feature, promote, and whitelist the approved content for Meta Spark Ads, YouTube
          Promotions, and TikTok Spark Ads.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Payouts and Settlements</h2>
        <p>
          Withdrawable balances can be settled via UPI or Bank IMPS/NEFT upon reaching the platform minimum threshold of
          ₹500. Settlements are typically processed within 24 business hours.
        </p>
      </section>
    </div>
  );
}
