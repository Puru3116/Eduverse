import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Megaphone, Send, ArrowLeft, Search, User, UserCheck, Trash2 } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import api from '../utils/api';

export default function StudentCommunication({ onClose }) {
  const { student, theme } = useAppContext();
  const [activeTab, setActiveTab] = useState('announcements');
  const [announcements, setAnnouncements] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const isDarkMode = theme === 'dark';
  const chatEndRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      await fetchInitialData();
      if (activeTab === 'messages' && selectedTeacher) {
        fetchUpdates();
      }
    };
    load();
    const interval = setInterval(fetchUpdates, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [activeTab, selectedTeacher]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchInitialData = async () => {
    try {
      if (activeTab === 'announcements') {
        const res = await api.get('/announcements');
        setAnnouncements(res.data);
      } else {
        const teachersRes = await api.get('/auth/teachers');
        const filtered = teachersRes.data.filter(t => t.classGrade === student.classGrade);
        setTeachers(filtered);
        if (filtered.length > 0 && !selectedTeacher) {
          setSelectedTeacher(filtered[0]);
        }
      }
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  const fetchUpdates = async () => {
    try {
      if (activeTab === 'announcements') {
        const res = await api.get('/announcements');
        setAnnouncements(res.data);
      } else if (selectedTeacher) {
        const teacherId = selectedTeacher.id || selectedTeacher._id;
        const studentId = student.id || student._id;
        const res = await api.get(`/messages/${studentId}/${teacherId}`);
        setMessages(res.data);
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleSendMessage = async () => {
    const teacherId = selectedTeacher?.id || selectedTeacher?._id;
    const studentId = student?.id || student?._id;
    if (!newMessage.trim() || !teacherId) return;

    try {
      const res = await api.post('/messages', {
        sender: studentId,
        senderModel: 'Student',
        receiver: teacherId,
        receiverModel: 'Teacher',
        content: newMessage
      });
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await api.delete(`/messages/${messageId}`);
      setMessages(messages.filter(m => m._id !== messageId));
    } catch (err) {
      console.error("Failed to delete message", err);
    }
  };

  const handleClearConversation = async () => {
    if (!selectedTeacher) return;
    if (!window.confirm(`Clear entire conversation with ${selectedTeacher.name}?`)) return;
    
    try {
      const studentId = student.id || student._id;
      const teacherId = selectedTeacher.id || selectedTeacher._id;
      await api.delete(`/messages/conversation/${studentId}/${teacherId}`);
      setMessages([]);
    } catch (err) {
      console.error("Failed to clear conversation", err);
    }
  };

  const filteredTeachers = teachers.filter(t => {
    return t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           t.classGrade?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`w-full max-w-6xl mx-auto h-[85vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border-b-[16px] transition-all
        ${isDarkMode ? 'bg-slate-900 border-indigo-900 shadow-indigo-500/10' : 'bg-white border-indigo-100 shadow-slate-200/50'}`}
    >
      {/* Header */}
      <div className={`p-6 md:p-8 flex items-center justify-between border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="flex items-center gap-4">
          <button onClick={onClose} className={`p-3 rounded-2xl transition-all ${isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Communication Center</h2>
            <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Stay connected with your teachers</p>
          </div>
        </div>

        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl">
          <button 
            onClick={() => setActiveTab('announcements')} 
            className={`px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all ${activeTab === 'announcements' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-500' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
          >
            <Megaphone size={18}/> Broadcasts
          </button>
          <button 
            onClick={() => setActiveTab('messages')} 
            className={`px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all ${activeTab === 'messages' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-500' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
          >
            <MessageSquare size={18}/> Messages
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'announcements' ? (
            <motion.div 
              key="ann" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="w-full h-full p-8 overflow-y-auto custom-scrollbar space-y-6"
            >
              {announcements.length > 0 ? (
                announcements.map((ann) => (
                  <div key={ann._id} className={`p-8 rounded-[2.5rem] border-2 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-black">
                          {ann.teacher?.name?.charAt(0) || 'T'}
                        </div>
                        <div>
                          <h4 className={`font-black text-xl ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{ann.title}</h4>
                          <p className="text-xs font-bold text-slate-400">Posted by {ann.teacher?.name || 'Teacher'} • {new Date(ann.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500">New</span>
                    </div>
                    <p className={`font-bold leading-relaxed whitespace-pre-line ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {ann.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-center opacity-20">
                  <Megaphone size={100} className="mb-6"/>
                  <h3 className="text-3xl font-black uppercase tracking-widest">No Broadcasts Yet</h3>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="msg" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="w-full h-full flex"
            >
              {/* Teacher List Sidebar */}
              <div className={`w-1/3 border-r flex flex-col ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
                <div className="p-6 border-b border-inherit">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                    <input 
                      type="text" 
                      placeholder="Search teachers..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 rounded-2xl outline-none transition-all border-2
                        ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'}`}
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                  {filteredTeachers.map(t => (
                    <button 
                      key={t._id || t.id}
                      onClick={() => { setSelectedTeacher(t); setMessages([]); }}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${ (selectedTeacher?.id || selectedTeacher?._id) === (t.id || t._id) ? 'bg-indigo-600 text-white shadow-lg' : (isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-white text-slate-600')}`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${ (selectedTeacher?.id || selectedTeacher?._id) === (t.id || t._id) ? 'bg-white/20' : 'bg-indigo-500 text-white'}`}>
                        {t.name?.charAt(0)}
                      </div>
                      <div className="text-left overflow-hidden">
                        <p className="font-black truncate">{t.name}</p>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${ (selectedTeacher?.id || selectedTeacher?._id) === (t.id || t._id) ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {t.classGrade ? `Class ${t.classGrade}` : 'General'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {selectedTeacher ? (
                  <>
                    <div className={`p-4 px-8 border-b flex items-center justify-between ${isDarkMode ? 'border-slate-800 bg-slate-800/30' : 'border-slate-100 bg-slate-50/50'}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-indigo-500 flex items-center justify-center text-white font-black text-xl">
                          {selectedTeacher.name?.charAt(0)}
                        </div>
                        <div>
                          <h3 className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{selectedTeacher.name}</h3>
                          <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Online
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={handleClearConversation}
                        className="text-xs font-black text-rose-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 transition-all"
                      >
                        <Trash2 size={14}/> Clear Chat
                      </button>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-6">
                      {messages.map((msg) => {
                        const isMe = msg.sender === (student.id || student._id);
                        return (
                          <div key={msg._id} className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''} group`}>
                            <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center text-white text-xs font-black shadow-lg ${isMe ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                              {isMe ? (student.firstName?.charAt(0) || 'S') : (selectedTeacher.name?.charAt(0) || 'T')}
                            </div>
                            <div className={`p-4 px-6 rounded-[1.5rem] max-w-[70%] shadow-sm relative ${isMe ? 'bg-indigo-600 text-white rounded-tr-none' : (isDarkMode ? 'bg-slate-800 text-white rounded-tl-none' : 'bg-slate-100 text-slate-800 rounded-tl-none')}`}>
                              <p className="font-bold">{msg.content}</p>
                              <p className={`text-[9px] font-black mt-2 text-right ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              {isMe && (
                                <button 
                                  onClick={() => handleDeleteMessage(msg._id)}
                                  className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-xl"
                                >
                                  <Trash2 size={16}/>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div ref={chatEndRef} />
                    </div>

                    <div className={`p-6 border-t flex gap-4 ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
                      <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={`Message ${selectedTeacher.name}...`} 
                        className={`flex-1 px-6 py-4 rounded-2xl outline-none font-bold transition-all border-2
                          ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`}
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black flex items-center gap-3 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/30"
                      >
                        Send <Send size={20}/>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                    <UserCheck size={100} className="mb-6"/>
                    <h3 className="text-3xl font-black uppercase tracking-widest">Select a Teacher</h3>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
