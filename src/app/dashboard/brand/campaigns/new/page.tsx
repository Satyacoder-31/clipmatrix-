'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FolderKanban } from 'lucide-react';

export default function BrandCreateCampaignRedirectPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-3xl bg-gradient-to-b from-[#0f1322]/90 via-[#0a0d18]/95 to-[#060810] border border-white/[0.08] p-8 sm:p-10 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
          Admin-Managed Campaigns
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Campaign briefs are managed and posted exclusively by Clip Matrix Administrators. Brands focus strictly on tracking live views and creator social reach.
        </p>
        <div className="pt-2">
          <Link
            href="/dashboard/brand/campaigns"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-90 transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
          >
            <FolderKanban className="w-4 h-4" />
            <span>Return to Campaign Tracker</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
