'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Users, Sparkles, ExternalLink } from 'lucide-react';

export default function ClipperChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'DevFlow Moderator',
      role: 'BRAND',
      avatar: 'D',
      time: '10:32 AM',
      text: 'Hey clippers! The NextGen DevTools campaign cap has been raised to ₹1,00,000. New raw 4K founder podcasts are available in the asset drive.',
    },
    {
      id: 2,
      sender: 'Satyaaaa',
      role: 'CLIPPER',
      avatar: 'S',
      time: '10:45 AM',
      text: 'Awesome, just submitted a 35s edit on the Cursor 2.0 voice coding segment. Hook is crazy good!',
    },
    {
      id: 3,
      sender: 'Aarav Sharma',
      role: 'CLIPPER',
      avatar: 'A',
      time: '11:04 AM',
      text: 'Verified views CPM payout arrived in 40 minutes via UPI. Best platform so far 🔥',
    },
  ]);

  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'Satyaaaa',
        role: 'CLIPPER',
        avatar: 'S',
        time: 'Just now',
        text: input.trim(),
      },
    ]);
    setInput('');
  };

  return (
    <div className="space-y-6 max-w-5xl h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] shrink-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">ClipMatrix Chat</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time Discord community channel with brand campaign managers, top editors, and administrators.
          </p>
        </div>

        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-500/20"
        >
          <span>Open in Discord</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Messages Thread Container */}
      <div className="flex-1 rounded-3xl bg-[#0c1022] border border-white/[0.08] p-5 overflow-y-auto space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isMe = msg.sender === 'Satyaaaa';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-9 h-9 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                    isMe
                      ? 'bg-[#00B887] text-white'
                      : msg.role === 'BRAND'
                      ? 'bg-purple-600 text-white'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {msg.avatar}
                </div>

                <div className={`max-w-lg space-y-1 ${isMe ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-bold text-white">{msg.sender}</span>
                    <span className="text-[10px] font-mono">• {msg.time}</span>
                  </div>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-[#00B887] text-white rounded-tr-none'
                        : 'bg-white/[0.05] border border-white/10 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-4 border-t border-white/[0.08] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message to the ClipMatrix creator community..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm outline-none focus:border-[#00B887] transition-all"
          />
          <button
            type="submit"
            className="p-3 rounded-2xl bg-[#00B887] hover:bg-[#009E74] text-white transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
