'use client';

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Download,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useSubscribers } from '@/hooks/use-subscribers';
import { Modal } from '@/components/ui/modal';
import { toast } from 'react-hot-toast';

export default function SubscribersPage() {
  const { subscribers, isLoading, error, deleteSubscriber, updateSubscriber } = useSubscribers();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'ACTIVE' | 'PENDING' | 'UNSUBSCRIBED'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSubscriber, setNewSubscriber] = useState({ name: '', email: '' });

  const handleAddSubscriber = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app we'd have a createSubscriber mutation, 
      // but the API currently has POST /api/subscribers which is an upsert.
      // We can use axios directly or add createSubscriber to useSubscribers hook.
      // Let's use fetch/axios directly for now if hook doesn't have it, 
      // or better, update the hook.
      
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubscriber),
      });

      if (!response.ok) throw new Error('Failed to add subscriber');

      toast.success('Subscriber added successfully');
      setIsAddModalOpen(false);
      setNewSubscriber({ name: '', email: '' });
      // Refresh data
      window.location.reload(); // Quick fix or use queryClient.invalidateQueries
    } catch {
      toast.error('Error adding subscriber');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Status', 'Source', 'Date Joined'];
    const rows = filteredSubscribers.map(s => [
      s.name || 'Anonymous',
      s.email,
      s.status,
      s.source || 'Direct',
      new Date(s.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubscribers = subscribers.filter(s => {
    const matchesSearch = s.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Synchronizing your audience data...</p>
      </div>
    );
  }

  if (error) {
     return (
       <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
         <div className="p-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl border border-rose-200 dark:border-rose-800 flex items-center gap-3">
           <AlertCircle className="w-5 h-5" />
           <p className="font-bold">Failed to load subscribers. Please try again.</p>
         </div>
       </div>
     );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">Email Subscribers</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1 uppercase font-bold tracking-tight">Monitor your newsletter growth and audience engagement.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Subscriber
          </button>
        </div>
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Subscriber">
        <form onSubmit={handleAddSubscriber} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
            <input 
              type="text"
              required
              value={newSubscriber.name}
              onChange={(e) => setNewSubscriber({ ...newSubscriber, name: e.target.value })}
              placeholder="e.g. John Doe"
              className="w-full h-12 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
            <input 
              type="email"
              required
              value={newSubscriber.email}
              onChange={(e) => setNewSubscriber({ ...newSubscriber, email: e.target.value })}
              placeholder="e.g. john@example.com"
              className="w-full h-12 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1 h-12 rounded-2xl font-bold text-sm bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 h-12 rounded-2xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
            >
              Add Subscriber
            </button>
          </div>
        </form>
      </Modal>

      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by email or name..."
            className="w-full h-12 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm outline-none shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto p-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
          {['All', 'ACTIVE', 'PENDING', 'UNSUBSCRIBED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status as 'All' | 'ACTIVE' | 'PENDING' | 'UNSUBSCRIBED')}
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
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50">
                <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Subscriber</th>
                <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Source</th>
                <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Date Joined</th>
                <th className="p-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {filteredSubscribers.map((s) => (
                <tr key={s.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-500/20">
                         {s.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{s.name || 'Anonymous User'}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{s.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 rounded-lg bg-gray-50 dark:bg-slate-800 text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase border border-gray-100 dark:border-slate-700">
                      {s.source || 'Direct'}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-tight">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(s.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      s.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                      s.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                      'bg-slate-500/10 text-slate-500 border-slate-500/20'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => {
                          const newStatus = s.status === 'ACTIVE' ? 'UNSUBSCRIBED' : 'ACTIVE';
                          updateSubscriber.mutate({ id: s.id, status: newStatus });
                          toast.success(`Subscriber ${newStatus === 'ACTIVE' ? 'activated' : 'unsubscribed'}`);
                        }}
                        className={`p-2.5 rounded-xl transition-all shadow-sm ${
                          s.status === 'ACTIVE' 
                            ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-white' 
                            : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500 hover:text-white'
                        }`}
                        title={s.status === 'ACTIVE' ? 'Unsubscribe' : 'Activate'}
                      >
                        {s.status === 'ACTIVE' ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <button 
                         onClick={() => {
                            if (window.confirm('Are you sure you want to delete this subscriber?')) {
                               deleteSubscriber.mutate(s.id);
                               toast.success('Subscriber deleted');
                            }
                         }}
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
      </div>
    </div>
  );
}
