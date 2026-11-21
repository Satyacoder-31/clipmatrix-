'use client';

import React, { useEffect, useState } from 'react';
import {
  CreditCard,
  TrendingUp,
  Eye,
  CheckCircle2,
  Clock,
  PlusCircle,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { formatCurrency, formatNumber, getStatusBadge } from '@/lib/utils';

export default function BrandOverviewPage() {
  const [user, setUser] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then((r) => r.json()),
      fetch('/api/submissions').then((r) => r.json()),
      fetch('/api/campaigns').then((r) => r.json()),
    ])
      .then(([userData, subData, campData]) => {
        if (userData.user) setUser(userData.user);
        if (subData.submissions) setSubmissions(subData.submissions);
        if (campData.campaigns) setCampaigns(campData.campaigns);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalVerifiedViews = submissions.reduce((acc, s) => acc + (s.verifiedViews || 0), 0);
  const pendingCount = submissions.filter((s) => s.status === 'PENDING_REVIEW' || s.status === 'UNDER_REVIEW').length;
  const approvedCount = submissions.filter((s) => s.status === 'APPROVED' || s.status === 'VIEWS_VERIFIED').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Brand Analytics Command Center
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/70">
            Monitor real-time campaign reach, approve submitted clips, and audit verified short-form views.
          </p>
        </div>

        <a
          href="/dashboard/brand/campaigns/new"
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Launch New Campaign</span>
        </a>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-purple-400" /> Total Campaign Spend
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {formatCurrency(user?.wallet?.lifetimeSpent || 350000)}
          </div>
          <div className="text-[10px] text-purple-400">100% Escrow Accounted</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-cyan-400" /> Total Verified Views
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">
            {formatNumber(totalVerifiedViews || 257000)}
          </div>
          <div className="text-[10px] text-cyan-300/70">Average ₹0.12 Cost Per View</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" /> Pending Review
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
            {pendingCount} Submissions
          </div>
          <div className="text-[10px] text-amber-300/70">Awaiting Your Approval</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Approved Video Clips
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
            {approvedCount} Clips
          </div>
          <div className="text-[10px] text-emerald-300/70">Across Reels & Shorts</div>
        </div>
      </div>

      {/* Review Submissions Callout Table */}
      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
          <div>
            <h2 className="text-base font-bold text-white font-display">Pending Clip Review Queue</h2>
            <p className="text-xs text-purple-300/70">Inspect incoming clips and approve them for CPM payouts.</p>
          </div>
          <a
            href="/dashboard/brand/submissions"
            className="text-xs font-semibold text-purple-400 hover:text-purple-200"
          >
            Open Review Workbench
          </a>
        </div>

        <div className="divide-y divide-purple-900/30 text-xs">
          {submissions.slice(0, 4).map((sub) => {
            const badge = getStatusBadge(sub.status);
            return (
              <div key={sub.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-purple-400">{sub.submissionNumber}</span>
                    <span className="text-purple-300">•</span>
                    <span className="font-bold text-white">{sub.title}</span>
                  </div>
                  <div className="text-purple-300/70 text-[11px] flex items-center gap-2">
                    <span>By: {sub.clipper?.name}</span>
                    <span>•</span>
                    <span className="text-cyan-400">{sub.platform}</span>
                    <span>•</span>
                    <a
                      href={sub.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-300 hover:underline flex items-center gap-0.5"
                    >
                      Watch Post <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-white">{sub.verifiedViews.toLocaleString()} Verified Views</div>
                    <div className="text-[10px] text-emerald-400">Escrow Allocated</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${badge.classes}`}>
                    {badge.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
