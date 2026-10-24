import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Clock, 
  Sparkles, 
  Heart, 
  Compass, 
  Coins, 
  Cpu, 
  Microscope, 
  FileCode, 
  GraduationCap, 
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  MADRASAH_PROFILE, 
  EMPAT_PILAR_INTEGRASI, 
  PROGRAM_PENGUATAN,
  VISI_MISI 
} from '../data/curriculumData';

interface CurriculumExplorerTabProps {
  onAskAira: (question: string) => void;
}

export const CurriculumExplorerTab: React.FC<CurriculumExplorerTabProps> = ({ onAskAira }) => {
  const [selectedFase, setSelectedFase] = useState<'X' | 'XI' | 'XII'>('X');

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Dokumen Induk Kurikulum Madrasah TA 2026/2027
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Struktur Kurikulum & Pengorganisasian Belajar
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Kurikulum MAN Insan Cendekia Bangka Tengah memadukan keunggulan sains-teknologi (IPTEK) dan iman-takwa (IMTAK) melalui adopsi pendekatan **Pembelajaran Mendalam (Deep Learning)** dan **Kurikulum Berbasis Cinta (Panca Cinta)** dalam format **Sistem Blok Waktu Terpisah**.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="bg-emerald-800/80 px-3 py-1.5 rounded-lg border border-emerald-600/50">
              Total 297 Murid (12 Rombel)
            </span>
            <span className="bg-emerald-800/80 px-3 py-1.5 rounded-lg border border-emerald-600/50">
              30 Pendidik Profesional
            </span>
            <span className="bg-emerald-800/80 px-3 py-1.5 rounded-lg border border-emerald-600/50">
              Tipologi Akademik Terakreditasi A
            </span>
          </div>
        </div>
      </div>

      {/* 4 Pilar Integrasi Keutamaan */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-700" />
              Empat Pilar Integrasi Kurikulum
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Nilai keutamaan yang diinsersikan ke intrakurikuler, kokurikuler, dan ekstrakurikuler.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EMPAT_PILAR_INTEGRASI.map((pilar, idx) => {
            const icons = [
              <Sparkles className="w-5 h-5 text-indigo-600" />,
              <Heart className="w-5 h-5 text-rose-600" />,
              <Compass className="w-5 h-5 text-emerald-600" />,
              <Coins className="w-5 h-5 text-amber-600" />
            ];
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-emerald-300 transition shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      {icons[idx]}
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {pilar.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-2">{pilar.nama}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{pilar.deskripsi}</p>
                </div>

                <button
                  onClick={() => onAskAira(`Jelaskan secara mendalam tentang ${pilar.nama} di MAN IC Bangka Tengah`)}
                  className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Tanya AIRA</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Program Penguatan Khusus Per Jenjang */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-emerald-950 mb-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          Fokus Program Penguatan Kurikulum Berjenjang
        </h3>
        <p className="text-xs sm:text-sm text-emerald-800 mb-4">
          Sebagai madrasah bertipologi akademik, MAN IC memetakan penguatan mata pelajaran secara seimbang dan strategis:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROGRAM_PENGUATAN.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-emerald-200/80 shadow-2xs">
              <span className="text-xs font-bold text-emerald-700 block uppercase tracking-wider mb-1">
                {item.kelas}
              </span>
              <h4 className="font-bold text-slate-900 text-sm mb-1">{item.fokus}</h4>
              <p className="text-xs text-slate-500 font-medium mb-2">Alokasi: {item.alokasi}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{item.tujuan}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Struktur Beban Belajar Tab per Fase */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              Struktur Beban Belajar per Fase & Kelas
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Berdasarkan Permendikdasmen No. 13 Tahun 2025 dan KMA No. 1503 Tahun 2025.
            </p>
          </div>

          {/* Fase Buttons */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setSelectedFase('X')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedFase === 'X' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Fase E (Kelas X)
            </button>
            <button
              onClick={() => setSelectedFase('XI')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedFase === 'XI' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Fase F (Kelas XI)
            </button>
            <button
              onClick={() => setSelectedFase('XII')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                selectedFase === 'XII' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Fase F (Kelas XII)
            </button>
          </div>
        </div>

        {/* Fase Details Table / Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {selectedFase === 'X' && (
            <div>
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Fase E: Kelas X (Sepuluh)</h4>
                  <p className="text-xs text-slate-500">
                    Fokus Penguatan: Ekonomi (CBP Rupiah) | Muatan Lokal: Penelitian Ilmiah
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Intrakurikuler: 1.836 JP/thn
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
                    Kokurikuler: 108 JP/thn
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Mata Pelajaran Wajib & Muatan Keagamaan:
                    </h5>
                    <ul className="space-y-1.5 text-slate-600">
                      <li>• <strong>PAI</strong> (Al-Qur'an Hadis, Akidah Akhlak, Fikih, SKI): 288 JP/tahun</li>
                      <li>• <strong>Bahasa Arab</strong>: 144 JP/tahun (16 JP/bulan)</li>
                      <li>• <strong>Pendidikan Pancasila</strong>: 72 JP intra + 36 JP koku</li>
                      <li>• <strong>Bahasa Indonesia</strong>: 108 JP intra + 36 JP koku</li>
                      <li>• <strong>Matematika</strong>: 108 JP intra</li>
                      <li>• <strong>Bahasa Inggris</strong>: 108 JP intra</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Sains, Sosial, Seni & Penguatan:
                    </h5>
                    <ul className="space-y-1.5 text-slate-600">
                      <li>• <strong>IPA (Fisika, Kimia, Biologi)</strong>: masing-masing 72 JP/tahun</li>
                      <li>• <strong>IPS (Sosiologi, Ekonomi, Sejarah, Geografi)</strong>: masing-masing 72 JP/tahun</li>
                      <li>• <strong>Informatika</strong>: 72 JP/tahun</li>
                      <li>• <strong>PJOK & Seni Musik</strong>: masing-masing 72 JP/tahun</li>
                      <li>• <strong>Muatan Lokal</strong>: Penelitian Ilmiah (72 JP/tahun) - pondasi KTI</li>
                      <li>• <strong>Penguatan Program</strong>: Ekonomi & CBP Rupiah (216 JP/tahun)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedFase === 'XI' && (
            <div>
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Fase F: Kelas XI (Sebelas)</h4>
                  <p className="text-xs text-slate-500">
                    Fokus Penguatan: Bahasa Inggris | Muatan Lokal: Tahfiz Al-Qur'an | Mapel Pilihan: 720 JP
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Intrakurikuler: 1.908 JP/thn
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
                    Kokurikuler: 108 JP/thn
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Kelompok Umum & Muatan Lokal:
                    </h5>
                    <ul className="space-y-1.5 text-slate-600">
                      <li>• <strong>PAI</strong> (Al-Qur'an Hadis, Akidah Akhlak, Fikih, SKI): 288 JP</li>
                      <li>• <strong>Bahasa Arab & Pendidikan Pancasila</strong>: masing-masing 72 JP</li>
                      <li>• <strong>Bahasa Indonesia & Bahasa Inggris</strong>: masing-masing 108 JP</li>
                      <li>• <strong>Matematika</strong>: 108 JP intra + 36 JP koku</li>
                      <li>• <strong>PJOK, Sejarah, Seni Musik</strong>: masing-masing 72 JP</li>
                      <li>• <strong>Muatan Lokal</strong>: Tahfiz Al-Qur'an (72 JP/tahun)</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Kelompok Peminatan & Penguatan:
                    </h5>
                    <ul className="space-y-1.5 text-slate-600">
                      <li>• <strong>Mata Pelajaran Pilihan</strong> (Total 720 JP): Murid memilih 4 mapel dari:
                        <span className="block mt-1 pl-2 text-slate-500 italic">
                          Matematika Lanjut, Fisika, Kimia, Biologi, Sosiologi, Ekonomi, Sejarah Lanjut, Geografi, Informatika, Bahasa Inggris Lanjut.
                        </span>
                      </li>
                      <li>• <strong>Program Penguatan</strong>: Bahasa Inggris & Matematika (216 JP/tahun).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedFase === 'XII' && (
            <div>
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Fase F: Kelas XII (Dua Belas)</h4>
                  <p className="text-xs text-slate-500">
                    Fokus Penguatan: Matematika Persiapan PTN/UTBK | Muatan Lokal: Tahfiz Al-Qur'an
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Intrakurikuler: 1.696 JP/thn
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
                    Kokurikuler: 96 JP/thn
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Struktur Belajar Intensif:
                    </h5>
                    <ul className="space-y-1.5 text-slate-600">
                      <li>• <strong>PAI & Bahasa Arab</strong>: 256 JP + 64 JP</li>
                      <li>• <strong>Bahasa Indonesia & Bahasa Inggris</strong>: masing-masing 96 JP</li>
                      <li>• <strong>Matematika Wajib</strong>: 96 JP intra + 32 JP koku</li>
                      <li>• <strong>PJOK & Seni Musik</strong>: masing-masing 64 JP</li>
                      <li>• <strong>Muatan Lokal</strong>: Tahfiz Al-Qur'an (64 JP/tahun)</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                      Pilihan Lanjut & Sukses PTN:
                    </h5>
                    <ul className="space-y-1.5 text-slate-600">
                      <li>• <strong>Mata Pelajaran Pilihan</strong>: 640 JP/tahun (pendalaman intensif 4 mapel pilihan).</li>
                      <li>• <strong>Program Penguatan</strong>: Matematika & Bahasa Inggris (192 JP/tahun) untuk bedah soal HOTS dan try-out UTBK.</li>
                      <li>• <strong>Ujian Madrasah (UM)</strong>: Dijadwalkan 29 Maret – 15 Mei 2027.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Program Unggulan Khas MAN IC Bangka Tengah */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Microscope className="w-5 h-5 text-emerald-700" />
          Program Unggulan Terintegrasi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* KTI */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Microscope className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Karya Tulis Ilmiah (KTI) & Sidang</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Program wajib bagi setiap murid untuk melatih penalaran analitis, metode riset ilmiah, dan kemampuan mempertahankan hasil di Ruang Sidang KTI (112 m²). Pembimbingan diatur via SK Kepala Madrasah No. 026/2026.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-blue-700">Syarat Mutlak Kelulusan</span>
              <button
                onClick={() => onAskAira('Bagaimana mekanisme dan tahapan bimbingan KTI serta sidang KTI di MAN IC Bangka Tengah?')}
                className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Detail
              </button>
            </div>
          </div>

          {/* Ekskul AI Engineering */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Ekskul AI Engineering & Prompting</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dibina oleh <strong>Agus Setiawan, S.T.</strong> di bawah Klaster Sains & Riset. Melatih pemahaman LLM, prompt engineering, integrasi API AI dengan Python, serta etika digital dan HAKI dalam 24 sesi setahun.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-purple-700">Klaster Riset & Teknologi</span>
              <button
                onClick={() => onAskAira('Jelaskan program ekstrakurikuler AI Engineering & Prompting di MAN IC Bangka Tengah')}
                className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Detail
              </button>
            </div>
          </div>

          {/* Kokurikuler Kolaboratif */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Kokurikuler Deep Learning</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proyek lintas disiplin ilmu bertema bulanan. Contoh nyata: Proyek <strong>Informatika × Biologi</strong> menghasilkan game 2D Python tembak-tembakan dengan fitur amunisi kuis organel sel bioproses.
            </p>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-700">Lintas Disiplin Ilmu</span>
              <button
                onClick={() => onAskAira('Ceritakan contoh proyek kokurikuler kolaboratif Informatika dan Biologi di MAN IC Bateng')}
                className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
