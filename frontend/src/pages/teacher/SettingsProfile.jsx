import React, { useState, useRef, useEffect } from 'react';
import { User, Lock, Bell, Camera, Save, Shield, AlertCircle } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import { motion } from 'framer-motion';
import api from '../../utils/api';

export default function SettingsProfile({ theme }) {
  const { teacher, setTeacher } = useAppContext();
  
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Profile States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bio, setBio] = useState('');
  const [allowStudentMessages, setAllowStudentMessages] = useState(true);
  const [autoApproveJoinRequests, setAutoApproveJoinRequests] = useState(false);

  // Security States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (teacher) {
      const parts = (teacher.name || '').split(' ');
      setFirstName(parts[0] || '');
      setLastName(parts.slice(1).join(' ') || '');
      setProfileImage(teacher.profileImage || '');
      setBio(teacher.bio || '');
      setAllowStudentMessages(teacher.allowStudentMessages ?? true);
      setAutoApproveJoinRequests(teacher.autoApproveJoinRequests ?? false);
    }
  }, [teacher]);

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

  const handleSaveProfile = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const teacherId = teacher.id || teacher._id;
      const res = await api.put(`/auth/teacher/${teacherId}`, {
        firstName,
        lastName,
        profileImage,
        bio,
        allowStudentMessages,
        autoApproveJoinRequests
      });
      setTeacher(res.data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const teacherId = teacher.id || teacher._id;
      await api.put(`/auth/teacher/${teacherId}/password`, {
        currentPassword,
        newPassword
      });
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };

  const initial = (firstName.charAt(0) || teacher?.name?.charAt(0) || 'T').toUpperCase();
  const classGradeStr = teacher?.classGrade ? `Class ${teacher.classGrade}` : 'Not Specified';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black mb-2">Settings & Profile</h2>
            <p className="text-slate-500 font-bold">Manage your account details and preferences.</p>
         </div>
         {activeTab === 'general' && (
           <button 
             onClick={handleSaveProfile}
             disabled={loading}
             className={`px-6 py-3 rounded-xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-2 ${loading ? 'opacity-50' : ''}`}
           >
              <Save size={20}/> {loading ? 'Saving...' : 'Save Changes'}
           </button>
         )}
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl font-bold text-center border-2 transition-all ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
         {/* Left Sidebar */}
         <div className="md:col-span-4 space-y-4">
            <div className={`p-6 rounded-[2rem] shadow-xl border-b-[8px] flex flex-col items-center text-center ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
               <div className="relative mb-4 group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-indigo-500" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-black shadow-lg uppercase">
                       {initial}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                     <Camera className="text-white" size={24}/>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
               </div>
               <h3 className="text-xl font-black capitalize">{firstName} {lastName}</h3>
               <p className="text-sm font-bold text-slate-500">{teacher?.schoolName || 'EduVerse'} • {classGradeStr}</p>
            </div>

            <div className={`p-2 rounded-2xl shadow-xl flex flex-col ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
               <button 
                 onClick={() => { setActiveTab('general'); setMessage({type:'', text:''}); }}
                 className={`p-4 rounded-xl font-black flex items-center gap-3 text-left transition-all ${activeTab === 'general' ? (theme === 'dark' ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600') : (theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-50')}`}
               >
                  <User size={20}/> General Info
               </button>
               <button 
                 onClick={() => { setActiveTab('security'); setMessage({type:'', text:''}); }}
                 className={`p-4 rounded-xl font-black flex items-center gap-3 text-left transition-all ${activeTab === 'security' ? (theme === 'dark' ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600') : (theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-50')}`}
               >
                  <Lock size={20}/> Security
               </button>
               <button 
                 onClick={() => { setActiveTab('notifications'); setMessage({type:'', text:''}); }}
                 className={`p-4 rounded-xl font-black flex items-center gap-3 text-left transition-all ${activeTab === 'notifications' ? (theme === 'dark' ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-50 text-indigo-600') : (theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-50')}`}
               >
                  <Bell size={20}/> Notifications
               </button>
            </div>
         </div>

         {/* Right Content Area */}
         <div className={`md:col-span-8 rounded-[2.5rem] p-8 shadow-xl border-b-[12px] ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            
            {activeTab === 'general' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <h3 className="text-xl font-black">General Information</h3>
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                         <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">First Name</label>
                         <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-bold capitalize ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`}/>
                      </div>
                      <div>
                         <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Last Name</label>
                         <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-bold capitalize ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`}/>
                      </div>
                   </div>
                   <div>
                      <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Email Address (Read Only)</label>
                      <input type="email" value={teacher?.email || ""} className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-bold ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-100 text-slate-500'} opacity-60 cursor-not-allowed`} disabled/>
                   </div>
                   <div>
                      <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Bio / Qualifications</label>
                      <textarea rows="4" value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell your students a bit about yourself..." className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-bold resize-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`}></textarea>
                   </div>
                </div>

                <h3 className="text-xl font-black mt-10 mb-6 border-t pt-8 dark:border-slate-800">Class Preferences</h3>
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="font-bold text-lg">Allow Student Messages</p>
                         <p className="text-sm font-bold text-slate-400">Students can send direct messages.</p>
                      </div>
                      <div onClick={() => setAllowStudentMessages(!allowStudentMessages)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${allowStudentMessages ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                         <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${allowStudentMessages ? 'right-0.5' : 'left-0.5'}`}></div>
                      </div>
                   </div>
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="font-bold text-lg">Auto-Approve Join Requests</p>
                         <p className="text-sm font-bold text-slate-400">Students entering Class Code will join instantly.</p>
                      </div>
                      <div onClick={() => setAutoApproveJoinRequests(!autoApproveJoinRequests)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${autoApproveJoinRequests ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                         <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${autoApproveJoinRequests ? 'right-0.5' : 'left-0.5'}`}></div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 shadow-lg shadow-amber-500/10">
                      <Shield size={24} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black">Security</h3>
                      <p className="text-sm font-bold text-slate-400">Manage your password and protection.</p>
                   </div>
                </div>

                {teacher?.isGoogleAuth && (
                   <div className="mb-8 p-4 rounded-xl bg-indigo-500/10 border-2 border-indigo-500/20 flex items-start gap-3">
                      <AlertCircle className="text-indigo-500 shrink-0 mt-0.5" size={20} />
                      <p className="text-sm font-bold text-indigo-500">
                         You logged in via Google. You can set a password here to enable direct email login.
                      </p>
                   </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-6">
                   {!teacher?.isGoogleAuth && (
                      <div className="space-y-2">
                         <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Current Password</label>
                         <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none font-bold transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`} placeholder="Current password"/>
                         </div>
                      </div>
                   )}
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">New Password</label>
                      <div className="relative group">
                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                         <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6} className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none font-bold transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`} placeholder="New password"/>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2 block">Confirm New Password</label>
                      <div className="relative group">
                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                         <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none font-bold transition-all ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`} placeholder="Confirm new password"/>
                      </div>
                   </div>

                   <button type="submit" disabled={loading} className={`w-full mt-4 py-4 rounded-xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all hover:bg-indigo-500 ${loading ? 'opacity-50' : ''}`}>
                      <Save size={20}/> {loading ? 'Updating...' : 'Update Password'}
                   </button>
                </form>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shadow-lg shadow-purple-500/10">
                      <Bell size={24} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black">Notifications</h3>
                      <p className="text-sm font-bold text-slate-400">Manage how you receive alerts.</p>
                   </div>
                </div>
                <div className={`p-8 rounded-2xl border-2 border-dashed ${theme === 'dark' ? 'border-slate-700 text-slate-500' : 'border-slate-200 text-slate-400'} text-center font-bold`}>
                   Notification settings coming soon.
                </div>
              </motion.div>
            )}
            
         </div>
      </div>
    </motion.div>
  );
}
