import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, CheckCircle2, XCircle, AlertCircle, Maximize, Loader2 } from 'lucide-react';
import api from '../../utils/api';

export default function Attendance({ theme }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/attendance/by-date/${date}`);
      setAttendanceData(res.data);
      // Auto-lock if the teacher has already saved attendance for this date
      const hasTeacherMarked = res.data.some(record => record.markedBy === 'teacher');
      setIsLocked(hasTeacherMarked);
    } catch (err) {
      console.error("Fetch attendance failed", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAttendance();
  }, [date]);

  const handleUpdateStatus = (studentId, newStatus) => {
    if (isLocked) return;
    setAttendanceData(prev => prev.map(item => 
      item.studentId === studentId ? { ...item, status: newStatus, isDirty: true } : item
    ));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    try {
      const dirtyRecords = attendanceData.filter(item => item.isDirty);
      await Promise.all(dirtyRecords.map(record => 
        api.post('/attendance/update', {
          studentId: record.studentId,
          date,
          status: record.status
        })
      ));
      // Refresh data to update isLocked state
      await fetchAttendance();
      alert('Attendance saved successfully!');
    } catch (err) {
      console.error("Save attendance failed", err);
      alert('Failed to save attendance');
    }
    setSaving(false);
  };

  const stats = [
    { label: "Total Students", value: attendanceData.length, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Present Today", value: attendanceData.filter(a => a.status === 'present').length, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Absent Today", value: attendanceData.filter(a => a.status === 'absent').length, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "On Leave", value: attendanceData.filter(a => a.status === 'on-leave').length, color: "text-amber-500", bg: "bg-amber-500/10" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black mb-2">Attendance System</h2>
            <p className="text-slate-500 font-bold">Track daily attendance, generate reports, and scan QR codes.</p>
         </div>
         <div className="flex gap-4">
            <button className={`px-4 py-3 rounded-xl font-black flex items-center gap-2 ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white border text-slate-700 shadow-sm'}`}>
               <Maximize size={18}/> QR Scanner
            </button>
            <input 
               type="date" 
               value={date}
               onChange={(e) => setDate(e.target.value)}
               className={`px-4 py-3 rounded-xl font-black outline-none ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white border text-slate-700 shadow-sm'}`}
            />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-[2rem] shadow-sm flex items-center gap-6 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white border-2 border-slate-100'}`}>
               <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black ${stat.bg} ${stat.color}`}>
                  {loading ? <Loader2 className="animate-spin" size={24} /> : stat.value}
               </div>
               <div>
                  <p className="text-xs font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
               </div>
            </div>
         ))}
      </div>

      <div className={`rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black">Mark Attendance - {new Date(date).toLocaleDateString()}</h3>
            <div className="flex gap-4">
              <button 
                onClick={fetchAttendance}
                disabled={loading}
                className={`px-4 py-2 rounded-xl font-black flex items-center gap-2 ${theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}
              >
                <Clock size={18} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
              {isLocked ? (
                <button 
                  onClick={() => setIsLocked(false)}
                  className={`px-6 py-2 rounded-xl font-black bg-amber-500 text-white shadow-lg shadow-amber-500/20 flex items-center gap-2`}
                >
                  <AlertCircle size={18} />
                  Rectify Attendance
                </button>
              ) : (
                <button 
                  onClick={handleSaveAttendance}
                  disabled={saving || loading}
                  className={`px-6 py-2 rounded-xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-2 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {saving && <Loader2 size={18} className="animate-spin" />}
                  Save Attendance
                </button>
              )}
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
               <thead>
                  <tr className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                     <th className="px-4 py-3">Roll No</th>
                     <th className="px-4 py-3">Student Name</th>
                     <th className="px-4 py-3 text-center">Present</th>
                     <th className="px-4 py-3 text-center">Absent</th>
                     <th className="px-4 py-3 text-center">Leave</th>
                  </tr>
               </thead>
               <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-20 font-black text-slate-400">Loading attendance data...</td>
                    </tr>
                  ) : attendanceData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-20 font-black text-slate-400">No students found.</td>
                    </tr>
                  ) : attendanceData.map((st, i) => (
                     <tr key={st.studentId} className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} ${st.isDirty ? 'ring-2 ring-indigo-500/30' : ''}`}>
                        <td className="px-4 py-4 rounded-l-2xl font-black text-slate-400">{i + 101}</td>
                        <td className="px-4 py-4 font-black flex items-center gap-2">
                          {st.name}
                          {st.markedBy === 'student' && (
                            <span className="flex items-center gap-1 text-[9px] font-black bg-emerald-500/20 text-emerald-500 px-2.5 py-1 rounded-lg uppercase tracking-tighter shadow-sm border border-emerald-500/30">
                              <CheckCircle2 size={10} />
                              Self Marked
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                           <button 
                              onClick={() => handleUpdateStatus(st.studentId, 'present')}
                              disabled={isLocked}
                              className={`p-2 rounded-xl transition-all ${st.status === 'present' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : theme === 'dark' ? 'bg-slate-700/50 text-slate-500 hover:bg-slate-700' : 'bg-slate-200 text-slate-400 hover:bg-slate-300'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                           >
                              <CheckCircle2 size={20} />
                           </button>
                        </td>
                        <td className="px-4 py-4 text-center">
                           <button 
                              onClick={() => handleUpdateStatus(st.studentId, 'absent')}
                              disabled={isLocked}
                              className={`p-2 rounded-xl transition-all ${st.status === 'absent' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : theme === 'dark' ? 'bg-slate-700/50 text-slate-500 hover:bg-slate-700' : 'bg-slate-200 text-slate-400 hover:bg-slate-300'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                           >
                              <XCircle size={20} />
                           </button>
                        </td>
                        <td className="px-4 py-4 text-center rounded-r-2xl">
                           <button 
                              onClick={() => handleUpdateStatus(st.studentId, 'on-leave')}
                              disabled={isLocked}
                              className={`p-2 rounded-xl transition-all ${st.status === 'on-leave' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : theme === 'dark' ? 'bg-slate-700/50 text-slate-500 hover:bg-slate-700' : 'bg-slate-200 text-slate-400 hover:bg-slate-300'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                           >
                              <AlertCircle size={20} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
