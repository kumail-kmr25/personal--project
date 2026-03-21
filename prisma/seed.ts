import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const settings = [
    { key: 'site_name', value: 'kumailkmr - portfolio v2.0', label: 'Site Name', group: 'General' },
    { key: 'admin_email', value: 'kumailkmr.dev@gmail.com', label: 'Admin Email', group: 'General' },
    { key: 'site_desc', value: 'Creative Developer & Designer specializing in premium web experiences.', label: 'Description', group: 'General' },
    { key: 'branding_color', value: '#3b82f6', label: 'Brand Color', group: 'Appearance' },
    { key: 'theme', value: 'system', label: 'Theme Mode', group: 'Appearance' },
    { key: 'twitter', value: 'https://twitter.com/kumailkmr', label: 'Twitter', group: 'Social' },
    { key: 'github', value: 'https://github.com/kumailkmr', label: 'GitHub', group: 'Social' },
    { key: 'linkedin', value: 'https://linkedin.com/in/kumailkmr', label: 'LinkedIn', group: 'Social' },
  ];

  console.log('Seeding system settings...');
  for (const s of settings) {
    await prisma.systemSettings.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  const projects = [
    {
      title: 'FashionCo E-Commerce',
      description: 'A premium full-stack e-commerce platform with Stripe integration and real-time inventory.',
      category: 'E-Commerce',
      status: 'PUBLISHED' as const,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
      metrics: [
        { label: 'Revenue', value: '+300%', icon: 'TrendingUp' },
        { label: 'Load Time', value: '1.2s', icon: 'Zap' },
      ],
      year: 2024,
      featured: true,
      views: 1200,
    },
    {
      title: 'SaaS Analytics Dashboard',
      description: 'Complex data visualization platform for enterprise metrics and user behavior tracking.',
      category: 'SaaS',
      status: 'PUBLISHED' as const,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      metrics: [
        { label: 'Users', value: '10k+', icon: 'Users' },
        { label: 'Latency', value: '<50ms', icon: 'Clock' },
      ],
      year: 2024,
      featured: true,
      views: 850,
    },
    {
      title: 'Modern Law Firm Portfolio',
      description: 'High-conversion business website focusing on performance and professional lead generation.',
      category: 'Websites',
      status: 'PUBLISHED' as const,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f',
      techStack: ['Next.js', 'Prisma', 'Tailwind CSS', 'Framer Motion'],
      metrics: [
        { label: 'Conversion', value: '+120%', icon: 'Target' },
        { label: 'Traffic', value: '5k/mo', icon: 'LineChart' },
      ],
      year: 2023,
      featured: true,
      views: 940,
    },
    {
      title: 'High-Performance API Engine',
      description: 'Scalable backend infrastructure supporting millions of requests with Redis caching.',
      category: 'API/Backend',
      status: 'PUBLISHED' as const,
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8',
      techStack: ['Node.js', 'Express', 'Redis', 'Docker'],
      metrics: [
        { label: 'Requests', value: '1M/hr', icon: 'Zap' },
        { label: 'Uptime', value: '99.99%', icon: 'CheckCircle' },
      ],
      year: 2023,
      featured: true,
      views: 3100,
    },
    {
      title: 'Creative Interaction Portfolio',
      description: 'Award-winning personal project showcasing advanced animations and 3D web experiences.',
      category: 'Personal',
      status: 'PUBLISHED' as const,
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
      techStack: ['Three.js', 'GSAP', 'React Three Fiber', 'WebGL'],
      metrics: [
        { label: 'Awards', value: '2 site of day', icon: 'Trophy' },
        { label: 'Speed Score', value: '98', icon: 'Star' },
      ],
      year: 2024,
      featured: true,
      views: 5200,
    },
    {
      title: 'AI-Powered CRM System',
      description: 'Latest work integrating OpenAI GPT-4 for automated customer relationship management.',
      category: 'Recent',
      status: 'PUBLISHED' as const,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
      techStack: ['Next.js', 'Python', 'OpenAI', 'LangChain'],
      metrics: [
        { label: 'Accuracy', value: '99%', icon: 'Cpu' },
        { label: 'Automation', value: '80%', icon: 'Workflow' },
      ],
      year: 2024,
      featured: true,
      views: 1100,
    },
    {
      title: 'Healthcare Booking Platform',
      description: 'HIPAA-compliant appointment booking system with reminders and patient portal.',
      category: 'Healthcare',
      status: 'PUBLISHED' as const,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d',
      techStack: ['Next.js', 'PostgreSQL', 'Stripe', 'Twilio', 'SendGrid'],
      metrics: [
        { label: 'No-Shows', value: '-40%', icon: 'CheckCircle' },
        { label: 'Bookings', value: '1K/mo', icon: 'Users' },
      ],
      year: 2024,
      featured: true,
      views: 890,
    },
    {
      title: 'Fitness Social Network',
      description: 'MVP social platform for fitness enthusiasts with challenges and leaderboards.',
      category: 'Fitness',
      status: 'PUBLISHED' as const,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
      techStack: ['Next.js', 'MongoDB', 'Socket.io', 'AWS S3', 'Redis'],
      metrics: [
        { label: 'Users', value: '15k', icon: 'Users' },
        { label: 'Posts', value: '1M+', icon: 'TrendingUp' },
      ],
      year: 2023,
      featured: true,
      views: 2100,
    },
    {
      title: 'Restaurant Ordering System',
      description: 'Digital menu and online ordering with kitchen management for Bella Cucina.',
      category: 'Restaurant',
      status: 'PUBLISHED' as const,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
      techStack: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
      metrics: [
        { label: 'Orders', value: '1.2k/mo', icon: 'TrendingUp' },
        { label: 'Revenue', value: '+180%', icon: 'Zap' },
      ],
      year: 2024,
      featured: true,
      views: 1200,
    },
  ];

  console.log('Seeding projects...');
  for (const p of projects) {
    await prisma.project.upsert({
      where: { id: p.title.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        id: p.title.toLowerCase().replace(/\s+/g, '-'),
        ...p,
      },
    });
  }

  console.log('Seeding initial admin user...');
  // Note: Password hashing should happen here if you were creating a new user, 
  // but we assume the user already exists from the first step of this task.
  
  console.log('Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
