'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Eye, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { getStatusBadge, formatCurrency } from '@/lib/utils';

export default function ClipperSubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/submissions')
      .then((r) => r.json())
      .then((data) => {
        if (data.submissions) setSubmissions(data.submissions);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">My Clip Submissions</h1>
          <p className="text-xs sm:text-sm text-purple-200/70">
            Real-time status, audit snapshots, and calculated CPM earnings for each video link.
          </p>
        </div>
        <a
          href="/dashboard/clipper/submit"
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple self-start sm:self-auto"
        >
          + Submit New Clip
        </a>
      </div>

      {loading ? (
        <div className="text-center py-20 text-purple-300">Loading submissions...</div>
      ) : submissions.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-3">
          <p className="text-sm text-purple-300">No submissions found.</p>
          <a href="/dashboard/clipper/submit" className="text-xs text-purple-400 underline">
            Submit your first clip now
          </a>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-purple-200">
              <thead className="bg-[#100720] border-b border-purple-900/40 uppercase font-mono text-[10px] text-purple-400">
                <tr>
                  <th className="py-3 px-4">Sub ID</th>
                  <th className="py-3 px-4">Clip Title & Campaign</th>
                  <th className="py-3 px-4">Platform</th>
                  <th className="py-3 px-4">Verified Views</th>
                  <th className="py-3 px-4">Reward ($ USD)</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/30">
                {submissions.map((sub) => {
                  const badge = getStatusBadge(sub.status);
                  const isPending = sub.status === 'PENDING_REVIEW' || sub.status === 'PENDING' || sub.status === 'SUBMITTED';
                  return (
                    <tr key={sub.id} className="hover:bg-purple-950/20 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-purple-300">{sub.submissionNumber}</td>
                      <td className="py-3.5 px-4 space-y-0.5 max-w-xs">
                        <div className="font-bold text-white truncate">{sub.title}</div>
                        <div className="text-[11px] text-purple-400 truncate">{sub.campaign?.title}</div>
                        {sub.rejectionReason && (
                          <div className="text-[10px] text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" /> Reason: {sub.rejectionReason}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950/80 border border-purple-800/50 text-purple-300">
                          {sub.platform}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {sub.verifiedViews > 0 && !isPending ? (
                          <span className="text-cyan-400 flex items-center gap-1 font-mono">
                            <Eye className="w-3 h-3" /> {sub.verifiedViews.toLocaleString()}
                          </span>
                        ) : sub.reportedViews > 0 ? (
                          <span className="text-white/90 flex items-center gap-1 font-mono">
                            <Eye className="w-3 h-3 text-purple-400" /> {sub.reportedViews.toLocaleString()}
                            <span className="text-[9px] text-amber-400 font-normal ml-1 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                              {isPending ? 'Pending Audit' : 'Reported'}
                            </span>
                          </span>
                        ) : (
                          <span className="text-purple-400/60 font-mono text-xs flex items-center gap-1">
                            <Eye className="w-3 h-3 text-purple-500/40" /> 0 (Pending)
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold">
                        {sub.rewardEarned > 0 ? (
                          <span className="text-emerald-400 font-mono">{formatCurrency(sub.rewardEarned)}</span>
                        ) : isPending ? (
                          <span className="text-slate-400 font-mono flex items-center gap-1 text-xs">
                            $0.00
                            <span className="text-[9px] text-amber-400 font-normal bg-amber-400/10 px-1 py-0.2 rounded border border-amber-400/20">
                              Pending
                            </span>
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-mono">$0.00</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${badge.classes}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <a
                          href={sub.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-purple-400 hover:text-white flex items-center gap-1 font-medium"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
