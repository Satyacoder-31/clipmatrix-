import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'clipmatrix_super_secure_jwt_secret_key_2026_xyz';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'BRAND' | 'CLIPPER' | 'ADMIN';
  name: string;
}

export const DEMO_USERS = {
  CLIPPER: {
    id: 'user-clipper-demo',
    email: 'clipper@clipmatrix.com',
    name: 'Aarav Sharma (Elite Clipper)',
    role: 'CLIPPER' as const,
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phone: '+91 98765 43210',
    brandProfile: null,
    clipperProfile: {
      id: 'profile-clipper-demo',
      userId: 'user-clipper-demo',
      instagramHandle: '@aarav.edits',
      youtubeHandle: '@aaravclips',
      tiktokHandle: '@aaravcreates',
      portfolioUrl: 'https://youtube.com',
      editingSoftware: 'CapCut, Premiere Pro, After Effects',
      experienceYears: '3 years',
      preferredLangs: 'English, Hindi',
      upiId: 'aarav@okaxis',
      bankName: 'HDFC Bank',
      bankAccountNumber: 'XXXXXX4829',
      bankIfsc: 'HDFC0001234',
      city: 'Mumbai',
      country: 'India',
      isVerified: true,
      level: 'ELITE',
      rating: 4.95,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    wallet: {
      id: 'wallet-clipper-demo',
      userId: 'user-clipper-demo',
      balance: 14200,
      pendingBalance: 3600,
      escrowBalance: 0,
      lifetimeEarned: 48900,
      lifetimeSpent: 0,
      updatedAt: new Date(),
    },
  },
  BRAND: {
    id: 'user-brand-demo',
    email: 'brand@clipmatrix.com',
    name: 'Aether AI Labs',
    role: 'BRAND' as const,
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
    phone: null,
    brandProfile: {
      id: 'profile-brand-demo',
      userId: 'user-brand-demo',
      companyName: 'Aether AI Labs',
      industry: 'Artificial Intelligence & SaaS',
      companySize: '25-50',
      website: 'https://aetherai.io',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
      isVerified: true,
      description: 'Next-generation multimodal generative intelligence tools.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    clipperProfile: null,
    wallet: {
      id: 'wallet-brand-demo',
      userId: 'user-brand-demo',
      balance: 45000,
      pendingBalance: 0,
      escrowBalance: 85000,
      lifetimeEarned: 0,
      lifetimeSpent: 185000,
      updatedAt: new Date(),
    },
  },
  ADMIN: {
    id: 'user-admin-demo',
    email: 'admin@clipmatrix.com',
    name: 'ClipMatrix Super Admin',
    role: 'ADMIN' as const,
    status: 'ACTIVE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phone: null,
    brandProfile: null,
    clipperProfile: null,
    wallet: {
      id: 'wallet-admin-demo',
      userId: 'user-admin-demo',
      balance: 950000,
      pendingBalance: 0,
      escrowBalance: 250000,
      lifetimeEarned: 1250000,
      lifetimeSpent: 0,
      updatedAt: new Date(),
    },
  },
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('clipmatrix_session')?.value;
    if (!token) return null;

    const decoded = verifyToken(token);
    if (!decoded) return null;

    // Fast-path for demo identities
    if (decoded.userId === 'user-clipper-demo' || decoded.email === 'clipper@clipmatrix.com') {
      return DEMO_USERS.CLIPPER;
    }
    if (decoded.userId === 'user-brand-demo' || decoded.email === 'brand@clipmatrix.com') {
      return DEMO_USERS.BRAND;
    }
    if (decoded.userId === 'user-admin-demo' || decoded.email === 'admin@clipmatrix.com') {
      return DEMO_USERS.ADMIN;
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          brandProfile: true,
          clipperProfile: true,
          wallet: true,
        },
      });

      if (user) return user;
    } catch {
      // Prisma error fallback (e.g. SQLite DB path issue on Vercel)
    }

    // Role-based fallback
    if (decoded.role === 'CLIPPER') return DEMO_USERS.CLIPPER;
    if (decoded.role === 'BRAND') return DEMO_USERS.BRAND;
    if (decoded.role === 'ADMIN') return DEMO_USERS.ADMIN;

    return null;
  } catch (e) {
    return null;
  }
}
