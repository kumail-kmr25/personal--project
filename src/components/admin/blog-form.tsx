'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BlogPost, useBlog } from '@/hooks/use-blog';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(2, 'Slug is required'),
  category: z.string().min(2, 'Category is required'),
  status: z.enum(['PUBLISHED', 'DRAFT', 'SCHEDULED']),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  image: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  post?: BlogPost;
  onSuccess: () => void;
}

export function BlogForm({ post, onSuccess }: BlogFormProps) {
  const { createPost, updatePost } = useBlog();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, control } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: post ? {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      category: post.category || '',
      status: post.status,
      image: post.image || '',
    } : {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      status: 'DRAFT',
      category: 'TUTORIAL',
    }
  });

  const titleValue = useWatch({
    control,
    name: 'title',
  });
  
  const generateSlug = () => {
    if (titleValue) {
      const slug = titleValue
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setValue('slug', slug);
    }
  };

  const onSubmit = async (data: BlogFormValues) => {
    try {
      if (post) {
        await updatePost.mutateAsync({ id: post.id, ...data });
        toast.success('Post updated successfully');
      } else {
        await createPost.mutateAsync(data);
        toast.success('Post created successfully');
      }
      onSuccess();
    } catch {
      // toast is handled in useBlog hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Post Title</label>
          <input 
            {...register('title')}
            className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="e.g. My Coding Journey"
          />
          {errors.title && <p className="text-rose-500 text-[10px] font-bold ml-1 uppercase">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Slug</label>
             <button type="button" onClick={generateSlug} className="text-[8px] font-bold text-blue-500 uppercase hover:underline">Auto Generate</button>
          </div>
          <input 
            {...register('slug')}
            className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="my-coding-journey"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Category</label>
          <input 
            {...register('category')}
            className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="e.g. Development, Design"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Status</label>
          <select 
            {...register('status')}
            className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="SCHEDULED">Scheduled</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Excerpt (Short Summary)</label>
        <textarea 
          {...register('excerpt')}
          rows={2}
          className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-medium"
          placeholder="A brief introduction to the post..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Content (Markdown supported)</label>
        <textarea 
          {...register('content')}
          rows={10}
          className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-mono"
          placeholder="# Use markdown here..."
        />
        {errors.content && <p className="text-rose-500 text-[10px] font-bold ml-1 uppercase">{errors.content.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex items-center gap-2 px-10 py-3.5 bg-blue-600 text-white rounded-2xl text-[10px] font-extrabold uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {post ? 'Update Post' : 'Publish Story'}
        </button>
      </div>
    </form>
  );
}
