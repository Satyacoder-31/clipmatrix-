'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, ArrowDownRight, Zap, Building2, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function ClipperEarningsPage() {
  const [wallet, setWallet] = useState<any>(null);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [amount, setAmount] = useState('5000');
  const [method, setMethod] = useState('UPI');
  const [accountDetails, setAccountDetails] = useState('');
  const [loading, setLoading] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  const [msg, setMsg] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [wRes, withRes, userRes] = await Promise.all([
        fetch('/api/wallet').then((r) => r.json()),
        fetch('/api/withdrawals').then((r) => r.json()),
        fetch('/api/auth/me').then((r) => r.json()),
      ]);

      if (wRes.wallet) setWallet(wRes.wallet);
      if (withRes.withdrawals) setWithdrawals(withRes.withdrawals);
      if (userRes.user?.clipperProfile?.upiId) {
        setAccountDetails(userRes.user.clipperProfile.upiId);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleWithdrawalRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawing(true);
    setMsg('');

    try {
      const res = await fetch('/api/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, method, accountDetails }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || 'Failed to request withdrawal');
      } else {
        setMsg('✅ Withdrawal request submitted! Admin settlement queue updated.');
        loadData();
      }
    } catch {
      setMsg('Error submitting withdrawal request');
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Earnings & Payouts</h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Manage your verified balance and request instant UPI or Bank IMPS cashouts.
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1b1035] to-[#120a22] border border-purple-600/40 space-y-2">
          <div className="text-xs text-purple-300 uppercase font-mono">Available For Cashout</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-display">
            {formatCurrency(wallet?.balance || 0)}
          </div>
          <div className="text-xs text-purple-300/80">Minimum threshold: ₹500</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-2">
          <div className="text-xs text-purple-300 uppercase font-mono">Pending View Verification</div>
          <div className="text-3xl font-extrabold text-amber-400 font-display">
            {formatCurrency(wallet?.pendingBalance || 0)}
          </div>
          <div className="text-xs text-purple-300/80">In 48h performance window</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-2">
          <div className="text-xs text-purple-300 uppercase font-mono">Total Lifetime Earned</div>
          <div className="text-3xl font-extrabold text-white font-display">
            {formatCurrency(wallet?.lifetimeEarned || 0)}
          </div>
          <div className="text-xs text-cyan-400">Campaign Payouts Settled</div>
        </div>
      </div>

      {/* Withdrawal Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-purple-900/40">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white font-display">Request Payout</h2>
        </div>

        {msg && <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/40 text-xs text-white">{msg}</div>}

        <form onSubmit={handleWithdrawalRequest} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-purple-300 font-medium">Amount to Withdraw (₹)</label>
            <input
              type="number"
              min="500"
              max={wallet?.balance || 500}
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-purple-300 font-medium">Payout Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
            >
              <option value="UPI">Instant UPI (PhonePe / GPay / Paytm)</option>
              <option value="BANK_TRANSFER">Bank IMPS / NEFT</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-purple-300 font-medium">UPI ID or Bank Details *</label>
            <input
              type="text"
              required
              value={accountDetails}
              onChange={(e) => setAccountDetails(e.target.value)}
              placeholder="e.g. aarav@okaxis or A/C + IFSC"
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={withdrawing || (wallet?.balance || 0) < 500}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple disabled:opacity-50 text-xs"
            >
              {withdrawing ? 'Processing Request...' : 'Confirm Cashout to Account'}
            </button>
          </div>
        </form>
      </div>

      {/* Transaction & Withdrawal History */}
      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 p-6 space-y-4">
        <h2 className="text-base font-bold text-white font-display">Recent Ledger Transactions</h2>

        <div className="divide-y divide-purple-900/30 text-xs">
          {wallet?.transactions?.length > 0 ? (
            wallet.transactions.map((tx: any) => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{tx.description}</div>
                  <div className="text-[10px] text-purple-400 font-mono">
                    {new Date(tx.createdAt).toLocaleDateString()} • {tx.type}
                  </div>
                </div>
                <div className={`font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-purple-300'}`}>
                  {tx.amount > 0 ? `+₹${tx.amount.toLocaleString('en-IN')}` : `-₹${Math.abs(tx.amount).toLocaleString('en-IN')}`}
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-center text-purple-300/70">No transactions recorded yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
