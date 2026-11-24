import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, DEMO_USERS } from '@/lib/auth';

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

    // Update base user details if provided (only rename if not Super Admin)
    let updatedName = user.name;
    if ((name || phone) && user.role !== 'ADMIN') {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...(name ? { name } : {}),
          ...(phone ? { phone } : {}),
        },
      });
      if (name) updatedName = updatedUser.name;
    }

    // Update clipper profile if clipper
    let updatedProfile = user.clipperProfile;
    if (user.role === 'CLIPPER' || user.clipperProfile) {
      updatedProfile = await prisma.clipperProfile.upsert({
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

      // Synchronize in-memory demo identity
      if (DEMO_USERS.CLIPPER) {
        DEMO_USERS.CLIPPER.clipperProfile = {
          ...DEMO_USERS.CLIPPER.clipperProfile,
          ...updatedProfile,
        };
        if (name && user.role !== 'ADMIN') {
          DEMO_USERS.CLIPPER.name = updatedName;
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Payment and profile details saved successfully',
      user: {
        id: user.id,
        name: updatedName,
        email: user.email,
        role: user.role,
        clipperProfile: updatedProfile,
      },
    });
  } catch (error: any) {
    console.error('Failed to update profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update profile' },
      { status: 500 }
    );
  }
}
