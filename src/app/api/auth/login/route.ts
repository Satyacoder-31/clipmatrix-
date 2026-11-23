import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateToken, DEMO_USERS } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, demoRole } = await request.json();

    let user: any;

    // Handle instant demo login shortcuts
    if (demoRole) {
      const roleUpper = demoRole.toUpperCase() as 'CLIPPER' | 'BRAND' | 'ADMIN';
      const emailMap: Record<string, string> = {
        ADMIN: 'admin@clipmatrix.com',
        BRAND: 'brand@clipmatrix.com',
        CLIPPER: 'clipper@clipmatrix.com',
      };
      const targetEmail = emailMap[roleUpper] || 'clipper@clipmatrix.com';
      let dbUser: any = null;
      try {
        dbUser = await prisma.user.findUnique({
          where: { email: targetEmail },
          include: { brandProfile: true, clipperProfile: true, wallet: true },
        });
      } catch {}

      const activeUser = dbUser || DEMO_USERS[roleUpper] || DEMO_USERS.CLIPPER;

      const token = generateToken({
        userId: activeUser.id,
        email: activeUser.email,
        role: activeUser.role,
        name: activeUser.name,
      });

      const response = NextResponse.json({
        success: true,
        user: {
          id: activeUser.id,
          name: activeUser.name,
          email: activeUser.email,
          role: activeUser.role,
          status: activeUser.status,
          avatar: activeUser.avatar,
          brandProfile: activeUser.brandProfile,
          clipperProfile: activeUser.clipperProfile,
          wallet: activeUser.wallet,
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
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    try {
      user = await prisma.user.findUnique({
        where: { email: email.toLowerCase().trim() },
        include: { brandProfile: true, clipperProfile: true, wallet: true },
      });
    } catch {
      // Prisma error fallback
    }

    // Fallback for hardcoded demo emails if database is offline
    if (!user) {
      const lowerEmail = email.toLowerCase().trim();
      if (lowerEmail === 'clipper@clipmatrix.com' && password === 'password123') {
        user = DEMO_USERS.CLIPPER;
      } else if (lowerEmail === 'brand@clipmatrix.com' && password === 'password123') {
        user = DEMO_USERS.BRAND;
      } else if (lowerEmail === 'admin@clipmatrix.com' && password === 'password123') {
        user = DEMO_USERS.ADMIN;
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (user.passwordHash) {
      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
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
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
