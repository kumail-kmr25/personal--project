'use client';

import {
  UserPlus,
  MoreVertical,
  Edit3,
  Shield,
  Trash2,
  Loader2
} from 'lucide-react';
import { useUsers } from '@/hooks/use-users';

export default function UsersPage() {
  const { users, isLoading, error } = useUsers();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="p-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl border border-rose-200 dark:border-rose-800 flex items-center gap-3">
          <Shield className="w-5 h-5" />
          <p className="font-bold">Failed to load users. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">User Management</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1 uppercase font-bold tracking-tight">Manage admin access and team roles.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-widest">
          <UserPlus className="w-4 h-4" />
          Invite Admin
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-4xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-slate-800">
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">User</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Role</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Joined</th>
                <th className="px-8 py-5 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-tight">{user.name}</p>
                        <p className="text-[11px] text-gray-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                      user.role === 'ADMIN'
                        ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-600 border-blue-500/10'
                        : 'bg-gray-50 dark:bg-slate-800 text-gray-500 border-gray-100 dark:border-slate-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(user.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                        <Edit3 className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-xl transition-colors">
                        <Trash2 className="w-4 h-4 text-rose-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
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
