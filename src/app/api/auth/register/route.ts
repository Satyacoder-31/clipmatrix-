import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      role, // BRAND or CLIPPER
      email,
      password,
      name,
      // Brand fields
      companyName,
      industry,
      website,
      companySize,
      // Clipper fields
      instagramHandle,
      youtubeHandle,
      editingSoftware,
      portfolioUrl,
      upiId,
      city,
    } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: 'Missing required registration fields' }, { status: 400 });
    }

    if (role !== 'BRAND' && role !== 'CLIPPER') {
      return NextResponse.json({ error: 'Invalid registration role' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name,
        passwordHash,
        role,
        status: 'ACTIVE',
        wallet: {
          create: {
            balance: role === 'BRAND' ? 25000 : 0, // Welcome test deposit for brands
            pendingBalance: 0,
            escrowBalance: 0,
            lifetimeEarned: 0,
            lifetimeSpent: 0,
          },
        },
        ...(role === 'BRAND'
          ? {
              brandProfile: {
                create: {
                  companyName: companyName || name,
                  industry: industry || 'Technology',
                  website: website || '',
                  companySize: companySize || '1-10',
                  isVerified: true,
                },
              },
            }
          : {
              clipperProfile: {
                create: {
                  instagramHandle: instagramHandle || '',
                  youtubeHandle: youtubeHandle || '',
                  editingSoftware: editingSoftware || 'CapCut, Premiere Pro',
                  portfolioUrl: portfolioUrl || '',
                  upiId: upiId || '',
                  city: city || 'Mumbai',
                  isVerified: true,
                  level: 'ROOKIE',
                },
              },
            }),
      },
      include: {
        brandProfile: true,
        clipperProfile: true,
        wallet: true,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'BRAND' | 'CLIPPER' | 'ADMIN',
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        brandProfile: user.brandProfile,
        clipperProfile: user.clipperProfile,
        wallet: user.wallet,
      },
      token,
    });

    response.cookies.set('clipmatrix_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
