'use client';

import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Code2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sparkles,
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
  Users
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useMemo } from 'react';
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

type SkillTab = 'frontend' | 'backend' | 'database' | 'devops';

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

const stackTabs: { id: SkillTab; label: string }[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'DevOps' },
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
    settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {} as any),
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
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-background text-text-primary transition-colors duration-500'>
      {/* Navigation */}
      <nav className='fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl'>
        <div className='mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8'>
          <a href='#home' className='flex items-center gap-2 text-xl font-bold tracking-tight'>
            <span className='text-primary'>&lt;</span>
            <span>{siteSettings['site_name']?.split(' ')[0] || 'kk'}</span>
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
              className='rounded-xl border border-border bg-surface/70 p-2 text-text-secondary transition-all hover:bg-primary/10 hover:text-primary'
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
            <button onClick={toggleDarkMode} className='rounded-xl border border-border bg-surface p-2.5 text-text-secondary'>
              {darkMode ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className='rounded-xl border border-border bg-surface p-2.5 text-text-secondary'>
               <Menu className='h-5 w-5' />
            </button>
          </div>
        </div>
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
              <h1 className='text-5xl font-extrabold tracking-tight text-text-primary sm:text-7xl leading-[1.1]'>
                I Build Web Apps <br />
                That Scale To <br />
                <span className='text-primary decoration-4 underline underline-offset-8 decoration-primary/20'>Millions</span> of Users
              </h1>
              <p className='max-w-xl text-lg text-text-secondary sm:text-xl font-medium'>
                {siteSettings['site_desc'] || "Specialized in TypeScript, Next.js, and PostgreSQL. I create premium web experiences that convert visitors into loyal customers."}
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
               <div className='grid grid-cols-2 gap-6'>
                  {[
                    { val: '300%', lab: 'Sales Increase', color: 'orange' },
                    { val: '15+', lab: 'Happy Clients', color: 'teal' },
                    { val: '<1.2s', lab: 'Load Time', color: 'blue' },
                    { val: '98%', lab: 'Satisfaction', color: 'purple' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className='p-8 rounded-4xl border border-border/50 bg-surface/50 backdrop-blur-md shadow-2xl space-y-2'
                    >
                       <span className={`text-4xl font-extrabold tracking-tighter text-${stat.color}-500`}>{stat.val}</span>
                       <p className='text-xs font-extrabold uppercase tracking-widest text-text-secondary'>{stat.lab}</p>
                    </motion.div>
                  ))}
               </div>
               <div className='absolute -z-10 bg-primary/10 blur-[120px] rounded-full w-full h-full' />
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id='work' className='py-32 bg-surface/30'>
          <div className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
            <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16'>
              <div className='max-w-xl'>
                 <SectionBadge label='Our Portfolio' />
                 <h2 className='text-4xl font-extrabold mt-4 tracking-tight uppercase'>Featured Projects</h2>
                 <p className='text-lg text-text-secondary mt-4 font-medium'>Real results from architectural excellence.</p>
              </div>
              <button className="px-8 py-3 bg-white dark:bg-slate-900 border border-border rounded-2xl text-xs font-extrabold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                See All Work
              </button>
            </div>

            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className='group relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 border border-border shadow-sm hover:shadow-2xl transition-all duration-500'
                >
                  <div className='aspect-4/3 relative overflow-hidden'>
                     <img 
                      src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'} 
                      alt={project.title} 
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700' 
                     />
                     <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />
                     <div className='absolute top-6 left-6 flex flex-wrap gap-2'>
                        {project.techStack.slice(0, 2).map((tag: string) => (
                          <span key={tag} className='px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-extrabold text-white border border-white/20 uppercase tracking-widest'>
                             {tag}
                          </span>
                        ))}
                     </div>
                  </div>
                  <div className='p-8 space-y-4'>
                     <h3 className='text-xl font-extrabold uppercase tracking-tight'>{project.title}</h3>
                     <p className='text-sm text-text-secondary line-clamp-2 font-medium'>
                        {project.description || "A premium solution built for scale and aesthetic excellence."}
                     </p>
                     <div className='flex items-center justify-between pt-4 border-t border-border/50'>
                        <div className="flex -space-x-2">
                           <div className="w-8 h-8 rounded-full bg-surface border-2 border-white dark:border-slate-800 flex items-center justify-center">
                              <Code2 className="w-3 h-3 text-primary" />
                           </div>
                           <div className="w-8 h-8 rounded-full bg-surface border-2 border-white dark:border-slate-800 flex items-center justify-center">
                              <Sparkles className="w-3 h-3 text-primary" />
                           </div>
                        </div>
                        <a href="#" className='p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all'>
                           <ArrowRight className='w-4 h-4' />
                        </a>
                     </div>
                  </div>
                </motion.article>
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
                 <h2 className='text-5xl font-extrabold mt-6 tracking-tight uppercase'>Premium Solutions</h2>
              </div>
              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
                 {services.map((s, i) => (
                   <motion.div
                    key={s.id}
                    whileHover={{ y: -10 }}
                    className='p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-border shadow-sm hover:shadow-xl transition-all'
                   >
                      <div className='w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8'>
                         <s.icon className='w-7 h-7' />
                      </div>
                      <h3 className='text-xl font-extrabold uppercase tracking-tight mb-4'>{s.name}</h3>
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
                   <h2 className='text-4xl font-extrabold mt-4 tracking-tight uppercase'>Latest from the Blog</h2>
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
                     className='flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border shadow-sm overflow-hidden'
                   >
                      <div className='aspect-video relative overflow-hidden'>
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
                         <h3 className='text-xl font-extrabold uppercase leading-tight mb-4 transition-colors'>{post.title}</h3>
                         <p className='text-sm text-text-secondary line-clamp-2 mb-6 font-medium'>{post.excerpt}</p>
                         <div className="mt-auto pt-6 border-t border-border/50">
                            <a href={`/blog/${post.slug}`} className='text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 hover:text-primary'>
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
                 </div>

                 <div className='bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-border shadow-2xl'>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                       <div className='grid grid-cols-2 gap-6'>
                          <div className='space-y-2'>
                             <label className='text-[10px] font-extrabold uppercase tracking-widest text-text-muted ml-1'>First Name</label>
                             <input 
                                {...register('firstName')}
                                className='w-full h-14 bg-surface border border-border rounded-2xl px-6 font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all' 
                                placeholder='John' 
                             />
                          </div>
                          <div className='space-y-2'>
                             <label className='text-[10px] font-extrabold uppercase tracking-widest text-text-muted ml-1'>Last Name</label>
                             <input 
                                {...register('lastName')}
                                className='w-full h-14 bg-surface border border-border rounded-2xl px-6 font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all' 
                                placeholder='Doe' 
                             />
                          </div>
                       </div>
                       <div className='space-y-2'>
                          <label className='text-[10px] font-extrabold uppercase tracking-widest text-text-muted ml-1'>Email Address</label>
                          <input 
                             {...register('email')}
                             className='w-full h-14 bg-surface border border-border rounded-2xl px-6 font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all' 
                             placeholder='john@company.com' 
                          />
                       </div>
                       <div className='space-y-2'>
                          <label className='text-[10px] font-extrabold uppercase tracking-widest text-text-muted ml-1'>Budget Range</label>
                          <select 
                             {...register('budget')}
                             className='w-full h-14 bg-surface border border-border rounded-2xl px-6 font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer'
                          >
                             {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                       </div>
                       <div className='space-y-2'>
                          <label className='text-[10px] font-extrabold uppercase tracking-widest text-text-muted ml-1'>Message</label>
                          <textarea 
                             {...register('message')}
                             rows={4}
                             className='w-full bg-surface border border-border rounded-2xl p-6 font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none' 
                             placeholder='Tell me about your vision...' 
                          />
                       </div>
                       <button 
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full h-16 bg-primary text-white rounded-4xl font-extrabold uppercase tracking-widest shadow-xl shadow-primary/30 hover:bg-primary-hover transition-all active:scale-95 disabled:opacity-50'
                       >
                          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Start Project'}
                       </button>
                    </form>
                 </div>
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
                  href={siteSettings[s.key] || '#'} 
                  className='w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm'
                 >
                    <s.icon className='w-5 h-5' />
                 </a>
               ))}
            </div>
         </div>
      </footer>
    </div>
  );
}
