import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Activity, Target, AlertTriangle, 
  TrendingUp, Zap, BookOpen, Calculator, Sun, BrainCircuit
} from 'lucide-react';

export default function DashboardOverview({ students = [], allProgress = [], theme }) {
  
  const totalStudents = students.length;
  const today = new Date().toDateString();
  const activeTodayIds = new Set(
    allProgress
      .filter(p => new Date(p.timestamp).toDateString() === today)
      .map(p => p.studentId?._id || p.studentId)
  );
  const activeTodayCount = activeTodayIds.size;

  const avgPoints = allProgress.length > 0 
    ? Math.round(allProgress.reduce((sum, p) => sum + (p.score || 0), 0) / allProgress.length)
    : 0;

  const topicScores = {};
  allProgress.forEach(p => {
    const topic = (p.moduleName || 'Unknown Module').replace(/_/g, ' ');
    if(!topicScores[topic]) topicScores[topic] = { total: 0, count: 0 };
    topicScores[topic].total += (p.score || 0);
    topicScores[topic].count += 1;
  });
  
  let weakestTopic = "None";
  let lowestScore = Infinity;
  for (const [topic, data] of Object.entries(topicScores)) {
    const avg = data.total / data.count;
    if (avg < lowestScore && data.count > 0) {
      lowestScore = avg;
      weakestTopic = topic;
    }
  }

  const completedPretest = students.filter(s => s.hasCompletedPretest).length;
  const progressPercent = totalStudents > 0 ? Math.round((completedPretest / totalStudents) * 100) : 0;

  const last7Days = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toDateString();
  });
  
  const dailyActivity = last7Days.map(dateStr => {
    const dayRecords = allProgress.filter(p => new Date(p.timestamp).toDateString() === dateStr);
    const avg = dayRecords.length > 0 ? Math.round(dayRecords.reduce((sum, p) => sum + (p.score||0), 0) / dayRecords.length) : 0;
    return { date: dateStr.split(' ')[0], avg }; 
  });

  const recentActivities = [...allProgress]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5)
    .map(p => {
      const st = students.find(s => s._id === (p.studentId?._id || p.studentId));
      return { ...p, studentName: st ? st.name : 'Unknown Student' };
    });

  // Only include students who have actually played a game, and have an average score less than 70
  const strugglingStudents = [...students].map(st => {
    const stRecords = allProgress.filter(p => (p.studentId?._id || p.studentId) === st._id);
    if (stRecords.length === 0) return null; // Filter out if they haven't played
    const avg = Math.round(stRecords.reduce((s, p) => s + (p.score||0), 0) / stRecords.length);
    return { ...st, avgScore: avg };
  }).filter(st => st !== null && st.avgScore < 70).sort((a, b) => a.avgScore - b.avgScore).slice(0, 4);

  return (
    <div className="space-y-10">
      {/* 1. STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Students", value: totalStudents, icon: <Users size={24}/>, color: "bg-indigo-500 text-white shadow-indigo-500/30", isDark: true },
          { label: "Active Today", value: activeTodayCount, icon: <Activity size={24}/>, color: theme === 'dark' ? 'bg-slate-800 text-emerald-400 border-emerald-900/50' : 'bg-emerald-50 text-emerald-600 border-emerald-100', isDark: false },
          { label: "Avg Points", value: `${avgPoints} pts`, icon: <Target size={24}/>, color: theme === 'dark' ? 'bg-slate-800 text-amber-400 border-amber-900/50' : 'bg-amber-50 text-amber-600 border-amber-100', isDark: false },
          { label: "Weakest Topic", value: weakestTopic, icon: <AlertTriangle size={24}/>, color: theme === 'dark' ? 'bg-slate-800 text-rose-400 border-rose-900/50' : 'bg-rose-50 text-rose-600 border-rose-100', isDark: false, smallText: true }
        ].map((stat, i) => (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} key={i}
            className={`p-6 rounded-[2rem] border-b-8 shadow-xl flex flex-col justify-between h-40 ${stat.color} ${stat.isDark ? 'border-indigo-700' : ''}`}>
            <div className="flex justify-between items-start">
              <p className="text-xs font-black uppercase tracking-widest opacity-80">{stat.label}</p>
              <div className="opacity-80">{stat.icon}</div>
            </div>
            <p className={`font-black leading-none capitalize truncate ${stat.smallText ? 'text-3xl' : 'text-5xl'}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>



      {/* 4. LIVE ACTIVITY FEED */}
      <div className={`rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black flex items-center gap-2"><Activity size={22} className="text-emerald-500"/> Live Activity Feed</h3>
        </div>
        <div className="space-y-4">
          {recentActivities.length === 0 ? (
            <p className="text-slate-400 font-bold">No recent activities found.</p>
          ) : (
            recentActivities.map((act, idx) => {
              const timeString = new Date(act.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
              return (
                <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-black">
                      <Zap size={18} />
                    </div>
                    <div>
                      <p className="font-black text-lg">{act.studentName}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">completed <span className="text-indigo-500">{(act.moduleName || 'Unknown Module').replace(/_/g, ' ')}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-lg text-emerald-500">+{act.score} pts</p>
                    <p className="text-xs font-bold text-slate-400">{timeString}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
}
