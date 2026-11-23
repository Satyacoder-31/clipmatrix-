import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        phone: (user as any).phone || null,
        brandProfile: user.brandProfile,
        clipperProfile: user.clipperProfile,
        wallet: user.wallet,
      },
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false, user: null });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { upiId, bankName, bankAccountNumber, bankIfsc, editingSoftware, phone, name } = body;

    // Update base user details if provided
    if (name || phone) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(name ? { name } : {}),
          ...(phone ? { phone } : {}),
        },
      });
    }

    // Update clipper profile if clipper
    if (user.role === 'CLIPPER' || user.clipperProfile) {
      await prisma.clipperProfile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          upiId: upiId || '',
          bankName: bankName || '',
          bankAccountNumber: bankAccountNumber || '',
          bankIfsc: bankIfsc || '',
          editingSoftware: editingSoftware || 'CapCut, Premiere Pro',
        },
        update: {
          ...(upiId !== undefined ? { upiId } : {}),
          ...(bankName !== undefined ? { bankName } : {}),
          ...(bankAccountNumber !== undefined ? { bankAccountNumber } : {}),
          ...(bankIfsc !== undefined ? { bankIfsc } : {}),
          ...(editingSoftware !== undefined ? { editingSoftware } : {}),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment and profile details saved successfully',
    });
  } catch (error: any) {
    console.error('Failed to update profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update profile' },
      { status: 500 }
    );
  }
}
