import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
      include: {
        campaign: true,
        clipper: {
          include: { clipperProfile: true },
        },
        viewSnapshots: {
          orderBy: { timestamp: 'desc' },
        },
      },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ submission });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch submission' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status, reviewNotes, rejectionReason } = await request.json();

    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
      include: { campaign: true, clipper: true },
    });

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    // Permission check: Brand can only review submissions for their campaign; Admin can review anything
    if (user.role === 'BRAND' && submission.campaign.brandId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updated = await prisma.submission.update({
      where: { id: params.id },
      data: {
        ...(status ? { status } : {}),
        ...(reviewNotes !== undefined ? { reviewNotes } : {}),
        ...(rejectionReason !== undefined ? { rejectionReason } : {}),
        reviewedAt: new Date(),
      },
    });

    // Notify clipper about status update
    let message = `Your submission (${submission.submissionNumber}) status changed to ${status}.`;
    if (status === 'REJECTED' && rejectionReason) {
      message = `Your submission was rejected: "${rejectionReason}". Please review guidelines and submit an update.`;
    } else if (status === 'APPROVED') {
      message = `Congratulations! Your clip was approved by the brand. View tracking is now active.`;
    }

    await prisma.notification.create({
      data: {
        userId: submission.clipperId,
        title: `Submission Update: ${status}`,
        message,
        type: 'SUBMISSION',
        link: '/dashboard/clipper/submissions',
      },
    });

    return NextResponse.json({ success: true, submission: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}
