'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadBrandUser = () => {
      fetch('/api/auth/me', { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => {
          if (!data.authenticated || (data.user?.role !== 'BRAND' && data.user?.role !== 'ADMIN')) {
            router.push('/auth/brand');
            return;
          }
          setUser(data.user);
          setLoading(false);
        })
        .catch(() => {
          router.push('/auth/brand');
        });
    };

    loadBrandUser();
    window.addEventListener('clipmatrix-profile-updated', loadBrandUser);
    return () => window.removeEventListener('clipmatrix-profile-updated', loadBrandUser);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070a1a] flex items-center justify-center text-slate-300">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 border-2 border-white/20 border-t-[#00B887] rounded-full animate-spin" />
          <span className="text-sm font-semibold">Loading Brand Command Center...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a1a] flex flex-col md:flex-row text-white">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0c1022] border-b border-white/[0.08] sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-[#160B3E] border border-purple-500/40">
            <img src="/clipmatrix-logo.png" alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <span className="font-extrabold text-sm text-white font-display">
            CLIP<span className="text-[#00D4FF]">MATRIX</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-72 max-w-[85vw] h-full" onClick={(e) => e.stopPropagation()}>
            <DashboardSidebar
              user={user}
              role="BRAND"
              mobileOpen={mobileMenuOpen}
              setMobileOpen={setMobileMenuOpen}
            />
          </div>
        </div>
      )}

      {/* Desktop Sticky Left Sidebar */}
      <div className="hidden md:block shrink-0">
        <DashboardSidebar user={user} role="BRAND" />
      </div>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-3.5 sm:p-6 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full min-h-screen">
        {children}
      </main>
    </div>
  );
}
