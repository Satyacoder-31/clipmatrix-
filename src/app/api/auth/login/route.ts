import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, demoRole } = await request.json();

    let user;

    // Handle instant demo login shortcuts
    if (demoRole) {
      const emailMap: Record<string, string> = {
        ADMIN: 'admin@clipmatrix.com',
        BRAND: 'brand@clipmatrix.com',
        CLIPPER: 'clipper@clipmatrix.com',
      };
      const targetEmail = emailMap[demoRole.toUpperCase()];
      if (targetEmail) {
        user = await prisma.user.findUnique({
          where: { email: targetEmail },
          include: { brandProfile: true, clipperProfile: true, wallet: true },
        });
      }
    } else {
      if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
      }

      user = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
        include: { brandProfile: true, clipperProfile: true, wallet: true },
      });

      if (!user) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }

      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.status === 'SUSPENDED') {
      return NextResponse.json({ error: 'Account has been suspended. Please contact support.' }, { status: 403 });
    }

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
        status: user.status,
        avatar: user.avatar,
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
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
