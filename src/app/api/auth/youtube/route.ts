import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'clipmatrix-production.up.railway.app';
  const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
  const redirectUri = `${protocol}://${host}/api/auth/youtube/callback`;

  const clientId = process.env.GOOGLE_CLIENT_ID;

  // If Google OAuth Client ID is set, redirect directly to Google Accounts consent screen
  if (clientId && clientId.trim() !== '') {
    const scopes = [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/yt-analytics.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ');

    const state = Math.random().toString(36).substring(7);

    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(clientId.trim())}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&access_type=offline` +
      `&prompt=consent` +
      `&include_granted_scopes=true` +
      `&state=${state}`;

    return NextResponse.redirect(googleAuthUrl);
  }

  const baseUrl = `${protocol}://${host}`;

  // Redirect to the authentic Google OAuth consent screen matching the Google Accounts flow
  return NextResponse.redirect(
    new URL(`/auth/google/oauth?redirect_uri=${encodeURIComponent(redirectUri)}`, baseUrl)
  );
}
