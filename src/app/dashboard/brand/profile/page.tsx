'use client';

import React, { useEffect, useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Globe,
  KeyRound,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  Upload,
  User,
  AlertCircle,
  Trash2,
} from 'lucide-react';

export default function BrandProfilePage() {
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Account & User Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [role, setRole] = useState('BRAND');

  // Brand Profile Fields
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Technology');
  const [companySize, setCompanySize] = useState('11-50');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [isVerified, setIsVerified] = useState(true);

  // Password Change Fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Feedback
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  useEffect(() => {
    fetch('/api/auth/me', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setName(data.user.name || '');
          setEmail(data.user.email || '');
          setPhone(data.user.phone || '');
          setAvatar(data.user.avatar || data.user.brandProfile?.logoUrl || '');
          setRole(data.user.role || 'BRAND');
          if (data.user.brandProfile) {
            setCompanyName(data.user.brandProfile.companyName || data.user.name || '');
            setIndustry(data.user.brandProfile.industry || 'Technology');
            setCompanySize(data.user.brandProfile.companySize || '11-50');
            setWebsite(data.user.brandProfile.website || '');
            setDescription(data.user.brandProfile.description || '');
            setIsVerified(data.user.brandProfile.isVerified ?? true);
          } else {
            setCompanyName(data.user.name || '');
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const showStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => {
      setStatusMsg((prev) => (prev?.text === text ? null : prev));
    }, 6000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 900 * 1024) {
      showStatus('error', 'Please choose an image smaller than 900 KB, or paste an image URL.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          avatar,
          logoUrl: avatar,
          companyName,
          industry,
          companySize,
          website,
          description,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showStatus('error', data.error || 'Failed to update brand profile.');
        return;
      }

      if (data.user) {
        setName(data.user.name || '');
        setEmail(data.user.email || '');
        setPhone(data.user.phone || '');
        setAvatar(data.user.avatar || '');
      }
      window.dispatchEvent(new Event('clipmatrix-profile-updated'));
      showStatus('success', data.message || 'Brand account & profile updated successfully!');
    } catch {
      showStatus('error', 'Network error while saving brand profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (newPassword.length < 6) {
      showStatus('error', 'New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showStatus('error', 'New password and confirmation do not match.');
      return;
    }

    setSavingPassword(true);
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showStatus('error', data.error || 'Could not update password.');
        return;
      }
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showStatus('success', 'Password updated successfully.');
    } catch {
      showStatus('error', 'Network error while updating password.');
    } finally {
      setSavingPassword(false);
    }
  };

  const displayTitle = companyName || name || 'Brand Partner';
  const initialLetter = displayTitle.trim().charAt(0).toUpperCase() || 'B';

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <span className="w-5 h-5 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading Brand Account & Profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-white/[0.08]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
          <Building2 className="w-3 h-3" />
          <span>BRAND IDENTITY & ACCOUNT SETTINGS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Brand Account & Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          View and alter your brand details, contact profile, logo/avatar, and login credentials.
        </p>
      </div>

      {/* Feedback Banner */}
      {statusMsg && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center justify-between shadow-lg ${
            statusMsg.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/15 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMsg(null)}
            className="text-slate-300 hover:text-white font-bold ml-3 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Profile Overview Banner Card */}
      <div className="rounded-3xl bg-gradient-to-b from-[#11162a]/95 via-[#0b1020]/95 to-[#060810] border border-purple-500/30 p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            {avatar ? (
              <img
                src={avatar}
                alt={displayTitle}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-500/25 shrink-0">
                {initialLetter}
              </div>
            )}

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white font-display truncate">
                  {displayTitle}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {role}
                </span>
                {isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" />
                    VERIFIED
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 font-mono truncate">{email}</div>
              {website && (
                <div className="text-xs text-cyan-400 truncate flex items-center gap-1.5">
                  <Globe className="w-3 h-3 shrink-0" />
                  <span>{website}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label className="px-3.5 py-2 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-colors flex items-center gap-2 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {avatar && (
              <button
                type="button"
                onClick={() => setAvatar('')}
                className="p-2 rounded-xl text-xs text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors cursor-pointer"
                title="Remove Logo / Avatar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Edit Brand & Account Profile Form */}
        <form
          onSubmit={handleSaveProfile}
          className="lg:col-span-2 rounded-3xl bg-[#0d1224]/90 border border-white/[0.08] p-6 sm:p-7 space-y-5 shadow-xl"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
            <User className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-display">
              Account & Brand Profile Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Account Holder Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full or team name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Brand / Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="e.g. Aether AI Labs"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>Login Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={role === 'ADMIN'}
                placeholder="brand@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Contact Phone</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 000 0000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Technology, Media, Creator, SaaS..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Team Size</label>
              <select
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              >
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="25-50">25-50</option>
                <option value="51-200">51-200</option>
                <option value="200+">200+</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Website URL</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourbrand.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Logo / Avatar Image URL</label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://... or upload logo above"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Brand Bio / Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview of your brand or creator channel..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={savingProfile}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-purple-400 hover:opacity-95 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingProfile ? 'Saving Changes...' : 'Save Brand Profile'}</span>
            </button>
          </div>
        </form>

        {/* Account Security / Password Card */}
        <form
          onSubmit={handleUpdatePassword}
          className="rounded-3xl bg-[#0d1224]/90 border border-white/[0.08] p-6 space-y-4 shadow-xl h-fit"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
            <KeyRound className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-bold text-white font-display">Account Password</h3>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Update the password you use to sign in to the Brand & Creator portal.
          </p>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Repeat new password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-purple-600/80 hover:bg-purple-600 border border-purple-400/30 disabled:opacity-50 transition-all cursor-pointer"
          >
            {savingPassword ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
