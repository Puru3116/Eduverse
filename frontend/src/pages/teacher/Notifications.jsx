import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, User, Users, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../store/AppContext';
import api from '../../utils/api';

export default function Notifications({ theme }) {
  const { teacher } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/teacher-group-messages/${teacher?.classGrade || '1'}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await api.post('/teacher-group-messages', {
        content: newMessage,
        classGrade: teacher?.classGrade || '1'
      });
      // Immediately update with the new message from response
      setMessages(prev => [...prev, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error("Failed to send message", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await api.delete(`/teacher-group-messages/${messageId}`);
      setMessages(messages.filter(m => m._id !== messageId));
    } catch (err) {
      console.error("Failed to delete message", err);
      alert("Failed to delete message.");
    }
  };

  const handleClearChat = async () => {
    if (!window.confirm("ARE YOU SURE? This will delete the ENTIRE group chat for ALL teachers in this grade!")) return;
    try {
      await api.delete(`/teacher-group-messages/group/${teacher?.classGrade || '1'}`);
      setMessages([]);
    } catch (err) {
      console.error("Failed to clear chat", err);
      alert("Failed to clear chat.");
    }
  };

  const getGradeName = (grade) => {
    if (grade === '1') return 'Explorer';
    if (grade === '2-5') return 'Builder';
    if (grade === '6-8') return 'Achiever';
    return 'General';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10">
      <div className="flex justify-between items-end">
         <div>
            <h2 className="text-2xl font-black mb-1">Staff Collaboration Hub</h2>
            <p className="text-slate-500 font-bold">Direct communication channel with fellow {getGradeName(teacher?.classGrade)} teachers.</p>
         </div>
         {messages.length > 0 && (
            <button 
               onClick={handleClearChat}
               className="text-xs font-black text-rose-500 hover:text-rose-600 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 transition-all"
            >
               <Trash2 size={14}/> Clear All History
            </button>
         )}
      </div>

      <motion.div 
         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
         className={`rounded-[2.5rem] flex flex-col h-[650px] shadow-xl border-b-[12px] overflow-hidden ${theme === 'dark' ? 'bg-slate-900 border-slate-950' : 'bg-white border-slate-100'}`}
      >
         <div className="p-6 border-b-2 border-slate-200 dark:border-slate-800 flex items-center justify-between bg-indigo-500/5">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <Users size={24}/>
               </div>
               <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                     {getGradeName(teacher?.classGrade)} Teachers Lounge
                  </h3>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                     <p className="text-xs font-bold text-slate-400">Live Community Chat</p>
                  </div>
               </div>
            </div>
            <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 flex items-center justify-center text-slate-400">
                     <User size={16}/>
                  </div>
               ))}
               <div className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-500 flex items-center justify-center text-[10px] text-white font-black">
                  Active
               </div>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30">
            {messages.length === 0 && (
               <div className="h-full flex flex-col items-center justify-center text-center p-10">
                  <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-500 mb-4">
                     <MessageSquare size={40}/>
                  </div>
                  <h4 className="font-black text-lg mb-2">No messages yet</h4>
                  <p className="text-slate-400 font-bold text-sm max-w-xs">Be the first to start a discussion with your fellow {getGradeName(teacher?.classGrade)} teachers.</p>
               </div>
            )}
            
            {messages.map((msg, i) => {
               const senderId = msg.sender?._id || msg.sender;
               const myId = teacher?.id || teacher?._id;
               const isMe = senderId === myId;
               return (
                  <div key={msg._id || i} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group`}>
                     <div className={`max-w-[75%] flex gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                        {!isMe && (
                           <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-400 mt-1">
                              <User size={16}/>
                           </div>
                        )}
                        <div className={`space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col relative`}>
                           {!isMe && <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{msg.sender?.name || 'Fellow Teacher'}</p>}
                           <div className={`px-4 py-3 rounded-2xl font-bold text-sm shadow-sm relative group ${
                              isMe 
                                 ? 'bg-indigo-600 text-white rounded-tr-none' 
                                 : (theme === 'dark' ? 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700' : 'bg-white text-slate-800 rounded-tl-none border border-slate-200')
                           }`}>
                              {msg.content}
                              {isMe && (
                                 <button 
                                    onClick={() => handleDeleteMessage(msg._id)}
                                    className="absolute -left-8 top-1/2 -translate-y-1/2 p-1.5 text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10 rounded-lg"
                                 >
                                    <Trash2 size={14}/>
                                 </button>
                              )}
                           </div>
                           <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                     </div>
                  </div>
               );
            })}
            <div ref={chatEndRef} />
         </div>

         <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 flex gap-3">
            <input 
               type="text"
               value={newMessage}
               onChange={(e) => setNewMessage(e.target.value)}
               placeholder={`Send a message to ${getGradeName(teacher?.classGrade)} teachers...`}
               className={`flex-1 px-6 py-3.5 rounded-2xl font-bold text-sm border-2 transition-all outline-none focus:border-indigo-500 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
            />
            <button 
               type="submit"
               disabled={!newMessage.trim() || sending}
               className="px-6 rounded-2xl bg-indigo-600 text-white flex items-center justify-center gap-2 font-black shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 active:scale-95 transition-all disabled:opacity-50"
            >
               <span>Send</span>
               <Send size={18}/>
            </button>
         </form>
      </motion.div>
    </div>
  );
}
