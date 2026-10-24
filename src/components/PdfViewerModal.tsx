import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Bookmark, 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  BookOpen, 
  Info,
  Calendar
} from 'lucide-react';
import { MADRASAH_PROFILE, JADWAL_ASAS_GANJIL } from '../data/curriculumData';

interface PdfViewerModalProps {
  onAskAira: (question: string) => void;
  initialDoc?: 'kurikulum' | 'asas';
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({ onAskAira, initialDoc = 'kurikulum' }) => {
  const [selectedDoc, setSelectedDoc] = useState<'kurikulum' | 'asas'>(initialDoc);
  const [activeBookmark, setActiveBookmark] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');

  const bookmarks = [
    { page: 1, title: 'Halaman Judul & Identitas', desc: 'Identitas resmi madrasah, NSM, NPSN, akreditasi A, SK pendirian', group: 'Pendahuluan' },
    { page: 4, title: 'Lembar Penetapan & Validasi', desc: 'Penetapan oleh Kepala Madrasah Ahmad Sukri Ahkap & Pengawas Desi Wahyuni', group: 'Pendahuluan' },
    { page: 6, title: 'Bab II: Karakteristik Madrasah', desc: 'Profil madrasah, demografi murid 297 siswa, korps pendidik, sarpras', group: 'Isi Utama' },
    { page: 14, title: 'Hasil Rapor Pendidikan 2025', desc: 'Evaluasi iklim keamanan sekolah (skor 77) & kebinekaan (skor 71)', group: 'Isi Utama' },
    { page: 16, title: 'Hasil Tes Kompetensi Akademik (TKA)', desc: 'Rekapitulasi 14 mapel TKA di atas rata-rata nasional (Geografi 86,91)', group: 'Isi Utama' },
    { page: 20, title: 'Bab III: Visi, Misi & Tujuan', desc: 'Keputusan Dirjen Pendis 4263/2019, target kelulusan PTN >90%', group: 'Isi Utama' },
    { page: 23, title: 'Bab IV: Pengorganisasian Pembelajaran', desc: 'Deep Learning, Panca Cinta, Moderasi Beragama, CBP Rupiah, Sistem Blok', group: 'Isi Utama' },
    { page: 25, title: 'Tabel Struktur Jam Belajar Fase E (X)', desc: 'Alokasi 1.836 JP intra + 108 JP koku, Penguatan Ekonomi CBP Rupiah', group: 'Struktur Belajar' },
    { page: 26, title: 'Tabel Struktur Jam Belajar Fase F (XI)', desc: 'Alokasi 1.908 JP intra + 108 JP koku, Mapel Pilihan 720 JP, Penguatan B. Inggris', group: 'Struktur Belajar' },
    { page: 27, title: 'Tabel Struktur Jam Belajar Fase F (XII)', desc: 'Alokasi 1.696 JP intra + 96 JP koku, Penguatan Matematika UTBK-SNBT', group: 'Struktur Belajar' },
    { page: 33, title: 'Bab V: Perencanaan Pembelajaran Terintegrasi', desc: 'Regulasi BSKAP 046/2025 & Pendis 9941/2025, Modul Ajar, Asesmen', group: 'Isi Utama' },
    { page: 59, title: 'Lampiran: Perangkat Ajar Informatika', desc: 'Contoh Prota, Promes, ATP, dan Modul Ajar Deep Learning Fase E', group: 'Lampiran Perangkat' },
    { page: 71, title: 'Lampiran: SK Pembagian Tugas Mengajar', desc: 'SK No. 026/2026, pembagian tugas guru, waka, kepala lab & perpustakaan', group: 'Lampiran SK' },
    { page: 78, title: 'Lampiran: SK Wali Kelas & Guru Asuh', desc: 'SK Wali kelas ganjil X.A s.d. XII.D dan pembagian guru asuh asrama', group: 'Lampiran SK' },
    { page: 84, title: 'Lampiran: SK Pembimbing KTI', desc: 'Daftar nama guru pembimbing Karya Tulis Ilmiah (KTI) semester ganjil', group: 'Lampiran SK' },
    { page: 91, title: 'Lampiran: Proyek Kokurikuler Bio × TI', desc: 'Game 2D Python kuis organel sel bioproses (Deep Learning kolaboratif)', group: 'Lampiran Khusus' },
    { page: 94, title: 'Lampiran: Ekskul AI Engineering & Prompting', desc: 'Silabus 24 sesi pembinaan LLM, prompting, API Python dibina Agus Setiawan', group: 'Lampiran Khusus' },
    { page: 97, title: 'Lampiran: SK Kalender Pendidikan 2026/2027', desc: 'KMA Dirjen Pendis 4860/2026 & SK 029/2026 jadwal masuk, ASAS & libur', group: 'Lampiran Kaldik' },
    { page: 104, title: 'Lampiran 8: Peraturan Akademik', desc: 'Pasal 4 Kehadiran 75%, Pasal 14 Bahasa Inggris 40%, Kenaikan & Kelulusan', group: 'Regulasi Akademik' },
    { page: 137, title: 'Lampiran: Data Lengkap 87 Siswa TKA 2025', desc: 'Rincian skor kognitif per individu murid pada mapel wajib & pilihan', group: 'Data Autentik' },
    { page: 149, title: 'Instrumen Validasi Pengawas Madrasah', desc: 'Skor validasi 95,11 (Predikat Amat Baik) oleh Pengawas Desi Wahyuni, S.Pd', group: 'Legalitas' }
  ];

  const filteredBookmarks = bookmarks.filter((b) => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activePdfUrl = selectedDoc === 'kurikulum' 
    ? `${MADRASAH_PROFILE.pdfPath}#page=${activeBookmark}`
    : `${MADRASAH_PROFILE.pdfAsasPath}`;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Document Switcher */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              Dokumen Resmi Terverifikasi
            </span>
            <span className="text-xs text-slate-500 font-medium">
              MAN Insan Cendekia Bangka Tengah
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedDoc('kurikulum')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedDoc === 'kurikulum'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Buku Kurikulum Madrasah (150 Hal)</span>
            </button>

            <button
              onClick={() => setSelectedDoc('asas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedDoc === 'asas'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Jadwal Resmi ASAS Ganjil (23 Nov - 2 Des)</span>
            </button>
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            {selectedDoc === 'kurikulum'
              ? 'Kurikulum Madrasah MAN Insan Cendekia Bangka Tengah TA 2026/2027'
              : 'Jadwal Asesmen Sumatif Akhir Semester (ASAS) Ganjil TA 2026/2027'}
          </h2>
          <p className="text-xs text-slate-600">
            {selectedDoc === 'kurikulum'
              ? `Ditetapkan 10 Juli 2026 oleh Kepala Madrasah ${MADRASAH_PROFILE.kepalaMadrasah} & disahkan Pengawas ${MADRASAH_PROFILE.pengawas}.`
              : `Ditetapkan di Bangka Tengah, 16 November 2026 oleh Kepala Madrasah ${MADRASAH_PROFILE.kepalaMadrasah}.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <a
            href={selectedDoc === 'kurikulum' ? MADRASAH_PROFILE.pdfPath : MADRASAH_PROFILE.pdfAsasPath}
            download={selectedDoc === 'kurikulum' ? 'Kurikulum_MANICBATENG_2026-2027.pdf' : 'Jadwal_ASAS_MANICBATENG_2026-2027.pdf'}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Dokumen PDF</span>
          </a>

          <a
            href={selectedDoc === 'kurikulum' ? MADRASAH_PROFILE.pdfPath : MADRASAH_PROFILE.pdfAsasPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka Tab Baru</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Bookmarks navigation sidebar (Shown for Kurikulum) */}
        {selectedDoc === 'kurikulum' ? (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-emerald-700" />
                Daftar Bab & Lampiran Penting
              </h3>
              <span className="text-xs text-slate-400">{bookmarks.length} Pintasan</span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari bagian kurikulum..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
              {filteredBookmarks.map((bm, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBookmark(bm.page)}
                  className={`w-full text-left p-2.5 rounded-xl transition cursor-pointer flex items-start gap-2.5 border ${
                    activeBookmark === bm.page
                      ? 'bg-emerald-50 text-emerald-950 border-emerald-300 shadow-2xs font-medium'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                    Hal {bm.page}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-slate-900 truncate">
                      {bm.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      {bm.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => onAskAira('Jelaskan ringkasan isi dokumen kurikulum 150 halaman MAN IC Bangka Tengah')}
                className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Minta AIRA Merangkum Dokumen</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-700" />
              Poin Penting Jadwal ASAS Ganjil
            </h3>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <strong className="text-emerald-900 block mb-1">Periode Ujian:</strong>
                23 November s.d. 02 Desember 2026.
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <strong className="text-blue-900 block mb-1">Jadwal Mapel Pilihan (M1 - M4):</strong>
                Kelas XI & XII mengikuti ujian M-1 (23 Nov), M-2 (24 Nov), M-3 (25 Nov), dan M-4 (26 Nov) pukul 07.30 - 09.30 WIB.
              </div>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                <strong className="text-purple-900 block mb-1">Ujian Penutup (02 Des 2026):</strong>
                SKI (07.30 - 09.30) dan Prediction TOEFL (10.00 - 12.00) untuk seluruh kelas.
              </div>
            </div>

            <button
              onClick={() => onAskAira('Bagaimana rincian jadwal lengkap ASAS ganjil untuk semua kelas dari 23 November sampai 2 Desember 2026?')}
              className="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Tanyakan Rincian ke AIRA</span>
            </button>
          </div>
        )}

        {/* Embedded PDF Viewer Panel */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[700px]">
          <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-800 truncate">
                {selectedDoc === 'kurikulum' ? 'Kurikulum_MANICBATENG_2026-2027.pdf' : 'Jadwal_ASAS_Tahun_Ajaran_2026-2027.pdf'}
              </span>
              {selectedDoc === 'kurikulum' && (
                <span className="hidden sm:inline text-slate-400">
                  (Halaman {activeBookmark})
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">Pratinjau Resmi</span>
            </div>
          </div>

          <div className="flex-1 bg-slate-800 relative">
            <iframe
              src={activePdfUrl}
              title="Dokumen PDF Resmi MAN IC Bangka Tengah"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
