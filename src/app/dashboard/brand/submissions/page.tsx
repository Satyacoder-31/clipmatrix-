'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Check, X, AlertCircle, Eye, MessageSquare } from 'lucide-react';
import { getStatusBadge } from '@/lib/utils';

export default function BrandReviewSubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSubmissions = () => {
    setLoading(true);
    fetch('/api/submissions')
      .then((r) => r.json())
      .then((data) => {
        if (data.submissions) setSubmissions(data.submissions);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (subId: string, status: 'APPROVED' | 'REJECTED') => {
    setActionLoading(true);
    try {
      await fetch(`/api/submissions/${subId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          rejectionReason: status === 'REJECTED' ? rejectionReason : null,
          reviewNotes: status === 'APPROVED' ? 'Approved by brand growth team.' : null,
        }),
      });
      setSelectedSub(null);
      setRejectionReason('');
      fetchSubmissions();
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Submission Review Workbench
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Inspect video links, verify guideline adherence, and approve clips for automated view tracking.
        </p>
      </div>

      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead className="bg-[#100720] border-b border-purple-900/40 uppercase font-mono text-[10px] text-purple-400">
              <tr>
                <th className="py-3 px-4">Sub ID</th>
                <th className="py-3 px-4">Title & Clipper</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Claimed / Verified Views</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Review Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {submissions.map((sub) => {
                const badge = getStatusBadge(sub.status);
                return (
                  <tr key={sub.id} className="hover:bg-purple-950/20 transition-colors">
                    <td className="py-4 px-4 font-mono text-purple-300">{sub.submissionNumber}</td>
                    <td className="py-4 px-4 space-y-0.5">
                      <div className="font-bold text-white">{sub.title}</div>
                      <div className="text-[11px] text-purple-400">
                        by {sub.clipper?.name} ({sub.clipper?.clipperProfile?.instagramHandle || 'Editor'})
                      </div>
                      <a
                        href={sub.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px] pt-0.5"
                      >
                        <span>Watch Live Clip</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950/80 border border-purple-800/50 text-purple-300">
                        {sub.platform}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-white">{sub.reportedViews.toLocaleString()} claimed</div>
                      <div className="text-cyan-400 font-semibold">{sub.verifiedViews.toLocaleString()} verified</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${badge.classes}`}>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {sub.status === 'PENDING_REVIEW' || sub.status === 'UNDER_REVIEW' ? (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(sub.id, 'APPROVED')}
                              disabled={actionLoading}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" /> Approve
                            </button>
                            <button
                              onClick={() => setSelectedSub(sub)}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-300 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 transition-colors flex items-center gap-1"
                            >
                              <X className="w-3 h-3" /> Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-purple-300/70 font-mono">Reviewed</span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {selectedSub && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#140c26] border border-purple-900/60 p-6 space-y-4">
            <h3 className="text-base font-bold text-white font-display">
              Reject Submission ({selectedSub.submissionNumber})
            </h3>
            <p className="text-xs text-purple-200/70">
              Provide specific feedback so the editor understands how to fix the clip.
            </p>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Missing required #AetherAI hashtag in caption, or audio out of sync in first 5 seconds."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0e071c] border border-purple-800/40 text-white text-xs"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-purple-300 bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedSub.id, 'REJECTED')}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
