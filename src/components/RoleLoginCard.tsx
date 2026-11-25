'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  Scissors,
  ArrowRight,
  ArrowLeft,
  Lock,
  Mail,
  Sparkles,
  LogOut,
  Eye,
  EyeOff,
} from 'lucide-react';

interface RoleLoginCardProps {
  portal: 'BRAND' | 'ADMIN';
}

const PORTAL_CONFIG = {
  BRAND: {
    badge: 'BRAND & CREATOR PORTAL',
    title: 'Brand / Creator Login',
    subtitle: 'Track real-time campaign views, completion progress, and verified clipper accounts.',
    placeholderEmail: 'brand@company.com',
    accentBorder: 'border-purple-500/35',
    accentGlow: 'bg-purple-600/15',
    badgeClass: 'bg-purple-500/15 border-purple-500/35 text-purple-300',
    iconBg: 'bg-gradient-to-br from-purple-600 to-indigo-600 shadow-purple-500/30',
    buttonClass:
      'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-purple-500/25',
    focusClass: 'focus:border-purple-400 focus:ring-purple-400/30',
    Icon: Building2,
    features: [
      'Live view tracking across Reels, Shorts & TikTok',
      'Automated campaign completion & reach telemetry',
      'Verified posting clipper account visibility',
    ],
  },
  ADMIN: {
    badge: 'ADMIN COMMAND GATEWAY',
    title: 'Admin Login',
    subtitle: 'Manage active campaigns, audit clip view snapshots, and oversee payouts.',
    placeholderEmail: 'admin@clipmatrix.com',
    accentBorder: 'border-cyan-500/35',
    accentGlow: 'bg-cyan-500/10',
    badgeClass: 'bg-cyan-500/15 border-cyan-500/35 text-cyan-300',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-purple-600 shadow-cyan-500/30',
    buttonClass:
      'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-cyan-500/25',
    focusClass: 'focus:border-cyan-400 focus:ring-cyan-400/30',
    Icon: ShieldCheck,
    features: [
      'Publish & manage official brand campaigns',
      'Real-time Apify & YouTube API view auditing',
      'Consolidated clipper wallet & payout approvals',
    ],
  },
} as const;

export default function RoleLoginCard({ portal }: RoleLoginCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const cfg = PORTAL_CONFIG[portal];
  const PortalIcon = cfg.Icon;

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/');
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          expectedRole: portal,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      const role = data.user?.role;
      if (role === 'ADMIN') router.push('/dashboard/admin');
      else if (role === 'BRAND') router.push('/dashboard/brand');
      else router.push('/dashboard/clipper');
      router.refresh();
    } catch {
      setError('Network error while authenticating. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Ambient Background Glow */}
      <div className={`absolute w-[480px] h-[480px] ${cfg.accentGlow} rounded-full blur-3xl pointer-events-none`} />

      <div className="w-full max-w-md space-y-4 relative z-10">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between px-1 text-xs">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors group font-semibold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-cyan-400" />
            <span>All Login Portals</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-slate-400 hover:text-white transition-colors font-medium py-1 px-2 rounded-lg hover:bg-white/5"
            >
              Home
            </Link>
            <button
              onClick={handleLogout}
              type="button"
              className="inline-flex items-center gap-1 text-rose-400 hover:text-rose-300 transition-colors font-semibold cursor-pointer py-1 px-2.5 rounded-lg hover:bg-rose-500/10"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div
          className={`rounded-3xl bg-[#0c081d]/92 backdrop-blur-2xl border ${cfg.accentBorder} p-7 sm:p-9 space-y-6 shadow-2xl shadow-indigo-950/80`}
        >
          {/* Header Lockup */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/"
                className="p-2 rounded-2xl bg-[#160B3E]/90 border border-purple-500/40 shadow-[0_0_15px_rgba(124,58,237,0.35)] flex items-center justify-center hover:scale-105 transition-transform"
              >
                <img
                  src="/clipmatrix-logo.png"
                  alt="Clip Matrix Logo"
                  className="w-9 h-9 object-contain drop-shadow-[0_0_10px_rgba(0,212,255,0.7)]"
                />
              </Link>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <div
                className={`w-12 h-12 rounded-2xl ${cfg.iconBg} flex items-center justify-center text-white shadow-lg`}
              >
                <PortalIcon className="w-6 h-6" />
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-wider uppercase ${cfg.badgeClass}`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{cfg.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
              {cfg.title}
            </h1>
            <p className="text-xs text-slate-300/80 leading-relaxed max-w-sm mx-auto">{cfg.subtitle}</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs leading-relaxed">
              {error}
            </div>
          )}

          {/* ID & Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-purple-200 block">
                {portal === 'ADMIN' ? 'Admin ID / Email' : 'Brand / Creator Email'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={cfg.placeholderEmail}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-black/45 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all ${cfg.focusClass}`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-purple-200 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-black/45 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 transition-all ${cfg.focusClass}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-2xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer ${cfg.buttonClass}`}
            >
              <span>{loading ? 'Verifying Credentials...' : `Sign In to ${portal === 'ADMIN' ? 'Admin' : 'Brand'} Panel`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Portal Capabilities */}
          <div className="pt-4 border-t border-white/[0.08] space-y-2 text-[11px] text-slate-300/80">
            {cfg.features.map((feat) => (
              <div key={feat} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Switch Portal Links */}
          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2 text-center text-xs text-slate-400">
            {portal === 'BRAND' && (
              <div>
                New Brand or Creator?{' '}
                <Link href="/auth/register-brand" className="text-cyan-400 font-semibold hover:text-white underline">
                  Register Brand Account
                </Link>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 text-[11px] pt-1">
              <Link
                href="/auth/register-clipper"
                className="inline-flex items-center gap-1 text-[#8ea1e1] hover:text-white transition-colors"
              >
                <Scissors className="w-3 h-3 -rotate-45" />
                <span>Clipper (Discord)</span>
              </Link>
              <span className="text-white/20">•</span>
              {portal === 'BRAND' ? (
                <Link href="/auth/admin" className="text-cyan-300 hover:text-white transition-colors">
                  Admin Login
                </Link>
              ) : (
                <Link href="/auth/brand" className="text-purple-300 hover:text-white transition-colors">
                  Brand / Creator Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
