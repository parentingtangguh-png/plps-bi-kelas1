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
    audio_script: 'Seekor lebah rajin mengumpulkan madu setiap hari. Seekor belalang malah bermain-main saja. Suatu hari, hujan deras turun berhari-hari dan bunga-bunga di ladang habis. Lebah masih punya banyak madu, tapi belalang kelaparan.',
    audio_label: 'Cerita: Lebah dan Belalang',
    soal: 'Apa yang terjadi pada belalang saat bunga-bunga di ladang habis?',
    opsi: [
      { id: 'a', teks: 'Belalang menemukan bunga baru di hutan' },
      { id: 'b', teks: 'Belalang kelaparan karena tidak punya simpanan' },
      { id: 'c', teks: 'Belalang meminta madu kepada lebah' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik. Soal akan muncul setelah cerita selesai.',
  },

  {
    id: 'L02-CA-A2',
    family: 'FAM-A',
    phase: 'cek_awal',
    audio_script: 'Ada seorang anak bernama Rafa yang suka bermain di luar. Suatu sore, Rafa bermain bola di halaman. Bola Rafa mengenai pot bunga ibu dan pot itu jatuh pecah.',
    audio_label: 'Cerita: Rafa dan Pot Bunga',
    soal: 'Apa yang dikenai bola Rafa?',
    opsi: [
      { id: 'a', teks: 'Jendela rumah' },
      { id: 'b', teks: 'Pot bunga ibu' },
      { id: 'c', teks: 'Pagar halaman' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik. Soal akan muncul setelah cerita selesai.',
  },
  {
    id: 'L02-CA-A3',
    family: 'FAM-A',
    phase: 'cek_awal',
    audio_script: 'Mia adalah anak yang rajin membantu orang tua. Setiap pagi sebelum sekolah, Mia menyapu lantai rumah. Ibunya sangat senang melihat Mia rajin membantu.',
    audio_label: 'Cerita: Mia yang Rajin',
    soal: 'Apa yang dilakukan Mia setiap pagi sebelum sekolah?',
    opsi: [
      { id: 'a', teks: 'Mencuci piring' },
      { id: 'b', teks: 'Menyiram tanaman' },
      { id: 'c', teks: 'Menyapu lantai' },
    ],
    kunci: 'c',
    instruksi_anak: 'Dengarkan cerita ini baik-baik. Soal akan muncul setelah cerita selesai.',
  },

  // ═══════════════════════════════════════════
  // LATIHAN TERPANDU (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'L02-LT-A1',
    family: 'FAM-A',
    phase: 'latihan',
    audio_script: 'Seorang anak bernama Tari suka sekali membaca buku. Setiap hari, ia membaca dua buku. Berkat kebiasaan itu, Tari menjadi murid yang pandai di kelas.',
    audio_label: 'Cerita: Tari yang Gemar Membaca',
    soal: 'Berapa buku yang dibaca Tari setiap hari?',
    opsi: [
      { id: 'a', teks: 'Tiga buku' },
      { id: 'b', teks: 'Dua buku' },
      { id: 'c', teks: 'Satu buku' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Benar! Cerita menyebutkan dua buku setiap hari.',
    umpan_balik_salah: 'Dengarkan lagi bagian tentang berapa buku yang dibaca Tari.',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
  {
    id: 'L02-LT-B1',
    family: 'FAM-B',
    phase: 'latihan',
    audio_script: 'Burung elang yang sombong selalu mengejek burung pipit yang kecil. Suatu hari, elang terjebak di jaring pemburu. Pipit yang baik hati menggigiti jaring itu dan membebaskan elang.',
    audio_label: 'Cerita: Elang dan Pipit',
    soal: 'Bagaimana elang bisa bebas dari jaring pemburu?',
    opsi: [
      { id: 'a', teks: 'Elang memotong jaring sendiri' },
      { id: 'b', teks: 'Pemburu melepaskan elang' },
      { id: 'c', teks: 'Pipit menggigiti jaring sampai elang bisa keluar' },
    ],
    kunci: 'c',
    umpan_balik_benar: 'Betul! Pipit menggigiti jaring sampai elang bisa keluar.',
    umpan_balik_salah: 'Dengarkan lagi. Apa yang dilakukan pipit ketika elang terjebak?',
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

  {
    id: 'L02-LT-B2',
    family: 'FAM-B',
    phase: 'latihan',
    audio_script: 'Seekor kucing lapar berkeliling kampung mencari makan. Ia melihat ikan di atas meja dapur. Ketika akan mengambilnya, pemilik rumah datang dan kucing itu lari ketakutan.',
    audio_label: 'Cerita: Kucing dan Ikan',
    soal: 'Mengapa kucing lari ketakutan?',
    opsi: [
      { id: 'a', teks: 'Karena ikan itu terlalu besar' },
      { id: 'b', teks: 'Karena pemilik rumah datang' },
      { id: 'c', teks: 'Karena kucing sudah kenyang' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Betul! Pemilik rumah datang sehingga kucing lari.',
    umpan_balik_salah: 'Dengarkan lagi. Apa yang terjadi ketika kucing akan mengambil ikan?',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
  {
    id: 'L02-LT-A3',
    family: 'FAM-A',
    phase: 'latihan',
    audio_script: 'Pak Guru membawa bola, tali, dan peluit ke lapangan. Anak-anak sangat senang karena hari ini ada olahraga. Mereka bermain sepak bola sampai bel berbunyi.',
    audio_label: 'Cerita: Olahraga di Sekolah',
    soal: 'Apa yang dibawa Pak Guru ke lapangan?',
    opsi: [
      { id: 'a', teks: 'Bola, tali, dan peluit' },
      { id: 'b', teks: 'Buku dan pensil' },
      { id: 'c', teks: 'Tas dan sepatu' },
    ],
    kunci: 'a',
    umpan_balik_benar: 'Tepat! Pak Guru membawa bola, tali, dan peluit.',
    umpan_balik_salah: 'Dengar kembali bagian awal cerita. Apa yang Pak Guru bawa?',
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
    soal: 'Mengapa adik tidak punya teman?',
    opsi: [
      { id: 'a', teks: 'Karena adik sering pindah rumah' },
      { id: 'b', teks: 'Karena adik tidak mau berbagi' },
      { id: 'c', teks: 'Karena adik sering sakit' },
    ],
    kunci: 'b',
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

  {
    id: 'L02-LM-B2',
    family: 'FAM-B',
    phase: 'latihan_mandiri',
    audio_script: 'Dua anak berlomba makan mangga. Anak pertama memakan mangganya dengan rakus dan terburu-buru. Anak kedua makan pelan-pelan dan menikmatinya. Anak pertama sakit perut setelahnya.',
    audio_label: 'Cerita: Lomba Makan Mangga',
    soal: 'Mengapa anak pertama sakit perut?',
    opsi: [
      { id: 'a', teks: 'Karena ia tidak suka mangga' },
      { id: 'b', teks: 'Karena ia makan terlalu rakus dan terburu-buru' },
      { id: 'c', teks: 'Karena mangganya belum matang' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
  {
    id: 'L02-LM-A3',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    audio_script: 'Kelinci putih menemukan wortel besar di ladang. Ia membawanya pulang untuk dimakan bersama keluarga. Di rumah, ada ibu, ayah, dan dua adiknya yang sudah menunggu.',
    audio_label: 'Cerita: Kelinci dan Wortel',
    soal: 'Apa yang ditemukan kelinci di ladang?',
    opsi: [
      { id: 'a', teks: 'Apel merah' },
      { id: 'b', teks: 'Wortel besar' },
      { id: 'c', teks: 'Jagung kuning' },
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
    soal: 'Mengapa kura-kura tiba di garis akhir lebih dulu dari kelinci?',
    opsi: [
      { id: 'a', teks: 'Karena kura-kura berlari lebih cepat dari kelinci' },
      { id: 'b', teks: 'Karena kelinci tidak mau ikut lomba' },
      { id: 'c', teks: 'Karena kura-kura terus berjalan sementara kelinci berhenti tidur' },
    ],
    kunci: 'c',
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
  {
    id: 'L02-CU-B2',
    family: 'FAM-B',
    phase: 'cek_ulang',
    audio_script: 'Monyet nakal selalu mencuri pisang milik gajah. Suatu hari, gajah berpura-pura pergi. Monyet mengambil pisang. Gajah kembali dan menyemprot monyet dengan air dari belalainya.',
    audio_label: 'Cerita: Monyet dan Gajah',
    soal: 'Mengapa gajah menyemprot monyet?',
    opsi: [
      { id: 'a', teks: 'Karena gajah sedang bermain air' },
      { id: 'b', teks: 'Karena monyet mencuri pisang gajah' },
      { id: 'c', teks: 'Karena monyet membantu gajah' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
  {
    id: 'L02-CU-A3',
    family: 'FAM-A',
    phase: 'cek_ulang',
    audio_script: 'Nisa baru pindah ke kota baru dan tidak punya teman. Di taman, ia bertemu anak bernama Sari. Sari mengajak Nisa bermain ayunan bersama.',
    audio_label: 'Cerita: Nisa dan Sari',
    soal: 'Di mana Nisa bertemu Sari?',
    opsi: [
      { id: 'a', teks: 'Di sekolah' },
      { id: 'b', teks: 'Di taman' },
      { id: 'c', teks: 'Di pasar' },
    ],
    kunci: 'b',
    instruksi_anak: 'Dengarkan cerita ini baik-baik.',
  },
];

export function getItemsByPhase(phase) {
  return ITEMS.filter(i => i.phase === phase);
}
