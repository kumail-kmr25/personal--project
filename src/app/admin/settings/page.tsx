'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Eye, 
  Save,
  Twitter,
  Github,
  Linkedin,
  Mail,
  Loader2,
  Shield // Retained Shield as it's used in the tabs array
} from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'General' | 'Security' | 'Social' | 'Appearance'>('General');
  const { settings, isLoading, updateSetting } = useSettings();
  const [localSettings, setLocalSettings] = useState<Record<string, string | number | boolean>>({});

  useEffect(() => {
    if (settings.length > 0 && Object.keys(localSettings).length === 0) {
      const settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
      setLocalSettings(settingsMap);
    }
    // Only run when settings change and localSettings is empty
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const handleChange = (key: string, value: string | number | boolean) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    try {
      await updateSetting.mutateAsync({ key, value: localSettings[key] });
      toast.success(`${key.replace(/_/g, ' ')} updated successfully`);
    } catch {
      toast.error('Failed to update setting');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Loading configurations...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'General', icon: Globe, label: 'General' },
    { id: 'Security', icon: Shield, label: 'Security' },
    { id: 'Social', icon: Mail, label: 'Social Links' },
    { id: 'Appearance', icon: Eye, label: 'Appearance' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">System Settings</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1 uppercase font-bold tracking-tight">Configure your portfolio&apos;s global behavior and appearance.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-widest">
          <Save className="w-4 h-4" />
          Save All Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'General' | 'Security' | 'Social' | 'Appearance')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-gray-500 hover:bg-white dark:hover:bg-slate-800 hover:text-gray-700 dark:hover:text-slate-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-4xl p-8 shadow-sm">
          <AnimatePresence mode="wait">
            {activeTab === 'General' && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                   <h2 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2 underline decoration-blue-500 decoration-4 underline-offset-8">
                      General Configuration
                   </h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Site Name</label>
                        <div className="relative group">
                           <input 
                              type="text" 
                              value={(localSettings['site_name'] as string) || ''}
                              onChange={(e) => handleChange('site_name', e.target.value)}
                              onBlur={() => handleSave('site_name')}
                              className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                           />
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Globe className="w-4 h-4 text-blue-500" />
                           </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Admin Email</label>
                        <input 
                          type="email" 
                          value={(localSettings['admin_email'] as string) || ''}
                          onChange={(e) => handleChange('admin_email', e.target.value)}
                          onBlur={() => handleSave('admin_email')}
                          className="w-full h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                        />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Site Description</label>
                      <textarea 
                        rows={3}
                        value={(localSettings['site_desc'] as string) || ''}
                        onChange={(e) => handleChange('site_desc', e.target.value)}
                        onBlur={() => handleSave('site_desc')}
                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-medium"
                      />
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Social' && (
              <motion.div
                key="social"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                   <h2 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2 underline decoration-blue-500 decoration-4 underline-offset-8">
                      Connected Platforms
                   </h2>
                   
                   <div className="grid grid-cols-1 gap-4 pt-4">
                      {[
                        { key: 'twitter', icon: Twitter, label: 'Twitter / X', color: 'blue' },
                        { key: 'github', icon: Github, label: 'GitHub', color: 'slate' },
                        { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'indigo' },
                      ].map((platform) => (
                        <div key={platform.key} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 group">
                           <div className={`p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-all`}>
                              <platform.icon className="w-5 h-5" />
                           </div>
                           <div className="flex-1">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{platform.label}</p>
                              <input 
                                type="text"
                                placeholder={`https://${platform.key}.com/username`}
                                value={(localSettings[platform.key] as string) || ''}
                                onChange={(e) => handleChange(platform.key, e.target.value)}
                                onBlur={() => handleSave(platform.key)}
                                className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 outline-none placeholder:text-gray-300"
                              />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Appearance' && (
               <motion.div
                key="appearance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                   <h2 className="text-lg font-bold uppercase tracking-tight flex items-center gap-2 underline decoration-blue-500 decoration-4 underline-offset-8">
                      Visual Identity
                   </h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      <div className="space-y-4">
                         <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Primary Brand Color</label>
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl shadow-lg border-4 border-white dark:border-slate-800" style={{ backgroundColor: (localSettings['brand_color'] as string) || '#3b82f6' }} />
                            <input 
                              type="text" 
                              value={(localSettings['brand_color'] as string) || '#3b82f6'}
                              onChange={(e) => handleChange('brand_color', e.target.value)}
                               onBlur={() => handleSave('brand_color')}
                              className="flex-1 h-12 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 text-sm font-mono focus:ring-4 focus:ring-blue-500/10 outline-none"
                            />
                         </div>
                      </div>
                      
                      <div className="space-y-4">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Theme Mode</label>
                        <div className="flex p-1 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
                           <button 
                            onClick={() => { handleChange('theme', 'light'); handleSave('theme'); }}
                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${localSettings['theme'] === 'light' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-gray-400'}`}
                           >Light</button>
                           <button 
                            onClick={() => { handleChange('theme', 'dark'); handleSave('theme'); }}
                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${localSettings['theme'] === 'dark' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-gray-400'}`}
                           >Dark</button>
                           <button 
                            onClick={() => { handleChange('theme', 'system'); handleSave('theme'); }}
                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${localSettings['theme'] === 'system' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-gray-400'}`}
                           >System</button>
                        </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
