'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Project, useProjects } from '@/hooks/use-projects';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const projectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(2, 'Category is required'),
  status: z.enum(['PUBLISHED', 'DRAFT', 'ARCHIVED']),
  image: z.string().optional(),
  links: z.object({
    github: z.string().url().optional().or(z.literal('')),
    external: z.string().url().optional().or(z.literal('')),
  }).optional(),
  techStack: z.string().min(1, 'Tech stack is required'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
  onSuccess: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const { createProject, updateProject } = useProjects();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || '',
      description: project?.description || '',
      category: project?.category || '',
      status: project?.status || 'DRAFT',
      image: project?.image || '',
      links: {
        github: project?.links?.github || '',
        external: project?.links?.external || '',
      },
      techStack: (project?.techStack || []).join(', '),
    }
  });

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      const payload = {
        ...data,
        techStack: data.techStack.split(',').map(s => s.trim()).filter(Boolean),
      };
      
      if (project) {
        await updateProject.mutateAsync({ id: project.id, ...payload });
        toast.success('Project updated successfully');
      } else {
        await createProject.mutateAsync(payload);
        toast.success('Project created successfully');
      }
      onSuccess();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Project Title</label>
          <input 
            {...register('title')}
            className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="e.g. Portfolio v2"
          />
          {errors.title && <p className="text-rose-500 text-[10px] font-bold ml-1 uppercase">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
          <input 
            {...register('category')}
            className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="e.g. SaaS, Mobile"
          />
          {errors.category && <p className="text-rose-500 text-[10px] font-bold ml-1 uppercase">{errors.category.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Status</label>
          <select 
            {...register('status')}
            className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Hero Image URL</label>
          <input 
            {...register('image')}
            className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
        <textarea 
          {...register('description')}
          rows={4}
          className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
          placeholder="Describe your project..."
        />
        {errors.description && <p className="text-rose-500 text-[10px] font-bold ml-1 uppercase">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Tech Stack (comma separated)</label>
        <input 
          {...register('techStack')}
          className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          placeholder="Next.js, TypeScript, Tailwind"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50 dark:border-slate-800">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">GitHub URL</label>
          <input 
            {...register('links.github')}
            className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Live Demo URL</label>
          <input 
            {...register('links.external')}
            className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl text-xs font-extrabold uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {project ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}
