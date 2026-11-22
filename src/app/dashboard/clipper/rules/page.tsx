'use client';

import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Zap,
  HelpCircle,
  FileText,
  BadgePercent,
  Compass,
} from 'lucide-react';
import Link from 'next/link';

export default function ClipperRulesPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#160b36] via-[#0d0c26] to-[#070a1a] border border-purple-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>CLIPPER PROTECTION PROTOCOL</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Escrow Rules & Fraud Prevention Policy
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl leading-relaxed">
            Every campaign on Clip Matrix has 100% upfront funds locked in smart escrow before you clip. Read these official rules to guarantee smooth payouts and protect your verified creator status.
          </p>
        </div>
      </div>

      {/* Grid of Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <Lock className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-base font-bold text-white font-display">100% Escrow Guarantee</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Brands deposit full budgets upfront into escrow. Once your clip generates audited organic views, your earnings are guaranteed by the smart reserve.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-base font-bold text-white font-display">Automated View Audits</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Official Instagram, YouTube Shorts, and TikTok APIs audit views every 6 hours. Legitimate organic engagement triggers instant balance credit.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <h3 className="text-base font-bold text-white font-display">Zero Bot Tolerance</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Use of automated bot views, click farms, or artificial engagement results in permanent account termination and total forfeiture of unpaid balances.
          </p>
        </div>
      </div>

      {/* Detailed Policy Sections */}
      <div className="space-y-6">
        {/* Section 1 */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3 text-cyan-400">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white font-display">1. Video Submission & Tagging Requirements</h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300/90 leading-relaxed space-y-2.5">
            <p>To qualify for CPM rewards and escrow release, your clip must satisfy all brief parameters:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 text-xs">
              <li>Must be edited in 9:16 vertical orientation (1080x1920 minimum resolution).</li>
              <li>Must clearly tag the brand's official account handle in both the video caption and on-screen text as specified in the campaign brief.</li>
              <li>Must include the official campaign hashtag (e.g. <span className="font-mono text-cyan-300">#ClipMatrix</span> or sponsor hashtag).</li>
              <li>Must remain published and publicly accessible for at least 30 days after submission. Deleting or archiving clips forfeits payout.</li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3 text-cyan-400">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white font-display">2. CPM Calculation & View Verification Window</h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300/90 leading-relaxed space-y-2.5">
            <p>
              Your payout is calculated using the formula:{' '}
              <span className="font-mono text-cyan-300 bg-white/[0.05] px-2 py-0.5 rounded">
                Payout = (Verified Organic Views / 1,000) × Campaign CPM Rate
              </span>
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 text-xs">
              <li>Verification begins within 2 hours of submitting the live video link in your dashboard.</li>
              <li>Views are audited and credited for up to 14 days from initial submission or until the campaign escrow cap is reached.</li>
              <li>Views from Tier 1 geographies (US, UK, CA, IN metros) receive standard 100% CPM valuation without dilution.</li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3 text-rose-400">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white font-display">3. Prohibited Conduct & Fraud Penalties</h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300/90 leading-relaxed space-y-2.5">
            <p className="text-rose-200/90">
              Our AI telemetry engine flags anomalous watch time curves, sudden retention drops, and proxy-based views. The following are strictly banned:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 text-xs">
              <li>Purchasing views, bot traffic, automated loopers, or engagement pod swaps.</li>
              <li>Submitting someone else's clip or re-uploading unedited long-form content without editing value.</li>
              <li>Submitting dead or private links, or changing visibility to private after approval.</li>
              <li><strong className="text-rose-300">Penalty:</strong> Immediate permanent ban of Clipper account, IP blacklist, and forfeiture of all accumulated wallet balance.</li>
            </ul>
          </div>
        </div>

        {/* Section 4 */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3 text-cyan-400">
            <BadgePercent className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white font-display">4. Payouts & Withdrawal Schedules</h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300/90 leading-relaxed space-y-2.5">
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 text-xs">
              <li>Minimum withdrawal threshold: <strong className="text-white font-mono">₹500</strong>.</li>
              <li>Payout methods supported: Instant UPI (GPay, PhonePe, Paytm) and Direct Bank NEFT/IMPS.</li>
              <li>Withdrawals are processed within 24 business hours following automated view reconciliation.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 rounded-2xl bg-[#140c26] border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Ready to start earning verified CPM?</h4>
          <p className="text-xs text-purple-300/70">Pick an active campaign from the marketplace and download source assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/clipper/campaigns"
            className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20"
          >
            <Compass className="w-4 h-4" />
            <span>Browse Marketplace</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
