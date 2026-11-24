'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import {
  Users,
  Shield,
  CheckCircle,
  Ban,
  BarChart3,
  Eye,
  X,
  CheckCircle2,
  Lock,
  TrendingUp,
  Share2,
  Wallet,
  Smartphone,
  Building2,
  Copy,
  Check,
  CreditCard,
} from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [payoutModalUser, setPayoutModalUser] = useState<any | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    const param = roleFilter !== 'ALL' ? `?role=${roleFilter}` : '';
    fetch(`/api/admin/users${param}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.users) setUsers(data.users);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, status: newStatus }),
    });
    fetchUsers();
  };

  const copyToClipboard = (text: string, fieldKey: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            User Directory & Creator Payout Info
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/70">
            Manage users, view linked creator channels, and inspect UPI & Bank details to disburse campaign payouts.
          </p>
        </div>

        <div className="flex gap-2">
          {['ALL', 'BRAND', 'CLIPPER', 'ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                roleFilter === r
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25'
                  : 'bg-[#140c26] text-purple-300 hover:text-white border border-purple-900/40'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead className="bg-[#100720] border-b border-purple-900/40 uppercase font-mono text-[10px] text-purple-400">
              <tr>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Connected Channels & Payment Details</th>
                <th className="py-3.5 px-4">Wallet Balance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {users.map((u) => {
                const cp = u.clipperProfile;
                const hasUpi = !!cp?.upiId;
                const hasBank = !!(cp?.bankName && cp?.bankAccountNumber);

                return (
                  <tr key={u.id} className="hover:bg-purple-950/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {u.avatar ? (
                          <img
                            src={u.avatar}
                            alt={u.name}
                            className="w-9 h-9 rounded-xl object-cover shrink-0 border border-purple-500/40 shadow"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-purple-600/30 text-purple-300 font-bold flex items-center justify-center text-xs shrink-0 border border-purple-500/30">
                            {u.name?.charAt(0) || 'U'}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-white">{u.name}</div>
                          <div className="text-[10px] text-purple-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.role === 'ADMIN'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : u.role === 'BRAND'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-purple-300 text-[11px]">
                      {u.brandProfile ? (
                        <span>{u.brandProfile.companyName} ({u.brandProfile.industry})</span>
                      ) : cp ? (
                        <div className="space-y-1.5">
                          <div className="font-semibold text-white flex items-center gap-2">
                            <span>{cp.instagramHandle || cp.youtubeHandle || '@daxraps30'}</span>
                            <span className="text-[10px] font-mono text-cyan-400 font-normal">({cp.level})</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            {hasUpi ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                                <Smartphone className="w-3 h-3" />
                                <span>UPI: {cp.upiId}</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400">
                                <span>No UPI</span>
                              </span>
                            )}

                            {hasBank ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
                                <Building2 className="w-3 h-3" />
                                <span>{cp.bankName}</span>
                              </span>
                            ) : null}

                            <button
                              type="button"
                              onClick={() => setPayoutModalUser(u)}
                              className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 transition-colors cursor-pointer flex items-center gap-1 ml-1"
                            >
                              <Wallet className="w-3 h-3 text-cyan-300" />
                              <span>View Payout Details</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        'System Admin'
                      )}
                    </td>
                    <td className="py-4 px-4 font-bold text-white font-mono">
                      {formatCurrency(u.wallet?.balance || 0)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {u.role !== 'ADMIN' && (
                        <button
                          onClick={() => handleToggleStatus(u.id, u.status)}
                          className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                            u.status === 'ACTIVE'
                              ? 'text-rose-400 hover:bg-rose-950/40'
                              : 'text-emerald-400 hover:bg-emerald-950/40'
                          }`}
                        >
                          {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Creator Payout Details Modal (UPI, Bank Details, Consolidated Channels) */}
      {payoutModalUser && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#0e1428] border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-200">
            <button
              onClick={() => setPayoutModalUser(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Clipper Payout & Bank Details
                  </h3>
                  <div className="text-xs text-cyan-300 font-mono">
                    {payoutModalUser.name} ({payoutModalUser.email})
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Unpaid Earnings: {formatCurrency(payoutModalUser.wallet?.balance || 0)}
              </span>
            </div>

            {/* Consolidated Wallet Explanation */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-slate-300">
              <strong>Consolidated Single-User Payout:</strong> This clipper can post clips from multiple accounts. All approved earnings are consolidated into this single user's wallet. Release payout via the details below when campaigns conclude.
            </div>

            {/* UPI Section */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>UPI ID (Primary Fast Transfer)</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Direct Payment
                </span>
              </div>

              {payoutModalUser.clipperProfile?.upiId ? (
                <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                  <span className="text-sm font-mono font-bold text-emerald-300">
                    {payoutModalUser.clipperProfile.upiId}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(payoutModalUser.clipperProfile.upiId, 'upi')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copiedField === 'upi' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy UPI</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">No UPI ID saved by clipper yet.</div>
              )}
            </div>

            {/* Bank Transfer Details */}
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-white/5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>Bank Account Details (NEFT / IMPS)</span>
                </span>
                {payoutModalUser.clipperProfile?.bankAccountNumber && (
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `Bank: ${payoutModalUser.clipperProfile?.bankName}\nAcc: ${payoutModalUser.clipperProfile?.bankAccountNumber}\nIFSC: ${payoutModalUser.clipperProfile?.bankIfsc}\nHolder: ${payoutModalUser.name}`,
                        'bank'
                      )
                    }
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedField === 'bank' ? <Check className="w-3 h-3 text-cyan-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'bank' ? 'Copied Details' : 'Copy All Bank Details'}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Bank Name</div>
                  <div className="font-bold text-white">{payoutModalUser.clipperProfile?.bankName || 'Not Provided'}</div>
                </div>

                <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Account Number</div>
                  <div className="font-bold text-cyan-300 font-mono">
                    {payoutModalUser.clipperProfile?.bankAccountNumber || 'Not Provided'}
                  </div>
                </div>

                <div className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-0.5">
                  <div className="text-[10px] text-slate-400 uppercase font-mono">IFSC Code</div>
                  <div className="font-bold text-purple-300 font-mono">
                    {payoutModalUser.clipperProfile?.bankIfsc || 'Not Provided'}
                  </div>
                </div>
              </div>
            </div>

            {/* Connected Social Accounts */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
              <div className="font-bold text-slate-300 mb-1">Connected Social Handles</div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 font-mono flex items-center gap-1">
                  <YouTubeIcon className="w-3.5 h-3.5" />
                  <span>{payoutModalUser.clipperProfile?.youtubeHandle || '@daxraps30'}</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 font-mono flex items-center gap-1">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>{payoutModalUser.clipperProfile?.instagramHandle || '@satya.viralclips'}</span>
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/dashboard/admin/withdrawals"
                className="text-xs text-cyan-400 hover:text-cyan-300 underline font-mono flex items-center gap-1"
              >
                <span>Edit / Disburse in Payouts Hub &rarr;</span>
              </Link>
              <button
                type="button"
                onClick={() => setPayoutModalUser(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
