'use client';

import React, { useState, useEffect } from 'react';
import { Banknote, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchWithdrawals = () => {
    setLoading(true);
    fetch('/api/withdrawals')
      .then((r) => r.json())
      .then((data) => {
        if (data.withdrawals) setWithdrawals(data.withdrawals);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleAction = async (id: string, action: 'APPROVE' | 'REJECT') => {
    setActionLoading(true);
    try {
      await fetch(`/api/withdrawals/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      fetchWithdrawals();
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Payout Settlements & Withdrawals Queue
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Approve pending clipper UPI and IMPS bank cashout requests with automated transaction tracking.
        </p>
      </div>

      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead className="bg-[#100720] border-b border-purple-900/40 uppercase font-mono text-[10px] text-purple-400">
              <tr>
                <th className="py-3.5 px-4">Clipper</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Method & Account</th>
                <th className="py-3.5 px-4">Requested At</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {withdrawals.map((w) => (
                <tr key={w.id} className="hover:bg-purple-950/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-white">{w.clipper?.name}</div>
                    <div className="text-[10px] text-purple-400">{w.clipper?.email}</div>
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-400 font-display text-sm">
                    {formatCurrency(w.amount)}
                  </td>
                  <td className="py-4 px-4 space-y-0.5">
                    <div className="font-mono text-white">{w.accountDetails}</div>
                    <div className="text-[10px] text-purple-400">{w.method}</div>
                  </td>
                  <td className="py-4 px-4 text-purple-300 text-[11px]">
                    {new Date(w.requestedAt).toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${
                        w.status === 'PROCESSED'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : w.status === 'PENDING'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                      }`}
                    >
                      {w.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {w.status === 'PENDING' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAction(w.id, 'APPROVE')}
                          disabled={actionLoading}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-glow-purple"
                        >
                          Approve UPI Payout
                        </button>
                        <button
                          onClick={() => handleAction(w.id, 'REJECT')}
                          disabled={actionLoading}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-300 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] font-mono text-purple-400">{w.payoutTxnId || 'Settled'}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
