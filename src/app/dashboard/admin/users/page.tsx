'use client';

import React, { useState, useEffect } from 'react';
import { Users, Shield, CheckCircle, Ban } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">User Directory & Roles</h1>
          <p className="text-xs sm:text-sm text-purple-200/70">
            Audit user accounts, check verification statuses, and toggle account access.
          </p>
        </div>

        <div className="flex gap-2">
          {['ALL', 'BRAND', 'CLIPPER', 'ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                roleFilter === r
                  ? 'bg-rose-600 text-white'
                  : 'bg-[#140c26] text-purple-300 hover:text-white border border-purple-900/40'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-purple-200">
            <thead className="bg-[#100720] border-b border-purple-900/40 uppercase font-mono text-[10px] text-purple-400">
              <tr>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Details / Profile</th>
                <th className="py-3.5 px-4">Wallet Balance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-purple-950/20 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-[10px] text-purple-400">{u.email}</div>
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
                    ) : u.clipperProfile ? (
                      <span>{u.clipperProfile.instagramHandle || 'No handle'} • {u.clipperProfile.level}</span>
                    ) : (
                      'System Admin'
                    )}
                  </td>
                  <td className="py-4 px-4 font-bold text-white font-mono">
                    ₹{u.wallet?.balance?.toLocaleString('en-IN') || 0}
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
                        className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
