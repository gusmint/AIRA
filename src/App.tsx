import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatTab } from './components/ChatTab';
import { CurriculumExplorerTab } from './components/CurriculumExplorerTab';
import { AcademicRulesTab } from './components/AcademicRulesTab';
import { CalendarTab } from './components/CalendarTab';
import { DataInsightsTab } from './components/DataInsightsTab';
import { PdfViewerModal } from './components/PdfViewerModal';
import { UserRole } from './types/curriculum';
import { MADRASAH_PROFILE } from './data/curriculumData';
import { MessageSquare, BookOpen, Scale, Calendar, BarChart3, FileText, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [userRole, setUserRole] = useState<UserRole>('murid');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);

  // Helper to jump to chat with pre-filled or pre-asked question
  const handleAskAira = (question: string) => {
    setActiveTab('chat');
    // Dispatch a custom event or let ChatTab know
    const chatInput = document.querySelector<HTMLInputElement>('input[type="text"]');
    if (chatInput) {
      chatInput.value = question;
      chatInput.focus();
      // Auto submit via custom event
      const form = chatInput.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Official Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenPdf={() => setActiveTab('pdf')}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {activeTab === 'chat' && (
          <ChatTab
            userRole={userRole}
            onOpenPdf={() => setActiveTab('pdf')}
            onNavigateToTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'kurikulum' && (
          <CurriculumExplorerTab onAskAira={handleAskAira} />
        )}

        {activeTab === 'peraturan' && (
          <AcademicRulesTab onAskAira={handleAskAira} />
        )}

        {activeTab === 'kalender' && (
          <CalendarTab onAskAira={handleAskAira} />
        )}

        {activeTab === 'data' && (
          <DataInsightsTab onAskAira={handleAskAira} />
        )}

        {activeTab === 'pdf' && (
          <PdfViewerModal onAskAira={handleAskAira} />
        )}
      </main>

      {/* Official Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="font-bold text-slate-800 flex items-center justify-center sm:justify-start gap-1.5">
              <span>AIRA (Academic & Curriculum Assistant)</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-semibold">{MADRASAH_PROFILE.nama}</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              {MADRASAH_PROFILE.alamat} | Telp: {MADRASAH_PROFILE.telepon}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-600">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Tahun Ajaran 2026/2027
            </span>
            <span>•</span>
            <button
              onClick={() => setActiveTab('pdf')}
              className="hover:text-emerald-700 underline cursor-pointer"
            >
              SK Kurikulum No. 024/2026
            </button>
            <span>•</span>
            <button
              onClick={() => handleAskAira('Siapa saja tim pengembang dan pimpinan MAN IC Bangka Tengah?')}
              className="hover:text-emerald-700 underline cursor-pointer"
            >
              Tentang Pengembang
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
