'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  DollarSign,
  TrendingUp,
  Eye,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  CreditCard,
  Building2,
  Smartphone,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Check,
  Send,
  X,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  User,
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

interface ClipperAccount {
  handle: string;
  platform: string;
  totalApprovedClips: number;
  totalApprovedViews: number;
  accountEarnings: number;
  videos: VideoItem[];
}

interface ClipperData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: string;
  joinedAt: string;
  paymentDetails: {
    upiId: string | null;
    bankName: string | null;
    bankAccountNumber: string | null;
    bankIfsc: string | null;
    hasPayoutMethod: boolean;
    preferredMethod: string;
  };
  metrics: {
    totalSubmissions: number;
    approvedClipsCount: number;
    pendingClipsCount: number;
    totalApprovedViews: number;
    totalEarnings: number;
    totalPaidOut: number;
    unpaidEarnings: number;
    pendingViews: number;
    pendingEstimatedEarnings: number;
  };
  accounts: ClipperAccount[];
  payoutHistory: any[];
}

export default function AdminClipperPayoutsPage() {
  const [clippers, setClippers] = useState<ClipperData[]>([]);
  const [summary, setSummary] = useState<any>({
    totalClippersCount: 0,
    totalApprovedViews: 0,
    totalGrossEarnings: 0,
    totalPaidOut: 0,
    totalUnpaidDue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'due_desc' | 'earnings_desc' | 'views_desc' | 'name_asc'>('due_desc');
  const [filterType, setFilterType] = useState<'ALL' | 'DUE_ONLY' | 'SETTLED'>('ALL');

  // Expanded clipper state for account breakdown
  const [expandedClipperId, setExpandedClipperId] = useState<string | null>(null);

  // Pay Clipper Modal
  const [payModalClipper, setPayModalClipper] = useState<ClipperData | null>(null);
  const [payoutAmount, setPayoutAmount] = useState<string>('');
  const [payoutMethod, setPayoutMethod] = useState<'UPI' | 'BANK_TRANSFER'>('UPI');
  const [payoutTxnId, setPayoutTxnId] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [paying, setPaying] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Copy feedback
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const fetchClippers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/clippers');
      const data = await res.json();
      if (data.clippers) {
        setClippers(data.clippers);
        if (data.summary) setSummary(data.summary);
      }
    } catch (err) {
      console.error('Failed to fetch clippers', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClippers();
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const openPayModal = (clipper: ClipperData) => {
    setPayModalClipper(clipper);
    setPayoutAmount(clipper.metrics.unpaidEarnings.toString());
    setPayoutMethod(clipper.paymentDetails.upiId ? 'UPI' : 'BANK_TRANSFER');
    setPayoutTxnId(`UTR-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`);
    setAdminNotes(`Settlement payout for approved campaign clips`);
  };

  const handleConfirmPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payModalClipper) return;

    const amt = parseFloat(payoutAmount);
    if (isNaN(amt) || amt <= 0) {
      setToastMsg({ text: 'Please enter a valid payout amount', type: 'error' });
      return;
    }

    try {
      setPaying(true);
      const res = await fetch('/api/admin/clippers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clipperId: payModalClipper.id,
          amount: amt,
          method: payoutMethod,
          accountDetails:
            payoutMethod === 'UPI'
              ? payModalClipper.paymentDetails.upiId || 'UPI Direct'
              : `Bank: ${payModalClipper.paymentDetails.bankName || ''} - Acc: ${payModalClipper.paymentDetails.bankAccountNumber || ''} (IFSC: ${payModalClipper.paymentDetails.bankIfsc || ''})`,
          payoutTxnId,
          adminNotes,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setToastMsg({
          text: `✅ Disbursed $${amt.toFixed(2)} to ${payModalClipper.name}! Amount deducted from earnings.`,
          type: 'success',
        });
        setPayModalClipper(null);
        await fetchClippers();
      } else {
        setToastMsg({ text: `❌ ${data.error || 'Failed to process payout'}`, type: 'error' });
      }
    } catch {
      setToastMsg({ text: '❌ Network error processing payout', type: 'error' });
    } finally {
      setPaying(false);
      setTimeout(() => setToastMsg(null), 5000);
    }
  };

  // Filter & Sort
  const filteredClippers = useMemo(() => {
    return clippers
      .filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (c.paymentDetails.upiId && c.paymentDetails.upiId.toLowerCase().includes(searchQuery.toLowerCase())) ||
          c.accounts.some((a) => a.handle.toLowerCase().includes(searchQuery.toLowerCase()));

        if (!matchesSearch) return false;

        if (filterType === 'DUE_ONLY') return c.metrics.unpaidEarnings > 0;
        if (filterType === 'SETTLED') return c.metrics.unpaidEarnings === 0 && c.metrics.totalEarnings > 0;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'due_desc') return b.metrics.unpaidEarnings - a.metrics.unpaidEarnings;
        if (sortBy === 'earnings_desc') return b.metrics.totalEarnings - a.metrics.totalEarnings;
        if (sortBy === 'views_desc') return b.metrics.totalApprovedViews - a.metrics.totalApprovedViews;
        if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [clippers, searchQuery, sortBy, filterType]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl border shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-top-4 ${
            toastMsg.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
              : 'bg-rose-950/90 border-rose-500/50 text-rose-200'
          }`}
        >
          <span className="text-sm font-medium">{toastMsg.text}</span>
          <button onClick={() => setToastMsg(null)} className="text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            DIRECT PAYOUTS & EARNINGS HUB
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Clipper Earnings & Payout Settlements
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
            All campaigns standard rate: <span className="text-cyan-400 font-mono font-bold">$0.50 CPM</span> ($0.50 per 1,000 verified views). Pay clippers directly via UPI / Bank and deduct from earnings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchClippers}
            className="px-4 py-2 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-800/40 text-purple-200 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#180f33] to-[#0d071c] border border-purple-900/40 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Total Approved Views</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
            {formatNumber(summary.totalApprovedViews)}
          </div>
          <div className="text-[11px] text-purple-300/60 mt-1">Across all approved creator clips</div>
        </div>

        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#180f33] to-[#0d071c] border border-purple-900/40 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Gross Clipper Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
            {formatCurrency(summary.totalGrossEarnings)}
          </div>
          <div className="text-[11px] text-emerald-300/60 mt-1">Generated at $0.50 CPM</div>
        </div>

        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#180f33] to-[#0d071c] border border-purple-900/40 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Total Paid Out</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-200">
            {formatCurrency(summary.totalPaidOut)}
          </div>
          <div className="text-[11px] text-purple-300/60 mt-1">Settled & dispatched payouts</div>
        </div>

        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-emerald-950/40 via-[#180f33] to-[#0d071c] border border-emerald-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Outstanding Due</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-300">
            {formatCurrency(summary.totalUnpaidDue)}
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-1 font-medium">Ready for campaign settlement</div>
        </div>
      </div>

      {/* Filter & Sort Controls */}
      <div className="p-4 rounded-2xl bg-[#120924] border border-purple-900/40 flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clipper, email, handle, UPI..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-purple-950/40 border border-purple-800/40 text-white placeholder-purple-400/50 text-xs focus:outline-none focus:border-cyan-500/70"
          />
        </div>

        {/* Filter Pills & Sort Selector */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-1 bg-purple-950/60 p-1 rounded-xl border border-purple-900/40 text-xs">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'ALL'
                  ? 'bg-purple-600 text-white shadow-glow-purple'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              All ({clippers.length})
            </button>
            <button
              onClick={() => setFilterType('DUE_ONLY')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'DUE_ONLY'
                  ? 'bg-emerald-600 text-white shadow-glow-emerald'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              Due Payouts
            </button>
            <button
              onClick={() => setFilterType('SETTLED')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filterType === 'SETTLED'
                  ? 'bg-cyan-600 text-white shadow-glow-cyan'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              Settled
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800/40 text-xs text-purple-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="due_desc">Sort: Highest Due Balance</option>
            <option value="earnings_desc">Sort: Highest Total Earnings</option>
            <option value="views_desc">Sort: Most Approved Views</option>
            <option value="name_asc">Sort: Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Clippers List */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-purple-300 font-mono">Loading clippers earnings & account data...</p>
        </div>
      ) : filteredClippers.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#120924] border border-purple-900/40 space-y-2">
          <AlertCircle className="w-8 h-8 text-purple-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No clippers match criteria</h3>
          <p className="text-xs text-purple-300/70">Try adjusting your search query or filter options.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClippers.map((clipper) => {
            const isExpanded = expandedClipperId === clipper.id;
            const hasDue = clipper.metrics.unpaidEarnings > 0;

            return (
              <div
                key={clipper.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'bg-[#140b2b] border-cyan-500/40 shadow-xl'
                    : 'bg-[#120924] border-purple-900/40 hover:border-purple-800/60'
                }`}
              >
                {/* Main Clipper Card Row */}
                <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Clipper Identity & Payment Method */}
                  <div className="flex items-start sm:items-center gap-3 min-w-[280px]">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center font-bold text-white font-mono text-sm shrink-0 shadow-md">
                      {clipper.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase() || 'CL'}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm sm:text-base font-display">
                          {clipper.name}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                          CLIPPER
                        </span>
                      </div>

                      <div className="text-xs text-purple-300/70 font-mono">{clipper.email}</div>

                      {/* Payment Method Badges */}
                      <div className="flex items-center gap-1.5 pt-1">
                        {clipper.paymentDetails.upiId ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-semibold">
                            <Smartphone className="w-3 h-3 text-emerald-400" />
                            <span>UPI: {clipper.paymentDetails.upiId}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(clipper.paymentDetails.upiId!);
                              }}
                              className="text-emerald-400 hover:text-white ml-1"
                              title="Copy UPI ID"
                            >
                              {copiedText === clipper.paymentDetails.upiId ? (
                                <Check className="w-3 h-3 text-emerald-300" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        ) : clipper.paymentDetails.bankAccountNumber ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono font-semibold">
                            <Building2 className="w-3 h-3 text-purple-400" />
                            <span>
                              {clipper.paymentDetails.bankName || 'Bank'} •••• {clipper.paymentDetails.bankAccountNumber.slice(-4)} (IFSC: {clipper.paymentDetails.bankIfsc})
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(clipper.paymentDetails.bankAccountNumber!);
                              }}
                              className="text-purple-400 hover:text-white ml-1"
                              title="Copy Bank Account"
                            >
                              {copiedText === clipper.paymentDetails.bankAccountNumber ? (
                                <Check className="w-3 h-3 text-emerald-300" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
                            <AlertCircle className="w-3 h-3" />
                            No payment method connected
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Metrics At Glance */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 px-4 rounded-xl bg-purple-950/30 border border-purple-900/30">
                    <div>
                      <div className="text-[10px] font-mono text-purple-400 uppercase">Approved Views</div>
                      <div className="text-sm sm:text-base font-bold font-mono text-white">
                        {formatNumber(clipper.metrics.totalApprovedViews)}
                      </div>
                      <div className="text-[10px] text-purple-400/60 font-mono">
                        {clipper.metrics.approvedClipsCount} approved clips
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-purple-400 uppercase">Total Earned</div>
                      <div className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                        {formatCurrency(clipper.metrics.totalEarnings)}
                      </div>
                      <div className="text-[10px] text-purple-400/60 font-mono">$0.50 CPM</div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-purple-400 uppercase">Paid Out</div>
                      <div className="text-sm sm:text-base font-bold font-mono text-purple-300">
                        {formatCurrency(clipper.metrics.totalPaidOut)}
                      </div>
                      <div className="text-[10px] text-purple-400/60 font-mono">
                        {clipper.payoutHistory.length} disbursements
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-purple-400 uppercase">Unpaid Due</div>
                      <div
                        className={`text-sm sm:text-base font-bold font-mono ${
                          hasDue ? 'text-emerald-400 font-extrabold animate-pulse' : 'text-slate-400'
                        }`}
                      >
                        {formatCurrency(clipper.metrics.unpaidEarnings)}
                      </div>
                      <div className="text-[10px] text-purple-400/60 font-mono">
                        {hasDue ? 'Ready to disburse' : 'Fully settled'}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end lg:self-center">
                    <button
                      onClick={() => openPayModal(clipper)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                        hasDue
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-glow-emerald'
                          : 'bg-purple-900/40 text-purple-300 hover:bg-purple-900/60 border border-purple-800/40'
                      }`}
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      {hasDue ? `Pay Clipper (${formatCurrency(clipper.metrics.unpaidEarnings)})` : 'Manual Payout'}
                    </button>

                    <button
                      onClick={() => setExpandedClipperId(isExpanded ? null : clipper.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                        isExpanded
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                          : 'bg-purple-950/40 border-purple-800/40 text-purple-300 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Accounts ({clipper.accounts.length})</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Section: Multi-Account Breakdown & Payouts */}
                {isExpanded && (
                  <div className="border-t border-purple-900/40 bg-[#0d061c]/90 p-5 space-y-6 animate-in fade-in duration-200">
                    {/* Feature Requirement: Breakdown by Clipper's Accounts */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-cyan-400" />
                          <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                            Social Accounts Breakdown ({clipper.accounts.length} connected accounts)
                          </h4>
                        </div>
                        <span className="text-[11px] text-purple-300 font-mono">
                          Track which account generated how many approved views
                        </span>
                      </div>

                      {clipper.accounts.length === 0 ? (
                        <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-900/30 text-xs text-purple-300">
                          No approved videos associated with specific account handles yet.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {clipper.accounts.map((acc, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-gradient-to-br from-[#160b2e] to-[#100720] border border-cyan-500/20 space-y-3"
                            >
                              {/* Account Header */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                      acc.platform === 'YOUTUBE'
                                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                        : acc.platform === 'INSTAGRAM'
                                        ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                                        : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
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

                              {/* Approved Videos List under this account */}
                              <div className="space-y-1.5 pt-1">
                                <div className="text-[10px] uppercase font-mono text-purple-400/80 font-semibold">
                                  Approved Videos ({acc.videos.length})
                                </div>
                                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                                  {acc.videos.map((vid) => (
                                    <div
                                      key={vid.id}
                                      className="p-2 rounded-lg bg-purple-950/30 border border-purple-900/30 flex items-center justify-between text-xs hover:bg-purple-900/20"
                                    >
                                      <div className="min-w-0 pr-2">
                                        <div className="font-medium text-white truncate text-xs">{vid.title}</div>
                                        <div className="text-[10px] text-purple-400 truncate font-mono">
                                          {vid.campaignTitle}
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-3 shrink-0 text-right">
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
                                            className="p-1 rounded hover:bg-purple-800/40 text-cyan-400"
                                            title="Open video URL"
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

                    {/* Clipper Payout History */}
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-white uppercase font-mono text-purple-400 mb-2">
                        Disbursement / Payout History ({clipper.payoutHistory.length})
                      </h4>
                      {clipper.payoutHistory.length === 0 ? (
                        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/30 text-xs text-purple-400 font-mono">
                          No previous payouts recorded for this clipper.
                        </div>
                      ) : (
                        <div className="overflow-x-auto rounded-xl border border-purple-900/40">
                          <table className="w-full text-left text-xs text-purple-200">
                            <thead className="bg-[#110722] text-[10px] font-mono uppercase text-purple-400">
                              <tr>
                                <th className="py-2.5 px-3">Date</th>
                                <th className="py-2.5 px-3">Amount</th>
                                <th className="py-2.5 px-3">Method & Details</th>
                                <th className="py-2.5 px-3">Ref / UTR</th>
                                <th className="py-2.5 px-3">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-purple-900/30">
                              {clipper.payoutHistory.map((p: any) => (
                                <tr key={p.id} className="hover:bg-purple-900/10">
                                  <td className="py-2.5 px-3 font-mono text-[11px] text-purple-300">
                                    {new Date(p.processedAt || p.requestedAt).toLocaleDateString()}
                                  </td>
                                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                                    {formatCurrency(p.amount)}
                                  </td>
                                  <td className="py-2.5 px-3 font-mono text-[11px] text-white">
                                    {p.method} • {p.accountDetails}
                                  </td>
                                  <td className="py-2.5 px-3 font-mono text-[11px] text-cyan-300">
                                    {p.payoutTxnId || 'N/A'}
                                  </td>
                                  <td className="py-2.5 px-3">
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                      {p.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pay Clipper Modal */}
      {payModalClipper && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#130b26] border border-emerald-500/40 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
              <div>
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  Disburse Payout to Clipper
                </h3>
                <p className="text-xs text-purple-300/70">
                  Deduct from clipper&apos;s earnings balance and record official payout transaction.
                </p>
              </div>
              <button
                onClick={() => setPayModalClipper(null)}
                className="p-1.5 rounded-lg hover:bg-purple-900/40 text-purple-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmPayout} className="space-y-4">
              {/* Recipient Details Card */}
              <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-900/40 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-mono uppercase text-[10px]">Clipper</span>
                  <span className="text-white font-bold">{payModalClipper.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-mono uppercase text-[10px]">Email</span>
                  <span className="text-purple-300 font-mono">{payModalClipper.email}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-purple-900/30">
                  <span className="text-purple-400 font-mono uppercase text-[10px]">Total Unpaid Due</span>
                  <span className="text-emerald-400 font-bold font-mono text-sm">
                    {formatCurrency(payModalClipper.metrics.unpaidEarnings)}
                  </span>
                </div>

                {/* Connected Account Display */}
                <div className="pt-2 border-t border-purple-900/30">
                  <span className="text-purple-400 font-mono uppercase text-[10px] block mb-1">
                    Connected Payout Destination:
                  </span>
                  {payModalClipper.paymentDetails.upiId ? (
                    <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between font-mono text-xs text-emerald-300">
                      <span>UPI: {payModalClipper.paymentDetails.upiId}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(payModalClipper.paymentDetails.upiId!)}
                        className="text-emerald-400 hover:text-white text-[11px] underline flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                  ) : payModalClipper.paymentDetails.bankAccountNumber ? (
                    <div className="p-2 rounded-lg bg-purple-950/30 border border-purple-500/30 font-mono text-xs text-purple-200 space-y-1">
                      <div>Bank: {payModalClipper.paymentDetails.bankName || 'Direct IMPS'}</div>
                      <div>Account: {payModalClipper.paymentDetails.bankAccountNumber}</div>
                      <div>IFSC: {payModalClipper.paymentDetails.bankIfsc}</div>
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-mono">
                      ⚠️ No payout method on file. Confirm destination with clipper.
                    </div>
                  )}
                </div>
              </div>

              {/* Amount to Disburse */}
              <div>
                <label className="block text-xs font-mono text-purple-300 mb-1">
                  Payout Amount to Deduct ($ USD):
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" />
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max={payModalClipper.metrics.unpaidEarnings || 10000}
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    required
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-purple-950/60 border border-purple-800/50 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-purple-400 font-mono mt-1">
                  <span>Max due: {formatCurrency(payModalClipper.metrics.unpaidEarnings)}</span>
                  <button
                    type="button"
                    onClick={() => setPayoutAmount(payModalClipper.metrics.unpaidEarnings.toString())}
                    className="text-cyan-400 hover:underline"
                  >
                    Pay Full Due
                  </button>
                </div>
              </div>

              {/* Method Selector */}
              <div>
                <label className="block text-xs font-mono text-purple-300 mb-1">Disbursement Method:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('UPI')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                      payoutMethod === 'UPI'
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                        : 'bg-purple-950/40 border-purple-800/40 text-purple-400'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" /> UPI Transfer
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('BANK_TRANSFER')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 ${
                      payoutMethod === 'BANK_TRANSFER'
                        ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                        : 'bg-purple-950/40 border-purple-800/40 text-purple-400'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" /> Direct Bank Transfer
                  </button>
                </div>
              </div>

              {/* Transaction Ref / UTR */}
              <div>
                <label className="block text-xs font-mono text-purple-300 mb-1">
                  Bank Reference / UTR Number / Txn ID:
                </label>
                <input
                  type="text"
                  value={payoutTxnId}
                  onChange={(e) => setPayoutTxnId(e.target.value)}
                  placeholder="e.g. UTR-92810481249"
                  required
                  className="w-full px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800/50 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-mono text-purple-300 mb-1">Admin Remarks (Optional):</label>
                <input
                  type="text"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Paid via ICICI Netbanking"
                  className="w-full px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800/50 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-900/40">
                <button
                  type="button"
                  onClick={() => setPayModalClipper(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={paying}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-glow-emerald disabled:opacity-50 flex items-center gap-2"
                >
                  {paying ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Recording Payout...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm Payout & Deduct Earnings
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
