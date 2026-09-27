/**
 * Item bank untuk BI-A-L01 — Informasi dalam percakapan yang didengar
 * Evidence mode: AUDIO_GATED
 *
 * Setiap item memiliki sumber audio (teks skrip yang akan di-TTS atau file audio).
 * Audio HARUS diputar sebelum soal terbuka.
 * Jika audio gagal diputar, sesi dihentikan dengan status TUGAS_GAGAL_BERJALAN.
 *
 * Di MVP ini, audio direpresentasikan oleh teks skrip yang dibacakan browser
 * menggunakan Web Speech API (speechSynthesis). Jika tidak tersedia, status
 * menjadi TUGAS_GAGAL_BERJALAN.
 *
 * Family:
 *   FAM-A: informasi tersurat dalam percakapan (siapa, apa, di mana)
 *   FAM-B: inti atau topik percakapan
 */

export const UNIT_ID = 'BI-A-L01';

export const ITEMS = [

  // ═══════════════════════════════════════════
  // CEK AWAL (2 soal)
  // ═══════════════════════════════════════════
  {
    id: 'L01-CA-A1',
    family: 'FAM-A',
    phase: 'cek_awal',
    audio_script: 'Ibu: Nak, sudah makan siang belum? Anak: Sudah Bu, tadi makan nasi goreng. Ibu: Bagus. Jangan lupa minum air putih ya.',
    audio_label: 'Percakapan ibu dan anak',
    soal: 'Apa yang dimakan anak untuk makan siang?',
    opsi: [
      { id: 'a', teks: 'Mie goreng' },
      { id: 'b', teks: 'Nasi goreng' },
      { id: 'c', teks: 'Nasi putih' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan percakapan ini dengan baik. Soal akan muncul setelah rekaman selesai.',
  },
  {
    id: 'L01-CA-B1',
    family: 'FAM-B',
    phase: 'cek_awal',
    audio_script: 'Tono: Kak, nanti sore kita main sepak bola ya! Kakak: Oke, tapi habis belajar dulu. Tono: Baik Kak, aku akan belajar dulu.',
    audio_label: 'Percakapan Tono dan kakak',
    soal: 'Apa yang akan dilakukan Tono dan kakak setelah belajar?',
    opsi: [
      { id: 'a', teks: 'Menonton TV' },
      { id: 'b', teks: 'Main sepak bola' },
      { id: 'c', teks: 'Tidur siang' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan percakapan ini dengan baik. Soal akan muncul setelah rekaman selesai.',
  },

  // ═══════════════════════════════════════════
  // LATIHAN TERPANDU (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'L01-LT-A1',
    family: 'FAM-A',
    phase: 'latihan',
    audio_script: 'Guru: Anak-anak, besok ada ulangan Matematika. Murid: Pak, ulangan jam berapa? Guru: Jam delapan pagi, sesudah upacara.',
    audio_label: 'Percakapan guru dan murid',
    soal: 'Jam berapa ulangan Matematika akan diadakan?',
    opsi: [
      { id: 'a', teks: 'Jam tujuh pagi' },
      { id: 'b', teks: 'Jam sembilan pagi' },
      { id: 'c', teks: 'Jam delapan pagi' },
    ],
    kunci: 'c',
    umpan_balik_benar: 'Benar! Guru menyebutkan jam delapan pagi.',
    umpan_balik_salah: 'Coba dengar lagi. Guru menyebutkan waktu ulangan secara jelas.',
    instruksi_anak: 'Dengarkan percakapan ini dengan seksama.',
  },
  {
    id: 'L01-LT-A2',
    family: 'FAM-A',
    phase: 'latihan',
    audio_script: 'Rini: Ayah, aku mau ke rumah Sari. Ayah: Rumahnya di mana, Rin? Rini: Di Jalan Mawar nomor lima, dekat taman.',
    audio_label: 'Percakapan Rini dan ayah',
    soal: 'Di mana rumah Sari?',
    opsi: [
      { id: 'a', teks: 'Di Jalan Melati' },
      { id: 'b', teks: 'Di Jalan Mawar nomor lima' },
      { id: 'c', teks: 'Di depan sekolah' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Tepat! Rini menyebutkan alamat rumah Sari.',
    umpan_balik_salah: 'Dengarkan kembali percakapan Rini. Ia menyebutkan nama jalan dan nomornya.',
    instruksi_anak: 'Dengarkan percakapan ini dengan seksama.',
  },
  {
    id: 'L01-LT-B1',
    family: 'FAM-B',
    phase: 'latihan',
    audio_script: 'Budi: Kak, bukuku hilang. Kakak: Dicari dulu di meja belajarmu. Budi: Sudah, tidak ada. Kakak: Coba lihat di dalam tas.',
    audio_label: 'Percakapan Budi dan kakak',
    soal: 'Tentang apa percakapan Budi dan kakak?',
    opsi: [
      { id: 'a', teks: 'Tentang PR yang belum dikerjakan' },
      { id: 'b', teks: 'Tentang buku yang hilang' },
      { id: 'c', teks: 'Tentang tas yang robek' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Betul! Mereka membicarakan buku Budi yang hilang.',
    umpan_balik_salah: 'Simak kembali. Masalah apa yang dibicarakan Budi kepada kakaknya?',
    instruksi_anak: 'Dengarkan percakapan ini dengan seksama.',
  },

  // ═══════════════════════════════════════════
  // LATIHAN MANDIRI (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'L01-LM-A1',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    audio_script: 'Penjual: Mau beli apa, Dik? Anak: Mau beli es krim satu. Penjual: Rasanya mau cokelat atau vanila? Anak: Cokelat saja, Bang.',
    audio_label: 'Percakapan di warung es krim',
    soal: 'Rasa es krim apa yang dibeli anak?',
    opsi: [
      { id: 'a', teks: 'Vanila' },
      { id: 'b', teks: 'Stroberi' },
      { id: 'c', teks: 'Cokelat' },
    ],
    kunci: 'c',
    instruksi_anak: 'Dengarkan percakapan ini dengan seksama.',
  },
  {
    id: 'L01-LM-A2',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    audio_script: 'Mama: Lani, kamu mau ikut ke mana tadi? Lani: Ke perpustakaan, Ma. Mama: Mau meminjam buku apa? Lani: Buku cerita bergambar.',
    audio_label: 'Percakapan Lani dan mama',
    soal: 'Ke mana Lani pergi?',
    opsi: [
      { id: 'a', teks: 'Ke toko buku' },
      { id: 'b', teks: 'Ke perpustakaan' },
      { id: 'c', teks: 'Ke sekolah' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan percakapan ini dengan seksama.',
  },
  {
    id: 'L01-LM-B1',
    family: 'FAM-B',
    phase: 'latihan_mandiri',
    audio_script: 'Sinta: Nanti kita piknik di mana, Bu? Ibu: Di taman kota. Sinta: Kita bawa apa saja? Ibu: Tikar, nasi, dan minuman.',
    audio_label: 'Percakapan Sinta dan ibu',
    soal: 'Apa yang sedang dibicarakan Sinta dan ibunya?',
    opsi: [
      { id: 'a', teks: 'Rencana piknik' },
      { id: 'b', teks: 'Tugas sekolah' },
      { id: 'c', teks: 'Belanja di pasar' },
    ],
    kunci: 'a',
    instruksi_anak: 'Dengarkan percakapan ini dengan seksama.',
  },

  // ═══════════════════════════════════════════
  // CEK ULANG — skrip baru (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'L01-CU-A1',
    family: 'FAM-A',
    phase: 'cek_ulang',
    audio_script: 'Nenek: Cucuku, ini ada oleh-oleh dari kampung. Cucu: Apa ini, Nek? Nenek: Dodol dan kerupuk. Cucu: Wah, terima kasih Nenek!',
    audio_label: 'Percakapan nenek dan cucu',
    soal: 'Apa oleh-oleh yang dibawa nenek?',
    opsi: [
      { id: 'a', teks: 'Kue dan permen' },
      { id: 'b', teks: 'Dodol dan kerupuk' },
      { id: 'c', teks: 'Baju dan sandal' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan percakapan ini dengan seksama.',
  },
  {
    id: 'L01-CU-A2',
    family: 'FAM-A',
    phase: 'cek_ulang',
    audio_script: 'Dokter: Kamu sakit apa, Nak? Pasien: Pusing dan demam, Dok. Dokter: Sudah berapa hari? Pasien: Dua hari.',
    audio_label: 'Percakapan dokter dan pasien',
    soal: 'Sudah berapa hari pasien sakit?',
    opsi: [
      { id: 'a', teks: 'Satu hari' },
      { id: 'b', teks: 'Tiga hari' },
      { id: 'c', teks: 'Dua hari' },
    ],
    kunci: 'c',
    instruksi_anak: 'Dengarkan percakapan ini dengan seksama.',
  },
  {
    id: 'L01-CU-B1',
    family: 'FAM-B',
    phase: 'cek_ulang',
    audio_script: 'Pak RT: Besok Minggu ada kerja bakti di kampung kita. Warga: Dimulai jam berapa, Pak? Pak RT: Jam tujuh pagi, jangan lupa membawa sapu.',
    audio_label: 'Percakapan Pak RT dan warga',
    soal: 'Apa yang sedang dibicarakan Pak RT dan warga?',
    opsi: [
      { id: 'a', teks: 'Rencana kerja bakti' },
      { id: 'b', teks: 'Lomba 17 Agustus' },
      { id: 'c', teks: 'Kunjungan ke puskesmas' },
    ],
    kunci: 'a',
    instruksi_anak: 'Dengarkan percakapan ini dengan seksama.',
  },
];

export function getItemsByPhase(phase) {
  return ITEMS.filter(i => i.phase === phase);
}
