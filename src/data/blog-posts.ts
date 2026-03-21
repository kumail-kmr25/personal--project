export interface StaticBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  image: string;
  readingTime: number;
  publishedAt: string;
  author: { name: string; photo: string };
}

export const BLOG_POSTS: StaticBlogPost[] = [
  {
    id: '1',
    title: 'How I Increased Client Revenue by 300% Through Performance Optimization',
    slug: 'client-revenue-300-percent-performance-optimization',
    excerpt: 'Real case study of how improving load time from 4.5s to 1.2s tripled an e-commerce client\'s sales. Specific techniques, before/after metrics, and actionable takeaways.',
    category: 'Performance Optimization',
    tags: ['Performance', 'Client Stories', 'E-Commerce'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    readingTime: 8,
    publishedAt: '2024-02-15',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## The Problem

When FashionCo came to me, their WordPress site was losing customers to faster competitors. A 4.5-second load time meant 53% of mobile users abandoned before the page loaded. Conversion rate? Just 2%.

## What We Did

We rebuilt with Next.js 15, implemented aggressive image optimization, and moved to edge deployment. Key techniques:

1. **Server-Side Rendering** - Critical content loads instantly
2. **Image Optimization** - 70% payload reduction with WebP and lazy loading
3. **Code Splitting** - Only load what's needed per route
4. **Edge Caching** - Static assets served from CDN

## Results

- Load time: 4.5s → 1.2s (73% improvement)
- Conversion rate: 2% → 6% (200% increase)
- Monthly revenue: $50k → $150k

## Key Takeaways

1. Every 100ms matters for conversion
2. Mobile performance is non-negotiable
3. Measure before and after—data drives decisions
4. Edge deployment can dramatically improve TTFB
5. Image optimization often yields the biggest wins
    `,
  },
  {
    id: '2',
    title: 'Next.js 15 vs React: Which Should You Choose for Your Next Project?',
    slug: 'nextjs-15-vs-react-which-to-choose',
    excerpt: 'Comprehensive comparison of Next.js 15 and React, when to use each, pros and cons. Includes feature comparison table and decision framework.',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Tech Stack'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    readingTime: 10,
    publishedAt: '2024-02-10',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## The Short Answer

Use **Next.js 15** when you need: SEO, server rendering, file-based routing, or API routes. Use **React** (Vite/CRA) when building SPAs, internal tools, or when you want maximum flexibility.

## Feature Comparison

| Feature | Next.js 15 | React (Vite) |
|---------|------------|--------------|
| SSR/SSG | Built-in | Manual setup |
| Routing | File-based | Manual |
| SEO | Excellent | Requires work |
| Bundle Size | Larger | Smaller |
| Learning Curve | Moderate | Easier |

## Decision Framework

1. **Marketing/Content site?** → Next.js
2. **Dashboard/Internal tool?** → React + Vite
3. **E-commerce?** → Next.js
4. **Prototype/MVP?** → Either works
    `,
  },
  {
    id: '3',
    title: 'The Real Cost of a Slow Website: $100k Lost Revenue Case Study',
    slug: 'cost-of-slow-website-100k-lost-revenue',
    excerpt: 'How a 3-second delay cost a client $100k annually and how we fixed it. Calculations, metrics, and ROI of speed optimization.',
    category: 'Business Growth',
    tags: ['Performance', 'ROI', 'Case Study'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    readingTime: 7,
    publishedAt: '2024-02-05',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## The Math

- 10,000 monthly visitors × 40% bounce from slow load = 4,000 lost visitors
- 4,000 × 2% conversion × $65 AOV = $5,200/month lost
- Annual impact: **$62,400** (conservative)

For larger sites, this easily exceeds $100k.

## The Fix

We optimized images, implemented caching, and moved to a faster host. Total investment: $2,500. Payback period: 2 weeks.

## Key Takeaways

1. Calculate your revenue at risk before optimizing
2. Speed optimization has measurable ROI
3. Start with the biggest bottlenecks (usually images)
4. Monitor Core Web Vitals continuously
    `,
  },
  {
    id: '4',
    title: 'From Zero to Deployed: Building a SaaS MVP in 8 Weeks',
    slug: 'saas-mvp-8-weeks',
    excerpt: 'Step-by-step breakdown of MVP development process for a startup. Weekly breakdown, tech stack choices, challenges overcome.',
    category: 'Web Development',
    tags: ['SaaS', 'MVP', 'Startup'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    readingTime: 12,
    publishedAt: '2024-01-28',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## Week 1-2: Discovery & Architecture

Define core features. Choose: Next.js, PostgreSQL, Vercel. Sketch database schema.

## Week 3-4: Core Development

Auth, main feature, basic UI. Ship to staging.

## Week 5-6: Polish & Integration

Payments (Stripe), email, error handling.

## Week 7-8: Launch Prep

Testing, performance, go-live.

## MVP Best Practices

1. Ship the smallest useful version
2. Choose boring technology
3. Optimize for iteration speed
4. Get users before perfecting
    `,
  },
  {
    id: '5',
    title: 'TypeScript vs JavaScript in 2024: Why I Only Use TypeScript Now',
    slug: 'typescript-vs-javascript-2024',
    excerpt: 'Why TypeScript is worth the learning curve. Real-world benefits, type safety examples, productivity gains.',
    category: 'Web Development',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
    readingTime: 9,
    publishedAt: '2024-01-20',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## The Case for TypeScript

1. **Fewer bugs** - Catch errors at compile time
2. **Better IDE support** - Autocomplete, refactoring
3. **Self-documenting** - Types are documentation
4. **Easier refactoring** - Confidence when changing code

## When to Use TypeScript

- Any project over 500 lines
- Team of 2+
- Long-term maintenance expected
- Building libraries or APIs

## Migration Tip

Start with \`// @ts-check\` in JS files. Gradual migration beats big-bang.
    `,
  },
  {
    id: '6',
    title: '5 Mistakes That Are Killing Your Website\'s Conversion Rate',
    slug: '5-mistakes-killing-conversion-rate',
    excerpt: 'Common UX mistakes and how to fix them. Each with before/after examples and specific fixes.',
    category: 'Business Growth',
    tags: ['Conversion', 'UX', 'Optimization'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    readingTime: 6,
    publishedAt: '2024-01-15',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## 1. Slow Load Times

Fix: Optimize images, use CDN, consider edge rendering.

## 2. Unclear Value Proposition

Fix: Lead with benefit in first 5 seconds. Test headlines.

## 3. Complicated Checkout

Fix: Reduce steps. Offer guest checkout. One-click for returning users.

## 4. No Trust Signals

Fix: Add testimonials, security badges, guarantees.

## 5. Weak CTAs

Fix: Action-oriented, contrasting color, above the fold.

## Conversion Checklist

- [ ] Load time under 2s
- [ ] Clear value prop
- [ ] Max 3 checkout steps
- [ ] Social proof visible
- [ ] CTA stands out
    `,
  },
  {
    id: '7',
    title: 'How I Built a $50k/month SaaS Side Project While Working Full-Time',
    slug: 'saas-side-project-50k-month',
    excerpt: 'Journey of building and launching a successful side project. Time management, technical approach, revenue growth.',
    category: 'Career Advice',
    tags: ['Side Project', 'SaaS', 'Career'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    readingTime: 11,
    publishedAt: '2024-01-10',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## Time Management

- 2 hours before work, 2 hours after
- Weekend sprints for features
- Say no to scope creep

## Technical Approach

- Use what you know
- No custom infrastructure
- Launch in 4 weeks, iterate after

## Revenue Growth

- Start with 1 pricing tier
- Talk to users weekly
- Double down on what converts
    `,
  },
  {
    id: '8',
    title: 'Database Design Mistakes That Will Haunt You Later',
    slug: 'database-design-mistakes',
    excerpt: 'Common schema mistakes and how to avoid them. Examples of bad vs good design, migration nightmares avoided.',
    category: 'Web Development',
    tags: ['Database', 'Prisma', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d',
    readingTime: 8,
    publishedAt: '2024-01-05',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## Mistake 1: No Timestamps

Always add createdAt, updatedAt. You'll need them.

## Mistake 2: Storing JSON Blobs

Normalize. Your future self will thank you when querying.

## Mistake 3: No Indexes on Foreign Keys

Join performance degrades without them.

## Mistake 4: Single Table for Polymorphic Data

Use separate tables or proper polymorphic patterns.

## Mistake 5: No Migration Strategy

Use migrations. Never edit production DB manually.
    `,
  },
  {
    id: '9',
    title: 'The Hidden Costs of Cheap Development: A $15k Website That Cost $75k',
    slug: 'hidden-costs-cheap-development',
    excerpt: 'Why hiring the cheapest developer backfired. Red flags, what went wrong, total cost analysis.',
    category: 'Business Growth',
    tags: ['Hiring', 'Case Study', 'ROI'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    readingTime: 7,
    publishedAt: '2023-12-28',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## What Happened

Client hired offshore dev for $15k. Got: spaghetti code, no tests, security holes. Rebuild cost: $60k.

## Red Flags to Watch

- Unrealistic timelines
- No portfolio of similar work
- Vague answers to technical questions
- No contract or milestone structure

## Total Cost

$15k + $60k rebuild + 6 months lost = $75k+ when $35k done right would have shipped in 10 weeks.

## How to Evaluate Developers

- Ask for 2-3 similar projects
- Check code quality of past work
- Understand their process
- Get references
    `,
  },
  {
    id: '10',
    title: 'Serverless vs Traditional Hosting: Real Cost Comparison',
    slug: 'serverless-vs-traditional-hosting',
    excerpt: 'Actual costs and performance of serverless (Vercel) vs VPS. Cost breakdown tables, use case recommendations.',
    category: 'Web Development',
    tags: ['Hosting', 'Vercel', 'Infrastructure'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    readingTime: 9,
    publishedAt: '2023-12-20',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## Cost Comparison (Monthly)

| Traffic | Vercel | VPS (DigitalOcean) |
|---------|--------|---------------------|
| 10k visits | $0 | $6 |
| 100k | $20 | $12 |
| 1M | $150 | $24 |

## When to Use Serverless

- Variable traffic
- Don't want to manage servers
- Edge deployment matters
- Budget allows premium

## When to Use VPS

- Predictable high traffic
- Cost-sensitive
- Need full control
- Long-running processes
    `,
  },
  {
    id: '11',
    title: 'How to Prepare for Your First Developer Consultation',
    slug: 'prepare-developer-consultation',
    excerpt: 'What clients should prepare before meeting with a developer. Questions to ask, information to gather, checklist included.',
    category: 'Business Growth',
    tags: ['Consultation', 'Planning', 'Checklist'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    readingTime: 6,
    publishedAt: '2023-12-15',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## Before the Call

1. Write down your goals (3-5 bullets)
2. List 2-3 competitor sites you like
3. Note your budget range
4. Define must-have vs nice-to-have

## Questions to Ask

- What's your process?
- How do you handle changes?
- What's included in the quote?
- Timeline and milestones?
- Who owns the code?

## Red Flags

- Won't share past work
- No contract
- Full payment upfront
- Unrealistic promises
    `,
  },
  {
    id: '12',
    title: 'Web Development Trends I\'m Betting On in 2024',
    slug: 'web-development-trends-2024',
    excerpt: 'Technologies and approaches gaining traction. AI integration, edge computing, predictions with reasoning.',
    category: 'Industry Insights',
    tags: ['Trends', '2024', 'Predictions'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    readingTime: 10,
    publishedAt: '2023-12-10',
    author: { name: 'Kumail Kmr', photo: 'https://github.com/kumail-kmr25.png' },
    content: `
## 1. AI-Assisted Development

Copilot and similar tools are productivity multipliers. Learn to prompt effectively.

## 2. Edge-First Architecture

Compute closer to users. Vercel, Cloudflare Workers, Deno Deploy.

## 3. TypeScript Everywhere

Full-stack TypeScript. tRPC, type-safe APIs.

## 4. Simpler State Management

Server components reduce client state needs. React Query for data.

## 5. Performance Budgets

Core Web Vitals as requirements, not nice-to-haves.

## Skills to Learn Now

- TypeScript
- Edge runtimes
- AI tooling
- Performance optimization
    `,
  },
];

export function getBlogPost(slug: string): StaticBlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): StaticBlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category);
}
