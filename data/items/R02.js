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
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'rendah',
    cara_penyajian: 'teks_dibaca',
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
    kompetensi_id: 'urutan_kejadian_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'rendah',
    cara_penyajian: 'teks_dibaca',
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
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'rendah',
    cara_penyajian: 'teks_dibaca',
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
    kompetensi_id: 'urutan_kejadian_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'rendah',
    cara_penyajian: 'teks_dibaca',
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
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'rendah',
    cara_penyajian: 'teks_dibaca',
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
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
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
    kompetensi_id: 'urutan_kejadian_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
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
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
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
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
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
    kompetensi_id: 'urutan_kejadian_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
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
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 1,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
    stimulus: 'Desa Sukamaju terkenal dengan kebun jeruknya. Petani di sana menjual jeruk ke pasar setiap minggu.',
    soal: 'Terkenal dengan apa desa Sukamaju?',
    opsi: [
      { id: 'a', teks: 'Kebun pisang' },
      { id: 'b', teks: 'Tambak ikan' },
      { id: 'c', teks: 'Kebun jeruk' },
    ],
    kunci: 'c',
  },

  // ═══════════════════════════════════════════
  // KELAS 2 — CEK AWAL (2 soal)
  // Teks lebih panjang (5–6 kalimat); pertanyaan meliputi FAM-A dan FAM-C.
  // ═══════════════════════════════════════════
  {
    id: 'R02-CA-A2',
    family: 'FAM-A',
    phase: 'cek_awal',
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 2,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
    stimulus: 'Pak Hasan adalah seorang peternak sapi di desa. Setiap pagi ia memberi makan sapi-sapinya dengan rumput segar. Ia juga memandikan sapinya dua kali seminggu. Hasil susu sapinya dijual ke koperasi desa. Uang itu dipakai untuk biaya sekolah anak-anaknya.',
    soal: 'Apa yang dilakukan Pak Hasan dengan uang hasil penjualan susu sapi?',
    opsi: [
      { id: 'a', teks: 'Membeli sapi baru' },
      { id: 'b', teks: 'Membiayai sekolah anak-anaknya' },
      { id: 'c', teks: 'Memperluas kandang sapi' },
    ],
    kunci: 'b',
  },
  {
    id: 'R02-CA-C1',
    family: 'FAM-C',
    phase: 'cek_awal',
    kompetensi_id: 'tujuan_teks',
    kelas_soal: 2,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
    stimulus: 'Cuci tangan sebelum makan adalah kebiasaan yang baik. Kuman di tangan bisa berpindah ke makanan. Jika kuman masuk ke perut, kita bisa sakit. Gunakan sabun dan air mengalir untuk cuci tangan. Gosok tangan selama dua puluh detik agar bersih.',
    soal: 'Mengapa kita harus mencuci tangan sebelum makan?',
    opsi: [
      { id: 'a', teks: 'Supaya tangan tidak bau' },
      { id: 'b', teks: 'Supaya kuman di tangan tidak masuk ke makanan dan membuat sakit' },
      { id: 'c', teks: 'Supaya makanan terasa lebih enak' },
    ],
    kunci: 'b',
  },

  // ═══════════════════════════════════════════
  // KELAS 2 — LATIHAN (2 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R02-LT-A4',
    family: 'FAM-A',
    phase: 'latihan',
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 2,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
    stimulus: 'Perpustakaan sekolah buka setiap hari Senin sampai Jumat. Siswa boleh meminjam dua buku sekaligus. Buku harus dikembalikan dalam satu minggu. Jika terlambat, ada denda lima ratus rupiah per hari. Siswa juga boleh membaca di ruang baca yang nyaman.',
    soal: 'Berapa lama siswa boleh meminjam buku?',
    opsi: [
      { id: 'a', teks: 'Dua minggu' },
      { id: 'b', teks: 'Satu minggu' },
      { id: 'c', teks: 'Tiga hari' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Tepat! Teks menyebutkan buku harus dikembalikan dalam satu minggu.',
    umpan_balik_salah: 'Baca kembali kalimat ketiga. Di sana tertulis berapa lama waktu peminjaman.',
  },
  {
    id: 'R02-LT-C1',
    family: 'FAM-C',
    phase: 'latihan',
    kompetensi_id: 'tujuan_teks',
    kelas_soal: 2,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
    stimulus: 'Helm adalah pelindung kepala saat bersepeda atau naik motor. Ketika jatuh, helm mencegah kepala terluka parah. Tanpa helm, cedera kepala bisa sangat berbahaya. Oleh karena itu, selalu pakai helm setiap kali berkendara.',
    soal: 'Apa tujuan utama teks ini ditulis?',
    opsi: [
      { id: 'a', teks: 'Menjelaskan cara membuat helm yang bagus' },
      { id: 'b', teks: 'Mendorong pembaca untuk selalu memakai helm saat berkendara' },
      { id: 'c', teks: 'Menceritakan pengalaman jatuh dari sepeda' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Betul! Teks berisi alasan memakai helm dan mengajak pembaca untuk melakukannya.',
    umpan_balik_salah: 'Baca kembali kalimat terakhir. Kata "oleh karena itu" menunjukkan kesimpulan dan tujuan teks.',
  },

  // ═══════════════════════════════════════════
  // KELAS 2 — LATIHAN MANDIRI (2 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R02-LM-A4',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 2,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
    stimulus: 'Festival Budaya Nusantara diadakan setiap tahun di kota kami. Tahun ini, ada tiga puluh kelompok seni dari berbagai daerah. Mereka menampilkan tari, musik, dan pameran kerajinan. Pengunjung bisa mencoba membatik dan memainkan alat musik tradisional. Festival ini dibuka untuk umum dan tidak dipungut biaya masuk.',
    soal: 'Berapa kelompok seni yang tampil di Festival Budaya Nusantara tahun ini?',
    opsi: [
      { id: 'a', teks: 'Dua puluh kelompok' },
      { id: 'b', teks: 'Tiga puluh kelompok' },
      { id: 'c', teks: 'Lima belas kelompok' },
    ],
    kunci: 'b',
  },
  {
    id: 'R02-LM-C1',
    family: 'FAM-C',
    phase: 'latihan_mandiri',
    kompetensi_id: 'tujuan_teks',
    kelas_soal: 2,
    tingkat_kompleksitas: 'tinggi',
    cara_penyajian: 'teks_dibaca',
    stimulus: 'Anak-anak perlu tidur cukup setiap malam. Anak usia sekolah sebaiknya tidur sembilan sampai sebelas jam. Kurang tidur membuat anak sulit berkonsentrasi di kelas. Tidur cukup juga membantu tubuh tumbuh dan melawan penyakit. Matikan gadget setidaknya satu jam sebelum tidur agar tidur lebih nyenyak.',
    soal: 'Mengapa penulis menyebutkan cara mematikan gadget di akhir teks?',
    opsi: [
      { id: 'a', teks: 'Supaya anak tidak main gadget sama sekali' },
      { id: 'b', teks: 'Sebagai saran praktis agar anak bisa tidur lebih nyenyak' },
      { id: 'c', teks: 'Karena gadget merusak mata anak' },
    ],
    kunci: 'b',
  },

  // ═══════════════════════════════════════════
  // KELAS 2 — CEK ULANG (2 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R02-CU-A4',
    family: 'FAM-A',
    phase: 'cek_ulang',
    kompetensi_id: 'informasi_tersurat_bacaan',
    kelas_soal: 2,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
    stimulus: 'Koperasi siswa di sekolah Bima menjual alat tulis dan makanan ringan. Setiap kelas memiliki dua perwakilan pengurus koperasi. Keuntungan koperasi dipakai untuk membeli buku-buku baru bagi perpustakaan. Tahun ini koperasi berhasil menyumbang lima puluh buku cerita.',
    soal: 'Untuk apa keuntungan koperasi siswa digunakan?',
    opsi: [
      { id: 'a', teks: 'Untuk membeli seragam baru' },
      { id: 'b', teks: 'Untuk membeli buku-buku baru bagi perpustakaan' },
      { id: 'c', teks: 'Untuk biaya piknik kelas' },
    ],
    kunci: 'b',
  },
  {
    id: 'R02-CU-C1',
    family: 'FAM-C',
    phase: 'cek_ulang',
    kompetensi_id: 'tujuan_teks',
    kelas_soal: 2,
    tingkat_kompleksitas: 'sedang',
    cara_penyajian: 'teks_dibaca',
    stimulus: 'Sampah plastik sangat berbahaya bagi lingkungan. Plastik membutuhkan ratusan tahun untuk terurai. Hewan laut bisa mati karena menelan plastik. Kita bisa membantu dengan membawa tas belanja sendiri dan mengurangi penggunaan sedotan plastik. Setiap tindakan kecil kita punya dampak besar bagi bumi.',
    soal: 'Apa tujuan utama teks ini?',
    opsi: [
      { id: 'a', teks: 'Menjelaskan jenis-jenis sampah plastik' },
      { id: 'b', teks: 'Mengajak pembaca untuk mengurangi penggunaan plastik demi lingkungan' },
      { id: 'c', teks: 'Menceritakan hewan laut yang terancam punah' },
    ],
    kunci: 'b',
  },
];

export const PHASE_ORDER = ['cek_awal', 'latihan', 'latihan_mandiri', 'cek_ulang'];

export function getItemsByPhase(phase, kelas) {
  return ITEMS.filter(i =>
    i.phase === phase &&
    (kelas == null || Number(i.kelas_soal) === Number(kelas))
  );
}

export function getFamiliesInPhase(phase) {
  const items = getItemsByPhase(phase);
  return [...new Set(items.map(i => i.family))];
}
