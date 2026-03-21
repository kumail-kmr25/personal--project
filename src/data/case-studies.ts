export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  industry: string;
  heroImage: string;
  logo?: string;
  timeline: string;
  budget: string;
  teamSize: string;
  technologies: string[];
  launchDate: string;
  liveUrl?: string;
  githubUrl?: string;
  overview: string;
  clientNeeds: string;
  whyChoseMe: string;
  goals: string[];
  targetAudience: string;
  challenge: {
    description: string;
    criticalIssue: string;
    beforeMetrics: Record<string, string>;
  };
  discovery: {
    timeline: string;
    usersInterviewed: number;
    keyInsights: string[];
  };
  solution: {
    strategy: string;
    features: { name: string; description: string }[];
    technicalHighlights: string[];
  };
  developmentTimeline: { weeks: string; phase: string; deliverables: string }[];
  results: {
    beforeAfter: { metric: string; before: string; after: string; change: string }[];
    roi: { investment: string; monthlyIncrease: string; annualImpact: string; breakEven: string; firstYearROI: string };
    qualitative: string[];
  };
  testimonial: {
    quote: string;
    name: string;
    role: string;
    company: string;
    photo: string;
    date: string;
  };
  lessonsLearned: string;
  relatedSlugs: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'ecommerce-fashion-platform',
    title: 'E-Commerce Fashion Platform',
    subtitle: 'Transforming a boutique into an online revenue powerhouse',
    client: 'FashionCo',
    industry: 'E-Commerce',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    timeline: '10 weeks',
    budget: '$25,000',
    teamSize: 'Solo developer',
    technologies: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Vercel'],
    launchDate: 'February 2024',
    liveUrl: '#',
    githubUrl: '#',
    overview: 'FashionCo, a San Francisco fashion boutique, needed to modernize their outdated WordPress site. Their 4.5-second load time was costing them customers to faster competitors.',
    clientNeeds: 'A performant, mobile-first e-commerce platform with integrated payments and inventory management.',
    whyChoseMe: 'Proven track record with similar projects and ability to deliver on an aggressive timeline.',
    goals: ['Reduce load time to under 2 seconds', 'Implement seamless Stripe checkout', 'Mobile-first responsive design', 'Real-time inventory sync'],
    targetAudience: 'Fashion-conscious shoppers aged 25-45 seeking boutique-quality apparel online.',
    challenge: {
      description: 'The client\'s WordPress site was plagued by slow performance, a clunky 7-step checkout, and high cart abandonment. Competitors with modern stacks were capturing their market share. The business impact was severe—$50k monthly revenue with 68% bounce rate.',
      criticalIssue: '4.5-second load time and 78% cart abandonment rate were causing an estimated $100k annual revenue loss.',
      beforeMetrics: {
        'Load Time': '4.5 seconds',
        'Conversion Rate': '2%',
        'Monthly Revenue': '$50,000',
        'Customer Complaints': '45/month',
        'Bounce Rate': '68%',
        'Mobile Score': '32/100',
      },
    },
    discovery: {
      timeline: '1 week',
      usersInterviewed: 12,
      keyInsights: ['Checkout friction was the #1 abandonment cause', 'Mobile users represented 60% of traffic but only 0.8% of conversions', 'Customers wanted one-click reorder for returning shoppers'],
    },
    solution: {
      strategy: 'Rebuilt from scratch with Next.js 15 App Router for optimal performance. Chose PostgreSQL for reliability and Stripe for seamless payments.',
      features: [
        { name: 'Lightning-Fast Performance', description: 'Server-side rendering, image optimization, and code splitting achieved 1.2s load time (73% improvement).' },
        { name: 'Streamlined Checkout', description: 'Reduced from 7 steps to 3, with one-click checkout for returning customers. Completion rate increased 45%.' },
        { name: 'Real-Time Inventory', description: 'Live stock updates prevent overselling and reduce support tickets by 60%.' },
      ],
      technicalHighlights: ['Next.js 15 with App Router', 'Prisma ORM + PostgreSQL', 'Stripe Checkout integration', 'Vercel Edge deployment'],
    },
    developmentTimeline: [
      { weeks: '1-2', phase: 'Discovery & Planning', deliverables: 'Project specification' },
      { weeks: '3-4', phase: 'Design Phase', deliverables: 'Approved Figma designs' },
      { weeks: '5-8', phase: 'Development', deliverables: 'Staging site' },
      { weeks: '9', phase: 'Testing & QA', deliverables: 'Test report' },
      { weeks: '10', phase: 'Launch', deliverables: 'Production site' },
    ],
    results: {
      beforeAfter: [
        { metric: 'Load Time', before: '4.5s', after: '1.2s', change: '-73%' },
        { metric: 'Conversion Rate', before: '2%', after: '6%', change: '+200%' },
        { metric: 'Monthly Revenue', before: '$50k', after: '$150k', change: '+200%' },
        { metric: 'Bounce Rate', before: '68%', after: '32%', change: '-53%' },
      ],
      roi: { investment: '$25,000', monthlyIncrease: '$100,000', annualImpact: '$1,200,000', breakEven: '7.5 days', firstYearROI: '4,700%' },
      qualitative: ['Featured in industry publication', 'Won design award', 'Expanded to 3 new locations'],
    },
    testimonial: {
      quote: 'Working with Kumail was transformative for our business. Our online sales tripled in the first quarter after launch. The site is lightning-fast, beautiful, and our customers love it. He exceeded our expectations in every way.',
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'FashionCo',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      date: 'February 2024',
    },
    lessonsLearned: 'This project reinforced the direct correlation between performance and conversion. Investing in speed optimization isn\'t optional—it\'s a revenue driver. The one-click checkout for returning customers had an outsized impact on repeat purchases.',
    relatedSlugs: ['saas-analytics-dashboard', 'restaurant-ordering-system'],
  },
  {
    slug: 'saas-analytics-dashboard',
    title: 'SaaS Analytics Dashboard',
    subtitle: 'Real-time analytics for 10,000+ users',
    client: 'DataMetrics',
    industry: 'SaaS',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    timeline: '12 weeks',
    budget: '$35,000',
    teamSize: '2 developers',
    technologies: ['React', 'TypeScript', 'MongoDB', 'WebSockets', 'Chart.js', 'AWS'],
    launchDate: 'January 2024',
    overview: 'DataMetrics, a B2B analytics startup, needed a real-time dashboard that could scale to 10k+ concurrent users with sub-100ms latency.',
    clientNeeds: 'A scalable analytics platform with real-time data visualization and WebSocket updates.',
    whyChoseMe: 'Experience with high-throughput systems and real-time data architectures.',
    goals: ['Support 10k+ concurrent users', 'Sub-100ms API latency', '99.9% uptime SLA', 'Custom chart configurations'],
    targetAudience: 'Product managers and data analysts at mid-market B2B companies.',
    challenge: {
      description: 'The previous system couldn\'t handle concurrent load. Queries timed out during peak hours, and users experienced 3-5 second delays for data updates. The startup was losing enterprise deals due to reliability concerns.',
      criticalIssue: 'System failure during a key investor demo due to timeout under 500 concurrent users.',
      beforeMetrics: {
        'Max Concurrent Users': '500',
        'API Latency': '3.2s',
        'Uptime': '94%',
        'Data Refresh': '5 min delay',
      },
    },
    discovery: {
      timeline: '2 weeks',
      usersInterviewed: 18,
      keyInsights: ['Users needed sub-second data refresh', 'Most views required the same 5 chart types', 'Enterprise clients demanded 99.9% SLA'],
    },
    solution: {
      strategy: 'Built on React with WebSockets for real-time push. MongoDB with optimized aggregation pipelines. Redis caching for hot data.',
      features: [
        { name: 'Real-Time Updates', description: 'WebSocket connections push data changes instantly. No page refresh needed.' },
        { name: 'Optimized Queries', description: 'Pre-aggregated materialized views reduced query time from 3s to 45ms.' },
        { name: 'Scalable Infrastructure', description: 'AWS ECS with auto-scaling handles 15k+ concurrent users.' },
      ],
      technicalHighlights: ['React 18 + TypeScript', 'MongoDB aggregation pipelines', 'Socket.io for real-time', 'Redis cache layer'],
    },
    developmentTimeline: [
      { weeks: '1-3', phase: 'Architecture & Discovery', deliverables: 'Technical spec' },
      { weeks: '4-6', phase: 'Backend Development', deliverables: 'API + WebSocket' },
      { weeks: '7-10', phase: 'Frontend Development', deliverables: 'Dashboard UI' },
      { weeks: '11', phase: 'Load Testing', deliverables: 'Performance report' },
      { weeks: '12', phase: 'Launch', deliverables: 'Production deployment' },
    ],
    results: {
      beforeAfter: [
        { metric: 'Concurrent Users', before: '500', after: '15,000', change: '+2900%' },
        { metric: 'API Latency', before: '3.2s', after: '85ms', change: '-97%' },
        { metric: 'Uptime', before: '94%', after: '99.95%', change: '+6%' },
        { metric: 'Data Refresh', before: '5 min', after: 'Real-time', change: 'Instant' },
      ],
      roi: { investment: '$35,000', monthlyIncrease: 'N/A', annualImpact: 'Secured $2M Series A', breakEven: '3 months', firstYearROI: 'N/A' },
      qualitative: ['Secured $2M seed funding', '5 enterprise contracts signed', 'User engagement +200%'],
    },
    testimonial: {
      quote: 'Best developer we\'ve worked with. Delivered ahead of schedule, stayed within budget, and quality exceeded expectations. Our users are thrilled. Kumail\'s technical expertise is unmatched.',
      name: 'Michael Chen',
      role: 'CTO',
      company: 'DataMetrics',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      date: 'January 2024',
    },
    lessonsLearned: 'Pre-aggregation and materialized views were game-changers for analytics performance. Building for scale from day one prevented costly rewrites.',
    relatedSlugs: ['ecommerce-fashion-platform', 'healthcare-booking-platform'],
  },
  {
    slug: 'law-firm-website',
    title: 'Law Firm Corporate Website',
    subtitle: 'From zero to #1 on Google in 6 weeks',
    client: 'LegalPro Associates',
    industry: 'Legal',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
    timeline: '6 weeks',
    budget: '$12,000',
    teamSize: 'Solo developer',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    launchDate: 'November 2023',
    overview: 'LegalPro Associates, a 15-attorney law firm, had no web presence and was losing cases to competitors with professional sites.',
    clientNeeds: 'Professional website with attorney profiles, case studies, and SEO to rank for key practice areas.',
    whyChoseMe: 'Fast delivery and SEO expertise within their budget constraints.',
    goals: ['Establish professional online presence', 'Rank #1 for primary keywords', 'Generate qualified leads', 'Showcase attorney expertise'],
    targetAudience: 'Individuals and businesses seeking legal representation in their practice areas.',
    challenge: {
      description: 'With no website, the firm was invisible to 90% of potential clients searching online. Competitors with modern sites were capturing all organic traffic and leads.',
      criticalIssue: 'Zero online presence in a market where 80% of clients find lawyers through search.',
      beforeMetrics: {
        'Organic Traffic': '0',
        'Monthly Leads': '0',
        'Google Rankings': 'None',
      },
    },
    discovery: {
      timeline: '1 week',
      usersInterviewed: 8,
      keyInsights: ['Potential clients search by practice area + location', 'Attorney bios with credentials build trust', 'Case study wins drive conversions'],
    },
    solution: {
      strategy: 'Next.js for SEO with server-side rendering. Structured content architecture. Schema markup for rich results.',
      features: [
        { name: 'SEO-Optimized Structure', description: 'Semantic HTML, meta tags, and schema markup. Ranked #1 for 8 primary keywords within 8 weeks.' },
        { name: 'Attorney Profiles', description: 'Individual pages for each attorney with credentials, practice areas, and contact.' },
        { name: 'Case Studies', description: 'Anonymized wins demonstrating expertise and building trust.' },
      ],
      technicalHighlights: ['Next.js SSR', 'Prisma + PostgreSQL', 'Tailwind CSS', 'Vercel hosting'],
    },
    developmentTimeline: [
      { weeks: '1', phase: 'Discovery & Content', deliverables: 'Content outline' },
      { weeks: '2', phase: 'Design', deliverables: 'Approved designs' },
      { weeks: '3-4', phase: 'Development', deliverables: 'Staging site' },
      { weeks: '5', phase: 'Content & SEO', deliverables: 'All pages live' },
      { weeks: '6', phase: 'Launch', deliverables: 'Production' },
    ],
    results: {
      beforeAfter: [
        { metric: 'Organic Traffic', before: '0', after: '2,500/mo', change: 'New' },
        { metric: 'Qualified Leads', before: '0', after: '45/mo', change: '5x goal' },
        { metric: 'Google Rank', before: 'None', after: '#1', change: '8 keywords' },
      ],
      roi: { investment: '$12,000', monthlyIncrease: 'N/A', annualImpact: '$180k new business', breakEven: '20 days', firstYearROI: '1,400%' },
      qualitative: ['#1 Google rankings', 'Featured in legal tech publication', 'Template for 3 partner firms'],
    },
    testimonial: {
      quote: 'Our website went from completely outdated to industry-leading in just 6 weeks. We now rank #1 for our main keywords and get 5x more qualified leads. Worth every penny.',
      name: 'Jennifer Martinez',
      role: 'Marketing Director',
      company: 'LegalPro Associates',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      date: 'November 2023',
    },
    lessonsLearned: 'SEO is a force multiplier for service businesses. A well-structured site with quality content can dominate search quickly when competition is modest.',
    relatedSlugs: ['ecommerce-fashion-platform', 'restaurant-ordering-system'],
  },
  {
    slug: 'healthcare-booking-platform',
    title: 'Healthcare Booking Platform',
    subtitle: 'HIPAA-compliant appointment system',
    client: 'HealthFirst Clinic',
    industry: 'Healthcare',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
    timeline: '14 weeks',
    budget: '$40,000',
    teamSize: '2 developers',
    technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'SendGrid', 'Twilio SMS'],
    launchDate: 'March 2024',
    overview: 'HealthFirst Clinic, an 8-doctor practice, struggled with manual booking, 30% no-show rates, and poor patient experience.',
    clientNeeds: 'HIPAA-compliant booking system with reminders, online payments, and patient portal.',
    whyChoseMe: 'Experience with compliance requirements and healthcare integrations.',
    goals: ['Reduce no-shows by 30%', 'Enable online booking 24/7', 'Integrate payments', 'HIPAA compliance'],
    targetAudience: 'Patients scheduling appointments and clinic staff managing schedules.',
    challenge: {
      description: 'Phone-only booking created bottlenecks. No reminder system led to 30% no-shows. Manual payment collection wasted staff time. Patients wanted self-service options.',
      criticalIssue: '30% no-show rate costing the practice $45,000 monthly in lost revenue.',
      beforeMetrics: {
        'No-Show Rate': '30%',
        'Booking Method': 'Phone only',
        'Patient Satisfaction': '62%',
        'Staff Time on Booking': '20 hrs/week',
      },
    },
    discovery: {
      timeline: '2 weeks',
      usersInterviewed: 24,
      keyInsights: ['SMS reminders preferred over email 2:1', 'Patients want to see availability before calling', 'Online payment increases commitment'],
    },
    solution: {
      strategy: 'Built HIPAA-compliant platform with encrypted data, BAA-compliant vendors. Twilio for SMS, SendGrid for email, Stripe for payments.',
      features: [
        { name: 'Online Booking', description: 'Real-time availability, 24/7 self-service. 1,000+ bookings per month.' },
        { name: 'Smart Reminders', description: 'SMS + email 24hr and 2hr before. No-shows dropped 40%.' },
        { name: 'Patient Portal', description: 'View history, pay bills, update info. 95% patient satisfaction.' },
      ],
      technicalHighlights: ['HIPAA-compliant infrastructure', 'Twilio SMS integration', 'Stripe payments', 'Encrypted PostgreSQL'],
    },
    developmentTimeline: [
      { weeks: '1-3', phase: 'Compliance & Architecture', deliverables: 'Security audit' },
      { weeks: '4-6', phase: 'Core Booking', deliverables: 'Booking engine' },
      { weeks: '7-10', phase: 'Integrations', deliverables: 'SMS, Email, Payments' },
      { weeks: '11-12', phase: 'Patient Portal', deliverables: 'Portal MVP' },
      { weeks: '13-14', phase: 'Testing & Launch', deliverables: 'Production' },
    ],
    results: {
      beforeAfter: [
        { metric: 'No-Show Rate', before: '30%', after: '18%', change: '-40%' },
        { metric: 'Monthly Bookings', before: '600', after: '1,000', change: '+67%' },
        { metric: 'Patient Satisfaction', before: '62%', after: '95%', change: '+53%' },
        { metric: 'Staff Booking Time', before: '20 hrs', after: '6 hrs', change: '-70%' },
      ],
      roi: { investment: '$40,000', monthlyIncrease: '$35,000', annualImpact: '$420,000', breakEven: '34 days', firstYearROI: '950%' },
      qualitative: ['Recovered cost in first month', 'Expanding to 3 locations', 'Staff morale improved'],
    },
    testimonial: {
      quote: 'This booking system revolutionized our practice. No-shows dropped 40%, and our staff saves hours every week. We recovered the development cost in the first month. Highly professional and responsive.',
      name: 'Dr. James Wilson',
      role: 'Practice Owner',
      company: 'HealthFirst Clinic',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
      date: 'March 2024',
    },
    lessonsLearned: 'Healthcare tech requires extra diligence on compliance. Building with HIPAA from day one is far easier than retrofitting. SMS reminders had 3x the engagement of email.',
    relatedSlugs: ['saas-analytics-dashboard', 'fitness-social-network'],
  },
  {
    slug: 'fitness-social-network',
    title: 'Fitness Social Network',
    subtitle: 'MVP to 15,000 users in 16 weeks',
    client: 'FitConnect',
    industry: 'Fitness',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
    timeline: '16 weeks',
    budget: '$50,000',
    teamSize: '2 developers',
    technologies: ['Next.js', 'MongoDB', 'Socket.io', 'AWS S3', 'Redis'],
    launchDate: 'September 2023',
    overview: 'FitConnect needed an MVP social platform for fitness enthusiasts—challenges, leaderboards, and community features—to secure seed funding.',
    clientNeeds: 'Full-featured social MVP with user-generated content, real-time updates, and scalable infrastructure.',
    whyChoseMe: 'Ability to deliver a production-ready MVP in 16 weeks when others quoted 6+ months.',
    goals: ['Launch MVP for investor demo', 'Support 10k users', 'Real-time social features', 'Secure seed funding'],
    targetAudience: 'Fitness enthusiasts aged 18-35 who want community and competition.',
    challenge: {
      description: 'Building a social platform from scratch with limited budget and aggressive timeline. Needed to demonstrate product-market fit for investors.',
      criticalIssue: 'Seed round contingent on launching a functional MVP within 4 months.',
      beforeMetrics: {
        'Product': 'None',
        'Users': '0',
        'Funding': 'Pending',
      },
    },
    discovery: {
      timeline: '2 weeks',
      usersInterviewed: 35,
      keyInsights: ['Challenges and leaderboards drive engagement', 'Real-time updates critical for community feel', 'Photo/video sharing essential'],
    },
    solution: {
      strategy: 'Next.js for frontend, MongoDB for flexible schema. Socket.io for real-time. S3 for media. Prioritized core social loop over nice-to-haves.',
      features: [
        { name: 'Challenges & Leaderboards', description: 'Weekly challenges with rankings. 50k MAU, 1M+ posts.' },
        { name: 'Real-Time Feed', description: 'Socket.io pushes new posts instantly. Feels like native app.' },
        { name: 'Social Graph', description: 'Follow friends, like, comment. Viral growth mechanics.' },
      ],
      technicalHighlights: ['Next.js 14', 'MongoDB + Redis', 'Socket.io real-time', 'AWS S3 media'],
    },
    developmentTimeline: [
      { weeks: '1-3', phase: 'Architecture & Design', deliverables: 'Product spec' },
      { weeks: '4-8', phase: 'Core Development', deliverables: 'Auth, feed, challenges' },
      { weeks: '9-12', phase: 'Social Features', deliverables: 'Follow, like, comment' },
      { weeks: '13-14', phase: 'Real-Time & Media', deliverables: 'Socket.io, S3' },
      { weeks: '15-16', phase: 'Polish & Launch', deliverables: 'Production MVP' },
    ],
    results: {
      beforeAfter: [
        { metric: 'Users', before: '0', after: '15,000', change: 'Launch' },
        { metric: 'MAU', before: '0', after: '50,000', change: 'Active' },
        { metric: 'Posts', before: '0', after: '1M+', change: 'UGC' },
        { metric: 'Funding', before: 'Pending', after: 'Secured', change: 'Seed' },
      ],
      roi: { investment: '$50,000', monthlyIncrease: 'N/A', annualImpact: 'Seed funding secured', breakEven: 'N/A', firstYearROI: 'N/A' },
      qualitative: ['Secured seed funding', '15k users at launch', 'Featured in Product Hunt'],
    },
    testimonial: {
      quote: 'Built our MVP in 16 weeks when other agencies quoted 6+ months. Scaled to 15,000 users without a hitch. We secured seed funding largely because of the quality he delivered. Absolutely recommended.',
      name: 'Alex Rodriguez',
      role: 'Founder',
      company: 'FitConnect',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      date: 'September 2023',
    },
    lessonsLearned: 'Scope discipline is critical for MVPs. We shipped the core loop first and iterated. Real-time features significantly increased engagement and retention.',
    relatedSlugs: ['healthcare-booking-platform', 'restaurant-ordering-system'],
  },
  {
    slug: 'restaurant-ordering-system',
    title: 'Restaurant Menu & Ordering System',
    subtitle: 'From paper menus to 1,200 orders per month',
    client: 'Bella Cucina',
    industry: 'Restaurant',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    timeline: '8 weeks',
    budget: '$18,000',
    teamSize: 'Solo developer',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'Real-time'],
    launchDate: 'August 2024',
    overview: 'Bella Cucina, an Italian restaurant, relied on paper menus and phone orders. Kitchen chaos and missed orders were costing them customers.',
    clientNeeds: 'Digital menu, online ordering, and kitchen display system with POS integration.',
    whyChoseMe: 'Fast turnaround and experience with real-time food ordering systems.',
    goals: ['Eliminate phone order errors', 'Enable online ordering', 'Kitchen order management', 'Increase average order value'],
    targetAudience: 'Local diners ordering for pickup or delivery, plus restaurant staff.',
    challenge: {
      description: 'Phone orders led to errors and long wait times. Paper tickets caused kitchen bottlenecks. No way to upsell or showcase daily specials. Missing the growing online ordering market.',
      criticalIssue: '60% of orders had errors or delays, leading to customer complaints and lost repeat business.',
      beforeMetrics: {
        'Order Accuracy': '40%',
        'Monthly Orders': '400',
        'Order Method': 'Phone only',
        'Average Order Value': '$22',
      },
    },
    discovery: {
      timeline: '1 week',
      usersInterviewed: 10,
      keyInsights: ['Kitchen needs clear ticket display', 'Customers want to customize orders', 'Upsells at checkout increase AOV'],
    },
    solution: {
      strategy: 'Next.js frontend with real-time order updates. Prisma + PostgreSQL. Stripe for payments. Kitchen display with order prioritization.',
      features: [
        { name: 'Digital Menu', description: 'Beautiful menu with photos, allergens, customization. Real-time availability.' },
        { name: 'Online Ordering', description: 'Customize orders, pay online, track status. 1,200 orders/month.' },
        { name: 'Kitchen Display', description: 'Prioritized tickets, mods highlighted, done button. 60% fewer errors.' },
      ],
      technicalHighlights: ['Next.js + TypeScript', 'Prisma + PostgreSQL', 'Stripe Checkout', 'Real-time updates'],
    },
    developmentTimeline: [
      { weeks: '1', phase: 'Discovery', deliverables: 'Requirements' },
      { weeks: '2-3', phase: 'Design & Menu', deliverables: 'Digital menu' },
      { weeks: '4-6', phase: 'Ordering & Kitchen', deliverables: 'Full flow' },
      { weeks: '7', phase: 'Testing', deliverables: 'QA complete' },
      { weeks: '8', phase: 'Launch', deliverables: 'Live' },
    ],
    results: {
      beforeAfter: [
        { metric: 'Order Accuracy', before: '40%', after: '94%', change: '+135%' },
        { metric: 'Monthly Orders', before: '400', after: '1,200', change: '+200%' },
        { metric: 'Revenue', before: '$8.8k', after: '$24.6k', change: '+180%' },
        { metric: 'Order Errors', before: '60%', after: '6%', change: '-90%' },
      ],
      roi: { investment: '$18,000', monthlyIncrease: '$15,800', annualImpact: '$189,600', breakEven: '34 days', firstYearROI: '950%' },
      qualitative: ['Featured in local food blog', 'Expanded delivery radius', 'Hired 2 kitchen staff'],
    },
    testimonial: {
      quote: 'Professional, communicative, and delivered exactly what we needed. The system saves us from order chaos and our revenue is up 180%. Already planning our next project together.',
      name: 'Lisa Thompson',
      role: 'COO',
      company: 'Bella Cucina',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
      date: 'August 2024',
    },
    lessonsLearned: 'Restaurant tech has unique constraints—speed matters for kitchen displays, and customization options need to map to actual kitchen workflows. Simple UI beats feature bloat.',
    relatedSlugs: ['ecommerce-fashion-platform', 'law-firm-website'],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getRelatedCaseStudies(slugs: string[]): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => slugs.includes(cs.slug));
}
