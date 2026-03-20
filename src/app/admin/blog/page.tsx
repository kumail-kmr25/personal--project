'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Calendar,
  BarChart2,
  FileText,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useBlog, BlogPost } from '@/hooks/use-blog';
import { Modal } from '@/components/ui/modal';
import { BlogForm } from '@/components/admin/blog-form';

export default function BlogPage() {
  const { posts, isLoading, error, deletePost } = useBlog();
  const [activeTab, setActiveTab] = useState<'All' | 'PUBLISHED' | 'DRAFT' | 'SCHEDULED'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(undefined);

  const openCreateModal = () => {
    setEditingPost(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const filteredPosts = posts.filter(post => {
    const matchesTab = activeTab === 'All' || post.status === activeTab;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesTab && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Gathering your stories...</p>
      </div>
    );
  }

  if (error) {
     return (
       <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
         <div className="p-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl border border-rose-200 dark:border-rose-800 flex items-center gap-3">
           <AlertCircle className="w-5 h-5" />
           <p className="font-bold">Failed to load blog posts. Please try again.</p>
         </div>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">Blog Management</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1 uppercase font-bold tracking-tight">Create, edit, and schedule posts for your portfolio blog.</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Create New Post
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-2 p-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-x-auto">
          {['All', 'PUBLISHED', 'DRAFT', 'SCHEDULED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or content..."
            className="w-full h-12 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.div
              layout
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold uppercase tracking-widest rounded-lg border border-blue-500/10">
                    {post.category || 'Tech'}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      post.status === 'PUBLISHED' ? 'bg-emerald-500' : 
                      post.status === 'DRAFT' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-[9px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-tighter">{post.status}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-2">{post.title}</h3>
                <p className="mt-3 text-sm text-gray-500 dark:text-slate-400 line-clamp-3 font-medium">{post.excerpt}</p>
              </div>

              <div className="px-6 py-5 bg-gray-50/50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{post.views.toLocaleString()} VIEWS</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                   <button 
                      onClick={() => openEditModal(post)}
                      className="p-2 bg-white dark:bg-slate-900 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-gray-200 dark:border-slate-700"
                   >
                      <Edit3 className="w-4 h-4" />
                   </button>
                   <button 
                      onClick={() => deletePost.mutate(post.id)}
                      className="p-2 bg-white dark:bg-slate-900 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-gray-200 dark:border-slate-700"
                    >
                      <Trash2 className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPosts.length === 0 && (
         <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-4xl bg-gray-50/30 dark:bg-slate-800/20">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl shadow-sm mb-4">
               <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No blog posts found</p>
         </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingPost ? 'Edit Blog Post' : 'Create New Post'}
      >
        <BlogForm 
          post={editingPost} 
          onSuccess={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
