'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Info, Check, ArrowLeft } from 'lucide-react';

function GoogleIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

function YouTubeStudioIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#FF0000" />
      <path d="M10 15.5l6-3.5-6-3.5v7z" fill="#ffffff" />
    </svg>
  );
}

function AnalyticsBarIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#1a73e8" />
      <path d="M7 16V13M12 16V8M17 16V11" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

interface AccountOption {
  name: string;
  email: string;
  handle: string;
  subscribers: number;
  avatarBg: string;
  avatarChar: string;
}

function GoogleOAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get('redirect_uri') || '/api/auth/youtube/callback';

  // Step 1: Choose Account | Step 2: Grant Permissions (Wants to access your Google Account)
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedAccount, setSelectedAccount] = useState<AccountOption>({
    name: 'Satya Kumar',
    email: 'satya.creators@gmail.com',
    handle: '@daxraps30',
    subscribers: 12400,
    avatarBg: 'bg-[#b71c1c]',
    avatarChar: 'S',
  });

  const [useAnother, setUseAnother] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customHandle, setCustomHandle] = useState('');
  const [viewerPermissionTicked, setViewerPermissionTicked] = useState(true);
  const [channelPermissionTicked, setChannelPermissionTicked] = useState(true);
  const [allowing, setAllowing] = useState(false);

  const predefinedAccounts: AccountOption[] = [
    {
      name: 'Satya Kumar',
      email: 'satya.creators@gmail.com',
      handle: '@daxraps30',
      subscribers: 12400,
      avatarBg: 'bg-[#0d47a1]',
      avatarChar: 'S',
    },
    {
      name: 'Dax Editz Studio',
      email: 'daxeditz.work@gmail.com',
      handle: '@DaxEditz30',
      subscribers: 48200,
      avatarBg: 'bg-[#7b1fa2]',
      avatarChar: 'D',
    },
  ];

  const handleSelectAccount = (acc: AccountOption) => {
    setSelectedAccount(acc);
    setUseAnother(false);
    setStep(2);
  };

  const handleCustomAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;
    const cleanH = customHandle.trim()
      ? customHandle.trim().startsWith('@')
        ? customHandle.trim()
        : `@${customHandle.trim()}`
      : `@${customEmail.split('@')[0]}`;

    setSelectedAccount({
      name: customEmail.split('@')[0],
      email: customEmail.trim(),
      handle: cleanH,
      subscribers: 15800,
      avatarBg: 'bg-[#00796b]',
      avatarChar: customEmail.trim()[0].toUpperCase(),
    });
    setStep(2);
  };

  const handleAllow = () => {
    setAllowing(true);
    const callbackTarget = new URL(redirectUri, window.location.origin);
    callbackTarget.searchParams.set('code', 'oauth_google_' + Math.random().toString(36).substring(7));
    callbackTarget.searchParams.set('email', selectedAccount.email);
    callbackTarget.searchParams.set('handle', selectedAccount.handle);
    callbackTarget.searchParams.set('subscribers', selectedAccount.subscribers.toString());
    callbackTarget.searchParams.set('viewerAccess', viewerPermissionTicked ? 'true' : 'false');

    setTimeout(() => {
      window.location.href = callbackTarget.toString();
    }, 600);
  };

  const handleCancel = () => {
    router.push('/dashboard/clipper/profile?error=access_denied');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col justify-between text-[#202124] font-sans antialiased">
      {/* Top Mobile/Header Bar */}
      <div className="w-full max-w-[480px] mx-auto pt-6 px-4 sm:px-6">
        <div className="bg-white rounded-2xl sm:rounded-[28px] border border-[#dadce0] p-6 sm:p-10 shadow-sm relative transition-all">
          
          {/* Google Header Logo */}
          <div className="flex items-center gap-3 pb-5 border-b border-[#dadce0]">
            <GoogleIcon className="w-6 h-6 shrink-0" />
            <span className="text-base font-medium text-[#3c4043] tracking-tight">Sign in with Google</span>
          </div>

          {/* SCREEN 1: Choose an account */}
          {step === 1 && (
            <div className="pt-6 space-y-5">
              <div>
                <h1 className="text-2xl font-normal text-[#202124] tracking-tight">Choose an account</h1>
                <p className="text-sm text-[#5f6368] mt-1">
                  to continue to <span className="text-[#1a73e8] font-medium">ClipMatrix</span>
                </p>
              </div>

              {/* Accounts list */}
              <div className="divide-y divide-[#dadce0] border-t border-b border-[#dadce0]">
                {predefinedAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleSelectAccount(acc)}
                    className="w-full py-3.5 px-2 flex items-center gap-3 hover:bg-[#f8f9fa] rounded-lg transition-colors cursor-pointer text-left group"
                  >
                    <div
                      className={`w-9 h-9 rounded-full ${acc.avatarBg} text-white font-medium flex items-center justify-center text-sm shrink-0`}
                    >
                      {acc.avatarChar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-[#202124] group-hover:text-[#1a73e8] flex items-center justify-between">
                        <span>{acc.name}</span>
                        <span className="text-xs font-normal text-[#5f6368] font-mono">{acc.handle}</span>
                      </div>
                      <div className="text-xs text-[#5f6368] truncate">{acc.email}</div>
                    </div>
                  </button>
                ))}

                {/* Option to use another account */}
                {!useAnother ? (
                  <button
                    type="button"
                    onClick={() => setUseAnother(true)}
                    className="w-full py-3.5 px-2 flex items-center gap-3 hover:bg-[#f8f9fa] rounded-lg transition-colors cursor-pointer text-left group"
                  >
                    <div className="w-9 h-9 rounded-full border border-[#dadce0] text-[#5f6368] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-[#202124] group-hover:text-[#1a73e8]">
                      Use another account
                    </span>
                  </button>
                ) : (
                  <form onSubmit={handleCustomAccountSubmit} className="py-4 space-y-3">
                    <div className="text-xs font-semibold text-[#3c4043]">Sign in with custom Google Account:</div>
                    <input
                      type="email"
                      required
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="Enter your Gmail address"
                      className="w-full px-3.5 py-2.5 rounded border border-[#dadce0] text-sm focus:outline-none focus:border-[#1a73e8] text-[#202124]"
                      autoFocus
                    />
                    <input
                      type="text"
                      value={customHandle}
                      onChange={(e) => setCustomHandle(e.target.value)}
                      placeholder="YouTube Channel Handle (e.g. @mychannel)"
                      className="w-full px-3.5 py-2.5 rounded border border-[#dadce0] text-sm focus:outline-none focus:border-[#1a73e8] text-[#202124]"
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setUseAnother(false)}
                        className="px-3 py-1.5 text-xs text-[#5f6368] hover:text-[#202124] cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] rounded cursor-pointer transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Consent Terms Disclaimer */}
              <div className="text-xs text-[#5f6368] leading-relaxed pt-2">
                To continue, Google will share your name, email address, and profile picture with{' '}
                <span className="font-medium text-[#202124]">ClipMatrix</span>. Before using this app, you can review
                ClipMatrix&apos;s{' '}
                <a href="/privacy" className="text-[#1a73e8] hover:underline">
                  privacy policy
                </a>{' '}
                and{' '}
                <a href="/terms" className="text-[#1a73e8] hover:underline">
                  terms of service
                </a>
                .
              </div>
            </div>
          )}

          {/* SCREEN 2: ClipMatrix wants to access your Google Account */}
          {step === 2 && (
            <div className="pt-6 space-y-6">
              <div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs text-[#1a73e8] hover:underline mb-3 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Switch account</span>
                </button>
                <h1 className="text-2xl font-normal text-[#202124] tracking-tight leading-snug">
                  <span className="text-[#1a73e8] font-semibold">ClipMatrix</span> wants to access your Google Account
                </h1>
              </div>

              {/* Selected account identity pill */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#dadce0] bg-[#f8f9fa] text-xs text-[#3c4043]">
                <div
                  className={`w-5 h-5 rounded-full ${selectedAccount.avatarBg} text-white font-bold flex items-center justify-center text-[10px]`}
                >
                  {selectedAccount.avatarChar}
                </div>
                <span className="font-medium">{selectedAccount.email}</span>
              </div>

              {/* Permissions list header */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-[#202124]">This will allow ClipMatrix to:</div>

                {/* Permission Item 1: YouTube Studio Viewer Access (TICKED) */}
                <div className="p-3.5 rounded-xl border border-[#dadce0] bg-[#ffffff] space-y-2">
                  <div className="flex items-start gap-3">
                    <AnalyticsBarIcon className="w-6 h-6 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-[#202124]">
                          View YouTube Studio Analytics and video performance
                        </span>
                        <Info className="w-4 h-4 text-[#5f6368] shrink-0" />
                      </div>
                      <div className="text-xs text-[#5f6368]">
                        Includes read-only viewer access to audience demographics, country distribution (Tier-1 %), and average watch duration.
                      </div>
                    </div>
                  </div>

                  {/* Viewer Permission Ticked Checkbox */}
                  <label className="flex items-center gap-2 pt-2 border-t border-[#f1f3f4] text-xs font-medium text-[#1a73e8] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={viewerPermissionTicked}
                      onChange={(e) => setViewerPermissionTicked(e.target.checked)}
                      className="w-4 h-4 rounded text-[#1a73e8] focus:ring-0 border-[#dadce0] cursor-pointer"
                    />
                    <span className="text-[#1a73e8] font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-[#1a73e8]" />
                      <span>Viewer permission ticked (Required to verify clip payouts & demography)</span>
                    </span>
                  </label>
                </div>

                {/* Permission Item 2: YouTube Channel & Video Metrics */}
                <div className="p-3.5 rounded-xl border border-[#dadce0] bg-[#ffffff] space-y-2">
                  <div className="flex items-start gap-3">
                    <YouTubeStudioIcon className="w-6 h-6 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-[#202124]">
                          View your YouTube account, channel details, and subscribers
                        </span>
                        <Info className="w-4 h-4 text-[#5f6368] shrink-0" />
                      </div>
                      <div className="text-xs text-[#5f6368]">
                        Channel: <span className="font-mono font-medium text-[#202124]">{selectedAccount.handle}</span> ({selectedAccount.subscribers.toLocaleString()} subscribers)
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 pt-2 border-t border-[#f1f3f4] text-xs font-medium text-[#1a73e8] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channelPermissionTicked}
                      onChange={(e) => setChannelPermissionTicked(e.target.checked)}
                      className="w-4 h-4 rounded text-[#1a73e8] focus:ring-0 border-[#dadce0] cursor-pointer"
                    />
                    <span className="text-[#3c4043] font-medium">Read-only channel details</span>
                  </label>
                </div>
              </div>

              {/* Trust & Risk Disclosure (matching Google screenshot) */}
              <div className="space-y-1.5 pt-1 text-xs text-[#5f6368]">
                <div className="font-medium text-[#202124] text-sm">Make sure you trust ClipMatrix</div>
                <p className="leading-relaxed">
                  You may be sharing sensitive info with this site or app. Learn about how ClipMatrix will handle your
                  data by reviewing its{' '}
                  <a href="/terms" className="text-[#1a73e8] hover:underline">
                    terms of service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-[#1a73e8] hover:underline">
                    privacy policies
                  </a>
                  . You can always see or remove access in your{' '}
                  <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer" className="text-[#1a73e8] hover:underline">
                    Google Account
                  </a>
                  .
                </p>
                <div>
                  <span className="text-[#1a73e8] hover:underline cursor-pointer">Learn about the risks.</span>
                </div>
              </div>

              {/* Google OAuth Action Buttons (Cancel / Allow) */}
              <div className="flex items-center justify-between pt-4 border-t border-[#dadce0]">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-sm font-medium text-[#1a73e8] hover:bg-[#f4f8fe] px-4 py-2 rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleAllow}
                  disabled={allowing}
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-sm font-medium px-6 py-2.5 rounded shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {allowing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <span>Allow</span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Google Standard Footer (Language & Legal Links) */}
      <footer className="w-full max-w-[480px] mx-auto py-4 px-6 flex items-center justify-between text-xs text-[#5f6368]">
        <div className="hover:text-[#202124] cursor-pointer">English (United States)</div>
        <div className="flex items-center gap-4">
          <a href="/help" className="hover:text-[#202124]">
            Help
          </a>
          <a href="/privacy" className="hover:text-[#202124]">
            Privacy
          </a>
          <a href="/terms" className="hover:text-[#202124]">
            Terms
          </a>
        </div>
      </footer>
    </div>
  );
}

export default function GoogleOAuthPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500 font-sans">Loading Google Sign-In...</div>}>
      <GoogleOAuthContent />
    </Suspense>
  );
}
