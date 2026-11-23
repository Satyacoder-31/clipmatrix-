import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, minimumFractionDigits: number = 2): string {
  const safeAmount = isNaN(amount) ? 0 : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Number.isInteger(safeAmount) && minimumFractionDigits === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toLocaleString('en-US');
}

export function getPlatformBadge(platform: string) {
  const p = platform.toUpperCase();
  switch (p) {
    case 'INSTAGRAM':
      return {
        name: 'Instagram Reels',
        color: 'from-pink-500 via-rose-500 to-amber-500',
        textColor: 'text-pink-400',
        bg: 'bg-pink-500/10 border-pink-500/30',
      };
    case 'YOUTUBE':
      return {
        name: 'YouTube Shorts',
        color: 'from-red-600 to-red-500',
        textColor: 'text-red-400',
        bg: 'bg-red-500/10 border-red-500/30',
      };
    case 'TIKTOK':
      return {
        name: 'TikTok',
        color: 'from-cyan-400 to-pink-500',
        textColor: 'text-cyan-400',
        bg: 'bg-cyan-500/10 border-cyan-500/30',
      };
    default:
      return {
        name: platform,
        color: 'from-purple-500 to-indigo-500',
        textColor: 'text-purple-400',
        bg: 'bg-purple-500/10 border-purple-500/30',
      };
  }
}

export function getStatusBadge(status: string) {
  switch (status.toUpperCase()) {
    case 'ACTIVE':
    case 'APPROVED':
    case 'PAID':
    case 'PROCESSED':
    case 'VIEWS_VERIFIED':
      return {
        label: status.replace(/_/g, ' '),
        classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      };
    case 'PENDING':
    case 'PENDING_REVIEW':
    case 'UNDER_REVIEW':
    case 'PENDING_APPROVAL':
      return {
        label: status.replace(/_/g, ' '),
        classes: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      };
    case 'REJECTED':
    case 'FAILED':
    case 'CANCELLED':
    case 'SUSPENDED':
      return {
        label: status.replace(/_/g, ' '),
        classes: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      };
    case 'PAUSED':
    case 'DRAFT':
    default:
      return {
        label: status.replace(/_/g, ' '),
        classes: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
      };
  }
}
