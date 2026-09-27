/**
 * CP Bahasa Indonesia Fase A — Kelas 1
 * Sumber: KepKaBSKAP Nomor 046/H/KR/2025
 * Fase A berlaku kelas 1–2; bahan MVP ini memakai kompleksitas kelas 1.
 *
 * Struktur:
 *   FASE → ELEMEN → UNIT (kartu operasional) → PREREQUISITE CHAIN
 *
 * Unit adalah unit perjalanan operasional PLPS, bukan kutipan kompetensi
 * baru dari pemerintah. Unit dipetakan dari tuntutan CP, bukan menyalin
 * rumusan CP kata per kata.
 */

export const FASE = 'A';
export const MATA_PELAJARAN = 'Bahasa Indonesia';
export const TARGET_KELAS = 'Kelas 1 SD';

// ─────────────────────────────────────────────────────
// Elemen CP
// ─────────────────────────────────────────────────────
export const ELEMEN = {
  MENYIMAK: {
    id: 'L',
    label: 'Menyimak',
    asal_cp: 'Memahami informasi dari percakapan nonsastra aural; memahami pesan teks sastra aural.',
  },
  MEMBACA_MEMIRSA: {
    id: 'R',
    label: 'Membaca dan Memirsa',
    asal_cp: 'Membaca kata-kata sederhana dengan fasih; memahami isi bacaan dan tayangan yang dipirsa.',
  },
  BERBICARA: {
    id: 'S',
    label: 'Berbicara dan Mempresentasikan',
    asal_cp: 'Bertanya, menjawab, menanggapi komentar dengan santun; mengungkapkan perasaan dan gagasan; menceritakan kembali teks yang dibaca, dipirsa, atau didengar.',
  },
  MENULIS: {
    id: 'W',
    label: 'Menulis',
    asal_cp: 'Menulis permulaan; mengembangkan tulisan tangan; menulis berbagai tipe teks sederhana dalam beberapa kalimat.',
  },
};

// ─────────────────────────────────────────────────────
// Tipe bukti — menentukan apa yang dapat diputuskan sistem
// ─────────────────────────────────────────────────────
export const EVIDENCE_MODE = {
  AUTO:        'AUTO',        // sistem menilai otomatis
  AUDIO_GATED: 'AUDIO_GATED', // auto, tapi butuh audio terputar dulu
  COLLECT:     'COLLECT',     // sistem hanya mengumpulkan bukti, belum bisa menilai
};

// ─────────────────────────────────────────────────────
// Unit operasional
// ─────────────────────────────────────────────────────
export const UNITS = [

  // ── MENYIMAK ──────────────────────────────────────
  {
    id: 'BI-A-L01',
    elemen: 'MENYIMAK',
    label: 'Informasi dalam percakapan yang didengar',
    tuntutan: 'Anak mendengar rekaman percakapan pendek tanpa transkrip terlihat, lalu menjawab pertanyaan tentang siapa yang berbicara, apa yang dibicarakan, atau apa yang terjadi.',
    evidence_mode: EVIDENCE_MODE.AUDIO_GATED,
    catatan_batas: 'Penilaian hanya dapat dilakukan jika audio berhasil diputar dan anak mendengarnya sebelum soal terbuka. Jika audio gagal, sesi dihentikan tanpa skor.',
    prerequisite: [],
  },
  {
    id: 'BI-A-L02',
    elemen: 'MENYIMAK',
    label: 'Pesan cerita yang didengar',
    tuntutan: 'Anak mendengar rekaman cerita pendek, lalu menjawab pertanyaan tentang pesan atau isi cerita.',
    evidence_mode: EVIDENCE_MODE.AUDIO_GATED,
    catatan_batas: 'Sama dengan L01 — audio harus terputar sebelum soal dibuka.',
    prerequisite: ['BI-A-L01'],
  },

  // ── MEMBACA DAN MEMIRSA ────────────────────────────
  {
    id: 'BI-A-R01',
    elemen: 'MEMBACA_MEMIRSA',
    label: 'Membaca kata sederhana dengan suara',
    tuntutan: 'Anak membaca kata-kata sederhana (pola KV, KVK, KVKV) dengan suara nyaring. Rekaman suara dikumpulkan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Kefasihan tidak dapat diputuskan dari rekaman tanpa transkripsi atau penilaian manusia. Sistem hanya mengumpulkan bukti.',
    rubrik_orang_tua: 'Dengarkan rekaman. Apakah anak mengucapkan setiap kata dengan cukup jelas sehingga Anda bisa mengenalinya, meski belum sempurna?',
    prerequisite: [],
  },
  {
    id: 'BI-A-R02',
    elemen: 'MEMBACA_MEMIRSA',
    label: 'Memahami isi bacaan',
    tuntutan: 'Anak membaca teks pendek (3–5 kalimat) yang tampil di layar, lalu menjawab pertanyaan pilihan ganda tentang isi: siapa, apa, di mana, mengapa.',
    evidence_mode: EVIDENCE_MODE.AUTO,
    catatan_batas: 'Asumsi: anak dapat membaca sendiri. Jika anak belum bisa membaca, orang tua perlu mengetahui ini sebelum sesi dimulai. Hasil tidak dapat mewakili kemampuan baca anak yang belum lancar.',
    prerequisite: [],
    // R02 adalah unit paling bisa diotomasi penuh
  },
  {
    id: 'BI-A-R03',
    elemen: 'MEMBACA_MEMIRSA',
    label: 'Memahami peristiwa dalam rangkaian visual',
    tuntutan: 'Anak mengamati rangkaian gambar (3–4 panel), lalu menjawab pertanyaan pilihan ganda tentang urutan kejadian atau hubungan sebab-akibat dalam gambar.',
    evidence_mode: EVIDENCE_MODE.AUTO,
    catatan_batas: 'Gambar harus berhasil dimuat sebelum soal terbuka. Jika gambar gagal dimuat, sesi dihentikan.',
    prerequisite: [],
  },

  // ── BERBICARA DAN MEMPRESENTASIKAN ────────────────
  {
    id: 'BI-A-S01',
    elemen: 'BERBICARA',
    label: 'Mengajukan pertanyaan lisan',
    tuntutan: 'Anak mengajukan pertanyaan secara lisan berdasarkan stimulus (gambar atau situasi). Rekaman suara dikumpulkan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Kesantunan dan relevansi pertanyaan tidak dapat dinilai otomatis.',
    rubrik_orang_tua: 'Dengarkan rekaman. Apakah anak mengajukan pertanyaan yang berkaitan dengan gambar atau situasi yang diberikan?',
    prerequisite: [],
  },
  {
    id: 'BI-A-S02',
    elemen: 'BERBICARA',
    label: 'Menjawab pertanyaan secara lisan',
    tuntutan: 'Anak menjawab pertanyaan lisan yang dibacakan atau diputar. Rekaman suara dikumpulkan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Isi dan kejelasan jawaban tidak dapat dinilai otomatis.',
    rubrik_orang_tua: 'Dengarkan rekaman. Apakah anak menjawab dengan kalimat yang bisa dipahami dan berkaitan dengan pertanyaan?',
    prerequisite: [],
  },
  {
    id: 'BI-A-S03',
    elemen: 'BERBICARA',
    label: 'Menanggapi komentar secara lisan',
    tuntutan: 'Anak menanggapi komentar atau pendapat yang diputar atau dibacakan. Rekaman suara dikumpulkan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Kesantunan tidak dapat diputuskan dari transkripsi saja.',
    rubrik_orang_tua: 'Dengarkan rekaman. Apakah anak menanggapi dengan kalimat yang sopan dan relevan dengan komentar yang diberikan?',
    prerequisite: [],
  },
  {
    id: 'BI-A-S04',
    elemen: 'BERBICARA',
    label: 'Mengungkapkan perasaan secara lisan',
    tuntutan: 'Anak mengungkapkan perasaan terkait situasi atau gambar yang diberikan. Rekaman suara dikumpulkan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Kesesuaian perasaan dengan konteks tidak dapat diputuskan otomatis.',
    rubrik_orang_tua: 'Dengarkan rekaman. Apakah anak menyebutkan perasaan yang sesuai dengan situasi, menggunakan kata perasaan (senang, sedih, takut, dll)?',
    prerequisite: [],
  },
  {
    id: 'BI-A-S05',
    elemen: 'BERBICARA',
    label: 'Mengungkapkan gagasan secara lisan',
    tuntutan: 'Anak mengungkapkan gagasan atau pendapat terkait topik sederhana. Rekaman suara dikumpulkan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Kejelasan gagasan tidak dapat diputuskan otomatis.',
    rubrik_orang_tua: 'Dengarkan rekaman. Apakah anak menyampaikan pendapat atau gagasan yang berkaitan dengan topik, dalam kalimat yang bisa dipahami?',
    prerequisite: [],
  },
  {
    id: 'BI-A-S06',
    elemen: 'BERBICARA',
    label: 'Menceritakan kembali bacaan',
    tuntutan: 'Anak membaca teks pendek, kemudian menceritakan kembali isinya secara lisan. Rekaman suara dikumpulkan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Kelengkapan dan akurasi retelling tidak dapat dinilai otomatis.',
    rubrik_orang_tua: 'Dengarkan rekaman. Apakah anak menyebutkan setidaknya satu informasi utama dari bacaan (siapa, apa yang terjadi, atau di mana)?',
    prerequisite: ['BI-A-R02'],
  },
  {
    id: 'BI-A-S07',
    elemen: 'BERBICARA',
    label: 'Menceritakan kembali rangkaian visual',
    tuntutan: 'Anak mengamati rangkaian gambar, kemudian menceritakan peristiwanya secara lisan. Rekaman suara dikumpulkan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Kelengkapan retelling tidak dapat dinilai otomatis.',
    rubrik_orang_tua: 'Dengarkan rekaman. Apakah anak menceritakan urutan kejadian dalam gambar, setidaknya menyebut awal dan akhir cerita?',
    prerequisite: ['BI-A-R03'],
  },
  {
    id: 'BI-A-S08',
    elemen: 'BERBICARA',
    label: 'Menceritakan kembali cerita yang didengar',
    tuntutan: 'Anak mendengar cerita pendek yang diputar, kemudian menceritakan kembali isinya secara lisan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Audio harus berhasil terputar. Retelling tidak dapat dinilai otomatis.',
    rubrik_orang_tua: 'Dengarkan rekaman. Apakah anak menyebutkan setidaknya satu isi cerita yang baru didengar (tokoh, kejadian, atau pesan)?',
    prerequisite: ['BI-A-L02'],
  },

  // ── MENULIS ───────────────────────────────────────
  {
    id: 'BI-A-W01',
    elemen: 'MENULIS',
    label: 'Menulis permulaan',
    tuntutan: 'Anak menulis huruf, suku kata, atau kata sederhana di area teks. Teks atau foto tulisan dikumpulkan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Bentuk huruf tidak dapat dinilai dari teks digital. Perkembangan tulisan tangan memerlukan contoh pada waktu berbeda.',
    rubrik_orang_tua: 'Lihat hasil tulisan anak. Apakah semua huruf yang diminta ada dan bisa dibaca, meski bentuknya belum sempurna?',
    prerequisite: [],
  },
  {
    id: 'BI-A-W02',
    elemen: 'MENULIS',
    label: 'Mengumpulkan contoh tulisan tangan',
    tuntutan: 'Orang tua atau anak mengunggah foto tulisan tangan anak (kata atau kalimat pendek) sebagai bukti perkembangan.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Sistem hanya menyimpan file foto. Perbandingan antar waktu memerlukan review manusia.',
    rubrik_orang_tua: 'Lihat foto tulisan tangan. Apakah tulisan bisa dibaca, dan apakah ada kemajuan dari tulisan sebelumnya (jika ada)?',
    prerequisite: ['BI-A-W01'],
  },
  {
    id: 'BI-A-W03',
    elemen: 'MENULIS',
    label: 'Menulis teks sederhana dalam beberapa kalimat',
    tuntutan: 'Anak menulis 2–3 kalimat bertema bebas di area teks. Sistem memeriksa panjang minimal.',
    evidence_mode: EVIDENCE_MODE.COLLECT,
    catatan_batas: 'Ejaan, tanda baca, dan isi tidak dapat dinilai otomatis untuk kelas 1. Sistem hanya memeriksa keberadaan teks.',
    rubrik_orang_tua: 'Baca teks yang ditulis anak. Apakah terdapat minimal 2 kalimat yang bisa dipahami maksudnya, meski ejaan belum sempurna?',
    prerequisite: ['BI-A-W01'],
  },
];

// ─────────────────────────────────────────────────────
// Lookup helpers
// ─────────────────────────────────────────────────────
export const UNITS_BY_ID = Object.fromEntries(UNITS.map(u => [u.id, u]));

export function getPrerequisites(unitId) {
  return UNITS_BY_ID[unitId]?.prerequisite ?? [];
}

export function getUnitsByElemen(elemenKey) {
  return UNITS.filter(u => u.elemen === elemenKey);
}
