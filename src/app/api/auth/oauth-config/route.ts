import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'clipmatrix-production.up.railway.app';
  const protocol = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');

  const youtubeRedirectUri = `${protocol}://${host}/api/auth/youtube/callback`;
  const instagramRedirectUri = `${protocol}://${host}/api/auth/instagram/callback`;

  return NextResponse.json({
    google: {
      isConfigured: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID.trim() !== ''),
      clientId: process.env.GOOGLE_CLIENT_ID ? `${process.env.GOOGLE_CLIENT_ID.slice(0, 12)}...` : '',
      redirectUri: youtubeRedirectUri,
    },
    meta: {
      isConfigured: Boolean(process.env.META_APP_ID && process.env.META_APP_ID.trim() !== ''),
      appId: process.env.META_APP_ID ? `${process.env.META_APP_ID.slice(0, 6)}...` : '',
      redirectUri: instagramRedirectUri,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { googleClientId, googleClientSecret, metaAppId, metaAppSecret } = body;

    // Apply to current process.env in memory immediately
    if (googleClientId) process.env.GOOGLE_CLIENT_ID = googleClientId.trim();
    if (googleClientSecret) process.env.GOOGLE_CLIENT_SECRET = googleClientSecret.trim();
    if (metaAppId) process.env.META_APP_ID = metaAppId.trim();
    if (metaAppSecret) process.env.META_APP_SECRET = metaAppSecret.trim();

    // Also persist to local .env file if writable
    try {
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, 'utf8');

        if (googleClientId) {
          if (envContent.includes('GOOGLE_CLIENT_ID=')) {
            envContent = envContent.replace(/GOOGLE_CLIENT_ID=.*/g, `GOOGLE_CLIENT_ID="${googleClientId.trim()}"`);
          } else {
            envContent += `\nGOOGLE_CLIENT_ID="${googleClientId.trim()}"`;
          }
        }

        if (googleClientSecret) {
          if (envContent.includes('GOOGLE_CLIENT_SECRET=')) {
            envContent = envContent.replace(/GOOGLE_CLIENT_SECRET=.*/g, `GOOGLE_CLIENT_SECRET="${googleClientSecret.trim()}"`);
          } else {
            envContent += `\nGOOGLE_CLIENT_SECRET="${googleClientSecret.trim()}"`;
          }
        }

        if (metaAppId) {
          if (envContent.includes('META_APP_ID=')) {
            envContent = envContent.replace(/META_APP_ID=.*/g, `META_APP_ID="${metaAppId.trim()}"`);
          } else {
            envContent += `\nMETA_APP_ID="${metaAppId.trim()}"`;
          }
        }

        if (metaAppSecret) {
          if (envContent.includes('META_APP_SECRET=')) {
            envContent = envContent.replace(/META_APP_SECRET=.*/g, `META_APP_SECRET="${metaAppSecret.trim()}"`);
          } else {
            envContent += `\nMETA_APP_SECRET="${metaAppSecret.trim()}"`;
          }
        }

        fs.writeFileSync(envPath, envContent, 'utf8');
      }
    } catch {
      // file update non-blocking in cloud containers
    }

    return NextResponse.json({
      success: true,
      message: 'OAuth credentials configured successfully! You can now authenticate directly.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save OAuth credentials' }, { status: 500 });
  }
}
