/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, BookOpen, Clock, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'nexian' | 'user';
  text: string;
  timestamp: string;
  references?: string[];
  source?: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-nexian',
  sender: 'nexian',
  text: `Salam, selamat datang di MAN Insan Cendekia Bangka Tengah. Saya **NEXIAN**, asisten cerdas yang siap membantu dan menjawab pertanyaan Anda seputar kurikulum, pendaftaran murid baru (SNMB), SOP madrasah, dan sistem lainnya. Ada yang ingin Anda tanyakan?`,
  timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
  references: ['Basis Data Resmi MAN Insan Cendekia Bangka Tengah'],
};

const SUGGESTIONS = [
  'Info Pendaftaran Murid Baru (SNMB)',
  'Bagaimana alur & SOP KTI di SIMANIS?',
  'Aturan izin saat ASAS/ASAT jika ada urusan?',
  'Bagaimana SOP Remedial & Pengayaan (KKTP)?',
  'Kapan jadwal Asesmen Sumatif (ASAS) Ganjil?',
];

export default function ChatTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          role: 'pengunjung',
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const nexianMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'nexian',
        text: data.reply || 'Maaf, terjadi kendala saat merespons pertanyaan Anda.',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        references: data.references,
        source: data.source,
      };

      setMessages((prev) => [...prev, nexianMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'nexian',
        text: `Maaf, koneksi sementara terputus. Silakan coba kembali sesaat lagi atau tanyakan langsung ke bagian layanan madrasah.`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        references: ['Pusat Bantuan Sistem MAN IC Bangka Tengah'],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-slate-50/50">
      {/* Chat Sub-header */}
      <div className="shrink-0 bg-white/95 px-4 py-2 border-b border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-700">Nexian aktif</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Pelayan Pintar Sistem Madrasah</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-3 space-y-3.5 min-h-0">
        {messages.map((msg) => {
          const isNexian = msg.sender === 'nexian';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isNexian ? 'justify-start' : 'justify-end'}`}
            >
              {isNexian && (
                <div className="shrink-0 mt-0.5">
                  <img
                    src="/assets/aistudio/pasfoto_AIRA_17fe1069.jpg"
                    alt="Nexian"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-emerald-500/30 shadow-2xs"
                  />
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  isNexian
                    ? 'bg-white border border-slate-200 text-slate-800'
                    : 'bg-emerald-600 text-white rounded-tr-xs'
                }`}
              >
                {/* Sender badge & timestamp */}
                <div
                  className={`flex items-center justify-between gap-3 text-[10px] mb-1 font-medium ${
                    isNexian ? 'text-slate-400' : 'text-emerald-100'
                  }`}
                >
                  <span className="font-semibold">{isNexian ? 'NEXIAN' : 'Anda'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Message body formatted */}
                <div className="space-y-1.5 whitespace-pre-line break-words">
                  {msg.text.split('\n').map((line, idx) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <div key={idx} className="h-1" />;

                    // Render bold styling
                    const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                    return (
                      <p
                        key={idx}
                        dangerouslySetInnerHTML={{ __html: formatted }}
                        className={line.startsWith('- ') || line.match(/^\d+\./) ? 'pl-2 text-inherit' : 'text-inherit'}
                      />
                    );
                  })}
                </div>

                {/* Official Reference tag if provided */}
                {isNexian && msg.references && msg.references.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                    <BookOpen className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-600">Rujukan Resmi:</span>
                    {msg.references.map((ref, rIdx) => (
                      <span
                        key={rIdx}
                        className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200/60"
                      >
                        {ref}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-2.5">
            <img
              src="/assets/aistudio/pasfoto_AIRA_17fe1069.jpg"
              alt="Nexian"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-emerald-500/30 shadow-2xs mt-0.5"
            />
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-2xs flex items-center gap-2 text-xs text-slate-500">
              <span className="flex space-x-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
              </span>
              <span>Nexian sedang memeriksa dokumen resmi madrasah...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="shrink-0 bg-white/70 border-t border-slate-200/70 px-3 sm:px-4 py-1.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Tanya cepat:
          </span>
          {SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(item)}
              disabled={loading}
              className="shrink-0 text-[11px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-white p-2.5 sm:p-3 border-t border-slate-200/80">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Tanyakan SNPDB, SOP KTI, Remedial, jadwal asesmen, atau sistem madrasah..."
            className="flex-1 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 rounded-xl px-3.5 py-2.5 outline-hidden transition-all"
          />
          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || loading}
            aria-label="Kirim Pesan"
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-medium p-2.5 rounded-xl shadow-xs transition-colors shrink-0 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
