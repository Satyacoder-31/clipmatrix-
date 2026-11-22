'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Search,
  FileText,
  Bell,
  User,
  DollarSign,
  Share2,
  Zap,
  Award,
  MessageSquare,
  Info,
  BookOpen,
  Moon,
  LogOut,
  X,
  Menu,
  CheckCircle2,
  PlusCircle,
  FolderKanban,
  CheckSquare,
  CreditCard,
  ShieldCheck,
  Video,
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
    router.push('/auth/login');
    router.refresh();
  };

  const toggleDarkMode = () => {
    // Already in dark mode
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark');
    }
  };

  // Navigation Items customized per role matching the exact visual references
  const clipperPersonalItems = [
    { label: 'Dashboard', href: '/dashboard/clipper', icon: Home },
    { label: 'Browse Campaigns', href: '/campaigns', icon: Search },
    { label: 'My Submissions', href: '/dashboard/clipper/submissions', icon: FileText },
    { label: 'Notifications', href: '/dashboard/clipper/notifications', icon: Bell },
    { label: 'Profile & Accounts', href: '/dashboard/clipper/profile', icon: User },
    { label: 'Earnings', href: '/dashboard/clipper/earnings', icon: DollarSign },
    { label: 'Referrals', href: '/dashboard/clipper/referrals', icon: Share2 },
  ];

  const brandPersonalItems = [
    { label: 'Dashboard', href: '/dashboard/brand', icon: Home },
    { label: 'Browse Campaigns', href: '/campaigns', icon: Search },
    { label: 'Create Campaign', href: '/dashboard/brand/campaigns/new', icon: PlusCircle },
    { label: 'My Campaigns', href: '/dashboard/brand/campaigns', icon: FolderKanban },
    { label: 'Review Submissions', href: '/dashboard/brand/submissions', icon: CheckSquare },
    { label: 'Billing & Escrow', href: '/dashboard/brand/billing', icon: CreditCard },
    { label: 'Notifications', href: '/dashboard/clipper/notifications', icon: Bell },
  ];

  const adminPersonalItems = [
    { label: 'Dashboard', href: '/dashboard/admin', icon: Home },
    { label: 'Campaigns Hub', href: '/dashboard/admin/campaigns', icon: FolderKanban },
    { label: 'Verify Views', href: '/dashboard/admin/verification', icon: CheckSquare },
    { label: 'Payout Requests', href: '/dashboard/admin/withdrawals', icon: CreditCard },
    { label: 'Users Directory', href: '/dashboard/admin/users', icon: User },
    { label: 'Notifications', href: '/dashboard/clipper/notifications', icon: Bell },
  ];

  const personalItems =
    role === 'BRAND' ? brandPersonalItems : role === 'ADMIN' ? adminPersonalItems : clipperPersonalItems;

  const allItems = [
    { label: 'ClipMatrix Marketplace', href: '/campaigns', icon: Zap },
    { label: 'Leaderboard', href: '/dashboard/clipper/leaderboard', icon: Award },
    { label: 'ClipMatrix Chat', href: '/dashboard/clipper/chat', icon: MessageSquare },
    { label: 'Guidelines', href: role === 'BRAND' ? '/brand-agreement' : '/clipper-agreement', icon: Info },
    { label: 'ClipMatrix Academy', href: '/blog', icon: BookOpen },
  ];

  // User display name & initial
  const displayName = user?.name || (role === 'CLIPPER' ? 'Satyaaaa' : role === 'BRAND' ? 'Aether AI' : 'Super Admin');
  const initial = displayName.trim().charAt(0).toUpperCase();
  const displayRole = user?.role || role;

  return (
    <aside className="w-72 bg-[#0c1022] border-r border-white/[0.08] flex flex-col justify-between h-screen sticky top-0 shrink-0 z-40 select-none overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
      <div className="p-5 space-y-6">
        {/* Top Header / Brand Logo */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 rounded-xl bg-[#160B3E]/90 border border-purple-500/40 shadow-[0_0_12px_rgba(124,58,237,0.35)] flex items-center justify-center">
              <img
                src="/clipmatrix-logo.png"
                alt="Clip Matrix Logo"
                className="w-7 h-7 object-contain drop-shadow-[0_0_10px_rgba(0,212,255,0.7)]"
              />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white font-display">
              CLIP<span className="text-[#00D4FF]">MATRIX</span>
            </span>
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

        {/* Section 1: PERSONAL */}
        <div className="space-y-1">
          <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-3 py-1 font-mono">
            PERSONAL
          </div>

          <div className="space-y-1">
            {personalItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#00B887] text-white shadow-lg shadow-emerald-500/20 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 2: ALL */}
        <div className="space-y-1 pt-2">
          <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-3 py-1 font-mono">
            ALL
          </div>

          <div className="space-y-1">
            {allItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                    isActive
                      ? 'bg-[#00B887] text-white shadow-lg shadow-emerald-500/20 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Highlight Card: PAID OUT TO CLIPPERS */}
        <div className="rounded-2xl bg-[#00B887]/10 border border-[#00B887]/25 p-4 space-y-1 shadow-inner">
          <div className="text-[11px] font-bold text-slate-400 tracking-wider uppercase font-mono">
            PAID OUT TO CLIPPERS
          </div>
          <div className="text-2xl font-black text-[#00B887] font-display flex items-baseline gap-1.5">
            <span>$1,079,315</span>
            <span className="text-xs font-bold text-slate-400">USD</span>
          </div>
        </div>
      </div>

      {/* Bottom Sticky User & Action Profile */}
      <div className="p-5 border-t border-white/[0.08] bg-[#090d1c]/90 space-y-4">
        {/* User Info Bar */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00B887] text-white font-black flex items-center justify-center text-lg shrink-0 shadow-md">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-sm text-white truncate">{displayName}</div>
            <div className="mt-0.5">
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00B887]/15 text-[#00B887] border border-[#00B887]/30 uppercase tracking-wide font-mono">
                {displayRole}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Dark Mode & Logout */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-full py-2.5 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Moon className="w-4 h-4 text-slate-400" />
            <span>Dark Mode</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2.5 px-4 rounded-xl border border-white/10 hover:border-rose-500/30 bg-white/[0.02] hover:bg-rose-500/10 text-xs font-bold text-[#00B887] hover:text-rose-400 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
