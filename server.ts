/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { NEXIAN_SYSTEM_INSTRUCTION } from './server/curriculumKnowledge.ts';

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

// Comprehensive offline/fallback answer generator for Nexian
function generateLocalNexianAnswer(query: string, userRole: string = 'pengunjung'): { text: string; references: string[] } {
  const lower = query.toLowerCase();

  // 1. SNPDB / Pendaftaran Murid Baru
  if (
    lower.includes('snpdb') ||
    lower.includes('daftar') ||
    lower.includes('pendaftaran') ||
    lower.includes('murid baru') ||
    lower.includes('siswa baru') ||
    lower.includes('syarat masuk') ||
    lower.includes('seleksi')
  ) {
    return {
      text: `Berikut informasi resmi **Pendaftaran Murid Baru (SNMB)** MAN Insan Cendekia Bangka Tengah:

1. **Sistem Terpusat Kemenag**:
   - Pendaftaran diselenggarakan secara daring (online) melalui portal resmi Kementerian Agama RI di **https://snpdb-madrasah.kemenag.go.id**.
2. **Jalur Penerimaan**:
   - **Jalur Tes CBT (Computer Based Test)**: Meliputi Tes Potensi Akademik (TPA), Literasi Skolastik, Matematika, Sains, Bahasa Inggris, dan Pemahaman Keislaman.
   - **Jalur Prestasi**: Diperuntukkan bagi peraih medali juara 1, 2, atau 3 pada kompetisi resmi tingkat nasional/internasional seperti OSN, KSM, OPSI, MYRES, atau MTQ/Tahfiz minimal 10-15 Juz.
   - **Jalur Afirmasi & Kemitraan**: Kuota afirmasi khusus bagi siswa berprestasi dari keluarga kurang mampu atau wilayah afirmasi 3T.
3. **Persyaratan Dokumen**:
   - Memiliki NISN aktif yang terdata di EMIS/Dapodik.
   - Nilai rapor semester 1 sampai dengan 5 tingkat SMP/MTs sederajat.
   - Pasfoto resmi terbaru dengan latar belakang merah/biru.
   - Surat rekomendasi dari Kepala Sekolah/Madrasah asal.
4. **Fasilitas & Beasiswa**:
   - Seluruh peserta didik yang lolos seleksi wajib tinggal di asrama madrasah (*full boarding school*).
   - Biaya pendidikan dan sarana asrama mendapatkan beasiswa subsidi dari Kementerian Agama RI.`,
      references: ['Petunjuk Teknis SNPDB Kemenag RI', 'Informasi Resmi PMB MAN IC Bangka Tengah']
    };
  }

  // 2. Perizinan Khusus Asesmen (ASAS & ASAT)
  if (
    (lower.includes('izin') || lower.includes('ijin') || lower.includes('dispensasi') || lower.includes('sakit')) &&
    (lower.includes('asas') || lower.includes('asat') || lower.includes('asesmen') || lower.includes('ujian'))
  ) {
    return {
      text: `Berdasarkan **Peraturan Akademik & Tata Tertib Asesmen MAN Insan Cendekia Bangka Tengah**:

1. **Ketentuan Larangan Izin**:
   - Murid **TIDAK DIBERIKAN IZIN** untuk tidak mengikuti atau meninggalkan Asesmen Sumatif (baik ASAS maupun ASAT) jika alasan yang diajukan sifatnya tidak mendesak/tidak penting.
2. **Pengecualian Izin Darurat**:
   - Izin dan dispensasi hanya dapat dipertimbangkan dalam kondisi darurat luar biasa keluarga inti, yaitu:
     - Anggota keluarga inti (ayah, ibu, saudara kandung) **sakit keras / opname**.
     - Terjadi **berita duka cita** (meninggal dunia) dari keluarga inti.
     - Murid yang bersangkutan mengalami sakit berat yang dibuktikan dengan surat opname resmi rumah sakit/dokter madrasah.
3. **Asesmen Susulan**:
   - Murid yang berhalangan hadir karena alasan darurat sah di atas berhak mengikuti **Asesmen Sumatif Susulan** setelah mendapat persetujuan tertulis dari Wakil Kepala Madrasah Bidang Kurikulum.`,
      references: ['Peraturan Akademik Bab Asesmen', 'SOP Asesmen Pembelajaran MAN IC Bateng']
    };
  }

  // 3. SOP Karya Tulis Ilmiah (KTI) & SIMANIS
  if (lower.includes('kti') || lower.includes('karya tulis') || lower.includes('sidang') || lower.includes('bimbingan')) {
    return {
      text: `Berdasarkan **SOP Karya Tulis Ilmiah (KTI) & SIMANIS MAN IC Bangka Tengah**:

1. **Sistem Terpadu SIMANIS**:
   - Seluruh pengajuan judul, matriks penelitian, hingga catatan bimbingan dikelola melalui portal **SIMANIS** (*simanis.icbateng.sch.id*).
2. **Ketentuan Bimbingan**:
   - Murid dibimbing oleh Guru Pembimbing KTI resmi berdasarkan Surat Keputusan (SK) Kepala Madrasah.
   - Wajib memenuhi **minimal 8 (delapan) kali logbook bimbingan digital** dalam rentang waktu 2 sampai 3 bulan sebelum mendaftar sidang.
3. **Sidang KTI**:
   - Berlangsung selama **60 menit** di Ruang Sidang KTI (Laboratorium seluas 112 m²).
   - Diuji oleh **3 Dewan Penguji**: Ketua Penguji, Penguji Ahli/Utama, dan Guru Pembimbing sebagai Sekretaris Sidang.
4. **Revisi & Legalitas PTSP**:
   - Naskah revisi pasca-sidang diunggah ke SIMANIS untuk mendapat *ACC* dewan penguji.
   - Pengesahan tanda tangan dan legalitas lembar naskah diproses melalui Pelayanan Terpadu Satu Pintu (PTSP) Madrasah.
   - Lulus Sidang KTI merupakan salah satu **syarat mutlak kelulusan** dari MAN IC Bangka Tengah.`,
      references: ['SOP Bimbingan KTI SIMANIS', 'Peraturan Akademik Pasal 24', 'SK Tim Pembimbing KTI']
    };
  }

  // 4. SOP Remedial dan Pengayaan
  if (lower.includes('remedial') || lower.includes('pengayaan') || lower.includes('kktp')) {
    return {
      text: `Berdasarkan **SOP Remedial dan Pengayaan MAN IC Bangka Tengah**:

1. **Analisis Ketuntasan Cepat**:
   - Guru mata pelajaran wajib melakukan analisis hasil asesmen maksimal **2 hari kerja** setelah asesmen berakhir berdasarkan Kriteria Ketercapaian Tujuan Pembelajaran (KKTP).
2. **Jalur A - Program Remedial (Nilai < KKTP)**:
   - Wajib mengikuti pembelajaran ulang (*re-teaching*) terfokus pada indikator kompetensi yang belum tuntas.
   - Dapat memanfaatkan bimbingan khusus dari guru pengampu atau metode tutor sebaya (*peer tutoring*).
   - Dilanjutkan dengan tes remedial paralel. Nilai capaian akhir remedial maksimal setara dengan nilai batas KKTP.
3. **Jalur B - Program Pengayaan (Nilai ≥ KKTP)**:
   - Diberikan pendalaman materi bernalar kritis (*High Order Thinking Skills* / HOTS).
   - Mengerjakan mini riset mandiri, analisis jurnal sains, atau penyelesaian soal-soal kompetisi tingkat lanjut (OSN/KSM).`,
      references: ['SOP Remedial & Pengayaan Akademik', 'Bab V Asesmen Pembelajaran']
    };
  }

  // 5. SOP Guru Piket & Penanganan Kelas Kosong
  if (lower.includes('guru piket') || lower.includes('piket') || lower.includes('kelas kosong')) {
    return {
      text: `Berdasarkan **SOP Guru Piket MAN Insan Cendekia Bangka Tengah**:

1. **Kehadiran Awal**:
   - Guru piket hadir di madrasah sekurang-kurangnya **15 menit sebelum bel masuk** berbunyi (pukul 06.45 WIB).
2. **Budaya 5S**:
   - Melaksanakan penyambutan kedatangan murid dan bapak/ibu guru di gerbang madrasah dengan budaya **5S** (Senyum, Salam, Sapa, Sopan, dan Santun).
3. **Penanganan Kelas Kosong**:
   - Jika guru mata pelajaran berhalangan hadir, guru piket dalam tempo **15–30 menit** wajib mengoordinasikan guru pengganti atau mendistribusikan penugasan mandiri terstruktur agar jam belajar tetap produktif.
4. **Layanan Perizinan & Jurnal**:
   - Memverifikasi izin murid yang sakit menuju ruang UKS/Klinik atau izin keluar mendesak melalui sistem digital **SIMANIS**.
   - Mencatat seluruh dinamika harian pada buku jurnal piket madrasah.`,
      references: ['SOP Guru Piket Terpadu SIMANIS', 'Tata Tertib Kedisiplinan Madrasah']
    };
  }

  // 6. SOP Input Nilai Rapor via RDM (Rapor Digital Madrasah)
  if (lower.includes('rdm') || lower.includes('rapor') || lower.includes('input nilai')) {
    return {
      text: `Berdasarkan **SOP Penginputan Nilai Rapor via RDM MAN IC Bangka Tengah**:

1. **Aplikasi Resmi**:
   - Seluruh proses pengolahan nilai rapor terpusat pada platform **Rapor Digital Madrasah (RDM)** di tautan *rdm.icbateng.sch.id*.
2. **Tugas Guru Mata Pelajaran**:
   - Menginput bobot penilaian, nilai formatif, nilai tugas/portofolio, dan nilai asesmen sumatif (ASAS/ASAT) beserta deskripsi capaian kompetensi.
3. **Tugas Wali Kelas**:
   - Memeriksa kelengkapan nilai seluruh mapel, merekapitulasi presensi kehadiran (wajib memenuhi syarat minimal 75%), nilai kegiatan ekstrakurikuler, dan catatan pembinaan kepribadian.
4. **Verifikasi & Lock Data**:
   - Penguncian data nilai (*Lock Data*) dilakukan oleh Administrator Akademik bersama Kepala Madrasah sebelum proses pencetakan rapor fisik dan penyerahan kepada orang tua/wali murid.`,
      references: ['SOP Input Nilai Rapor RDM', 'Petunjuk Teknis RDM Ditjen Pendis Kemenag']
    };
  }

  // 7. SOP Proses Pembelajaran KBC (Kurikulum Berbasis Cinta)
  if (lower.includes('pembelajaran') || lower.includes('kbc') || lower.includes('panca cinta') || lower.includes('proses belajar')) {
    return {
      text: `Berdasarkan **SOP Proses Pembelajaran & Kurikulum Berbasis Cinta (KBC)**:

1. **Sintaks Pembelajaran Terstruktur**:
   - **10 Menit Pertama**: Sambutan hangat, pembacaan doa bersama, tadarus/Asmaul Husna, dan *emotional check-in* kondisi murid.
   - **5 Menit**: Asesmen diagnostik singkat serta apersepsi kontekstual yang mengaitkan materi dengan kehidupan nyata.
   - **50–60 Menit**: Pembelajaran inti aktif, berdiferensiasi, eksplorasi sains di laboratorium, dan kolaborasi kelompok.
   - **10 Menit**: Pemberian umpan balik formatif yang apresiatif (*compassionate feedback*).
   - **10 Menit**: Refleksi kebermaknaan ilmu, penguatan nilai Panca Cinta, serta doa syukur penutup.
   - **5 Menit**: Pengarsipan administrasi dan jurnal guru di portal SIMANIS.
2. **Pilar Nilai Panca Cinta**:
   - Cinta Allah & Rasul, Cinta Ilmu, Cinta Lingkungan Hidup, Cinta Sesama & Bangsa, serta Cinta Keunggulan & Mutu.`,
      references: ['SOP Proses Pembelajaran KBC', 'Bab IV Pengorganisasian Pembelajaran']
    };
  }

  // 8. Jadwal ASAS Ganjil 2026/2027
  if (lower.includes('jadwal') || lower.includes('kapan asas') || lower.includes('tanggal')) {
    return {
      text: `Berdasarkan **Jadwal Asesmen Sumatif Akhir Semester (ASAS) Ganjil TA 2026/2027**:

1. **Rentang Pelaksanaan**:
   - ASAS Ganjil diselenggarakan mulai hari **Senin, 23 November 2026** sampai dengan hari **Rabu, 2 Desember 2026**.
2. **Karakteristik Asesmen**:
   - Dilaksanakan secara terpadu di ruang kelas/laboratorium komputer madrasah.
   - Mengintegrasikan minimal **40% soal berbahasa Inggris** pada rumpun sains dan mata pelajaran tertentu.
3. **Peringatan Penting**:
   - Setiap murid wajib menjaga kesehatan dan kehadiran (minimal 75%).
   - Izin meninggalkan ASAS hanya diperkenankan untuk kondisi luar biasa keluarga inti (sakit keras/berita duka cita).`,
      references: ['Dokumen Resmi Jadwal ASAS TA 2026/2027', 'Kalender Pendidikan SK No. 029/2026']
    };
  }

  // 9. Syarat Kehadiran 75%
  if (lower.includes('kehadiran') || lower.includes('absen') || lower.includes('bolos') || lower.includes('75%')) {
    return {
      text: `Berdasarkan **Peraturan Akademik MAN IC Bangka Tengah (Pasal 4)**:

1. **Batas Minimal**: Setiap murid wajib memiliki kehadiran sekurang-kurangnya **75% (tujuh puluh lima persen)** dari seluruh hari belajar efektif pada semester berjalan.
2. **Konsekuensi Pelanggaran**: Murid yang tidak mencapai batas 75% dinyatakan **tidak berhak** mengikuti Asesmen Sumatif (ASAS maupun ASAT).
3. **Dispensasi**: Pengecualian hanya dapat diterbitkan melalui dispensasi resmi Kepala Madrasah setelah melalui rapat dewan guru.`,
      references: ['Peraturan Akademik Pasal 4 (Halaman 107)', 'Bab V Asesmen Pembelajaran']
    };
  }

  // 10. Syarat Kelulusan
  if (lower.includes('lulus') || lower.includes('kelulusan') || lower.includes('syarat lulus')) {
    return {
      text: `Berdasarkan **Peraturan Akademik MAN Insan Cendekia Bangka Tengah (Pasal 24 & 25)**, syarat kelulusan murid terdiri dari:

1. **Menuntaskan Kurikulum**: Menyelesaikan seluruh beban belajar dari Semester 1 s.d. Semester 6.
2. **Asesmen Madrasah**: Memperoleh nilai kelulusan pada seluruh mata pelajaran yang diujikan dalam Asesmen Madrasah.
3. **Menuntaskan 4 Program Unggulan Wajib**:
   - **Studi Kolaboratif**: Kunjungan ilmiah kampus riset/industri.
   - **Homestay**: Program pengabdian masyarakat di desa mitra.
   - **Karya Tulis Ilmiah (KTI)**: Menyelesaikan penelitian dan dinyatakan **LULUS dalam Sidang KTI**.
   - **Tahfiz Al-Qur'an**: Memenuhi target capaian hafalan Al-Qur'an madrasah.
4. **Nilai Sikap**: Memiliki predikat sikap dan kepribadian minimal **Baik**.`,
      references: ['Peraturan Akademik Pasal 24-25', 'Bab II Kekhasan Madrasah']
    };
  }

  // 11. Struktur JP & Program Penguatan
  if (lower.includes('struktur') || lower.includes('beban') || lower.includes('jam pelajaran') || lower.includes('jp') || lower.includes('penguatan')) {
    return {
      text: `Berdasarkan **Bab IV Pengorganisasian Pembelajaran MAN IC Bangka Tengah**:

1. **Fase E (Kelas X)**:
   - Fondasi penguasaan sains dan kepesantrenan.
   - Program Penguatan: **Ekonomi terintegrasi Cinta, Bangga, dan Paham (CBP) Rupiah** (216 JP/tahun, 24 JP/bulan).
2. **Fase F (Kelas XI)**:
   - Pemilihan mata pelajaran peminatan.
   - Program Penguatan: **Bahasa Inggris** (216 JP/tahun, 24 JP/bulan) untuk TOEFL/IELTS dan wawasan internasional.
3. **Fase F (Kelas XII)**:
   - Fokus persiapan seleksi perguruan tinggi.
   - Program Penguatan: **Matematika & Penalaran Sains** (192 JP/tahun, 24 JP/bulan) untuk SNBT/TKA.
4. **Sistem Blok Waktu Terpisah**:
   - Memastikan praktikum laboratorium dan riset KTI terlaksana secara mendalam tanpa terpotong jadwal sempit.`,
      references: ['Bab IV Struktur Kurikulum & Beban Belajar']
    };
  }

  // 12. Kontak dan Alamat
  if (lower.includes('alamat') || lower.includes('lokasi') || lower.includes('kontak') || lower.includes('telepon')) {
    return {
      text: `Berikut alamat dan informasi kontak resmi MAN Insan Cendekia Bangka Tengah:

- **Alamat**: Jl. Sungaiselan Km. 11, Desa Simpang Katis, Kecamatan Simpang Katis, Kabupaten Bangka Tengah, Kepulauan Bangka Belitung, Kode Pos 33674.
- **Portal SNPDB**: https://snpdb-madrasah.kemenag.go.id
- **Portal SIMANIS**: https://simanis.icbateng.sch.id
- **Portal RDM**: https://rdm.icbateng.sch.id
- **Website Resmi**: https://icbateng.sch.id`,
      references: ['Profil Lembaga MAN Insan Cendekia Bangka Tengah']
    };
  }

  // Default response for unlisted queries
  return {
    text: `Terima kasih telah berkonsultasi dengan **Nexian** (AI Assistant resmi MAN Insan Cendekia Bangka Tengah).

Maaf, informasi spesifik tersebut belum tercantum dalam basis data resmi Nexian. Silakan konfirmasi ke Bagian Kurikulum/Keagamaan/Humas MAN IC Bangka Tengah.

Topik resmi yang dapat Anda tanyakan meliputi:
- **Pendaftaran Murid Baru (SNPDB)**: Jalur seleksi CBT, jalur prestasi, afirmasi, jadwal, dan syarat masuk.
- **SOP Madrasah**: SOP Bimbingan & Sidang KTI via SIMANIS, SOP Remedial & Pengayaan (KKTP), SOP Guru Piket, SOP Input Nilai Rapor (RDM), serta SOP Pembelajaran KBC.
- **Peraturan Akademik & Asesmen**: Syarat kehadiran minimal 75%, ketentuan larangan izin saat ASAS/ASAT, kriteria kenaikan kelas, dan kriteria kelulusan.
- **Jadwal & Kalender Akademik**: Jadwal ASAS Ganjil (23 November - 2 Desember 2026), MATSAMA, dan libur semester.
- **Struktur Kurikulum & Jam Belajar**: Penguatan Ekonomi CBP Rupiah (Kelas X), Bahasa Inggris (Kelas XI), dan Matematika (Kelas XII).`,
    references: ['Basis Data Resmi Kurikulum & SOP MAN IC Bangka Tengah']
  };
}

// API Route: Chat with Nexian
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], role = 'pengunjung' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Pesan tidak boleh kosong.' });
      return;
    }

    // Role contextual cue
    const rolePromptContext = `[User Role: ${role} di lingkungan MAN Insan Cendekia Bangka Tengah].`;

    // Try Gemini API call with a 25-second timeout for snappy, high-quality responses
    if (ai) {
      try {
        const contents = [
          ...history.slice(-8).map((h: { sender: string; text: string }) => ({
            role: h.sender === 'nexian' || h.sender === 'aira' ? 'model' : 'user',
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
            systemInstruction: NEXIAN_SYSTEM_INSTRUCTION,
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.LOW,
            },
            temperature: 0.2, // Low temperature for high precision and strict grounding
            topP: 0.9,
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 25000)
        );

        const response = await Promise.race([geminiPromise, timeoutPromise]);
        const replyText = response.text || '';

        // Extract references if mentioned
        const references: string[] = [];
        if (replyText.includes('SNPDB') || replyText.includes('pendaftaran')) references.push('Juknis SNPDB Kemenag RI');
        if (replyText.includes('SIMANIS') || replyText.includes('KTI')) references.push('SOP Bimbingan KTI SIMANIS');
        if (replyText.includes('Remedial') || replyText.includes('KKTP')) references.push('SOP Remedial & Pengayaan');
        if (replyText.includes('Guru Piket') || replyText.includes('5S')) references.push('SOP Guru Piket Madrasah');
        if (replyText.includes('RDM') || replyText.includes('Rapor')) references.push('SOP Input Nilai Rapor RDM');
        if (replyText.includes('Pasal 4') || replyText.includes('kehadiran')) references.push('Peraturan Akademik Pasal 4');
        if (replyText.includes('ASAS') || replyText.includes('23 November')) references.push('Jadwal Resmi ASAS TA 2026/2027');
        if (replyText.includes('Kelulusan') || replyText.includes('Pasal 24')) references.push('Peraturan Akademik Pasal 24-25');
        if (replyText.includes('Panca Cinta') || replyText.includes('KBC')) references.push('Kurikulum Berbasis Cinta (KBC)');

        res.json({
          reply: replyText,
          references: references.length > 0 ? references : ['Basis Data Resmi MAN IC Bangka Tengah'],
          source: 'gemini-3.8-flash',
        });
        return;
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local verified knowledge engine:', geminiError);
        const fallback = generateLocalNexianAnswer(message, role);
        res.json({
          reply: fallback.text,
          references: fallback.references,
          source: 'local-verified-knowledge',
        });
        return;
      }
    }

    // If Gemini is not configured, use local verified knowledge engine
    const fallback = generateLocalNexianAnswer(message, role);
    res.json({
      reply: fallback.text,
      references: fallback.references,
      source: 'local-verified-knowledge',
    });
  } catch (error) {
    console.error('Server error in /api/chat:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan sistem saat memproses pertanyaan.',
      reply: 'Maaf, terjadi kendala teknis internal. Silakan coba kembali atau konfirmasi ke Bagian Kurikulum/Humas MAN IC Bangka Tengah.',
    });
  }
});

// API Route: Quick status and health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    app: 'NEXIAN - MAN IC Bangka Tengah',
    geminiEnabled: Boolean(ai),
    version: '2.0.0',
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
      console.log(`Nexian server is running on http://0.0.0.0:${PORT}`);
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
      console.log(`Nexian server is running on http://0.0.0.0:${PORT}`);
    });
  }
}

startServer().catch((err) => {
  console.error('Failed to start Nexian server:', err);
});
