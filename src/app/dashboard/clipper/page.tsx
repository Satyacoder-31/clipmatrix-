'use client';

import React, { useEffect, useState } from 'react';
import {
  Wallet,
  TrendingUp,
  Video,
  Eye,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency, formatNumber, getStatusBadge } from '@/lib/utils';

export default function ClipperOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then((r) => r.json()),
      fetch('/api/submissions').then((r) => r.json()),
    ])
      .then(([userData, subData]) => {
        if (userData.user) {
          setStats(userData.user);
        }
        if (subData.submissions) {
          setSubmissions(subData.submissions);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const totalVerifiedViews = submissions.reduce((acc, s) => acc + (s.verifiedViews || 0), 0);
  const totalApproved = submissions.filter((s) => s.status === 'APPROVED' || s.status === 'VIEWS_VERIFIED').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Clipper Command Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/70">
            Track performance views, submission approvals, and withdraw verified CPM rewards.
          </p>
        </div>

        <a
          href="/dashboard/clipper/submit"
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Video className="w-4 h-4" />
          <span>Submit New Clip</span>
        </a>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-emerald-400" /> Withdrawable Balance
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
            {formatCurrency(stats?.wallet?.balance || 0)}
          </div>
          <div className="text-[10px] text-purple-300/70">Instant UPI Cashout Ready</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-purple-400" /> Lifetime Earned
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {formatCurrency(stats?.wallet?.lifetimeEarned || 0)}
          </div>
          <div className="text-[10px] text-purple-400">Total Rewards Dispatched</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-cyan-400" /> Verified Views
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">
            {formatNumber(totalVerifiedViews)}
          </div>
          <div className="text-[10px] text-cyan-300/70">Across Short Video Feeds</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-pink-400" /> Approved Submissions
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {totalApproved} / {submissions.length}
          </div>
          <div className="text-[10px] text-purple-300/70">High Pacing Approval Ratio</div>
        </div>
      </div>

      {/* Recent Submissions Feed */}
      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
          <h2 className="text-base font-bold text-white font-display">Your Recent Video Submissions</h2>
          <a
            href="/dashboard/clipper/submissions"
            className="text-xs font-semibold text-purple-400 hover:text-purple-200 transition-colors"
          >
            View All ({submissions.length})
          </a>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <p className="text-sm text-purple-300">You haven't submitted any clips yet.</p>
            <a
              href="/dashboard/clipper/campaigns"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 inline-block shadow-glow-purple"
            >
              Browse Active Campaigns to Clip
            </a>
          </div>
        ) : (
          <div className="divide-y divide-purple-900/30 text-xs">
            {submissions.slice(0, 5).map((sub) => {
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
                      <span>Campaign: {sub.campaign?.title}</span>
                      <span>•</span>
                      <a
                        href={sub.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-0.5"
                      >
                        Watch Live Post <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-white">{sub.verifiedViews.toLocaleString()} Views</div>
                      <div className="text-emerald-400 font-semibold text-[11px]">
                        {sub.rewardEarned > 0 ? `Earned ₹${sub.rewardEarned.toLocaleString('en-IN')}` : 'Calculating...'}
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${badge.classes}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
