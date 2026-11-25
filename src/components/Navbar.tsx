'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Menu,
  X,
  ArrowUpRight,
  LayoutDashboard,
  ChevronDown,
  Flame,
  Layers,
  BarChart3,
  Star,
  Sparkles,
  LogIn,
  Building2,
  ShieldCheck,
  Scissors,
  LogOut,
} from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
  desc?: string;
  icon?: any;
}

interface NavItem {
  label: string;
  href: string;
  id: string;
  dropdown?: DropdownItem[];
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [user, setUser] = useState<any>(null);

  const isDashboard = pathname?.startsWith('/dashboard');

  useEffect(() => {
    if (isDashboard) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const sectionIds = [
      'hero',
      'clippers',
      'brands',
      'campaigns',
      'how-it-works',
      'case-studies',
      'dashboard-demo',
      'pricing',
      'about',
      'reviews',
      'contact',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isDashboard]);

  useEffect(() => {
    if (isDashboard) return;
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) setUser(data.user);
        else setUser(null);
      })
      .catch(() => setUser(null));
  }, [pathname, isDashboard]);

  // Hide public navbar inside dashboard pages
  if (isDashboard) {
    return null;
  }

  const navLinks: NavItem[] = [
    { label: 'Clippers', href: '#clippers', id: 'clippers' },
    { label: 'For Brands', href: '#brands', id: 'brands' },
    {
      label: 'Campaigns',
      href: '#campaigns',
      id: 'campaigns',
      dropdown: [
        { label: 'Live Brand Campaigns', href: '#campaigns', desc: 'Browse active clipping pools', icon: Flame },
        { label: 'How It Works', href: '#how-it-works', desc: 'Decentralized clipping workflow', icon: Layers },
        { label: 'Clipper Hub & Earnings', href: '#clippers', desc: 'Creator payout calculator', icon: Sparkles },
      ],
    },
    {
      label: 'Case Studies',
      href: '#case-studies',
      id: 'case-studies',
      dropdown: [
        { label: 'Client Proof & Metrics', href: '#case-studies', desc: 'Verified viral campaign results', icon: BarChart3 },
        { label: 'Interactive Dashboard Demo', href: '#dashboard-demo', desc: 'Live Brand & Clipper preview', icon: LayoutDashboard },
      ],
    },
    {
      label: 'Pricing',
      href: '#pricing',
      id: 'pricing',
      dropdown: [
        { label: 'ROI & CPM Simulator', href: '#pricing', desc: 'Calculate views & return on ad spend', icon: BarChart3 },
        { label: 'Client Reviews (890+)', href: '#reviews', desc: 'Founder & editor testimonials', icon: Star },
        { label: 'About Clip Matrix', href: '#about', desc: 'Our decentralized mission & ethos', icon: Sparkles },
      ],
    },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const loginPortals = [
    {
      label: 'Clipper Login',
      desc: 'Continue with Discord OAuth',
      href: '/auth/register-clipper',
      badge: 'DISCORD',
      icon: Scissors,
      iconClass: 'bg-[#5865F2]/20 text-[#8ea1e1] border-[#5865F2]/40',
      badgeClass: 'bg-[#5865F2]/25 text-[#9aa8ff]',
    },
    {
      label: 'Brand / Creator Login',
      desc: 'Track campaign views & handles',
      href: '/auth/brand',
      badge: 'ID & PASS',
      icon: Building2,
      iconClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      badgeClass: 'bg-purple-500/20 text-purple-300',
    },
    {
      label: 'Admin Login',
      desc: 'Manage campaigns & payouts',
      href: '/auth/admin',
      badge: 'ADMIN',
      icon: ShieldCheck,
      iconClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      badgeClass: 'bg-cyan-500/20 text-cyan-300',
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (pathname !== '/') {
        window.location.href = `/${href}`;
        return;
      }
      if (typeof window !== 'undefined' && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(href, { offset: -85, duration: 1.4 });
        setMobileMenuOpen(false);
        setOpenDropdown(null);
        window.history.pushState(null, '', href);
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        const navHeight = 85;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setMobileMenuOpen(false);
        setOpenDropdown(null);
        window.history.pushState(null, '', href);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    setUser(null);
    setLoginDropdownOpen(false);
    setMobileMenuOpen(false);
    router.refresh();
  };

  const getDashboardUrl = () => {
    if (!user) return '/auth/login';
    if (user.role === 'ADMIN') return '/dashboard/admin';
    if (user.role === 'BRAND') return '/dashboard/brand';
    return '/dashboard/clipper';
  };

  const isLinkActive = (item: NavItem) => {
    if (item.id === activeSection) return true;
    if (item.label === 'Campaigns' && (activeSection === 'campaigns' || activeSection === 'how-it-works')) return true;
    if (item.label === 'Case Studies' && (activeSection === 'case-studies' || activeSection === 'dashboard-demo')) return true;
    if (item.label === 'Pricing' && (activeSection === 'pricing' || activeSection === 'reviews' || activeSection === 'about')) {
      return true;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-3 pb-2 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full transition-all duration-300 px-3.5 sm:px-5 py-2 flex items-center justify-between gap-4 border relative ${
          isScrolled
            ? 'bg-[#090414]/92 backdrop-blur-2xl border-purple-500/35 shadow-[0_14px_40px_-10px_rgba(88,28,135,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)]'
            : 'bg-[#0e071d]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)]'
        }`}
      >
        {/* Left: Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="p-1.5 rounded-xl bg-[#160B3E]/90 border border-purple-500/40 shadow-[0_0_15px_rgba(124,58,237,0.4)] flex items-center justify-center">
            <img
              src="/clipmatrix-logo.png"
              alt="Clip Matrix Logo"
              className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_10px_rgba(0,212,255,0.7)]"
            />
          </div>
          <span className="font-black text-white text-base sm:text-lg font-display tracking-tight whitespace-nowrap">
            CLIP<span className="text-[#00D4FF] drop-shadow-[0_0_12px_rgba(0,212,255,0.7)]">MATRIX</span>
          </span>
        </a>

        {/* Center: Streamlined Glass Pill Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] px-1.5 py-1">
          {navLinks.map((item) => {
            const hasDropdown = item.dropdown && item.dropdown.length > 0;
            const active = isLinkActive(item);

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all flex items-center gap-1 whitespace-nowrap ${
                    active
                      ? 'text-white bg-purple-600/35 font-semibold shadow-[0_0_14px_rgba(168,85,247,0.35)] border border-purple-400/30'
                      : 'text-purple-100/75 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      className={`w-3 h-3 text-purple-300/60 transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180 text-white' : ''
                      }`}
                    />
                  )}
                </a>

                {hasDropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2.5 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="rounded-2xl bg-[#0e071e]/95 backdrop-blur-2xl border border-purple-500/30 p-2 shadow-2xl shadow-purple-950/80 space-y-1">
                      {item.dropdown?.map((sub) => {
                        const Icon = sub.icon;
                        return (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={(e) => handleNavClick(e, sub.href)}
                            className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-purple-600/20 transition-colors group cursor-pointer"
                          >
                            {Icon && (
                              <div className="w-7 h-7 rounded-lg bg-purple-900/40 border border-purple-700/40 flex items-center justify-center text-purple-300 group-hover:text-cyan-300 shrink-0 mt-0.5">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                            )}
                            <div>
                              <div className="text-xs font-semibold text-white group-hover:text-purple-200">
                                {sub.label}
                              </div>
                              {sub.desc && (
                                <div className="text-[10px] text-purple-300/60 leading-tight mt-0.5">{sub.desc}</div>
                              )}
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Single Unified Login Option (Takes user to the 3 login pages) */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="relative"
            onMouseEnter={() => setLoginDropdownOpen(true)}
            onMouseLeave={() => setLoginDropdownOpen(false)}
          >
            {!user ? (
              <Link
                href="/auth/login"
                className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(124,58,237,0.45)] border border-white/20 flex items-center gap-2 whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-80 hidden sm:inline transition-transform duration-200 ${
                    loginDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </Link>
            ) : (
              <Link
                href={getDashboardUrl()}
                className="px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-[0_0_18px_rgba(124,58,237,0.4)] border border-purple-400/40 flex items-center gap-2 whitespace-nowrap"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User'}
                    className="w-5 h-5 rounded-full object-cover shrink-0 border border-white/40"
                  />
                ) : (
                  <LayoutDashboard className="w-3.5 h-3.5" />
                )}
                <span className="max-w-[110px] truncate">{user.name || 'Dashboard'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-80 transition-transform duration-200 ${
                    loginDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </Link>
            )}

            {/* Portal Dropdown (Hover on Desktop) */}
            {loginDropdownOpen && (
              <div className="hidden sm:block absolute right-0 top-full pt-2.5 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="rounded-2xl bg-[#0e071e]/95 backdrop-blur-2xl border border-purple-500/35 p-2.5 shadow-2xl shadow-purple-950/90 space-y-1.5">
                  {user && (
                    <>
                      <Link
                        href={getDashboardUrl()}
                        onClick={() => setLoginDropdownOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/35 border border-purple-500/30 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <LayoutDashboard className="w-4 h-4 text-cyan-300" />
                          <div>
                            <div className="text-xs font-bold text-white">Open {user.role} Dashboard</div>
                            <div className="text-[10px] text-purple-200/70">Active session</div>
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-cyan-300" />
                      </Link>
                      <div className="border-t border-white/[0.08] my-1" />
                    </>
                  )}

                  <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-purple-300/70">
                    Choose Login Page
                  </div>

                  {loginPortals.map((portal) => {
                    const PIcon = portal.icon;
                    return (
                      <Link
                        key={portal.href}
                        href={portal.href}
                        onClick={() => setLoginDropdownOpen(false)}
                        className="flex items-center justify-between gap-2.5 p-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${portal.iconClass}`}
                          >
                            <PIcon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                              {portal.label}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">{portal.desc}</div>
                          </div>
                        </div>
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${portal.badgeClass}`}
                        >
                          {portal.badge}
                        </span>
                      </Link>
                    );
                  })}

                  {user && (
                    <>
                      <div className="border-t border-white/[0.08] my-1" />
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-200 hover:bg-rose-500/15 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-purple-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto mt-2 rounded-3xl bg-[#0e071c]/98 backdrop-blur-2xl border border-purple-500/30 p-5 space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2.5 rounded-xl transition-colors ${
                  isLinkActive(link)
                    ? 'bg-purple-600/30 text-white font-bold border border-purple-500/40'
                    : 'text-purple-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-purple-900/40 space-y-2.5">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={getDashboardUrl()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2.5 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center gap-1.5 border border-purple-400/40"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Open {user.role} Dashboard</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/15 border border-rose-500/30"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center gap-2 shadow-glow-purple"
              >
                <LogIn className="w-4 h-4" />
                <span>Login — Choose Portal</span>
              </Link>
            )}

            <div className="grid grid-cols-3 gap-2 pt-1">
              {loginPortals.map((portal) => (
                <Link
                  key={portal.href}
                  href={portal.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-center text-[11px] font-semibold text-slate-200"
                >
                  {portal.label.replace(' Login', '')}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
