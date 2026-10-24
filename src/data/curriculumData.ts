import { CalendarEvent, TKARecap } from '../types/curriculum';

export const MADRASAH_PROFILE = {
  nama: 'MAN Insan Cendekia Bangka Tengah',
  singkatan: 'MAN IC Bateng',
  nsm: '131119040001',
  npsn: '69955659',
  status: 'Negeri',
  akreditasi: 'A (Sertifikat No: 00030/19/MA/2023)',
  tahunBerdiri: '27 April 2015 (SK: Kw.29.2015/PP.00/4216/2015)',
  alamat: 'Jalan Raya Desa Sungkap, Kecamatan Simpang Katis, Kabupaten Bangka Tengah, Kepulauan Bangka Belitung, 33674',
  telepon: '(0717) 9109732',
  email: 'manicbangka@gmail.com',
  motto: ['Bahtera Cendekia Setempa Serasa', 'Kampus Prestasi, Mandiri, Islami'],
  kepalaMadrasah: 'Ahmad Sukri Ahkap, S.Pd., M.Sc.',
  nipKepala: '197908242003121001',
  wakaKurikulum: 'Agus Setiawan, S.T.',
  nipWakaKurikulum: '198708202023211020',
  pengawas: 'Desi Wahyuni, S.Pd (NIP. 197512122003122001)',
  ketuaKomite: 'Oktedy Andryansah',
  tahunAjaran: '2026/2027',
  pdfPath: '/assets/aistudio/Kurikulum_MANICBATENG_2026-2027_b04648da.pdf',
  pdfAsasPath: '/assets/aistudio/Jadwal_ASAS_Tahun_Ajaran_2026-2027_9740cab9.pdf',
  skKurikulum: 'Surat Keputusan Kepala Madrasah Nomor 024 Tahun 2026 (10 Juli 2026)',
  skKaldik: 'Surat Keputusan Kepala Madrasah Nomor 029 Tahun 2026 (08 Juli 2026) & KMA Dirjen Pendis No 4860 Tahun 2026',
  totalMurid: 297, // 150 putra, 147 putri
  totalGuru: 30,   // 14 L, 16 P
  totalTendik: 19  // 11 L, 8 P
};

export const VISI_MISI = {
  visi: 'Terwujudnya sumber daya manusia yang berkualitas tinggi dalam keimanan dan ketakwaan, menguasai ilmu pengetahuan dan teknologi, dan mampu mengaktualisasikannya dalam masyarakat.',
  misi: [
    'Menyiapkan calon pemimpin masa depan yang menguasai ilmu pengetahuan dan teknologi, mempunyai daya juang tinggi, kreatif, inovatif, proaktif, dan mempunyai landasan iman dan takwa yang kuat yang diwujudkan melalui kehidupan beragama yang moderat.',
    'Menumbuhkembangkan minat, bakat, dan potensi murid untuk meraih prestasi pada tingkat nasional sampai internasional.',
    'Meningkatkan kemampuan murid dalam berkomunikasi dengan bahasa internasional.',
    'Meningkatkan pengetahuan dan kemampuan profesional pendidik dan tenaga kependidikan sesuai dengan perkembangan dunia pendidikan.',
    'Menjadikan MAN Insan Cendekia sebagai lembaga pendidikan yang bertata kelola yang baik, mandiri, dan berwawasan lingkungan.',
    'Menjadikan MAN Insan Cendekia sebagai model dalam pengembangan pembelajaran IPTEK dan IMTAK bagi lembaga pendidikan lainnya.'
  ],
  target: [
    'Terciptanya kehidupan religius di lingkungan madrasah dengan bercirikan perilaku rajin beribadah, rajin belajar, ikhlas, mandiri, sederhana, ukhuwah, dan kebebasan berkreasi.',
    'Diperolehnya prestasi akademik dan non-akademik yang optimal oleh murid MAN Insan Cendekia.',
    'Terbentuknya murid yang memiliki kemampuan berkomunikasi secara aktif menggunakan bahasa internasional.',
    'Diterimanya lulusan MAN Insan Cendekia di perguruan tinggi yang berkualitas baik di dalam negeri maupun di luar negeri lebih dari 90% tiap tahun.',
    'Diperolehnya prestasi akademik yang baik bagi alumni MAN Insan Cendekia selama studi di perguruan tinggi.',
    'Terciptanya MAN Insan Cendekia yang ramah anak dan lingkungan.',
    'Terciptanya MAN Insan Cendekia yang memiliki budaya penguatan pendidikan karakter, moderasi beragama, dan pendidikan anti korupsi.'
  ]
};

export const EMPAT_PILAR_INTEGRASI = [
  {
    nama: 'Pembelajaran Mendalam (Deep Learning)',
    tag: 'Pedagogi Unggulan',
    deskripsi: 'Pendekatan yang memuliakan dengan menekankan proses berkesadaran (mindful), bermakna (meaningful), dan menggembirakan (joyful) melalui olah pikir, olah hati, olah rasa, dan olah raga secara holistik. Murid melalui 3 tahapan: Memahami, Mengaplikasikan, dan Merefleksi.'
  },
  {
    nama: 'Kurikulum Berbasis Cinta (KBC / Panca Cinta)',
    tag: 'Karakter & Jiwa',
    deskripsi: 'Penjiwaan seluruh interaksi belajar-mengajar melalui lima pilar kasih sayang: (1) Cinta kepada Allah dan Rasul-Nya, (2) Cinta kepada Diri Sendiri dan Sesama, (3) Cinta kepada Ilmu Pengetahuan, (4) Cinta kepada Kelestarian Lingkungan, dan (5) Cinta kepada Bangsa dan Negara.'
  },
  {
    nama: 'Moderasi Beragama (MB)',
    tag: 'Sikap Beragama',
    deskripsi: 'Internalisasi nilai Islam rahmatan lil \'alamin: Tawasut (tengah-tengah), Tawazun (seimbang), I\'tidal (adil), dan Tasamuh (toleran) untuk membentuk cara pandang inklusif di lingkungan asrama.'
  },
  {
    nama: 'Cinta, Bangga, Paham Rupiah (CBP Rupiah)',
    tag: 'Literasi Finansial',
    deskripsi: 'Edukasi literasi keuangan nasional yang diintegrasikan ke mata pelajaran Ekonomi Kelas X (Fase E) untuk menumbuhkan rasa nasionalisme melalui simbol kedaulatan ekonomi negara.'
  }
];

export const PROGRAM_PENGUATAN = [
  {
    kelas: 'Kelas X (Fase E)',
    fokus: 'Ekonomi (Terintegrasi CBP Rupiah)',
    alokasi: '216 JP per tahun (24 JP per bulan)',
    tujuan: 'Menumbuhkan pemahaman ekonomi makro-mikro, literasi finansial CBP Rupiah, dan kesiapan kewirausahaan.'
  },
  {
    kelas: 'Kelas XI (Fase F)',
    fokus: 'Bahasa Inggris',
    alokasi: '216 JP per tahun (24 JP per bulan)',
    tujuan: 'Mengokohkan kecakapan komunikasi internasional, public speaking, dan persiapan studi global.'
  },
  {
    kelas: 'Kelas XII (Fase F)',
    fokus: 'Matematika',
    alokasi: '192 JP per tahun (24 JP per bulan)',
    tujuan: 'Mengawal kesiapan penalaran kuantitatif menghadapi UTBK-SNBT dan seleksi masuk PTN favorit terkemuka.'
  }
];

export const KALENDER_DATA: CalendarEvent[] = [
  // Semester Gasal
  {
    id: 'g-1',
    dateStr: '13 Juli 2026',
    startDate: '2026-07-13',
    title: 'Awal Masuk Tahun Ajaran 2026/2027',
    category: 'akademik',
    semester: 'gasal',
    description: 'Hari pertama masuk madrasah bagi seluruh murid kelas X, XI, dan XII semester gasal.'
  },
  {
    id: 'g-2',
    dateStr: '13 – 18 Juli 2026',
    startDate: '2026-07-13',
    endDate: '2026-07-18',
    title: 'Rentang Pengenalan Lingkungan Madrasah (MATSAMA)',
    category: 'akademik',
    semester: 'gasal',
    description: 'Orientasi bagi peserta didik baru untuk mengenal iklim asrama, nilai Panca Cinta, dan kurikulum madrasah.'
  },
  {
    id: 'g-3',
    dateStr: '17 Agustus 2026',
    startDate: '2026-08-17',
    title: 'Hari Kemerdekaan RI ke-81',
    category: 'libur',
    semester: 'gasal',
    description: 'Peringatan Hari Proklamasi Kemerdekaan Republik Indonesia, apel bendera di kampus madrasah.'
  },
  {
    id: 'g-4',
    dateStr: '25 Agustus 2026',
    startDate: '2026-08-25',
    title: 'Maulid Nabi Muhammad SAW',
    category: 'keagamaan',
    semester: 'gasal',
    description: 'Peringatan Hari Besar Islam (PHBI) dan pembinaan spiritualitas amaliah nabi di musala asrama.'
  },
  {
    id: 'g-5',
    dateStr: '23 November – 05 Desember 2026',
    startDate: '2026-11-23',
    endDate: '2026-12-05',
    title: 'Rentang Asesmen Sumatif Akhir Semester (ASAS) Gasal',
    category: 'ujian',
    semester: 'gasal',
    description: 'Pelaksanaan ASAS Gasal dengan ketentuan min. 3 bentuk soal dan 40% berbahasa Inggris (Sains & Soshum).'
  },
  {
    id: 'g-6',
    dateStr: '18 atau 19 Desember 2026',
    startDate: '2026-12-18',
    endDate: '2026-12-19',
    title: 'Penyerahan Laporan Hasil Belajar (Rapor) Semester Gasal',
    category: 'akademik',
    semester: 'gasal',
    description: 'Pembagian rapor semester gasal kepada orang tua/wali murid disertai konsultasi perkembangan belajar.'
  },
  {
    id: 'g-7',
    dateStr: '21 Desember 2026 – 02 Januari 2027',
    startDate: '2026-12-21',
    endDate: '2027-01-02',
    title: 'Libur Semester Gasal',
    category: 'libur',
    semester: 'gasal',
    description: 'Masa libur pembelajaran semester gasal bagi murid MAN Insan Cendekia Bangka Tengah.'
  },

  // Semester Genap
  {
    id: 'gen-1',
    dateStr: '04 Januari 2027',
    startDate: '2027-01-04',
    title: 'Awal Masuk Semester Genap TA 2026/2027',
    category: 'akademik',
    semester: 'genap',
    description: 'Hari pertama KBM semester genap setelah kepulangan libur semester gasal.'
  },
  {
    id: 'gen-2',
    dateStr: '05 Januari 2027',
    startDate: '2027-01-05',
    title: 'Peringatan Isra Mi\'raj Nabi Muhammad SAW',
    category: 'keagamaan',
    semester: 'genap',
    description: 'Peringatan hari besar keislaman dan kajian tausiyah di asrama.'
  },
  {
    id: 'gen-3',
    dateStr: '06 – 13 Maret 2027',
    startDate: '2027-03-06',
    endDate: '2027-03-13',
    title: 'Libur Seputar Hari Raya Idulfitri 1448 H',
    category: 'libur',
    semester: 'genap',
    description: 'Libur Idulfitri 1448 H (10-11 Maret 2027) dan cuti bersama keagamaan sesuai regulasi pemerintah.'
  },
  {
    id: 'gen-4',
    dateStr: '29 Maret – 15 Mei 2027',
    startDate: '2027-03-29',
    endDate: '2027-05-15',
    title: 'Rentang Waktu Ujian Madrasah (UM) Kelas XII',
    category: 'ujian',
    semester: 'genap',
    description: 'Asesmen akhir jenjang bagi murid kelas XII mencakup ujian tertulis dan ujian praktik laboratorium/keagamaan.'
  },
  {
    id: 'gen-5',
    dateStr: '24 Mei – 05 Juni 2027',
    startDate: '2027-05-24',
    endDate: '2027-06-05',
    title: 'Perkiraan Rentang Waktu ASAS Genap / ASAT',
    category: 'ujian',
    semester: 'genap',
    description: 'Asesmen Sumatif Akhir Tahun bagi kelas X dan XI untuk evaluasi kenaikan kelas.'
  },
  {
    id: 'gen-6',
    dateStr: '18 atau 19 Juni 2027',
    startDate: '2027-06-18',
    endDate: '2027-06-19',
    title: 'Penyerahan Laporan Hasil Belajar (Rapor) Semester Genap',
    category: 'akademik',
    semester: 'genap',
    description: 'Penyampaian buku rapor dan keputusan kenaikan kelas oleh wali kelas kepada wali murid.'
  },
  {
    id: 'gen-7',
    dateStr: '21 Juni – 10 Juli 2027',
    startDate: '2027-06-21',
    endDate: '2027-07-10',
    title: 'Libur Akhir Tahun Ajaran 2026/2027',
    category: 'libur',
    semester: 'genap',
    description: 'Masa libur kenaikan kelas dan akhir tahun ajaran sebelum permulaan TA 2027/2028.'
  }
];

export const PERATURAN_AKADEMIK = {
  kehadiranMinimal: '75% (Tujuh puluh lima persen)',
  pasalKehadiran: 'Pasal 4 Peraturan Akademik MAN IC Bateng TA 2026/2027',
  keteranganKehadiran: 'Murid yang kehadirannya kurang dari 75% tidak dapat mengikuti ASAS/ASAT kecuali mendapat dispensasi khusus dari Kepala Madrasah setelah melalui rapat dewan guru.',
  
  asesmenSumatif: {
    ragamSoal: 'Wajib menggunakan minimal 3 (tiga) jenis soal dari variasi: Pilihan Ganda, Pilihan Ganda Kompleks, Benar/Salah, Menjodohkan, Isian Singkat, dan Esai (Pasal 12).',
    jumlahSoalMinimal: 'Mata pelajaran Sains minimal 40 soal; Mata pelajaran Sosial Humaniora, Bahasa, dan Pendidikan Agama Islam minimal 50 soal (Pasal 13).',
    bahasaInggris: 'Sekurang-kurangnya 40% dari jumlah soal menggunakan bahasa Inggris (Pasal 14), dikecualikan untuk mata pelajaran Bahasa Indonesia dan Bahasa Arab.',
    aturanIzinKetat: 'Murid TIDAK DIBERIKAN IZIN meninggalkan Asesmen Sumatif (ASAS/ASAT) untuk urusan yang tidak penting. Pengecualian HANYA diberikan untuk keadaan darurat keluarga inti yang sah (keluarga inti sakit berat atau berita duka kematian keluarga inti). Izin di luar alasan utama tidak berhak ujian susulan (Pasal 9 Ayat 4–7).'
  },

  kenaikanKelas: {
    pasal: 'Pasal 20 Peraturan Akademik',
    syarat: [
      'Memenuhi ketentuan akademik dan nonakademik sesuai peraturan madrasah.',
      'Dinyatakan TIDAK NAIK KELAS apabila: (a) Tidak mencapai ketuntasan belajar pada 3 (tiga) mata pelajaran atau lebih; ATAU (b) Memiliki tingkat kehadiran kurang dari 75% dari jumlah hari belajar efektif pada semester ganjil dan genap.'
    ]
  },

  peminatan: {
    pasal: 'Pasal 21 - 23 Peraturan Akademik',
    aturan: [
      'Murid wajib memilih 4 (empat) mata pelajaran minat yang disediakan oleh madrasah.',
      'Penetapan didasarkan pada angket peminatan, pertimbangan akademik, rekomendasi guru BK, dan kuota rombel.',
      'Perpindahan mata pelajaran minat hanya dapat dilakukan paling lambat pada semester genap melalui koordinasi dengan bidang kurikulum dan guru BK.'
    ]
  },

  kelulusan: {
    pasal: 'Pasal 24 & 25 Peraturan Akademik',
    syaratUtama: [
      'Menyelesaikan seluruh program pembelajaran dari semester 1 sampai dengan semester 6.',
      'Memperoleh nilai Asesmen Madrasah yang memenuhi standar kompetensi lulusan.',
      'Menyelesaikan 4 Program Unggulan Wajib MAN Insan Cendekia: (1) Kegiatan Studi Kolaboratif, (2) Kegiatan Homestay (Pengabdian Masyarakat di Desa), (3) Penyusunan Karya Tulis Ilmiah (KTI) dan LULUS Sidang KTI, dan (4) Memperoleh capaian hafalan Al-Qur\'an (Tahfiz) standar minimal.'
    ]
  },

  penelitianMurid: {
    pasal: 'Pasal 30 & 31 Peraturan Akademik',
    aturan: 'Murid berhak melaksanakan penelitian di dalam maupun di luar madrasah dengan izin tertulis dari Kepala Madrasah dan persetujuan guru pembimbing. Izin di luar madrasah dapat lebih dari 1 hari dan tetap diakui sebagai kehadiran akademik bersyarat.'
  }
};

export const TKA_RECAP_DATA: TKARecap[] = [
  { no: 1, mapel: 'Bahasa Indonesia', kategori: 'Wajib', jumlahPeserta: 87, terendah: 48.52, tertinggi: 90.70, rataRata: 71.73, rataNasional: 55.38, istimewa: 80, baik: 7, memadai: 0, kurang: 0 },
  { no: 2, mapel: 'Matematika', kategori: 'Wajib', jumlahPeserta: 87, terendah: 23.31, tertinggi: 79.42, rataRata: 52.50, rataNasional: 36.10, istimewa: 22, baik: 48, memadai: 13, kurang: 4 },
  { no: 3, mapel: 'Bahasa Inggris', kategori: 'Wajib', jumlahPeserta: 87, terendah: 5.00, tertinggi: 74.03, rataRata: 37.44, rataNasional: 24.93, istimewa: 47, baik: 12, memadai: 22, kurang: 6 },
  { no: 4, mapel: 'Matematika Lanjut', kategori: 'Pilihan', jumlahPeserta: 34, terendah: 33.91, tertinggi: 62.60, rataRata: 47.81, rataNasional: 39.32, istimewa: 8, baik: 15, memadai: 11, kurang: 0 },
  { no: 5, mapel: 'Fisika', kategori: 'Pilihan', jumlahPeserta: 20, terendah: 35.20, tertinggi: 72.00, rataRata: 47.95, rataNasional: 37.65, istimewa: 3, baik: 2, memadai: 11, kurang: 4 },
  { no: 6, mapel: 'Biologi', kategori: 'Pilihan', jumlahPeserta: 32, terendah: 57.98, tertinggi: 79.63, rataRata: 68.89, rataNasional: 54.40, istimewa: 13, baik: 19, memadai: 0, kurang: 0 },
  { no: 7, mapel: 'Kimia', kategori: 'Pilihan', jumlahPeserta: 16, terendah: 36.95, tertinggi: 58.19, rataRata: 46.21, rataNasional: 34.92, istimewa: 2, baik: 5, memadai: 9, kurang: 0 },
  { no: 8, mapel: 'Geografi', kategori: 'Pilihan', jumlahPeserta: 5, terendah: 80.34, tertinggi: 90.86, rataRata: 86.91, rataNasional: 70.36, istimewa: 4, baik: 1, memadai: 0, kurang: 0 },
  { no: 9, mapel: 'Sosiologi', kategori: 'Pilihan', jumlahPeserta: 30, terendah: 60.64, tertinggi: 89.16, rataRata: 76.16, rataNasional: 60.07, istimewa: 16, baik: 9, memadai: 5, kurang: 0 },
  { no: 10, mapel: 'Ekonomi', kategori: 'Pilihan', jumlahPeserta: 24, terendah: 33.99, tertinggi: 72.39, rataRata: 45.12, rataNasional: 31.68, istimewa: 7, baik: 10, memadai: 7, kurang: 0 },
  { no: 11, mapel: 'Bahasa Indonesia Lanjut', kategori: 'Pilihan', jumlahPeserta: 5, terendah: 74.19, tertinggi: 87.33, rataRata: 79.63, rataNasional: 68.02, istimewa: 2, baik: 3, memadai: 0, kurang: 0 },
  { no: 12, mapel: 'PKn', kategori: 'Pilihan', jumlahPeserta: 6, terendah: 65.25, tertinggi: 85.21, rataRata: 76.00, rataNasional: 60.91, istimewa: 3, baik: 2, memadai: 1, kurang: 0 },
  { no: 13, mapel: 'Bahasa Arab', kategori: 'Pilihan', jumlahPeserta: 1, terendah: 84.29, tertinggi: 84.29, rataRata: 84.29, rataNasional: 64.97, istimewa: 1, baik: 0, memadai: 0, kurang: 0 },
  { no: 14, mapel: 'Bahasa Inggris Lanjut', kategori: 'Pilihan', jumlahPeserta: 1, terendah: 80.68, tertinggi: 80.68, rataRata: 80.68, rataNasional: 45.23, istimewa: 1, baik: 0, memadai: 0, kurang: 0 }
];

export const RAPOR_PENDIDIKAN_HIGHLIGHTS = {
  predikatUmum: 'Baik',
  tahun: 2025,
  capaianTertinggi: {
    aspek: 'Kondisi Keamanan Sekolah',
    skor: 77.0,
    tren: 'Naik +1.01 dari 75.99 (Peringkat Atas)',
    keterangan: 'Lingkungan asrama (boarding school) sangat kondusif, 100% bebas perundungan, tidak ada kekerasan fisik maupun peredaran zat terlarang (P4GN).'
  },
  prioritasPeningkatan: {
    aspek: 'Kondisi Kebinekaan Sekolah',
    skor: 71.0,
    tren: 'Turun -0.76 dari 71.76 (Predikat Baik namun tren menurun)',
    keterangan: 'Diidentifikasi sebagai poin yang PALING PERLU DITINGKATKAN. Madrasah merespons dengan penguatan moderasi beragama, toleransi sosiokultural, dan interaksi murid lintas daerah.'
  },
  indikatorLain: [
    { nama: 'Kemampuan Literasi', skor: '100% Baik (93.94)', status: 'Naik +7.42', peringkat: 'Peringkat Atas 1-5%' },
    { nama: 'Kemampuan Numerasi', skor: '97.73% Baik (84.99)', status: 'Naik +10.51', peringkat: 'Peringkat Atas 1-5%' },
    { nama: 'Karakter Murid', skor: '64.80 Baik', status: 'Turun -1.94', peringkat: 'Perlu penguatan pilar Panca Cinta' },
    { nama: 'Kualitas Pembelajaran', skor: '67.00 Baik', status: 'Turun -0.76', peringkat: 'Fokus adopsi Deep Learning' }
  ]
};

export const JADWAL_ASAS_GANJIL = {
  judul: 'Jadwal Asesmen Sumatif Akhir Semester (ASAS) Ganjil TA 2026/2027',
  madrasah: 'MAN Insan Cendekia Bangka Tengah',
  periode: '23 November 2026 – 02 Desember 2026',
  tanggalPenetapan: 'Bangka Tengah, 16 November 2026',
  kepalaMadrasah: 'Ahmad Sukri Ahkap, S.Pd., M.Sc.',
  nipKepala: '197908242003121001',
  sesiWaktu: [
    { sesi: 'Sesi 1', jam: '07.30 - 09.30' },
    { sesi: 'Istirahat 1', jam: '09.30 - 10.00' },
    { sesi: 'Sesi 2', jam: '10.00 - 12.00' },
    { sesi: 'Istirahat / ISOMA', jam: '12.00 - 13.00' },
    { sesi: 'Sesi 3', jam: '13.00 - 14.30' }
  ],
  jadwalHarian: [
    {
      hari: 'Senin',
      tanggal: '23 November 2026',
      sesi: [
        { jam: '07.30 - 09.30', kelasX: 'Geografi', kelasXI: 'M-1 (Pilihan 1)', kelasXII: 'M-1 (Pilihan 1)' },
        { jam: '10.00 - 12.00', kelasX: 'Pendidikan Pancasila', kelasXI: 'Pendidikan Pancasila', kelasXII: 'Pendidikan Pancasila' },
        { jam: '13.00 - 14.30', kelasX: 'Sejarah', kelasXI: 'Sejarah', kelasXII: 'Sejarah' }
      ]
    },
    {
      hari: 'Selasa',
      tanggal: '24 November 2026',
      sesi: [
        { jam: '07.30 - 09.30', kelasX: 'Fisika', kelasXI: 'M-2 (Pilihan 2)', kelasXII: 'M-2 (Pilihan 2)' },
        { jam: '10.00 - 12.00', kelasX: 'Fiqih', kelasXI: 'Fiqih', kelasXII: 'Fiqih' },
        { jam: '13.00 - 14.30', kelasX: 'Biologi', kelasXI: '-', kelasXII: '-' }
      ]
    },
    {
      hari: 'Rabu',
      tanggal: '25 November 2026',
      sesi: [
        { jam: '07.30 - 09.30', kelasX: 'Kimia', kelasXI: 'M-3 (Pilihan 3)', kelasXII: 'M-3 (Pilihan 3)' },
        { jam: '10.00 - 12.00', kelasX: 'Bahasa Indonesia', kelasXI: 'Bahasa Indonesia', kelasXII: 'Bahasa Indonesia' },
        { jam: '13.00 - 14.30', kelasX: 'Akidah Akhlak', kelasXI: 'Akidah Akhlak', kelasXII: 'Akidah Akhlak' }
      ]
    },
    {
      hari: 'Kamis',
      tanggal: '26 November 2026',
      sesi: [
        { jam: '07.30 - 09.30', kelasX: 'Ekonomi', kelasXI: 'M-4 (Pilihan 4)', kelasXII: 'M-4 (Pilihan 4)' },
        { jam: '10.00 - 12.00', kelasX: 'Bahasa Arab', kelasXI: 'Bahasa Arab', kelasXII: 'Bahasa Arab' },
        { jam: '13.00 - 14.30', kelasX: 'Informatika', kelasXI: '-', kelasXII: '-' }
      ]
    },
    {
      hari: 'Jumat',
      tanggal: '27 November 2026',
      sesi: [
        { jam: '07.30 - 09.30', kelasX: 'Penguatan Bahasa Inggris', kelasXI: 'Penguatan Matematika', kelasXII: '-' },
        { jam: '10.00 - 12.00', kelasX: 'Pendidikan Jasmani, Olahraga dan Kesehatan (PJOK)', kelasXI: 'Pendidikan Jasmani, Olahraga dan Kesehatan (PJOK)', kelasXII: 'Pendidikan Jasmani, Olahraga dan Kesehatan (PJOK)' },
        { jam: '13.00 - 14.30', kelasX: '-', kelasXI: '-', kelasXII: '-' }
      ]
    },
    {
      hari: 'Senin',
      tanggal: '30 November 2026',
      sesi: [
        { jam: '07.30 - 09.30', kelasX: 'Matematika', kelasXI: 'Matematika', kelasXII: 'Matematika' },
        { jam: '10.00 - 12.00', kelasX: 'Seni Budaya', kelasXI: 'Seni Budaya', kelasXII: 'Seni Budaya' },
        { jam: '13.00 - 14.30', kelasX: 'Penguatan Ekonomi', kelasXI: '-', kelasXII: '-' }
      ]
    },
    {
      hari: 'Selasa',
      tanggal: '01 Desember 2026',
      sesi: [
        { jam: '07.30 - 09.30', kelasX: 'Bahasa Inggris', kelasXI: 'Bahasa Inggris', kelasXII: 'Bahasa Inggris' },
        { jam: '10.00 - 12.00', kelasX: 'Alquran Hadits', kelasXI: 'Alquran Hadits', kelasXII: 'Alquran Hadits' },
        { jam: '13.00 - 14.30', kelasX: 'Sosiologi', kelasXI: '-', kelasXII: '-' }
      ]
    },
    {
      hari: 'Rabu',
      tanggal: '02 Desember 2026',
      sesi: [
        { jam: '07.30 - 09.30', kelasX: 'Sejarah Kebudayaan Islam (SKI)', kelasXI: 'Sejarah Kebudayaan Islam (SKI)', kelasXII: 'Sejarah Kebudayaan Islam (SKI)' },
        { jam: '10.00 - 12.00', kelasX: 'Prediction TOEFL', kelasXI: 'Prediction TOEFL', kelasXII: 'Prediction TOEFL' },
        { jam: '13.00 - 14.30', kelasX: '- (Selesai ASAS)', kelasXI: '- (Selesai ASAS)', kelasXII: '- (Selesai ASAS)' }
      ]
    }
  ]
};

export const QUICK_QUESTIONS = {
  murid: [
    'Bagaimana jadwal lengkap ASAS Ganjil 2026 untuk Kelas X?',
    'Kapan jadwal ujian Prediction TOEFL dan SKI?',
    'Berapa persentase kehadiran minimal agar saya bisa ikut ASAS/ASAT?',
    'Kapan ujian Fisika, Kimia, dan Biologi untuk kelas X?',
    'Apa saja 4 syarat kelulusan dan program unggulan wajib MAN IC Bangka Tengah?'
  ],
  guru: [
    'Bagaimana pembagian sesi waktu ujian ASAS Ganjil 2026 (23 Nov - 2 Des)?',
    'Berapa jumlah minimal dan variasi bentuk soal untuk Asesmen Sumatif?',
    'Kapan jadwal ujian mata pelajaran peminatan (M-1 s.d. M-4) kelas XI & XII?',
    'Bagaimana ketentuan 40% bahasa Inggris dalam soal ujian ASAS?',
    'Kapan jadwal pembagian rapor semester gasal setelah ASAS selesai?'
  ],
  orangtua: [
    'Kapan jadwal lengkap ujian ASAS Ganjil anak saya (23 Nov - 2 Des 2026)?',
    'Kapan jadwal pembagian rapor semester gasal 2026 setelah ujian selesai?',
    'Bagaimana sistem pembinaan karakter dan keasramaan anak di MAN IC Bateng?',
    'Kapan rentang libur semester gasal 2026/2027?',
    'Apa saja syarat kehadiran agar siswa diizinkan mengikuti ujian?'
  ],
  umum: [
    'Kapan periode pelaksanaan ASAS Ganjil 2026/2027 di MAN IC Bangka Tengah?',
    'Apa visi, misi, dan motto resmi MAN Insan Cendekia Bangka Tengah?',
    'Bagaimana hasil Tes Kompetensi Akademik (TKA) 2025 dibanding rata-rata nasional?',
    'Apa saja materi ujian penguatan khas di MAN IC Bangka Tengah?',
    'Siapa kepala madrasah yang menandatangani jadwal ASAS 2026/2027?'
  ]
};
