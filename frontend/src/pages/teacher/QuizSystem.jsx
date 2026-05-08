import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Plus, Clock, Target, ShieldQuestion, PlayCircle } from 'lucide-react';

export default function QuizSystem({ theme }) {
  const quizzes = [
    { id: 1, title: 'Mid-Term Math Assessment', questions: 20, time: '30 mins', attempts: 42, avgScore: '78%', status: 'Active' },
    { id: 2, title: 'English Grammar Pop Quiz', questions: 10, time: '15 mins', attempts: 45, avgScore: '85%', status: 'Active' },
    { id: 3, title: 'Science: Ecosystems', questions: 15, time: '20 mins', attempts: 0, avgScore: '-', status: 'Draft' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black mb-2">Quiz & Testing Engine</h2>
            <p className="text-slate-500 font-bold">Create automated tests, manage question banks, and view analytics.</p>
         </div>
         <button className="px-6 py-3 rounded-xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-2">
            <Plus size={20}/> Create New Quiz
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className={`p-6 rounded-[2rem] shadow-md border-b-[8px] border-indigo-500 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4"><CheckSquare size={24}/></div>
            <h3 className="text-3xl font-black mb-1">14</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Quizzes</p>
         </div>
         <div className={`p-6 rounded-[2rem] shadow-md border-b-[8px] border-emerald-500 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4"><ShieldQuestion size={24}/></div>
            <h3 className="text-3xl font-black mb-1">350+</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Question Bank Size</p>
         </div>
         <div className={`p-6 rounded-[2rem] shadow-md border-b-[8px] border-amber-500 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4"><Target size={24}/></div>
            <h3 className="text-3xl font-black mb-1">82%</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Avg. Pass Rate</p>
         </div>
      </div>

      <div className={`rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
         <h3 className="text-xl font-black mb-6">Recent Assessments</h3>
         <div className="space-y-4">
            {quizzes.map((quiz) => (
               <motion.div whileHover={{ scale: 1.01 }} key={quiz.id} className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border-2 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex-1 mb-4 md:mb-0">
                     <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-black">{quiz.title}</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${quiz.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>{quiz.status}</span>
                     </div>
                     <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1"><CheckSquare size={14}/> {quiz.questions} Qs</span>
                        <span className="flex items-center gap-1"><Clock size={14}/> {quiz.time}</span>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-6 md:gap-10">
                     <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Attempts</p>
                        <p className="text-xl font-black">{quiz.attempts}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Avg Score</p>
                        <p className={`text-xl font-black ${quiz.avgScore !== '-' ? 'text-indigo-500' : ''}`}>{quiz.avgScore}</p>
                     </div>
                     <button className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'}`}>
                        <PlayCircle size={24}/>
                     </button>
                  </div>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}
