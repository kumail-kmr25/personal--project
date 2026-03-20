'use client';

import type { ComponentType } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  ServerCog,
  ShoppingCart,
  Sparkles,
  Star,
  Sun,
  Twitter,
  UserRound,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { getSiteMetrics } from '@/services/site-metrics';
import { useUiStore } from '@/hooks/use-ui-store';
import { ContactInput, contactSchema } from '@/utils/contact-schema';

type SkillTab = 'frontend' | 'backend' | 'database' | 'devops';

type ProjectCard = {
  title: string;
  category: string;
  image: string;
  stack: string[];
  outcomes: string[];
};

type ServiceCard = {
  id: string;
  number: string;
  name: string;
  detail: string;
  price: string;
  bullets: string[];
  icon: ComponentType<{ className?: string }>;
};

type SkillCard = {
  name: string;
  projects: string;
  score: number;
  level: string;
};

type TestimonialCard = {
  quote: string;
  outcome: string;
  author: string;
  role: string;
};

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const projectCards: ProjectCard[] = [
  {
    title: 'E-Commerce Fashion Platform',
    category: 'E-Commerce',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    stack: ['Next.js', 'TypeScript', 'Stripe'],
    outcomes: ['+300% sales', '1.2s load', '98 score'],
  },
  {
    title: 'SaaS Analytics Dashboard',
    category: 'SaaS',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    stack: ['React', 'PostgreSQL', 'Tailwind'],
    outcomes: ['+180% engagement', '1.5s load', '96 score'],
  },
  {
    title: 'Law Firm Corporate Website',
    category: 'Corporate',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    stack: ['Next.js', 'CMS', 'SEO'],
    outcomes: ['+250% leads', '0.9s load', '99 score'],
  },
  {
    title: 'Healthcare Booking System',
    category: 'Healthcare',
    image:
      'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=1400&q=80',
    stack: ['React', 'Node.js', 'MongoDB'],
    outcomes: ['+400% bookings', '1.1s load', '97 score'],
  },
  {
    title: 'Fitness Social Network',
    category: 'Social',
    image:
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1400&q=80',
    stack: ['Next.js', 'Prisma', 'Redis'],
    outcomes: ['50K+ users', '1.3s load', '95 score'],
  },
  {
    title: 'Restaurant Menu & Ordering',
    category: 'Restaurant',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
    stack: ['React Native', 'GraphQL'],
    outcomes: ['+320% orders', '1.0s load', '98 score'],
  },
];

const services: ServiceCard[] = [
  {
    id: 'web-dev',
    number: '01',
    name: 'Full-Stack Web Development',
    detail:
      'Custom web applications built with modern technologies for optimal performance and scalability.',
    price: '$5,000+',
    bullets: ['Responsive design', 'SEO optimized', 'High performance', 'Secure architecture', 'API integration'],
    icon: Code2,
  },
  {
    id: 'ecommerce',
    number: '02',
    name: 'E-Commerce Solutions',
    detail:
      'Complete online store setup with payment integration, inventory management, and analytics.',
    price: '$8,000+',
    bullets: ['Payment gateways', 'Inventory system', 'Admin dashboard', 'Email automation', 'Analytics tracking'],
    icon: ShoppingCart,
  },
  {
    id: 'api-dev',
    number: '03',
    name: 'API Development & Integration',
    detail: 'RESTful and GraphQL APIs with comprehensive documentation and testing.',
    price: '$3,000+',
    bullets: ['RESTful APIs', 'GraphQL endpoints', 'Authentication', 'Rate limiting', 'Documentation'],
    icon: ServerCog,
  },
  {
    id: 'performance',
    number: '04',
    name: 'Performance Optimization',
    detail: 'Speed up your website with code optimization, caching, and best practices.',
    price: '$2,000+',
    bullets: ['Code splitting', 'Image optimization', 'Caching strategies', 'CDN setup', 'Lighthouse 95+'],
    icon: Zap,
  },
  {
    id: 'consulting',
    number: '05',
    name: 'Technical Consulting',
    detail: 'Expert advice on architecture, technology stack, and development strategy.',
    price: '$100/hr',
    bullets: ['Architecture review', 'Tech stack advice', 'Code review', 'Best practices', '1-on-1 sessions'],
    icon: UserRound,
  },
  {
    id: 'database',
    number: '06',
    name: 'Database Design & Migration',
    detail: 'Efficient database architecture and seamless migration from legacy systems.',
    price: '$2,500+',
    bullets: ['Schema design', 'Data migration', 'Query optimization', 'Backup solutions', 'Security setup'],
    icon: Database,
  },
];

const stackTabs: { id: SkillTab; label: string }[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'DevOps' },
];

const stackSkills: Record<SkillTab, SkillCard[]> = {
  frontend: [
    { name: 'TypeScript', projects: '45 projects', score: 95, level: 'Expert' },
    { name: 'Next.js', projects: '40 projects', score: 95, level: 'Expert' },
    { name: 'React', projects: '50 projects', score: 98, level: 'Expert' },
    { name: 'Tailwind CSS', projects: '48 projects', score: 92, level: 'Expert' },
    { name: 'Framer Motion', projects: '30 projects', score: 85, level: 'Advanced' },
  ],
  backend: [
    { name: 'Node.js', projects: '38 projects', score: 94, level: 'Expert' },
    { name: 'Express', projects: '35 projects', score: 90, level: 'Expert' },
    { name: 'NestJS', projects: '24 projects', score: 86, level: 'Advanced' },
    { name: 'Auth Architecture', projects: '28 projects', score: 91, level: 'Expert' },
    { name: 'API Design', projects: '44 projects', score: 96, level: 'Expert' },
  ],
  database: [
    { name: 'PostgreSQL', projects: '37 projects', score: 94, level: 'Expert' },
    { name: 'Prisma', projects: '33 projects', score: 92, level: 'Expert' },
    { name: 'MongoDB', projects: '21 projects', score: 84, level: 'Advanced' },
    { name: 'Redis', projects: '22 projects', score: 88, level: 'Advanced' },
    { name: 'Data Modeling', projects: '41 projects', score: 95, level: 'Expert' },
  ],
  devops: [
    { name: 'Vercel', projects: '43 projects', score: 96, level: 'Expert' },
    { name: 'Docker', projects: '26 projects', score: 87, level: 'Advanced' },
    { name: 'CI/CD', projects: '32 projects', score: 89, level: 'Advanced' },
    { name: 'Monitoring', projects: '29 projects', score: 88, level: 'Advanced' },
    { name: 'Cloud Costing', projects: '18 projects', score: 82, level: 'Advanced' },
  ],
};
const testimonials: TestimonialCard[] = [
  {
    quote:
      'Working together was a game-changer for our business. Our online sales increased by 300% within the first three months after launch.',
    outcome: '+300% sales',
    author: 'Sarah Johnson',
    role: 'CEO @ FashionCo',
  },
  {
    quote:
      'The analytics dashboard solved exactly what we needed. We saw a major engagement lift immediately after rollout and client feedback was excellent.',
    outcome: '+180% engagement',
    author: 'Michael Chen',
    role: 'Founder @ DataMetrics',
  },
  {
    quote:
      'Our new website now looks premium and ranks well. Qualified inbound leads increased strongly in the first quarter post-launch.',
    outcome: '+250% leads',
    author: 'Jennifer Martinez',
    role: 'Managing Partner @ LegalPro',
  },
  {
    quote:
      'The booking system transformed our patient journey. Appointments increased dramatically and operations became easier for the whole staff.',
    outcome: '+400% bookings',
    author: 'Dr. James Wilson',
    role: 'Medical Director @ HealthFirst',
  },
  {
    quote:
      'We needed a platform that could scale with growth. The delivered architecture handles heavy usage while staying fast and stable.',
    outcome: '50K+ users',
    author: 'Alex Rodriguez',
    role: 'Co-Founder @ FitConnect',
  },
  {
    quote:
      'Inventory and order flows are now seamless. We can serve much higher demand without increasing team size and the ROI has been clear.',
    outcome: '+320% orders',
    author: 'Lisa Thompson',
    role: 'Operations Manager @ RetailPlus',
  },
];

const budgetOptions = [
  'Select budget range',
  '$2,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $20,000',
  '$20,000+',
];

const aboutParagraphs = [
  "I'm a full-stack developer passionate about building web applications that solve real business problems. With 5 years of experience, I've helped startups and established companies increase their revenue through high-performance, scalable solutions.",
  "My journey into development started with curiosity about how things work on the web. That curiosity turned into a career where I solve complex product challenges and keep learning new technologies.",
  "I believe in writing clean, maintainable code and focusing on user experience. Every project is an opportunity to deliver measurable value and long-lasting outcomes.",
];

function SectionBadge({ label }: { label: string }) {
  return (
    <span className='inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary'>
      {label}
    </span>
  );
}

export function HomePage() {
  const darkMode = useUiStore((state) => state.darkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const mobileMenuOpen = useUiStore((state) => state.mobileMenuOpen);
  const setMobileMenuOpen = useUiStore((state) => state.setMobileMenuOpen);

  const [imageFailed, setImageFailed] = useState(false);
  const [activeTab, setActiveTab] = useState<SkillTab>('frontend');

  const { data: metrics, isPending } = useQuery({
    queryKey: ['site-metrics'],
    queryFn: getSiteMetrics,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      budget: budgetOptions[0],
      message: '',
    },
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const onSubmit = async (values: ContactInput) => {
    await new Promise((resolve) => setTimeout(resolve, 650));
    toast.success('Thanks ' + values.firstName + '! Your message was sent.');
    reset();
  };

  const metricCards = metrics?.stats ?? [
    { label: 'Projects Delivered', value: '24+' },
    { label: 'Avg Performance Score', value: '95' },
    { label: 'Client Satisfaction', value: '98%' },
  ];

  const performanceScore =
    metrics?.growth[metrics.growth.length - 1]?.score ??
    Number((metricCards[1]?.value ?? '95').replace(/[^0-9]/g, ''));

  const primaryStats = [
    {
      label: 'Projects Completed',
      value: metricCards[0]?.value ?? '24+',
      icon: BriefcaseBusiness,
    },
    {
      label: 'Revenue Generated',
      value: '$2.3M',
      icon: Sparkles,
    },
    {
      label: 'Client Satisfaction',
      value: metricCards[2]?.value ?? '98%',
      icon: Users,
    },
    {
      label: 'Average Load Time',
      value: '<2s',
      icon: Zap,
    },
  ];

  const activeSkills = stackSkills[activeTab];

  return (
    <div className='min-h-screen bg-background text-text-primary'>
      <nav className='fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl'>
        <div className='mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8'>
          <a href='#home' className='flex items-center gap-2 text-xl font-bold tracking-tight'>
            <span className='text-primary'>&lt;</span>
            <span>kk</span>
            <span className='text-primary'> /&gt;</span>
          </a>
          <div className='hidden items-center gap-8 md:flex'>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className='text-sm font-medium text-text-secondary transition-colors hover:text-text-primary'
              >
                {item.label}
              </a>
            ))}
            <button
              type='button'
              onClick={toggleDarkMode}
              aria-label='Toggle theme'
              className='rounded-full border border-border bg-surface/70 p-2 text-text-secondary transition-colors hover:text-primary'
            >
              {darkMode ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
            </button>
            <a
              href='#contact'
              className='rounded-2xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover'
            >
              Let&apos;s Talk
            </a>
          </div>
          <div className='flex items-center gap-2 md:hidden'>
            <button
              type='button'
              onClick={toggleDarkMode}
              aria-label='Toggle theme'
              className='rounded-xl border border-border bg-surface p-2.5 text-text-secondary'
            >
              {darkMode ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
            </button>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label='Toggle menu'
              className='rounded-xl border border-border bg-surface p-2.5 text-text-secondary'
            >
              {mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className='border-t border-border bg-surface px-6 py-4 md:hidden'>
            <div className='space-y-4'>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className='block text-sm font-medium text-text-secondary transition-colors hover:text-primary'
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className='pt-20'>
        <section id='home' className='relative min-h-[calc(100vh-5rem)] overflow-hidden py-12 lg:py-20'>
          <div className='mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className='z-10 space-y-8'
            >
              <div className='inline-flex items-center gap-2 rounded-full border border-accent-teal/30 bg-accent-teal/10 px-4 py-2 text-sm font-medium text-accent-teal'>
                <span className='relative flex h-2 w-2'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-75'></span>
                  <span className='relative inline-flex h-2 w-2 rounded-full bg-accent-teal'></span>
                </span>
                Full-Stack Developer &middot; Available for Projects
              </div>
              <h1 className='text-5xl font-bold tracking-tight text-text-primary sm:text-7xl'>
                I Build Web Apps <br />
                That Generate <span className='text-accent-purple'>$2M+</span> <br />
                in <span className='text-accent-teal'>Revenue</span>
              </h1>
              <p className='max-w-xl text-lg text-text-secondary sm:text-xl'>
                Specialized in TypeScript, Next.js, and PostgreSQL. I&apos;ve helped 15+ businesses increase their revenue by an average of 180% through high-performance web applications.
              </p>

              <div className='flex items-center gap-6 pt-4'>
                <div className='flex flex-col'>
                  <span className='text-2xl font-bold text-text-primary'>24</span>
                  <span className='text-xs uppercase tracking-wider text-text-muted'>Projects</span>
                </div>
                <div className='h-8 w-px bg-border'></div>
                <div className='flex flex-col'>
                  <span className='text-2xl font-bold text-text-primary'>$2.3M</span>
                  <span className='text-xs uppercase tracking-wider text-text-muted'>Revenue</span>
                </div>
                <div className='h-8 w-px bg-border'></div>
                <div className='flex flex-col'>
                  <span className='text-2xl font-bold text-text-primary'>98%</span>
                  <span className='text-xs uppercase tracking-wider text-text-muted'>Satisfaction</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className='relative'
            >
              <div className='grid grid-cols-2 gap-4 sm:gap-6'>
                <motion.div
                  whileHover={{ y: -5 }}
                  className='flex flex-col justify-between rounded-3xl border border-white/5 bg-[#0f172a]/80 p-6 shadow-xl backdrop-blur-sm'
                >
                  <div className='mb-4 flex items-center justify-between text-accent-teal'>
                    <span className='text-4xl font-bold'>300%</span>
                  </div>
                  <p className='text-sm font-medium uppercase tracking-tight text-text-secondary'>Sales Increase</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className='flex flex-col justify-between rounded-3xl border border-white/5 bg-[#1c1917]/80 p-6 shadow-xl backdrop-blur-sm'
                >
                  <div className='mb-4 flex items-center justify-between text-orange-400'>
                    <span className='text-4xl font-bold'>15+</span>
                  </div>
                  <p className='text-sm font-medium uppercase tracking-tight text-text-secondary'>Happy Clients</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className='flex flex-col justify-between rounded-3xl border border-white/5 bg-[#064e3b]/80 p-6 shadow-xl backdrop-blur-sm'
                >
                  <div className='mb-4 flex items-center justify-between text-accent-teal'>
                    <span className='text-4xl font-bold'>&lt;2s</span>
                  </div>
                  <p className='text-sm font-medium uppercase tracking-tight text-text-secondary'>Load Time</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className='flex flex-col justify-between rounded-3xl border border-white/5 bg-[#1e3a8a]/80 p-6 shadow-xl backdrop-blur-sm'
                >
                  <div className='mb-4 flex items-center justify-between text-blue-400'>
                    <span className='text-4xl font-bold'>98%</span>
                  </div>
                  <p className='text-sm font-medium uppercase tracking-tight text-text-secondary'>Retained</p>
                </motion.div>
              </div>

              <div className='absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl'></div>
              <div className='absolute -right-4 -top-4 -z-10 h-32 w-32 rounded-full bg-accent-purple/20 blur-3xl'></div>
            </motion.div>
          </div>
        </section>

        <section className='bg-[#f7f8fc] py-16'>
          <div className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {primaryStats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className='rounded-3xl border border-[#e7e9f2] bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.04)]'
                  >
                    <div className='mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                      <Icon className='h-5 w-5' />
                    </div>
                    <p className='text-3xl font-bold text-text-primary'>{item.value}</p>
                    <p className='mt-1 text-sm text-text-secondary'>{item.label}</p>
                  </motion.article>
                );
              })}
            </div>

            <div className='mt-4 grid gap-4 lg:grid-cols-2'>
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.08 }}
                className='rounded-3xl border border-[#dfe5f2] bg-gradient-to-br from-[#eef2ff] to-[#ecfeff] p-7'
              >
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.14em] text-text-muted'>Performance</p>
                    <p className='mt-2 text-5xl font-bold text-primary'>
                      {isPending ? '...' : performanceScore}
                      {!isPending && '+'}
                    </p>
                    <p className='mt-1 text-text-secondary'>Lighthouse Score</p>
                  </div>
                  <Zap className='h-6 w-6 text-primary' />
                </div>
                <div className='mt-6 h-2 rounded-full bg-white/80'>
                  <div
                    className='h-full rounded-full bg-primary transition-all duration-700'
                    style={{ width: `${Math.max(35, Math.min(100, performanceScore || 95))}%` }}
                  ></div>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className='rounded-3xl border border-[#dfe5f2] bg-gradient-to-br from-[#ecfeff] to-[#eef2ff] p-7'
              >
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.14em] text-text-muted'>Response Time</p>
                    <p className='mt-2 text-5xl font-bold text-emerald-500'>&lt;2hrs</p>
                    <p className='mt-1 text-text-secondary'>Average Response</p>
                  </div>
                  <Clock3 className='h-6 w-6 text-emerald-500' />
                </div>
                <div className='mt-6 flex gap-2'>
                  {Array.from({ length: 22 }).map((_, index) => (
                    <span
                      key={`bar-${index}`}
                      className={
                        index < 2
                          ? 'h-6 w-3 rounded-full bg-emerald-500'
                          : 'h-6 w-3 rounded-full bg-white/70'
                      }
                    ></span>
                  ))}
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        <section id='work' className='py-24'>
          <div className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
            <div className='max-w-2xl'>
              <SectionBadge label='Portfolio' />
              <h2 className='mt-4'>Featured Projects</h2>
              <p className='mt-3 text-lg text-text-secondary'>
                Real results from real clients. Each project increased revenue and performance.
              </p>
            </div>

            <div className='mt-10 grid gap-6 md:grid-cols-2'>
              {projectCards.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className='group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/30 bg-slate-300'
                >
                  <div
                    className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(15,23,42,0.78), rgba(15,23,42,0.18)), url('${project.image}')`,
                    }}
                  ></div>

                  <div className='absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm'>
                    {project.category}
                  </div>

                  <div className='absolute inset-x-0 bottom-0 p-5 text-white'>
                    <h3 className='text-2xl font-semibold text-white'>{project.title}</h3>
                    <div className='mt-3 flex flex-wrap gap-2'>
                      {project.stack.map((skill) => (
                        <span
                          key={skill}
                          className='rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm'
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className='mt-3 flex flex-wrap gap-2'>
                      {project.outcomes.map((outcome) => (
                        <span
                          key={outcome}
                          className='rounded-full border border-emerald-200/55 bg-emerald-200/20 px-3 py-1 text-xs font-semibold text-emerald-100'
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id='services' className='bg-[#f7f8fc] py-24'>
          <div className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl text-center'>
              <SectionBadge label='Services' />
              <h2 className='mt-4'>How I Can Help Your Business</h2>
              <p className='mt-3 text-lg text-text-secondary'>
                End-to-end product delivery from concept to launch and beyond.
              </p>
            </div>

            <div className='mt-12 grid gap-6 lg:grid-cols-2'>
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.article
                    key={service.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className='relative overflow-hidden rounded-3xl border border-[#e7e9f2] bg-white p-7 shadow-[0_16px_35px_rgba(79,70,229,0.07)]'
                  >
                    <span className='pointer-events-none absolute left-4 top-2 text-[5.5rem] font-semibold leading-none text-primary/8'>
                      {service.number}
                    </span>
                    <div className='relative z-10'>
                      <div className='mb-6 flex items-start justify-between'>
                        <div className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                          <Icon className='h-5 w-5' />
                        </div>
                        <div className='text-right'>
                          <p className='text-xs font-semibold uppercase tracking-[0.14em] text-text-muted'>
                            Starting at
                          </p>
                          <p className='text-3xl font-bold text-primary'>{service.price}</p>
                        </div>
                      </div>

                      <h3 className='text-3xl leading-tight text-text-primary'>{service.name}</h3>
                      <p className='mt-3 text-text-secondary'>{service.detail}</p>

                      <ul className='mt-5 space-y-2'>
                        {service.bullets.map((point) => (
                          <li key={point} className='flex items-center gap-2 text-sm text-text-secondary'>
                            <span className='h-1.5 w-1.5 rounded-full bg-emerald-400'></span>
                            {point}
                          </li>
                        ))}
                      </ul>

                      <button
                        type='button'
                        className='mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white'
                      >
                        Get Started <ArrowRight className='h-4 w-4' />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className='py-24'>
          <div className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl text-center'>
              <h2>Tech Stack & Expertise</h2>
              <p className='mt-3 text-lg text-text-secondary'>
                Technologies I use to build exceptional products.
              </p>
            </div>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
              {stackTabs.map((tab) => (
                <button
                  key={tab.id}
                  type='button'
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    activeTab === tab.id
                      ? 'rounded-2xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/25'
                      : 'rounded-2xl border border-border bg-surface px-6 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:text-primary'
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className='mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
              {activeSkills.map((skill, index) => (
                <motion.article
                  key={activeTab + '-' + skill.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className='rounded-3xl border border-[#e7e9f2] bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.04)]'
                >
                  <div className='flex items-start justify-between'>
                    <div>
                      <h3 className='text-2xl'>{skill.name}</h3>
                      <p className='text-sm text-text-muted'>{skill.projects}</p>
                    </div>
                    <p className='text-4xl font-bold text-primary'>{skill.score}%</p>
                  </div>

                  <div className='mt-5 h-2 rounded-full bg-slate-200'>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className='h-full rounded-full bg-primary'
                    ></motion.div>
                  </div>

                  <span
                    className={
                      skill.level === 'Expert'
                        ? 'mt-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600'
                        : 'mt-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600'
                    }
                  >
                    {skill.level}
                  </span>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id='about' className='bg-[#f7f8fc] py-24'>
          <div className='mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[42%_58%] lg:px-8'>
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className='relative'
            >
              <div className='overflow-hidden rounded-3xl border border-primary/20 bg-white shadow-[0_18px_45px_rgba(79,70,229,0.15)]'>
                {!imageFailed ? (
                  <Image
                    src='/kumail-kmr.jpg'
                    alt='Portrait of kumail kmr'
                    width={900}
                    height={1200}
                    className='aspect-[3/4] w-full object-cover'
                    onError={() => setImageFailed(true)}
                    priority
                  />
                ) : (
                  <div className='flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-primary/20 to-accent-teal/30'>
                    <div className='text-center'>
                      <p className='text-6xl font-bold text-primary'>KK</p>
                      <p className='mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-text-secondary'>
                        kumail kmr
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className='absolute bottom-6 left-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-text-secondary shadow-lg'>
                <span className='h-2 w-2 rounded-full bg-emerald-400'></span>
                Available for new projects
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <SectionBadge label='About Me' />
              <h2 className='mt-4'>Hi, I&apos;m kumail kmr</h2>

              <div className='mt-6 space-y-5 text-lg text-text-secondary'>
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className='mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4'>
                {[
                  { value: '5', label: 'Years' },
                  { value: '50', label: 'Projects' },
                  { value: '30', label: 'Clients' },
                  { value: '2847', label: 'Coffees' },
                ].map((item) => (
                  <article
                    key={item.label}
                    className='rounded-2xl border border-[#e7e9f2] bg-white p-4 text-center shadow-sm'
                  >
                    <p className='text-4xl font-bold text-primary'>{item.value}</p>
                    <p className='mt-1 text-sm text-text-muted'>{item.label}</p>
                  </article>
                ))}
              </div>

              <div className='mt-8 flex flex-wrap items-center gap-3'>
                <a
                  href='#'
                  className='inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover'
                >
                  <Download className='h-4 w-4' /> Download Resume
                </a>
                <a
                  href='#'
                  className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-text-secondary transition-colors hover:text-primary'
                  aria-label='GitHub profile'
                >
                  <Github className='h-4 w-4' />
                </a>
                <a
                  href='#'
                  className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-text-secondary transition-colors hover:text-primary'
                  aria-label='LinkedIn profile'
                >
                  <Linkedin className='h-4 w-4' />
                </a>
                <a
                  href='#'
                  className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-text-secondary transition-colors hover:text-primary'
                  aria-label='Twitter profile'
                >
                  <Twitter className='h-4 w-4' />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className='py-24'>
          <div className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl text-center'>
              <h2>Client Success Stories</h2>
              <p className='mt-3 text-lg text-text-secondary'>
                Do not just take my word for it. These outcomes came directly from recent collaborations.
              </p>
            </div>

            <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {testimonials.map((item, index) => (
                <motion.article
                  key={item.author}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.42, delay: index * 0.03 }}
                  className='rounded-3xl border border-[#e7e9f2] bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]'
                >
                  <div className='mb-4 text-primary'>
                    <Star className='h-5 w-5 fill-primary/20' />
                  </div>
                  <p className='text-sm leading-relaxed text-text-secondary'>{item.quote}</p>
                  <div className='mt-5 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600'>
                    {item.outcome}
                  </div>

                  <div className='mt-6 flex items-center gap-3 border-t border-border/80 pt-4'>
                    <div className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary'>
                      {item.author
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </div>
                    <div>
                      <p className='font-semibold text-text-primary'>{item.author}</p>
                      <p className='text-xs uppercase tracking-[0.12em] text-text-muted'>{item.role}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className='py-8'>
          <div className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
            <div className='rounded-[2rem] bg-gradient-to-r from-primary via-[#5b5ce5] to-accent-teal p-10 text-white shadow-[0_20px_55px_rgba(79,70,229,0.35)] lg:p-14'>
              <div className='mx-auto max-w-3xl text-center'>
                <h2 className='text-balance text-4xl text-white sm:text-5xl'>Ready to Start Your Project?</h2>
                <p className='mt-4 text-lg text-white/90'>
                  Let&apos;s discuss how we can grow your business with a high-performance web application.
                </p>
                <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
                  <a
                    href='#contact'
                    className='inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90'
                  >
                    Get Started <ArrowRight className='h-4 w-4' />
                  </a>
                  <a
                    href='#work'
                    className='inline-flex items-center gap-2 rounded-2xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10'
                  >
                    View All Projects <ExternalLink className='h-4 w-4' />
                  </a>
                </div>
                <div className='mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-white/90'>
                  <span className='rounded-full bg-white/15 px-4 py-1.5'>Free consultation</span>
                  <span className='rounded-full bg-white/15 px-4 py-1.5'>Response in 24 hours</span>
                  <span className='rounded-full bg-white/15 px-4 py-1.5'>No obligation quote</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id='contact' className='bg-[#f7f8fc] py-24'>
          <div className='mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:px-8'>
            <div className='space-y-6'>
              <SectionBadge label='Contact' />
              <h2>Let&apos;s Work Together</h2>
              <p className='text-lg text-text-secondary'>
                Have a project in mind? Share your goals and timeline. You will get practical next steps quickly.
              </p>

              <a
                href='mailto:kumail@example.com'
                className='flex items-center gap-3 rounded-2xl border border-[#e7e9f2] bg-white px-4 py-3 text-sm font-medium text-text-secondary shadow-sm transition hover:border-primary/40'
              >
                <span className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                  <Mail className='h-4 w-4' />
                </span>
                <span>
                  <span className='block text-xs uppercase tracking-[0.12em] text-text-muted'>Email</span>
                  kumail@example.com
                </span>
              </a>

              <a
                href='tel:+923001112233'
                className='flex items-center gap-3 rounded-2xl border border-[#e7e9f2] bg-white px-4 py-3 text-sm font-medium text-text-secondary shadow-sm transition hover:border-primary/40'
              >
                <span className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                  <Phone className='h-4 w-4' />
                </span>
                <span>
                  <span className='block text-xs uppercase tracking-[0.12em] text-text-muted'>Phone</span>
                  +92 300 111 2233
                </span>
              </a>

              <div className='flex items-center gap-3 rounded-2xl border border-[#e7e9f2] bg-white px-4 py-3 text-sm font-medium text-text-secondary shadow-sm'>
                <span className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                  <MapPin className='h-4 w-4' />
                </span>
                <span>
                  <span className='block text-xs uppercase tracking-[0.12em] text-text-muted'>Location</span>
                  Pakistan
                </span>
              </div>

              <div className='inline-flex items-center gap-2 rounded-2xl bg-emerald-100 px-5 py-3 text-sm font-semibold text-emerald-600'>
                <span className='h-2 w-2 rounded-full bg-emerald-400'></span>
                Usually responds within 24 hours
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-5 rounded-3xl border border-[#e7e9f2] bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.08)]'
            >
              <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-sm font-medium'>First Name</label>
                  <input
                    className='w-full rounded-xl border border-border bg-[#f5f6fb] px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2'
                    placeholder='John'
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className='mt-1 text-xs text-error'>{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium'>Last Name</label>
                  <input
                    className='w-full rounded-xl border border-border bg-[#f5f6fb] px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2'
                    placeholder='Doe'
                    {...register('lastName')}
                  />
                  {errors.lastName && <p className='mt-1 text-xs text-error'>{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium'>Email</label>
                <input
                  className='w-full rounded-xl border border-border bg-[#f5f6fb] px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2'
                  placeholder='john@example.com'
                  {...register('email')}
                />
                {errors.email && <p className='mt-1 text-xs text-error'>{errors.email.message}</p>}
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium'>Company (Optional)</label>
                <input
                  className='w-full rounded-xl border border-border bg-[#f5f6fb] px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2'
                  placeholder='Your Company'
                  {...register('company')}
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium'>Budget Range</label>
                <Controller
                  control={control}
                  name='budget'
                  render={({ field }) => (
                    <select
                      {...field}
                      className='w-full rounded-xl border border-border bg-[#f5f6fb] px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2'
                    >
                      {budgetOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.budget && <p className='mt-1 text-xs text-error'>{errors.budget.message}</p>}
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium'>Project Details</label>
                <textarea
                  rows={5}
                  className='w-full rounded-xl border border-border bg-[#f5f6fb] px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2'
                  placeholder='Tell me about your project...'
                  {...register('message')}
                />
                {errors.message && <p className='mt-1 text-xs text-error'>{errors.message.message}</p>}
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60'
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <Send className='h-4 w-4' />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className='border-t border-border/70 bg-background py-16'>
        <div className='mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-4 lg:px-8'>
          <div>
            <a href='#home' className='flex items-center gap-2 text-2xl font-bold tracking-tight'>
              <span className='text-primary'>&lt;</span>
              <span>kk</span>
              <span className='text-primary'> /&gt;</span>
            </a>
            <p className='mt-4 text-text-secondary'>
              Full-stack developer building high-performance web applications that drive business growth.
            </p>
            <div className='mt-5 flex items-center gap-3'>
              <a
                href='#'
                className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-colors hover:text-primary'
                aria-label='GitHub profile'
              >
                <Github className='h-4 w-4' />
              </a>
              <a
                href='#'
                className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-colors hover:text-primary'
                aria-label='LinkedIn profile'
              >
                <Linkedin className='h-4 w-4' />
              </a>
              <a
                href='#'
                className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-colors hover:text-primary'
                aria-label='Twitter profile'
              >
                <Twitter className='h-4 w-4' />
              </a>
              <a
                href='mailto:kumail@example.com'
                className='inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-colors hover:text-primary'
                aria-label='Email kumail'
              >
                <Mail className='h-4 w-4' />
              </a>
            </div>
          </div>

          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.12em] text-text-muted'>Navigation</p>
            <ul className='mt-4 space-y-2 text-text-secondary'>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className='transition-colors hover:text-primary'>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.12em] text-text-muted'>Services</p>
            <ul className='mt-4 space-y-2 text-text-secondary'>
              <li>Web Development</li>
              <li>E-Commerce</li>
              <li>API Development</li>
              <li>Optimization</li>
              <li>Consulting</li>
            </ul>
          </div>

          <div>
            <p className='text-sm font-semibold uppercase tracking-[0.12em] text-text-muted'>Get in Touch</p>
            <p className='mt-4 text-text-secondary'>
              Ready to start your project? Let&apos;s talk about how I can help.
            </p>
            <a
              href='#contact'
              className='mt-5 inline-flex items-center rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover'
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className='mx-auto mt-10 flex w-full max-w-7xl flex-col gap-3 border-t border-border/70 px-6 pt-6 text-sm text-text-muted md:flex-row md:items-center md:justify-between lg:px-8'>
          <p>&copy; {new Date().getFullYear()} kk. All rights reserved.</p>
          <p className='inline-flex items-center gap-2'>
            Made with <CheckCircle2 className='h-4 w-4 text-emerald-500' /> using React, TypeScript &amp;
            Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
