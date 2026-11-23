import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'clipmatrix-production.up.railway.app';
  const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  const redirectUri = `${protocol}://${host}/api/auth/instagram/callback`;

  const appId = process.env.META_APP_ID || process.env.INSTAGRAM_CLIENT_ID || '';
  const scopes = 'instagram_basic,instagram_manage_insights,pages_read_engagement';
  const state = Math.random().toString(36).substring(7);

  // Directly redirect to official Meta / Facebook OAuth authorization endpoint
  const metaAuthUrl =
    `https://www.facebook.com/v19.0/dialog/oauth?` +
    `client_id=${encodeURIComponent(appId.trim())}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&state=${state}`;

  return NextResponse.redirect(metaAuthUrl);
}
