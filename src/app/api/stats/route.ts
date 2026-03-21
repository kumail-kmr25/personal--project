import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      projectCount,
      submissionCount,
      subscriberCount,
      blogPostCount,
      unreadSubmissions,
      recentSubscribers
    ] = await Promise.all([
      prisma.project.count(),
      prisma.submission.count(),
      prisma.subscriber.count(),
      prisma.blogPost.count(),
      prisma.submission.count({ where: { status: 'NEW' } }),
      prisma.subscriber.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      })
    ]);

    // Simple visitor data simulation for now (could connect to a real analytics provider later)
    const visitorStats = [
      { name: 'Mon', views: 400 + Math.floor(Math.random() * 100), unique: 240 },
      { name: 'Tue', views: 300 + Math.floor(Math.random() * 100), unique: 139 },
      { name: 'Wed', views: 200 + Math.floor(Math.random() * 100), unique: 980 },
      { name: 'Thu', views: 278 + Math.floor(Math.random() * 100), unique: 390 },
      { name: 'Fri', views: 189 + Math.floor(Math.random() * 100), unique: 480 },
      { name: 'Sat', views: 239 + Math.floor(Math.random() * 100), unique: 380 },
      { name: 'Sun', views: 349 + Math.floor(Math.random() * 100), unique: 430 },
    ];

    return NextResponse.json({
      counts: {
        projects: projectCount,
        submissions: submissionCount,
        subscribers: subscriberCount,
        blogPosts: blogPostCount,
        unreadSubmissions,
      },
      recentSubscribers,
      visitorStats,
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}
