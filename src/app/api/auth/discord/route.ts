import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { discordUsername } = await request.json();

    if (!discordUsername || typeof discordUsername !== 'string') {
      return NextResponse.json({ error: 'Discord username is required' }, { status: 400 });
    }

    // Clean username: remove leading @, trim whitespace
    const cleanUsername = discordUsername.trim().replace(/^@/, '');
    if (cleanUsername.length < 2) {
      return NextResponse.json({ error: 'Please enter a valid Discord username' }, { status: 400 });
    }

    // Format normalized email for storage
    const sanitizedEmailTag = cleanUsername.toLowerCase().replace(/[^a-z0-9._-]/g, '_');
    const discordEmail = `${sanitizedEmailTag}@discord.clipmatrix.in`;

    // Check if user already exists
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: discordEmail },
          { name: cleanUsername },
        ],
      },
      include: { clipperProfile: true, wallet: true },
    });

    if (!user) {
      // Create new Clipper account with Discord username only
      const defaultHash = await hashPassword(`discord_${cleanUsername}_clipmatrix_2026`);
      user = await prisma.user.create({
        data: {
          email: discordEmail,
          name: cleanUsername,
          passwordHash: defaultHash,
          role: 'CLIPPER',
          status: 'ACTIVE',
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanUsername)}&backgroundColor=5865F2`,
          wallet: {
            create: {
              balance: 0,
              pendingBalance: 0,
              escrowBalance: 0,
              lifetimeEarned: 0,
              lifetimeSpent: 0,
            },
          },
          clipperProfile: {
            create: {
              instagramHandle: `@${cleanUsername}`,
              youtubeHandle: `@${cleanUsername}`,
              editingSoftware: 'CapCut / Premiere Pro',
              portfolioUrl: `https://discord.com/users/${cleanUsername}`,
              upiId: '',
              city: 'Discord Network',
              isVerified: true,
              level: 'ROOKIE',
            },
          },
        },
        include: { clipperProfile: true, wallet: true },
      });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: 'CLIPPER',
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        clipperProfile: user.clipperProfile,
        wallet: user.wallet,
      },
      redirectUrl: '/dashboard/clipper',
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
    console.error('Discord clipper login error:', error);
    return NextResponse.json({ error: 'Failed to authenticate with Discord' }, { status: 500 });
  }
}
