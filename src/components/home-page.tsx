'use client';

import type { ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Code2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Star,
  Sun,
  Twitter,
  Github,
  Linkedin,
  BookOpen,
  Calendar,
  Loader2,
  Zap,
  ShoppingCart,
  UserRound,
  LayoutDashboard,
  DollarSign,
  MessageSquare,
  Send
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getSiteMetrics } from '@/services/site-metrics';
import { useUiStore } from '@/hooks/use-ui-store';
import { ContactInput, contactSchema } from '@/utils/contact-schema';
import { useProjects } from '@/hooks/use-projects';
import { useBlog } from '@/hooks/use-blog';
import { useEndorsements } from '@/hooks/use-endorsements';
import { useSettings } from '@/hooks/use-settings';
import { ProjectCard } from './project-card';
import Link from 'next/link';


type ServiceCard = {
  id: string;
  number: string;
  name: string;
  detail: string;
  price: string;
  bullets: string[];
  icon: ComponentType<{ className?: string }>;
};


const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Writing', href: '#blog' },
  { label: 'Contact', href: '#contact' },
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
    id: 'performance',
    number: '03',
    name: 'Performance Optimization',
    detail: 'Speed up your website with code optimization, caching, and best practices.',
    price: '$2,000+',
    bullets: ['Code splitting', 'Image optimization', 'Caching strategies', 'CDN setup', 'Lighthouse 95+'],
    icon: Zap,
  },
  {
    id: 'consulting',
    number: '04',
    name: 'Technical Consulting',
    detail: 'Expert advice on architecture, technology stack, and development strategy.',
    price: '$100/hr',
    bullets: ['Architecture review', 'Tech stack advice', 'Code review', 'Best practices', '1-on-1 sessions'],
    icon: UserRound,
  },
];


const budgetOptions = [
  'Select budget range',
  '$2,000 - $5,000 (USD)',
  '$5,000 - $10,000 (USD)',
  '$10,000 - $20,000 (USD)',
  '$20,000+ (USD)',
  '5,000-12,000 INR',
  '20,000-40,000 INR',
  '60,000-1,20,000 INR',
  '1,50,000+ INR',
  'Discuss later',
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

  // Real Data Hooks
  const { projects } = useProjects();
  const { posts } = useBlog();
  const { endorsements } = useEndorsements();
  const { settings } = useSettings();

  const approvedEndorsements = useMemo(() => 
    endorsements.filter(e => e.status === 'APPROVED'), 
    [endorsements]
  );

  const siteSettings = useMemo(() => 
    settings.reduce((acc, s) => ({ ...acc, [s.key]: String(s.value) }), {} as Record<string, string>),
    [settings]
  );

  const { data: metrics } = useQuery({
    queryKey: ['site-metrics'],
    queryFn: getSiteMetrics,
  });

  const metricCards = useMemo(() => metrics?.stats ?? [
    { label: 'Projects Delivered', value: projects.length > 0 ? `${projects.length}+` : '24+' },
    { label: 'Avg Performance', value: '98%' },
    { label: 'Happy Clients', value: '15+' },
  ], [metrics, projects.length]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
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
    if (root) {
      if (darkMode) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  }, [darkMode]);

  const onSubmit = async (values: ContactInput) => {
    try {
      await axios.post('/api/submissions', {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        message: `${values.message}\n\nBudget: ${values.budget}\nCompany: ${values.company}`,
      });
      toast.success('Thanks ' + values.firstName + '! Your message was received.');
      reset();
    } catch {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-background text-text-primary transition-colors duration-500'>
      {/* Navigation */}
      <nav className='fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl'>
        <div className='mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8'>
          <a href='#home' className='flex items-center gap-2 text-xl font-bold tracking-tight text-text-primary'>
            <span className='text-primary'>&lt;</span>
            <span>{String(siteSettings['site_name'] || 'kk').split(' ')[0]}</span>
            <span className='text-primary'> /&gt;</span>
          </a>
          <div className='hidden items-center gap-8 md:flex'>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className='text-xs font-extrabold uppercase tracking-widest text-text-secondary transition-colors hover:text-primary'>
                {item.label}
              </a>
            ))}
            <button
              type='button'
              onClick={toggleDarkMode}
              className='rounded-xl border border-border bg-surface/70 p-2 text-text-primary transition-all hover:bg-primary/10 hover:text-primary'
            >
              {darkMode ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
            </button>
            <a
              href='#contact'
              className='rounded-2xl bg-primary px-6 py-2.5 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover active:scale-95'
            >
              Let&apos;s Talk
            </a>
          </div>
          <div className='flex items-center gap-2 md:hidden'>
            <button onClick={toggleDarkMode} className='rounded-xl border border-border bg-surface p-2.5 text-text-primary'>
              {darkMode ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='rounded-xl border border-border bg-surface p-2.5 text-text-primary'>
               <Menu className='h-5 w-5' />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-2xl md:hidden'
            >
              <div className='flex items-center justify-between px-6 h-20 border-b border-border/60'>
                <a href='#home' onClick={() => setMobileMenuOpen(false)} className='flex items-center gap-2 text-xl font-bold tracking-tight text-text-primary'>
                  <span className='text-primary'>&lt;</span>
                  <span>{String(siteSettings['site_name'] || 'kk').split(' ')[0]}</span>
                  <span className='text-primary'> /&gt;</span>
                </a>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className='rounded-xl border border-border bg-surface p-2.5 text-text-primary'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>
              
              <div className='flex-1 overflow-y-auto py-12 px-6 flex flex-col items-center gap-8'>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className='text-2xl font-extrabold uppercase tracking-widest text-text-primary hover:text-primary transition-colors'
                  >
                    {item.label}
                  </motion.a>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className='pt-8 border-t border-border w-full flex flex-col items-center gap-8'
                >
                  <button
                    type='button'
                    onClick={toggleDarkMode}
                    className='flex items-center gap-3 rounded-2xl border border-border bg-surface/70 px-8 py-4 text-sm font-extrabold uppercase tracking-widest text-text-primary transition-all hover:bg-primary/10 hover:text-primary'
                  >
                    {darkMode ? <><Sun className='h-5 w-5' /> Light Mode</> : <><Moon className='h-5 w-5' /> Dark Mode</>}
                  </button>
                  
                  <a
                    href='#contact'
                    onClick={() => setMobileMenuOpen(false)}
                    className='w-full text-center rounded-2xl bg-primary px-8 py-5 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover active:scale-95'
                  >
                    Let&apos;s Talk
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className='pt-20'>
        {/* HERO */}
        <section id='home' className='relative min-h-[calc(100vh-5rem)] overflow-hidden flex items-center py-12 lg:py-20'>
          <div className='mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8'>
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className='z-10 space-y-8'
            >
              <div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-primary'>
                <span className='relative flex h-2 w-2'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
                  <span className='relative inline-flex h-2 w-2 rounded-full bg-primary'></span>
                </span>
                Full-Stack Developer &middot; Available for Projects
              </div>
              <h1 className='text-4xl font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl leading-[1.2] sm:leading-[1.1]'>
                I Help Businesses <br className="hidden sm:block" />
                <span className='text-primary decoration-4 underline underline-offset-8 decoration-primary/20 block sm:inline mt-2 sm:mt-0'>3x Their Online Revenue</span> <br className="hidden sm:block" />
                <span className='text-2xl sm:text-4xl lg:text-5xl text-text-secondary mt-4 block leading-tight tracking-tighter'>Through High-Performance Web Apps</span>
              </h1>
              <p className='max-w-xl text-lg text-text-secondary sm:text-xl font-medium'>
                {siteSettings['site_desc'] || "Full-Stack Developer specializing in Next.js, TypeScript, and PostgreSQL. I've helped 30+ businesses increase their online revenue by an average of 180%."}
              </p>

              <div className='flex items-center gap-8 pt-4'>
                 {metricCards.map(m => (
                    <div key={m.label} className="flex flex-col">
                       <span className="text-3xl font-extrabold text-text-primary tracking-tighter">{m.value}</span>
                       <span className="text-[10px] uppercase font-extrabold tracking-widest text-text-muted">{m.label}</span>
                    </div>
                 ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className='relative'
            >
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                  {[
                    { val: '300%', lab: 'Sales Increase', color: 'orange' },
                    { val: '15+', lab: 'Happy Clients', color: 'teal' },
                    { val: '<1.2s', lab: 'Load Time', color: 'blue' },
                    { val: '98%', lab: 'Satisfaction', color: 'purple' },
                  ].map((stat, statIndex) => (
                    <motion.div
                      key={statIndex}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className='p-6 sm:p-8 rounded-3xl sm:rounded-4xl border border-border/50 bg-surface/50 backdrop-blur-md shadow-2xl space-y-1 sm:space-y-2'
                    >
                       <span className={`text-3xl sm:text-4xl font-extrabold tracking-tighter ${stat.color === 'orange' ? 'text-orange-500' : stat.color === 'teal' ? 'text-teal-500' : stat.color === 'blue' ? 'text-blue-500' : 'text-purple-500'}`}>{stat.val}</span>
                       <p className='text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-text-secondary'>{stat.lab}</p>
                    </motion.div>
                  ))}
                </div>
                <div className='absolute -z-10 bg-primary/10 blur-[80px] sm:blur-[120px] rounded-full w-full h-full' />
            </motion.div>
          </div>
        </section>


        {/* ABOUT SECTION */}
        <section id="about" className="py-32 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left: Image with Orbiting Icons */}
              <div className="order-2 lg:order-1 relative mx-auto mt-10 lg:mt-0 w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="https://github.com/kumail-kmr25.png" 
                    alt="Kumail - Full-Stack Developer"
                    className="w-full h-full object-cover rounded-full shadow-2xl border-8 border-surface aspect-square"
                  />
                  {/* Years of Experience Badge */}
                  <div className="absolute -bottom-4 right-4 bg-primary text-white p-6 rounded-3xl shadow-xl z-20 border border-primary-hover">
                    <div className="text-3xl font-extrabold">2+ Years</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest mt-1">Building Web Apps</div>
                  </div>
                </motion.div>

                {/* Orbiting Icons */}
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }} 
                  className="absolute inset-[-20px] sm:inset-[-40px] rounded-full border border-dashed border-primary/20 pointer-events-none hidden xs:block"
                >
                  {[
                    { Icon: Code2, pos: 'top-[-20px] left-1/2 -translate-x-1/2' },
                    { Icon: Zap, pos: 'bottom-[-20px] left-1/2 -translate-x-1/2' },
                    { Icon: LayoutDashboard, pos: 'left-[-20px] top-1/2 -translate-y-1/2' },
                    { Icon: Star, pos: 'right-[-20px] top-1/2 -translate-y-1/2' },
                  ].map((item, i) => (
                    <div key={i} className={`absolute ${item.pos}`}>
                      <motion.div 
                        animate={{ rotate: -360 }} 
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }} 
                        className="w-12 h-12 bg-surface border border-border rounded-2xl flex items-center justify-center shadow-lg pointer-events-auto"
                      >
                         <item.Icon className="w-5 h-5 text-primary" />
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Right: Content */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-primary mb-6">
                  <span className='relative flex h-2 w-2'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
                    <span className='relative inline-flex h-2 w-2 rounded-full bg-primary'></span>
                  </span>
                  About Me
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight text-text-primary leading-[1.1]">
                  Hi, I&apos;m Kumail
                </h2>
                
                <p className="text-lg text-text-secondary sm:text-xl font-medium mb-6 leading-relaxed">
                  A full-stack developer who turns complex business challenges into 
                  elegant, high-performing web applications. I specialize in 
                  <strong className="text-text-primary px-1">Next.js, TypeScript, and PostgreSQL</strong>, and I&apos;ve 
                  helped <strong className="text-primary px-1">30+ businesses</strong> increase their online revenue 
                  by an average of <strong className="text-primary px-1">180%</strong>.
                </p>
                
                <p className="text-base text-text-muted mb-6 leading-relaxed">
                  My journey into development started during school when I built my 
                  first website for a local business. Seeing how technology could 
                  directly impact their revenue sparked something in me. Since then, 
                  I&apos;ve worked with startups, agencies, and enterprises, delivering 
                  <strong className="text-text-primary px-1">24+ projects</strong> that have collectively generated 
                  millions in revenue for my clients.
                </p>
                
                <p className="text-base text-text-muted mb-10 leading-relaxed">
                  I believe great software is about more than just code — it&apos;s about 
                  understanding the business problem, designing intuitive user 
                  experiences, and building scalable solutions that grow with the 
                  company. That&apos;s why I focus on not just meeting requirements, but 
                  exceeding expectations and delivering <strong className="text-text-primary px-1">measurable results</strong>.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  <div className="p-4 rounded-3xl border border-border/50 bg-surface/50 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-2xl font-extrabold text-primary">18+</div>
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Projects Completed</div>
                  </div>
                  <div className="p-4 rounded-3xl border border-border/50 bg-surface/50 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-2xl font-extrabold text-primary">18+</div>
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Happy Clients</div>
                  </div>
                  <div className="p-4 rounded-3xl border border-border/50 bg-surface/50 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-2xl font-extrabold text-primary">$2.3M+</div>
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Revenue Gen</div>
                  </div>
                  <div className="p-4 rounded-3xl border border-border/50 bg-surface/50 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-2xl font-extrabold text-primary">98%</div>
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Satisfaction</div>
                  </div>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-wrap gap-4 items-center">
                  <a 
                    href="#contact" 
                    className="rounded-2xl bg-primary px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary-hover active:scale-95 transition-all"
                  >
                    Let&apos;s Work Together <ArrowRight className="w-4 h-4" />
                  </a>
                  <a 
                    href="/resume.pdf" 
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-surface border border-border px-8 py-4 text-xs font-extrabold uppercase tracking-widest text-text-secondary hover:text-primary hover:border-primary/50 transition-all flex items-center gap-2 active:scale-95"
                  >
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id='work' className='py-32 bg-surface/30'>
          <div className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16'>
              <div className='max-w-xl'>
                 <SectionBadge label='Our Portfolio' />
                 <h2 className='text-4xl font-extrabold mt-4 tracking-tight uppercase text-text-primary'>Featured Projects</h2>
                 <p className='text-lg text-text-secondary mt-4 font-medium'>Real results from architectural excellence.</p>
              </div>
              <Link href="/projects" className="px-8 py-3 bg-surface border border-border rounded-2xl text-xs font-extrabold uppercase tracking-widest text-text-primary hover:bg-primary hover:text-white transition-all">
                See All Work
              </Link>
            </div>

            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {projects.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {projects.length === 0 && (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-4xl bg-surface/30">
                   <BriefcaseBusiness className="w-12 h-12 text-border mx-auto mb-4" />
                   <p className="text-sm font-extrabold uppercase tracking-widest text-text-muted">Portfolio items being added!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SERVICES [STATIC BUT CONSISTENT] */}
        <section id='services' className='py-32'>
           <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <div className='text-center mb-20'>
                 <SectionBadge label='My Expertise' />
                 <h2 className='text-5xl font-extrabold mt-6 tracking-tight uppercase text-text-primary'>Premium Solutions</h2>
              </div>
              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
                 {services.map((s) => (
                   <motion.div
                    key={s.id}
                    whileHover={{ y: -10 }}
                    className='p-10 rounded-[2.5rem] bg-surface border border-border shadow-sm hover:shadow-xl transition-all'
                   >
                      <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8'>
                         <s.icon className='w-7 h-7' />
                      </div>
                      <h3 className='text-xl font-extrabold uppercase tracking-tight mb-4 text-text-primary'>{s.name}</h3>
                      <p className='text-sm text-text-secondary mb-8 font-medium leading-relaxed'>{s.detail}</p>
                      <ul className='space-y-3'>
                         {s.bullets.map(b => (
                           <li key={b} className='flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-text-muted'>
                              <div className='w-1.5 h-1.5 rounded-full bg-primary' />
                              {b}
                           </li>
                         ))}
                      </ul>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* BLOG SECTION */}
        <section id='blog' className='py-32 overflow-hidden bg-surface/20'>
           <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16'>
                <div>
                   <SectionBadge label='Insights' />
                   <h2 className='text-4xl font-extrabold mt-4 tracking-tight uppercase text-text-primary'>Latest from the Blog</h2>
                </div>
                <button className='text-sm font-extrabold uppercase tracking-widest text-primary flex items-center gap-2 group'>
                   Explore all articles <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </button>
              </div>

              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                 {posts.slice(0, 3).map((post) => (
                   <motion.article
                     key={post.id}
                     whileHover={{ y: -10 }}
                     className='flex flex-col bg-surface rounded-[2.5rem] border border-border shadow-sm overflow-hidden'
                   >
                      <div className='aspect-video relative overflow-hidden'>
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src={post.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'} alt={post.title} className='w-full h-full object-cover' />
                         <div className='absolute top-4 right-4'>
                            <span className='px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-[9px] font-extrabold text-white uppercase tracking-widest'>
                                {post.category}
                            </span>
                         </div>
                      </div>
                      <div className='p-8 flex-1 flex flex-col'>
                         <div className='flex items-center gap-3 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4'>
                            <Calendar className="w-3 h-3" />
                            {new Date(post.createdAt).toLocaleDateString()}
                            <span>&middot;</span>
                            <Clock3 className="w-3 h-3" />
                            5 min read
                         </div>
                         <h3 className='text-xl font-extrabold uppercase leading-tight mb-4 transition-colors text-text-primary'>{post.title}</h3>
                         <p className='text-sm text-text-secondary line-clamp-2 mb-6 font-medium'>{post.excerpt}</p>
                         <div className="mt-auto pt-6 border-t border-border/50">
                            <a href={`/blog/${post.slug}`} className='text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 text-text-primary hover:text-primary'>
                                Read Article <ArrowRight className="w-3 h-3" />
                            </a>
                         </div>
                      </div>
                   </motion.article>
                 ))}
                 {posts.length === 0 && (
                   <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-4xl bg-surface/30">
                      <BookOpen className="w-12 h-12 text-border mx-auto mb-4" />
                      <p className="text-sm font-extrabold uppercase tracking-widest text-text-muted">New articles coming soon!</p>
                   </div>
                 )}
              </div>
           </div>
        </section>

        {/* ENDORSEMENTS */}
        <section id='about' className='py-32 bg-slate-950 text-white overflow-hidden relative'>
           <div className='absolute inset-0 opacity-10 bg-[url("https://www.transparenttextures.com/patterns/carbon-fibre.png")]' />
           <div className='mx-auto max-w-7xl px-6 lg:px-8 relative z-10'>
              <div className='text-center mb-20'>
                 <span className='px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-white/10'>Testimonials</span>
                 <h2 className='text-5xl font-extrabold mt-6 tracking-tight uppercase'>Validated Expert</h2>
              </div>

              <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                 {approvedEndorsements.map((e) => (
                    <motion.div
                      key={e.id}
                      whileHover={{ scale: 1.02 }}
                      className='p-10 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col'
                    >
                       <div className='flex gap-1 mb-6'>
                          {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                       </div>
                       <p className='text-lg font-medium italic mb-8 flex-1 leading-relaxed opacity-90'>
                          &quot;{e.content || "An exceptional talent with a deep understanding of modern web architecture."}&quot;
                       </p>
                       <div className='flex items-center gap-4'>
                          <div className='w-12 h-12 rounded-2xl bg-primary flex items-center justify-center font-extrabold text-white'>
                             {e.name.charAt(0)}
                          </div>
                          <div>
                             <p className='font-extrabold uppercase tracking-tight'>{e.name}</p>
                             <p className='text-[10px] font-bold uppercase tracking-widest text-white/50'>{e.role} @ {e.company}</p>
                          </div>
                       </div>
                    </motion.div>
                 ))}
                 {approvedEndorsements.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                       <p className="text-xl font-medium opacity-50">More testimonials coming soon.</p>
                    </div>
                 )}
              </div>
           </div>
        </section>

        {/* CONTACT */}
        <section id='contact' className='py-32'>
           <div className='mx-auto max-w-7xl px-6 lg:px-8'>
              <div className='grid lg:grid-cols-2 gap-20'>
                 <div className='space-y-8'>
                    <div>
                       <SectionBadge label='Contact' />
                       <h2 className='text-5xl font-extrabold mt-6 tracking-tight uppercase'>Let&apos;s build something <br /> <span className='text-primary decoration-primary decoration-8 underline-offset-12 underline'>Legendary</span></h2>
                       <p className='text-xl text-text-secondary mt-8 font-medium leading-relaxed max-w-md'>
                          Have a project in mind? Let&apos;s talk about how we can achieve your business goals together.
                       </p>
                    </div>

                    <div className='space-y-6'>
                       <div className='flex items-center gap-6 group'>
                          <div className='w-14 h-14 rounded-2xl bg-surface/50 border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all'>
                             <Mail className='w-6 h-6' />
                          </div>
                          <div>
                             <p className='text-[10px] font-extrabold uppercase tracking-widest text-text-muted'>Email</p>
                             <p className='text-lg font-extrabold'>{siteSettings['admin_email'] || 'kumailkmr.dev@gmail.com'}</p>
                          </div>
                       </div>
                       <div className='flex items-center gap-6 group'>
                          <div className='w-14 h-14 rounded-2xl bg-surface/50 border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all'>
                             <MapPin className='w-6 h-6' />
                          </div>
                          <div>
                             <p className='text-[10px] font-extrabold uppercase tracking-widest text-text-muted'>Location</p>
                             <p className='text-lg font-extrabold'>Kashmir</p>
                          </div>
                       </div>
                    </div>
                 </div>                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className='relative p-10 sm:p-12 rounded-[3.5rem] bg-surface/50 backdrop-blur-2xl border border-border/80 shadow-2xl overflow-hidden'
                  >
                     <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none' />
                     <form onSubmit={handleSubmit(onSubmit)} className='relative z-10 space-y-8'>
                        
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                           {/* First Name Field */}
                           <motion.div 
                             initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                             className='group relative'
                           >
                              <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors'>
                                 <UserRound className='w-5 h-5' />
                              </div>
                              <input 
                                 {...register('firstName')}
                                 id="firstName"
                                 className='peer w-full h-16 bg-background/50 border border-border rounded-3xl pl-14 pr-6 pt-5 font-bold focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all placeholder-transparent' 
                                 placeholder='John' 
                              />
                              <label htmlFor="firstName" className='absolute left-14 top-5 text-[10px] font-extrabold uppercase tracking-widest text-text-muted transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-xs peer-placeholder-shown:text-text-secondary peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-primary cursor-text pointer-events-none'>
                                 First Name
                              </label>
                           </motion.div>

                           {/* Last Name Field */}
                           <motion.div 
                             initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                             className='group relative'
                           >
                              <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors'>
                                 <UserRound className='w-5 h-5 opacity-70' />
                              </div>
                              <input 
                                 {...register('lastName')}
                                 id="lastName"
                                 className='peer w-full h-16 bg-background/50 border border-border rounded-3xl pl-14 pr-6 pt-5 font-bold focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all placeholder-transparent' 
                                 placeholder='Doe' 
                              />
                              <label htmlFor="lastName" className='absolute left-14 top-5 text-[10px] font-extrabold uppercase tracking-widest text-text-muted transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-xs peer-placeholder-shown:text-text-secondary peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-primary cursor-text pointer-events-none'>
                                 Last Name
                              </label>
                           </motion.div>
                        </div>

                        {/* Email Field */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                          className='group relative'
                        >
                           <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors'>
                              <Mail className='w-5 h-5' />
                           </div>
                           <input 
                              {...register('email')}
                              id="email"
                              type="email"
                              className='peer w-full h-16 bg-background/50 border border-border rounded-3xl pl-14 pr-6 pt-5 font-bold focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all placeholder-transparent' 
                              placeholder='john@company.com' 
                           />
                           <label htmlFor="email" className='absolute left-14 top-5 text-[10px] font-extrabold uppercase tracking-widest text-text-muted transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-xs peer-placeholder-shown:text-text-secondary peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-primary cursor-text pointer-events-none'>
                              Email Address
                           </label>
                        </motion.div>

                        {/* Budget Range Field */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                          className='group relative'
                        >
                           <div className='absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-text-muted group-focus-within:text-primary transition-colors'>
                              <DollarSign className='w-5 h-5' />
                           </div>
                           <select 
                              {...register('budget')}
                              id="budget"
                              className='peer w-full h-16 bg-background/50 border border-border rounded-3xl pl-14 pr-6 pt-5 font-bold focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all appearance-none cursor-pointer'
                           >
                              {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
                           </select>
                           <label htmlFor="budget" className='absolute left-14 top-2 text-[9px] font-extrabold uppercase tracking-widest text-text-muted transition-all peer-focus:text-primary cursor-pointer pointer-events-none'>
                              Budget Range
                           </label>
                           {/* Custom Chevron for select */}
                           <div className='absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-text-muted'>
                              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                           </div>
                        </motion.div>

                        {/* Message Field */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                          className='group relative'
                        >
                           <div className='absolute top-6 left-0 pl-5 flex items-start pointer-events-none text-text-muted group-focus-within:text-primary transition-colors'>
                              <MessageSquare className='w-5 h-5' />
                           </div>
                           <textarea 
                              {...register('message')}
                              id="message"
                              rows={4}
                              className='peer w-full bg-background/50 border border-border rounded-3xl pl-14 pr-6 pt-8 pb-4 font-bold focus:bg-background focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all resize-none placeholder-transparent' 
                              placeholder='Tell me about your vision...' 
                           />
                           <label htmlFor="message" className='absolute left-14 top-6 text-[10px] font-extrabold uppercase tracking-widest text-text-muted transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:text-xs peer-placeholder-shown:text-text-secondary peer-focus:top-3 peer-focus:text-[9px] peer-focus:text-primary cursor-text pointer-events-none'>
                              Project Details
                           </label>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
                           <button 
                              type='submit'
                              disabled={isSubmitting}
                              className='group relative w-full h-16 bg-gradient-to-r from-primary to-blue-600 text-white rounded-3xl font-extrabold uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 overflow-hidden'
                           >
                              <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0' />
                              <span className='relative z-10 flex items-center justify-center gap-3'>
                                 {isSubmitting ? (
                                    <>
                                       <Loader2 className="w-5 h-5 animate-spin" /> 
                                       Processing...
                                    </>
                                 ) : (
                                    <>
                                       <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                       Send Proposal
                                    </>
                                 )}
                              </span>
                           </button>
                        </motion.div>

                     </form>
                  </motion.div>
              </div>
           </div>
        </section>
      </main>

      <footer className='py-20 border-t border-border/50'>
         <div className='mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8'>
            <div className='flex flex-col items-center md:items-start'>
               <a href='#home' className='text-3xl font-extrabold tracking-tighter mb-4'>
                 {siteSettings['site_name'] || 'KK Portfolio'}
               </a>
               <p className='text-sm font-medium text-text-muted'>&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className='flex gap-4'>
               {[
                 { key: 'twitter', icon: Twitter },
                 { key: 'github', icon: Github },
                 { key: 'linkedin', icon: Linkedin },
               ].map(s => (
                 <a 
                  key={s.key} 
                  href={String(siteSettings[s.key] || '#')} 
                  className='w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm'
                 >
                    <s.icon className='w-5 h-5' />
                 </a>
               ))}
               <div className="w-px h-8 bg-border/50 mx-2 hidden sm:block" />
               <Link 
                 href="/admin" 
                 className='w-12 h-12 sm:w-auto sm:px-6 rounded-2xl bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm gap-2 uppercase text-[10px] font-extrabold tracking-widest'
                 title="Admin Workspace"
               >
                 <LayoutDashboard className='w-4 h-4' />
                 <span className="hidden sm:inline">Admin</span>
               </Link>
            </div>
         </div>
      </footer>
    </div>
  );
}
