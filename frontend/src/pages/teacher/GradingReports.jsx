import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Star, Save, Edit2, Check, X } from 'lucide-react';
import api from '../../utils/api';

export default function GradingReports({ students = [], allProgress = [], allTests = [], allGrades = [], theme, refreshData }) {
  const [editingGrade, setEditingGrade] = useState(null); // { studentId, subject, score }
  const [saveLoading, setSaveLoading] = useState(false);

  const generateGrade = (score) => {
     if(score >= 90) return { grade: 'A+', color: 'text-emerald-500' };
     if(score >= 80) return { grade: 'A', color: 'text-emerald-400' };
     if(score >= 70) return { grade: 'B', color: 'text-blue-500' };
     if(score >= 60) return { grade: 'C', color: 'text-amber-500' };
     return { grade: 'D', color: 'text-rose-500' };
  };

  const getStudentScore = (studentId, subject) => {
    // 1. Check for manual override in allGrades
    const manualGrade = allGrades.find(g => (g.studentId?._id === studentId || g.studentId === studentId) && g.subject === subject);
    if (manualGrade) return manualGrade.score;

    // 2. Calculate automated score from progress
    const studentIdStr = studentId.toString();
    const relevantProgress = allProgress.filter(p => {
      const pStudentId = p.studentId?._id || p.studentId;
      if (pStudentId.toString() !== studentIdStr) return false;
      
      const mod = (p.moduleName || "").toLowerCase();
      const gid = (p.gameId || "").toLowerCase();

      if (subject === 'math') return mod.includes('math') || gid.includes('math') || mod.includes('calculator');
      if (subject === 'english') return mod.includes('shabd') || mod.includes('english') || gid.includes('shabd') || mod.includes('literacy');
      if (subject === 'science') return mod.includes('science') || mod.includes('evs') || mod.includes('nature') || mod.includes('sprout');
      return false;
    });

    if (relevantProgress.length === 0) return 0;
    const sum = relevantProgress.reduce((acc, curr) => acc + (curr.score || 0), 0);
    return Math.round(sum / relevantProgress.length);
  };

  const handleSaveGrade = async () => {
    if (!editingGrade) return;
    setSaveLoading(true);
    try {
      await api.post('/grades/upsert', {
        studentId: editingGrade.studentId,
        subject: editingGrade.subject,
        score: parseInt(editingGrade.score),
        term: 'Term 1',
        isManual: true
      });
      setEditingGrade(null);
      if (refreshData) refreshData();
    } catch (err) {
      console.error("Failed to save grade", err);
      alert("Failed to save grade");
    } finally {
      setSaveLoading(false);
    }
  };

  // Calculate class distribution
  const distributionData = [
    { grade: 'A / A+', count: 0, percent: 0, color: 'bg-emerald-500', min: 80 },
    { grade: 'B', count: 0, percent: 0, color: 'bg-blue-500', min: 70 },
    { grade: 'C', count: 0, percent: 0, color: 'bg-amber-500', min: 60 },
    { grade: 'D / F', count: 0, percent: 0, color: 'bg-rose-500', min: 0 },
  ];

  const studentAverages = students.map(st => {
    const m = getStudentScore(st._id, 'math');
    const e = getStudentScore(st._id, 'english');
    const s = getStudentScore(st._id, 'science');
    const avg = (m + e + s) / 3;
    
    if (avg >= 80) distributionData[0].count++;
    else if (avg >= 70) distributionData[1].count++;
    else if (avg >= 60) distributionData[2].count++;
    else distributionData[3].count++;

    return { name: st.name, avg };
  });

  const totalStudents = students.length || 1;
  distributionData.forEach(d => {
    d.percent = (d.count / totalStudents) * 100;
  });

  const topPerformer = studentAverages.length > 0 
    ? [...studentAverages].sort((a, b) => b.avg - a.avg)[0]
    : { name: 'N/A', avg: 0 };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black mb-2">Grading & Reports</h2>
            <p className="text-slate-500 font-bold">Real-time grades synced from student activities. Click scores to override.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className={`lg:col-span-2 rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            <h3 className="text-xl font-black mb-6">Term 1 Gradebook</h3>
            
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="text-slate-400 font-black uppercase tracking-widest text-[10px] border-b-2 border-slate-200 dark:border-slate-800">
                        <th className="pb-4">Student</th>
                        <th className="pb-4 text-center">Math</th>
                        <th className="pb-4 text-center">English</th>
                        <th className="pb-4 text-center">Science</th>
                        <th className="pb-4 text-center">Final Grade</th>
                     </tr>
                  </thead>
                  <tbody>
                     {students.map((st, i) => {
                        const m = getStudentScore(st._id, 'math');
                        const e = getStudentScore(st._id, 'english');
                        const s = getStudentScore(st._id, 'science');
                        const avg = (m + e + s) / 3;
                        const fGrade = generateGrade(avg);
                        
                        const renderScoreCell = (score, subject) => {
                          const isEditing = editingGrade && editingGrade.studentId === st._id && editingGrade.subject === subject;
                          
                          if (isEditing) {
                            return (
                              <td className="py-4 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <input 
                                    type="number" 
                                    value={editingGrade.score}
                                    onChange={(e) => setEditingGrade({...editingGrade, score: e.target.value})}
                                    className={`w-16 p-1 rounded border-2 font-bold text-center ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}
                                    autoFocus
                                  />
                                  <button onClick={handleSaveGrade} className="text-emerald-500 hover:scale-110"><Check size={16}/></button>
                                  <button onClick={() => setEditingGrade(null)} className="text-rose-500 hover:scale-110"><X size={16}/></button>
                                </div>
                              </td>
                            );
                          }

                          const hasOverride = allGrades.some(g => (g.studentId?._id === st._id || g.studentId === st._id) && g.subject === subject);

                          return (
                            <td 
                              className={`py-4 text-center font-bold group cursor-pointer relative ${hasOverride ? 'text-indigo-500' : 'text-slate-500'}`}
                              onClick={() => setEditingGrade({ studentId: st._id, subject, score })}
                            >
                              {score}
                              <Edit2 size={12} className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                            </td>
                          );
                        };

                        return (
                        <tr key={st._id} className={`border-b border-slate-100 dark:border-slate-800 ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                           <td className="py-4 font-black">{st.name}</td>
                           {renderScoreCell(m, 'math')}
                           {renderScoreCell(e, 'english')}
                           {renderScoreCell(s, 'science')}
                           <td className="py-4 text-center">
                              <span className={`text-xl font-black ${fGrade.color}`}>{fGrade.grade}</span>
                           </td>
                        </tr>
                     )})}
                     {students.length === 0 && (
                        <tr>
                           <td colSpan="5" className="py-10 text-center font-bold text-slate-400">No students found in this class.</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         <div className={`rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            <h3 className="text-xl font-black mb-6 flex items-center gap-2"><BarChart2 className="text-indigo-500"/> Class Distribution</h3>
            
            <div className="space-y-6">
               {distributionData.map((dist, i) => (
                  <div key={i}>
                     <div className="flex justify-between text-sm font-bold mb-2">
                        <span>Grade {dist.grade}</span>
                        <span className="text-slate-400">{dist.count} students</span>
                     </div>
                     <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${dist.percent}%` }} className={`h-full ${dist.color} rounded-full`} />
                     </div>
                  </div>
               ))}
            </div>

            <div className={`mt-8 p-6 rounded-2xl flex items-center gap-4 ${theme === 'dark' ? 'bg-amber-500/10' : 'bg-amber-50'}`}>
               <Star className="text-amber-500" size={32}/>
               <div>
                  <p className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-500">Top Performer</p>
                  <p className="font-black text-lg text-amber-700 dark:text-amber-400">{topPerformer.name}</p>
                  <p className="text-[10px] font-bold text-amber-600/60 uppercase tracking-tighter">Avg Score: {Math.round(topPerformer.avg)}%</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
