import React, { useState, useRef } from 'react';
import { User, Camera, Lock, Save, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function StudentProfile({ onClose }) {
  const { student, setStudent, theme } = useAppContext();
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';
  
  const [firstName, setFirstName] = useState(student?.firstName || '');
  const [lastName, setLastName] = useState(student?.lastName || '');
  const [profileImage, setProfileImage] = useState(student?.profileImage || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const studentId = student.id || student._id;
      const res = await api.put(`/students/${studentId}`, {
        firstName,
        lastName,
        profileImage
      });
      setStudent(res.data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const initial = (firstName.charAt(0) || student?.name?.charAt(0) || 'S').toUpperCase();

  const formatClassGrade = (grade) => {
    if (!grade) return 'N/A';
    const num = parseInt(grade);
    if (num >= 1 && num <= 3) return `EXPLORER (CLASS ${num})`;
    if (num >= 4 && num <= 6) return `BUILDER (CLASS ${num})`;
    if (num >= 7 && num <= 10) return `ACHIEVER (CLASS ${num})`;
    return `CLASS ${grade}`.toUpperCase();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`w-full max-w-4xl mx-auto p-6 md:p-10 rounded-[3rem] shadow-2xl border-b-[16px] transition-all duration-500
        ${isDarkMode ? 'bg-slate-900 border-indigo-900 shadow-indigo-500/10' : 'bg-white border-indigo-100 shadow-slate-200/50'}`}
    >
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className={`p-3 rounded-2xl transition-all ${isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>My Profile</h2>
            <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Customize your learning identity</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className={`px-8 py-3 rounded-2xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 flex items-center gap-2 hover:bg-indigo-500 transition-all ${loading ? 'opacity-50' : ''}`}
        >
          <Save size={20}/> {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message.text && (
        <div className={`mb-8 p-4 rounded-2xl font-bold text-center border-2 transition-all
          ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left Column: Avatar & Quick Stats */}
        <div className="md:col-span-4 space-y-6">
          <div className={`p-8 rounded-[2.5rem] shadow-xl border-b-[8px] flex flex-col items-center text-center transition-all
            ${isDarkMode ? 'bg-slate-800 border-slate-950' : 'bg-slate-50 border-slate-100'}`}>
            
            <div className="relative mb-6 group cursor-pointer" onClick={() => fileInputRef.current.click()}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-xl" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-black shadow-xl">
                  {initial}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]">
                <Camera className="text-white" size={32}/>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <h3 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{firstName} {lastName}</h3>
            <p className="text-indigo-500 font-black uppercase tracking-widest text-xs mt-1">{formatClassGrade(student?.classGrade)}</p>
            
            <div className="w-full mt-8 space-y-3">
              <button 
                onClick={() => navigate('/student/security')}
                className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all border-b-4
                ${isDarkMode ? 'bg-slate-900 text-amber-400 border-slate-950 hover:bg-slate-700' : 'bg-white text-amber-600 border-amber-100 hover:bg-amber-50'}`}
              >
                <Lock size={20}/> Security Settings
              </button>
            </div>
          </div>


        </div>

        {/* Right Column: Edit Form */}
        <div className="md:col-span-8 space-y-8">
          <div className="space-y-6">
            <h3 className={`text-xl font-black pb-4 border-b-2 ${isDarkMode ? 'border-slate-800 text-white' : 'border-slate-100 text-slate-800'}`}>Personal Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`text-xs font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={20} />
                  <input 
                    type="text" 
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none font-bold transition-all
                      ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`}
                    placeholder="Enter first name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Last Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={20} />
                  <input 
                    type="text" 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 outline-none font-bold transition-all
                      ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-xs font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Email (Read Only)</label>
              <input 
                type="email" 
                value={student?.email || ''} 
                disabled
                className={`w-full px-6 py-4 rounded-2xl border-2 outline-none font-bold opacity-60 cursor-not-allowed
                  ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-100 text-slate-500'}`}
              />
            </div>
            <div className="space-y-2 mt-6">
              <label className={`text-xs font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Class (Read Only)</label>
              <input 
                type="text" 
                value={formatClassGrade(student?.classGrade)} 
                disabled
                className={`w-full px-6 py-4 rounded-2xl border-2 outline-none font-black opacity-60 text-indigo-500 cursor-not-allowed
                  ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-100'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
