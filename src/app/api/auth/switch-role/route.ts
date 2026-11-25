import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      error: 'Direct role switching is disabled. Please authenticate through your dedicated portal (/auth/login).',
    },
    { status: 403 }
  );
}
