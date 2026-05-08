import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Target, BrainCircuit, Activity } from 'lucide-react';

export default function Analytics({ students = [], allProgress = [], theme }) {
  
  const last7Days = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toDateString();
  });
  
  const dailyActivity = last7Days.map(dateStr => {
    const dayRecords = allProgress.filter(p => new Date(p.timestamp).toDateString() === dateStr);
    const avg = dayRecords.length > 0 ? Math.round(dayRecords.reduce((sum, p) => sum + (p.score||0), 0) / dayRecords.length) : 0;
    return { date: dateStr.split(' ')[0], avg, count: dayRecords.length }; 
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black mb-2">Analytics & Insights <span className="text-rose-500">🔥</span></h2>
            <p className="text-slate-500 font-bold">Deep dive into performance metrics and engagement.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className={`lg:col-span-8 rounded-[2.5rem] p-8 shadow-xl border-b-[12px] flex flex-col justify-between ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            <h3 className="text-xl font-black mb-8 flex items-center gap-2"><Activity className="text-indigo-500"/> Engagement Tracking</h3>
            <div className="flex-1 flex items-end justify-between gap-4 h-64">
               {dailyActivity.map((day, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 group">
                     <div className="w-full relative h-full flex items-end justify-center">
                        <motion.div 
                           initial={{ height: 0 }} animate={{ height: `${day.count > 0 ? Math.min((day.count / 50) * 100, 100) : 0}%` }} 
                           transition={{ duration: 0.8, delay: i * 0.1 }}
                           className={`w-full max-w-[48px] rounded-t-xl transition-all group-hover:opacity-80 ${theme === 'dark' ? 'bg-indigo-500/20 border-t-4 border-indigo-500' : 'bg-indigo-100 border-t-4 border-indigo-500'}`}
                        >
                           <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold py-1 px-3 rounded-lg whitespace-nowrap">{day.count} Actions</div>
                        </motion.div>
                     </div>
                     <span className="text-xs font-black text-slate-400 mt-4 uppercase tracking-widest">{day.date}</span>
                  </div>
               ))}
            </div>
         </div>

         <div className={`lg:col-span-4 rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            <h3 className="text-xl font-black mb-6 flex items-center gap-2"><Target className="text-amber-500"/> Identify Weak Spots</h3>
            <div className="space-y-4">
               {[
                  { topic: 'Fractions', avg: 45, students: 12 },
                  { topic: 'Grammar', avg: 52, students: 8 },
                  { topic: 'Division', avg: 61, students: 5 },
               ].map((weak, i) => (
                  <div key={i} className={`p-4 rounded-2xl border-l-4 border-rose-500 ${theme === 'dark' ? 'bg-slate-800' : 'bg-rose-50'}`}>
                     <div className="flex justify-between items-start mb-2">
                        <span className="font-black text-lg">{weak.topic}</span>
                        <span className="font-black text-rose-500">{weak.avg}%</span>
                     </div>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{weak.students} students struggling</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className={`p-8 rounded-[2.5rem] shadow-xl border-b-[8px] border-emerald-500 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6"><TrendingUp size={28}/></div>
            <h3 className="text-4xl font-black mb-2">+15%</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Class Average Improvement</p>
            <p className="text-xs font-bold text-emerald-500 mt-4">Compared to last month</p>
         </div>
         <div className={`p-8 rounded-[2.5rem] shadow-xl border-b-[8px] border-blue-500 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6"><BarChart3 size={28}/></div>
            <h3 className="text-4xl font-black mb-2">85%</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Assignment Completion Rate</p>
            <p className="text-xs font-bold text-blue-500 mt-4">Top 10% in district</p>
         </div>
         <div className={`p-8 rounded-[2.5rem] shadow-xl border-b-[8px] border-purple-500 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6"><BrainCircuit size={28}/></div>
            <h3 className="text-4xl font-black mb-2">42 hrs</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Learning Time</p>
            <p className="text-xs font-bold text-purple-500 mt-4">This week</p>
         </div>
      </div>
    </div>
  );
}
