import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { role } = await request.json();
    const roleUpper = (role || 'CLIPPER').toUpperCase();

    const emailMap: Record<string, string> = {
      ADMIN: 'admin@clipmatrix.com',
      BRAND: 'brand@clipmatrix.com',
      CLIPPER: 'clipper@clipmatrix.com',
    };

    const targetEmail = emailMap[roleUpper] || 'clipper@clipmatrix.com';

    const user = await prisma.user.findUnique({
      where: { email: targetEmail },
      include: { brandProfile: true, clipperProfile: true, wallet: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'Demo user not found' }, { status: 404 });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'BRAND' | 'CLIPPER' | 'ADMIN',
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      message: `Switched to ${user.role} persona: ${user.name}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        brandProfile: user.brandProfile,
        clipperProfile: user.clipperProfile,
        wallet: user.wallet,
      },
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
    return NextResponse.json({ error: 'Failed to switch role' }, { status: 500 });
  }
}
