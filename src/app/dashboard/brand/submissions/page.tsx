'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Share2, Filter, KeyRound } from 'lucide-react';
import { getStatusBadge } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

export default function BrandReviewSubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const initialCampId = searchParams.get('campaignId') || 'ALL';
  const [selectedCampaignId, setSelectedCampaignId] = useState(initialCampId);

  const fetchSubmissions = () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('portal', 'brand');
    if (selectedCampaignId !== 'ALL') {
      params.set('campaignId', selectedCampaignId);
    }

    Promise.all([
      fetch(`/api/submissions?${params.toString()}`).then((r) => r.json()),
      fetch('/api/campaigns?portal=brand').then((r) => r.json()),
    ])
      .then(([subData, campData]) => {
        if (subData.submissions) setSubmissions(subData.submissions);
        if (campData.campaigns) {
          setCampaigns(campData.campaigns.filter((c: any) => c.isUnlocked));
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubmissions();
  }, [selectedCampaignId]);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>CREATOR SOCIAL REACH MONITOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Viral Social Clips & Creator Accounts
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
            Track video clips circulating across creator social media channels, creator accounts, and audited view counts.
          </p>
        </div>

        {/* Campaign Filter Dropdown */}
        {campaigns.length > 0 && (
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-purple-400" />
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              className="bg-[#0f1322] border border-white/10 text-xs text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="ALL">All Brand Campaigns</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="rounded-3xl bg-gradient-to-b from-[#0f1322]/90 via-[#0a0d18]/95 to-[#060810] border border-white/[0.08] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead className="bg-[#0b0f1d] border-b border-white/[0.08] uppercase font-mono text-[10px] text-purple-400">
              <tr>
                <th className="py-3.5 px-4">Clip Ref</th>
                <th className="py-3.5 px-4">Campaign & Video Link</th>
                <th className="py-3.5 px-4">Clipper Account</th>
                <th className="py-3.5 px-4">Platform</th>
                <th className="py-3.5 px-4">Verified Views</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-slate-400 font-mono">
                    Loading verified clips...
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="space-y-3">
                      <Share2 className="w-8 h-8 text-purple-400 mx-auto opacity-50" />
                      <div className="text-sm font-bold text-white font-display">
                        {campaigns.length === 0 ? 'No Unlocked Campaigns Yet' : 'No Clips Found'}
                      </div>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                        {campaigns.length === 0
                          ? 'Unlock a registered campaign using its access code first to inspect its creator social accounts and verified views.'
                          : 'No video clips have been submitted for this unlocked campaign brief yet. Once clippers publish content, their social handles and view delivery will display here.'}
                      </p>
                      {campaigns.length === 0 && (
                        <div className="pt-2">
                          <Link
                            href="/dashboard/brand/campaigns"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Unlock Campaign with Code</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => {
                  const badge = getStatusBadge(sub.status);
                  return (
                    <tr key={sub.id} className="hover:bg-purple-950/20 transition-colors">
                      <td className="py-4 px-4 font-mono text-slate-400 text-[11px]">
                        {sub.submissionNumber}
                      </td>

                      <td className="py-4 px-4 space-y-1">
                        <div className="font-bold text-white text-xs">{sub.title}</div>
                        <div className="text-[11px] text-purple-400">
                          {sub.campaign?.title}
                        </div>
                        <a
                          href={sub.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline inline-flex items-center gap-1 text-[11px] font-semibold pt-0.5"
                        >
                          <span>Watch Live Post</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>

                      {/* Clipper Social Media Account ONLY - NO real name, NO profile */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-300 font-mono font-bold text-[11px]">
                          <span>{sub.clipperAccount || '@creator'}</span>
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/[0.04] border border-white/10 text-slate-300">
                          {sub.platform}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-sm font-mono">
                          {(sub.verifiedViews || 0).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-emerald-400 font-mono">Verified Views</div>
                      </td>

                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${badge.classes}`}>
                          {badge.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
