import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Award, ChevronRight, LogOut, Clock } from 'lucide-react';

export default function StudentManagement({ students = [], allProgress = [], theme, refreshData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const studentPerformance = students.map(st => {
    const stRecords = allProgress.filter(p => (p.studentId?._id || p.studentId) === st._id);
    const avgScore = stRecords.length > 0 
      ? Math.round(stRecords.reduce((s, p) => s + (p.score||0), 0) / stRecords.length) 
      : 0;
    
    const stTopicScores = {};
    stRecords.forEach(p => {
      const topic = (p.moduleName || 'Unknown Module').replace(/_/g, ' ');
      if(!stTopicScores[topic]) stTopicScores[topic] = { total: 0, count: 0 };
      stTopicScores[topic].total += (p.score || 0);
      stTopicScores[topic].count += 1;
    });
    
    let stWeakest = "N/A";
    let stLow = 1000;
    for (const [topic, data] of Object.entries(stTopicScores)) {
      const avg = data.total / data.count;
      if (avg < stLow) {
        stLow = avg;
        stWeakest = topic;
      }
    }
    return { ...st, avgScore, weakestTopic: stWeakest, gamesPlayed: stRecords.length };
  });
  
  const filteredStudents = studentPerformance.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className={`rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" placeholder="Search students..." 
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-6 py-4 rounded-2xl border-2 transition-all outline-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 focus:border-indigo-500 text-white' : 'bg-slate-50 border-slate-100 focus:border-indigo-500'}`}
              />
            </div>
            <div className="flex gap-4">
              <button className={`px-6 py-4 rounded-2xl font-black flex items-center gap-2 border-2 ${theme === 'dark' ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-500'}`}><Filter size={18}/> Filter</button>
              <button onClick={refreshData} className="px-6 py-4 rounded-2xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">Refresh Data</button>
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Games Played</th>
                <th className="px-6 py-4">Avg Score</th>
                <th className="px-6 py-4">Weak Spot</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((st) => (
                <tr key={st._id} className={`group shadow-sm transition-all hover:scale-[1.01] ${theme === 'dark' ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-50/50 hover:bg-slate-50'}`}>
                  <td className="px-6 py-5 rounded-l-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-black">{st.name.charAt(0)}</div>
                      <span className="font-black text-lg">{st.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-bold text-slate-500 uppercase text-xs">{st.classGrade === '1' ? 'Explorer' : st.classGrade === '2-5' ? 'Builder' : 'Achiever'}</td>
                  <td className="px-6 py-5 font-black text-indigo-500">{st.gamesPlayed}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Award size={16} className={st.avgScore > 100 ? 'text-amber-500' : 'text-slate-400'} />
                      <span className="font-black">{st.avgScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${st.weakestTopic === 'N/A' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>{st.weakestTopic === 'N/A' ? 'None' : st.weakestTopic}</span>
                  </td>
                  <td className="px-6 py-5 rounded-r-3xl">
                    <button onClick={() => setSelectedStudent(st)} className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all"><ChevronRight size={20}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedStudent && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.95 }}
              className={`w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border-b-[16px] ${theme === 'dark' ? 'bg-slate-900 border-indigo-900' : 'bg-white border-indigo-200'}`}
            >
              <div className="p-8 pb-0 flex justify-between items-start">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center text-3xl font-black shadow-lg">
                        {selectedStudent.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-4xl font-black">{selectedStudent.name}</h2>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Class Grade: {selectedStudent.classGrade}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedStudent(null)} className={`p-3 rounded-2xl hover:bg-rose-500 hover:text-white transition-all ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                    <LogOut size={24} className="rotate-180" />
                  </button>
              </div>

              <div className="p-8 overflow-y-auto flex-1 custom-scrollbar space-y-8">
                  <div className="grid grid-cols-3 gap-6">
                    <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Average Score</p>
                        <p className="text-3xl font-black text-indigo-500">{selectedStudent.avgScore}</p>
                    </div>
                    <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Games Played</p>
                        <p className="text-3xl font-black text-emerald-500">{selectedStudent.gamesPlayed}</p>
                    </div>
                    <div className={`p-6 rounded-3xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Weakest Topic</p>
                        <p className="text-xl font-black text-rose-500 capitalize">{selectedStudent.weakestTopic === 'N/A' ? 'None' : selectedStudent.weakestTopic}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black mb-4 flex items-center gap-2"><Clock size={20} className="text-indigo-500"/> Recent Activity</h3>
                    <div className="space-y-3">
                        {(() => {
                          const history = allProgress
                              .filter(p => (p.studentId?._id || p.studentId) === selectedStudent._id)
                              .sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))
                              .slice(0, 10);
                          
                          if (history.length === 0) return <p className="text-slate-400 font-bold italic">No activities recorded yet.</p>;
                          
                          return history.map((record, i) => (
                              <div key={i} className={`flex items-center justify-between p-4 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black ${record.score > 80 ? 'bg-emerald-500' : record.score > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}>
                                      {record.score}
                                    </div>
                                    <div>
                                      <p className="font-black text-lg capitalize">{(record.moduleName || 'Unknown Module').replace(/_/g, ' ')}</p>
                                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                          {new Date(record.timestamp).toLocaleDateString()} at {new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                      </p>
                                    </div>
                                </div>
                              </div>
                          ))
                        })()}
                    </div>
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
