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
    id: '144128b2-e84f-4255-a426-6d7a0f0c2c53',
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
      balance: 186,
      pendingBalance: 0,
      escrowBalance: 0,
      lifetimeEarned: 186,
      lifetimeSpent: 0,
      updatedAt: new Date(),
    },
  },
  BRAND: {
    id: '8d8e143b-88cc-4135-a590-3823cb5ec2c1',
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
      balance: 4500,
      pendingBalance: 0,
      escrowBalance: 2500,
      lifetimeEarned: 0,
      lifetimeSpent: 12500,
      updatedAt: new Date(),
    },
  },
  ADMIN: {
    id: 'f734622d-194d-4ac9-a77e-557824eb9f3d',
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
      balance: 25000,
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

    // First attempt: Query live Prisma database by id or email to ensure updated records (e.g. payout methods) are reflected
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            ...(decoded.userId ? [{ id: decoded.userId }] : []),
            ...(decoded.email ? [{ email: decoded.email }] : []),
          ],
        },
        include: {
          brandProfile: true,
          clipperProfile: true,
          wallet: true,
        },
      });

      if (user) {
        return user;
      }
    } catch {
      // Prisma error fallback (e.g. temporary DB connection or serverless issue)
    }

    // Legacy offline fallback ONLY for explicit demo token IDs (never overwrite real Discord/Brand/Admin users)
    if (decoded.userId === 'user-clipper-demo') {
      return DEMO_USERS.CLIPPER;
    }
    if (decoded.userId === 'user-brand-demo') {
      return DEMO_USERS.BRAND;
    }
    if (decoded.userId === 'user-admin-demo') {
      return DEMO_USERS.ADMIN;
    }

    return null;
  } catch (e) {
    return null;
  }
}
