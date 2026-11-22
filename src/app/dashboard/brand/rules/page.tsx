'use client';

import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  PlusCircle,
  FolderKanban,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

export default function BrandRulesPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#160b36] via-[#0d0c26] to-[#070a1a] border border-purple-500/30 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>BRAND ESCROW COMPLIANCE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Brand Escrow Rules & Campaign Standards
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-2xl leading-relaxed">
            Clip Matrix protects sponsor budgets by locking 100% of funds in smart escrow, disbursing strictly against authenticated, fraud-verified views.
          </p>
        </div>
      </div>

      {/* Grid of Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <Lock className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-base font-bold text-white font-display">Full Escrow Protection</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Budgets are held securely in escrow. Clippers only get paid as they deliver verified organic views meeting your quality threshold.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-base font-bold text-white font-display">Refund On Unused Escrow</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            If a campaign expires or is paused before budget depletion, the unallocated escrow balance is instantly refundable to your billing wallet.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white font-display">Approval Authority</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Brands hold the right to reject submissions that violate guidelines, misuse brand assets, or fail to include mandatory tags.
          </p>
        </div>
      </div>

      {/* Policy Details */}
      <div className="space-y-6">
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3 text-cyan-400">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white font-display">1. Escrow Funding & Deposit Terms</h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300/90 leading-relaxed space-y-2.5">
            <p>
              When publishing a campaign to the Clip Matrix Marketplace, the specified budget must be deposited into escrow via Bank Transfer, Razorpay, or Stripe.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 text-xs">
              <li>Escrow locks 100% of the campaign reward allocation.</li>
              <li>Platform fee is 10% calculated exclusively on verified views delivered.</li>
              <li>Unused balances can be reclaimed at any time after the 14-day minimum campaign window.</li>
            </ul>
          </div>
        </div>

        <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1022] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3 text-rose-400">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-white font-display">2. Automated Anti-Bot Safeguards</h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300/90 leading-relaxed space-y-2.5">
            <p>
              Clip Matrix deploys deep-learning anomaly detection against every submitted clip to filter out invalid traffic.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 text-xs">
              <li>Views from data centers, proxy rotators, or known engagement pods are automatically deducted before CPM billing.</li>
              <li>Sudden unnatural spikes without corresponding retention or comments trigger an automatic 48-hour manual investigation.</li>
              <li>Brands are never billed for fraudulent or disqualified views.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="p-6 rounded-2xl bg-[#140c26] border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Ready to deploy a high-converting campaign?</h4>
          <p className="text-xs text-purple-300/70">Set your CPM rate, upload raw assets, and unleash 5,000+ vetted clippers.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/brand/campaigns/new"
            className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch Campaign</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
