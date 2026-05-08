import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, Sun, Plus, Edit2, Trash2, Video, FileText, CheckCircle2 } from 'lucide-react';

export default function CourseManagement({ theme }) {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Mathematics Grade 4', modules: 12, students: 45, status: 'Active', color: 'blue' },
    { id: 2, title: 'Language Arts Basic', modules: 8, students: 45, status: 'Active', color: 'purple' },
    { id: 3, title: 'Environmental Science', modules: 15, students: 40, status: 'Draft', color: 'emerald' },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black mb-2">Course & Subject Management</h2>
            <p className="text-slate-500 font-bold">Create, edit, and organize curriculum materials.</p>
         </div>
         <button className="px-6 py-3 rounded-xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-2">
            <Plus size={20}/> Create Course
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div whileHover={{ y: -5 }} key={course.id} className={`p-6 rounded-[2rem] shadow-xl border-b-[8px] flex flex-col ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            <div className="flex justify-between items-start mb-6">
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${course.color}-500/10 text-${course.color}-500`}>
                 {course.color === 'blue' && <Calculator size={28}/>}
                 {course.color === 'purple' && <BookOpen size={28}/>}
                 {course.color === 'emerald' && <Sun size={28}/>}
               </div>
               <div className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${course.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                 {course.status}
               </div>
            </div>
            
            <h3 className="text-xl font-black mb-4 h-14">{course.title}</h3>
            
            <div className="space-y-3 mb-6">
               <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>Modules</span> <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{course.modules}</span>
               </div>
               <div className="flex justify-between text-sm font-bold text-slate-500">
                  <span>Enrolled</span> <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{course.students} Students</span>
               </div>
            </div>

            <div className="mt-auto flex gap-2">
               <button className={`flex-1 py-3 rounded-xl font-black transition-all ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'}`}>Manage</button>
               <button className={`w-12 flex items-center justify-center rounded-xl transition-all ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-400' : 'bg-slate-50 hover:bg-slate-100 text-slate-500'}`}><Edit2 size={18}/></button>
               <button className={`w-12 flex items-center justify-center rounded-xl transition-all ${theme === 'dark' ? 'bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500' : 'bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-500'}`}><Trash2 size={18}/></button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={`rounded-[2.5rem] p-8 shadow-xl border-b-[12px] mt-8 ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
         <h3 className="text-xl font-black mb-6">Recent Uploads</h3>
         <div className="space-y-4">
            {[
               { name: "Fractions Chapter 2 Notes (PDF)", type: "pdf", date: "Today, 10:00 AM", size: "2.4 MB" },
               { name: "Grammar Basics Video Lecture", type: "video", date: "Yesterday, 3:30 PM", size: "150 MB" },
               { name: "Science Project Guidelines", type: "doc", date: "Oct 12, 2026", size: "1.1 MB" },
            ].map((file, i) => (
               <div key={i} className={`flex items-center justify-between p-4 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${file.type === 'pdf' ? 'bg-rose-500/10 text-rose-500' : file.type === 'video' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
                        {file.type === 'video' ? <Video size={18}/> : <FileText size={18}/>}
                     </div>
                     <div>
                        <p className="font-black text-lg">{file.name}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{file.date} • {file.size}</p>
                     </div>
                  </div>
                  <button className="text-indigo-500 font-black text-sm hover:underline">Download</button>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
