import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const isDemo = url.searchParams.get('demo') === 'true';

  // Demo / guest fallback for previewing clipper dashboard without Discord OAuth app credentials
  if (isDemo) {
    const demoUsername = 'DiscordClipper';
    const email = 'clipper@discord.clipmatrix.in';

    let user = await prisma.user.findFirst({
      where: { email },
      include: { clipperProfile: true, wallet: true },
    });

    if (!user) {
      const defaultHash = await hashPassword('discord_demo_clipper_2026');
      user = await prisma.user.create({
        data: {
          email,
          name: demoUsername,
          passwordHash: defaultHash,
          role: 'CLIPPER',
          status: 'ACTIVE',
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=DiscordClipper&backgroundColor=5865F2`,
          wallet: {
            create: {
              balance: 14500,
              pendingBalance: 3200,
              escrowBalance: 0,
              lifetimeEarned: 48500,
              lifetimeSpent: 0,
            },
          },
          clipperProfile: {
            create: {
              instagramHandle: '@discord_clipper',
              youtubeHandle: '@discord_clipper',
              editingSoftware: 'CapCut / Premiere Pro / After Effects',
              portfolioUrl: 'https://discord.com',
              upiId: 'clipper@okhdfcbank',
              city: 'Mumbai',
              isVerified: true,
              level: 'PRO',
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
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'clip-matrix.vercel.app';
    const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    const redirectUri = `${protocol}://${host}/api/auth/discord/callback`;

    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify%20email`;
    return NextResponse.redirect(discordAuthUrl);
  }

  // Direct redirect to Discord's login page when client ID is not configured
  return NextResponse.redirect('https://discord.com/login');
}

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
      // Create new Clipper account with Discord username
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
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Discord clipper login error:', error);
    return NextResponse.json({ error: 'Failed to authenticate with Discord' }, { status: 500 });
  }
}
