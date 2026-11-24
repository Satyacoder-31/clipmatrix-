import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken, DEMO_USERS } from '@/lib/auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const isDemo = url.searchParams.get('demo') === 'true';

  // Instant demo Clipper login
  if (isDemo) {
    const demoUser = DEMO_USERS.CLIPPER;
    const token = generateToken({
      userId: demoUser.id,
      email: demoUser.email,
      role: 'CLIPPER',
      name: demoUser.name,
    });

    const response = NextResponse.redirect(new URL('/dashboard/clipper', request.url));
    response.cookies.set('clipmatrix_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });
    return response;
  }

  const clientId = process.env.DISCORD_CLIENT_ID;

  if (clientId && clientId.trim() !== '') {
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'clipmatrix-production.up.railway.app';
    const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    const redirectUri = `${protocol}://${host}/api/auth/discord/callback`;

    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify%20email%20guilds.join`;
    return NextResponse.redirect(discordAuthUrl);
  }

  // If DISCORD_CLIENT_ID is not configured, automatically authenticate as Demo Discord Clipper
  const demoUser = DEMO_USERS.CLIPPER;
  const token = generateToken({
    userId: demoUser.id,
    email: demoUser.email,
    role: 'CLIPPER',
    name: demoUser.name,
  });

  const response = NextResponse.redirect(new URL('/dashboard/clipper', request.url));
  response.cookies.set('clipmatrix_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}

export async function POST(request: Request) {
  try {
    const { discordUsername } = await request.json();

    if (!discordUsername || typeof discordUsername !== 'string') {
      return NextResponse.json({ error: 'Discord username is required' }, { status: 400 });
    }

    const cleanUsername = discordUsername.trim().replace(/^@/, '');
    const email = `${cleanUsername.toLowerCase()}@discord.clipmatrix.in`;

    // Find or create a real CLIPPER user in the database
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { name: cleanUsername },
        ],
      },
      include: { clipperProfile: true, wallet: true },
    });

    if (!user) {
      const defaultHash = await hashPassword(`discord_${cleanUsername}_clipmatrix`);
      user = await prisma.user.create({
        data: {
          email: email,
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
            },
          },
        },
        include: { clipperProfile: true, wallet: true },
      });
    } else {
      // Ensure strictly role: CLIPPER and has wallet & clipperProfile
      if (user.role !== 'CLIPPER') {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { role: 'CLIPPER' },
          include: { clipperProfile: true, wallet: true },
        });
      }
      if (!user.wallet) {
        await prisma.wallet.create({
          data: {
            userId: user.id,
            balance: 0,
            pendingBalance: 0,
            escrowBalance: 0,
            lifetimeEarned: 0,
            lifetimeSpent: 0,
          },
        });
      }
      if (!user.clipperProfile) {
        await prisma.clipperProfile.create({
          data: {
            userId: user.id,
            instagramHandle: `@${cleanUsername}`,
            youtubeHandle: `@${cleanUsername}`,
          },
        });
      }
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
        email: user.email,
        name: user.name,
        role: 'CLIPPER',
        avatar: user.avatar,
      },
      redirectUrl: '/dashboard/clipper',
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
    console.error('Discord clipper login error:', error);
    return NextResponse.json({ error: 'Failed to authenticate with Discord' }, { status: 500 });
  }
}
