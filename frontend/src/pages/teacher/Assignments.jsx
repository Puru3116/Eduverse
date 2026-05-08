import React, { useState } from 'react';
import { Plus, Search, Calendar, FileText, UserCheck, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Assignments({ theme }) {
  const [activeTab, setActiveTab] = useState('active');

  const assignments = [
    { id: 1, title: 'Fractions Worksheet', subject: 'Math', dueDate: 'Oct 30, 2026', submitted: 38, total: 45, status: 'active' },
    { id: 2, title: 'Essay on Environment', subject: 'English', dueDate: 'Nov 2, 2026', submitted: 12, total: 45, status: 'active' },
    { id: 3, title: 'Plant Life Cycle Diagram', subject: 'Science', dueDate: 'Oct 20, 2026', submitted: 45, total: 45, status: 'graded' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black mb-2">Assignments & Homework</h2>
            <p className="text-slate-500 font-bold">Track, review, and grade student submissions.</p>
         </div>
         <button className="px-6 py-3 rounded-xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-2">
            <Plus size={20}/> New Assignment
         </button>
      </div>

      <div className={`rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
         
         {/* Tabs */}
         <div className="flex gap-4 mb-8 border-b-2 pb-4 border-slate-200 dark:border-slate-800">
            <button onClick={() => setActiveTab('active')} className={`font-black text-lg px-4 py-2 rounded-xl transition-all ${activeTab === 'active' ? 'bg-indigo-500/10 text-indigo-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>Active</button>
            <button onClick={() => setActiveTab('graded')} className={`font-black text-lg px-4 py-2 rounded-xl transition-all ${activeTab === 'graded' ? 'bg-indigo-500/10 text-indigo-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>Graded</button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.filter(a => a.status === activeTab).map(assignment => (
               <motion.div whileHover={{ y: -5 }} key={assignment.id} className={`p-6 rounded-3xl border-2 flex flex-col ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex justify-between items-start mb-4">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${assignment.subject === 'Math' ? 'bg-blue-500/10 text-blue-500' : assignment.subject === 'English' ? 'bg-purple-500/10 text-purple-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {assignment.subject}
                     </span>
                     <span className="flex items-center gap-1 text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded-lg">
                        <Calendar size={12}/> {assignment.dueDate}
                     </span>
                  </div>
                  
                  <h3 className="text-xl font-black mb-4">{assignment.title}</h3>
                  
                  <div className="mb-6">
                     <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                        <span>Submitted</span>
                        <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>{assignment.submitted} / {assignment.total}</span>
                     </div>
                     <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}></div>
                     </div>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-2">
                     <button className={`py-2 rounded-xl font-black flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-white text-slate-700 border shadow-sm hover:bg-slate-50'}`}>
                        <UserCheck size={16}/> Grade
                     </button>
                     <button className={`py-2 rounded-xl font-black flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}>
                        <FileText size={16}/> View All
                     </button>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
