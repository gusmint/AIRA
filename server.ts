import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { AIRA_SYSTEM_INSTRUCTION } from './server/curriculumKnowledge.ts';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI with server-side API Key
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Smart offline/fallback answer generator if API Key is not set or network fails
function generateLocalAiraAnswer(query: string, userRole: string = 'murid'): { text: string; references: string[] } {
  const lower = query.toLowerCase();

  if (lower.includes('kehadiran') || lower.includes('absen') || lower.includes('bolos') || lower.includes('75%')) {
    return {
      text: `Berdasarkan **Peraturan Akademik MAN Insan Cendekia Bangka Tengah TA 2026/2027 (Pasal 4)**:

1. **Persyaratan Minimal**: Setiap murid wajib memenuhi kehadiran sekurang-kurangnya **75% (tujuh puluh lima persen)** dari jumlah hari belajar efektif pada semester berjalan.
2. **Konsekuensi**: Murid yang tidak memenuhi batas 75% **tidak berhak** mengikuti Asesmen Sumatif Akhir Semester (ASAS) maupun Asesmen Sumatif Akhir Tahun (ASAT).
3. **Dispensasi**: Pengecualian hanya dapat diberikan melalui dispensasi khusus berdasarkan pertimbangan Kepala Madrasah setelah melalui forum rapat dewan guru.
4. **Perhitungan Kehadiran**: Meliputi tatap muka di kelas, pembelajaran daring/blended learning resmi, serta kegiatan pembelajaran pengganti terverifikasi.`,
      references: ['Peraturan Akademik Pasal 4 (Halaman 107)', 'Bab V Asesmen Pembelajaran']
    };
  }

  if (lower.includes('lulus') || lower.includes('kelulusan') || lower.includes('syarat lulus')) {
    return {
      text: `Berdasarkan **Peraturan Akademik MAN Insan Cendekia Bangka Tengah (Pasal 24 & 25)**, syarat kelulusan murid terdiri dari:

1. **Penyelesaian Program Pembelajaran**: Telah menyelesaikan seluruh beban belajar dari Semester 1 sampai dengan Semester 6 sesuai struktur kurikulum.
2. **Asesmen Madrasah**: Memenuhi standar ketuntasan pada Asesmen Madrasah (tertulis dan praktik).
3. **Penyelesaian 4 Program Unggulan Wajib**:
   - **Kegiatan Studi Kolaboratif**: Kunjungan ilmiah ke laboratorium perguruan tinggi/industri.
   - **Kegiatan Homestay**: Pengabdian masyarakat langsung di pedesaan.
   - **Karya Tulis Ilmiah (KTI)**: Penyusunan KTI dan **dinyatakan LULUS dalam Sidang Karya Tulis**.
   - **Tahfiz Al-Qur'an**: Memenuhi standar minimal target hafalan Al-Qur'an yang ditetapkan madrasah.
4. **Kelakuan & Sikap**: Memiliki integritas karakter bernilai minimal Baik sesuai pilar Panca Cinta.`,
      references: ['Peraturan Akademik Pasal 24-25 (Halaman 118)', 'Bab II Kekhasan Madrasah (Halaman 11-13)']
    };
  }

  if (lower.includes('bahasa inggris') && (lower.includes('soal') || lower.includes('ujian') || lower.includes('40%') || lower.includes('asesmen'))) {
    return {
      text: `Berdasarkan **Peraturan Akademik Pasal 14 (Ketentuan Bahasa dalam Instrumen Asesmen)**:

1. **Kaidah 40% Bahasa Inggris**: Sekurang-kurangnya **40% (empat puluh persen)** dari total butir soal asesmen sumatif wajib menggunakan pengantar **Bahasa Inggris**.
2. **Pengecualian**: Ketentuan ini dikecualikan untuk mata pelajaran **Bahasa Indonesia** dan **Bahasa Arab**.
3. **Tujuan Pedagogis**:
   - Meningkatkan literasi akademik dan daya saing global murid MAN IC.
   - Membiasakan pemahaman terminologi keilmuan saintek dan humaniora dalam bahasa internasional.
   - Mendukung visi madrasah sebagai pusat keunggulan (*center of excellence*).
4. **Kualitas Soal**: Pendidik diwajibkan memastikan keterbacaan (*readability*) dan ketepatan konsep agar soal tetap terukur dan adil.`,
      references: ['Peraturan Akademik Pasal 14 (Halaman 112)', 'Bab III Visi, Misi & Tujuan (Halaman 20-22)']
    };
  }

  if (lower.includes('ijin') || lower.includes('izin') || lower.includes('berita duka') || lower.includes('keluarga sakit') || lower.includes('susulan') || (lower.includes('tidak masuk') && (lower.includes('asas') || lower.includes('asat') || lower.includes('ujian')))) {
    return {
      text: `Berdasarkan **Peraturan Akademik MAN Insan Cendekia Bangka Tengah TA 2026/2027 (Pasal 9 Ayat 4–7)** mengenai pelaksanaan Asesmen Sumatif (ASAS & ASAT):

1. **Kewajiban Mengikuti Asesmen**: Seluruh murid wajib mengikuti seluruh rangkaian Asesmen Sumatif sesuai jadwal resmi yang ditetapkan madrasah.
2. **Aturan Ketat Perizinan**: Murid **TIDAK DIBERIKAN IZIN** untuk meninggalkan atau tidak mengikuti asesmen apabila alasan yang diajukan bersifat **tidak penting / tidak mendesak**.
3. **Pengecualian Alasan Utama yang Sah**: Izin ketidakhadiran hanya dapat dipertimbangkan untuk alasan darurat utama keluarga inti yang dapat dipertanggungjawabkan, yaitu:
   - **Keluarga inti sakit berat** (dibuktikan dengan surat/keterangan medis sah).
   - **Berita duka dari keluarga inti** (kematian anggota keluarga inti).
4. **Ketentuan Asesmen Susulan**:
   - Ketidakhadiran lebih dari 1 hari karena kepentingan di luar alasan utama keluarga inti **tidak secara otomatis memberikan hak mengikuti asesmen susulan**.
   - Pemberian izin dan hak asesmen susulan diputuskan secara ketat oleh Kepala Madrasah berdasarkan rekomendasi resmi dari panitia asesmen.`,
      references: ['Peraturan Akademik Pasal 9 (Halaman 109-110)']
    };
  }

  if (lower.includes('soal') || lower.includes('sumatif') || lower.includes('bentuk soal') || lower.includes('jumlah soal')) {
    return {
      text: `Berdasarkan **Peraturan Akademik Pasal 12 dan Pasal 13**:

1. **Variasi Bentuk Soal (Pasal 12)**:
   - Setiap instrumen asesmen sumatif wajib memuat **sekurang-kurangnya 3 (tiga) variasi jenis soal** dari pilihan berikut:
     * Pilihan Ganda biasa
     * Pilihan Ganda Kompleks
     * Benar / Salah
     * Menjodohkan
     * Isian Singkat
     * Esai / Uraian
2. **Jumlah Minimal Soal (Pasal 13)**:
   - **Rumpun Sains**: Sekurang-kurangnya **40 butir soal**.
   - **Rumpun Sosial Humaniora, Bahasa, dan Pendidikan Agama Islam**: Sekurang-kurangnya **50 butir soal**.
3. **Standar Soal**: Wajib memadukan soal tingkat penalaran tinggi (*Higher Order Thinking Skills / HOTS*).`,
      references: ['Peraturan Akademik Pasal 12 & 13 (Halaman 111-112)']
    };
  }

  if (lower.includes('naik kelas') || lower.includes('kenaikan kelas') || lower.includes('tinggal kelas')) {
    return {
      text: `Berdasarkan **Peraturan Akademik Pasal 20 (Kriteria Kenaikan Kelas)**:

1. **Kriteria Kenaikan**: Murid dinyatakan naik kelas jika menyelesaikan evaluasi belajar dan memenuhi standar ketuntasan minimal madrasah.
2. **Kriteria TIDAK NAIK KELAS**:
   - **Ketuntasan Akademik**: Tidak mencapai ketuntasan belajar pada **3 (tiga) mata pelajaran atau lebih**; ATAU
   - **Kehadiran**: Memiliki tingkat kehadiran **kurang dari 75%** dari jumlah hari belajar efektif pada semester ganjil dan genap.
3. **Mekanisme Penetapan**: Keputusan kenaikan kelas ditetapkan secara musyawarah melalui Rapat Dewan Guru dan dituangkan dalam Surat Keputusan Kepala Madrasah.`,
      references: ['Peraturan Akademik Pasal 20 (Halaman 116)']
    };
  }

  if (lower.includes('jadwal asas') || lower.includes('jadwal ujian') || lower.includes('asesmen sumatif') || lower.includes('toefl') || (lower.includes('jadwal') && (lower.includes('november') || lower.includes('desember') || lower.includes('ganjil')))) {
    return {
      text: `Berdasarkan dokumen resmi **Jadwal Asesmen Sumatif Akhir Semester (ASAS) Ganjil TA 2026/2027** yang ditetapkan Kepala Madrasah (**Ahmad Sukri Ahkap, S.Pd., M.Sc.**) pada tanggal 16 November 2026:

Pelaksanaan ujian berlangsung dari **Senin, 23 November 2026 s.d. Rabu, 02 Desember 2026**.

**Pembagian Sesi Ujian Harian**:
- Sesi 1: 07.30 – 09.30 WIB
- Istirahat: 09.30 – 10.00 WIB
- Sesi 2: 10.00 – 12.00 WIB
- Istirahat / ISOMA: 12.00 – 13.00 WIB
- Sesi 3: 13.00 – 14.30 WIB

**Rincian Jadwal per Hari**:
1. **Senin, 23 November 2026**:
   - 07.30 - 09.30: Kelas X: **Geografi** | Kelas XI & XII: **M-1 (Mapel Pilihan 1)**
   - 10.00 - 12.00: Seluruh Kelas (X, XI, XII): **Pendidikan Pancasila**
   - 13.00 - 14.30: Seluruh Kelas (X, XI, XII): **Sejarah**

2. **Selasa, 24 November 2026**:
   - 07.30 - 09.30: Kelas X: **Fisika** | Kelas XI & XII: **M-2 (Mapel Pilihan 2)**
   - 10.00 - 12.00: Seluruh Kelas (X, XI, XII): **Fiqih**
   - 13.00 - 14.30: Kelas X: **Biologi** | Kelas XI & XII: *(Kosong)*

3. **Rabu, 25 November 2026**:
   - 07.30 - 09.30: Kelas X: **Kimia** | Kelas XI & XII: **M-3 (Mapel Pilihan 3)**
   - 10.00 - 12.00: Seluruh Kelas (X, XI, XII): **Bahasa Indonesia**
   - 13.00 - 14.30: Seluruh Kelas (X, XI, XII): **Akidah Akhlak**

4. **Kamis, 26 November 2026**:
   - 07.30 - 09.30: Kelas X: **Ekonomi** | Kelas XI & XII: **M-4 (Mapel Pilihan 4)**
   - 10.00 - 12.00: Seluruh Kelas (X, XI, XII): **Bahasa Arab**
   - 13.00 - 14.30: Kelas X: **Informatika** | Kelas XI & XII: *(Kosong)*

5. **Jumat, 27 November 2026**:
   - 07.30 - 09.30: Kelas X: **Penguatan Bahasa Inggris** | Kelas XI: **Penguatan Matematika** | Kelas XII: *(Kosong)*
   - 10.00 - 12.00: Seluruh Kelas (X, XI, XII): **Pendidikan Jasmani, Olahraga dan Kesehatan (PJOK)**
   - 13.00 - 14.30: Seluruh Kelas: *(Kosong)*

6. **Senin, 30 November 2026**:
   - 07.30 - 09.30: Seluruh Kelas (X, XI, XII): **Matematika**
   - 10.00 - 12.00: Seluruh Kelas (X, XI, XII): **Seni Budaya**
   - 13.00 - 14.30: Kelas X: **Penguatan Ekonomi** | Kelas XI & XII: *(Kosong)*

7. **Selasa, 01 Desember 2026**:
   - 07.30 - 09.30: Seluruh Kelas (X, XI, XII): **Bahasa Inggris**
   - 10.00 - 12.00: Seluruh Kelas (X, XI, XII): **Alquran Hadits**
   - 13.00 - 14.30: Kelas X: **Sosiologi** | Kelas XI & XII: *(Kosong)*

8. **Rabu, 02 Desember 2026**:
   - 07.30 - 09.30: Seluruh Kelas (X, XI, XII): **Sejarah Kebudayaan Islam (SKI)**
   - 10.00 - 12.00: Seluruh Kelas (X, XI, XII): **Prediction TOEFL**
   - 13.00 - 14.30: *(Pelaksanaan ASAS Ganjil Selesai)*`,
      references: ['Dokumen Resmi Jadwal ASAS TA 2026/2027 (SK 16 Nov 2026)']
    };
  }

  if (lower.includes('kalender') || lower.includes('jadwal') || lower.includes('rapor') || lower.includes('libur') || lower.includes('matsama') || lower.includes('asas')) {
    return {
      text: `Berdasarkan **Kalender Pendidikan MAN IC Bangka Tengah TA 2026/2027 (SK Kepala No. 029/2026 & KMA 4860/2026)**:

**Semester Gasal**:
- **13 Juli 2026**: Awal Masuk Tahun Ajaran 2026/2027
- **13 – 18 Juli 2026**: Rentang MATSAMA (Masa Ta'aruf Siswa Madrasah)
- **17 Agustus 2026**: Hari Kemerdekaan RI
- **25 Agustus 2026**: Maulid Nabi Muhammad SAW
- **23 November – 05 Desember 2026**: Rentang ASAS Gasal
- **18 atau 19 Desember 2026**: Penyerahan Rapor Semester Gasal
- **21 Desember 2026 – 02 Januari 2027**: Libur Semester Gasal

**Semester Genap**:
- **04 Januari 2027**: Awal Masuk Semester Genap
- **06 – 13 Maret 2027**: Libur Seputar Hari Raya Idulfitri 1448 H (10-11 Maret)
- **29 Maret – 15 Mei 2027**: Rentang Waktu Ujian Madrasah (UM) Kelas XII
- **24 Mei – 05 Juni 2027**: Perkiraan ASAS Genap / ASAT
- **18 atau 19 Juni 2027**: Penyerahan Rapor Semester Genap
- **21 Juni – 10 Juli 2027**: Libur Akhir Tahun Ajaran`,
      references: ['Kalender Pendidikan Madrasah TA 2026/2027 (Halaman 101-103, 144-147)']
    };
  }

  if (lower.includes('tka') || lower.includes('kompetensi akademik') || lower.includes('tes kompetensi')) {
    return {
      text: `Berdasarkan **Laporan Hasil Tes Kompetensi Akademik (TKA) 2025** di dokumen Kurikulum (Halaman 16-19 & 25-27):

1. **Prestasi Utama**: Seluruh 14 mata pelajaran yang diujikan (87 peserta) memiliki **nilai rata-rata madrasah yang jauh di atas rata-rata nasional**.
2. **Capaian Tertinggi**:
   - **Geografi (Pilihan)**: Rata-rata **86,91** (Nasional: 70,36) dengan nilai individu puncak **90,86**.
   - **Bahasa Arab (Pilihan)**: Rata-rata **84,29** (Nasional: 64,97).
   - **Bahasa Indonesia (Wajib)**: Rata-rata **71,73** (Nasional: 55,38), 80 murid meraih predikat **Istimewa**.
3. **Catatan Refleksi & Intervensi**:
   - Mata pelajaran **Matematika Wajib** (rata-rata 52,50) dan **Fisika** (rata-rata 47,95) memiliki sebaran rentang nilai lebar dan terdapat masing-masing 4 murid pada predikat Kurang.
   - Madrasah mewajibkan pendampingan klinis berupa **Remedial Teaching Terstruktur** bagi murid yang memerlukan penguatan konsep sains-teknologi.`,
      references: ['Bab II Karakteristik Bagian J (Halaman 16-19)', 'Tabel Rekapitulasi TKA (Halaman 25)']
    };
  }

  if (lower.includes('rapor pendidikan') || lower.includes('kebinekaan') || lower.includes('keamanan')) {
    return {
      text: `Berdasarkan **Hasil Rapor Pendidikan 2025 Kemendikdasmen** untuk MAN IC Bangka Tengah (Halaman 14-16 & 131-136):

1. **Predikat Mutu Keseluruhan**: Berkategori **"Baik"**.
2. **Kekuatan Tertinggi (Capaian Terbaik)**:
   - **Kondisi Keamanan Sekolah (Skor 77,00 - Naik)**: Lingkungan asrama terbukti aman, 100% bebas perundungan, tidak ada kekerasan fisik, dan nihil penyalahgunaan zat berbahaya (P4GN).
3. **Poin Paling Perlu Ditingkatkan**:
   - **Kondisi Kebinekaan Sekolah (Skor 71,00 - Tren Menurun)**: Meskipun masih berpredikat Baik, penurunan skor ini menjadi prioritas pembenahan. Madrasah merespons melalui penguatan moderasi beragama, proyek P5-PPRA, dan pembiasaan toleransi sosiokultural di asrama.
4. **Indikator Lain**:
   - Kemampuan Literasi: 100% murid berkategori Baik (skor 93,94).
   - Kemampuan Numerasi: 97,73% murid berkategori Baik (skor 84,99).
   - Kualitas Pembelajaran: Skor 67,00 (difokuskan pada penerapan *Deep Learning*).`,
      references: ['Bab II Hasil Rapor Pendidikan (Halaman 14-16)', 'Infografis Rapor Pendidikan 2025 (Halaman 131)']
    };
  }

  if (lower.includes('panca cinta') || lower.includes('kbc') || lower.includes('kurikulum berbasis cinta') || lower.includes('deep learning')) {
    return {
      text: `Berdasarkan **Bab IV Pengorganisasian Pembelajaran MAN IC Bangka Tengah**:

1. **Kurikulum Berbasis Cinta (KBC / Panca Cinta)**:
   - **Cinta kepada Allah dan Rasul-Nya**: Fondasi ibadah amaliyah dan ketakwaan.
   - **Cinta kepada Diri Sendiri dan Sesama**: Menumbuhkan penghargaan potensi diri, empati, dan gotong royong.
   - **Cinta kepada Ilmu Pengetahuan**: Hasrat meneliti, membaca, dan bereksplorasi secara akademis.
   - **Cinta kepada Kelestarian Lingkungan**: Kepedulian ekologis di kampus asrama yang asri dan bersih.
   - **Cinta kepada Bangsa dan Negara**: Menjunjung tinggi persatuan Indonesia dan moderasi beragama.
2. **Pembelajaran Mendalam (Deep Learning)**:
   - Pendekatan belajar yang memuliakan murid melalui tiga prinsip: **Mindful** (berkesadaran), **Meaningful** (bermakna), dan **Joyful** (menggembirakan).
   - Melibatkan harmonisasi olah pikir, olah hati, olah rasa, dan olah raga dengan 3 tahapan pengalaman belajar: Memahami, Mengaplikasikan, dan Merefleksi.`,
      references: ['Bab IV Bagian A (Halaman 23-24)', 'Bab V Perencanaan Terintegrasi (Halaman 33-35)']
    };
  }

  if (lower.includes('kti') || lower.includes('karya tulis') || lower.includes('riset') || lower.includes('sidang')) {
    return {
      text: `Berdasarkan **Dokumen Kurikulum MAN IC Bangka Tengah (Bab II & Peraturan Akademik)**:

1. **Sifat Program**: Karya Tulis Ilmiah (KTI) adalah **program wajib** bagi seluruh murid dan menjadi **salah satu syarat mutlak kelulusan**.
2. **Tujuan**:
   - Menumbuhkan daya nalar kritis dan pemahaman metodologi riset ilmiah.
   - Mengasah literasi sains dan keterampilan komunikasi verbal saat mempertahankan argumen.
3. **Mekanisme & Tahapan**:
   - Didampingi oleh Guru Pembimbing KTI yang ditetapkan resmi melalui Surat Keputusan Kepala Madrasah (SK No. 026/2026).
   - Murid menyusun proposal, melaksanakan eksperimen/studi lapangan (di dalam atau luar madrasah dengan izin resmi), menyusun naskah laporan, dan menjalani **Sidang Karya Tulis Ilmiah** di Ruang Sidang KTI (Gedung Laboratorium).
4. **Fasilitas Pendukung**: Madrasah menyediakan Ruang Sidang KTI seluas 112 m² serta laboratorium fisika, kimia, biologi, dan komputer yang representatif.`,
      references: ['Bab II Kekhasan Riset & Teknologi (Halaman 11-12)', 'Peraturan Akademik Pasal 24 (Halaman 118)', 'Lampiran 11 SK Pembimbing KTI (Halaman 84-85)']
    };
  }

  if (lower.includes('penguatan') || lower.includes('ekonomi') || lower.includes('cbp rupiah') || lower.includes('blok waktu')) {
    return {
      text: `Berdasarkan **Bab IV Pengorganisasian Pembelajaran**:

1. **Penataan Program Penguatan per Jenjang**:
   - **Fase E (Kelas X)**: Penguatan difokuskan pada **Ekonomi** yang diintegrasikan dengan materi **Cinta, Bangga, dan Paham (CBP) Rupiah** (216 JP/tahun, 24 JP/bulan).
   - **Fase F (Kelas XI)**: Penguatan difokuskan pada **Bahasa Inggris** (216 JP/tahun, 24 JP/bulan) guna mengokohkan kecakapan komunikasi global.
   - **Fase F (Kelas XII)**: Penguatan difokuskan pada **Matematika** (192 JP/tahun, 24 JP/bulan) untuk persiapan seleksi SNBT dan tembus PTN favorit.
2. **Sistem Blok Waktu Terpisah**:
   - Waktu belajar diatur dalam blok waktu terangkum agar murid memiliki ruang utuh menyelesaikan eksperimen sains, proyek kokurikuler, dan KTI tanpa terfragmentasi jadwal yang sempit.`,
      references: ['Bab IV Bagian A & B (Halaman 23-28)']
    };
  }

  // Default response when query is outside or unconfirmed
  return {
    text: `Terima kasih atas pertanyaan Anda kepada AIRA (Academic & Curriculum Assistant) MAN Insan Cendekia Bangka Tengah.

Maaf, informasi spesifik tersebut belum tercantum dalam dokumen Kurikulum AIRA. Silakan konfirmasi ke Bagian Kurikulum/Keagamaan MAN IC Bangka Tengah.

Topik kurikulum resmi yang dapat Anda tanyakan meliputi:
- **Struktur Kurikulum & Jam Pelajaran**: Beban JP Fase E (Kelas X), Fase F (Kelas XI & XII), program penguatan, dan sistem blok waktu terpisah.
- **Kalender Akademik TA 2026/2027**: Jadwal MATSAMA, tanggal ASAS Gasal/Genap, pembagian rapor, dan rentang libur.
- **Peraturan Akademik & Asesmen**: Syarat kehadiran minimal 75%, kaidah 40% soal Bahasa Inggris, ragam soal sumatif, kriteria kenaikan kelas, dan kriteria kelulusan.
- **Program KTI & Riset**: Pelaksanaan Karya Tulis Ilmiah, bimbingan, dan sidang KTI.
- **Data TKA & Rapor Pendidikan 2025**: Capaian 14 mata pelajaran TKA dan evaluasi indikator mutu asrama.`,
    references: ['Dokumen Resmi Kurikulum MAN Insan Cendekia Bangka Tengah TA 2026/2027']
  };
}

// API Route: Chat with AIRA
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], role = 'murid' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
      return;
    }

    // Role contextual cue
    const rolePromptContext = `[User Role: ${role} di MAN Insan Cendekia Bangka Tengah].`;

    // Try Gemini API call with a 9-second timeout for snappy responses
    if (ai) {
      try {
        const contents = [
          ...history.slice(-8).map((h: { sender: string; text: string }) => ({
            role: h.sender === 'aira' ? 'model' : 'user',
            parts: [{ text: h.text }],
          })),
          {
            role: 'user',
            parts: [{ text: `${rolePromptContext} ${message}` }],
          },
        ];

        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: AIRA_SYSTEM_INSTRUCTION,
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.LOW,
            },
            temperature: 0.2, // Low temperature for high precision and strict grounding
            topP: 0.9,
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 30000)
        );

        const response = await Promise.race([geminiPromise, timeoutPromise]);

        const replyText = response.text || '';
        
        // Extract references if mentioned
        const references: string[] = [];
        if (replyText.includes('Pasal 4') || replyText.includes('kehadiran')) references.push('Peraturan Akademik Pasal 4');
        if (replyText.includes('Pasal 12') || replyText.includes('Pasal 13')) references.push('Peraturan Akademik Pasal 12 & 13');
        if (replyText.includes('Pasal 14') || replyText.includes('Bahasa Inggris')) references.push('Peraturan Akademik Pasal 14');
        if (replyText.includes('Pasal 20') || replyText.includes('Kenaikan')) references.push('Peraturan Akademik Pasal 20');
        if (replyText.includes('Pasal 24') || replyText.includes('Kelulusan')) references.push('Peraturan Akademik Pasal 24 & 25');
        if (replyText.includes('TKA') || replyText.includes('Kompetensi Akademik')) references.push('Laporan TKA 2025 (Hal. 16-19, 25)');
        if (replyText.includes('Rapor Pendidikan')) references.push('Rapor Pendidikan 2025 (Hal. 14-16, 131)');
        if (replyText.includes('Kalender') || replyText.includes('Juli 2026') || replyText.includes('2027')) references.push('Kalender Pendidikan SK 029/2026');
        if (replyText.includes('Panca Cinta') || replyText.includes('KBC')) references.push('Kurikulum Berbasis Cinta Bab IV');
        if (replyText.includes('KTI') || replyText.includes('Karya Tulis')) references.push('Bab II Kekhasan Madrasah & Lampiran 11');

        res.json({
          reply: replyText,
          references: references.length > 0 ? references : ['Dokumen Kurikulum MAN IC Bateng TA 2026/2027'],
          source: 'gemini-3.8-flash',
        });
        return;
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local curriculum knowledge engine:', geminiError);
        // Fallback to local verified knowledge engine
        const fallback = generateLocalAiraAnswer(message, role);
        res.json({
          reply: fallback.text,
          references: fallback.references,
          source: 'local-verified-knowledge',
        });
        return;
      }
    }

    // If Gemini is not configured, use local verified knowledge engine
    const fallback = generateLocalAiraAnswer(message, role);
    res.json({
      reply: fallback.text,
      references: fallback.references,
      source: 'local-verified-knowledge',
    });
  } catch (error) {
    console.error('Server error in /api/chat:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan sistem saat memproses pertanyaan.',
      reply: 'Maaf, terjadi kendala teknis internal. Silakan coba kembali atau konfirmasi ke Bagian Kurikulum MAN IC Bangka Tengah.',
    });
  }
});

// API Route: Quick status and health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    app: 'AIRA - MAN IC Bangka Tengah',
    geminiEnabled: Boolean(ai),
    academicYear: '2026/2027',
  });
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`AIRA server is running on http://0.0.0.0:${PORT}`);
    });
  } else {
    const http = await import('http');
    const httpServer = http.createServer(app);

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          server: httpServer,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`AIRA server is running on http://0.0.0.0:${PORT}`);
    });
  }
}

startServer().catch((err) => {
  console.error('Failed to start AIRA server:', err);
});
