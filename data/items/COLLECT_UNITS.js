/**
 * Stub item bank untuk unit-unit berbasis COLLECT
 * R01, S01-S08, W01-W03
 *
 * Setiap unit hanya mengumpulkan bukti — tidak ada penilaian otomatis.
 * Struktur per unit: satu atau beberapa task dengan instruksi dan media.
 */

// ─────────────────────────────────────────────────────
// BI-A-R01 — Membaca kata sederhana dengan suara
// ─────────────────────────────────────────────────────
export const R01_TASKS = [
  {
    id: 'R01-CA-1',
    phase: 'cek_awal',
    instruksi: 'Baca kata-kata ini dengan suara nyaring. Tekan tombol rekam, lalu baca satu per satu.',
    kata: ['buku', 'meja', 'pintu', 'kursi', 'jalan', 'malam', 'bulan', 'sekolah', 'bermain', 'membaca'],
    catatan_batas: 'Rekaman dikumpulkan. Penilaian kefasihan tidak dapat dilakukan otomatis.',
  },
  {
    id: 'R01-CU-1',
    phase: 'cek_ulang',
    instruksi: 'Baca kata-kata baru ini dengan suara nyaring.',
    kata: ['pohon', 'sungai', 'hujan', 'angin', 'lumpur', 'kucing', 'burung', 'terbang', 'berlari', 'melompat'],
    catatan_batas: 'Bahan berbeda dari cek awal. Rekaman dikumpulkan.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-S01 — Mengajukan pertanyaan lisan
// ─────────────────────────────────────────────────────
export const S01_TASKS = [
  {
    id: 'S01-CA-1',
    phase: 'cek_awal',
    instruksi: 'Lihat gambar ini. Ajukan satu pertanyaan tentang gambar kepada orang lain di dekatmu.',
    stimulus_emoji: '🐶🎾',
    stimulus_label: 'Seekor anjing bermain bola di taman',
    catatan_batas: 'Relevansi dan kesantunan pertanyaan tidak dapat dinilai otomatis.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-S02 — Menjawab pertanyaan secara lisan
// ─────────────────────────────────────────────────────
export const S02_TASKS = [
  {
    id: 'S02-CA-1',
    phase: 'cek_awal',
    instruksi: 'Dengarkan pertanyaan ini, lalu jawab dengan suara nyaring.',
    audio_script: 'Apa yang kamu lakukan setelah pulang sekolah?',
    audio_label: 'Pertanyaan untuk dijawab',
    catatan_batas: 'Isi jawaban tidak dapat dinilai otomatis.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-S03 — Menanggapi komentar secara lisan
// ─────────────────────────────────────────────────────
export const S03_TASKS = [
  {
    id: 'S03-CA-1',
    phase: 'cek_awal',
    instruksi: 'Dengarkan komentar ini, lalu tanggapi dengan santun.',
    audio_script: 'Kamu pintar sekali menggambar! Gambarmu sangat bagus.',
    audio_label: 'Komentar untuk ditanggapi',
    catatan_batas: 'Kesantunan tidak dapat dinilai otomatis.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-S04 — Mengungkapkan perasaan secara lisan
// ─────────────────────────────────────────────────────
export const S04_TASKS = [
  {
    id: 'S04-CA-1',
    phase: 'cek_awal',
    instruksi: 'Lihat gambar ini. Ungkapkan perasaanmu tentang situasi dalam gambar.',
    stimulus_emoji: '🎂🎉',
    stimulus_label: 'Pesta ulang tahun yang meriah',
    catatan_batas: 'Kesesuaian perasaan tidak dapat dinilai otomatis.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-S05 — Mengungkapkan gagasan secara lisan
// ─────────────────────────────────────────────────────
export const S05_TASKS = [
  {
    id: 'S05-CA-1',
    phase: 'cek_awal',
    instruksi: 'Ungkapkan gagasanmu: apa yang ingin kamu lakukan jika libur sekolah?',
    catatan_batas: 'Kejelasan gagasan tidak dapat dinilai otomatis.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-S06 — Menceritakan kembali bacaan
// ─────────────────────────────────────────────────────
export const S06_TASKS = [
  {
    id: 'S06-CA-1',
    phase: 'cek_awal',
    instruksi: 'Baca cerita ini, lalu ceritakan kembali isinya dengan kata-katamu sendiri.',
    stimulus_teks: 'Soni dan adiknya pergi ke pantai. Mereka bermain pasir dan berenang. Soni menemukan kerang yang indah. Ia membawa kerang itu pulang untuk ibunya.',
    catatan_batas: 'Kelengkapan retelling tidak dapat dinilai otomatis.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-S07 — Menceritakan kembali rangkaian visual
// ─────────────────────────────────────────────────────
export const S07_TASKS = [
  {
    id: 'S07-CA-1',
    phase: 'cek_awal',
    instruksi: 'Lihat rangkaian gambar ini. Ceritakan apa yang terjadi dari gambar pertama sampai terakhir.',
    panels: [
      { emoji: '☁️🌧️', deskripsi: 'Mendung dan hujan' },
      { emoji: '🌈', deskripsi: 'Pelangi setelah hujan' },
      { emoji: '👧😊', deskripsi: 'Anak senang melihat pelangi' },
    ],
    catatan_batas: 'Akurasi retelling tidak dapat dinilai otomatis.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-S08 — Menceritakan kembali cerita yang didengar
// ─────────────────────────────────────────────────────
export const S08_TASKS = [
  {
    id: 'S08-CA-1',
    phase: 'cek_awal',
    instruksi: 'Dengarkan cerita ini. Setelah selesai, ceritakan kembali dengan kata-katamu sendiri.',
    audio_script: 'Eko menemukan anak kucing di depan rumahnya. Anak kucing itu sangat kecil dan lapar. Eko memberinya susu. Sejak itu, kucing kecil itu selalu ikut Eko ke mana-mana.',
    audio_label: 'Cerita: Eko dan Kucing Kecil',
    catatan_batas: 'Audio harus terputar. Akurasi retelling tidak dapat dinilai otomatis.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-W01 — Menulis permulaan
// ─────────────────────────────────────────────────────
export const W01_TASKS = [
  {
    id: 'W01-CA-1',
    phase: 'cek_awal',
    instruksi: 'Tulis kata-kata berikut ini menggunakan tangan di kertas. Minta orang tua memotret hasilnya.',
    kata_target: ['mama', 'buku', 'meja', 'sekolah', 'bermain'],
    catatan_batas: 'Sistem hanya menyimpan foto. Bentuk huruf tidak dapat dinilai otomatis.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-W02 — Mengumpulkan contoh tulisan tangan
// ─────────────────────────────────────────────────────
export const W02_TASKS = [
  {
    id: 'W02-CA-1',
    phase: 'cek_awal',
    instruksi: 'Minta orang tua memotret contoh tulisan tangan anaknya (buku latihan atau kertas). Unggah fotonya di sini.',
    catatan_batas: 'Sistem menyimpan file foto. Tidak ada penilaian otomatis.',
  },
];

// ─────────────────────────────────────────────────────
// BI-A-W03 — Menulis teks sederhana dalam beberapa kalimat
// ─────────────────────────────────────────────────────
export const W03_TASKS = [
  {
    id: 'W03-CA-1',
    phase: 'cek_awal',
    instruksi: 'Tulis 2 sampai 3 kalimat tentang hari ini atau kegiatanmu.',
    min_panjang: 20,
    catatan_batas: 'Sistem memeriksa: teks tidak kosong dan panjang minimal terpenuhi. Ejaan dan isi tidak dapat dinilai otomatis.',
  },
];
