'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  ExternalLink,
  Github,
  Check,
  Star,
  Award,
} from 'lucide-react';
import type { CaseStudy } from '@/data/case-studies';
import { TestimonialsMarquee } from '@/components/testimonials-marquee';

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

export function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden mb-8">
            <Image
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-sm font-bold uppercase tracking-widest">
                {caseStudy.industry}
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {caseStudy.title}
          </h1>
          <p className="text-xl text-text-secondary mb-8">{caseStudy.subtitle}</p>
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-semibold">Timeline:</span>
              <span>{caseStudy.timeline}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="font-semibold">Budget:</span>
              <span>{caseStudy.budget}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold">Team:</span>
              <span>{caseStudy.teamSize}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {caseStudy.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors"
              >
                View Live Site
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {caseStudy.githubUrl && (
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-bold hover:bg-surface transition-colors"
              >
                View GitHub
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.section>

        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
            {caseStudy.overview}
          </p>
          <p className="text-text-secondary mb-6">{caseStudy.clientNeeds}</p>
          <p className="text-text-secondary mb-6">{caseStudy.whyChoseMe}</p>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Project Goals</h3>
            <ul className="space-y-2">
              {caseStudy.goals.map((goal, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-text-secondary">
            <strong>Target Audience:</strong> {caseStudy.targetAudience}
          </p>
        </motion.section>

        {/* Challenge */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">The Problem We Needed to Solve</h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            {caseStudy.challenge.description}
          </p>
          <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl mb-8">
            <p className="font-bold text-red-600 dark:text-red-400">
              CRITICAL ISSUE: {caseStudy.challenge.criticalIssue}
            </p>
          </div>
          <h3 className="font-semibold mb-4">Before Metrics</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(caseStudy.challenge.beforeMetrics).map(([key, value]) => (
              <div
                key={key}
                className="p-4 bg-surface border border-border rounded-xl flex justify-between"
              >
                <span className="text-text-secondary">{key}</span>
                <span className="font-bold">{value}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Solution */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">How We Solved It</h2>
          <p className="text-text-secondary mb-8">{caseStudy.solution.strategy}</p>
          <div className="space-y-8">
            {caseStudy.solution.features.map((feature, i) => (
              <div key={i} className="p-6 bg-surface border border-border rounded-2xl">
                <h3 className="text-lg font-bold mb-2">{feature.name}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {caseStudy.solution.technicalHighlights.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Results */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Measurable Impact</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {caseStudy.results.beforeAfter.map((r, i) => (
              <div
                key={i}
                className="p-6 bg-surface border border-border rounded-2xl text-center"
              >
                <p className="text-sm text-text-muted mb-2">{r.metric}</p>
                <p className="text-text-secondary line-through text-sm">{r.before}</p>
                <p className="text-xl font-bold text-primary">{r.after}</p>
                <p className="text-emerald-600 font-semibold">{r.change}</p>
              </div>
            ))}
          </div>
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-6">
            <h3 className="font-bold mb-4">ROI Calculation</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <span className="text-text-muted">Investment:</span>{' '}
                {caseStudy.results.roi.investment}
              </div>
              <div>
                <span className="text-text-muted">Annual Impact:</span>{' '}
                {caseStudy.results.roi.annualImpact}
              </div>
              <div>
                <span className="text-text-muted">Break-even:</span>{' '}
                {caseStudy.results.roi.breakEven}
              </div>
              <div>
                <span className="text-text-muted">First Year ROI:</span>{' '}
                {caseStudy.results.roi.firstYearROI}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {caseStudy.results.qualitative.map((q, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl text-sm"
              >
                <Award className="w-4 h-4 text-primary" />
                {q}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Testimonial */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 p-8 bg-surface border border-border rounded-3xl"
        >
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <blockquote className="text-xl font-medium italic text-text-primary mb-6 leading-relaxed">
            &ldquo;{caseStudy.testimonial.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            <Image
              src={caseStudy.testimonial.photo}
              alt={caseStudy.testimonial.name}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div>
              <p className="font-bold">{caseStudy.testimonial.name}</p>
              <p className="text-text-secondary text-sm">
                {caseStudy.testimonial.role} @ {caseStudy.testimonial.company}
              </p>
              <p className="text-text-muted text-xs">{caseStudy.testimonial.date}</p>
            </div>
            <span className="ml-auto px-3 py-1 bg-emerald-500/20 text-emerald-600 rounded-full text-xs font-bold flex items-center gap-1">
              <Check className="w-3 h-3" />
              Verified Client
            </span>
          </div>
        </motion.section>

        {/* Lessons Learned */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">What I Learned from This Project</h2>
          <p className="text-text-secondary leading-relaxed">{caseStudy.lessonsLearned}</p>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 bg-primary/10 border border-primary/20 rounded-3xl text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Ready for Similar Results?</h2>
          <p className="text-text-secondary mb-6">
            Let&apos;s discuss how I can help transform your business
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors"
            >
              Start Your Project
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-4 border border-border rounded-xl font-bold hover:bg-surface transition-colors"
            >
              Schedule Free Consultation
            </Link>
          </div>
          <p className="text-sm text-text-muted mt-4">
            Free consultation • No obligation • Response in 24 hours
          </p>
        </motion.section>

        <TestimonialsMarquee />
      </div>
    </div>
  );
}
