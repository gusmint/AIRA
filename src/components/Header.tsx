/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Header() {
  return (
    <header className="shrink-0 bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Left: Nexian Avatar + Title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/assets/aistudio/pasfoto_AIRA_17fe1069.jpg"
              alt="Nexian"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-emerald-500/30 shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-sm sm:text-base font-bold text-slate-800 leading-tight">
                <span className="text-emerald-700 font-extrabold">&quot;NEXIAN&quot;</span> - AI Assistant MAN Insan Cendekia Bangka Tengah
              </h1>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Penghubung & Pelayan Pintar Sistem Madrasah
            </p>
          </div>
        </div>

        {/* Right: Logo MAN IC */}
        <div className="flex items-center gap-2">
          <img
            src="/assets/aistudio/logo-IC_c662faa1.png"
            alt="Logo Insan Cendekia"
            className="h-10 sm:h-11 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
}
