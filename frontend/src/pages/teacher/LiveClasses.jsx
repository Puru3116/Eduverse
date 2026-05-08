import React from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar as CalendarIcon, Clock, Link as LinkIcon, Plus, Users } from 'lucide-react';

export default function LiveClasses({ theme }) {
  const classes = [
    { id: 1, title: 'Math: Fractions Deep Dive', time: '10:00 AM - 11:00 AM', date: 'Today', attendees: 42, platform: 'Zoom', status: 'Live' },
    { id: 2, title: 'Science Q&A Session', time: '2:00 PM - 3:00 PM', date: 'Today', attendees: 38, platform: 'Google Meet', status: 'Upcoming' },
    { id: 3, title: 'English Story Reading', time: '10:00 AM - 11:00 AM', date: 'Tomorrow', attendees: 0, platform: 'Zoom', status: 'Scheduled' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black mb-2">Live Classes / Scheduling</h2>
            <p className="text-slate-500 font-bold">Schedule virtual classrooms and share join links.</p>
         </div>
         <button className="px-6 py-3 rounded-xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-2">
            <Plus size={20}/> Schedule Class
         </button>
      </div>

      <div className={`rounded-[2.5rem] p-10 shadow-xl border-b-[12px] flex items-center justify-between ${theme === 'dark' ? 'bg-gradient-to-r from-indigo-900 to-slate-900 border-indigo-950' : 'bg-gradient-to-r from-indigo-600 to-indigo-500 border-indigo-700 text-white'}`}>
         <div className={theme === 'dark' ? 'text-white' : ''}>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-rose-500 text-white mb-4 inline-flex items-center gap-2 animate-pulse">
               <div className="w-2 h-2 bg-white rounded-full"></div> LIVE NOW
            </span>
            <h2 className="text-4xl font-black mb-2">Math: Fractions Deep Dive</h2>
            <p className="text-lg font-bold opacity-80 flex items-center gap-4">
               <span className="flex items-center gap-1"><Clock size={18}/> 10:00 AM - 11:00 AM</span>
               <span className="flex items-center gap-1"><Users size={18}/> 42 Students Joined</span>
            </p>
         </div>
         <button className="px-8 py-4 rounded-2xl font-black bg-white text-indigo-600 shadow-xl hover:scale-105 transition-all text-lg flex items-center gap-2">
            <Video size={24}/> Join Classroom
         </button>
      </div>

      <div className={`rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
         <h3 className="text-xl font-black mb-6 flex items-center gap-2"><CalendarIcon className="text-indigo-500"/> Upcoming Schedule</h3>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.filter(c => c.status !== 'Live').map((cls) => (
               <motion.div whileHover={{ y: -5 }} key={cls.id} className={`p-6 rounded-[2rem] border-2 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex justify-between items-start mb-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cls.platform === 'Zoom' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        <Video size={24}/>
                     </div>
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${cls.status === 'Upcoming' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'}`}>
                        {cls.status}
                     </span>
                  </div>
                  
                  <h3 className="text-xl font-black mb-2">{cls.title}</h3>
                  
                  <div className="space-y-2 mb-6 text-sm font-bold text-slate-400">
                     <p className="flex items-center gap-2"><CalendarIcon size={16}/> {cls.date}</p>
                     <p className="flex items-center gap-2"><Clock size={16}/> {cls.time}</p>
                  </div>

                  <div className="flex gap-2">
                     <button className={`flex-1 py-3 rounded-xl font-black flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}>
                        <LinkIcon size={18}/> Copy Link
                     </button>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
