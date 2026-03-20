'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Eye, 
  Edit3, 
  Trash2, 
  BarChart2,
  Clock,
  Archive,
  Loader2
} from 'lucide-react';
import Image from 'next/image';
import { useProjects, Project } from '@/hooks/use-projects';
import { Modal } from '@/components/ui/modal';
import { ProjectForm } from '@/components/admin/project-form';

export default function ProjectsPage() {
  const { projects, isLoading, error, deleteProject } = useProjects();
  const [activeTab, setActiveTab] = useState<'All' | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);

  const openCreateModal = () => {
    setEditingProject(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.status === activeTab);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Loading amazing projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="p-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl border border-rose-200 dark:border-rose-800">
          <p className="font-bold">Failed to load projects. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio Projects</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage and showcase your best work with detailed analytics.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl">
        <div className="flex bg-gray-50 dark:bg-slate-800 p-1 rounded-xl w-full lg:w-auto overflow-x-auto">
          {['All', 'PUBLISHED', 'DRAFT', 'ARCHIVED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'All' | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-slate-300'
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <div className="relative flex-1 group w-full lg:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search projects..."
            className="w-full h-11 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-16/10 relative overflow-hidden">
                <Image 
                  src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                  <button className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90 border border-white/10">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => openEditModal(project)}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all active:scale-90 border border-white/10"
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-lg ${
                    project.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' :
                    project.status === 'DRAFT' ? 'bg-amber-500/20 text-amber-400 border-amber-500/20' :
                    'bg-slate-500/20 text-slate-400 border-slate-500/20'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{project.category}</p>
                    <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-1">{project.title}</h3>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => deleteProject.mutate(project.id)}
                      className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/10 text-rose-500 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-6 border-t border-gray-50 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold">{project.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase">{new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-gray-50/50 dark:bg-slate-800/20 rounded-4xl border-2 border-dashed border-gray-200 dark:border-slate-800"
        >
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm mb-4">
            <Archive className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No projects found in this category</p>
        </motion.div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingProject ? 'Edit Project' : 'Add New Project'}
      >
        <ProjectForm 
          project={editingProject} 
          onSuccess={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
