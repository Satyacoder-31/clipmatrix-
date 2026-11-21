'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scissors, Building2, ShieldAlert, ArrowRight, Lock, Mail, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e?: React.FormEvent, demoRole?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = demoRole ? { demoRole } : { email, password };
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // Redirect based on role
      const role = data.user.role;
      if (role === 'ADMIN') router.push('/dashboard/admin');
      else if (role === 'BRAND') router.push('/dashboard/brand');
      else router.push('/dashboard/clipper');
      router.refresh();
    } catch {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl rounded-3xl bg-[#120a22] border border-purple-900/60 overflow-hidden shadow-2xl shadow-purple-950/80 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Creative & Brand Visual */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#1d1038] via-[#150a28] to-[#0c0517] p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-purple-900/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-glow-purple">
                <Scissors className="w-4 h-4 -rotate-45" />
              </div>
              <span className="font-bold text-lg text-white font-display">CLIP MATRIX</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight pt-4">
              Access The Viral Creator Network
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed">
              Log in to manage your performance campaigns, review viral video submissions, and cash out verified CPM
              earnings.
            </p>
          </div>

          <div className="space-y-4 pt-8 relative z-10">
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> ₹1.8 Crore+ Paid to Clippers
              </div>
              <div className="text-[11px] text-purple-300/70">
                Over 84.5M verified organic views generated for 120+ forward-thinking brands.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form & 1-Click Persona Shortcuts */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white font-display">Sign In to Your Account</h3>
            <p className="text-xs text-purple-300/70 mt-1">Select your account or enter your credentials below.</p>
          </div>

          {/* Quick 1-Click Demo Login Buttons */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider">
              Instant 1-Click Demo Portals
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleLogin(undefined, 'BRAND')}
                className="p-3 rounded-xl bg-[#1b1133] hover:bg-purple-900/60 border border-purple-800/50 text-left transition-all group"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Building2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Brand</span>
                </div>
                <div className="text-[10px] text-purple-300/70 mt-0.5 truncate">Aether AI Labs</div>
              </button>

              <button
                type="button"
                onClick={() => handleLogin(undefined, 'CLIPPER')}
                className="p-3 rounded-xl bg-[#1b1133] hover:bg-purple-900/60 border border-purple-800/50 text-left transition-all group"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Scissors className="w-3.5 h-3.5 text-purple-400 -rotate-45" />
                  <span>Clipper</span>
                </div>
                <div className="text-[10px] text-purple-300/70 mt-0.5 truncate">Aarav (Elite)</div>
              </button>

              <button
                type="button"
                onClick={() => handleLogin(undefined, 'ADMIN')}
                className="p-3 rounded-xl bg-[#1b1133] hover:bg-rose-950/60 border border-rose-900/40 text-left transition-all group"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  <span>Admin</span>
                </div>
                <div className="text-[10px] text-purple-300/70 mt-0.5 truncate">Super Command</div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-purple-900/50 w-full" />
            <span className="bg-[#120a22] px-3 text-[11px] font-mono text-purple-400 uppercase">
              Or Sign In With Email
            </span>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            <div>
              <label className="text-xs text-purple-300 font-medium">Email Address</label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-purple-300 font-medium">Password</label>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0e061a] border border-purple-800/40 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-glow-purple flex items-center justify-center gap-2 text-sm"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-purple-300/70 space-y-1">
            <div>Don't have an account yet?</div>
            <div className="flex items-center justify-center gap-3 font-semibold text-purple-400">
              <a href="/auth/register-brand" className="hover:text-white underline">
                Register as Brand
              </a>
              <span>•</span>
              <a href="/auth/register-clipper" className="hover:text-white underline">
                Register as Clipper
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
