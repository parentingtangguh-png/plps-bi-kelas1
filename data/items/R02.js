/**
 * Item bank untuk BI-A-R02 — Memahami isi bacaan
 * Evidence mode: AUTO (pilihan ganda, dinilai otomatis)
 *
 * Struktur satu item:
 *   id, family, phase (cek_awal | latihan | cek_ulang), stimulus, soal, opsi[], kunci
 *
 * Family: pengelompokan berdasarkan tipe tuntutan kemampuan yang sama.
 *   FAM-A: menemukan informasi tersurat (siapa/apa/di mana)
 *   FAM-B: memahami urutan kejadian / prosedur
 *   FAM-C: memahami tujuan atau maksud teks
 *   FAM-D: menghubungkan informasi teks dengan konteks
 *
 * Kunci bahan: stimulus cek_ulang TIDAK BOLEH sama dengan cek_awal.
 * Tuntutan kemampuan (family) harus sepadan antara cek_awal dan cek_ulang.
 */

export const UNIT_ID = 'BI-A-R02';

export const ITEMS = [

  // ═══════════════════════════════════════════
  // CEK AWAL — triage (2 soal: 1 FAM-A, 1 FAM-B)
  // ═══════════════════════════════════════════
  {
    id: 'R02-CA-A1',
    family: 'FAM-A',
    phase: 'cek_awal',
    stimulus: 'Budi pergi ke pasar bersama ibunya. Mereka membeli sayur dan buah. Ibu membeli wortel, bayam, dan pisang.',
    soal: 'Apa yang dibeli ibu di pasar?',
    opsi: [
      { id: 'a', teks: 'Baju dan sepatu' },
      { id: 'b', teks: 'Wortel, bayam, dan pisang' },
      { id: 'c', teks: 'Nasi dan lauk' },
    ],
    kunci: 'b',
  },
  {
    id: 'R02-CA-B1',
    family: 'FAM-B',
    phase: 'cek_awal',
    stimulus: 'Setiap pagi, Ani bangun tidur. Kemudian ia mandi. Setelah mandi, Ani sarapan. Lalu ia berangkat ke sekolah.',
    soal: 'Apa yang dilakukan Ani setelah mandi?',
    opsi: [
      { id: 'a', teks: 'Berangkat ke sekolah' },
      { id: 'b', teks: 'Bangun tidur' },
      { id: 'c', teks: 'Sarapan' },
    ],
    kunci: 'c',
  },

  // ═══════════════════════════════════════════
  // LATIHAN TERPANDU — dengan umpan balik (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R02-LT-A1',
    family: 'FAM-A',
    phase: 'latihan',
    stimulus: 'Kucing Siti bernama Mimi. Mimi suka tidur di atas kasur. Setiap sore, Siti memberi Mimi makan ikan.',
    soal: 'Di mana Mimi suka tidur?',
    opsi: [
      { id: 'a', teks: 'Di atas meja' },
      { id: 'b', teks: 'Di atas kasur' },
      { id: 'c', teks: 'Di dalam kandang' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Betul! Kalimat kedua menyebutkan Mimi suka tidur di atas kasur.',
    umpan_balik_salah: 'Coba baca lagi kalimat kedua. Di sana tertulis di mana Mimi suka tidur.',
  },
  {
    id: 'R02-LT-B1',
    family: 'FAM-B',
    phase: 'latihan',
    stimulus: 'Dino ingin menggambar. Pertama, ia mengambil kertas. Kedua, ia mengambil pensil. Ketiga, ia mulai menggambar.',
    soal: 'Apa yang dilakukan Dino pertama kali?',
    opsi: [
      { id: 'a', teks: 'Mulai menggambar' },
      { id: 'b', teks: 'Mengambil pensil' },
      { id: 'c', teks: 'Mengambil kertas' },
    ],
    kunci: 'c',
    umpan_balik_benar: 'Benar! Kata "pertama" menunjukkan urutan pertama.',
    umpan_balik_salah: 'Perhatikan kata "pertama" dalam bacaan — itu menunjukkan apa yang dilakukan lebih dulu.',
  },
  {
    id: 'R02-LT-A2',
    family: 'FAM-A',
    phase: 'latihan',
    stimulus: 'Pak Rudi adalah seorang guru. Ia mengajar di SD Harapan. Murid-muridnya senang belajar bersama Pak Rudi.',
    soal: 'Di mana Pak Rudi mengajar?',
    opsi: [
      { id: 'a', teks: 'Di SD Harapan' },
      { id: 'b', teks: 'Di SMP Ceria' },
      { id: 'c', teks: 'Di rumahnya' },
    ],
    kunci: 'a',
    umpan_balik_benar: 'Tepat! Kalimat kedua menyebutkan nama sekolah tempat Pak Rudi mengajar.',
    umpan_balik_salah: 'Baca kembali kalimat kedua. Nama sekolahnya disebutkan di sana.',
  },

  // ═══════════════════════════════════════════
  // LATIHAN MANDIRI — tanpa bantuan (3 soal, evidence-bearing)
  // ═══════════════════════════════════════════
  {
    id: 'R02-LM-A1',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    stimulus: 'Rina dan ayahnya pergi memancing di sungai. Mereka membawa ember kecil. Rina berhasil menangkap dua ekor ikan.',
    soal: 'Ke mana Rina dan ayahnya pergi?',
    opsi: [
      { id: 'a', teks: 'Ke pantai' },
      { id: 'b', teks: 'Ke danau' },
      { id: 'c', teks: 'Ke sungai' },
    ],
    kunci: 'c',
  },
  {
    id: 'R02-LM-B1',
    family: 'FAM-B',
    phase: 'latihan_mandiri',
    stimulus: 'Tono menanam biji kacang. Mula-mula ia menggali lubang kecil. Kemudian ia memasukkan biji ke dalam lubang. Terakhir, ia menyiram tanah dengan air.',
    soal: 'Apa yang dilakukan Tono setelah memasukkan biji?',
    opsi: [
      { id: 'a', teks: 'Menggali lubang kecil' },
      { id: 'b', teks: 'Menyiram tanah dengan air' },
      { id: 'c', teks: 'Mengambil biji kacang baru' },
    ],
    kunci: 'b',
  },
  {
    id: 'R02-LM-A2',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    stimulus: 'Nenek tinggal di desa. Setiap pagi, nenek memberi makan ayam. Ayam nenek ada sepuluh ekor.',
    soal: 'Berapa ekor ayam nenek?',
    opsi: [
      { id: 'a', teks: 'Lima ekor' },
      { id: 'b', teks: 'Dua belas ekor' },
      { id: 'c', teks: 'Sepuluh ekor' },
    ],
    kunci: 'c',
  },

  // ═══════════════════════════════════════════
  // CEK ULANG — bahan baru, tuntutan sepadan (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R02-CU-A1',
    family: 'FAM-A',
    phase: 'cek_ulang',
    stimulus: 'Nuri suka membaca buku. Ia meminjam buku dari perpustakaan sekolah. Buku yang ia pinjam berjudul "Petualangan Kancil".',
    soal: 'Dari mana Nuri meminjam buku?',
    opsi: [
      { id: 'a', teks: 'Dari toko buku' },
      { id: 'b', teks: 'Dari perpustakaan sekolah' },
      { id: 'c', teks: 'Dari rumah temannya' },
    ],
    kunci: 'b',
  },
  {
    id: 'R02-CU-B1',
    family: 'FAM-B',
    phase: 'cek_ulang',
    stimulus: 'Sebelum tidur, Rafi selalu sikat gigi. Setelah itu, ia berdoa. Kemudian ia berbaring di kasur.',
    soal: 'Apa yang dilakukan Rafi setelah sikat gigi?',
    opsi: [
      { id: 'a', teks: 'Berbaring di kasur' },
      { id: 'b', teks: 'Berdoa' },
      { id: 'c', teks: 'Minum susu' },
    ],
    kunci: 'b',
  },
  {
    id: 'R02-CU-A2',
    family: 'FAM-A',
    phase: 'cek_ulang',
    stimulus: 'Desa Sukamaju terkenal dengan kebun jeruknya. Petani di sana menjual jeruk ke pasar setiap minggu.',
    soal: 'Terkenal dengan apa desa Sukamaju?',
    opsi: [
      { id: 'a', teks: 'Kebun pisang' },
      { id: 'b', teks: 'Tambak ikan' },
      { id: 'c', teks: 'Kebun jeruk' },
    ],
    kunci: 'c',
  },
];

export const PHASE_ORDER = ['cek_awal', 'latihan', 'latihan_mandiri', 'cek_ulang'];

export function getItemsByPhase(phase) {
  return ITEMS.filter(i => i.phase === phase);
}

export function getFamiliesInPhase(phase) {
  const items = getItemsByPhase(phase);
  return [...new Set(items.map(i => i.family))];
}
