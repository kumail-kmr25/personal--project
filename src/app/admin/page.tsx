'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  MessageSquare,
  MessageSquare,
  TrendingUp,
  Clock,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useStats } from '@/hooks/use-stats';

export default function AdminDashboard() {
  const { data: stats, isLoading, error } = useStats();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm animate-pulse">Initializing your workspace...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4 text-rose-500">
        <AlertCircle className="w-12 h-12" />
        <p className="font-bold uppercase tracking-widest text-sm text-gray-500">Failed to load system metrics</p>
      </div>
    );
  }

  const cards = [
    { title: 'Submissions', value: stats.counts.submissions, unread: stats.counts.unreadSubmissions, icon: MessageSquare, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { title: 'Subscribers', value: stats.counts.subscribers, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Projects', value: stats.counts.projects, icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Blog Posts', value: stats.counts.blogPosts, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1 font-bold uppercase tracking-tight">System metrics and recent activity for your portfolio network.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-bold uppercase tracking-tight text-gray-600 dark:text-slate-400">Last 30 days</span>
          <ChevronRight className="w-4 h-4 rotate-90 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-4xl shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className={`p-4 ${card.bg} rounded-2xl`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              {card.unread !== undefined && card.unread > 0 && (
                <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-bold rounded-full shadow-lg shadow-rose-500/30 animate-pulse">
                  {card.unread} NEW
                </span>
              )}
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest relative z-10">{card.title}</p>
            <h3 className="text-3xl font-extrabold mt-1 tracking-tight relative z-10">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-5xl shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-bold uppercase tracking-tight">Submissions Trend</h3>
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/10">
              <TrendingUp className="w-4 h-4" />
              +12.5% Growth
            </div>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.visitorStats}>
                <defs>
                  <linearGradient id="colorViewsMain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }} />
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '16px', fontSize: '12px', fontWeight: 700 }} />
                <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={5} fillOpacity={1} fill="url(#colorViewsMain)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-5xl shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-bold uppercase tracking-tight">Recent Activity</h3>
             <button className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-widest">View All</button>
          </div>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {stats.recentSubscribers.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all rounded-2xl border border-transparent hover:border-gray-100 dark:hover:border-slate-700"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex flex-col flex-1 gap-1">
                  <span className="text-sm font-bold truncate">{sub.email} subscribed</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    {new Date(sub.createdAt).toLocaleDateString()} • Newsletter
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest transition-all border border-gray-200 dark:border-slate-700">
            Quick System Check
          </button>
        </div>
      </div>
    </div>
  );
}
