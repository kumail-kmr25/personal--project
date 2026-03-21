'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, Check } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'FashionCo',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    text: 'Working with Kumail was transformative for our business. Our online sales tripled in the first quarter after launch. The site is lightning-fast, beautiful, and our customers love it. He exceeded our expectations in every way.',
    date: 'February 2024',
    verified: true,
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'DataMetrics',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    text: 'Best developer we\'ve worked with. Delivered ahead of schedule, stayed within budget, and quality exceeded expectations. Our users are thrilled with the new dashboard. Kumail\'s technical expertise is unmatched.',
    date: 'January 2024',
    verified: true,
  },
  {
    name: 'Jennifer Martinez',
    role: 'Marketing Director',
    company: 'LegalPro Associates',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    text: 'Our website went from completely outdated to industry-leading in just 6 weeks. We now rank #1 for our main keywords and get 5x more qualified leads. Worth every penny.',
    date: 'November 2023',
    verified: true,
  },
  {
    name: 'Dr. James Wilson',
    role: 'Practice Owner',
    company: 'HealthFirst Clinic',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
    text: 'This booking system revolutionized our practice. No-shows dropped 40%, and our staff saves hours every week. We recovered the development cost in the first month. Highly professional.',
    date: 'March 2024',
    verified: true,
  },
  {
    name: 'Alex Rodriguez',
    role: 'Founder',
    company: 'FitConnect',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    text: 'Built our MVP in 16 weeks when other agencies quoted 6+ months. The platform scaled to 15,000 users without a hitch. We secured seed funding largely because of the quality he delivered.',
    date: 'September 2023',
    verified: true,
  },
  {
    name: 'Lisa Thompson',
    role: 'COO',
    company: 'Bella Cucina',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    text: 'Professional, communicative, and delivered exactly what we needed. The custom system saves us $50,000 per year. Already planning our next project together.',
    date: 'August 2023',
    verified: true,
  },
];

function TestimonialCard({
  name,
  role,
  company,
  photo,
  text,
  date,
  verified,
}: (typeof TESTIMONIALS)[0]) {
  return (
    <div
      className="w-[400px] shrink-0 mr-6 p-6 bg-surface border border-border rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      tabIndex={0}
    >
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      <p className="text-text-primary mb-6 leading-relaxed min-h-[100px]">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-4">
        <Image
          src={photo}
          alt={name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-bold text-text-primary">{name}</p>
          <p className="text-sm text-text-secondary">
            {role} @ {company}
          </p>
        </div>
        {verified && (
          <span className="ml-auto flex items-center gap-1 text-xs font-bold text-emerald-600">
            <Check className="w-4 h-4" />
            Verified
          </span>
        )}
      </div>
      <p className="text-xs text-text-muted mt-2">{date}</p>
    </div>
  );
}

export function TestimonialsMarquee() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const duplicated = [...TESTIMONIALS, ...TESTIMONIALS];

  if (prefersReducedMotion) {
    return (
      <section className="py-20 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">What Clients Say</h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            Don&apos;t just take my word for it – here&apos;s what clients have achieved
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <h2 className="text-3xl font-bold text-center mb-4">What Clients Say</h2>
        <p className="text-text-secondary text-center max-w-2xl mx-auto">
          Don&apos;t just take my word for it – here&apos;s what clients have achieved
        </p>
      </div>
      <div className="group/marquee space-y-8">
        {/* Row 1: Scroll left */}
        <div className="overflow-hidden">
          <div
            className="flex animate-marquee-left group-hover/marquee:[animation-play-state:paused]"
            style={{ width: 'max-content' }}
          >
            {duplicated.map((t, i) => (
              <TestimonialCard key={`left-${i}`} {...t} />
            ))}
          </div>
        </div>
        {/* Row 2: Scroll right */}
        <div className="overflow-hidden">
          <div
            className="flex animate-marquee-right group-hover/marquee:[animation-play-state:paused]"
            style={{ width: 'max-content' }}
          >
            {duplicated.map((t, i) => (
              <TestimonialCard key={`right-${i}`} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
