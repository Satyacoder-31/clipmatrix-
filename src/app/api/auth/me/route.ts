import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, DEMO_USERS, hashPassword, verifyPassword, generateToken } from '@/lib/auth';
import { getClipperTier } from '@/lib/rewards';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null });
    }

    let approvedViews = 0;
    let tierInfo = null;

    if (user.role === 'CLIPPER') {
      const approvedSubs = await prisma.submission.findMany({
        where: {
          clipperId: user.id,
          status: { in: ['APPROVED', 'VIEWS_VERIFIED'] },
        },
        select: { verifiedViews: true, reportedViews: true },
      });
      approvedViews = approvedSubs.reduce(
        (acc, s) => acc + (s.verifiedViews || s.reportedViews || 0),
        0
      );
      tierInfo = getClipperTier(approvedViews);

      // Sync level in database if changed
      if (user.clipperProfile && user.clipperProfile.level !== tierInfo.code) {
        await prisma.clipperProfile.update({
          where: { id: user.clipperProfile.id },
          data: { level: tierInfo.code },
        }).catch(() => {});
      }
    }

    const response = NextResponse.json({
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
        clipperProfile: user.clipperProfile
          ? {
              ...user.clipperProfile,
              level: tierInfo ? tierInfo.code : user.clipperProfile.level,
              tierLabel: tierInfo ? tierInfo.label : 'Clipper',
              approvedViews,
              tierInfo,
            }
          : null,
        wallet: user.wallet,
      },
    });

    // Sliding 7-day session renewal: keep the user logged in for 7 days from their latest activity
    try {
      const freshToken = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role as any,
        name: user.name,
      });

      response.cookies.set('clipmatrix_session', freshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days from now
      });
    } catch {}

    return response;
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
    const {
      upiId,
      bankName,
      bankAccountNumber,
      bankIfsc,
      editingSoftware,
      phone,
      name,
      email,
      avatar,
      currentPassword,
      newPassword,
      companyName,
      industry,
      companySize,
      website,
      logoUrl,
      description,
    } = body;

    // Validate optional email change
    const normalizedEmail =
      typeof email === 'string' && email.trim() ? email.trim().toLowerCase() : undefined;
    if (normalizedEmail && normalizedEmail !== user.email.toLowerCase()) {
      const existingByEmail = await prisma.user.findUnique({
        where: { email: normalizedEmail },
        select: { id: true },
      });
      if (existingByEmail && existingByEmail.id !== user.id) {
        return NextResponse.json(
          { error: 'Another account already uses this email address.' },
          { status: 409 }
        );
      }
    }

    // Validate optional password update
    let nextPasswordHash: string | undefined;
    if (typeof newPassword === 'string' && newPassword.length > 0) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'New password must be at least 6 characters long.' },
          { status: 400 }
        );
      }
      if ((user as any).passwordHash) {
        if (!currentPassword || typeof currentPassword !== 'string') {
          return NextResponse.json(
            { error: 'Current password is required to set a new password.' },
            { status: 400 }
          );
        }
        const validCurrent = await verifyPassword(currentPassword, (user as any).passwordHash);
        if (!validCurrent) {
          return NextResponse.json(
            { error: 'Current password is incorrect.' },
            { status: 400 }
          );
        }
      }
      nextPasswordHash = await hashPassword(newPassword);
    }

    // Validate avatar size if provided (supports URL or compact base64 data URI)
    const normalizedAvatar =
      avatar === undefined
        ? undefined
        : typeof avatar === 'string' && avatar.trim()
        ? avatar.trim()
        : null;
    if (normalizedAvatar && normalizedAvatar.length > 1_500_000) {
      return NextResponse.json(
        { error: 'Profile image is too large. Please use an image under 1MB or paste an image URL.' },
        { status: 400 }
      );
    }

    // Update base user details (admins keep their fixed Super Admin display name unless changing other fields)
    let updatedUserRecord: any = user;
    const userUpdateData: Record<string, any> = {};
    if (typeof name === 'string' && name.trim() && user.role !== 'ADMIN') {
      userUpdateData.name = name.trim();
    }
    if (normalizedEmail && user.role !== 'ADMIN') {
      userUpdateData.email = normalizedEmail;
    }
    if (phone !== undefined) {
      userUpdateData.phone = typeof phone === 'string' ? phone.trim() || null : null;
    }
    if (normalizedAvatar !== undefined) {
      userUpdateData.avatar = normalizedAvatar;
    }
    if (nextPasswordHash) {
      userUpdateData.passwordHash = nextPasswordHash;
    }

    if (Object.keys(userUpdateData).length > 0) {
      updatedUserRecord = await prisma.user.update({
        where: { id: user.id },
        data: userUpdateData,
      });
    }

    const updatedName = updatedUserRecord.name;
    const updatedEmail = updatedUserRecord.email;
    const updatedAvatar = updatedUserRecord.avatar ?? user.avatar ?? null;
    const updatedPhone = updatedUserRecord.phone ?? (user as any).phone ?? null;

    // Update Brand profile when Brand edits brand details
    let updatedBrandProfile = user.brandProfile;
    const hasBrandFields =
      companyName !== undefined ||
      industry !== undefined ||
      companySize !== undefined ||
      website !== undefined ||
      logoUrl !== undefined ||
      description !== undefined;

    if (user.role === 'BRAND' && hasBrandFields) {
      const resolvedCompanyName =
        (typeof companyName === 'string' && companyName.trim()) ||
        user.brandProfile?.companyName ||
        updatedName ||
        'Brand Partner';

      updatedBrandProfile = await prisma.brandProfile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          companyName: resolvedCompanyName,
          industry: typeof industry === 'string' && industry.trim() ? industry.trim() : 'Technology',
          companySize: typeof companySize === 'string' && companySize.trim() ? companySize.trim() : '11-50',
          website: typeof website === 'string' ? website.trim() || null : null,
          logoUrl: typeof logoUrl === 'string' ? logoUrl.trim() || updatedAvatar : updatedAvatar,
          description: typeof description === 'string' ? description.trim() || null : null,
        },
        update: {
          ...(typeof companyName === 'string' && companyName.trim()
            ? { companyName: companyName.trim() }
            : {}),
          ...(typeof industry === 'string' && industry.trim() ? { industry: industry.trim() } : {}),
          ...(typeof companySize === 'string' && companySize.trim()
            ? { companySize: companySize.trim() }
            : {}),
          ...(website !== undefined ? { website: typeof website === 'string' ? website.trim() || null : null } : {}),
          ...(logoUrl !== undefined ? { logoUrl: typeof logoUrl === 'string' ? logoUrl.trim() || null : null } : {}),
          ...(description !== undefined
            ? { description: typeof description === 'string' ? description.trim() || null : null }
            : {}),
        },
      });
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
      if (DEMO_USERS.CLIPPER && user.email === DEMO_USERS.CLIPPER.email) {
        DEMO_USERS.CLIPPER.clipperProfile = {
          ...DEMO_USERS.CLIPPER.clipperProfile,
          ...updatedProfile,
        };
        if (name && user.role !== 'ADMIN') {
          DEMO_USERS.CLIPPER.name = updatedName;
        }
      }
    }

    const response = NextResponse.json({
      success: true,
      message: nextPasswordHash
        ? 'Account security and profile details updated successfully'
        : 'Account and profile details saved successfully',
      user: {
        id: user.id,
        name: updatedName,
        email: updatedEmail,
        role: user.role,
        status: user.status,
        avatar: updatedAvatar,
        phone: updatedPhone,
        brandProfile: updatedBrandProfile,
        clipperProfile: updatedProfile,
        wallet: user.wallet,
      },
    });

    // Refresh JWT cookie when display name or login email changed
    if (updatedEmail !== user.email || updatedName !== user.name) {
      const freshToken = generateToken({
        userId: user.id,
        email: updatedEmail,
        role: user.role as 'BRAND' | 'CLIPPER' | 'ADMIN',
        name: updatedName,
      });
      response.cookies.set('clipmatrix_session', freshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    return response;
  } catch (error: any) {
    console.error('Failed to update profile:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update profile' },
      { status: 500 }
    );
  }
}
