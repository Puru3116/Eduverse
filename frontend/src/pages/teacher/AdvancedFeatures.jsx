import React from 'react';
import { Sparkles, Brain, Download, ShieldCheck, Trophy, Lock } from 'lucide-react';

export default function AdvancedFeatures({ theme }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black mb-2 bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent">Pro Tools & AI</h2>
            <p className="text-slate-500 font-bold">Unlock advanced capabilities to supercharge your classroom.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className={`p-8 rounded-[3rem] shadow-xl border-b-[12px] flex flex-col ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/50 to-slate-900 border-indigo-950' : 'bg-gradient-to-br from-indigo-50 to-white border-indigo-100'}`}>
            <div className="w-16 h-16 rounded-[2rem] bg-indigo-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
               <Brain size={32}/>
            </div>
            <h3 className="text-2xl font-black mb-2">AI Insights & Predictions</h3>
            <p className="text-slate-500 font-bold mb-6">Our machine learning models analyze student gameplay and test scores to predict future performance and recommend personalized interventions.</p>
            
            <div className={`mt-auto p-5 rounded-2xl border-2 border-dashed ${theme === 'dark' ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-indigo-200 bg-indigo-50/50'}`}>
               <div className="flex justify-between items-center mb-3">
                  <span className="font-black text-indigo-500">Risk Assessment</span>
                  <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">3 Students At Risk</span>
               </div>
               <button className="w-full py-3 rounded-xl font-black bg-indigo-600 text-white">Generate AI Report</button>
            </div>
         </div>

         <div className={`p-8 rounded-[3rem] shadow-xl border-b-[12px] flex flex-col ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            <div className="w-16 h-16 rounded-[2rem] bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
               <Trophy size={32}/>
            </div>
            <h3 className="text-2xl font-black mb-2">Gamification Engine</h3>
            <p className="text-slate-500 font-bold mb-6">Configure badges, leaderboards, and experience points (XP) rewards for completing modules and maintaining attendance streaks.</p>
            
            <div className="mt-auto space-y-3">
               <button className={`w-full py-4 rounded-2xl font-black flex items-center justify-between px-6 ${theme === 'dark' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-50 text-slate-900 border hover:bg-slate-100'}`}>
                  Configure Badges <Sparkles size={18} className="text-amber-500"/>
               </button>
               <button className={`w-full py-4 rounded-2xl font-black flex items-center justify-between px-6 ${theme === 'dark' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-50 text-slate-900 border hover:bg-slate-100'}`}>
                  Leaderboard Settings <Lock size={18} className="text-slate-400"/>
               </button>
            </div>
         </div>

         <div className={`p-8 rounded-[3rem] shadow-xl border-b-[12px] flex flex-col ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            <div className="w-16 h-16 rounded-[2rem] bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6">
               <ShieldCheck size={32}/>
            </div>
            <h3 className="text-2xl font-black mb-2">Plagiarism Checker</h3>
            <p className="text-slate-500 font-bold mb-6">Automatically scan uploaded assignments against web sources and past student submissions.</p>
            
            <button className={`mt-auto w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
               <Lock size={18}/> Requires API Key Integration
            </button>
         </div>

         <div className={`p-8 rounded-[3rem] shadow-xl border-b-[12px] flex flex-col ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            <div className="w-16 h-16 rounded-[2rem] bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
               <Download size={32}/>
            </div>
            <h3 className="text-2xl font-black mb-2">Data Export & Compliance</h3>
            <p className="text-slate-500 font-bold mb-6">Export all class data, analytics, and grading histories into Excel or CSV formats for district reporting.</p>
            
            <div className="mt-auto grid grid-cols-2 gap-3">
               <button className={`py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-50 text-slate-900 border hover:bg-slate-100'}`}>
                  Export to CSV
               </button>
               <button className={`py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-500`}>
                  Generate PDF
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
