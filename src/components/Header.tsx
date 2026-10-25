import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: AIRA Photo + Title */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src="/assets/aistudio/pasfoto_AIRA_17fe1069.jpg"
              alt="AIRA Assistant"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover object-top border-2 border-emerald-600 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              &quot;AIRA&quot; - AI Assistant MAN Insan Cendekia Bangka Tengah
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Asisten Virtual Akademik & Kurikulum
            </p>
          </div>
        </div>

        {/* Right: Logo IC */}
        <div className="flex items-center shrink-0">
          <img
            src="/assets/aistudio/logo-IC_c662faa1.png"
            alt="Logo Insan Cendekia"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};
