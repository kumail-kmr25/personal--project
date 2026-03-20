'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  User, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useEndorsements } from '@/hooks/use-endorsements';
import toast from 'react-hot-toast';

export default function EndorsementsPage() {
  const { endorsements, isLoading, error, updateStatus } = useEndorsements();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEndorsements = endorsements.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusUpdate = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Endorsement ${status.toLowerCase()} successfully`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Reviewing credentials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="p-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl border border-rose-200 dark:border-rose-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="font-bold">Failed to load endorsements. Please try again.</p>
        </div>
      </div>
    );
  }

  const pendingCount = endorsements.filter(e => e.status === 'PENDING').length;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">Skill Endorsements</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1 uppercase font-bold tracking-tight">Review and approve validations from your professional network.</p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-6 py-2.5 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-xl text-sm font-bold shadow-sm border border-blue-500/10 animate-bounce">
            <Star className="w-4 h-4 fill-current" />
            <span className="uppercase tracking-widest">{pendingCount} PENDING REVIEWS</span>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-4xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-50 dark:border-slate-800">
           <div className="relative group max-w-md">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
             <input 
               type="text" 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               placeholder="Search endorsers or companies..."
               className="w-full h-11 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl pl-12 pr-4 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
             />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-slate-800 bg-gray-50/10 dark:bg-slate-800/10">
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Endorser</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Skills Endorsed</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              <AnimatePresence>
                {filteredEndorsements.map((endorsement) => (
                  <motion.tr 
                    layout
                    key={endorsement.id} 
                    className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                           <User className="w-5 h-5 text-gray-400" />
                        </div>
                         <div className="flex flex-col">
                            <span className="text-sm font-extrabold uppercase tracking-tight">{endorsement.name}</span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{endorsement.role} @ {endorsement.company}</span>
                            <p className="text-xs text-gray-400 mt-2 line-clamp-2 italic">&quot;{endorsement.content}&quot;</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-wrap gap-2">
                         {endorsement.skills.map(skill => (
                           <span key={skill} className="px-2 py-0.5 rounded-md bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 text-[9px] font-extrabold uppercase border border-blue-500/10 tracking-tighter">
                             {skill}
                           </span>
                         ))}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-extrabold border uppercase tracking-widest ${
                        endorsement.status === 'APPROVED' ? 'bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 border-emerald-500/10' :
                        endorsement.status === 'PENDING' ? 'bg-amber-50 dark:bg-amber-900/10 text-amber-600 border-amber-500/10' :
                        'bg-rose-50 dark:bg-rose-900/10 text-rose-600 border-rose-500/10'
                      }`}>
                        {endorsement.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {new Date(endorsement.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                         {endorsement.status === 'PENDING' && (
                           <>
                             <button 
                               onClick={() => handleStatusUpdate(endorsement.id, 'APPROVED')}
                               className="p-2.5 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm border border-emerald-500/10"
                             >
                                <CheckCircle2 className="w-4 h-4" />
                             </button>
                             <button 
                               onClick={() => handleStatusUpdate(endorsement.id, 'REJECTED')}
                               className="p-2.5 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm border border-rose-500/10"
                             >
                                <XCircle className="w-4 h-4" />
                             </button>
                           </>
                         )}
                         <button className="p-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 transition-all border border-gray-100 dark:border-slate-700">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                         </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {filteredEndorsements.length === 0 && (
         <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-4xl bg-gray-50/10 dark:bg-slate-800/10">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl shadow-sm mb-4">
               <Star className="w-8 h-8 text-gray-200" />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No endorsements found</p>
         </div>
      )}
    </div>
  );
}
