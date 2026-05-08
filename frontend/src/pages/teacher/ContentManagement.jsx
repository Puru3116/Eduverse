import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, FileText, Video, Link as LinkIcon, UploadCloud, Search, MoreVertical, LayoutGrid, List } from 'lucide-react';

export default function ContentManagement({ theme }) {
  const [view, setView] = useState('grid'); // grid | list

  const contents = [
    { id: 1, name: 'Chapter 1: Number System', type: 'folder', items: 4, size: '12 MB', date: 'Oct 10, 2026' },
    { id: 2, name: 'Grammar Basics', type: 'folder', items: 2, size: '45 MB', date: 'Oct 12, 2026' },
    { id: 3, name: 'Fractions_Worksheet.pdf', type: 'pdf', items: 0, size: '2.4 MB', date: 'Today, 9:00 AM' },
    { id: 4, name: 'Intro_to_Ecosystems.mp4', type: 'video', items: 0, size: '145 MB', date: 'Yesterday' },
    { id: 5, name: 'Helpful Math Resources Link', type: 'link', items: 0, size: '-', date: 'Oct 15, 2026' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black mb-2">Content Library</h2>
            <p className="text-slate-500 font-bold">Upload and manage study materials, notes, and videos.</p>
         </div>
         <button className="px-6 py-3 rounded-xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-2">
            <UploadCloud size={20}/> Upload Material
         </button>
      </div>

      <div className={`rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
         <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" placeholder="Search files & folders..." 
                className={`w-full pl-12 pr-6 py-3 rounded-xl border-2 transition-all outline-none font-bold ${theme === 'dark' ? 'bg-slate-800 border-slate-700 focus:border-indigo-500 text-white' : 'bg-slate-50 border-slate-100 focus:border-indigo-500'}`}
              />
            </div>
            <div className={`flex p-1 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
               <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-500' : 'text-slate-400'}`}><LayoutGrid size={20}/></button>
               <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-500' : 'text-slate-400'}`}><List size={20}/></button>
            </div>
         </div>

         {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {contents.map((item) => (
                  <motion.div whileHover={{ scale: 1.02 }} key={item.id} className={`p-5 rounded-[2rem] border-2 cursor-pointer ${theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:border-indigo-500' : 'bg-slate-50 border-slate-100 hover:border-indigo-500'}`}>
                     <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                           item.type === 'folder' ? 'bg-amber-500/10 text-amber-500' : 
                           item.type === 'pdf' ? 'bg-rose-500/10 text-rose-500' :
                           item.type === 'video' ? 'bg-purple-500/10 text-purple-500' :
                           'bg-blue-500/10 text-blue-500'
                        }`}>
                           {item.type === 'folder' && <Folder size={24}/>}
                           {item.type === 'pdf' && <FileText size={24}/>}
                           {item.type === 'video' && <Video size={24}/>}
                           {item.type === 'link' && <LinkIcon size={24}/>}
                        </div>
                        <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={20}/></button>
                     </div>
                     <h4 className="font-black mb-1 truncate">{item.name}</h4>
                     <p className="text-xs font-bold text-slate-400">
                        {item.type === 'folder' ? `${item.items} items` : item.size}
                     </p>
                  </motion.div>
               ))}
            </div>
         ) : (
            <div className="overflow-x-auto">
               <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                     <tr className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Date Modified</th>
                        <th className="px-4 py-3">Size</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {contents.map((item) => (
                        <tr key={item.id} className={`group cursor-pointer ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                           <td className="px-4 py-4 rounded-l-2xl">
                              <div className="flex items-center gap-3">
                                 <div className={`${
                                    item.type === 'folder' ? 'text-amber-500' : 
                                    item.type === 'pdf' ? 'text-rose-500' :
                                    item.type === 'video' ? 'text-purple-500' :
                                    'text-blue-500'
                                 }`}>
                                    {item.type === 'folder' && <Folder size={20} fill="currentColor" fillOpacity={0.2}/>}
                                    {item.type === 'pdf' && <FileText size={20}/>}
                                    {item.type === 'video' && <Video size={20}/>}
                                    {item.type === 'link' && <LinkIcon size={20}/>}
                                 </div>
                                 <span className="font-black">{item.name}</span>
                              </div>
                           </td>
                           <td className="px-4 py-4 font-bold text-slate-500 text-sm">{item.date}</td>
                           <td className="px-4 py-4 font-bold text-slate-500 text-sm">{item.type === 'folder' ? `${item.items} items` : item.size}</td>
                           <td className="px-4 py-4 rounded-r-2xl text-right">
                              <button className="text-slate-400 hover:text-indigo-500"><MoreVertical size={20}/></button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
    </div>
  );
}
