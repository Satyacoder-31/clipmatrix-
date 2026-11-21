'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ShieldAlert, Building2, Scissors, LogOut, CheckCircle2 } from 'lucide-react';

export default function RoleSwitcherBar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.authenticated) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [pathname]);

  const handleRoleSwitch = async (role: 'ADMIN' | 'BRAND' | 'CLIPPER') => {
    try {
      setSwitching(role);
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        // Redirect to relevant dashboard
        if (role === 'ADMIN') router.push('/dashboard/admin');
        else if (role === 'BRAND') router.push('/dashboard/brand');
        else router.push('/dashboard/clipper');
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSwitching(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    router.push('/');
    router.refresh();
  };

  return (
    <div className="bg-[#120924] border-b border-purple-900/40 px-4 py-2 text-xs text-purple-200">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white tracking-wide uppercase text-[10px] bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/60">
            Interactive Tester Mode
          </span>
          <span className="text-purple-300/80 hidden sm:inline">
            {user ? (
              <>
                Active: <strong className="text-white">{user.name}</strong> ({user.role})
              </>
            ) : (
              'Browse in Public Mode or test any stakeholder dashboard instantly:'
            )}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-purple-400/70 mr-1 hidden md:inline">Switch Persona:</span>

          <button
            onClick={() => handleRoleSwitch('BRAND')}
            disabled={switching !== null}
            className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
              user?.role === 'BRAND'
                ? 'bg-purple-600 text-white shadow-glow-purple border border-purple-400'
                : 'bg-purple-950/60 text-purple-300 hover:bg-purple-900/70 hover:text-white border border-purple-800/40'
            }`}
          >
            <Building2 className="w-3 h-3 text-purple-400" />
            Brand (Aether AI)
            {user?.role === 'BRAND' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
          </button>

          <button
            onClick={() => handleRoleSwitch('CLIPPER')}
            disabled={switching !== null}
            className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
              user?.role === 'CLIPPER'
                ? 'bg-purple-600 text-white shadow-glow-purple border border-purple-400'
                : 'bg-purple-950/60 text-purple-300 hover:bg-purple-900/70 hover:text-white border border-purple-800/40'
            }`}
          >
            <Scissors className="w-3 h-3 text-purple-400" />
            Clipper (Aarav S.)
            {user?.role === 'CLIPPER' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
          </button>

          <button
            onClick={() => handleRoleSwitch('ADMIN')}
            disabled={switching !== null}
            className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
              user?.role === 'ADMIN'
                ? 'bg-rose-700 text-white border border-rose-400'
                : 'bg-purple-950/60 text-purple-300 hover:bg-purple-900/70 hover:text-white border border-purple-800/40'
            }`}
          >
            <ShieldAlert className="w-3 h-3 text-rose-400" />
            Super Admin
            {user?.role === 'ADMIN' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
          </button>

          {user && (
            <button
              onClick={handleLogout}
              className="px-2 py-1 rounded text-[11px] font-medium bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center gap-1 transition-colors border border-white/10"
              title="Logout session"
            >
              <LogOut className="w-3 h-3" />
              Exit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
