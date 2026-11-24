import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

function getBaseUrl(request: Request): string {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1');
  return isLocal ? `http://${host || 'localhost:3000'}` : 'https://clipmatrix-production.up.railway.app';
}

export async function GET(request: Request) {
  const baseUrl = getBaseUrl(request);
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(`${baseUrl}/auth/register-clipper?error=cancelled`);
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(`${baseUrl}/auth/register-clipper?error=missing_credentials`);
  }

  try {
    const redirectUri = `${baseUrl}/api/auth/discord/callback`;

    // 1. Exchange authorization code for access token with Discord
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      console.error('Discord token exchange failed:', await tokenResponse.text());
      return NextResponse.redirect(`${baseUrl}/auth/register-clipper?error=token_failed`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Fetch Discord user profile
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.redirect(`${baseUrl}/auth/register-clipper?error=user_fetch_failed`);
    }

    const discordUser = await userResponse.json();
    const username = discordUser.global_name || discordUser.username || `Clipper_${discordUser.id.slice(-4)}`;
    const email = discordUser.email || `${discordUser.username.toLowerCase()}@discord.clipmatrix.in`;
    const avatar = discordUser.avatar
      ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
      : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}&backgroundColor=5865F2`;

    // 3. Find or create Clipper in database
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { name: username },
        ],
      },
      include: { clipperProfile: true, wallet: true },
    });

    if (!user) {
      const defaultHash = await hashPassword(`discord_${discordUser.id}_clipmatrix`);
      user = await prisma.user.create({
        data: {
          email: email,
          name: username,
          passwordHash: defaultHash,
          role: 'CLIPPER',
          status: 'ACTIVE',
          avatar: avatar,
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
              instagramHandle: `@${discordUser.username}`,
              youtubeHandle: `@${discordUser.username}`,
            },
          },
        },
        include: { clipperProfile: true, wallet: true },
      });
    } else {
      // Ensure user is strictly CLIPPER role and has wallet & profile
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
            instagramHandle: `@${discordUser.username}`,
            youtubeHandle: `@${discordUser.username}`,
          },
        });
      }
    }

    // 4. Issue session token strictly with CLIPPER role
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: 'CLIPPER',
      name: user.name,
    });

    // 5. Redirect strictly to clipper dashboard on the correct public base URL
    const response = NextResponse.redirect(`${baseUrl}/dashboard/clipper`);
    response.cookies.set('clipmatrix_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err) {
    console.error('Discord callback error:', err);
    return NextResponse.redirect(`${baseUrl}/auth/register-clipper?error=internal_error`);
  }
}
