'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  PlusCircle,
  FolderKanban,
  CheckSquare,
  BarChart3,
  CreditCard,
  Building2,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/auth/login');
        } else {
          setUser(data.user);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const navItems = [
    { label: 'Overview', href: '/dashboard/brand', icon: LayoutDashboard },
    { label: 'Create Campaign', href: '/dashboard/brand/campaigns/new', icon: PlusCircle, highlight: true },
    { label: 'My Campaigns', href: '/dashboard/brand/campaigns', icon: FolderKanban },
    { label: 'Review Submissions', href: '/dashboard/brand/submissions', icon: CheckSquare },
    { label: 'Billing & Escrow', href: '/dashboard/brand/billing', icon: CreditCard },
  ];

  if (loading) {
    return <div className="text-center py-32 text-purple-300">Loading Brand Command Center...</div>;
  }

  return (
    <div className="min-h-screen bg-[#090612] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0e071c] border-r border-purple-900/40 p-4 space-y-6 shrink-0">
        <div className="flex items-center gap-3 px-2 py-3 border-b border-purple-900/30">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono text-purple-400">Brand Suite</div>
            <div className="text-sm font-bold text-white truncate max-w-[140px]">
              {user?.brandProfile?.companyName || user?.name}
            </div>
          </div>
        </div>

        {/* Escrow Balance Snapshot Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1b1035] to-[#120a22] border border-purple-700/40 space-y-2">
          <div className="text-[10px] text-purple-300 uppercase font-mono">Active Escrow Pool</div>
          <div className="text-xl font-extrabold text-white font-display">
            {formatCurrency(user?.wallet?.escrowBalance || 0)}
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-purple-900/40">
            <span className="text-purple-300/80">Available: {formatCurrency(user?.wallet?.balance || 0)}</span>
            <a href="/dashboard/brand/billing" className="text-cyan-400 hover:underline">
              Top Up
            </a>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-glow-purple'
                    : item.highlight
                    ? 'bg-purple-950/60 text-purple-300 hover:bg-purple-900/50 hover:text-white border border-purple-800/40'
                    : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Trust info */}
        <div className="pt-4 border-t border-purple-900/30 text-[11px] text-purple-300/80 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Escrow Protected
          </div>
          <p>Unused campaign balances are refundable anytime.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
}
