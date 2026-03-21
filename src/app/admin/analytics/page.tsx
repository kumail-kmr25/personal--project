'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  ArrowUpRight, 
  Calendar,
  ChevronDown,
  Download,
  Loader2,
  AlertCircle,
  Briefcase,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useStats } from '@/hooks/use-stats';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function AnalyticsPage() {
  const { data: stats, isLoading, error } = useStats();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Analyzing your performance...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <AlertCircle className="w-10 h-10 text-rose-500" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Failed to load analytics</p>
      </div>
    );
  }

  const metrics = [
    { label: 'Total Projects', value: stats.counts.projects, change: '+1', icon: Briefcase, color: 'text-blue-500' },
    { label: 'Email Subscribers', value: stats.counts.subscribers, change: '+12%', icon: Users, color: 'text-emerald-500' },
    { label: 'Contact Submissions', value: stats.counts.submissions, change: '+5', icon: MessageSquare, color: 'text-amber-500' },
    { label: 'Blog Posts', value: stats.counts.blogPosts, change: '0', icon: BookOpen, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">Analytics & Insights</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1 uppercase font-bold tracking-tight">Real-time performance monitoring of your portfolio ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-bold uppercase tracking-tight">Last 7 days</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <button className="p-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            <Download className="w-4.5 h-4.5 text-gray-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-4xl shadow-sm hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-2xl">
                 <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full text-emerald-500 bg-emerald-500/10 border border-emerald-500/10">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {metric.change}
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{metric.label}</p>
            <h3 className="text-3xl font-extrabold mt-1 tracking-tight">{metric.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[3rem] shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-bold uppercase tracking-tight">Traffic Overview</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                <span className="text-[10px] uppercase font-bold text-gray-400">Total Views</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                <span className="text-[10px] uppercase font-bold text-gray-400">Unique</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.visitorStats}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#e2e8f0" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)', padding: '16px', fontWeight: 700, fontSize: '12px' }} 
                />
                <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="unique" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorUnique)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-10 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[3rem] shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-bold mb-10 w-full uppercase tracking-tight">Traffic Sources</h3>
          <div className="flex-1 flex flex-col justify-center items-center w-full">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Direct', value: 400 },
                      { name: 'Social', value: 300 },
                      { name: 'Search', value: 300 },
                      { name: 'Referral', value: 200 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={10}
                    dataKey="value"
                  >
                    {[0, 1, 2, 3].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-6 w-full mt-10">
              {[
                { name: 'Direct', color: COLORS[0], percent: '35%' },
                { name: 'Social', color: COLORS[1], percent: '25%' },
                { name: 'Search', color: COLORS[2], percent: '22%' },
                { name: 'Referral', color: COLORS[3], percent: '18%' },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase leading-none">{item.name}</span>
                    <span className="text-sm font-extrabold mt-1">{item.percent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
