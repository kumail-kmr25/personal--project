import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    // GET is now public so homepage can see approved endorsements
    // But we still filter by status in the query if not admin? 
    // Actually, usually admin sees all, public sees only approved.
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'ADMIN';

    const endorsements = await prisma.endorsement.findMany({
      where: isAdmin ? {} : { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(endorsements);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch endorsements' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!['APPROVED', 'PENDING', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const endorsement = await prisma.endorsement.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(endorsement);
  } catch {
    return NextResponse.json({ error: 'Failed to update endorsement' }, { status: 500 });
  }
}
