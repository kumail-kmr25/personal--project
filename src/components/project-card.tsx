'use client';

import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  Github, 
  TrendingUp, 
  Zap, 
  Star, 
  Users, 
  Clock, 
  Target, 
  LineChart, 
  Trophy, 
  CheckCircle, 
  Cpu, 
  Workflow,
  type LucideIcon 
} from 'lucide-react';
import { Project } from '@/hooks/use-projects';
import Image from 'next/image';

const iconMap: Record<string, LucideIcon> = {
  TrendingUp, Zap, Star, Users, Clock, Target, LineChart, Trophy, CheckCircle, Cpu, Workflow
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const metrics = project.metrics || [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-4xl overflow-hidden bg-white dark:bg-slate-900 border border-border shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Section */}
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'}
          alt={project.title}
          width={800}
          height={450}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-extrabold text-white border border-white/20 uppercase tracking-widest">
            {project.category}
          </span>
        </div>

        {/* Hover CTAs */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.links?.external && (
            <a
              href={project.links.external as string}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary text-white rounded-xl hover:scale-110 transition-transform"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github as string}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-md text-white rounded-xl border border-white/20 hover:scale-110 transition-transform"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-extrabold uppercase tracking-tight">{project.title}</h3>
          <span className="text-[10px] font-bold text-text-muted">{project.year}</span>
        </div>
        
        <p className="text-sm text-text-secondary line-clamp-2 font-medium leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md uppercase tracking-wider">
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          {metrics.map((metric, i) => {
            const Icon = iconMap[metric.icon] || Star;
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/5 rounded-lg text-primary">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-text-muted leading-none mb-1">
                    {metric.label}
                  </p>
                  <p className="text-sm font-bold text-text-primary leading-none">
                    {metric.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Primary CTA */}
        <div className="pt-4">
          <a
            href={`/projects/${project.id}`}
            className="flex items-center justify-between w-full p-4 bg-surface rounded-2xl border border-border group/btn hover:bg-primary hover:border-primary transition-all duration-300"
          >
            <span className="text-[10px] font-extrabold uppercase tracking-widest group-hover/btn:text-white transition-colors">
              View Case Study
            </span>
            <ArrowRight className="w-4 h-4 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
