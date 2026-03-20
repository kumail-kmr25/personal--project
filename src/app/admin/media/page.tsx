'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Search, 
  Grid, 
  List as ListIcon, 
  FolderPlus, 
  Trash2, 
  Filter, 
  Download, 
  FileText, 
  Image as ImageIcon,
  File,
  Video,
  CheckSquare,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useMedia } from '@/hooks/use-media';

export default function MediaPage() {
  const { media, isLoading, error, deleteMedia } = useMedia();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium animate-pulse">Scanning assets...</p>
      </div>
    );
  }

  if (error) {
     return (
       <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
         <div className="p-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl border border-rose-200 dark:border-rose-800 flex items-center gap-3">
           <AlertCircle className="w-5 h-5" />
           <p className="font-bold">Failed to load media assets. Please try again.</p>
         </div>
       </div>
     );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">Media Library</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1 uppercase font-bold tracking-tight">Manage and organize your project assets.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 rounded-xl text-sm font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-all uppercase tracking-widest">
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-widest">
            <Upload className="w-4 h-4" />
            Upload File
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search assets..."
              className="w-full h-11 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl pl-12 pr-4 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
            />
          </div>
          <div className="h-6 w-px bg-gray-100 dark:bg-slate-800" />
          <div className="flex items-center gap-1 p-1 bg-gray-50 dark:bg-slate-800 rounded-lg">
             <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-500' : 'text-gray-400'}`}>
                <Grid className="w-4 h-4" />
             </button>
             <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-500' : 'text-gray-400'}`}>
                <ListIcon className="w-4 h-4" />
             </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedItems.length > 0 && (
            <button className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/10 text-rose-500 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all uppercase tracking-widest border border-rose-500/10">
              <Trash2 className="w-4 h-4" />
              Delete {selectedItems.length}
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-slate-800 text-gray-500 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all uppercase tracking-widest">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <AnimatePresence>
          {media.map((asset) => (
            <motion.div
              layout
              key={asset.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`group relative bg-white dark:bg-slate-900 border rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer ${
                selectedItems.includes(asset.id) 
                  ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-xl' 
                  : 'border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl'
              }`}
            >
              <div className="aspect-square relative overflow-hidden bg-gray-50 dark:bg-slate-800">
                {asset.type.startsWith('image/') ? (
                   <img src={asset.url} alt={asset.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center">
                      <File className="w-12 h-12 text-gray-300" />
                   </div>
                )}
                <div 
                  onClick={(e) => toggleSelect(asset.id, e)}
                  className={`absolute top-3 left-3 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all z-10 ${
                    selectedItems.includes(asset.id) 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'bg-white/50 backdrop-blur-md border-white/50 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {selectedItems.includes(asset.id) && <CheckSquare className="w-3 h-3 text-white" />}
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="flex gap-2 w-full">
                    <button className="flex-1 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white text-[10px] font-bold uppercase hover:bg-white/20 transition-all">
                      View
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteMedia.mutate(asset.id); }}
                      className="p-2 bg-rose-500/20 backdrop-blur-md rounded-xl text-rose-400 hover:bg-rose-500/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs font-bold truncate uppercase tracking-tight">{asset.name}</p>
                <div className="flex items-center justify-between mt-1">
                   <p className="text-[10px] text-gray-400 font-medium uppercase">{asset.size}</p>
                   <p className="text-[10px] text-gray-400 font-medium uppercase">{asset.type.split('/')[1]}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {media.length === 0 && (
         <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-4xl bg-gray-50/30 dark:bg-slate-800/20">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl shadow-sm mb-4">
               <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No assets yet. Upload something amazing!</p>
         </div>
      )}
    </div>
  );
}
 Kinder
