/**
 * Item bank untuk BI-A-L02 — Pesan cerita yang didengar
 * Evidence mode: AUDIO_GATED
 *
 * Berbeda dari L01 (percakapan), L02 menggunakan narasi cerita pendek.
 * Anak mendengar cerita, lalu menjawab tentang pesan atau isi cerita.
 *
 * Family:
 *   FAM-A: informasi tersurat dalam cerita
 *   FAM-B: pesan atau amanat cerita
 */

export const UNIT_ID = 'BI-A-L02';

export const ITEMS = [

  // ═══════════════════════════════════════════
  // CEK AWAL (2 soal)
  // ═══════════════════════════════════════════
  {
    id: 'L02-CA-A1',
    family: 'FAM-A',
    phase: 'cek_awal',
    audio_script: 'Ada seekor kancil yang sangat pintar. Suatu hari, kancil sangat lapar. Ia melihat kebun timun milik pak tani. Kancil masuk ke kebun itu dan memakan timun-timunnya.',
    audio_label: 'Cerita: Kancil dan Kebun Timun',
    soal: 'Apa yang ada di kebun pak tani?',
    opsi: [
      { id: 'a', teks: 'Semangka' },
      { id: 'b', teks: 'Timun' },
      { id: 'c', teks: 'Jagung' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik. Soal akan muncul setelah cerita selesai.',
  },
  {
    id: 'L02-CA-B1',
    family: 'FAM-B',
    phase: 'cek_awal',
    audio_script: 'Seekor semut rajin bekerja mengumpulkan makanan. Semut belalang malah bermain musik sepanjang hari. Ketika musim dingin tiba, semut punya banyak makanan, tapi belalang kelaparan.',
    audio_label: 'Cerita: Semut dan Belalang',
    soal: 'Pesan apa yang ada dalam cerita ini?',
    opsi: [
      { id: 'a', teks: 'Bermain musik adalah kegiatan yang baik' },
      { id: 'b', teks: 'Rajin bekerja lebih baik daripada bermalas-malasan' },
      { id: 'c', teks: 'Semut dan belalang adalah teman baik' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik. Soal akan muncul setelah cerita selesai.',
  },

  // ═══════════════════════════════════════════
  // LATIHAN TERPANDU (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'L02-LT-A1',
    family: 'FAM-A',
    phase: 'latihan',
    audio_script: 'Seorang anak bernama Tari suka sekali membaca buku. Setiap hari, ia membaca paling sedikit satu buku. Berkat kebiasaan itu, Tari menjadi murid yang pandai di kelas.',
    audio_label: 'Cerita: Tari yang Gemar Membaca',
    soal: 'Berapa buku yang dibaca Tari setiap hari?',
    opsi: [
      { id: 'a', teks: 'Paling sedikit dua buku' },
      { id: 'b', teks: 'Paling sedikit satu buku' },
      { id: 'c', teks: 'Paling sedikit tiga buku' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Benar! Cerita menyebutkan paling sedikit satu buku setiap hari.',
    umpan_balik_salah: 'Dengarkan lagi bagian tentang berapa buku yang dibaca Tari.',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
  {
    id: 'L02-LT-B1',
    family: 'FAM-B',
    phase: 'latihan',
    audio_script: 'Burung elang yang sombong selalu mengejek burung pipit yang kecil. Suatu hari, elang terjebak di jaring pemburu. Pipit yang baik hati menggigiti jaring itu dan membebaskan elang.',
    audio_label: 'Cerita: Elang dan Pipit',
    soal: 'Pesan apa yang ada dalam cerita ini?',
    opsi: [
      { id: 'a', teks: 'Burung pipit lebih kuat dari burung elang' },
      { id: 'b', teks: 'Kebaikan hati lebih berharga dari kesombongan' },
      { id: 'c', teks: 'Jangan pergi ke hutan' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Betul! Pipit yang rendah hati menyelamatkan elang yang sombong.',
    umpan_balik_salah: 'Pikirkan: siapa yang melakukan kebaikan dan apa akibatnya?',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
  {
    id: 'L02-LT-A2',
    family: 'FAM-A',
    phase: 'latihan',
    audio_script: 'Di sebuah desa tinggal seorang nenek yang baik hati. Setiap hari, nenek membuat kue untuk dibagikan ke anak-anak tetangga. Anak-anak sangat senang mendapat kue buatan nenek.',
    audio_label: 'Cerita: Nenek yang Baik Hati',
    soal: 'Kepada siapa nenek membagikan kuenya?',
    opsi: [
      { id: 'a', teks: 'Kepada pedagang di pasar' },
      { id: 'b', teks: 'Kepada anak-anak tetangga' },
      { id: 'c', teks: 'Kepada murid-murid sekolah' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Tepat! Nenek membagikan kue kepada anak-anak tetangga.',
    umpan_balik_salah: 'Dengar kembali. Kepada siapa nenek memberikan kue setiap hari?',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },

  // ═══════════════════════════════════════════
  // LATIHAN MANDIRI (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'L02-LM-A1',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    audio_script: 'Pak Budi adalah petani yang rajin. Setiap pagi, ia pergi ke sawah untuk menanam padi. Hasilnya, panen padi Pak Budi selalu melimpah.',
    audio_label: 'Cerita: Petani Rajin',
    soal: 'Apa yang ditanam Pak Budi di sawah?',
    opsi: [
      { id: 'a', teks: 'Jagung' },
      { id: 'b', teks: 'Padi' },
      { id: 'c', teks: 'Sayuran' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
  {
    id: 'L02-LM-B1',
    family: 'FAM-B',
    phase: 'latihan_mandiri',
    audio_script: 'Ada dua kakak beradik. Si kakak selalu berbagi makanannya. Si adik serakah dan tidak mau berbagi. Suatu hari, si adik tidak punya teman karena sikapnya yang buruk itu.',
    audio_label: 'Cerita: Kakak Beradik',
    soal: 'Pesan apa dari cerita ini?',
    opsi: [
      { id: 'a', teks: 'Berbagi membuat kita punya banyak teman' },
      { id: 'b', teks: 'Adik selalu lebih baik dari kakak' },
      { id: 'c', teks: 'Jangan makan terlalu banyak' },
    ],
    kunci: 'a',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
  {
    id: 'L02-LM-A2',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    audio_script: 'Seorang anak perempuan bernama Maya menemukan dompet berisi uang di jalan. Maya membawa dompet itu ke kantor polisi terdekat.',
    audio_label: 'Cerita: Maya yang Jujur',
    soal: 'Ke mana Maya membawa dompet yang ditemukannya?',
    opsi: [
      { id: 'a', teks: 'Ke sekolah' },
      { id: 'b', teks: 'Ke kantor polisi' },
      { id: 'c', teks: 'Ke rumahnya' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },

  // ═══════════════════════════════════════════
  // CEK ULANG — cerita baru (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'L02-CU-A1',
    family: 'FAM-A',
    phase: 'cek_ulang',
    audio_script: 'Di sebuah kolam tinggal seekor katak kecil berwarna hijau. Ia suka melompat-lompat di pinggir kolam. Suatu hari, katak itu berhasil melompat sangat jauh dan mendapat hadiah dari teman-temannya.',
    audio_label: 'Cerita: Katak Kecil',
    soal: 'Apa warna katak dalam cerita?',
    opsi: [
      { id: 'a', teks: 'Kuning' },
      { id: 'b', teks: 'Hijau' },
      { id: 'c', teks: 'Biru' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
  {
    id: 'L02-CU-B1',
    family: 'FAM-B',
    phase: 'cek_ulang',
    audio_script: 'Seekor kura-kura dan kelinci berlomba. Kelinci berlari cepat, lalu berhenti untuk tidur. Kura-kura berjalan pelan tapi terus-menerus. Akhirnya kura-kura sampai ke garis akhir lebih dulu.',
    audio_label: 'Cerita: Kura-kura dan Kelinci',
    soal: 'Pesan apa dari cerita ini?',
    opsi: [
      { id: 'a', teks: 'Kelinci adalah hewan yang malas' },
      { id: 'b', teks: 'Tekun dan tidak mudah menyerah lebih baik dari sekadar cepat' },
      { id: 'c', teks: 'Kura-kura adalah hewan paling cepat' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
  {
    id: 'L02-CU-A2',
    family: 'FAM-A',
    phase: 'cek_ulang',
    audio_script: 'Rano suka menggambar. Ia membuat gambar bunga, pohon, dan kupu-kupu. Guru memuji gambar Rano dan menempelkannya di dinding kelas.',
    audio_label: 'Cerita: Gambar Rano',
    soal: 'Apa yang digambar Rano?',
    opsi: [
      { id: 'a', teks: 'Rumah, jalan, dan mobil' },
      { id: 'b', teks: 'Bunga, pohon, dan kupu-kupu' },
      { id: 'c', teks: 'Naga, singa, dan gajah' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
];

export function getItemsByPhase(phase) {
  return ITEMS.filter(i => i.phase === phase);
}
