import React from 'react';
import { 
  MessageSquare, 
  BookOpen, 
  Scale, 
  Calendar, 
  BarChart3, 
  FileText, 
  GraduationCap, 
  Users, 
  UserCheck, 
  HelpCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types/curriculum';
import { MADRASAH_PROFILE } from '../data/curriculumData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenPdf: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenPdf,
}) => {
  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'murid', label: 'Murid / Siswa', icon: <GraduationCap className="w-4 h-4" />, desc: 'Jadwal, KTI, TKA & Peminatan' },
    { id: 'guru', label: 'Pendidik / Guru', icon: <UserCheck className="w-4 h-4" />, desc: 'Beban Jam, Modul Ajar & Asesmen' },
    { id: 'orangtua', label: 'Orang Tua / Wali', icon: <Users className="w-4 h-4" />, desc: 'Rapor, Asrama & Kalender' },
    { id: 'umum', label: 'Umum / Tamu', icon: <HelpCircle className="w-4 h-4" />, desc: 'Profil, Visi Misi & Prestasi' }
  ];

  const tabs = [
    { id: 'chat', label: 'Tanya AIRA', icon: <MessageSquare className="w-4 h-4" />, badge: 'AI Asisten' },
    { id: 'kalender', label: 'Jadwal ASAS & Kaldik', icon: <Calendar className="w-4 h-4" />, badge: 'Ujian 23 Nov' },
    { id: 'kurikulum', label: 'Struktur Kurikulum', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'peraturan', label: 'Peraturan Akademik', icon: <Scale className="w-4 h-4" /> },
    { id: 'data', label: 'Hasil TKA & Rapor', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'pdf', label: 'Dokumen PDF', icon: <FileText className="w-4 h-4" /> }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Identity Bar */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 border border-emerald-700/60 font-semibold tracking-wide">
              Kemenag RI • Bangka Belitung
            </span>
            <span className="hidden sm:inline text-emerald-200/80">
              NSM: {MADRASAH_PROFILE.nsm} | NPSN: {MADRASAH_PROFILE.npsn}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-emerald-300 font-medium italic">
              "{MADRASAH_PROFILE.motto[0]}"
            </span>
            <button
              onClick={onOpenPdf}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 font-medium transition cursor-pointer"
              title="Lihat dokumen SK Kurikulum PDF 150 halaman"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Buka Dokumen PDF (150 Halaman)</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Madrasah Title */}
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 border-2 border-emerald-500/20">
                <span className="font-serif font-black text-2xl tracking-tighter">IC</span>
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-500 text-white shadow-xs">
                A
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
                  AIRA <span className="text-xs font-normal text-slate-500 hidden sm:inline">(Academic & Curriculum Assistant)</span>
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <Sparkles className="w-3 h-3 text-emerald-600 animate-pulse" />
                  Resmi 2026/2027
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Kurikulum Madrasah Aliyah Negeri Insan Cendekia Bangka Tengah
              </p>
            </div>
          </div>

          {/* Persona / Role Selector */}
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 px-2 hidden lg:inline">
              Mode Persona:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
              {roles.map((r) => {
                const isSelected = userRole === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setUserRole(r.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                    title={r.desc}
                  >
                    {r.icon}
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 mt-4 overflow-x-auto pb-1 pt-1 border-t border-slate-100 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300/80 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span className={isActive ? 'text-emerald-700' : 'text-slate-500'}>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-600 text-white font-semibold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
