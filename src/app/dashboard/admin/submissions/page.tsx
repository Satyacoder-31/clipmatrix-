'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  Eye,
  ExternalLink,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  Zap,
  ArrowRight,
  UserCheck,
  Video,
  ArrowLeft,
  DollarSign,
  Users,
  CheckCheck,
  RefreshCw,
  Heart,
  MessageSquare,
  Share2,
  BarChart3,
  Layers,
  FolderOpen,
  Wallet,
  Check,
} from 'lucide-react';
import Link from 'next/link';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function AdminSubmissionsReviewPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [campaignSearch, setCampaignSearch] = useState('');
  const [rejectModalSub, setRejectModalSub] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('Missing required brand hashtag or handle tag in video caption.');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  // In-Place Audit State
  const [auditSub, setAuditSub] = useState<any | null>(null);
  const [auditScraping, setAuditScraping] = useState(false);
  const [auditScrapedData, setAuditScrapedData] = useState<any | null>(null);
  const [auditVerifiedViews, setAuditVerifiedViews] = useState('');
  const [auditVerifying, setAuditVerifying] = useState(false);
  const [auditMsg, setAuditMsg] = useState('');

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/campaigns?status=ALL');
      const data = await res.json();
      if (data.campaigns && Array.isArray(data.campaigns)) {
        setCampaigns(data.campaigns);
      }
    } catch {
      // Fallback
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/submissions');
      const data = await res.json();
      if (data.submissions && Array.isArray(data.submissions)) {
        setSubmissions(data.submissions);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchSubmissions();
  }, []);

  const handleApprove = async (sub: any) => {
    setActionLoading(sub.id);
    try {
      const res = await fetch(`/api/submissions/${sub.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'APPROVED',
          reviewNotes: 'Approved by Admin. Clip verified compliant with campaign guidelines.',
        }),
      });
      if (res.ok) {
        setToastMsg(`✅ Approved ${sub.submissionNumber} (${sub.title})! User wallet credited.`);
        fetchSubmissions();
      }
    } catch {
      setToastMsg('❌ Failed to approve submission');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectModalSub) return;
    setActionLoading(rejectModalSub.id);
    try {
      const res = await fetch(`/api/submissions/${rejectModalSub.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'REJECTED',
          rejectionReason,
          reviewNotes: `Rejected by Admin: ${rejectionReason}`,
        }),
      });
      if (res.ok) {
        setToastMsg(`❌ Rejected ${rejectModalSub.submissionNumber}. Clipper notified.`);
        setRejectModalSub(null);
        fetchSubmissions();
      }
    } catch {
      setToastMsg('❌ Failed to reject submission');
    } finally {
      setActionLoading(null);
    }
  };

  // In-place Audit Logic
  const handleOpenAudit = (sub: any) => {
    setAuditSub(sub);
    setAuditScrapedData(null);
    setAuditMsg('');
    const initialCount = sub.verifiedViews || sub.reportedViews || 0;
    setAuditVerifiedViews(initialCount.toString());
    triggerLiveScrape(sub.videoUrl, sub.id);
  };

  const handleCloseAudit = () => {
    const targetSubId = auditSub?.id;
    setAuditSub(null);
    if (targetSubId) {
      setTimeout(() => {
        const el = document.getElementById(`clip-${targetSubId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    }
  };

  const triggerLiveScrape = async (url: string, submissionId?: string) => {
    if (!url) return;
    setAuditScraping(true);
    setAuditMsg('');
    try {
      const res = await fetch('/api/verification/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, submissionId }),
      });
      const data = await res.json();
      if (res.ok && data.stats) {
        setAuditScrapedData(data.stats);
        if (data.stats.viewCount > 0) {
          setAuditVerifiedViews(data.stats.viewCount.toString());
        } else if (auditSub?.reportedViews > 0) {
          setAuditVerifiedViews(auditSub.reportedViews.toString());
        }
        setAuditMsg('⚡ Live video metrics loaded successfully!');
      } else {
        setAuditMsg(`Notice: Real-time scraper status: ${data.error || 'using cached metrics'}`);
      }
    } catch {
      setAuditMsg('Notice: Auditing with system verification profile.');
    } finally {
      setAuditScraping(false);
    }
  };

  const handleVerifyViewsAndCredit = async () => {
    if (!auditSub) return;
    setAuditVerifying(true);
    setAuditMsg('');
    try {
      const viewsNum = parseInt(auditVerifiedViews, 10);
      const res = await fetch('/api/verification/verify-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: auditSub.id,
          verifiedViews: viewsNum,
          verificationMethod: auditScrapedData?.verificationMethod || 'REALTIME_SCRAPER',
          notes: `Audited in-place via ClipMatrix Audit Engine. Live views: ${viewsNum}.`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToastMsg(`✅ Verified ${viewsNum.toLocaleString()} views for ${auditSub.submissionNumber}! Clipper user wallet credited ₹${data.rewardEarned?.toLocaleString() || ''}.`);
        setAuditMsg(`✅ Successfully verified! Clipper user wallet credited.`);
        fetchSubmissions();
        setAuditSub((prev: any) => (prev ? { ...prev, status: 'VIEWS_VERIFIED', verifiedViews: viewsNum } : null));
      } else {
        setAuditMsg(`❌ Verification error: ${data.error || 'Failed to verify'}`);
      }
    } catch {
      setAuditMsg('❌ An error occurred executing view settlement');
    } finally {
      setAuditVerifying(false);
    }
  };

  // Comprehensive campaigns list: merges /api/campaigns PLUS all campaigns linked to submissions
  const allCampaignsList = useMemo(() => {
    const map = new Map<string, any>();

    // 1. Add all from campaigns endpoint
    campaigns.forEach((c) => {
      if (c && c.id) map.set(c.id, c);
    });

    // 2. Add any campaign associated with submissions if not present
    submissions.forEach((s) => {
      const c = s.campaign;
      const cId = s.campaignId || c?.id;
      if (cId && !map.has(cId)) {
        map.set(cId, {
          id: cId,
          title: c?.title || 'Brand Campaign',
          brand: c?.brand || { name: 'Brand Sponsor' },
          cpmRate: c?.cpmRate || 120,
          rewardPerClip: c?.rewardPerClip || 500,
          industry: c?.industry || 'Viral Marketing',
          status: 'ACTIVE',
        });
      }
    });

    return Array.from(map.values());
  }, [campaigns, submissions]);

  // Compute stats per campaign (total submissions and pending review count)
  const campaignStats = useMemo(() => {
    const map: Record<string, { total: number; pending: number; approved: number }> = {};
    submissions.forEach((s) => {
      const cId = s.campaignId || s.campaign?.id;
      if (!cId) return;
      if (!map[cId]) map[cId] = { total: 0, pending: 0, approved: 0 };
      map[cId].total += 1;
      if (s.status === 'PENDING_REVIEW') map[cId].pending += 1;
      if (s.status === 'APPROVED' || s.status === 'VIEWS_VERIFIED') map[cId].approved += 1;
    });
    return map;
  }, [submissions]);

  // Filtered submissions based on selectedCampaignId, statusFilter, and search query
  const filtered = useMemo(() => {
    return submissions.filter((sub) => {
      // 1. Campaign Filter
      if (selectedCampaignId !== 'ALL') {
        const subCampId = sub.campaignId || sub.campaign?.id;
        if (subCampId !== selectedCampaignId) return false;
      }

      // 2. Status Filter
      if (statusFilter !== 'ALL' && sub.status !== statusFilter) return false;

      // 3. Search Query
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        sub.title?.toLowerCase().includes(q) ||
        sub.submissionNumber?.toLowerCase().includes(q) ||
        sub.clipper?.name?.toLowerCase().includes(q) ||
        sub.postAccountHandle?.toLowerCase().includes(q) ||
        sub.campaign?.title?.toLowerCase().includes(q)
      );
    });
  }, [submissions, selectedCampaignId, statusFilter, search]);

  const pendingCountTotal = submissions.filter((s) => s.status === 'PENDING_REVIEW').length;
  const activeCampaign = allCampaignsList.find((c) => c.id === selectedCampaignId);

  // Filter campaigns by search inside the Review Hub if admin enters search
  const displayedCampaigns = useMemo(() => {
    if (!campaignSearch) return allCampaignsList;
    const q = campaignSearch.toLowerCase();
    return allCampaignsList.filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.brand?.name?.toLowerCase().includes(q) ||
        c.industry?.toLowerCase().includes(q)
    );
  }, [allCampaignsList, campaignSearch]);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold border border-cyan-500/25 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ADMIN QUALITY & COMPLIANCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Video Clips Review Hub & Moderation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Click any campaign below to filter and approve submitted videos. Approved amounts are consolidated directly into each clipper user's single wallet (paid after campaign ends).
          </p>
        </div>

        <Link
          href="/dashboard/admin/verification"
          className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all text-xs flex items-center gap-2 shadow-lg shadow-purple-500/20 self-start sm:self-auto"
        >
          <Zap className="w-4 h-4 text-cyan-300" />
          <span>View Verification Engine ↗</span>
        </Link>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-xl bg-purple-950/90 border border-purple-500/40 text-xs text-white flex items-center justify-between shadow-lg">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-purple-300 hover:text-white font-bold">
            ✕
          </button>
        </div>
      )}

      {/* SECTION 1: CAMPAIGNS REVIEW HUB (Clicking any campaign immediately filters submitted videos for approval) */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0f1426]/95 via-[#0a0d1c]/95 to-[#060812] border border-cyan-500/40 p-6 space-y-4 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white font-display uppercase tracking-wider">
                  Campaigns Review Hub
                </h2>
                <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  {allCampaignsList.length} Campaigns Available
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any campaign to inspect all submitted clips awaiting moderation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {allCampaignsList.length > 4 && (
              <input
                type="text"
                value={campaignSearch}
                onChange={(e) => setCampaignSearch(e.target.value)}
                placeholder="Filter campaigns..."
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs outline-none focus:border-cyan-400 w-36 sm:w-44"
              />
            )}

            {selectedCampaignId !== 'ALL' && (
              <button
                onClick={() => setSelectedCampaignId('ALL')}
                className="text-xs font-bold text-cyan-300 hover:text-white px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 hover:bg-cyan-500/25 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>← Show All Campaigns</span>
              </button>
            )}
          </div>
        </div>

        {/* Campaign Filter Cards Grid (Shows ALL campaigns dynamically) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 pt-1">
          {/* Card: All Campaigns */}
          <button
            type="button"
            onClick={() => setSelectedCampaignId('ALL')}
            className={`p-4 sm:p-5 rounded-2xl text-left transition-all border cursor-pointer relative group flex flex-col justify-between ${
              selectedCampaignId === 'ALL'
                ? 'bg-gradient-to-b from-purple-600/30 via-indigo-600/20 to-cyan-600/30 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] ring-2 ring-cyan-400/50'
                : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  ALL CAMPAIGNS
                </span>
                {pendingCountTotal > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                    {pendingCountTotal} Pending
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Caught up
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white font-display">
                All Campaigns Queue
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Review submitted clips across all brand campaigns
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs mt-3">
              <span className="text-slate-400 font-mono text-[11px]">Total Submitted:</span>
              <span className="font-bold text-white font-mono bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/10">
                {submissions.length} clips
              </span>
            </div>
          </button>

          {/* Dynamic Campaign Cards (Renders ALL campaigns without truncation) */}
          {displayedCampaigns.map((c) => {
            const isSelected = selectedCampaignId === c.id;
            const stats = campaignStats[c.id] || {
              total: c._count?.submissions || 0,
              pending: 0,
              approved: 0,
            };

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCampaignId(c.id)}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all border cursor-pointer relative group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-purple-600/30 via-indigo-600/20 to-cyan-600/30 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] ring-2 ring-cyan-400/50'
                    : 'bg-white/[0.02] border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-[10px] text-purple-300 font-bold uppercase truncate max-w-[130px]">
                      {c.brand?.name || 'Brand Campaign'}
                    </span>
                    {stats.pending > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                        {stats.pending} Pending
                      </span>
                    ) : stats.total > 0 ? (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500">0 Clips</span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white font-display line-clamp-2 group-hover:text-cyan-300 transition-colors">
                    {c.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-2">
                    <span className="font-mono text-emerald-400 font-bold">
                      ₹{c.cpmRate || 120} CPM
                    </span>
                    <span>•</span>
                    <span className="truncate text-slate-400">{c.industry || 'Viral'}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex justify-between items-center text-xs mt-3">
                  <span className="text-slate-400 font-mono text-[11px]">Submitted Clips:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white font-mono bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/10">
                      {stats.total} clips
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Campaign Filter Indicator Banner */}
        {activeCampaign && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-purple-500/10 to-indigo-500/15 border border-cyan-400/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                <FolderOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[11px]">FILTERED CAMPAIGN:</span>
                  <strong className="text-white font-display text-sm">{activeCampaign.title}</strong>
                  <span className="text-slate-400">({activeCampaign.brand?.name})</span>
                </div>
                <div className="text-[11px] text-cyan-300 mt-0.5 font-mono">
                  Showing {filtered.length} submitted clips ({campaignStats[activeCampaign.id]?.pending || 0} pending review)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
                Reward: ₹{activeCampaign.cpmRate} CPM / ₹{activeCampaign.rewardPerClip || 500} per clip
              </span>
              <button
                onClick={() => setSelectedCampaignId('ALL')}
                className="text-xs font-bold text-cyan-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                Reset to All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0c1022] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clips by title, creator name, handle (@daxraps30), submission ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs outline-none focus:border-cyan-400 transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
          {[
            { label: 'All Clips', val: 'ALL', count: filtered.length },
            {
              label: 'Pending Review',
              val: 'PENDING_REVIEW',
              count: filtered.filter((s) => s.status === 'PENDING_REVIEW').length,
              highlight: filtered.filter((s) => s.status === 'PENDING_REVIEW').length > 0,
            },
            { label: 'Approved', val: 'APPROVED' },
            { label: 'Verified', val: 'VIEWS_VERIFIED' },
            { label: 'Rejected', val: 'REJECTED' },
          ].map((tab) => (
            <button
              key={tab.val}
              onClick={() => setStatusFilter(tab.val)}
              className={`px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                statusFilter === tab.val
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                  : 'bg-white/[0.03] text-slate-300 hover:text-white border border-white/[0.06]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    tab.highlight ? 'bg-amber-500 text-black font-extrabold' : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Consolidated Single User Wallet Guarantee Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-cyan-900/30 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-2">
              <span>Single Clipper Consolidated Wallet</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                Multi-Account Pooled
              </span>
            </div>
            <p className="text-slate-300 text-[11px] mt-0.5">
              One user can link multiple YouTube & Instagram channels. Approved clip earnings from all their accounts are consolidated into that one user's wallet and paid via UPI / Bank transfer upon campaign completion.
            </p>
          </div>
        </div>
      </div>

      {/* Submissions List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <span className="inline-block w-8 h-8 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#0c1022] border border-white/[0.08] space-y-2">
          <Video className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No submissions found</h3>
          <p className="text-xs text-slate-400">
            {selectedCampaignId !== 'ALL'
              ? `No clips submitted for "${activeCampaign?.title || 'this campaign'}" matching the current filter.`
              : 'There are no clips matching the current filter criteria.'}
          </p>
          {selectedCampaignId !== 'ALL' && (
            <button
              onClick={() => setSelectedCampaignId('ALL')}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 cursor-pointer"
            >
              View All Campaigns
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((sub) => {
            const isPending = sub.status === 'PENDING_REVIEW';
            const isApproved = sub.status === 'APPROVED' || sub.status === 'VIEWS_VERIFIED';
            const isRejected = sub.status === 'REJECTED';

            const clipperUser = sub.clipper;
            const accountHandle = sub.postAccountHandle || clipperUser?.name || '@creator';

            return (
              <div
                key={sub.id}
                id={`clip-${sub.id}`}
                className="p-5 sm:p-6 rounded-3xl bg-[#0c1022] border border-white/[0.08] hover:border-purple-500/40 transition-all space-y-4 group shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Info */}
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                        {sub.submissionNumber}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-purple-300 font-bold">{sub.platform}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{new Date(sub.submittedAt).toLocaleDateString()}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          isPending
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                            : isApproved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white font-display truncate">
                      {sub.title}
                    </h3>

                    {/* Consolidated Clipper User & Specific Handle Badges */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300/90 pt-0.5">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                        <span>
                          Clipper User:{' '}
                          <strong className="text-white">
                            {clipperUser?.name || 'Verified Clipper'}
                          </strong>{' '}
                          <span className="text-[10px] text-slate-400 font-mono">({clipperUser?.email})</span>
                        </span>
                      </span>

                      <span>•</span>

                      <span className="flex items-center gap-1 bg-white/[0.04] px-2 py-0.5 rounded-lg border border-white/10 font-mono text-[11px]">
                        <span className="text-slate-400">Account Posted:</span>
                        <strong className="text-cyan-300 font-bold">{accountHandle}</strong>
                      </span>

                      <span>•</span>

                      <span>
                        Campaign:{' '}
                        <strong className="text-purple-300">
                          {sub.campaign?.title}
                        </strong>
                      </span>

                      <span>•</span>

                      <span>
                        CPM:{' '}
                        <strong className="text-emerald-400 font-mono">
                          ₹{sub.campaign?.cpmRate || 150}
                        </strong>
                      </span>

                      <span>•</span>

                      {sub.verifiedViews > 0 ? (
                        <span className="text-cyan-400 font-mono font-bold flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {sub.verifiedViews.toLocaleString()} Verified Views
                        </span>
                      ) : sub.reportedViews > 0 ? (
                        <span className="text-purple-300 font-mono font-semibold flex items-center gap-1">
                          <Eye className="w-3 h-3 text-cyan-400" />
                          {sub.reportedViews.toLocaleString()} Reported Views
                          <span className="text-[10px] text-amber-400 font-normal ml-1 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">Audit Pending</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-xs flex items-center gap-1">
                          <Eye className="w-3 h-3 text-slate-500" />
                          0 Views <span className="text-[10px] text-purple-400/80">(Pending Sync)</span>
                        </span>
                      )}
                    </div>

                    {sub.rejectionReason && (
                      <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 mt-2">
                        <strong>Rejection Reason:</strong> {sub.rejectionReason}
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <a
                      href={sub.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    </a>

                    {isPending && (
                      <>
                        <button
                          onClick={() => handleApprove(sub)}
                          disabled={actionLoading === sub.id}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approve Clip</span>
                        </button>

                        <button
                          onClick={() => setRejectModalSub(sub)}
                          disabled={actionLoading === sub.id}
                          className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 disabled:opacity-50 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-rose-500/20 transition-all cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </>
                    )}

                    {/* In-Place Video Metrics & Settlement Button */}
                    <button
                      onClick={() => handleOpenAudit(sub)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-900/80 to-cyan-900/70 hover:from-purple-800 hover:to-cyan-800 border border-cyan-500/40 text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-cyan-500/15"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Audit Video Metrics</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalSub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0e0c26] border border-rose-500/40 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-rose-400">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-bold text-white font-display">Reject Video Clip</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You are rejecting <strong className="text-white">{rejectModalSub.submissionNumber}</strong> ({rejectModalSub.title}). Specify the reason for the creator:
            </p>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-purple-300 uppercase">Rejection Reason</label>
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white outline-none focus:border-rose-400 transition-all"
              />

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Missing required brand hashtag in caption',
                  'Incorrect brand account tagged',
                  'Video is not 9:16 vertical',
                  'Low audio clarity / compression',
                  'Unoriginal re-upload without editing',
                ].map((quick) => (
                  <button
                    key={quick}
                    type="button"
                    onClick={() => setRejectionReason(quick)}
                    className="px-2 py-1 rounded bg-white/[0.03] hover:bg-white/10 border border-white/10 text-[10px] text-slate-300 cursor-pointer"
                  >
                    {quick}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setRejectModalSub(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectSubmit}
                disabled={actionLoading === rejectModalSub.id}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-all cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In-Place Audit View Modal (Clean video metrics & settlement, no demographics) */}
      {auditSub && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-start justify-center">
          <div className="w-full max-w-4xl my-8 rounded-3xl bg-gradient-to-b from-[#0f1426]/95 via-[#0a0d1c]/95 to-[#060812] border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-[0_25px_60px_-15px_rgba(6,182,212,0.3)] relative text-slate-200 overflow-hidden">
            {/* Top Accent */}
            <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            {/* Header: Back Button & Sub Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCloseAudit}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-white/[0.05] hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer border border-white/10 shadow-sm"
                >
                  <ArrowLeft className="w-4 h-4 text-cyan-400" />
                  <span>Back to Queue</span>
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      {auditSub.submissionNumber}
                    </span>
                    <span className="text-xs text-purple-300 font-bold">{auditSub.platform}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white font-display mt-0.5 truncate max-w-md sm:max-w-xl">
                    {auditSub.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={auditSub.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-cyan-300 flex items-center gap-1.5 border border-white/10 transition-colors"
                >
                  <span>Open Video URL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={handleCloseAudit}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Account & Single User Consolidation Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-purple-500/10 to-indigo-500/15 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-inner">
                  {auditSub.platform === 'YOUTUBE' ? <YouTubeIcon className="w-5 h-5 text-red-500" /> : <InstagramIcon className="w-5 h-5 text-pink-500" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-white font-display">
                      {auditSub.platform} Clip Auditing
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Posted Account: <span className="text-cyan-300 font-mono font-bold">{auditSub.postAccountHandle || '@creator'}</span> • Consolidates to Clipper User: <span className="text-white font-bold">{auditSub.clipper?.name || 'Verified Clipper'}</span>
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right shrink-0 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                <div className="text-[10px] text-slate-400 font-mono">CAMPAIGN POOL</div>
                <div className="text-xs font-bold text-purple-300 font-mono">{auditSub.campaign?.title}</div>
              </div>
            </div>

            {/* Video Link & Re-Scrape Bar */}
            <div className="p-4 rounded-2xl bg-[#090d18] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="min-w-0 flex-1">
                <div className="text-[11px] text-slate-400 font-mono">AUDITED VIDEO URL:</div>
                <div className="text-slate-200 font-mono truncate">{auditSub.videoUrl}</div>
              </div>
              <button
                onClick={() => triggerLiveScrape(auditSub.videoUrl, auditSub.id)}
                disabled={auditScraping}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-50 text-white font-bold flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-purple-500/25"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${auditScraping ? 'animate-spin' : ''}`} />
                <span>{auditScraping ? 'Scanning Live URL...' : 'Re-Run Live Metrics Scan'}</span>
              </button>
            </div>

            {auditMsg && (
              <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/30 text-xs text-cyan-300 font-medium">
                {auditMsg}
              </div>
            )}

            {/* Scraped Live Metrics Grid (Views, Likes, Comments, Shares) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>VIDEO ENGAGEMENT METRICS</span>
                </h3>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  Live Platform Scan
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-cyan-400" /> Views</span>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">Verified</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {(auditScrapedData?.viewCount && auditScrapedData.viewCount > 0
                      ? auditScrapedData.viewCount
                      : parseInt(auditVerifiedViews || '0', 10) || auditSub?.reportedViews || 0
                    ).toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400" /> Likes
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {auditScrapedData?.likeCount !== undefined
                      ? auditScrapedData.likeCount.toLocaleString()
                      : (auditSub?.likesCount || 0).toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> Comments
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                    {auditScrapedData?.commentCount !== undefined
                      ? auditScrapedData.commentCount.toLocaleString()
                      : (auditSub?.commentsCount || 0).toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1.5"><Share2 className="w-3.5 h-3.5 text-emerald-400" /> Shares</span>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">Verified</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-100 font-mono">
                    {auditScrapedData?.shareCount !== undefined && auditScrapedData.shareCount > 0
                      ? auditScrapedData.shareCount.toLocaleString()
                      : (auditSub?.sharesCount || 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Payout & Settlement Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#12192c] to-[#0d1220] border border-cyan-500/40 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>View Settlement & Consolidated Clipper Credit</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Confirm audited views to credit the clipper user's balance. Payment is released to their UPI / Bank when the campaign concludes.
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Estimated Clipper Payout</div>
                  <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 font-mono">
                    ₹
                    {(
                      ((parseInt(auditVerifiedViews || '0', 10) / 1000) *
                        (auditSub.campaign?.cpmRate || 120))
                    ).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <div className="w-full sm:w-1/2">
                  <label className="text-[11px] font-mono text-purple-300 uppercase block mb-1">
                    Audited & Verified Views Count
                  </label>
                  <input
                    type="number"
                    value={auditVerifiedViews}
                    onChange={(e) => setAuditVerifiedViews(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="w-full sm:w-1/2 pt-5 sm:pt-0">
                  <button
                    onClick={handleVerifyViewsAndCredit}
                    disabled={auditVerifying || !auditVerifiedViews}
                    className="w-full py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20 text-xs flex items-center justify-center gap-2 cursor-pointer font-black"
                  >
                    <CheckCheck className="w-4 h-4" />
                    <span>{auditVerifying ? 'Settling & Crediting User Wallet...' : 'Verify Views & Credit Clipper Wallet'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
              <button
                onClick={handleCloseAudit}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-90 transition-all cursor-pointer shadow-md"
              >
                Done & Return to Review Queue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
