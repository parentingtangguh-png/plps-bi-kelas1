/**
 * Item bank untuk BI-A-R03 — Memahami peristiwa dalam rangkaian visual
 * Evidence mode: AUTO
 *
 * Family:
 *   FAM-A: urutan kejadian dalam rangkaian visual
 *   FAM-B: hubungan sebab-akibat dalam gambar
 *   FAM-C: inferensi sederhana dari rangkaian visual
 *
 * Panel gambar direpresentasikan sebagai deskripsi teks
 * (emoji + kalimat deskriptif). Di lingkungan produksi, ini
 * diganti gambar sungguhan.
 */

export const UNIT_ID = 'BI-A-R03';

export const ITEMS = [

  // ═══════════════════════════════════════════
  // CEK AWAL (2 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R03-CA-A1',
    family: 'FAM-A',
    phase: 'cek_awal',
    panels: [
      { emoji: '🌱', deskripsi: 'Biji kecil di dalam tanah' },
      { emoji: '🌿', deskripsi: 'Tanaman kecil mulai tumbuh' },
      { emoji: '🌳', deskripsi: 'Pohon besar dengan buah' },
    ],
    soal: 'Gambar mana yang paling cocok menunjukkan awal cerita?',
    opsi: [
      { id: 'a', teks: 'Pohon besar dengan buah' },
      { id: 'b', teks: 'Biji kecil di dalam tanah' },
      { id: 'c', teks: 'Tanaman kecil mulai tumbuh' },
    ],
    kunci: 'b',
  },
  {
    id: 'R03-CA-B1',
    family: 'FAM-B',
    phase: 'cek_awal',
    panels: [
      { emoji: '🌧️', deskripsi: 'Hujan lebat turun' },
      { emoji: '💧', deskripsi: 'Air menggenang di jalan' },
      { emoji: '👦🌂', deskripsi: 'Anak memakai jas hujan' },
    ],
    soal: 'Mengapa anak memakai jas hujan?',
    opsi: [
      { id: 'a', teks: 'Karena udara panas' },
      { id: 'b', teks: 'Karena sedang bermain layang-layang' },
      { id: 'c', teks: 'Karena hujan turun lebat' },
    ],
    kunci: 'c',
  },

  // ═══════════════════════════════════════════
  // LATIHAN TERPANDU (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R03-LT-A1',
    family: 'FAM-A',
    phase: 'latihan',
    panels: [
      { emoji: '🛒', deskripsi: 'Ibu membawa keranjang belanja kosong' },
      { emoji: '🍎🥦', deskripsi: 'Ibu memilih buah dan sayur' },
      { emoji: '🛒✅', deskripsi: 'Keranjang penuh, ibu membayar' },
    ],
    soal: 'Apa yang terjadi paling akhir?',
    opsi: [
      { id: 'a', teks: 'Ibu membawa keranjang kosong' },
      { id: 'b', teks: 'Ibu memilih buah dan sayur' },
      { id: 'c', teks: 'Ibu membayar belanjaan' },
    ],
    kunci: 'c',
    umpan_balik_benar: 'Betul! Membayar adalah langkah terakhir di gambar.',
    umpan_balik_salah: 'Perhatikan urutan gambar dari kiri ke kanan. Apa yang terjadi di gambar terakhir?',
  },
  {
    id: 'R03-LT-B1',
    family: 'FAM-B',
    phase: 'latihan',
    panels: [
      { emoji: '😴🍬', deskripsi: 'Anak tidak menyikat gigi sebelum tidur' },
      { emoji: '🦷😣', deskripsi: 'Gigi anak sakit' },
      { emoji: '👨‍⚕️', deskripsi: 'Anak pergi ke dokter gigi' },
    ],
    soal: 'Mengapa gigi anak sakit?',
    opsi: [
      { id: 'a', teks: 'Karena ia makan terlalu banyak' },
      { id: 'b', teks: 'Karena ia tidak menyikat gigi' },
      { id: 'c', teks: 'Karena ia jatuh' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Benar! Gambar pertama menunjukkan alasannya.',
    umpan_balik_salah: 'Lihat gambar pertama. Apa yang tidak dilakukan anak itu?',
  },
  {
    id: 'R03-LT-A2',
    family: 'FAM-A',
    phase: 'latihan',
    panels: [
      { emoji: '🖌️📄', deskripsi: 'Anak mengambil kuas dan kertas' },
      { emoji: '🎨', deskripsi: 'Anak mencelupkan kuas ke cat' },
      { emoji: '🖼️', deskripsi: 'Gambar indah sudah jadi' },
    ],
    soal: 'Apa yang dilakukan anak sebelum mencelupkan kuas ke cat?',
    opsi: [
      { id: 'a', teks: 'Menggantung gambar di dinding' },
      { id: 'b', teks: 'Mengambil kuas dan kertas' },
      { id: 'c', teks: 'Memperlihatkan gambar ke teman' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Tepat! Mengambil kuas dan kertas adalah langkah pertama.',
    umpan_balik_salah: 'Lihat gambar pertama — itu yang terjadi sebelum mencelupkan kuas.',
  },

  // ═══════════════════════════════════════════
  // LATIHAN MANDIRI (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R03-LM-A1',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    panels: [
      { emoji: '🌱💧', deskripsi: 'Menyiram bibit tanaman' },
      { emoji: '☀️🌱', deskripsi: 'Bibit mendapat sinar matahari' },
      { emoji: '🌸', deskripsi: 'Bunga mekar' },
    ],
    soal: 'Apa yang terjadi paling pertama?',
    opsi: [
      { id: 'a', teks: 'Bunga mekar' },
      { id: 'b', teks: 'Bibit mendapat sinar matahari' },
      { id: 'c', teks: 'Menyiram bibit tanaman' },
    ],
    kunci: 'c',
  },
  {
    id: 'R03-LM-B1',
    family: 'FAM-B',
    phase: 'latihan_mandiri',
    panels: [
      { emoji: '🐶💨', deskripsi: 'Anjing berlari memperlihatkan kaki kotor' },
      { emoji: '🐾👣', deskripsi: 'Jejak kotor di lantai bersih' },
      { emoji: '😟🧹', deskripsi: 'Ibu mengepel lantai dengan sedih' },
    ],
    soal: 'Mengapa lantai menjadi kotor?',
    opsi: [
      { id: 'a', teks: 'Karena ibu menumpahkan air' },
      { id: 'b', teks: 'Karena anjing berlari dengan kaki kotor' },
      { id: 'c', teks: 'Karena lantainya belum dipel' },
    ],
    kunci: 'b',
  },
  {
    id: 'R03-LM-A2',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    panels: [
      { emoji: '📦', deskripsi: 'Hadiah dalam kotak tertutup' },
      { emoji: '🎀✂️', deskripsi: 'Tali hadiah dibuka' },
      { emoji: '😊🎁', deskripsi: 'Anak senang melihat isi kotak' },
    ],
    soal: 'Apa yang terjadi setelah tali hadiah dibuka?',
    opsi: [
      { id: 'a', teks: 'Hadiah dimasukkan ke dalam kotak' },
      { id: 'b', teks: 'Anak senang melihat isi kotak' },
      { id: 'c', teks: 'Kotak hadiah diikat lagi' },
    ],
    kunci: 'b',
  },

  // ═══════════════════════════════════════════
  // CEK ULANG — bahan baru (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R03-CU-A1',
    family: 'FAM-A',
    phase: 'cek_ulang',
    panels: [
      { emoji: '🌄', deskripsi: 'Matahari terbit di pagi hari' },
      { emoji: '🌞🏫', deskripsi: 'Anak-anak berangkat ke sekolah' },
      { emoji: '📚✏️', deskripsi: 'Murid belajar di kelas' },
    ],
    soal: 'Apa yang terjadi setelah matahari terbit?',
    opsi: [
      { id: 'a', teks: 'Murid belajar di kelas' },
      { id: 'b', teks: 'Anak-anak berangkat ke sekolah' },
      { id: 'c', teks: 'Matahari terbenam' },
    ],
    kunci: 'b',
  },
  {
    id: 'R03-CU-B1',
    family: 'FAM-B',
    phase: 'cek_ulang',
    panels: [
      { emoji: '⚽👦', deskripsi: 'Anak menendang bola terlalu keras' },
      { emoji: '🪟💥', deskripsi: 'Kaca jendela pecah' },
      { emoji: '😰', deskripsi: 'Anak ketakutan' },
    ],
    soal: 'Mengapa kaca jendela pecah?',
    opsi: [
      { id: 'a', teks: 'Karena angin kencang' },
      { id: 'b', teks: 'Karena anak menendang bola terlalu keras' },
      { id: 'c', teks: 'Karena jendelanya sudah tua' },
    ],
    kunci: 'b',
  },
  {
    id: 'R03-CU-A2',
    family: 'FAM-A',
    phase: 'cek_ulang',
    panels: [
      { emoji: '🍚🥄', deskripsi: 'Nasi dan lauk tersaji di meja' },
      { emoji: '🙏', deskripsi: 'Keluarga berdoa sebelum makan' },
      { emoji: '😋', deskripsi: 'Keluarga makan bersama dengan senang' },
    ],
    soal: 'Apa yang dilakukan keluarga sebelum makan?',
    opsi: [
      { id: 'a', teks: 'Mencuci piring' },
      { id: 'b', teks: 'Memasak nasi' },
      { id: 'c', teks: 'Berdoa' },
    ],
    kunci: 'c',
  },
];

export function getItemsByPhase(phase) {
  return ITEMS.filter(i => i.phase === phase);
}

export function getFamiliesInPhase(phase) {
  const items = getItemsByPhase(phase);
  return [...new Set(items.map(i => i.family))];
}
