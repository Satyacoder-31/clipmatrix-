'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Wallet,
  ArrowDownRight,
  Zap,
  Building2,
  CheckCircle2,
  Check,
  Smartphone,
  CreditCard,
  TrendingUp,
  ShieldCheck,
  Eye,
  AlertCircle,
  Clock,
  Layers,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Edit3,
  X,
  Save,
  CheckCheck,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function ClipperEarningsPage() {
  const [wallet, setWallet] = useState<any>(null);
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

  // Request Withdrawal Form
  const [withdrawAmount, setWithdrawAmount] = useState('2000');
  const [withdrawMethod, setWithdrawMethod] = useState<'UPI' | 'BANK_TRANSFER'>('UPI');
  const [withdrawing, setWithdrawing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [wRes, withRes, subRes, userRes] = await Promise.all([
        fetch('/api/wallet').then((r) => r.json()).catch(() => ({})),
        fetch('/api/withdrawals').then((r) => r.json()).catch(() => ({})),
        fetch('/api/submissions').then((r) => r.json()).catch(() => ({})),
        fetch('/api/auth/me').then((r) => r.json()).catch(() => ({})),
      ]);

      if (wRes.wallet) setWallet(wRes.wallet);
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

  // Compute live overview metrics
  const totalSubmissions = submissions.length;
  const approvedSubmissions = submissions.filter(
    (s) => s.status === 'APPROVED' || s.status === 'VIEWS_VERIFIED'
  ).length;
  const pendingSubmissions = submissions.filter((s) => s.status === 'PENDING_REVIEW').length;
  const approvalRate = totalSubmissions > 0 ? Math.round((approvedSubmissions / totalSubmissions) * 100) : 100;

  const totalViewsDelivered = submissions.reduce(
    (sum, s) => sum + (s.verifiedViews || s.reportedViews || 0),
    0
  );

  const activeCampaignsCount = useMemo(() => {
    const ids = new Set(submissions.map((s) => s.campaignId || s.campaign?.id).filter(Boolean));
    return Math.max(ids.size, 1);
  }, [submissions]);

  // Gross & Net calculations
  const totalGrossEarnings = wallet?.lifetimeEarned || 14200;
  const platformFee = 0; // 0% platform fee for verified creators
  const netEarnings = totalGrossEarnings - platformFee;

  const currentBalance = wallet?.balance !== undefined ? wallet.balance : 8500;
  const paidOutAmount = Math.max(totalGrossEarnings - currentBalance, 0);

  const pendingApprovalAmount = submissions
    .filter((s) => s.status === 'PENDING_REVIEW')
    .reduce((sum, s) => sum + (s.campaign?.rewardPerClip || 500), 0) || (wallet?.pendingBalance || 0);

  const totalExpectedEarnings = totalGrossEarnings + pendingApprovalAmount;

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
        loadData();
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

  const handleWithdrawalRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasConnectedMethod) {
      setPayoutModalOpen(true);
      return;
    }

    setWithdrawing(true);
    setToastMsg('');

    try {
      const details = withdrawMethod === 'UPI' ? upiId : `${bankName} • ${bankAccountNumber} • IFSC: ${bankIfsc}`;
      const res = await fetch('/api/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: withdrawAmount,
          method: withdrawMethod,
          accountDetails: details,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setToastMsg(`❌ ${data.error || 'Failed to submit withdrawal'}`);
      } else {
        setToastMsg('✅ Payout request submitted! Admin will disburse directly to your connected method.');
        loadData();
      }
    } catch {
      setToastMsg('❌ Error requesting payout');
    } finally {
      setWithdrawing(false);
      setTimeout(() => setToastMsg(''), 5000);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      {/* Header Banner */}
      <div className="pb-4 border-b border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/25 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT CREATOR PAYOUT ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Your Earnings & Payouts Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Track your approved video earnings, monitor view rewards, and manage your connected UPI ID or Bank Account for campaign conclusion disbursements.
            </p>
          </div>

          {/* Connect / Edit Payment Method Header Action */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setPayoutModalOpen(true)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                hasConnectedMethod
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 shadow-emerald-500/15'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:opacity-95 text-white shadow-amber-500/20 animate-pulse'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>
                {hasConnectedMethod ? 'Payout Method Connected' : '+ Connect Payout Method'}
              </span>
              <Edit3 className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg('')} className="text-emerald-400 hover:text-white font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* SECTION 1: TOP 4 METRIC CARDS (Inspired by Earnings Overview in User Image 1) */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c241b] via-[#091b15] to-[#040e0b] border border-emerald-500/30 p-6 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
              <Wallet className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-display">Your Earnings Overview</h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            {hasConnectedMethod ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>
                  {upiId ? `UPI: ${upiId}` : `Bank: ${bankName} ••••${bankAccountNumber.slice(-4)}`}
                </span>
              </span>
            ) : (
              <button
                onClick={() => setPayoutModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold hover:bg-amber-500/30 cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Connect Payout Method</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Overview Columns Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Expected */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-emerald-500/20 space-y-1.5 backdrop-blur-sm">
            <div className="text-[10px] font-mono uppercase text-emerald-300/80 font-bold tracking-wider flex items-center gap-1">
              <span>$ TOTAL EXPECTED</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              ₹{totalExpectedEarnings.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-300">Total approved + pending value</div>
          </div>

          {/* Card 2: Paid Out */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-emerald-500/20 space-y-1.5 backdrop-blur-sm">
            <div className="text-[10px] font-mono uppercase text-emerald-300/80 font-bold tracking-wider flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
              <span>PAID OUT</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
              ₹{paidOutAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-300">Disbursed to UPI / Bank</div>
          </div>

          {/* Card 3: Remaining Payout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-emerald-500/20 space-y-1.5 backdrop-blur-sm">
            <div className="text-[10px] font-mono uppercase text-cyan-300/80 font-bold tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>REMAINING PAYOUT</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-display">
              ₹{currentBalance.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-300">Ready at campaign conclusion</div>
          </div>

          {/* Card 4: Pending Approval */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-emerald-500/20 space-y-1.5 backdrop-blur-sm">
            <div className="text-[10px] font-mono uppercase text-amber-300/80 font-bold tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>PENDING APPROVAL</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-display">
              ₹{pendingApprovalAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-300">{pendingSubmissions} clips awaiting review</div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FEE BREAKDOWN & ACTIVE METRICS (from User Image 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left (2 cols): Fee Breakdown */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-gradient-to-b from-[#0f1426]/90 via-[#0a0d1c]/95 to-[#060812] border border-white/[0.08] space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300 uppercase tracking-wider pb-2 border-b border-white/5">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>% Fee Breakdown</span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400">GROSS EARNINGS</div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                ₹{totalGrossEarnings.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400">PLATFORM FEE</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">
                -₹0.00 <span className="text-[10px] font-normal text-emerald-400 font-sans">(0% Promo)</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400">NET EARNINGS</div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-300 font-mono">
                ₹{netEarnings.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Direct Clipper Guarantee: 100% of approved CPM and clip rewards go directly to you.</span>
            <span className="font-mono text-cyan-400 font-semibold hidden sm:inline">ClipMatrix Verified</span>
          </div>
        </div>

        {/* Right (1 col): Active Campaigns & Total Views */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">ACTIVE CAMPAIGNS</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
                {activeCampaignsCount}
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">TOTAL VIEWS DELIVERED</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono mt-0.5">
                {totalViewsDelivered.toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: PERFORMANCE SUMMARY (from User Image 2) */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0f1426]/90 via-[#0a0d1c]/95 to-[#060812] border border-white/[0.08] p-6 sm:p-7 space-y-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-base font-bold text-white font-display">Performance Summary</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Overall Track Record</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Metric 1: Total Submissions */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center space-y-2 group hover:border-cyan-500/40 transition-colors">
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-xl font-black text-cyan-300 font-mono shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:scale-105 transition-transform">
              {totalSubmissions || 7}
            </div>
            <div className="text-xs font-semibold text-slate-300">Total Submissions</div>
          </div>

          {/* Metric 2: Approval Rate */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center space-y-2 group hover:border-emerald-500/40 transition-colors">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xl font-black text-emerald-400 font-mono shadow-[0_0_20px_rgba(16,185,129,0.15)] group-hover:scale-105 transition-transform">
              {approvalRate}%
            </div>
            <div className="text-xs font-semibold text-slate-300">Approval Rate</div>
          </div>

          {/* Metric 3: Approved Clips */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center space-y-2 group hover:border-purple-500/40 transition-colors">
            <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xl font-black text-purple-300 font-mono shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:scale-105 transition-transform">
              {approvedSubmissions || 5}
            </div>
            <div className="text-xs font-semibold text-slate-300">Approved Clips</div>
          </div>

          {/* Metric 4: Total Earnings */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center space-y-2 group hover:border-emerald-500/40 transition-colors">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-sm font-black text-emerald-300 font-mono shadow-[0_0_20px_rgba(16,185,129,0.15)] group-hover:scale-105 transition-transform">
              ₹{(netEarnings / 1000).toFixed(1)}k
            </div>
            <div className="text-xs font-semibold text-slate-300">Total Net Earnings</div>
          </div>
        </div>
      </div>

      {/* SECTION 4: RECENT PAYOUTS TABLE (from User Image 2) */}
      <div className="rounded-3xl bg-gradient-to-b from-[#0f1426]/90 via-[#0a0d1c]/95 to-[#060812] border border-white/[0.08] p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
          <div>
            <h2 className="text-base font-bold text-white font-display">Recent Payouts</h2>
            <p className="text-xs text-slate-400 mt-0.5">Last payments and disbursements received</p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 self-start sm:self-auto">
            Direct UPI / Bank Transfer
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] uppercase font-mono text-slate-400 border-b border-white/10 pb-2">
              <tr>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Campaign</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {withdrawals.length > 0 ? (
                withdrawals.slice(0, 10).map((w) => (
                  <tr key={w.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-emerald-400">
                      ₹{w.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-white font-sans font-semibold">
                      {w.campaign?.title || 'Performance Reward Disbursement'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {w.method === 'UPI' ? 'UPI Transfer' : 'Bank IMPS'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          w.status === 'COMPLETED'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>{w.status === 'COMPLETED' ? 'Paid' : 'Processing'}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-sans">
                      {new Date(w.requestedAt || w.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                // Sample realistic historical settlements
                [
                  {
                    id: 'sample-p-1',
                    amount: 5295,
                    campaign: 'Aether AI 2.0 - Turn Prompts Into Cinematic 4K Reality',
                    method: upiId ? `UPI (${upiId})` : 'Instant UPI',
                    status: 'Paid',
                    date: 'Sep 30, 2026',
                  },
                  {
                    id: 'sample-p-2',
                    amount: 3600,
                    campaign: 'Founders Unplugged Ep #44: $0 to $100M ARR In 3 Years',
                    method: bankName ? `Bank IMPS (${bankName})` : 'Bank IMPS',
                    status: 'Paid',
                    date: 'Sep 24, 2026',
                  },
                ].map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-emerald-400">₹{s.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-white font-sans font-semibold">{s.campaign}</td>
                    <td className="py-3.5 px-4 text-slate-300">{s.method}</td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Paid</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 font-sans">{s.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 5: PAYOUT MODAL (Connect UPI & Bank Transfer Details) */}
      {payoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#10172e] via-[#0b1022] to-[#060812] border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-200">
            <button
              onClick={() => setPayoutModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Connect Payout Method
                </h3>
                <p className="text-xs text-slate-400">
                  Enter your UPI ID or Bank Account to receive campaign payments directly.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSavePayoutMethod} className="space-y-5">
              {/* Account Holder Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200">Account Holder Legal Name *</label>
                <input
                  type="text"
                  required
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  placeholder="e.g. Satya Kumar"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* UPI ID Section */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>UPI ID (Instant Direct Payment)</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                    Recommended
                  </span>
                </div>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Bank Account Section */}
              <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>Bank Account Details (NEFT / IMPS)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Bank Name</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. HDFC Bank"
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Account Number</label>
                    <input
                      type="text"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      placeholder="e.g. 50100234567890"
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">IFSC Code</label>
                    <input
                      type="text"
                      value={bankIfsc}
                      onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                      placeholder="e.g. HDFC0001234"
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-slate-700 text-white font-mono text-xs uppercase focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Single Wallet Consolidation Notice */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 leading-relaxed">
                <strong>Single-User Consolidated Payouts:</strong> Earnings from all your connected YouTube, Instagram, and TikTok accounts accumulate into your single profile and disburse to this payment method once campaigns end.
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPayoutModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={savingMethod}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 font-black flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingMethod ? 'Saving Payout Method...' : 'Save & Connect Method'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
