import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { status, name, email } = body;

    const subscriber = await prisma.subscriber.update({
      where: { id },
      data: { status, name, email },
    });

    return NextResponse.json(subscriber);
  } catch {
    return NextResponse.json({ error: 'Failed to update subscriber' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await prisma.subscriber.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Subscriber deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete subscriber' }, { status: 500 });
  }
}
