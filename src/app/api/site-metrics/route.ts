import { NextResponse } from 'next/server';

const payload = {
  stats: [
    { label: 'Projects Delivered', value: '24+' },
    { label: 'Avg Performance Score', value: '95' },
    { label: 'Client Satisfaction', value: '98%' },
  ],
  growth: [
    { month: 'Jan', score: 72 },
    { month: 'Feb', score: 77 },
    { month: 'Mar', score: 81 },
    { month: 'Apr', score: 84 },
    { month: 'May', score: 88 },
    { month: 'Jun', score: 91 },
    { month: 'Jul', score: 95 },
  ],
};

export async function GET() {
  return NextResponse.json(payload);
}
