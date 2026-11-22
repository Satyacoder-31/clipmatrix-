'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import Link from 'next/link';

export default function AdminSubmissionsReviewPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [rejectModalSub, setRejectModalSub] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('Missing required brand hashtag or handle tag in video caption.');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'ALL') params.set('status', statusFilter);
      const res = await fetch(`/api/submissions?${params.toString()}`);
      const data = await res.json();
      if (data.submissions) {
        setSubmissions(data.submissions);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter]);

  const handleApprove = async (sub: any) => {
    setActionLoading(sub.id);
    try {
      const res = await fetch(`/api/submissions/${sub.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'APPROVED',
          reviewNotes: 'Approved by Admin. Clip verified compliant with brief & aspect ratio guidelines.',
        }),
      });
      if (res.ok) {
        setToastMsg(`✅ Approved ${sub.submissionNumber} (${sub.title})!`);
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

  const filtered = submissions.filter((sub) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      sub.title?.toLowerCase().includes(q) ||
      sub.submissionNumber?.toLowerCase().includes(q) ||
      sub.clipper?.name?.toLowerCase().includes(q) ||
      sub.campaign?.title?.toLowerCase().includes(q)
    );
  });

  const pendingCount = submissions.filter((s) => s.status === 'PENDING_REVIEW').length;

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
            Video Clips Review & Moderation Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review submitted social media clips, audit video links, accept compliant edits, or reject non-compliant submissions.
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

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0c1022] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by clip title, clipper name, submission ID, or campaign..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs outline-none focus:border-cyan-400 transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
          {[
            { label: 'All Clips', val: 'ALL', count: submissions.length },
            { label: 'Pending Review', val: 'PENDING_REVIEW', count: pendingCount, highlight: pendingCount > 0 },
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

      {/* Submissions List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">
          <span className="inline-block w-8 h-8 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#0c1022] border border-white/[0.08] space-y-2">
          <Video className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No submissions found</h3>
          <p className="text-xs text-slate-400">There are no clips matching the current filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((sub) => {
            const isPending = sub.status === 'PENDING_REVIEW';
            const isApproved = sub.status === 'APPROVED' || sub.status === 'VIEWS_VERIFIED';
            const isRejected = sub.status === 'REJECTED';

            return (
              <div
                key={sub.id}
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

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300/80 pt-0.5">
                      <span>
                        Clipper:{' '}
                        <strong className="text-white">
                          {sub.clipper?.name || 'Verified Creator'}
                        </strong>
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
                        CPM Rate:{' '}
                        <strong className="text-emerald-400 font-mono">
                          ₹{sub.campaign?.cpmRate || 150}
                        </strong>
                      </span>
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

                    <Link
                      href={`/dashboard/admin/verification`}
                      className="px-3.5 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-900 border border-purple-500/30 text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1.5 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Audit Views</span>
                    </Link>
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
                  'Missing #ClipMatrix hashtag',
                  'Incorrect brand account tagged',
                  'Video is not 9:16 vertical',
                  'Low audio clarity / compression',
                  'Unoriginal re-upload without editing',
                ].map((quick) => (
                  <button
                    key={quick}
                    type="button"
                    onClick={() => setRejectionReason(quick)}
                    className="px-2 py-1 rounded bg-white/[0.03] hover:bg-white/10 border border-white/10 text-[10px] text-slate-300"
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
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectSubmit}
                disabled={actionLoading === rejectModalSub.id}
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-500 text-xs flex items-center gap-1.5 shadow-md shadow-rose-500/20"
              >
                <XCircle className="w-4 h-4" />
                <span>Confirm Rejection</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
