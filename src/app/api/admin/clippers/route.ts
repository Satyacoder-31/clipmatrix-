import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, DEMO_USERS } from '@/lib/auth';
import { getClipperTier } from '@/lib/rewards';

export async function GET() {
  try {
    let user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      if (user) {
        user = DEMO_USERS.ADMIN;
      } else {
        return NextResponse.json({ error: 'Admin permissions required' }, { status: 403 });
      }
    }

    const clippers = await prisma.user.findMany({
      where: { role: 'CLIPPER' },
      include: {
        clipperProfile: true,
        wallet: true,
        submissions: {
          include: {
            campaign: {
              select: { id: true, title: true, cpmRate: true },
            },
          },
          orderBy: { submittedAt: 'desc' },
        },
        withdrawals: {
          orderBy: { requestedAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    let overallApprovedViews = 0;
    let overallGrossEarnings = 0;
    let overallPaidOut = 0;
    let overallUnpaidDue = 0;

    const formattedClippers = clippers.map((clipper) => {
      const approvedSubs = clipper.submissions.filter(
        (s) => s.status === 'APPROVED' || s.status === 'VIEWS_VERIFIED'
      );
      const pendingSubs = clipper.submissions.filter(
        (s) => s.status === 'PENDING_REVIEW'
      );

      // Total views delivered on approved clips
      const totalApprovedViews = approvedSubs.reduce(
        (acc, s) => acc + (s.verifiedViews || s.reportedViews || 0),
        0
      );

      // Total gross earnings generated at $0.50 CPM standard: (views / 1000) * 0.5
      const grossEarnings = Number(
        approvedSubs
          .reduce((acc, s) => acc + (s.rewardEarned || ((s.verifiedViews || s.reportedViews || 0) / 1000) * 0.5), 0)
          .toFixed(2)
      );

      // Deduct 3% platform fee for net clipper earnings
      const platformFee = Number((grossEarnings * 0.03).toFixed(2));
      const totalEarnings = Number((grossEarnings - platformFee).toFixed(2));

      // Total paid out through processed payouts
      const processedWithdrawals = clipper.withdrawals.filter(
        (w) => w.status === 'PROCESSED'
      );
      const totalPaidOut = Number(
        processedWithdrawals.reduce((acc, w) => acc + w.amount, 0).toFixed(2)
      );

      // Unpaid earnings due to be paid to clipper
      const unpaidEarnings = Math.max(0, Number((totalEarnings - totalPaidOut).toFixed(2)));

      // Pending review views & estimated earnings
      const pendingViews = pendingSubs.reduce(
        (acc, s) => acc + (s.reportedViews || 0),
        0
      );
      const pendingEstimatedEarnings = Number(((pendingViews / 1000) * 0.5).toFixed(2));

      // Multi-account breakdown: group approved videos and views by postAccountHandle
      const accountMap: Record<
        string,
        {
          handle: string;
          platform: string;
          totalApprovedClips: number;
          totalApprovedViews: number;
          accountEarnings: number;
          videos: any[];
        }
      > = {};

      for (const s of approvedSubs) {
        const handle = s.postAccountHandle?.trim() || `${s.platform.toLowerCase()}_account`;
        const platform = s.platform || 'INSTAGRAM';
        const views = s.verifiedViews || s.reportedViews || 0;
        const grossSubReward = Number((s.rewardEarned || (views / 1000) * 0.5).toFixed(2));
        const reward = Number((grossSubReward * 0.97).toFixed(2));

        if (!accountMap[handle]) {
          accountMap[handle] = {
            handle,
            platform,
            totalApprovedClips: 0,
            totalApprovedViews: 0,
            accountEarnings: 0,
            videos: [],
          };
        }

        accountMap[handle].totalApprovedClips += 1;
        accountMap[handle].totalApprovedViews += views;
        accountMap[handle].accountEarnings = Number(
          (accountMap[handle].accountEarnings + reward).toFixed(2)
        );
        accountMap[handle].videos.push({
          id: s.id,
          submissionNumber: s.submissionNumber,
          title: s.title,
          videoUrl: s.videoUrl,
          campaignTitle: s.campaign?.title || 'Active Campaign',
          platform: s.platform,
          verifiedViews: views,
          rewardEarned: reward,
          submittedAt: s.submittedAt,
        });
      }

      const accounts = Object.values(accountMap);

      // Payout details
      const upiId = clipper.clipperProfile?.upiId || null;
      const bankName = clipper.clipperProfile?.bankName || null;
      const bankAccountNumber = clipper.clipperProfile?.bankAccountNumber || null;
      const bankIfsc = clipper.clipperProfile?.bankIfsc || null;
      const hasPayoutMethod = Boolean(upiId || bankAccountNumber);

      overallApprovedViews += totalApprovedViews;
      overallGrossEarnings += totalEarnings;
      overallPaidOut += totalPaidOut;
      overallUnpaidDue += unpaidEarnings;

      return {
        id: clipper.id,
        name: clipper.name,
        email: clipper.email,
        phone: clipper.phone || null,
        avatar: clipper.avatar || null,
        status: clipper.status,
        joinedAt: clipper.createdAt,
        tier: getClipperTier(totalApprovedViews).label,
        level: getClipperTier(totalApprovedViews).code,
        paymentDetails: {
          upiId,
          bankName,
          bankAccountNumber,
          bankIfsc,
          hasPayoutMethod,
          preferredMethod: upiId ? 'UPI' : bankAccountNumber ? 'BANK' : 'NONE',
        },
        metrics: {
          totalSubmissions: clipper.submissions.length,
          approvedClipsCount: approvedSubs.length,
          pendingClipsCount: pendingSubs.length,
          totalApprovedViews,
          totalEarnings,
          totalPaidOut,
          unpaidEarnings,
          pendingViews,
          pendingEstimatedEarnings,
        },
        accounts,
        payoutHistory: clipper.withdrawals,
      };
    });

    return NextResponse.json({
      summary: {
        totalClippersCount: clippers.length,
        totalApprovedViews: overallApprovedViews,
        totalGrossEarnings: Number(overallGrossEarnings.toFixed(2)),
        totalPaidOut: Number(overallPaidOut.toFixed(2)),
        totalUnpaidDue: Number(overallUnpaidDue.toFixed(2)),
      },
      clippers: formattedClippers,
    });
  } catch (error) {
    console.error('Error fetching admin clippers:', error);
    return NextResponse.json({ error: 'Failed to fetch clippers data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    let user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      if (user) {
        user = DEMO_USERS.ADMIN;
      } else {
        return NextResponse.json({ error: 'Admin permissions required' }, { status: 403 });
      }
    }

    const {
      clipperId,
      amount,
      method,
      accountDetails,
      payoutTxnId,
      adminNotes,
    } = await request.json();

    const payoutAmount = parseFloat(amount);
    if (!clipperId || isNaN(payoutAmount) || payoutAmount <= 0) {
      return NextResponse.json({ error: 'Valid clipper ID and positive amount are required' }, { status: 400 });
    }

    const clipper = await prisma.user.findUnique({
      where: { id: clipperId },
      include: { clipperProfile: true, wallet: true },
    });

    if (!clipper) {
      return NextResponse.json({ error: 'Clipper not found' }, { status: 404 });
    }

    const resolvedTxnId =
      payoutTxnId?.trim() ||
      `UTR-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 900 + 100)}`;
    const resolvedAccountDetails =
      accountDetails ||
      clipper.clipperProfile?.upiId ||
      clipper.clipperProfile?.bankAccountNumber ||
      'Direct Payout';

    // Resolve an existing Admin ID from DB for foreign keys
    let adminDbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!adminDbUser) {
      adminDbUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    }
    const resolvedAdminId = adminDbUser?.id || clipperId;

    const payout = await prisma.$transaction(async (tx) => {
      // 1. Create processed withdrawal record
      const withdrawal = await tx.withdrawal.create({
        data: {
          clipperId,
          amount: payoutAmount,
          method: method || 'UPI',
          accountDetails: resolvedAccountDetails,
          status: 'PROCESSED',
          payoutTxnId: resolvedTxnId,
          adminNotes: adminNotes || 'Admin settled payout post campaign completion.',
          requestedAt: new Date(),
          processedAt: new Date(),
        },
      });

      // 2. Adjust wallet balance / ledger
      let wallet = await tx.wallet.findUnique({ where: { userId: clipperId } });
      if (!wallet) {
        wallet = await tx.wallet.create({
          data: { userId: clipperId, balance: 0, lifetimeEarned: 0 },
        });
      }

      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: payoutAmount },
        },
      });

      await tx.transaction.create({
        data: {
          walletId: wallet.id,
          userId: clipperId,
          amount: -payoutAmount,
          type: 'WITHDRAWAL',
          status: 'COMPLETED',
          description: `Admin Payout via ${method || 'UPI'} (${resolvedAccountDetails}). Ref: ${resolvedTxnId}`,
          referenceId: withdrawal.id,
        },
      });

      // 3. Create Notification for the clipper (fail-safe)
      try {
        await tx.notification.create({
          data: {
            userId: clipperId,
            title: '💵 Payout Disbursed to Your Account!',
            message: `Admin has sent a payout of $${payoutAmount.toFixed(2)} to your ${method || 'UPI'} account (${resolvedAccountDetails}). Reference / UTR: ${resolvedTxnId}.`,
            type: 'WITHDRAWAL',
            link: '/dashboard/clipper/earnings',
          },
        });
      } catch (e) {
        console.warn('Failed to send notification:', e);
      }

      // 4. Create Audit Log (fail-safe)
      try {
        await tx.auditLog.create({
          data: {
            adminId: resolvedAdminId,
            action: 'PROCESS_PAYOUT',
            entity: 'Withdrawal',
            entityId: withdrawal.id,
            details: `Admin disbursed $${payoutAmount.toFixed(2)} to clipper ${clipper.name} (${clipper.email}). Ref: ${resolvedTxnId}`,
          },
        });
      } catch (e) {
        console.warn('Failed to create audit log:', e);
      }

      return withdrawal;
    });

    return NextResponse.json({ success: true, payout });
  } catch (error: any) {
    console.error('Error processing admin payout:', error);
    return NextResponse.json({ error: error?.message || 'Failed to process payout' }, { status: 500 });
  }
}

/**
 * Admin Update Clipper Payout Details & Profile
 */
export async function PATCH(request: Request) {
  try {
    let user = await getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      if (user) {
        user = DEMO_USERS.ADMIN;
      } else {
        return NextResponse.json({ error: 'Admin permissions required' }, { status: 403 });
      }
    }

    const body = await request.json();
    const { clipperId, upiId, bankName, bankAccountNumber, bankIfsc, name } = body;

    if (!clipperId) {
      return NextResponse.json({ error: 'Clipper ID is required' }, { status: 400 });
    }

    // 1. Update or create ClipperProfile
    const updatedProfile = await prisma.clipperProfile.upsert({
      where: { userId: clipperId },
      create: {
        userId: clipperId,
        upiId: upiId !== undefined ? (upiId?.trim() || null) : null,
        bankName: bankName !== undefined ? (bankName?.trim() || null) : null,
        bankAccountNumber: bankAccountNumber !== undefined ? (bankAccountNumber?.trim() || null) : null,
        bankIfsc: bankIfsc !== undefined ? (bankIfsc?.trim() || null) : null,
        editingSoftware: 'CapCut, Premiere Pro',
      },
      update: {
        ...(upiId !== undefined ? { upiId: upiId?.trim() || null } : {}),
        ...(bankName !== undefined ? { bankName: bankName?.trim() || null } : {}),
        ...(bankAccountNumber !== undefined ? { bankAccountNumber: bankAccountNumber?.trim() || null } : {}),
        ...(bankIfsc !== undefined ? { bankIfsc: bankIfsc?.trim() || null } : {}),
      },
    });

    // 2. Optionally update Clipper Name
    let updatedUser = null;
    if (name && name.trim()) {
      updatedUser = await prisma.user.update({
        where: { id: clipperId },
        data: { name: name.trim() },
      });
    }

    // 3. Keep in-memory DEMO_USERS in sync if it's the demo clipper
    if (clipperId === DEMO_USERS.CLIPPER.id || clipperId === 'user-clipper-demo') {
      DEMO_USERS.CLIPPER.clipperProfile = {
        ...DEMO_USERS.CLIPPER.clipperProfile,
        ...updatedProfile,
      };
      if (updatedUser?.name) {
        DEMO_USERS.CLIPPER.name = updatedUser.name;
      }
    }

    // 4. Audit Log (fail-safe)
    try {
      await prisma.auditLog.create({
        data: {
          adminId: user.id || DEMO_USERS.ADMIN.id,
          action: 'UPDATE_CLIPPER_PAYOUT_METHOD',
          entity: 'ClipperProfile',
          entityId: updatedProfile.id,
          details: `Admin updated payout method for clipper ${clipperId}. UPI: ${updatedProfile.upiId || 'none'}, Bank: ${updatedProfile.bankName || 'none'}`,
        },
      });
    } catch (e) {
      console.warn('Failed to write audit log:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Clipper payout details updated successfully',
      paymentDetails: {
        upiId: updatedProfile.upiId,
        bankName: updatedProfile.bankName,
        bankAccountNumber: updatedProfile.bankAccountNumber,
        bankIfsc: updatedProfile.bankIfsc,
        hasPayoutMethod: Boolean(updatedProfile.upiId || updatedProfile.bankAccountNumber),
        preferredMethod: updatedProfile.upiId ? 'UPI' : updatedProfile.bankAccountNumber ? 'BANK' : 'NONE',
      },
    });
  } catch (error: any) {
    console.error('Failed to update clipper payout method:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to update payout details' },
      { status: 500 }
    );
  }
}
