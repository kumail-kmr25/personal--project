'use client';

import { useState } from 'react';
import {
  UserPlus,
  Edit3,
  Shield,
  Trash2,
  Loader2
} from 'lucide-react';
import { useUsers, User } from '@/hooks/use-users';
import { Modal } from '@/components/ui/modal';
import { toast } from 'react-hot-toast';

export default function UsersPage() {
  const { users, isLoading, error, createUser, updateUser, deleteUser } = useUsers();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password?: string;
    role: 'ADMIN' | 'USER';
  }>({ name: '', email: '', password: '', role: 'USER' });

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser.mutateAsync(formData);
      toast.success('Admin invited successfully');
      setIsInviteModalOpen(false);
      setFormData({ name: '', email: '', password: '', role: 'USER' });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      toast.error(error.response?.data?.error || 'Failed to invite user');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      await updateUser.mutateAsync({ 
        id: selectedUser.id, 
        name: formData.name, 
        email: formData.email, 
        role: formData.role 
      });
      toast.success('User updated successfully');
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      toast.error(error.response?.data?.error || 'Failed to update user');
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, password: '', role: user.role });
    setIsEditModalOpen(true);
  };

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
        <button 
          onClick={() => {
            setFormData({ name: '', email: '', password: '', role: 'USER' });
            setIsInviteModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-widest"
        >
          <UserPlus className="w-4 h-4" />
          Invite Admin
        </button>
      </div>

      <Modal 
        isOpen={isInviteModalOpen || isEditModalOpen} 
        onClose={() => {
          setIsInviteModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }} 
        title={isInviteModalOpen ? "Invite New Admin" : "Edit User"}
      >
        <form onSubmit={isInviteModalOpen ? handleInvite : handleUpdate} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
            <input 
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Jane Smith"
              className="w-full h-12 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
            <input 
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. jane@example.com"
              className="w-full h-12 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          {isInviteModalOpen && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Initial Password</label>
              <input 
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="********"
                className="w-full h-12 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'ADMIN' | 'USER' })}
              className="w-full h-12 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              onClick={() => {
                setIsInviteModalOpen(false);
                setIsEditModalOpen(false);
                setSelectedUser(null);
              }}
              className="flex-1 h-12 rounded-2xl font-bold text-sm bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 h-12 rounded-2xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
            >
              {isInviteModalOpen ? 'Create User' : 'Update User'}
            </button>
          </div>
        </form>
      </Modal>

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
                      <button 
                        onClick={() => openEditModal(user)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <Edit3 className="w-4 h-4 text-gray-400" />
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Delete this user?')) {
                            deleteUser.mutate(user.id);
                            toast.success('User deleted');
                          }
                        }}
                        className="p-2 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-rose-500" />
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
