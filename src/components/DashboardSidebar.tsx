'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Compass,
  Film,
  Wallet,
  Bell,
  UserCheck,
  Share2,
  Trophy,
  MessageSquare,
  ShieldCheck,
  BookOpen,
  LogOut,
  ExternalLink,
  X,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  PlusCircle,
  FolderKanban,
  CheckSquare,
  CreditCard,
  Users,
} from 'lucide-react';

interface DashboardSidebarProps {
  user: any;
  role?: 'CLIPPER' | 'BRAND' | 'ADMIN';
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function DashboardSidebar({
  user,
  role = 'CLIPPER',
  mobileOpen,
  setMobileOpen,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    }
    // Return directly to the main landing page
    router.push('/');
    router.refresh();
  };

  // Distinct Clip Matrix Workspace Items
  const clipperWorkspace = [
    { label: 'Command Dashboard', href: '/dashboard/clipper', icon: LayoutDashboard },
    { label: 'Campaign Marketplace', href: '/dashboard/clipper/campaigns', icon: Compass, badge: 'LIVE' },
    { label: 'My Video Clips', href: '/dashboard/clipper/submissions', icon: Film },
    { label: 'Notifications', href: '/dashboard/clipper/notifications', icon: Bell },
    { label: 'Profile & Accounts', href: '/dashboard/clipper/profile', icon: UserCheck },
    { label: 'Earnings & Payouts', href: '/dashboard/clipper/earnings', icon: Wallet },
    { label: '5% Referrals', href: '/dashboard/clipper/referrals', icon: Share2 },
  ];

  const brandWorkspace = [
    { label: 'Brand Overview', href: '/dashboard/brand', icon: LayoutDashboard },
    { label: 'Launch Campaign', href: '/dashboard/brand/campaigns/new', icon: PlusCircle, badge: 'NEW' },
    { label: 'Campaign Manager', href: '/dashboard/brand/campaigns', icon: FolderKanban },
    { label: 'Review Submissions', href: '/dashboard/brand/submissions', icon: CheckSquare },
    { label: 'Billing & Treasury', href: '/dashboard/brand/billing', icon: CreditCard },
    { label: 'Marketplace View', href: '/dashboard/clipper/campaigns', icon: Compass },
    { label: 'Notifications', href: '/dashboard/clipper/notifications', icon: Bell },
  ];

  const adminWorkspace = [
    { label: 'Command Hub', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Review Video Clips', href: '/dashboard/admin/submissions', icon: Film, badge: 'REVIEW' },
    { label: 'Verify Views Engine', href: '/dashboard/admin/verification', icon: CheckSquare, badge: 'LIVE' },
    { label: 'Campaign Controls', href: '/dashboard/admin/campaigns', icon: FolderKanban },
    { label: 'Clipper Payouts & Earnings', href: '/dashboard/admin/withdrawals', icon: CreditCard },
    { label: 'Users Directory', href: '/dashboard/admin/users', icon: Users },
    { label: 'Notifications', href: '/dashboard/clipper/notifications', icon: Bell },
  ];

  const workspaceItems =
    role === 'BRAND' ? brandWorkspace : role === 'ADMIN' ? adminWorkspace : clipperWorkspace;

  const networkItems = [
    { label: 'Viral Leaderboard', href: '/dashboard/clipper/leaderboard', icon: Trophy },
    { label: 'Creator Lounge & Chat', href: '/dashboard/clipper/chat', icon: MessageSquare },
    {
      label: 'Platform Rules & Policy',
      href: role === 'BRAND' ? '/dashboard/brand/rules' : '/dashboard/clipper/rules',
      icon: ShieldCheck,
    },
    {
      label: 'Clipping Academy',
      href: role === 'BRAND' ? '/dashboard/brand/academy' : '/dashboard/clipper/academy',
      icon: BookOpen,
    },
  ];

  const displayName = user?.name || (role === 'CLIPPER' ? 'Aarav Sharma' : role === 'BRAND' ? 'Aether AI Labs' : 'Super Admin');
  const initial = displayName.trim().charAt(0).toUpperCase();
  const displayRole = user?.role || role;
  const balance = user?.wallet?.balance || (role === 'CLIPPER' ? 14200 : role === 'BRAND' ? 45000 : 950000);

  return (
    <aside
      data-lenis-prevent="true"
      className="w-72 bg-[#080b1e]/95 backdrop-blur-2xl border-r border-purple-500/20 flex flex-col h-screen sticky top-0 shrink-0 z-40 select-none shadow-2xl shadow-indigo-950/50"
    >
      {/* 1. Fixed Top Header / Medallion Brand */}
      <div className="p-4 px-5 pb-3.5 border-b border-white/[0.08] shrink-0">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 rounded-xl bg-[#160B3E]/90 border border-purple-500/40 shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src="/clipmatrix-logo.png"
                alt="Clip Matrix Logo"
                className="w-7 h-7 object-contain drop-shadow-[0_0_12px_rgba(0,212,255,0.7)]"
              />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white font-display">
                CLIP<span className="text-[#00D4FF]">MATRIX</span>
              </span>
              <div className="text-[9px] font-mono text-purple-400/80 uppercase tracking-widest">
                CREATOR PLATFORM
              </div>
            </div>
          </Link>

          {setMobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Scrollable Middle Navigation Section */}
      <div
        data-lenis-prevent="true"
        className="flex-1 overflow-y-auto overscroll-contain p-4 px-5 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/30 hover:scrollbar-thumb-purple-500/60"
      >
        {/* Category 1: WORKSPACE */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-bold text-purple-400/90 tracking-widest uppercase px-3 py-1 flex items-center justify-between">
            <span>WORKSPACE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          <div className="space-y-1">
            {workspaceItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-purple-400/70 group-hover:text-cyan-400'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Category 2: NETWORK & COMMUNITY */}
        <div className="space-y-1 pt-1">
          <div className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase px-3 py-1">
            NETWORK & COMMUNITY
          </div>

          <div className="space-y-1">
            {networkItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-purple-400/70 group-hover:text-cyan-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Distinctive Clip Matrix Payout Pulse Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#160b36]/90 via-[#0e0c26]/90 to-[#070a1a] border border-purple-500/30 p-4 space-y-2 relative overflow-hidden shadow-lg group">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-cyan-500/15 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/25 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>DIRECT PAYOUT POOL</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="text-lg font-black text-white font-display tracking-tight">
              $250,000+
            </div>
            <div className="text-[11px] text-purple-200/70 leading-tight">
              Verified payouts issued to top performance clippers.
            </div>
          </div>
        </div>
      </div>

      {/* 3. Docked Bottom User Profile & Navigation Controls */}
      <div className="p-4 border-t border-purple-500/20 bg-[#070a1a]/95 space-y-3 shrink-0">
        {/* User Card */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-md">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-xs text-white truncate">{displayName}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {displayRole}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                ${balance.toLocaleString('en-US')}
              </span>
            </div>
          </div>
        </div>

        {/* Dual Actions: Go to Main Page & Logout */}
        <div className="space-y-1.5">
          <Link
            href="/"
            className="w-full py-2 px-3 rounded-xl border border-purple-500/30 hover:border-cyan-400/50 bg-[#140b2e]/60 hover:bg-[#1a0e3c] text-xs font-semibold text-cyan-300 hover:text-white flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Go to Main Website</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl border border-rose-500/20 hover:border-rose-500/40 bg-rose-950/10 hover:bg-rose-950/30 text-xs font-bold text-rose-300 hover:text-rose-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout to Main Page</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
