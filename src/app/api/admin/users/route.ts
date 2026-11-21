import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const search = searchParams.get('search');

    const where: any = {};
    if (role && role !== 'ALL') where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        brandProfile: true,
        clipperProfile: true,
        wallet: true,
        _count: {
          select: {
            submissions: true,
            campaignsCreated: true,
            withdrawals: true,
          },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { userId, status, level } = await request.json();

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(status ? { status } : {}),
      },
    });

    if (level) {
      await prisma.clipperProfile.updateMany({
        where: { userId },
        data: { level },
      });
    }

    await prisma.auditLog.create({
      data: {
        adminId: user.id,
        action: 'UPDATE_USER_STATUS',
        entity: 'User',
        entityId: userId,
        details: `Updated user status: ${status || 'no change'}, level: ${level || 'no change'}`,
      },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
