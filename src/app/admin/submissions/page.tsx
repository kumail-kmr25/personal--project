'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useSubmissions, Submission } from '@/hooks/use-submissions';

export default function SubmissionsPage() {
  const { submissions, isLoading, error, updateSubmission, deleteSubmission } = useSubmissions();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'NEW' | 'READ' | 'DONE'>('All');

  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Fetching your latest inquiries...</p>
      </div>
    );
  }

  if (error) {
     return (
       <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
         <div className="p-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl border border-rose-200 dark:border-rose-800 flex items-center gap-3">
           <AlertCircle className="w-5 h-5" />
           <p className="font-bold">Failed to load submissions. Please try again.</p>
         </div>
       </div>
     );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">Contact Submissions</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1 uppercase font-bold tracking-tight">Manage project inquiries and messages from potential clients.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search responses..."
            className="w-full h-12 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto p-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
          {['All', 'NEW', 'READ', 'DONE'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                statusFilter === status 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-slate-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-4xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto text-nowrap">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
                <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  <input type="checkbox" className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Client / Contact</th>
                <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Project Inquiry</th>
                <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date Received</th>
                <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {filteredSubmissions.map((s) => (
                <tr key={s.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-6">
                    <input type="checkbox" className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{s.name}</span>
                      <span className="text-xs text-gray-400 font-medium">{s.email}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tight">{s.projectType || 'General Inquiry'}</span>
                      <p className="text-xs font-medium text-gray-500 dark:text-slate-400 line-clamp-1 max-w-[200px]">{s.message}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(s.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      s.status === 'NEW' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                      s.status === 'READ' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                      'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => updateSubmission.mutate({ id: s.id, status: 'DONE' })}
                        className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteSubmission.mutate(s.id)}
                        className="p-2.5 bg-rose-500/10 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-50 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30 dark:bg-slate-800/30">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing <span className="text-slate-800 dark:text-white">{filteredSubmissions.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl border border-gray-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all text-gray-400">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              {[1].map(n => (
                <button key={n} className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${n === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'hover:bg-gray-100 dark:hover:bg-slate-800'}`}>
                  {n}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-xl border border-gray-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all text-gray-400">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
