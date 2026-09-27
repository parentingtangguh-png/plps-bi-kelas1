# MVP 2 PLPS — Deliverables
Bahasa Indonesia Kelas 1 · CP Fase A · 2026-09-27

---

## Deliverable 1 — Repo & cara menjalankan

```
Lokasi   : D:\ribuan_pengguna\CLAUDE\plps-bi-kelas1\
Commit   : d62accf
Branch   : master
```

**Menjalankan:**

```bash
npx serve D:/ribuan_pengguna/CLAUDE/plps-bi-kelas1 -p 3100
# lalu buka http://localhost:3100/
```

Atau lewat launch.json yang sudah ada di `D:\ribuan_pengguna\CLAUDE\plps\.claude\launch.json`
(nama konfigurasi: `plps-bi-kelas1`).

**Stack:** Vanilla HTML/CSS/JS ES modules — tidak ada framework, tidak ada build step.
State disimpan di `localStorage` (key: `plps_bi_kelas1_state`).

---

## Deliverable 2 — Matriks CP → elemen → unit → bahan → bukti → hasil

| ID | Elemen CP | Tuntutan CP (ringkas) | Unit Operasional | Bahan / Stimulus | Bukti yang Dikumpulkan | Hasil yang Dapat Diputuskan Sistem |
|----|-----------|----------------------|-----------------|-----------------|----------------------|-----------------------------------|
| BI-A-L01 | Menyimak | Memahami informasi dari percakapan nonsastra aural | Informasi dalam percakapan yang didengar | Rekaman percakapan pendek (TTS speechSynthesis) | Jawaban pilihan ganda, ScoringOutcome per item | TERLIHAT_BISA / MASIH_BELAJAR (jika audio berhasil) |
| BI-A-L02 | Menyimak | Memahami pesan teks sastra aural | Pesan cerita yang didengar | Rekaman cerita pendek (TTS) | Jawaban pilihan ganda | TERLIHAT_BISA / MASIH_BELAJAR (audio harus berhasil) |
| BI-A-R01 | Membaca & Memirsa | Membaca kata-kata sederhana dengan fasih | Membaca kata sederhana dengan suara | Daftar kata KV/KVK/KVKV di layar | Rekaman suara anak membaca | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-R02 | Membaca & Memirsa | Memahami isi bacaan | Memahami isi bacaan | Teks pendek 3–5 kalimat di layar | Jawaban pilihan ganda (auto-scored) | TERLIHAT_BISA / MASIH_BELAJAR — **fully automatic** |
| BI-A-R03 | Membaca & Memirsa | Memahami tayangan yang dipirsa | Memahami peristiwa dalam rangkaian visual | Rangkaian 3–4 panel emoji + keterangan | Jawaban pilihan ganda (auto-scored) | TERLIHAT_BISA / MASIH_BELAJAR — **fully automatic** |
| BI-A-S01 | Berbicara & Mempresentasikan | Bertanya dengan santun | Mengajukan pertanyaan lisan | Gambar/situasi stimulus | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S02 | Berbicara & Mempresentasikan | Menjawab pertanyaan | Menjawab pertanyaan secara lisan | Pertanyaan lisan (TTS) | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S03 | Berbicara & Mempresentasikan | Menanggapi komentar | Menanggapi komentar secara lisan | Komentar lisan (TTS) | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S04 | Berbicara & Mempresentasikan | Mengungkapkan perasaan | Mengungkapkan perasaan secara lisan | Gambar/situasi | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S05 | Berbicara & Mempresentasikan | Mengungkapkan gagasan | Mengungkapkan gagasan secara lisan | Topik bebas | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S06 | Berbicara & Mempresentasikan | Menceritakan kembali teks | Menceritakan kembali bacaan | Teks pendek dari R02 | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S07 | Berbicara & Mempresentasikan | Menceritakan kembali tayangan | Menceritakan kembali rangkaian visual | Panel visual dari R03 | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S08 | Berbicara & Mempresentasikan | Menceritakan kembali cerita didengar | Menceritakan kembali cerita yang didengar | Audio cerita L02 | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-W01 | Menulis | Menulis permulaan | Menulis permulaan | Petunjuk menulis huruf/kata | Teks di textarea atau foto tulisan | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-W02 | Menulis | Mengembangkan tulisan tangan | Mengumpulkan contoh tulisan tangan | Instruksi upload foto | File foto tulisan tangan | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-W03 | Menulis | Menulis teks sederhana | Menulis teks sederhana dalam beberapa kalimat | Petunjuk tulis bebas | Teks textarea (min 20 karakter) | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS (cek panjang saja) |

---

## Deliverable 3 — Tabel status unit

| ID | Label | Evidence Mode | Status Otomasi | Hasil Uji | Catatan |
|----|-------|--------------|----------------|-----------|---------|
| BI-A-L01 | Informasi dalam percakapan yang didengar | AUDIO_GATED | **Otomatis bersyarat** | Belum diuji (TTS env) | Audio speechSynthesis harus berhasil. Jika gagal → TUGAS_GAGAL_BERJALAN. Item bank: 6 item (cek_awal 2, latihan 2, cek_ulang 2) |
| BI-A-L02 | Pesan cerita yang didengar | AUDIO_GATED | **Otomatis bersyarat** | Belum diuji | Prerequisite L01. Sama dengan L01. |
| BI-A-R01 | Membaca kata sederhana dengan suara | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | MediaRecorder untuk rekam suara. Penilaian kefasihan butuh manusia atau ASR. |
| BI-A-R02 | Memahami isi bacaan | AUTO | **Otomatis penuh** ✓ | **LULUS** — end-to-end teruji | Cek_awal → latihan → cek_ulang → mastery decision. Smoke test: 1/2 cek_awal (Masih belajar) → 3/3 cek_ulang (Terlihat bisa) → mastery proven. |
| BI-A-R03 | Memahami peristiwa dalam rangkaian visual | AUTO | **Otomatis penuh** ✓ | **LULUS** — intro + item display teruji | Panel emoji + teks caption. Alur identik R02. Mastery end-to-end belum dijalankan penuh. |
| BI-A-S01 | Mengajukan pertanyaan lisan | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | MediaRecorder. Relevansi/kesantunan pertanyaan tidak bisa dinilai otomatis. |
| BI-A-S02 | Menjawab pertanyaan secara lisan | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | MediaRecorder. |
| BI-A-S03 | Menanggapi komentar secara lisan | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | MediaRecorder. |
| BI-A-S04 | Mengungkapkan perasaan secara lisan | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | MediaRecorder. |
| BI-A-S05 | Mengungkapkan gagasan secara lisan | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | MediaRecorder. |
| BI-A-S06 | Menceritakan kembali bacaan | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | Prerequisite R02. MediaRecorder. Akurasi retelling tidak bisa dinilai otomatis. |
| BI-A-S07 | Menceritakan kembali rangkaian visual | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | Prerequisite R03. MediaRecorder. |
| BI-A-S08 | Menceritakan kembali cerita yang didengar | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | Prerequisite L02. MediaRecorder + syarat audio berhasil. |
| BI-A-W01 | Menulis permulaan | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | Textarea. Bentuk huruf tidak bisa dinilai dari teks saja. |
| BI-A-W02 | Mengumpulkan contoh tulisan tangan | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | Prerequisite W01. File upload (foto). Penilaian butuh manusia. |
| BI-A-W03 | Menulis teks sederhana | COLLECT | **Hanya kumpulkan bukti** | UI stub tersedia | Prerequisite W01. Cek min_panjang = 20 karakter. Ejaan/isi butuh review manusia. |

**Ringkasan:**
- Otomatis penuh: 2 unit (R02, R03)
- Otomatis bersyarat (audio): 2 unit (L01, L02)
- Hanya kumpulkan bukti: 12 unit (R01, S01–S08, W01–W03)

---

## Deliverable 4 — Biaya operasional

### Audio (Menyimak)

| Komponen | Teknologi | Biaya |
|----------|-----------|-------|
| Text-to-Speech untuk L01/L02 | `window.speechSynthesis` (Web Speech API) | **Rp 0** — browser built-in |
| Alternatif jika TTS gagal | Rekaman audio statis (.mp3) di-host sendiri | Biaya hosting saja (sangat kecil) |
| Transkripsi rekaman suara R01/S-units | Tidak diimplementasikan | Belum ada biaya; butuh ASR jika diotomasi |

**Catatan:** speechSynthesis tersedia di semua browser modern. Kualitas suara bervariasi per OS/browser. Untuk produk, disarankan audio statis pre-recorded (satu kali biaya produksi, tidak ada biaya per-request).

### AI

| Komponen | Status | Biaya |
|----------|--------|-------|
| Scoring R02/R03/L01/L02 | Deterministik penuh — tidak pakai AI | Rp 0 |
| Penilaian rekaman suara (R01/S-units) | Belum diimplementasikan | Rp 0 saat ini |
| Penilaian tulisan tangan (W02) | Belum diimplementasikan | Rp 0 saat ini |
| Personalisasi / feedback bahasa | Belum diimplementasikan | Rp 0 saat ini |

**Proyeksi jika ASR/AI ditambahkan:**
- ASR untuk rekaman (R01, S01–S08): Google Cloud Speech-to-Text ~$0.006/menit, Whisper API ~$0.006/menit
- Penilaian teks dengan LLM: ~$0.001–0.01 per sesi tergantung model
- Untuk skala kecil (<1000 sesi/bulan): <$50/bulan

### Infrastruktur

| Komponen | Status | Biaya |
|----------|--------|-------|
| State persistence | localStorage — tidak ada server | Rp 0 |
| File storage (rekaman suara, foto W02) | Belum diimplementasikan — saat ini disimpan di memori sesi | Rp 0 saat ini |
| Server / hosting | Belum ada (SPA statis) | Rp 0 saat ini |

**Catatan:** Rekaman audio dan foto saat ini tidak disimpan persisten. Untuk produk nyata, perlu object storage (S3/R2 ~$0.015/GB/bulan).

---

## Deliverable 5 — Masalah yang menghalangi penerimaan sebagai produk otomatis

### BLOCKER — tidak bisa diotomasi tanpa keputusan arsitektur

**BLOCK-BI-01: 12 dari 16 unit adalah COLLECT — tidak ada mastery decision otomatis**
- Unit R01 (membaca), S01–S08 (berbicara), W01–W03 (menulis) hanya mengumpulkan bukti
- Sistem tidak bisa memutuskan TERLIHAT_BISA / MASIH_BELAJAR untuk unit-unit ini
- Dampak: root gap pada sebagian besar anak tidak bisa otomatis maju ke mastery
- Fix yang diperlukan: pilih satu — (a) ASR + rubrik otomatis, (b) reviewer manusia dalam loop, atau (c) redefinisi unit agar ada observable yang bisa di-proxy secara digital

**BLOCK-BI-02: Rekaman suara dan foto tidak tersimpan persisten**
- MediaRecorder menghasilkan blob di memori; setelah reload hilang
- Upload foto W02 belum ada endpoint tujuan
- Untuk produk: butuh upload ke object storage dan simpan URL di state

**BLOCK-BI-03: Audio TTS speechSynthesis tidak diuji di semua environment**
- Kualitas dan ketersediaan TTS berbeda per OS/browser
- Android Chrome sering memerlukan interaksi pengguna sebelum speechSynthesis bisa autoplay
- Fix: pre-record audio statis sebagai fallback wajib untuk L01/L02

**BLOCK-BI-04: Tidak ada multi-child / multi-session support**
- State tersimpan per browser localStorage sebagai satu profil
- Jika ada dua anak, state tercampur
- Fix: profile management dengan ID, atau cloud sync

### CONCERN — penting untuk kualitas produk

**CONCERN-BI-01: Item bank tipis untuk L01/L02**
- L01: 2 item cek_awal, 2 latihan, 2 cek_ulang — minimum; mastery evidence terbatas
- Perlu diperluas ke minimal 5–8 item per fase

**CONCERN-BI-02: R03 menggunakan emoji sebagai "gambar"**
- Emoji berbeda rendering per device/font; bukan gambar ilustrasi sungguhan
- Untuk kelas 1: gambar bergambar nyata lebih sesuai perkembangan
- Fix: ganti dengan gambar SVG atau foto berkualitas

**CONCERN-BI-03: Asumsi anak bisa membaca mandiri untuk R02/R03**
- R02 menampilkan teks; jika anak belum bisa membaca mandiri, hasil tidak valid
- Tidak ada pengecekan kemampuan baca sebelum unit ini dimulai
- Fix: tambah warning di intro, atau prerequisite R01 mastery (tapi R01 COLLECT...)

**CONCERN-BI-04: Cache buster manual (src/app.js?v=2)**
- Setiap perubahan app.js perlu increment manual versi di index.html
- Fix: gunakan hash-based cache busting atau build tool minimal

**CONCERN-BI-05: Tidak ada error boundary untuk state corrupt**
- Jika localStorage state corrupt/invalid, app bisa crash
- Fix: tambah try/catch + migrasi di state.js dengan fallback ke clearState

---

*Dokumen ini dihasilkan 2026-09-27 dari implementasi aktual commit d62accf.*
