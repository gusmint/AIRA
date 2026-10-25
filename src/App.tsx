import React from 'react';
import { Header } from './components/Header';
import { ChatTab } from './components/ChatTab';
import { MADRASAH_PROFILE } from './data/curriculumData';

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-800 overflow-hidden">
      {/* Official Header */}
      <Header />

      {/* Main Chat Interface */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-col min-h-0">
        <ChatTab />
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-slate-200 py-2.5 px-4 text-center text-xs text-slate-500 shrink-0">
        <p className="truncate">
          <strong className="text-slate-700">&quot;AIRA&quot; - AI Assistant MAN Insan Cendekia Bangka Tengah</strong>
          <span className="hidden sm:inline text-slate-400 mx-2">•</span>
          <span className="hidden sm:inline">{MADRASAH_PROFILE.alamat}</span>
        </p>
      </footer>
    </div>
  );
}
