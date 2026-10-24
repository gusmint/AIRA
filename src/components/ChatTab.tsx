import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  FileText, 
  AlertCircle,
  HelpCircle,
  GraduationCap,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, UserRole } from '../types/curriculum';
import { QUICK_QUESTIONS, MADRASAH_PROFILE } from '../data/curriculumData';
import { FormattedMarkdown } from '../utils/textFormatter';

interface ChatTabProps {
  userRole: UserRole;
  onOpenPdf: () => void;
  onNavigateToTab: (tabId: string) => void;
}

export const ChatTab: React.FC<ChatTabProps> = ({
  userRole,
  onOpenPdf,
  onNavigateToTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'aira',
      text: `Assalamu'alaikum Warahmatullahi Wabarakatuh. 

Saya **AIRA (Academic & Curriculum Assistant)**, asisten virtual cerdas resmi untuk Kurikulum MAN Insan Cendekia Bangka Tengah Tahun Ajaran 2026/2027.

Saya siap membantu Anda memahami:
- **Jadwal Resmi ASAS Ganjil 2026 (23 Nov – 02 Des 2026)**: Rincian sesi jam, tanggal, dan mata pelajaran per jenjang Kelas X, XI, dan XII (termasuk M1-M4 dan Prediction TOEFL).
- **Struktur Kurikulum & Jam Belajar**: Fase E (Kelas X), Fase F (Kelas XI & XII), mata pelajaran pilihan, dan sistem blok waktu terpisah.
- **Peraturan Akademik & Penilaian**: Syarat kehadiran minimal 75%, kaidah 40% soal berbahasa Inggris, variasi bentuk soal asesmen, kriteria kenaikan kelas, dan syarat kelulusan.
- **Program Unggulan**: Karya Tulis Ilmiah (KTI) & Sidang KTI, Studi Kolaboratif, Homestay, Pembelajaran Mendalam (*Deep Learning*), serta Kurikulum Berbasis Cinta (*Panca Cinta*).
- **Hasil TKA & Rapor Pendidikan 2025**: Capaian 14 mata pelajaran Tes Kompetensi Akademik dan pemetaan mutu satuan pendidikan.

Ada yang ingin Anda tanyakan mengenai jadwal ASAS atau kurikulum madrasah hari ini?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      references: ['Dokumen Resmi Kurikulum & Jadwal ASAS 2026/2027 (SK 16 Nov 2026)'],
      suggestedFollowUps: [
        'Bagaimana rincian jadwal lengkap ASAS Ganjil 2026 untuk Kelas X, XI, dan XII?',
        'Kapan jadwal ujian Prediction TOEFL dan SKI?',
        'Berapa syarat kehadiran minimal untuk ikut ujian ASAS?',
        'Kapan jadwal ujian Fisika, Kimia, dan Biologi untuk kelas X?'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          role: userRole,
          history: messages.map((m) => ({ sender: m.sender, text: m.text }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      const airaMsg: ChatMessage = {
        id: `aira-${Date.now()}`,
        sender: 'aira',
        text: data.reply || 'Maaf, terjadi kesalahan pemrosesan.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        references: data.references || ['Dokumen Kurikulum MAN IC Bangka Tengah TA 2026/2027']
      };

      setMessages((prev) => [...prev, airaMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: ChatMessage = {
        id: `aira-err-${Date.now()}`,
        sender: 'aira',
        text: `Maaf, terjadi kendala saat menghubungi server AIRA. Silakan coba sesaat lagi, atau Anda dapat membaca langsung di **Dokumen PDF Resmi** kurikulum madrasah.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        references: ['Dokumen Resmi Kurikulum MAN IC Bangka Tengah']
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (isSpeaking === id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown formatting before speaking
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#/g, '')
      .replace(/`/g, '')
      .replace(/\[cite:.*?\]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    setIsSpeaking(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'aira',
        text: `Percakapan telah diperbarui. Silakan ajukan pertanyaan baru seputar Kurikulum, Jadwal ASAS (23 Nov - 2 Des 2026), Kalender Pendidikan, atau Peraturan Akademik MAN Insan Cendekia Bangka Tengah.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        references: ['Dokumen Resmi Kurikulum & Jadwal ASAS 2026/2027']
      }
    ]);
  };

  const suggestedQuestions = QUICK_QUESTIONS[userRole] || QUICK_QUESTIONS.murid;

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[550px] bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Assistant Status Sub-header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-slate-700">
            AIRA aktif • Terhubung ke Dokumen Kurikulum 2026/2027
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetChat}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-200/70 transition cursor-pointer"
            title="Bersihkan riwayat percakapan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bersihkan Chat</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/30">
        {messages.map((msg) => {
          const isAira = msg.sender === 'aira';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${
                isAira ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs font-bold text-xs ${
                  isAira
                    ? 'bg-gradient-to-br from-emerald-600 to-teal-800 text-white border border-emerald-400/40'
                    : 'bg-slate-800 text-slate-100'
                }`}
              >
                {isAira ? 'AIRA' : <GraduationCap className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div className="space-y-1.5 max-w-[85%] sm:max-w-[88%]">
                <div
                  className={`p-4 rounded-2xl shadow-xs text-slate-800 ${
                    isAira
                      ? 'bg-white border border-slate-200/90 rounded-tl-sm'
                      : 'bg-emerald-700 text-white rounded-tr-sm'
                  }`}
                >
                  {isAira ? (
                    <FormattedMarkdown content={msg.text} />
                  ) : (
                    <p className="text-sm md:text-[15px] whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </p>
                  )}
                </div>

                {/* Footer with References & Actions for AIRA */}
                {isAira && (
                  <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {msg.references && msg.references.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium">
                          <FileText className="w-3 h-3 text-emerald-600" />
                          {msg.references[0]}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleSpeak(msg.id, msg.text)}
                        className={`p-1 rounded hover:bg-slate-200/70 transition cursor-pointer ${
                          isSpeaking === msg.id ? 'text-emerald-700 bg-emerald-100' : 'text-slate-400 hover:text-slate-700'
                        }`}
                        title={isSpeaking === msg.id ? 'Hentikan suara' : 'Dengarkan suara AIRA'}
                      >
                        {isSpeaking === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition cursor-pointer"
                        title="Salin jawaban"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Suggested follow-up queries if provided */}
                {isAira && msg.suggestedFollowUps && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((fu, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(fu)}
                        className="text-xs text-left px-2.5 py-1.5 rounded-lg bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/60 transition cursor-pointer flex items-center gap-1"
                      >
                        <span>{fu}</span>
                        <ArrowRight className="w-3 h-3 shrink-0 text-emerald-600" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex gap-3 max-w-3xl mr-auto">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shrink-0 shadow-xs text-xs font-bold border border-emerald-400/40">
              AIRA
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 rounded-tl-sm shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-slate-500 font-medium ml-1">
                AIRA sedang memeriksa dokumen resmi Kurikulum MAN IC...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions Area */}
      <div className="bg-slate-50/90 border-t border-slate-200 px-4 py-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Topik Rekomendasi ({userRole.toUpperCase()}):
          </span>
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs transition cursor-pointer shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan jadwal, beban JP, KTI, TKA, atau peraturan asesmen kurikulum..."
            className="w-full pl-4 pr-10 py-3 bg-slate-50 focus:bg-white border border-slate-300 focus:border-emerald-500 rounded-xl text-sm outline-none transition text-slate-900 placeholder:text-slate-400"
            disabled={isLoading}
          />
          {input && (
            <button
              type="button"
              onClick={() => setInput('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-1.5 transition cursor-pointer ${
            input.trim() && !isLoading
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Kirim</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
