import React, { useState } from 'react';
import { 
  Scale, 
  CheckCircle, 
  AlertTriangle, 
  Languages, 
  FileCheck2, 
  Award, 
  HelpCircle, 
  ShieldAlert,
  ChevronRight,
  Calculator,
  UserCheck
} from 'lucide-react';
import { PERATURAN_AKADEMIK } from '../data/curriculumData';

interface AcademicRulesTabProps {
  onAskAira: (question: string) => void;
}

export const AcademicRulesTab: React.FC<AcademicRulesTabProps> = ({ onAskAira }) => {
  // Simple interactive attendance eligibility checker
  const [attendancePercent, setAttendancePercent] = useState<number>(85);
  const [unpassedSubjects, setUnpassedSubjects] = useState<number>(1);

  const isEligibleForExam = attendancePercent >= 75;
  const isPassingGrade = unpassedSubjects < 3 && attendancePercent >= 75;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            Lampiran 8: Surat Keputusan Peraturan Akademik TA 2026/2027
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Peraturan Akademik, Asesmen & Kelulusan
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Regulasi operasional resmi penjamin mutu standar akademik MAN Insan Cendekia Bangka Tengah. Seluruh murid, dewan guru, dan orang tua berpedoman pada ketentuan di bawah ini.
          </p>
        </div>
      </div>

      {/* Interactive Simulasi Status Murid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Simulasi Evaluasi Kelayakan Akademik Murid
              </h3>
              <p className="text-xs text-slate-500">
                Uji coba cepat status keikutsertaan ujian dan kenaikan kelas sesuai Pasal 4 & Pasal 20.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Persentase Kehadiran Murid (Minimal 75%):</span>
                <span className={attendancePercent >= 75 ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                  {attendancePercent}%
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={attendancePercent}
                onChange={(e) => setAttendancePercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>40% (Kritis)</span>
                <span className="font-semibold text-amber-600">75% (Batas Minimal)</span>
                <span>100% (Sempurna)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Jumlah Mapel Belum Tuntas (Maksimal 2 mapel):</span>
                <span className={unpassedSubjects < 3 ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                  {unpassedSubjects} Mapel
                </span>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setUnpassedSubjects(num)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                      unpassedSubjects === num
                        ? num >= 3
                          ? 'bg-rose-600 text-white border-rose-700'
                          : 'bg-emerald-700 text-white border-emerald-800'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Status Berdasarkan Regulasi:
              </h4>

              {/* Exam eligibility */}
              <div className="flex items-start gap-2.5">
                {isEligibleForExam ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Hak Mengikuti Ujian ASAS/ASAT (Pasal 4):
                  </div>
                  <div className="text-xs text-slate-600">
                    {isEligibleForExam ? (
                      <span className="text-emerald-700 font-semibold">
                        MEMENUHI SYARAT (Kehadiran ≥ 75%).
                      </span>
                    ) : (
                      <span className="text-rose-700 font-semibold">
                        TIDAK MEMENUHI SYARAT (Kehadiran &lt; 75%, perlu rekomendasi dispensasi Kepala Madrasah via rapat dewan guru).
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Class promotion */}
              <div className="flex items-start gap-2.5">
                {isPassingGrade ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Kelayakan Kenaikan Kelas (Pasal 20):
                  </div>
                  <div className="text-xs text-slate-600">
                    {isPassingGrade ? (
                      <span className="text-emerald-700 font-semibold">
                        MEMENUHI KRITERIA NAIK KELAS (Belum tuntas &lt; 3 mapel dan kehadiran cukup).
                      </span>
                    ) : (
                      <span className="text-rose-700 font-semibold">
                        BERESIKO TIDAK NAIK KELAS (Pasal 20 ayat 3: Tidak tuntas pada 3 mapel atau lebih, atau kehadiran &lt; 75%).
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => onAskAira('Jelaskan detail konsekuensi dan solusi jika murid tidak memenuhi kriteria kenaikan kelas di MAN IC')}
              className="mt-3 text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Konsultasikan skenario ini ke AIRA</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Formal Academic Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pasal 4: Kehadiran */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
              Pasal 4
            </span>
            <span className="text-xs text-slate-500 font-medium">Kehadiran Minimal 75%</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
            Persyaratan Kehadiran Ujian ASAS & ASAT
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Setiap murid wajib mengikuti KBM sekurang-kurangnya <strong>75% dari jumlah hari belajar efektif</strong> semester berjalan. Ketidakhadiran karena sakit (surat dokter), izin resmi, atau alpa dihitung dalam persentase. Dispensasi khusus hanya dapat dikeluarkan Kepala Madrasah melalui rapat dewan guru.
          </p>
          <button
            onClick={() => onAskAira('Berapa kehadiran minimal murid untuk ikut ASAS/ASAT dan bagaimana prosedur dispensasinya?')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Tanya AIRA mengenai Pasal 4</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pasal 14: Bahasa Inggris */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
              Pasal 14
            </span>
            <span className="text-xs text-slate-500 font-medium">Bilingual Assessment</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Languages className="w-4 h-4 text-blue-600" />
            Ketentuan 40% Soal Berbahasa Inggris
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dalam pelaksanaan asesmen sumatif, sekurang-kurangnya <strong>40% dari jumlah butir soal wajib menggunakan bahasa Inggris</strong>. Ketentuan ini dikecualikan hanya untuk mata pelajaran <em>Bahasa Indonesia</em> dan <em>Bahasa Arab</em> demi membentuk literasi sains internasional murid.
          </p>
          <button
            onClick={() => onAskAira('Mengapa instrumen soal asesmen sumatif wajib menggunakan 40% bahasa Inggris?')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Tanya AIRA mengenai Pasal 14</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pasal 12 & 13: Variasi & Jumlah Soal */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-100 text-purple-800">
              Pasal 12 & 13
            </span>
            <span className="text-xs text-slate-500 font-medium">Standar AKM & HOTS</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
            Variasi Bentuk & Jumlah Minimal Soal
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Instrumen asesmen wajib memuat <strong>minimal 3 jenis bentuk soal</strong> (pilihan ganda, pilihan ganda kompleks, benar/salah, menjodohkan, isian singkat, esai). Jumlah minimal soal adalah <strong>40 butir untuk Sains</strong> dan <strong>50 butir untuk Sosial Humaniora, Bahasa, dan PAI</strong>.
          </p>
          <button
            onClick={() => onAskAira('Berapa jumlah minimal soal dan jenis variasi soal yang wajib dibuat guru untuk asesmen sumatif?')}
            className="text-xs font-semibold text-purple-700 hover:text-purple-800 flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Tanya AIRA mengenai Pasal 12 & 13</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pasal 24 & 25: 4 Syarat Kelulusan Unggulan */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-800">
              Pasal 24 & 25
            </span>
            <span className="text-xs text-slate-500 font-medium">Standar Kelulusan MAN IC</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            4 Program Unggulan Syarat Mutlak Lulus
          </h4>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>1. Menyelesaikan <strong>Studi Kolaboratif</strong> (kunjungan kampus/industri).</li>
            <li>2. Menyelesaikan <strong>Program Homestay</strong> (pengabdian di desa).</li>
            <li>3. Menyusun <strong>Karya Tulis Ilmiah (KTI) & Lulus Sidang KTI</strong>.</li>
            <li>4. Memenuhi capaian hafalan <strong>Tahfiz Al-Qur'an</strong> standar minimal.</li>
          </ul>
          <button
            onClick={() => onAskAira('Apa saja 4 program unggulan yang menjadi syarat kelulusan murid MAN IC Bangka Tengah?')}
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Tanya AIRA mengenai Syarat Kelulusan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Pasal Peminatan & Penelitian */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Peminatan */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
          <h4 className="font-bold text-slate-900 text-sm">
            Aturan Peminatan & Perpindahan Mapel (Pasal 21-23)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Murid memilih 4 mata pelajaran minat berdasarkan angket, rekomendasi guru BK, dan ketersediaan kuota rombel. 
            <strong> Perpindahan mapel minat hanya diperkenankan paling lambat pada semester genap</strong> melalui koordinasi bidang kurikulum.
          </p>
        </div>

        {/* Penelitian Murid */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
          <h4 className="font-bold text-slate-900 text-sm">
            Ketentuan Penelitian Lapangan Murid (Pasal 30)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Murid berhak meneliti di laboratorium luar madrasah dengan surat izin resmi Kepala Madrasah dan persetujuan guru pembimbing. Waktu izin riset dapat lebih dari 1 hari dan tetap diakui sebagai <strong>kehadiran akademik bersyarat</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
