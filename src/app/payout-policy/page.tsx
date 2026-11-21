import React from 'react';

export default function PayoutPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-sm text-purple-200/80 leading-relaxed">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">Payout & Settlement Policy</h1>
      <p className="text-xs text-purple-400 font-mono">Effective: 2026</p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Settlement Schedules</h2>
        <p>
          Performance payouts are credited to clipper balances following the 48-hour to 7-day post-publication performance
          audit window. Once credited, clippers can trigger withdrawal requests anytime.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Minimum Cashout Limit</h2>
        <p>
          The minimum withdrawal amount is ₹500. Withdrawals are processed via UPI (Virtual Payment Address) or NEFT/IMPS
          direct bank transfer.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Gateway Charges & Taxes</h2>
        <p>
          Clip Matrix does not charge clippers withdrawal fees for standard UPI settlements. Applicable TDS and local tax
          withholding are accounted for in accordance with Indian financial regulations.
        </p>
      </section>
    </div>
  );
}
