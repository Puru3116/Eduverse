import React, { useState } from 'react';
import { Lock, Shield, ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function StudentSecurity() {
  const { student, theme } = useAppContext();
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const studentId = student.id || student._id;
      await api.put(`/students/${studentId}/password`, {
        currentPassword,
        newPassword
      });
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || err.response?.data?.msg || err.message || 'Failed to update password';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-6 md:p-12 transition-all duration-700 ${isDarkMode ? 'bg-[#0a0f1e]' : 'bg-slate-50'}`}>
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')} 
          className={`flex items-center gap-2 font-black mb-10 transition-colors ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-indigo-600'}`}
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-10 md:p-12 rounded-[3rem] shadow-2xl border-b-[16px] transition-all duration-500
            ${isDarkMode ? 'bg-slate-900 border-indigo-900 shadow-indigo-500/10' : 'bg-white border-indigo-100 shadow-slate-200/50'}`}
        >
          <div className="flex items-center gap-5 mb-10">
            <div className="p-4 rounded-3xl bg-amber-500/10 text-amber-500 shadow-lg shadow-amber-500/10">
              <Shield size={32} />
            </div>
            <div>
              <h1 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Security</h1>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Manage your password and protection</p>
            </div>
          </div>

          {student?.isGoogleAuth && (
            <div className="mb-10 p-6 rounded-[2rem] bg-indigo-500/10 border-2 border-indigo-500/20 flex items-start gap-4">
              <AlertCircle className="text-indigo-500 shrink-0 mt-1" size={24} />
              <p className="text-sm font-bold text-indigo-500 leading-relaxed">
                You are currently logged in with Google. You can set a password here to enable direct email login in the future.
              </p>
            </div>
          )}

          {message.text && (
            <div className={`mb-8 p-5 rounded-2xl font-black text-center border-2 transition-all
              ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-8">
            {!student?.isGoogleAuth && (
              <div className="space-y-3">
                <label className={`text-xs font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Current Password</label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-slate-600 group-focus-within:text-indigo-500' : 'text-slate-300 group-focus-within:text-indigo-600'}`} size={20} />
                  <input 
                    type="password" 
                    value={currentPassword} 
                    onChange={e => setCurrentPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 py-5 rounded-[1.5rem] border-2 outline-none font-bold transition-all
                      ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`}
                    placeholder="Enter current password"
                    required
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className={`text-xs font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>New Password</label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-slate-600 group-focus-within:text-indigo-500' : 'text-slate-300 group-focus-within:text-indigo-600'}`} size={20} />
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 py-5 rounded-[1.5rem] border-2 outline-none font-bold transition-all
                      ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`}
                    placeholder="New password"
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className={`text-xs font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Confirm New Password</label>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-slate-600 group-focus-within:text-indigo-500' : 'text-slate-300 group-focus-within:text-indigo-600'}`} size={20} />
                  <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={e => setConfirmPassword(e.target.value)}
                    className={`w-full pl-12 pr-4 py-5 rounded-[1.5rem] border-2 outline-none font-bold transition-all
                      ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`}
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-[2rem] font-black bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-3 hover:bg-indigo-500 transition-all active:scale-[0.98] mt-4
                ${loading ? 'opacity-50' : ''}`}
            >
              <Save size={24}/> {loading ? 'Updating Security...' : 'Update Password'}
            </button>
          </form>

          <div className={`mt-12 pt-10 border-t-2 flex items-center justify-center gap-8 ${isDarkMode ? 'border-slate-800' : 'border-slate-50'}`}>
            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm italic">
               <Shield size={16}/> End-to-end encrypted
            </div>
            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm italic">
               <Lock size={16}/> Secure storage
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
