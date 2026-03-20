'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, Search } from 'lucide-react';
import Link from 'next/link';
import { useProjects, Project } from '@/hooks/use-projects';
import { ProjectCard } from '@/components/project-card';

const CATEGORIES = ['All', 'E-Commerce', 'SaaS', 'Websites', 'API/Backend', 'Personal', 'Recent'];

export default function ProjectsPage() {
  const { projects, isLoading } = useProjects();
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-text-muted hover:text-primary transition-colors">
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </Link>
            <h1 className="text-5xl font-extrabold uppercase tracking-tight">Full Portfolio</h1>
            <p className="text-lg text-text-secondary font-medium max-w-2xl">
              Exploring the intersection of design, performance, and scalability. 
              Showing {filteredProjects.length} projects across various domains.
            </p>
          </div>
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text"
              placeholder="Search projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-surface border border-border rounded-2xl pl-12 pr-6 text-sm font-bold focus:ring-4 focus:ring-primary/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-border/50">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(12); // Reset count on filter
              }}
              className={`px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-surface text-text-secondary hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {cat}
              <span className="ml-2 opacity-50 text-[10px]">
                ({cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {displayedProjects.length === 0 && (
          <div className="py-32 text-center border-2 border-dashed border-border rounded-[3rem] bg-surface/30">
            <p className="text-lg font-extrabold uppercase tracking-widest text-text-muted">No projects found in this category</p>
          </div>
        )}

        {/* Load More */}
        {visibleCount < filteredProjects.length && (
          <div className="flex justify-center pt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-10 py-4 bg-primary text-white rounded-[2rem] text-sm font-extrabold uppercase tracking-widest shadow-xl shadow-primary/30 hover:bg-primary-hover active:scale-95 transition-all"
            >
              Load More Projects ({filteredProjects.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
