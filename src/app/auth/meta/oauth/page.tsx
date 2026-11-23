'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Info, Check, ArrowLeft, ShieldCheck } from 'lucide-react';

function InstagramIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function MetaIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#0080fb">
      <path d="M12 2.163c-5.432 0-9.837 4.405-9.837 9.837 0 4.354 2.822 8.053 6.746 9.352v-6.616H6.516V12h2.393V9.972c0-2.362 1.408-3.666 3.56-3.666 1.03 0 2.108.184 2.108.184v2.318h-1.188c-1.17 0-1.536.726-1.536 1.472V12h2.613l-.418 2.736h-2.195v6.616c3.924-1.299 6.746-4.998 6.746-9.352 0-5.432-4.405-9.837-9.837-9.837z" />
    </svg>
  );
}

interface IgAccountOption {
  name: string;
  handle: string;
  type: string;
  reach: string;
}

function MetaOAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUri = searchParams.get('redirect_uri') || '/api/auth/instagram/callback';

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedAccount, setSelectedAccount] = useState<IgAccountOption>({
    name: 'Satya Kumar',
    handle: '@satya.viralclips',
    type: 'Instagram Professional (Creator)',
    reach: '28.5K Followers • 1.4M Monthly Reach',
  });

  const [useAnother, setUseAnother] = useState(false);
  const [customHandle, setCustomHandle] = useState('');
  const [insightsPermissionTicked, setInsightsPermissionTicked] = useState(true);
  const [profilePermissionTicked, setProfilePermissionTicked] = useState(true);
  const [allowing, setAllowing] = useState(false);

  const predefinedAccounts: IgAccountOption[] = [
    {
      name: 'Satya Kumar',
      handle: '@satya.viralclips',
      type: 'Instagram Professional (Creator)',
      reach: '28.5K Followers • 1.4M Monthly Reach',
    },
    {
      name: 'ClipMatrix Reels',
      handle: '@clipmatrix.reels',
      type: 'Instagram Professional (Business)',
      reach: '110K Followers • 4.8M Monthly Reach',
    },
  ];

  const handleSelectAccount = (acc: IgAccountOption) => {
    setSelectedAccount(acc);
    setUseAnother(false);
    setStep(2);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHandle.trim()) return;
    const clean = customHandle.trim().startsWith('@') ? customHandle.trim() : `@${customHandle.trim()}`;
    setSelectedAccount({
      name: clean.replace(/^@/, ''),
      handle: clean,
      type: 'Instagram Professional Profile',
      reach: 'Verified Creator',
    });
    setStep(2);
  };

  const handleAllow = () => {
    setAllowing(true);
    const callbackTarget = new URL(redirectUri, window.location.origin);
    callbackTarget.searchParams.set('code', 'oauth_meta_' + Math.random().toString(36).substring(7));
    callbackTarget.searchParams.set('handle', selectedAccount.handle);
    callbackTarget.searchParams.set('insightsAccess', insightsPermissionTicked ? 'true' : 'false');

    setTimeout(() => {
      window.location.href = callbackTarget.toString();
    }, 600);
  };

  const handleCancel = () => {
    router.push('/dashboard/clipper/profile?error=access_denied');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col justify-between text-[#262626] font-sans antialiased">
      <div className="w-full max-w-[460px] mx-auto pt-8 px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-[#dbdbdb] p-6 sm:p-9 shadow-sm relative transition-all">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#dbdbdb]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white">
                <InstagramIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-semibold text-[#262626]">Instagram</span>
            </div>
            <div className="text-xs text-[#8e8e8e] font-medium flex items-center gap-1">
              <span>Powered by</span>
              <span className="font-bold text-[#0080fb]">Meta</span>
            </div>
          </div>

          {/* SCREEN 1: Choose Account */}
          {step === 1 && (
            <div className="pt-6 space-y-5">
              <div>
                <h1 className="text-xl font-semibold text-[#262626]">Log in with Instagram</h1>
                <p className="text-xs text-[#8e8e8e] mt-1">
                  Connect your Instagram Professional account to <span className="text-[#0080fb] font-semibold">ClipMatrix</span>
                </p>
              </div>

              <div className="divide-y divide-[#efefef] border-t border-b border-[#efefef]">
                {predefinedAccounts.map((acc) => (
                  <button
                    key={acc.handle}
                    type="button"
                    onClick={() => handleSelectAccount(acc)}
                    className="w-full py-3.5 px-2 flex items-center gap-3 hover:bg-[#fafafa] rounded-lg transition-colors cursor-pointer text-left group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] to-[#bc1888] p-[2px] shrink-0">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#262626]">
                        {acc.handle[1].toUpperCase()}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-[#262626] group-hover:text-[#0080fb]">
                        {acc.handle}
                      </div>
                      <div className="text-xs text-[#8e8e8e]">{acc.reach}</div>
                    </div>
                  </button>
                ))}

                {!useAnother ? (
                  <button
                    type="button"
                    onClick={() => setUseAnother(true)}
                    className="w-full py-3.5 px-2 flex items-center gap-3 hover:bg-[#fafafa] rounded-lg transition-colors cursor-pointer text-left group"
                  >
                    <div className="w-10 h-10 rounded-full border border-[#dbdbdb] text-[#8e8e8e] flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-[#262626] group-hover:text-[#0080fb]">
                      Log into another account
                    </span>
                  </button>
                ) : (
                  <form onSubmit={handleCustomSubmit} className="py-4 space-y-3">
                    <div className="text-xs font-semibold text-[#262626]">Enter Instagram Username:</div>
                    <input
                      type="text"
                      required
                      value={customHandle}
                      onChange={(e) => setCustomHandle(e.target.value)}
                      placeholder="@yourhandle"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#dbdbdb] text-sm focus:outline-none focus:border-[#0080fb] text-[#262626]"
                      autoFocus
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setUseAnother(false)}
                        className="px-3 py-1.5 text-xs text-[#8e8e8e] hover:text-[#262626] cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0095f6] hover:bg-[#1877f2] rounded-lg cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="text-xs text-[#8e8e8e] leading-relaxed">
                By logging in, you permit ClipMatrix to request read-only viewer permissions to verify audience analytics. Review{' '}
                <a href="/privacy" className="text-[#0080fb] hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/terms" className="text-[#0080fb] hover:underline">
                  Terms of Service
                </a>
                .
              </div>
            </div>
          )}

          {/* SCREEN 2: Grant Permissions */}
          {step === 2 && (
            <div className="pt-6 space-y-6">
              <div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs text-[#0080fb] hover:underline mb-2 cursor-pointer font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Switch account</span>
                </button>
                <h1 className="text-xl font-semibold text-[#262626]">
                  <span className="text-[#0080fb]">ClipMatrix</span> is requesting access
                </h1>
                <p className="text-xs text-[#8e8e8e] mt-1">
                  Connecting: <strong className="text-[#262626]">{selectedAccount.handle}</strong>
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="text-xs font-semibold text-[#262626]">This will allow ClipMatrix to:</div>

                {/* Permission 1: Instagram Insights (TICKED) */}
                <div className="p-3.5 rounded-xl border border-[#dbdbdb] bg-[#fafafa] space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-[#0080fb] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      📊
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#262626]">
                          View Instagram Professional Insights & Audience Demographics
                        </span>
                        <Info className="w-4 h-4 text-[#8e8e8e]" />
                      </div>
                      <div className="text-[11px] text-[#8e8e8e]">
                        Read-only viewer permission to verify accounts reached, authentic impressions, and country demographics.
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 pt-2 border-t border-[#efefef] text-xs font-medium text-[#0080fb] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={insightsPermissionTicked}
                      onChange={(e) => setInsightsPermissionTicked(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0080fb] focus:ring-0 border-[#dbdbdb] cursor-pointer"
                    />
                    <span className="flex items-center gap-1 font-semibold text-[#0080fb]">
                      <Check className="w-3.5 h-3.5" />
                      <span>Viewer permission ticked (Required for payout audit)</span>
                    </span>
                  </label>
                </div>

                {/* Permission 2: Profile Performance */}
                <div className="p-3.5 rounded-xl border border-[#dbdbdb] bg-[#fafafa] space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-gradient-to-tr from-[#f09433] to-[#bc1888] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      📱
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#262626]">
                          View basic profile info and public reel performance
                        </span>
                        <Info className="w-4 h-4 text-[#8e8e8e]" />
                      </div>
                      <div className="text-[11px] text-[#8e8e8e]">
                        Read-only access to verify handle ownership and reel engagement counts.
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 pt-2 border-t border-[#efefef] text-xs font-medium text-[#262626] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profilePermissionTicked}
                      onChange={(e) => setProfilePermissionTicked(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0080fb] focus:ring-0 border-[#dbdbdb] cursor-pointer"
                    />
                    <span>Read-only profile & reels</span>
                  </label>
                </div>
              </div>

              {/* Safety guarantee */}
              <div className="p-3 rounded-xl bg-[#f0f8ff] border border-[#d0e8ff] flex items-center gap-2 text-xs text-[#0066cc]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#0080fb]" />
                <span>
                  <strong>100% Read-Only:</strong> ClipMatrix Admin will never be able to post, edit, delete, or send DMs.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#dbdbdb]">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-xs font-semibold text-[#8e8e8e] hover:text-[#262626] px-4 py-2 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleAllow}
                  disabled={allowing}
                  className="bg-[#0095f6] hover:bg-[#1877f2] text-white text-xs font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
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

      <footer className="w-full max-w-[460px] mx-auto py-4 px-6 text-center text-xs text-[#8e8e8e]">
        Meta © 2026 • Instagram from Meta • ClipMatrix Integration
      </footer>
    </div>
  );
}

export default function MetaOAuthPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-gray-500 font-sans">Loading Instagram Login...</div>}>
      <MetaOAuthContent />
    </Suspense>
  );
}
