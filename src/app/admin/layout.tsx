'use client';

import { ReactNode, useState, useEffect, ComponentType } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Inbox, 
  Mail, 
  Briefcase, 
  BookOpen, 
  Star, 
  BarChart3, 
  FolderOpen, 
  Settings, 
  Users,
  Bell, 
  Search, 
  Menu,
  User,
  Sparkles,
  Moon,
  Sun,
  ChevronDown,
  ExternalLink,
  Github
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

interface MenuItem {
  icon: ComponentType<{ className?: string }>;
  label: string;
  href: string;
  badge?: number;
  badgeColor?: 'red' | 'blue' | 'green';
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Inbox, label: 'Submissions', href: '/admin/submissions', badge: 12, badgeColor: 'red' },
  { icon: Mail, label: 'Subscribers', href: '/admin/subscribers' },
  { icon: Briefcase, label: 'Projects', href: '/admin/projects' },
  { icon: BookOpen, label: 'Blog', href: '/admin/blog' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: FolderOpen, label: 'Media', href: '/admin/media' },
  { icon: Star, label: 'Endorsements', href: '/admin/endorsements', badge: 3, badgeColor: 'blue' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
  { icon: Users, label: 'Users', href: '/admin/users' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Handle Cmd+K shortcut placeholder
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Trigger search
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950 shadow-slate-950/20' : 'bg-gray-50'} text-slate-900 dark:text-slate-100 flex transition-colors duration-200`}>
      {/* Sidebar Navigation */}
      <motion.aside
        animate={{ width: isSidebarCollapsed ? 64 : 256 }}
        className="fixed inset-y-0 left-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 z-50 flex flex-col shadow-sm"
      >
        {/* Sidebar Brand */}
        <div className="h-16 flex items-center px-4 justify-between border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {!isSidebarCollapsed && (
              <span className="font-bold text-lg tracking-tight whitespace-nowrap">Admin</span>
            )}
          </div>
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all relative group ${
                  isActive 
                    ? 'bg-blue-600 text-white border-l-4 border-blue-800' 
                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-200'
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {!isSidebarCollapsed && (
                  <>
                    <span className="font-medium text-[14px] flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${
                        item.badgeColor === 'red' ? 'bg-red-500' : 'bg-blue-500'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {isSidebarCollapsed && (
                  <div className="absolute left-14 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User & Links at Bottom */}
        <div className="p-4 border-t border-gray-100 dark:border-slate-800 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{session?.user?.name || 'Admin'}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Administrator</p>
              </div>
            )}
          </div>
          
          <div className={`flex items-center gap-2 ${isSidebarCollapsed ? 'flex-col' : ''}`}>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-8 h-8 shrink-0 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <button 
              onClick={() => window.open('/', '_blank')}
              className={`h-8 ${isSidebarCollapsed ? 'w-8 shrink-0 p-0' : 'flex-1 px-3'} bg-blue-600 text-white rounded-lg text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-sm`}
              title="Go to Workspace"
            >
              {isSidebarCollapsed ? <ExternalLink className="w-4 h-4" /> : <>Workspace <ExternalLink className="w-3 h-3" /></>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col transition-all duration-300" style={{ paddingLeft: isSidebarCollapsed ? 64 : 256 }}>
        {/* Top Bar Header */}
        <header className="h-16 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-6 bg-white dark:bg-slate-900 sticky top-0 z-40">
          <div className="flex items-center gap-8 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white whitespace-nowrap">Portfolio Admin</span>
            </div>
            
            {/* Center Search Bar */}
            <div className="hidden lg:flex items-center flex-1 max-w-md relative group">
              <Search className="absolute left-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects, blog posts, messages..."
                className="w-full h-10 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg pl-10 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:placeholder:text-slate-500"
              />
              <div className="absolute right-3 flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[10px] text-gray-400 font-sans shadow-sm">⌘</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[10px] text-gray-400 font-sans shadow-sm">K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="h-6 w-px bg-gray-200 dark:border-slate-800" />

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <div className="flex items-center gap-1.5 justify-end">
                  <p className="text-sm font-bold">Admin</p>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 shadow-sm bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Flexible Content Area */}
        <main className="p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
