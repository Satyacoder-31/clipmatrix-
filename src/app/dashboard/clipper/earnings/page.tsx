'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Building2,
  CheckCircle2,
  Smartphone,
  Eye,
  AlertCircle,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  Edit3,
  X,
  Save,
  CheckCheck,
  ShieldCheck,
  Check,
  Copy,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface VideoItem {
  id: string;
  submissionNumber: string;
  title: string;
  videoUrl: string;
  campaignTitle: string;
  platform: string;
  verifiedViews: number;
  rewardEarned: number;
  submittedAt: string;
}

interface AccountGroup {
  handle: string;
  platform: string;
  totalApprovedClips: number;
  totalApprovedViews: number;
  accountEarnings: number;
  videos: VideoItem[];
}

export default function ClipperEarningsPage() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Payout Method Modal State
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [savingMethod, setSavingMethod] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [withRes, subRes, userRes] = await Promise.all([
        fetch('/api/withdrawals').then((r) => r.json()).catch(() => ({})),
        fetch('/api/submissions').then((r) => r.json()).catch(() => ({})),
        fetch('/api/auth/me').then((r) => r.json()).catch(() => ({})),
      ]);

      if (withRes.withdrawals) setWithdrawals(withRes.withdrawals);
      if (subRes.submissions) setSubmissions(subRes.submissions);

      if (userRes.user) {
        setUserProfile(userRes.user);
        setAccountHolderName(userRes.user.name || '');
        if (userRes.user.clipperProfile) {
          setUpiId(userRes.user.clipperProfile.upiId || '');
          setBankName(userRes.user.clipperProfile.bankName || '');
          setBankAccountNumber(userRes.user.clipperProfile.bankAccountNumber || '');
          setBankIfsc(userRes.user.clipperProfile.bankIfsc || '');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute live metrics strictly based on submissions and admin payouts
  const approvedSubmissions = useMemo(
    () => submissions.filter((s) => s.status === 'APPROVED' || s.status === 'VIEWS_VERIFIED'),
    [submissions]
  );

  const pendingSubmissions = useMemo(
    () => submissions.filter((s) => s.status === 'PENDING_REVIEW'),
    [submissions]
  );

  const totalApprovedViews = useMemo(
    () => approvedSubmissions.reduce((sum, s) => sum + (s.verifiedViews || s.reportedViews || 0), 0),
    [approvedSubmissions]
  );

  // Total gross earnings earned from approved clips at $0.50 CPM ($0.50 per 1,000 views)
  const totalGrossEarnings = useMemo(
    () =>
      Number(
        approvedSubmissions
          .reduce(
            (sum, s) => sum + (s.rewardEarned || ((s.verifiedViews || s.reportedViews || 0) / 1000) * 0.5),
            0
          )
          .toFixed(2)
      ),
    [approvedSubmissions]
  );

  // Processed payouts paid out to this clipper
  const processedPayouts = useMemo(
    () => withdrawals.filter((w) => w.status === 'PROCESSED'),
    [withdrawals]
  );

  const paidOutAmount = useMemo(
    () => Number(processedPayouts.reduce((sum, w) => sum + w.amount, 0).toFixed(2)),
    [processedPayouts]
  );

  const platformFee = Number((totalGrossEarnings * 0.03).toFixed(2)); // 3% platform fee
  const netEarnings = Number((totalGrossEarnings - platformFee).toFixed(2));

  // Remaining unpaid earnings to be disbursed (based on net earnings after 3% platform fee)
  const remainingPayout = useMemo(
    () => Math.max(0, Number((netEarnings - paidOutAmount).toFixed(2))),
    [netEarnings, paidOutAmount]
  );

  // Estimated pending earnings from clips awaiting admin approval (at $0.50 CPM)
  const pendingViews = useMemo(
    () => pendingSubmissions.reduce((sum, s) => sum + (s.reportedViews || 0), 0),
    [pendingSubmissions]
  );

  const pendingApprovalAmount = useMemo(
    () => Number(((pendingViews / 1000) * 0.5).toFixed(2)),
    [pendingViews]
  );

  const totalExpectedEarnings = useMemo(
    () => Number((totalGrossEarnings + pendingApprovalAmount).toFixed(2)),
    [totalGrossEarnings, pendingApprovalAmount]
  );

  const totalSubmissions = submissions.length;
  const approvalRate =
    totalSubmissions > 0 ? Math.round((approvedSubmissions.length / totalSubmissions) * 100) : 100;

  const activeCampaignsCount = useMemo(() => {
    const ids = new Set(submissions.map((s) => s.campaignId || s.campaign?.id).filter(Boolean));
    return Math.max(ids.size, 1);
  }, [submissions]);

  // Multi-Account Breakdown for the Clipper
  const accountBreakdown = useMemo(() => {
    const map: Record<string, AccountGroup> = {};

    for (const s of approvedSubmissions) {
      const handle = s.postAccountHandle?.trim() || `${s.platform.toLowerCase()}_account`;
      const platform = s.platform || 'INSTAGRAM';
      const views = s.verifiedViews || s.reportedViews || 0;
      const grossSubReward = Number((s.rewardEarned || (views / 1000) * 0.5).toFixed(2));
      const reward = Number((grossSubReward * 0.97).toFixed(2));

      if (!map[handle]) {
        map[handle] = {
          handle,
          platform,
          totalApprovedClips: 0,
          totalApprovedViews: 0,
          accountEarnings: 0,
          videos: [],
        };
      }

      map[handle].totalApprovedClips += 1;
      map[handle].totalApprovedViews += views;
      map[handle].accountEarnings = Number((map[handle].accountEarnings + reward).toFixed(2));
      map[handle].videos.push({
        id: s.id,
        submissionNumber: s.submissionNumber,
        title: s.title,
        videoUrl: s.videoUrl,
        campaignTitle: s.campaign?.title || 'Active Campaign',
        platform: s.platform,
        verifiedViews: views,
        rewardEarned: reward,
        submittedAt: s.submittedAt,
      });
    }

    return Object.values(map);
  }, [approvedSubmissions]);

  const hasConnectedMethod = Boolean(upiId || bankAccountNumber);

  // Save payout methods handler
  const handleSavePayoutMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingMethod(true);
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: accountHolderName,
          upiId,
          bankName,
          bankAccountNumber,
          bankIfsc,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setToastMsg('✅ Payout method saved successfully! Payouts will route directly to this account.');
        setPayoutModalOpen(false);
        if (data.user?.clipperProfile) {
          setUpiId(data.user.clipperProfile.upiId || '');
          setBankName(data.user.clipperProfile.bankName || '');
          setBankAccountNumber(data.user.clipperProfile.bankAccountNumber || '');
          setBankIfsc(data.user.clipperProfile.bankIfsc || '');
        }
        await loadData();
      } else {
        setToastMsg(`❌ ${data.error || 'Failed to save payout method'}`);
      }
    } catch {
      setToastMsg('❌ Error saving payment details');
    } finally {
      setSavingMethod(false);
      setTimeout(() => setToastMsg(''), 5000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl bg-purple-950/90 border border-purple-500/50 text-white text-xs shadow-2xl backdrop-blur-md flex items-center gap-2">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-white/60 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Banner & Payout Method Connection */}
      <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-emerald-950/40 via-[#180f33] to-[#120826] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            STANDARD CPM: $0.50 / 1K VERIFIED VIEWS
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Your Earnings & Payouts
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/70">
            All earnings from your connected accounts consolidate here in USD ($). Payouts are transferred directly to your payment method when campaigns end.
          </p>
        </div>

        {/* Payout Method Action Button */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setPayoutModalOpen(true)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
              hasConnectedMethod
                ? 'bg-purple-900/40 hover:bg-purple-900/60 border border-purple-700/50 text-purple-200'
                : 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-glow-emerald animate-pulse'
            }`}
          >
            {hasConnectedMethod ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  {upiId ? `UPI: ${upiId}` : `Bank: •••• ${bankAccountNumber?.slice(-4)}`}
                </span>
                <Edit3 className="w-3.5 h-3.5 text-purple-400 ml-1" />
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span>+ Connect Payout Method</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4 Main Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Approved Earnings */}
        <div className="rounded-2xl p-4 sm:p-5 bg-[#140b2a] border border-purple-900/50 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Total Approved Earnings</span>
            <DollarSign className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
            {formatCurrency(totalGrossEarnings)}
          </div>
          <div className="text-[11px] text-purple-300/60 mt-1 font-mono">Approved videos ($0.50 CPM)</div>
        </div>

        {/* Card 2: Paid Out */}
        <div className="rounded-2xl p-4 sm:p-5 bg-[#140b2a] border border-purple-900/50 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Paid Out</span>
            <CheckCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
            {formatCurrency(paidOutAmount)}
          </div>
          <div className="text-[11px] text-emerald-300/60 mt-1 font-mono">Disbursed by admin</div>
        </div>

        {/* Card 3: Remaining Payout */}
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-emerald-950/30 to-[#140b2a] border border-emerald-500/30 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Remaining Payout</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300">
            {formatCurrency(remainingPayout)}
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-1 font-mono">Unpaid approved balance due</div>
        </div>

        {/* Card 4: Pending Review */}
        <div className="rounded-2xl p-4 sm:p-5 bg-[#140b2a] border border-purple-900/50 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Pending Review</span>
            <AlertCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-300">
            {formatCurrency(pendingApprovalAmount)}
          </div>
          <div className="text-[11px] text-purple-300/60 mt-1 font-mono">{pendingSubmissions.length} clips awaiting moderation</div>
        </div>
      </div>

      {/* Fee Breakdown Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#120826] border border-purple-900/40">
        <div className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Fee Breakdown & Net Revenue
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/30">
            <div className="text-[11px] font-mono text-purple-400 uppercase">Gross Approved Earnings</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
              {formatCurrency(totalGrossEarnings)}
            </div>
            <div className="text-[10px] text-purple-400/60 font-mono mt-0.5">$0.50 CPM rate</div>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/30">
            <div className="text-[11px] font-mono text-purple-400 uppercase">Platform Fee (3%)</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-purple-300 mt-1">
              {formatCurrency(platformFee)}
            </div>
            <div className="text-[10px] text-purple-400/80 font-mono mt-0.5">3% platform service fee</div>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-950/30 to-purple-950/30 border border-emerald-500/30">
            <div className="text-[11px] font-mono text-emerald-400 uppercase">Net Creator Earnings</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-emerald-300 mt-1">
              {formatCurrency(netEarnings)}
            </div>
            <div className="text-[10px] text-emerald-400/80 font-mono mt-0.5">100% credited to you</div>
          </div>
        </div>
      </div>

      {/* Middle Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#120826] border border-purple-900/40 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-purple-400 tracking-wider font-semibold">
              Active Campaigns
            </div>
            <div className="text-3xl font-extrabold font-mono text-white mt-1">
              {activeCampaignsCount}
            </div>
            <div className="text-xs text-purple-300/60 mt-1">Participating brand marketing pools</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#120826] border border-purple-900/40 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase text-purple-400 tracking-wider font-semibold">
              Total Approved Views
            </div>
            <div className="text-3xl font-extrabold font-mono text-white mt-1">
              {formatNumber(totalApprovedViews)}
            </div>
            <div className="text-xs text-purple-300/60 mt-1">Verified audience reach delivered</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Eye className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Multi-Account Breakdown for Clipper */}
      <div className="rounded-2xl bg-[#120826] border border-purple-900/40 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm sm:text-base font-bold text-white font-display">
              Earnings By Connected Social Account ({accountBreakdown.length})
            </h3>
          </div>
          <span className="text-xs text-purple-300 font-mono">Rate: $0.50 / 1k views</span>
        </div>

        {accountBreakdown.length === 0 ? (
          <div className="p-6 rounded-xl bg-purple-950/20 border border-purple-900/30 text-center text-xs text-purple-300">
            No approved clips submitted under specific social handles yet. Once your clips are approved, their view counts and revenue appear here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accountBreakdown.map((acc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#160b2e] border border-purple-800/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        acc.platform === 'YOUTUBE'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                      }`}
                    >
                      {acc.platform}
                    </span>
                    <span className="font-mono font-bold text-white text-xs sm:text-sm">
                      {acc.handle}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-emerald-400">
                      {formatCurrency(acc.accountEarnings)}
                    </div>
                    <div className="text-[10px] text-purple-400 font-mono">
                      {formatNumber(acc.totalApprovedViews)} views
                    </div>
                  </div>
                </div>

                {/* Approved Clips List under this account */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] uppercase font-mono text-purple-400/80 font-semibold">
                    Approved Clips ({acc.videos.length})
                  </div>
                  <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                    {acc.videos.map((vid) => (
                      <div
                        key={vid.id}
                        className="p-2 rounded-lg bg-purple-950/40 border border-purple-900/30 flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-medium text-white truncate text-xs">{vid.title}</div>
                          <div className="text-[10px] text-purple-400 truncate font-mono">
                            {vid.campaignTitle}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 text-right">
                          <div>
                            <div className="font-mono text-white text-[11px] font-bold">
                              {formatNumber(vid.verifiedViews)} views
                            </div>
                            <div className="font-mono text-emerald-400 text-[10px]">
                              {formatCurrency(vid.rewardEarned)}
                            </div>
                          </div>
                          {vid.videoUrl && (
                            <a
                              href={vid.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-white"
                              title="Open Clip"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Performance Summary */}
      <div className="p-5 rounded-2xl bg-[#120826] border border-purple-900/40 space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-semibold">
          Performance Summary
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center pt-2">
          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-500/40 mx-auto flex items-center justify-center font-bold text-white text-lg font-mono">
              {totalSubmissions}
            </div>
            <div className="text-xs text-purple-300 font-medium">Total Submissions</div>
          </div>

          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 mx-auto flex items-center justify-center font-bold text-emerald-400 text-lg font-mono">
              {approvalRate}%
            </div>
            <div className="text-xs text-purple-300 font-medium">Approval Rate</div>
          </div>

          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 border-2 border-purple-500/40 mx-auto flex items-center justify-center font-bold text-purple-300 text-lg font-mono">
              {approvedSubmissions.length}
            </div>
            <div className="text-xs text-purple-300 font-medium">Approved Clips</div>
          </div>

          <div className="space-y-2">
            <div className="w-16 h-16 rounded-full bg-teal-500/10 border-2 border-teal-500/40 mx-auto flex items-center justify-center font-bold text-teal-300 text-sm font-mono px-1">
              {formatCurrency(totalGrossEarnings)}
            </div>
            <div className="text-xs text-purple-300 font-medium">Approved Videos Earnings</div>
          </div>
        </div>
      </div>

      {/* Recent Payouts Table */}
      <div className="rounded-2xl bg-[#120826] border border-purple-900/40 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-purple-900/40 flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white font-display">Recent Payouts Received</h3>
            <p className="text-xs text-purple-300/60">Disbursements transferred by platform admin</p>
          </div>
          <span className="text-xs text-purple-400 font-mono">
            {processedPayouts.length} successful payouts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead className="bg-[#0e061e] border-b border-purple-900/40 text-[10px] font-mono uppercase text-purple-400">
              <tr>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Disbursement Method</th>
                <th className="py-3 px-4">Reference / UTR</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {processedPayouts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-purple-400/60 font-mono text-xs">
                    No payouts disbursed yet. Your earnings will be paid out as campaigns complete.
                  </td>
                </tr>
              ) : (
                processedPayouts.map((w: any) => (
                  <tr key={w.id} className="hover:bg-purple-950/20 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono text-sm">
                      {formatCurrency(w.amount)}
                    </td>
                    <td className="py-3.5 px-4 text-purple-200 font-mono">
                      {w.method} • {w.accountDetails}
                    </td>
                    <td className="py-3.5 px-4 text-cyan-300 font-mono text-[11px]">
                      {w.payoutTxnId || 'Direct Settlement'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                        {w.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-purple-400 text-[11px] font-mono">
                      {new Date(w.processedAt || w.requestedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Method Setup Modal */}
      {payoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#140b2a] border border-purple-800/60 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-display">Connect Payout Method</h3>
              </div>
              <button
                onClick={() => setPayoutModalOpen(false)}
                className="p-1 rounded-lg text-purple-400 hover:text-white hover:bg-purple-900/40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-purple-300/70">
              Enter your UPI ID or Direct Bank Account details. All approved clip earnings will disburse directly to this destination.
            </p>

            <form onSubmit={handleSavePayoutMethod} className="space-y-4 text-xs">
              <div>
                <label className="block text-purple-300 font-mono mb-1">Legal Account Holder Name</label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  placeholder="e.g. Satya Kumar"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800/50 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* UPI ID */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-purple-300 font-mono">UPI ID (Fastest Settlement)</label>
                  <span className="text-[10px] text-emerald-400 font-mono">Recommended</span>
                </div>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. yourname@okhdfcbank"
                  className="w-full px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800/50 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-purple-900/40"></div>
                <span className="flex-shrink mx-2 text-[10px] font-mono text-purple-400 uppercase">
                  Or Bank Transfer
                </span>
                <div className="flex-grow border-t border-purple-900/40"></div>
              </div>

              {/* Bank Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-purple-300 font-mono mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g. HDFC Bank, ICICI Bank, SBI"
                    className="w-full px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800/50 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-purple-300 font-mono mb-1">Account Number</label>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    placeholder="e.g. 50100492819283"
                    className="w-full px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800/50 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-purple-300 font-mono mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={bankIfsc}
                    onChange={(e) => setBankIfsc(e.target.value)}
                    placeholder="e.g. HDFC0001234"
                    className="w-full px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800/50 text-white font-mono focus:outline-none focus:border-cyan-500 uppercase"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-purple-900/40">
                <button
                  type="button"
                  onClick={() => setPayoutModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-purple-300 hover:text-white bg-purple-950/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingMethod}
                  className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-glow-emerald disabled:opacity-50 flex items-center gap-2"
                >
                  {savingMethod ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Payout Method
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
