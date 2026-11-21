'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, PlusCircle, ShieldCheck, Download, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function BrandBillingPage() {
  const [wallet, setWallet] = useState<any>(null);
  const [depositAmount, setDepositAmount] = useState('50000');
  const [depositing, setDepositing] = useState(false);
  const [msg, setMsg] = useState('');

  const loadWallet = () => {
    fetch('/api/wallet')
      .then((r) => r.json())
      .then((data) => {
        if (data.wallet) setWallet(data.wallet);
      });
  };

  useEffect(() => {
    loadWallet();
  }, []);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDepositing(true);
    setMsg('');

    try {
      const res = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: depositAmount, paymentMethod: 'Razorpay UPI/Corporate Card' }),
      });

      const data = await res.json();
      if (data.success) {
        setMsg(`✅ Successfully credited ₹${Number(depositAmount).toLocaleString('en-IN')} to Brand Wallet!`);
        loadWallet();
      }
    } finally {
      setDepositing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Billing & Escrow Treasury</h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Manage corporate funds, allocate campaign escrow pools, and download GST tax invoices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-2">
          <div className="text-xs text-purple-300 uppercase font-mono">Available Deposit Balance</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-display">
            {formatCurrency(wallet?.balance || 0)}
          </div>
          <div className="text-xs text-purple-300/80">Ready to deploy to campaigns</div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1b1035] to-[#120a22] border border-purple-600/40 space-y-2">
          <div className="text-xs text-purple-300 uppercase font-mono">Active Campaign Escrow</div>
          <div className="text-3xl font-extrabold text-white font-display">
            {formatCurrency(wallet?.escrowBalance || 0)}
          </div>
          <div className="text-xs text-purple-400">Locked for clipper payouts</div>
        </div>

        <div className="p-6 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-2">
          <div className="text-xs text-purple-300 uppercase font-mono">Lifetime Deployed</div>
          <div className="text-3xl font-extrabold text-cyan-400 font-display">
            {formatCurrency(wallet?.lifetimeSpent || 350000)}
          </div>
          <div className="text-xs text-cyan-300/70">Delivered 2.4M+ verified views</div>
        </div>
      </div>

      {/* Top up form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#140c26] border border-purple-900/50 space-y-5">
        <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-purple-400" /> Top Up Brand Wallet (Razorpay Gateway)
        </h2>

        {msg && <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/40 text-xs text-white">{msg}</div>}

        <form onSubmit={handleDeposit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="text-xs text-purple-300 font-medium">Deposit Amount (₹ INR)</label>
            <input
              type="number"
              min="10000"
              step="5000"
              required
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={depositing}
            className="px-8 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple text-xs"
          >
            {depositing ? 'Processing Deposit...' : 'Add Funds via Razorpay'}
          </button>
        </form>
      </div>
    </div>
  );
}
