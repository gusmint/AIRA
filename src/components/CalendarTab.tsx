import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Flag, 
  BookOpen, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  CalendarDays, 
  FileSpreadsheet,
  FileText,
  AlertCircle,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { KALENDER_DATA, MADRASAH_PROFILE, JADWAL_ASAS_GANJIL } from '../data/curriculumData';
import { CalendarEvent } from '../types/curriculum';

interface CalendarTabProps {
  onAskAira: (question: string) => void;
  onOpenPdf?: (pdfType?: 'kurikulum' | 'asas') => void;
}

export const CalendarTab: React.FC<CalendarTabProps> = ({ onAskAira, onOpenPdf }) => {
  const [selectedSemester, setSelectedSemester] = useState<'all' | 'gasal' | 'genap'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAsasClass, setSelectedAsasClass] = useState<'all' | 'X' | 'XI' | 'XII'>('all');

  const filteredEvents = KALENDER_DATA.filter((event) => {
    const matchesSemester = selectedSemester === 'all' || event.semester === selectedSemester;
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSemester && matchesCategory;
  });

  const getCategoryBadge = (cat: CalendarEvent['category']) => {
    switch (cat) {
      case 'ujian':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">Asesmen / Ujian</span>;
      case 'akademik':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Akademik / Rapor</span>;
      case 'keagamaan':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Hari Besar Islam</span>;
      case 'libur':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">Libur Resmi</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <CalendarDays className="w-3.5 h-3.5" />
            Agenda Resmi TA 2026/2027 & Jadwal Ujian Terbaru
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Jadwal ASAS & Kalender Pendidikan
          </h2>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Jadwal resmi Asesmen Sumatif Akhir Semester (ASAS) Ganjil (23 November – 02 Desember 2026) dan Kalender Pendidikan MAN Insan Cendekia Bangka Tengah.
          </p>
        </div>
      </div>

      {/* SPECIAL FEATURE: Interactive Jadwal ASAS Ganjil 2026/2027 */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500/30 shadow-md p-5 sm:p-7 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Dokumen Resmi Terbaru • 16 November 2026
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              {JADWAL_ASAS_GANJIL.judul}
            </h3>
            <p className="text-xs text-slate-600">
              Periode: <strong>{JADWAL_ASAS_GANJIL.periode}</strong> • Ditandatangani Kepala Madrasah: <strong>{JADWAL_ASAS_GANJIL.kepalaMadrasah}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filter Tingkat:</span>
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              {(['all', 'X', 'XI', 'XII'] as const).map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedAsasClass(cls)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    selectedAsasClass === cls
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cls === 'all' ? 'Semua Kelas' : `Kelas ${cls}`}
                </button>
              ))}
            </div>

            <a
              href={MADRASAH_PROFILE.pdfAsasPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium shadow-xs transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dokumen Asli PDF</span>
            </a>
          </div>
        </div>

        {/* Sessions overview */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {JADWAL_ASAS_GANJIL.sesiWaktu.map((s, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-center">
              <span className="font-bold text-slate-700 block">{s.sesi}</span>
              <span className="text-emerald-700 font-semibold text-[11px] block mt-0.5">{s.jam} WIB</span>
            </div>
          ))}
        </div>

        {/* Daily Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {JADWAL_ASAS_GANJIL.jadwalHarian.map((day, dIdx) => (
            <div
              key={dIdx}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition shadow-2xs p-4 flex flex-col justify-between"
            >
              <div>
                <div className="border-b border-slate-200 pb-2 mb-3">
                  <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">
                    {day.hari}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {day.tanggal}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {day.sesi.map((s, sIdx) => {
                    const getSubject = () => {
                      if (selectedAsasClass === 'X') return s.kelasX;
                      if (selectedAsasClass === 'XI') return s.kelasXI;
                      if (selectedAsasClass === 'XII') return s.kelasXII;
                      // When all:
                      if (s.kelasX === s.kelasXI && s.kelasXI === s.kelasXII) {
                        return s.kelasX;
                      }
                      return (
                        <span className="space-y-0.5 block text-[11px]">
                          <span className="block text-slate-800"><strong>X:</strong> {s.kelasX}</span>
                          <span className="block text-slate-800"><strong>XI:</strong> {s.kelasXI}</span>
                          <span className="block text-slate-800"><strong>XII:</strong> {s.kelasXII}</span>
                        </span>
                      );
                    };

                    const displaySubj = getSubject();
                    const isRestOrEmpty = displaySubj === '-';

                    return (
                      <div
                        key={sIdx}
                        className={`p-2 rounded-lg border text-xs ${
                          isRestOrEmpty
                            ? 'bg-slate-100/50 border-dashed border-slate-200 text-slate-400'
                            : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="text-[10px] font-semibold text-slate-500 mb-0.5">
                          {s.jam}
                        </div>
                        <div className="font-bold text-slate-900 leading-snug">
                          {displaySubj}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => onAskAira(`Bagaimana rincian jadwal ujian ASAS untuk hari ${day.hari}, ${day.tanggal}?`)}
                className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center justify-between cursor-pointer"
              >
                <span>Tanya AIRA jadwal ini</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* KALENDER PENDIDIKAN TAHUNAN */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-emerald-700" />
            Kalender Pendidikan Madrasah TA 2026/2027
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Berdasarkan SK Kalender Pendidikan Madrasah No. 029 Tahun 2026 & KMA Dirjen Pendis No. 4860 Tahun 2026.
          </p>
        </div>

        {/* Filter and Switcher Controls */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedSemester('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedSemester === 'all' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Semua Semester
            </button>
            <button
              onClick={() => setSelectedSemester('gasal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedSemester === 'gasal' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Semester Gasal 2026
            </button>
            <button
              onClick={() => setSelectedSemester('genap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedSemester === 'genap' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Semester Genap 2027
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 flex items-center gap-1 font-medium mr-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {[
              { id: 'all', label: 'Semua Kategori' },
              { id: 'akademik', label: 'Akademik & Rapor' },
              { id: 'ujian', label: 'Asesmen & Ujian' },
              { id: 'libur', label: 'Libur' },
              { id: 'keagamaan', label: 'Keagamaan' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Event Cards */}
        <div className="space-y-3">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-emerald-300 transition shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {evt.dateStr}
                  </span>
                  {getCategoryBadge(evt.category)}
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                    Semester {evt.semester}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900">
                  {evt.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <button
                onClick={() => onAskAira(`Kapan jadwal dan ketentuan untuk "${evt.title}" di kalender pendidikan MAN IC?`)}
                className="self-start sm:self-center px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 text-xs font-semibold whitespace-nowrap transition cursor-pointer"
              >
                Tanya AIRA
              </button>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
              Tidak ada agenda yang cocok dengan filter yang dipilih.
            </div>
          )}
        </div>
      </div>

      {/* Ketentuan Umum Jam Efektif (Lampiran 1 & 2) */}
      <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-3 text-xs text-slate-700">
        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-emerald-700" />
          Ketentuan Beban Jam & Alokasi Efektif (KMA 4860/2026):
        </h4>
        <ul className="list-disc pl-5 space-y-1.5 leading-relaxed text-slate-600">
          <li><strong>Durasi Jam Pelajaran (JP)</strong>: Waktu pembelajaran efektif setiap tatap muka jenjang Madrasah Aliyah (MA) adalah <strong>45 menit per JP</strong>.</li>
          <li><strong>Minggu Efektif</strong>: Jumlah waktu pembelajaran pada setiap tahun ajaran sekurang-kurangnya <strong>36 (tiga puluh enam) minggu efektif</strong>.</li>
          <li><strong>Sistem Pembelajaran</strong>: Menggunakan sistem semester yang membagi 1 tahun ajaran menjadi 2 paruh waktu (semester gasal dan semester genap).</li>
          <li><strong>Pengawasan Kalender</strong>: Satuan pendidikan berkoordinasi secara terpusat dengan Kantor Wilayah Kementerian Agama Provinsi Kepulauan Bangka Belitung.</li>
        </ul>
      </div>
    </div>
  );
};
