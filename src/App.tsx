/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header.tsx';
import ChatTab from './components/ChatTab.tsx';

export default function App() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-slate-100 font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header />

      {/* Main Container - Chat without tabs */}
      <main className="flex-1 flex flex-col min-h-0 w-full max-w-5xl mx-auto px-3 sm:px-4 py-2">
        <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <ChatTab />
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="shrink-0 bg-white border-t border-slate-200 px-4 py-1.5 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <p className="font-medium text-slate-700">
            &quot;NEXIAN&quot; - AI Assistant MAN Insan Cendekia Bangka Tengah
          </p>
          <p className="text-slate-400 text-[11px]">
            Jl. Sungaiselan Km. 11, Desa Simpang Katis, Kab. Bangka Tengah, Kepulauan Bangka Belitung
          </p>
        </div>
      </footer>
    </div>
  );
}
