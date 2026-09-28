/**
 * Unit COLLECT — tiga fase per unit:
 *   cek_awal  : kumpulkan bukti awal → verdik orang tua (1)
 *   latihan   : latihan dengan panduan → lanjut ke cek ulang
 *   cek_ulang : bahan baru → verdik orang tua (2) → keputusan mastery
 *
 * Setiap task latihan punya dua panduan:
 *   panduan_penguatan  — untuk jalur verdik1=PERLU_LATIHAN (remedial, lebih terbimbing)
 *   panduan_pendalaman — untuk jalur verdik1=BISA (pengayaan, lebih menantang/mandiri)
 * app.js memilih panduan yang sesuai berdasarkan parentVerdict.
 *
 * Tipe task per unit:
 *   needsRecording = true → rekam suara (R01, S01–S08)
 *   needsPhoto     = true → foto (W01, W02)
 *   needsText      = true → ketik teks (W03)
 */

export const COLLECT_PHASES = {

  // ─────────────────────────────────────────────────────
  // BI-A-R01 — Membaca kata sederhana dengan suara
  // ─────────────────────────────────────────────────────
  'BI-A-R01': {
    cek_awal: [{
      id: 'R01-CA-1',
      instruksi: 'Baca kata-kata ini dengan suara nyaring. Tekan tombol rekam, lalu baca satu per satu.',
      kata: ['buku', 'meja', 'pintu', 'kursi', 'jalan', 'malam', 'bulan', 'sekolah'],
      needsRecording: true,
    }],
    latihan: [{
      id: 'R01-LAT-1',
      instruksi: 'Baca kata-kata ini sambil direkam.',
      panduan_penguatan:  '💡 Penguatan: Baca pelan, pisahkan suku kata dulu — "po-hon", "su-ngai" — baru gabungkan.',
      panduan_pendalaman: '💡 Pendalaman: Baca setiap kata secepat kamu bisa sambil tetap jelas. Coba tidak berhenti di tengah.',
      rubrik_orang_tua: {
        penguatan:  ['Apakah semua kata terdengar jelas dalam rekaman?', 'Apakah anak memisahkan suku kata terlebih dahulu sebelum menggabungkan?'],
        pendalaman: ['Apakah semua kata terbaca lancar tanpa jeda di tengah kata?', 'Apakah kecepatan membaca terlihat lebih baik dibanding cek awal?'],
      },
      kata: ['pohon', 'sungai', 'hujan', 'angin', 'kucing'],
      needsRecording: true,
    }],
    cek_ulang: [{
      id: 'R01-CU-1',
      instruksi: 'Baca kata-kata baru ini dengan suara nyaring, satu per satu.',
      kata: ['burung', 'terbang', 'berlari', 'melompat', 'bermain', 'tertawa', 'lumpur', 'bintang'],
      needsRecording: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-S01 — Mengajukan pertanyaan lisan
  // ─────────────────────────────────────────────────────
  'BI-A-S01': {
    cek_awal: [{
      id: 'S01-CA-1',
      instruksi: 'Lihat gambar ini. Ajukan satu pertanyaan tentang gambar dengan suara nyaring.',
      stimulus_emoji: '🐶🎾',
      stimulus_label: 'Seekor anjing bermain bola di taman',
      needsRecording: true,
    }],
    latihan: [{
      id: 'S01-LAT-1',
      instruksi: 'Lihat gambar ini. Coba ajukan pertanyaan tentang gambar.',
      panduan_penguatan:  '💡 Penguatan: Gunakan kata tanya: "Apa", "Di mana", "Mengapa", "Siapa", atau "Bagaimana".',
      panduan_pendalaman: '💡 Pendalaman: Ajukan dua pertanyaan berbeda tentang gambar ini. Gunakan kata tanya yang berbeda untuk tiap pertanyaan.',
      rubrik_orang_tua: {
        penguatan:  ['Apakah pertanyaan menggunakan kata tanya (apa, siapa, di mana, mengapa, bagaimana)?', 'Apakah pertanyaan berkaitan dengan gambar yang dilihat?'],
        pendalaman: ['Apakah anak mengajukan DUA pertanyaan dengan kata tanya yang berbeda?', 'Apakah kedua pertanyaan relevan dengan gambar yang dilihat?'],
      },
      stimulus_emoji: '🐱😴',
      stimulus_label: 'Seekor kucing tidur di atas bantal',
      needsRecording: true,
    }],
    cek_ulang: [{
      id: 'S01-CU-1',
      instruksi: 'Lihat gambar ini. Ajukan satu pertanyaan tentang gambar.',
      stimulus_emoji: '👧🍦',
      stimulus_label: 'Anak perempuan makan es krim di bawah pohon',
      needsRecording: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-S02 — Menjawab pertanyaan secara lisan
  // ─────────────────────────────────────────────────────
  'BI-A-S02': {
    cek_awal: [{
      id: 'S02-CA-1',
      instruksi: 'Dengarkan pertanyaan ini, lalu jawab dengan suara nyaring.',
      audio_script: 'Apa yang kamu lakukan setelah pulang sekolah?',
      audio_label: 'Pertanyaan untuk dijawab',
      needsRecording: true,
    }],
    latihan: [{
      id: 'S02-LAT-1',
      instruksi: 'Dengarkan pertanyaan ini, lalu jawab sambil direkam.',
      panduan_penguatan:  '💡 Penguatan: Jawab dengan kalimat penuh, bukan hanya satu kata. Contoh: "Saya suka makan nasi goreng."',
      panduan_pendalaman: '💡 Pendalaman: Jawab dengan kalimat lengkap, lalu tambahkan alasan mengapa. Contoh: "Saya suka nasi goreng karena rasanya enak."',
      rubrik_orang_tua: {
        penguatan:  ['Apakah jawaban sesuai dengan pertanyaan yang diajukan?', 'Apakah anak menjawab dengan kalimat lengkap (bukan hanya satu kata)?'],
        pendalaman: ['Apakah anak menjawab dengan kalimat lengkap disertai alasan?', 'Apakah alasan yang diberikan masuk akal dan berkaitan?'],
      },
      audio_script: 'Makanan apa yang paling kamu suka?',
      audio_label: 'Pertanyaan untuk dijawab',
      needsRecording: true,
    }],
    cek_ulang: [{
      id: 'S02-CU-1',
      instruksi: 'Dengarkan pertanyaan ini, lalu jawab dengan suara nyaring.',
      audio_script: 'Siapa teman baikmu di sekolah dan mengapa kamu menyukainya?',
      audio_label: 'Pertanyaan untuk dijawab',
      needsRecording: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-S03 — Menanggapi komentar secara lisan
  // ─────────────────────────────────────────────────────
  'BI-A-S03': {
    cek_awal: [{
      id: 'S03-CA-1',
      instruksi: 'Dengarkan komentar ini, lalu tanggapi dengan santun.',
      audio_script: 'Kamu pintar sekali menggambar! Gambarmu sangat bagus.',
      audio_label: 'Komentar untuk ditanggapi',
      needsRecording: true,
    }],
    latihan: [{
      id: 'S03-LAT-1',
      instruksi: 'Dengarkan komentar ini, lalu tanggapi sambil direkam.',
      panduan_penguatan:  '💡 Penguatan: Mulai dengan "Terima kasih" atau "Iya, benar". Lalu tambahkan satu kalimat tanggapan.',
      panduan_pendalaman: '💡 Pendalaman: Tanggapi dengan santun, lalu ajukan satu pertanyaan kembali untuk melanjutkan percakapan.',
      rubrik_orang_tua: {
        penguatan:  ['Apakah tanggapan anak sopan dan tidak menyinggung?', 'Apakah anak merespons isi komentar (bukan asal bicara)?'],
        pendalaman: ['Apakah anak menanggapi dengan sopan dan mengajukan pertanyaan balik?', 'Apakah pertanyaan balik relevan dengan topik yang dibahas?'],
      },
      audio_script: 'Wah, kamu sangat rajin belajar! Nilaimu pasti bagus.',
      audio_label: 'Komentar untuk ditanggapi',
      needsRecording: true,
    }],
    cek_ulang: [{
      id: 'S03-CU-1',
      instruksi: 'Dengarkan komentar ini, lalu tanggapi dengan santun.',
      audio_script: 'Sepertinya kamu sedang sedih hari ini. Apakah ada yang bisa saya bantu?',
      audio_label: 'Komentar untuk ditanggapi',
      needsRecording: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-S04 — Mengungkapkan perasaan secara lisan
  // ─────────────────────────────────────────────────────
  'BI-A-S04': {
    cek_awal: [{
      id: 'S04-CA-1',
      instruksi: 'Lihat gambar ini. Ungkapkan perasaanmu tentang situasi dalam gambar.',
      stimulus_emoji: '🎂🎉',
      stimulus_label: 'Pesta ulang tahun yang meriah',
      needsRecording: true,
    }],
    latihan: [{
      id: 'S04-LAT-1',
      instruksi: 'Lihat gambar ini. Ungkapkan perasaanmu sambil direkam.',
      panduan_penguatan:  '💡 Penguatan: Sebutkan nama perasaannya — senang, sedih, takut, marah, kaget — lalu jelaskan alasannya.',
      panduan_pendalaman: '💡 Pendalaman: Sebutkan perasaanmu, jelaskan alasannya, dan ceritakan apa yang akan kamu lakukan jika ada di situasi itu.',
      rubrik_orang_tua: {
        penguatan:  ['Apakah anak menyebutkan nama perasaan (senang, sedih, takut, marah, dll.)?', 'Apakah anak memberikan alasan mengapa ia merasakan hal itu?'],
        pendalaman: ['Apakah anak menyebutkan perasaan dan alasan dengan jelas?', 'Apakah anak menceritakan apa yang akan ia lakukan jika berada di situasi itu?'],
      },
      stimulus_emoji: '🐶🏠',
      stimulus_label: 'Anak menemukan anak anjing tersesat di depan rumah',
      needsRecording: true,
    }],
    cek_ulang: [{
      id: 'S04-CU-1',
      instruksi: 'Lihat gambar ini. Ungkapkan perasaanmu tentang situasi dalam gambar.',
      stimulus_emoji: '🎒📚',
      stimulus_label: 'Hari pertama masuk sekolah baru',
      needsRecording: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-S05 — Mengungkapkan gagasan secara lisan
  // ─────────────────────────────────────────────────────
  'BI-A-S05': {
    cek_awal: [{
      id: 'S05-CA-1',
      instruksi: 'Ungkapkan gagasanmu: apa yang ingin kamu lakukan jika libur sekolah?',
      needsRecording: true,
    }],
    latihan: [{
      id: 'S05-LAT-1',
      instruksi: 'Ungkapkan gagasanmu tentang topik ini sambil direkam.',
      panduan_penguatan:  '💡 Penguatan: Mulai dengan "Saya ingin..." atau "Menurut saya...". Berikan satu alasan atau contoh.',
      panduan_pendalaman: '💡 Pendalaman: Sampaikan gagasanmu dengan alasan yang jelas, lalu ceritakan apa yang akan terjadi jika gagasan itu dilakukan.',
      rubrik_orang_tua: {
        penguatan:  ['Apakah anak menyampaikan gagasan dengan kalimat yang utuh?', 'Apakah ada alasan atau contoh yang mendukung gagasannya?'],
        pendalaman: ['Apakah gagasan disampaikan dengan alasan yang jelas?', 'Apakah anak menjelaskan apa yang akan terjadi jika gagasan itu dilakukan?'],
      },
      stimulus_label: 'Binatang apa yang paling ingin kamu pelihara, dan mengapa?',
      needsRecording: true,
    }],
    cek_ulang: [{
      id: 'S05-CU-1',
      instruksi: 'Ungkapkan gagasanmu tentang topik ini dengan jelas.',
      stimulus_label: 'Makanan sehat apa yang menurutmu enak dan baik untuk dimakan setiap hari?',
      needsRecording: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-S06 — Menceritakan kembali bacaan
  // ─────────────────────────────────────────────────────
  'BI-A-S06': {
    cek_awal: [{
      id: 'S06-CA-1',
      instruksi: 'Baca cerita ini, lalu ceritakan kembali isinya dengan kata-katamu sendiri.',
      stimulus_teks: 'Soni dan adiknya pergi ke pantai. Mereka bermain pasir dan berenang. Soni menemukan kerang yang indah. Ia membawa kerang itu pulang untuk ibunya.',
      needsRecording: true,
    }],
    latihan: [{
      id: 'S06-LAT-1',
      instruksi: 'Baca cerita ini, lalu ceritakan kembali sambil direkam.',
      panduan_penguatan:  '💡 Penguatan: Ceritakan tiga hal: siapa tokohnya, apa yang terjadi, dan bagaimana akhirnya.',
      panduan_pendalaman: '💡 Pendalaman: Ceritakan isi dengan lengkap, lalu tambahkan pendapatmu: apakah yang dilakukan tokoh itu baik? Mengapa?',
      rubrik_orang_tua: {
        penguatan:  ['Apakah anak menyebutkan siapa tokoh ceritanya?', 'Apakah anak menceritakan apa yang terjadi dan bagaimana akhir cerita?'],
        pendalaman: ['Apakah anak menceritakan isi secara lengkap (tokoh, peristiwa, akhir)?', 'Apakah anak menambahkan pendapat apakah tindakan tokoh baik atau tidak?'],
      },
      stimulus_teks: 'Rina suka sekali membaca buku. Suatu hari ia meminjam buku di perpustakaan. Buku itu berisi cerita tentang naga yang baik hati. Rina membaca buku itu sampai selesai sebelum tidur.',
      needsRecording: true,
    }],
    cek_ulang: [{
      id: 'S06-CU-1',
      instruksi: 'Baca cerita ini, lalu ceritakan kembali isinya dengan kata-katamu sendiri.',
      stimulus_teks: 'Tono senang bermain hujan-hujanan di halaman. Ibunya memanggil Tono masuk ke rumah. Tono mandi dan berganti baju kering. Setelah itu Tono minum susu hangat.',
      needsRecording: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-S07 — Menceritakan kembali rangkaian visual
  // ─────────────────────────────────────────────────────
  'BI-A-S07': {
    cek_awal: [{
      id: 'S07-CA-1',
      instruksi: 'Lihat rangkaian gambar ini. Ceritakan apa yang terjadi dari gambar pertama sampai terakhir.',
      panels: [
        { emoji: '☁️🌧️', deskripsi: 'Mendung dan hujan deras' },
        { emoji: '🌈', deskripsi: 'Pelangi muncul setelah hujan' },
        { emoji: '👧😊', deskripsi: 'Anak senang melihat pelangi' },
      ],
      needsRecording: true,
    }],
    latihan: [{
      id: 'S07-LAT-1',
      instruksi: 'Lihat rangkaian gambar ini. Ceritakan urutannya sambil direkam.',
      panduan_penguatan:  '💡 Penguatan: Gunakan kata urutan: "pertama", "kemudian", "lalu", "akhirnya".',
      panduan_pendalaman: '💡 Pendalaman: Ceritakan urutan kejadian, lalu tambahkan perkiraan: apa yang akan terjadi setelah gambar terakhir?',
      rubrik_orang_tua: {
        penguatan:  ['Apakah urutan cerita sesuai dengan rangkaian gambar?', 'Apakah anak menggunakan kata urutan (pertama, kemudian, lalu, akhirnya)?'],
        pendalaman: ['Apakah urutan dan kata urutan digunakan dengan benar?', 'Apakah anak menambahkan perkiraan apa yang terjadi setelah gambar terakhir?'],
      },
      panels: [
        { emoji: '🌱', deskripsi: 'Benih ditanam di tanah' },
        { emoji: '💧🌱', deskripsi: 'Tanaman disiram setiap hari' },
        { emoji: '🌸', deskripsi: 'Tanaman tumbuh berbunga' },
      ],
      needsRecording: true,
    }],
    cek_ulang: [{
      id: 'S07-CU-1',
      instruksi: 'Lihat rangkaian gambar ini. Ceritakan apa yang terjadi dari awal sampai akhir.',
      panels: [
        { emoji: '🧒🥚', deskripsi: 'Anak menemukan telur burung yang jatuh' },
        { emoji: '🪺🐥', deskripsi: 'Anak meletakkan telur kembali ke sarang' },
        { emoji: '🐥💛', deskripsi: 'Anak burung menetas dan sehat' },
      ],
      needsRecording: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-S08 — Menceritakan kembali cerita yang didengar
  // ─────────────────────────────────────────────────────
  'BI-A-S08': {
    cek_awal: [{
      id: 'S08-CA-1',
      instruksi: 'Dengarkan cerita ini. Setelah selesai, ceritakan kembali dengan kata-katamu sendiri.',
      audio_script: 'Eko menemukan anak kucing di depan rumahnya. Anak kucing itu sangat kecil dan lapar. Eko memberinya susu. Sejak itu, kucing kecil itu selalu ikut Eko ke mana-mana.',
      audio_label: 'Cerita: Eko dan Kucing Kecil',
      needsRecording: true,
    }],
    latihan: [{
      id: 'S08-LAT-1',
      instruksi: 'Dengarkan cerita ini. Setelah selesai, ceritakan kembali sambil direkam.',
      panduan_penguatan:  '💡 Penguatan: Ceritakan tiga hal — siapa tokohnya, apa masalahnya, dan bagaimana penyelesaiannya.',
      panduan_pendalaman: '💡 Pendalaman: Ceritakan isi secara lengkap, lalu tambahkan pendapatmu: apakah keputusan tokoh sudah tepat?',
      rubrik_orang_tua: {
        penguatan:  ['Apakah anak menyebutkan tokoh utama dan masalah dalam cerita?', 'Apakah anak menceritakan bagaimana masalah diselesaikan?'],
        pendalaman: ['Apakah anak menceritakan isi secara lengkap (tokoh, masalah, penyelesaian)?', 'Apakah anak menambahkan pendapat apakah keputusan tokoh sudah tepat?'],
      },
      audio_script: 'Maya kehilangan pensil kesayangannya. Ia mencarinya di seluruh tas dan kotak pensil. Ternyata pensilnya jatuh ke bawah meja. Maya sangat lega dan berjanji akan lebih hati-hati.',
      audio_label: 'Cerita: Maya dan Pensilnya',
      needsRecording: true,
    }],
    cek_ulang: [{
      id: 'S08-CU-1',
      instruksi: 'Dengarkan cerita ini. Setelah selesai, ceritakan kembali dengan kata-katamu sendiri.',
      audio_script: 'Budi ingin membeli hadiah untuk ulang tahun ibunya. Ia menabung uang jajannya selama seminggu. Akhirnya Budi bisa membeli bunga merah kesukaan ibunya. Ibu sangat terharu dan memeluk Budi erat-erat.',
      audio_label: 'Cerita: Hadiah untuk Ibu',
      needsRecording: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-W01 — Menulis permulaan (FOTO tulisan tangan)
  // ─────────────────────────────────────────────────────
  'BI-A-W01': {
    cek_awal: [{
      id: 'W01-CA-1',
      instruksi: 'Minta anak menulis kata-kata ini di kertas dengan tangan. Setelah selesai, foto hasilnya dan unggah di sini.',
      kata_target: ['mama', 'buku', 'meja', 'sekolah', 'bermain'],
      needsPhoto: true,
    }],
    latihan: [{
      id: 'W01-LAT-1',
      instruksi: 'Minta anak menulis kata-kata ini di kertas. Foto hasilnya.',
      panduan_penguatan:  '💡 Penguatan: Perhatikan cara memegang pensil. Tulis perlahan — setiap huruf harus bisa dibaca.',
      panduan_pendalaman: '💡 Pendalaman: Tulis lebih rapi dari sebelumnya. Pastikan spasi antar kata terlihat jelas.',
      rubrik_orang_tua: {
        penguatan:  ['Apakah semua kata tertulis di kertas dan terlihat di foto?', 'Apakah setiap kata dapat dibaca (huruf tidak terbalik atau terlewat)?'],
        pendalaman: ['Apakah semua kata tertulis dengan rapi?', 'Apakah spasi antar kata terlihat jelas di foto?'],
      },
      kata_target: ['pintu', 'kursi', 'jalan', 'malam'],
      needsPhoto: true,
    }],
    cek_ulang: [{
      id: 'W01-CU-1',
      instruksi: 'Minta anak menulis kata-kata baru ini di kertas. Foto hasilnya.',
      kata_target: ['pohon', 'burung', 'angin', 'terbang', 'berlari'],
      needsPhoto: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-W02 — Mengumpulkan contoh tulisan tangan
  // ─────────────────────────────────────────────────────
  'BI-A-W02': {
    cek_awal: [{
      id: 'W02-CA-1',
      instruksi: 'Foto contoh tulisan tangan anak dari buku latihan atau kertas. Unggah fotonya di sini.',
      needsPhoto: true,
    }],
    latihan: [{
      id: 'W02-LAT-1',
      instruksi: 'Minta anak menyalin kalimat ini di kertas. Foto hasilnya.',
      panduan_penguatan:  '💡 Penguatan: Bimbing anak menyalin pelan-pelan. Periksa setiap huruf sebelum lanjut ke kata berikutnya.',
      panduan_pendalaman: '💡 Pendalaman: Minta anak menyalin tanpa bantuan. Perhatikan apakah spasi dan bentuk huruf lebih baik dari sebelumnya.',
      rubrik_orang_tua: {
        penguatan:  ['Apakah kalimat disalin lengkap tanpa kata yang terlewat?', 'Apakah tulisan cukup terbaca di foto?'],
        pendalaman: ['Apakah kalimat disalin lengkap tanpa bantuan?', 'Apakah spasi dan bentuk huruf terlihat lebih rapi dibanding cek awal?'],
      },
      stimulus_teks: 'Saya suka membaca buku.',
      needsPhoto: true,
    }],
    cek_ulang: [{
      id: 'W02-CU-1',
      instruksi: 'Minta anak menulis kalimat pendek ini tanpa melihat contoh. Foto hasilnya.',
      stimulus_teks: 'Ibu memasak nasi goreng.',
      needsPhoto: true,
    }],
  },

  // ─────────────────────────────────────────────────────
  // BI-A-W03 — Menulis teks sederhana dalam beberapa kalimat
  // ─────────────────────────────────────────────────────
  'BI-A-W03': {
    cek_awal: [{
      id: 'W03-CA-1',
      instruksi: 'Tulis 2 sampai 3 kalimat tentang hari ini atau kegiatanmu.',
      min_panjang: 20,
      needsText: true,
    }],
    latihan: [{
      id: 'W03-LAT-1',
      instruksi: 'Tulis 2 sampai 3 kalimat tentang makanan kesukaanmu.',
      panduan_penguatan:  '💡 Penguatan: Mulai dengan siapa atau apa. Akhiri setiap kalimat dengan tanda titik.',
      panduan_pendalaman: '💡 Pendalaman: Tulis 3 kalimat dengan kata penghubung — "karena", "tetapi", atau "dan" — di salah satu kalimat.',
      rubrik_orang_tua: {
        penguatan:  ['Apakah ada minimal 2 kalimat tentang makanan kesukaannya?', 'Apakah setiap kalimat diakhiri tanda titik?'],
        pendalaman: ['Apakah ada minimal 3 kalimat tentang makanan kesukaannya?', 'Apakah ada kata penghubung (karena, tetapi, atau dan) di salah satu kalimat?'],
      },
      min_panjang: 20,
      needsText: true,
    }],
    cek_ulang: [{
      id: 'W03-CU-1',
      instruksi: 'Tulis 2 sampai 3 kalimat tentang hewan yang kamu suka.',
      min_panjang: 20,
      needsText: true,
    }],
  },
};

export function getCollectTasks(unitId, phase) {
  return COLLECT_PHASES[unitId]?.[phase] ?? [];
}
