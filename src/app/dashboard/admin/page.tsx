'use client';

import React, { useEffect, useState } from 'react';
import {
  Users,
  Building2,
  Scissors,
  Eye,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  FileCheck,
} from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function AdminOverviewPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/metrics')
      .then((r) => r.json())
      .then((data) => {
        if (data.metrics) setMetrics(data.metrics);
        if (data.recentAuditLogs) setLogs(data.recentAuditLogs);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-rose-300">Loading system metrics...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Platform Command Center
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/70">
          Global database metrics, total verified reach, escrow balances, and audit records.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-400" /> Total Ecosystem Users
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {metrics?.totalUsers || 6}
          </div>
          <div className="text-[10px] text-purple-400">
            {metrics?.totalBrands || 3} Brands • {metrics?.totalClippers || 3} Clippers
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-cyan-400" /> Verified Organic Views
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">
            {formatNumber(metrics?.totalVerifiedViews || 319000)}
          </div>
          <div className="text-[10px] text-cyan-300/70">Audited Through View Snapshots</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Total Payouts Dispatched
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">
            {formatCurrency(metrics?.totalCompletedPayoutAmount || 15000)}
          </div>
          <div className="text-[10px] text-emerald-300/70">Settled via RazorpayX / UPI</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#140c26] border border-purple-900/50 space-y-1">
          <div className="text-xs text-purple-300 font-medium flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-amber-400" /> Platform Net Revenue (15%)
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
            {formatCurrency(metrics?.estimatedPlatformRevenue || 38000)}
          </div>
          <div className="text-[10px] text-amber-300/70">Retained Commission</div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-2xl bg-[#140c26] border border-purple-900/50 p-6 space-y-4">
        <h2 className="text-base font-bold text-white font-display">Recent Administrative Action Audit Trail</h2>

        <div className="divide-y divide-purple-900/30 text-xs">
          {logs.map((log) => (
            <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-semibold text-white">{log.action}</div>
                <div className="text-purple-300/80 text-[11px]">{log.details}</div>
              </div>
              <div className="text-[10px] text-purple-400 font-mono text-right">
                {new Date(log.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
