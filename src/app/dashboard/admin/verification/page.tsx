'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCheck,
  Eye,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function AdminVerificationPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [verifiedViews, setVerifiedViews] = useState('');
  const [method, setMethod] = useState('INSTAGRAM_GRAPH_API');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [msg, setMsg] = useState('');

  const loadSubmissions = () => {
    setLoading(true);
    fetch('/api/submissions')
      .then((r) => r.json())
      .then((data) => {
        if (data.submissions) {
          setSubmissions(data.submissions);
          if (data.submissions.length > 0 && !selectedSub) {
            setSelectedSub(data.submissions[0]);
            setVerifiedViews(data.submissions[0].reportedViews?.toString() || '100000');
          }
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleSelectSub = (sub: any) => {
    setSelectedSub(sub);
    setVerifiedViews(sub.reportedViews > 0 ? sub.reportedViews.toString() : '120000');
    setMsg('');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    setVerifying(true);
    setMsg('');

    try {
      const res = await fetch('/api/verification/verify-views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: selectedSub.id,
          verifiedViews: parseInt(verifiedViews, 10),
          verificationMethod: method,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(`❌ Error: ${data.error || 'Failed to verify'}`);
      } else {
        setMsg(`✅ ${data.message}`);
        loadSubmissions();
      }
    } catch {
      setMsg('❌ Failed to run verification');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          View Verification & Performance Settlement Engine
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Audit authentic video views, generate timeline snapshots, calculate CPM rewards, and credit clipper wallets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Submissions List */}
        <div className="lg:col-span-5 rounded-2xl bg-[#140c26] border border-purple-900/50 p-4 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-purple-400 pb-2 border-b border-purple-900/40">
            Select Submission to Audit
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {submissions.map((sub) => {
              const isSelected = selectedSub?.id === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => handleSelectSub(sub)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-950/90 border-purple-400 shadow-glow-purple'
                      : 'bg-[#100720] border-purple-900/40 hover:border-purple-600/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-purple-400">{sub.submissionNumber}</span>
                    <span className="font-bold text-emerald-400">{sub.platform}</span>
                  </div>
                  <div className="text-xs font-bold text-white mt-1 line-clamp-1">{sub.title}</div>
                  <div className="text-[11px] text-purple-300/70 mt-1 flex justify-between">
                    <span>By: {sub.clipper?.name}</span>
                    <span className="font-semibold text-cyan-400">{sub.verifiedViews?.toLocaleString()} Views</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit & Execution Workbench */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-6">
          {selectedSub ? (
            <form onSubmit={handleVerify} className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
                <div>
                  <span className="text-[10px] font-mono uppercase text-purple-400">Auditing Submission</span>
                  <h2 className="text-lg font-bold text-white font-display">{selectedSub.title}</h2>
                </div>
                <a
                  href={selectedSub.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-1"
                >
                  <span>Open Video URL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {msg && <div className="p-3.5 rounded-xl bg-purple-950/80 border border-purple-700/60 text-xs text-white">{msg}</div>}

              {/* Campaign Reward Specs */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0e071c] border border-purple-900/40 text-center text-xs">
                <div>
                  <div className="text-[10px] text-purple-400">Reward Model</div>
                  <div className="font-bold text-white mt-0.5">{selectedSub.campaign?.rewardModel}</div>
                </div>
                <div>
                  <div className="text-[10px] text-purple-400">CPM Rate</div>
                  <div className="font-bold text-emerald-400 mt-0.5">₹{selectedSub.campaign?.cpmRate} / 1k</div>
                </div>
                <div>
                  <div className="text-[10px] text-purple-400">Current Earned</div>
                  <div className="font-bold text-white mt-0.5">₹{selectedSub.rewardEarned?.toLocaleString('en-IN')}</div>
                </div>
              </div>

              {/* View Input Field */}
              <div>
                <label className="text-xs text-purple-300 font-medium">New Verified View Count *</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={verifiedViews}
                  onChange={(e) => setVerifiedViews(e.target.value)}
                  placeholder="e.g. 185000"
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-base font-mono font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Verification Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-purple-300 font-medium">Verification Method</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-xs"
                  >
                    <option value="INSTAGRAM_GRAPH_API">Instagram Graph API Audit</option>
                    <option value="YOUTUBE_DATA_API">YouTube Data API Snapshot</option>
                    <option value="TIKTOK_CREATOR_API">TikTok Developer API</option>
                    <option value="MANUAL_AUDIT">Manual Staff Audit</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-purple-300 font-medium">Audit Notes / Reason</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Verified organic Indian audience retention spike."
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-xs"
                  />
                </div>
              </div>

              {/* Real-time calculated reward display */}
              <div className="p-4 rounded-2xl bg-[#1b1035] border border-purple-700/50 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-purple-300 uppercase font-mono">Calculated Reward Output</div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-display">
                    ₹
                    {(
                      Math.floor(
                        (parseInt(verifiedViews || '0', 10) / 1000) * (selectedSub.campaign?.cpmRate || 120)
                      ) || 0
                    ).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right text-[11px] text-purple-300/80">
                  Will credit to: <strong className="text-white">{selectedSub.clipper?.name}</strong>
                </div>
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-glow-purple flex items-center justify-center gap-2 text-xs"
              >
                <CheckCheck className="w-4 h-4" />
                <span>{verifying ? 'Executing Settlement...' : 'Verify Views & Credit Clipper Wallet'}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-20 text-purple-300/70">Select a submission from the list to audit.</div>
          )}
        </div>
      </div>
    </div>
  );
}
