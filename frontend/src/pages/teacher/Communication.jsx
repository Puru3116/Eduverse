import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Megaphone, Send, Users, Paperclip, Search, Plus, Trash2 } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';
import api from '../../utils/api';

const BACKEND_URL = 'http://localhost:5005/api';

export default function Communication({ students = [], theme }) {
  const { teacher } = useAppContext();
  const [activeTab, setActiveTab] = useState('announcements');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [showNewBroadcast, setShowNewBroadcast] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const chatEndRef = useRef(null);
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    fetchAnnouncements();
    const interval = setInterval(() => {
      fetchAnnouncements();
      if (selectedStudent) fetchMessages(selectedStudent._id);
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedStudent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await api.get('/announcements');
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async (studentId) => {
    try {
      const teacherId = teacher.id || teacher._id;
      const res = await api.get(`/messages/${teacherId}/${studentId}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async () => {
    const teacherId = teacher.id || teacher._id;
    if (!newMessage.trim() || !selectedStudent) return;
    try {
      const res = await api.post('/messages', {
        sender: teacherId,
        senderModel: 'Teacher',
        receiver: selectedStudent._id,
        receiverModel: 'Student',
        content: newMessage
      });
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error(err);
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
    if (!selectedStudent) return;
    if (!window.confirm(`Clear entire conversation with ${selectedStudent.name}?`)) return;
    
    try {
      const teacherId = teacher.id || teacher._id;
      await api.delete(`/messages/conversation/${teacherId}/${selectedStudent._id}`);
      setMessages([]);
    } catch (err) {
      console.error("Failed to clear conversation", err);
    }
  };

  const handleSendBroadcast = async () => {
    const teacherId = teacher.id || teacher._id;
    if (!broadcastTitle.trim() || !broadcastContent.trim()) return;
    try {
      await api.post('/announcements', {
        teacher: teacherId,
        title: broadcastTitle,
        content: broadcastContent
      });
      setBroadcastTitle('');
      setBroadcastContent('');
      setShowNewBroadcast(false);
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <div>
            <h2 className={`text-3xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Communication Center</h2>
            <p className="text-slate-500 font-bold">Manage announcements and direct messages.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[75vh]">
         {/* Sidebar */}
         <div className={`lg:col-span-4 rounded-[2.5rem] p-6 shadow-xl border-b-[12px] flex flex-col ${isDarkMode ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            <div className="flex gap-2 mb-6 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl">
               <button onClick={() => setActiveTab('announcements')} className={`flex-1 py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all ${activeTab === 'announcements' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-500' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>
                  <Megaphone size={18}/> Broadcasts
               </button>
               <button onClick={() => setActiveTab('messages')} className={`flex-1 py-3 rounded-xl font-black flex items-center justify-center gap-2 transition-all ${activeTab === 'messages' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-500' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}>
                  <MessageSquare size={18}/> Messages
               </button>
            </div>

            {activeTab === 'messages' && (
               <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                  <div className="relative mb-4">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                     <input 
                        type="text" 
                        placeholder="Search students..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-100 text-slate-900 focus:border-indigo-500'}`}
                     />
                  </div>
                  {filteredStudents.map((st) => (
                     <div 
                        key={st._id} 
                        onClick={() => { setSelectedStudent(st); fetchMessages(st._id); }}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedStudent?._id === st._id ? (isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600') : (isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-50 text-slate-700')}`}
                     >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black">
                          {st.name.charAt(0)}
                        </div>
                        <div className="flex-1 overflow-hidden">
                           <p className="font-black truncate">{st.name}</p>
                           <p className="text-xs font-bold text-slate-400 truncate">Click to chat</p>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {activeTab === 'announcements' && (
               <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                  <button 
                    onClick={() => setShowNewBroadcast(true)}
                    className="w-full py-4 rounded-xl font-black bg-indigo-600 text-white flex items-center justify-center gap-2 mb-4 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                  >
                     <Plus size={18}/> New Broadcast
                  </button>
                  {announcements.map((ann) => (
                     <div key={ann._id} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${isDarkMode ? 'border-slate-800 bg-slate-800/50 hover:border-indigo-500' : 'border-slate-100 bg-slate-50 hover:border-indigo-200 shadow-sm'}`}>
                        <h4 className={`font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{ann.title}</h4>
                        <div className="flex justify-between text-xs font-bold text-slate-400">
                           <span>{new Date(ann.timestamp).toLocaleDateString()}</span>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>

         {/* Main Area */}
         <div className={`lg:col-span-8 rounded-[2.5rem] shadow-xl border-b-[12px] flex flex-col overflow-hidden ${isDarkMode ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}>
            {activeTab === 'messages' ? (
               selectedStudent ? (
                  <>
                     <div className={`p-6 border-b flex items-center justify-between gap-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black">
                              {selectedStudent.name.charAt(0)}
                           </div>
                           <div>
                              <h3 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{selectedStudent.name}</h3>
                              <p className="text-xs font-bold text-emerald-500 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Online</p>
                           </div>
                        </div>
                        <button 
                           onClick={handleClearConversation}
                           className="text-xs font-black text-rose-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 transition-all"
                        >
                           <Trash2 size={14}/> Clear Chat
                        </button>
                     </div>
                     
                     <div className="flex-1 p-6 overflow-y-auto space-y-6 custom-scrollbar">
                        {messages.map((msg) => {
                           const isMe = msg.sender === (teacher.id || teacher._id);
                           return (
                              <div key={msg._id} className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''} group`}>
                                 <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-black ${isMe ? 'bg-emerald-500' : 'bg-indigo-500'}`}>
                                    {isMe ? 'T' : selectedStudent.name.charAt(0)}
                                 </div>
                                 <div className={`p-4 rounded-2xl max-w-[80%] shadow-sm relative ${isMe ? 'bg-indigo-600 text-white rounded-tr-none' : (isDarkMode ? 'bg-slate-800 text-white rounded-tl-none' : 'bg-slate-100 text-slate-800 rounded-tl-none')}`}>
                                    <p className="font-bold">{msg.content}</p>
                                    <p className={`text-[10px] font-black mt-2 text-right ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
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

                     <div className={`p-4 border-t flex gap-2 ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
                        <input 
                           type="text" 
                           value={newMessage}
                           onChange={(e) => setNewMessage(e.target.value)}
                           onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                           placeholder="Type a message..." 
                           className={`flex-1 px-4 py-3 rounded-xl outline-none font-bold transition-all border-2 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-100 border-slate-100 text-slate-900 focus:border-indigo-500'}`}
                        />
                        <button 
                           onClick={handleSendMessage}
                           className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-black flex items-center gap-2 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                        >
                           Send <Send size={18}/>
                        </button>
                     </div>
                  </>
               ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                     <MessageSquare size={100} className="mb-6"/>
                     <h3 className="text-3xl font-black uppercase tracking-widest">Select a Student to Chat</h3>
                  </div>
               )
            ) : (
               <div className="p-10 h-full flex flex-col">
                  {showNewBroadcast ? (
                    <div className="space-y-6">
                       <h2 className="text-3xl font-black">New Broadcast</h2>
                       <div className="space-y-4">
                          <input 
                             type="text" placeholder="Title of announcement" 
                             value={broadcastTitle} onChange={(e) => setBroadcastTitle(e.target.value)}
                             className={`w-full px-6 py-4 rounded-2xl border-2 outline-none font-bold ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100'}`}
                          />
                          <textarea 
                             placeholder="Write your announcement here..." rows="8"
                             value={broadcastContent} onChange={(e) => setBroadcastContent(e.target.value)}
                             className={`w-full px-6 py-4 rounded-2xl border-2 outline-none font-bold resize-none ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-100'}`}
                          ></textarea>
                          <div className="flex gap-4">
                             <button onClick={handleSendBroadcast} className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-black shadow-xl hover:bg-indigo-500 transition-all">Send to All Students</button>
                             <button onClick={() => setShowNewBroadcast(false)} className={`px-8 py-4 rounded-2xl font-black ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>Cancel</button>
                          </div>
                       </div>
                    </div>
                  ) : announcements.length > 0 ? (
                    <>
                       <div className="flex justify-between items-start mb-8">
                          <div>
                             <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 mb-4 inline-block">Broadcast History</span>
                             <h2 className="text-3xl font-black mb-2">{announcements[0].title}</h2>
                             <p className="text-sm font-bold text-slate-400">Posted by You • {new Date(announcements[0].timestamp).toLocaleString()}</p>
                          </div>
                       </div>
                       
                       <div className={`flex-1 p-8 rounded-2xl overflow-y-auto custom-scrollbar ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                          <p className={`font-bold leading-relaxed whitespace-pre-line text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                             {announcements[0].content}
                          </p>
                       </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                       <Megaphone size={100} className="mb-6"/>
                       <h3 className="text-3xl font-black uppercase tracking-widest">No Broadcasts Yet</h3>
                    </div>
                  )}
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
