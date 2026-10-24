import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  BookOpen, 
  Award, 
  Users, 
  Search,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { TKA_RECAP_DATA, RAPOR_PENDIDIKAN_HIGHLIGHTS } from '../data/curriculumData';

interface DataInsightsTabProps {
  onAskAira: (question: string) => void;
}

export const DataInsightsTab: React.FC<DataInsightsTabProps> = ({ onAskAira }) => {
  const [filterKategori, setFilterKategori] = useState<'all' | 'Wajib' | 'Pilihan'>('all');
  const [searchMapel, setSearchMapel] = useState('');

  const filteredTka = TKA_RECAP_DATA.filter((item) => {
    const matchesCat = filterKategori === 'all' || item.kategori === filterKategori;
    const matchesSearch = item.mapel.toLowerCase().includes(searchMapel.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            Evaluasi Berbasis Data: Rapor Pendidikan & TKA 2025
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Pemetaan Capaian Kognitif & Mutu Satuan Pendidikan
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Data autentik yang menjadi rujukan dalam analisis refleksi, penyusunan Modul Ajar, serta program intervensi pembelajaran (*Identifikasi - Refleksi - Benahi*) di MAN Insan Cendekia Bangka Tengah.
          </p>
        </div>
      </div>

      {/* Rapor Pendidikan 2025 Highlights */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-700" />
            Rapor Pendidikan 2025 (Kemendikdasmen)
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Penilaian bersumber dari Asesmen Nasional (AN) dengan status mutu umum: <strong>"Baik"</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Capaian & Peningkatan Tertinggi */}
          <div className="bg-white p-5 rounded-2xl border-2 border-emerald-300 shadow-xs space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Capaian Tertinggi
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase">
                  {RAPOR_PENDIDIKAN_HIGHLIGHTS.capaianTertinggi.aspek}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">
                    {RAPOR_PENDIDIKAN_HIGHLIGHTS.capaianTertinggi.skor}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {RAPOR_PENDIDIKAN_HIGHLIGHTS.capaianTertinggi.tren}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {RAPOR_PENDIDIKAN_HIGHLIGHTS.capaianTertinggi.keterangan}
            </p>
          </div>

          {/* Paling Perlu Ditingkatkan */}
          <div className="bg-white p-5 rounded-2xl border-2 border-amber-300 shadow-xs space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Perlu Pembenahan
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase">
                  {RAPOR_PENDIDIKAN_HIGHLIGHTS.prioritasPeningkatan.aspek}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">
                    {RAPOR_PENDIDIKAN_HIGHLIGHTS.prioritasPeningkatan.skor}
                  </span>
                  <span className="text-xs font-semibold text-rose-600 flex items-center gap-0.5">
                    <TrendingDown className="w-3.5 h-3.5" />
                    {RAPOR_PENDIDIKAN_HIGHLIGHTS.prioritasPeningkatan.tren}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {RAPOR_PENDIDIKAN_HIGHLIGHTS.prioritasPeningkatan.keterangan}
            </p>
          </div>
        </div>

        {/* Other indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {RAPOR_PENDIDIKAN_HIGHLIGHTS.indikatorLain.map((ind, idx) => (
            <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block truncate">{ind.nama}</span>
              <span className="text-sm font-bold text-slate-900 block my-0.5">{ind.skor}</span>
              <span className="text-[10px] text-emerald-700 font-medium block truncate">{ind.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hasil Tes Kompetensi Akademik (TKA) 2025 */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-700" />
              Rekapitulasi Nilai TKA 2025 vs Rata-Rata Nasional
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Performa 14 mata pelajaran (87 murid kelas XII). Seluruh mapel unggul di atas rerata nasional!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari mata pelajaran..."
                value={searchMapel}
                onChange={(e) => setSearchMapel(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-none focus:border-emerald-500 w-44"
              />
            </div>

            <div className="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs">
              <button
                onClick={() => setFilterKategori('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                  filterKategori === 'all' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterKategori('Wajib')}
                className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                  filterKategori === 'Wajib' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Wajib
              </button>
              <button
                onClick={() => setFilterKategori('Pilihan')}
                className={`px-2.5 py-1 rounded-md font-semibold transition cursor-pointer ${
                  filterKategori === 'Pilihan' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Pilihan
              </button>
            </div>
          </div>
        </div>

        {/* Visual Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTka.map((tka) => {
            const difference = (tka.rataRata - tka.rataNasional).toFixed(2);
            return (
              <div
                key={tka.no}
                className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                      {tka.no}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{tka.mapel}</h4>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    tka.kategori === 'Wajib' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {tka.kategori} ({tka.jumlahPeserta} Murid)
                  </span>
                </div>

                {/* Bars comparison */}
                <div className="space-y-2 text-xs">
                  {/* Madrasah */}
                  <div>
                    <div className="flex justify-between text-slate-700 font-semibold mb-1">
                      <span className="flex items-center gap-1 text-emerald-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        Rata-Rata Madrasah:
                      </span>
                      <span className="font-bold text-emerald-800">{tka.rataRata.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(tka.rataRata, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Nasional */}
                  <div>
                    <div className="flex justify-between text-slate-500 mb-1">
                      <span className="flex items-center gap-1 text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        Rata-Rata Nasional:
                      </span>
                      <span className="font-medium text-slate-600">{tka.rataNasional.toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-slate-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(tka.rataNasional, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Score breakdown & Predikats */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                  <div className="flex gap-2">
                    <span>Rentang: <strong>{tka.terendah} – {tka.tertinggi}</strong></span>
                    <span className="text-emerald-700 font-semibold">(+{difference} dr Nasional)</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold" title="Predikat Istimewa">
                      Ist: {tka.istimewa}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 font-bold" title="Predikat Baik">
                      Baik: {tka.baik}
                    </span>
                    {tka.kurang > 0 && (
                      <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-bold" title="Predikat Kurang (perlu remedial)">
                        Kurang: {tka.kurang}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Reflection Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-3">
        <h4 className="font-bold text-base text-amber-300 flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-400" />
          Kesimpulan Analisis & Tindak Lanjut Kurikulum
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div>
            <strong className="text-white block mb-1">Keunggulan Kognitif:</strong>
            Mata pelajaran pilihan Geografi (86,91), Bahasa Arab (84,29), dan Bahasa Inggris Lanjut (80,68) membuktikan keberhasilan pilar multilingualisme dan riset. Pada mapel wajib, Bahasa Indonesia didominasi predikat Istimewa (80 dari 87 murid).
          </div>
          <div>
            <strong className="text-white block mb-1">Rekomendasi Pembenahan:</strong>
            Meskipun di atas nasional, Matematika Wajib (52,50) dan Fisika (47,95) menunjukkan sebaran nilai lebar dengan adanya 4 siswa berkategori Kurang. Madrasah menginstruksikan pelaksanaan <em>remedial teaching klinis terstruktur</em> sebelum materi baru dimulai.
          </div>
        </div>
        <button
          onClick={() => onAskAira('Bagaimana refleksi hasil TKA 2025 dan intervensi yang dilakukan guru MAN IC Bangka Tengah?')}
          className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <span>Tanyakan rekomendasi ini ke AIRA</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
