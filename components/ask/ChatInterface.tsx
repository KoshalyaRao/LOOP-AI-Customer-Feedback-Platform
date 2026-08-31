'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, HelpCircle, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EvidenceCard } from '@/components/ask/EvidenceCard';
import { useToast } from '@/components/ui/Toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  evidence?: any[];
  timestamp: string;
}

export function ChatInterface() {
  const { showToast } = useToast();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content:
        "Hello! I'm LOOP AI. I can analyze your workspace's customer feedback records and answer your questions with grounded database evidence. What would you like to explore today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const suggestedPrompts = [
    'What are customers saying about onboarding?',
    'What is the biggest customer complaint?',
    'Which features are customers loving?',
    'What problems are trending this month?',
    'Summarize negative feedback from the last 30 days.',
  ];

  const handleSend = async (queryText?: string) => {
    const activeQuery = (queryText || question).trim();
    if (!activeQuery || isLoading) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: activeQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: activeQuery }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer');
      }

      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: data.answer,
        evidence: data.evidence,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      showToast(err.message || 'Error processing query', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] glass-panel rounded-2xl border border-slate-800/90 overflow-hidden shadow-2xl">
      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 sm:gap-4 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 shrink-0">
                <Bot className="w-5 h-5" />
              </div>
            )}

            <div className={`max-w-2xl space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/15 rounded-tr-none'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-100 rounded-tl-none shadow-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <span className="block text-[10px] opacity-60 mt-2 text-right">{msg.timestamp}</span>
              </div>

              {/* Grounded Evidence Cards */}
              {msg.evidence && msg.evidence.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3 mt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <Layers className="w-4 h-4 text-brand-400" />
                    <span>Retrieved Database Evidence ({msg.evidence.length} Feedback Items)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {msg.evidence.map((evItem: any) => (
                      <EvidenceCard key={evItem.id} item={evItem} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-9 h-9 rounded-xl bg-brand-600/30 flex items-center justify-center text-brand-400 shrink-0 animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-slate-400 flex items-center gap-3 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
              Searching customer feedback database & generating grounded response...
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts & Input Bar */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
        {/* Prompt Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-brand-400" /> Try asking:
          </span>
          {suggestedPrompts.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(promptText)}
              disabled={isLoading}
              className="px-3 py-1 rounded-full bg-slate-900 hover:bg-brand-600/20 text-slate-300 hover:text-brand-300 text-xs border border-slate-800 hover:border-brand-500/40 shrink-0 transition-all"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Controls */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about what your customers are saying..."
            disabled={isLoading}
            className="flex-1 rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || !question.trim()}
            className="h-11 px-5 gap-2"
          >
            <span>Ask</span>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
