export type UserRole = 'murid' | 'guru' | 'orangtua' | 'umum';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'aira';
  text: string;
  timestamp: string;
  references?: string[];
  suggestedFollowUps?: string[];
}

export interface SubjectAllocation {
  no: number;
  subject: string;
  subItems?: { name: string; intraYear: number; kokuYear: number; intraMonth: number; kokuMonth: number }[];
  intraYear?: number;
  kokuYear?: number;
  intraMonth?: number;
  kokuMonth?: number;
}

export interface TKARecap {
  no: number;
  mapel: string;
  kategori: 'Wajib' | 'Pilihan';
  jumlahPeserta: number;
  terendah: number;
  tertinggi: number;
  rataRata: number;
  rataNasional: number;
  istimewa: number;
  baik: number;
  memadai: number;
  kurang: number;
}

export interface CalendarEvent {
  id: string;
  dateStr: string;
  startDate: string; // ISO
  endDate?: string;
  title: string;
  category: 'akademik' | 'ujian' | 'libur' | 'keagamaan';
  semester: 'gasal' | 'genap';
  description: string;
}
