'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  ShieldAlert,
  LayoutDashboard,
  CheckCheck,
  Users,
  FolderKanban,
  FileCheck,
  Banknote,
  Sliders,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated || data.user.role !== 'ADMIN') {
          router.push('/auth/login');
        } else {
          setUser(data.user);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const navItems = [
    { label: 'Admin Command', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'View Verification Engine', href: '/dashboard/admin/verification', icon: CheckCheck, highlight: true },
    { label: 'User Directory', href: '/dashboard/admin/users', icon: Users },
    { label: 'Campaign Controls', href: '/dashboard/admin/campaigns', icon: FolderKanban },
    { label: 'Withdrawals & Payouts', href: '/dashboard/admin/withdrawals', icon: Banknote },
  ];

  if (loading) {
    return <div className="text-center py-32 text-rose-300">Loading Super Admin Command Suite...</div>;
  }

  return (
    <div className="min-h-screen bg-[#07030e] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a0414] border-r border-rose-900/30 p-4 space-y-6 shrink-0">
        <div className="flex items-center gap-3 px-2 py-3 border-b border-rose-900/30">
          <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-mono text-rose-400">Super Admin</div>
            <div className="text-sm font-bold text-white truncate max-w-[140px]">{user?.name}</div>
          </div>
        </div>

        {/* Platform Treasury Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#240c1c] to-[#120510] border border-rose-800/40 space-y-2">
          <div className="text-[10px] text-rose-300 uppercase font-mono">Platform Treasury</div>
          <div className="text-xl font-extrabold text-white font-display">
            {formatCurrency(user?.wallet?.balance || 245000)}
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">15% Net Commission Retained</div>
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
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/60'
                    : item.highlight
                    ? 'bg-purple-950/60 text-purple-200 hover:bg-purple-900/50 hover:text-white border border-purple-800/40'
                    : 'text-purple-200/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-rose-900/30 text-[11px] text-purple-300/80 space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Flame className="w-3.5 h-3.5" /> API Sync: 100% Operational
          </div>
          <p>Instagram Graph & YouTube Data API bridge active.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
}
