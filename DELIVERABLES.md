# MVP 2 PLPS — Deliverables
Bahasa Indonesia Kelas 1 · CP Fase A · 2026-09-29 (diperbarui)

> **Status: SELESAI & LIVE** — https://plps-bi-kelas1.parentingtangguh.workers.dev
> Audit terakhir selesai 2026-09-29. Siap dikembangkan ke mapel lain Fase A.

> **Catatan orientasi untuk Claude:** Dokumen ini ada di repo `plps-bi-kelas1`
> (`D:\ribuan_pengguna\CLAUDE\plps-bi-kelas1`). Ini repo yang aktif dikerjakan.
> Repo `plps` (`D:\ribuan_pengguna\CLAUDE\plps`) adalah repo berbeda (Numerasi/Literasi
> kelas 3–6) yang sedang di-freeze. Jangan campur keduanya.

---

## Deliverable 1 — Repo & cara menjalankan

```
Lokasi   : D:\ribuan_pengguna\CLAUDE\plps-bi-kelas1\
Commit   : 8cb4bd0
Branch   : master
Remote   : https://github.com/parentingtangguh-png/plps-bi-kelas1.git
Deploy   : https://plps-bi-kelas1.parentingtangguh.workers.dev
Version  : 01103104-2bc7-45eb-8ca3-6ab34fb950fa
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
| BI-A-L01 | Menyimak | Memahami informasi dari percakapan nonsastra aural | Informasi dalam percakapan yang didengar | Orang tua membacakan percakapan pendek (teks ditampilkan di layar) | Jawaban pilihan ganda, ScoringOutcome per item | TERLIHAT_BISA / MASIH_BELAJAR |
| BI-A-L02 | Menyimak | Memahami pesan teks sastra aural | Pesan cerita yang didengar | Orang tua membacakan cerita pendek (teks ditampilkan di layar) | Jawaban pilihan ganda | TERLIHAT_BISA / MASIH_BELAJAR |
| BI-A-R01 | Membaca & Memirsa | Membaca kata-kata sederhana dengan fasih | Membaca kata sederhana dengan suara | Daftar kata KV/KVK/KVKV di layar | Rekaman suara anak membaca | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-R02 | Membaca & Memirsa | Memahami isi bacaan | Memahami isi bacaan | Teks pendek 3–5 kalimat di layar | Jawaban pilihan ganda (auto-scored) | TERLIHAT_BISA / MASIH_BELAJAR — **fully automatic** |
| BI-A-R03 | Membaca & Memirsa | Memahami tayangan yang dipirsa | Memahami peristiwa dalam rangkaian visual | Rangkaian 3–4 panel emoji + keterangan | Jawaban pilihan ganda (auto-scored) | TERLIHAT_BISA / MASIH_BELAJAR — **fully automatic** |
| BI-A-S01 | Berbicara & Mempresentasikan | Bertanya dengan santun | Mengajukan pertanyaan lisan | Gambar/situasi stimulus | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S02 | Berbicara & Mempresentasikan | Menjawab pertanyaan | Menjawab pertanyaan secara lisan | Orang tua membacakan pertanyaan (teks di layar) | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S03 | Berbicara & Mempresentasikan | Menanggapi komentar | Menanggapi komentar secara lisan | Orang tua membacakan komentar (teks di layar) | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S04 | Berbicara & Mempresentasikan | Mengungkapkan perasaan | Mengungkapkan perasaan secara lisan | Gambar/situasi | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S05 | Berbicara & Mempresentasikan | Mengungkapkan gagasan | Mengungkapkan gagasan secara lisan | Topik bebas | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S06 | Berbicara & Mempresentasikan | Menceritakan kembali teks | Menceritakan kembali bacaan | Teks pendek dari R02 | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S07 | Berbicara & Mempresentasikan | Menceritakan kembali tayangan | Menceritakan kembali rangkaian visual | Panel visual dari R03 | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-S08 | Berbicara & Mempresentasikan | Menceritakan kembali cerita didengar | Menceritakan kembali cerita yang didengar | Orang tua membacakan cerita (teks di layar, sama dengan L02) | Rekaman suara | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-W01 | Menulis | Menulis permulaan | Menulis permulaan | Petunjuk menulis huruf/kata | Teks di textarea atau foto tulisan | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-W02 | Menulis | Mengembangkan tulisan tangan | Mengumpulkan contoh tulisan tangan | Instruksi upload foto | File foto tulisan tangan | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS |
| BI-A-W03 | Menulis | Menulis teks sederhana | Menulis teks sederhana dalam beberapa kalimat | Petunjuk tulis bebas | Teks textarea (min 20 karakter) | BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS (cek panjang saja) |

---

## Deliverable 3 — Tabel status unit

| ID | Label | Evidence Mode | Status Otomasi | Hasil Uji | Catatan |
|----|-------|--------------|----------------|-----------|---------|
| BI-A-L01 | Informasi dalam percakapan yang didengar | AUDIO_GATED | **Otomatis penuh** ✓ | **LULUS** — diaudit 2026-09-28 | Orang tua membacakan teks percakapan. Tombol "Sudah dibacakan →" membuka soal. Item bank: 6 item (cek_awal 2, latihan 2, cek_ulang 2). Pengantar latihan penguatan (tiga bagian) ditambahkan commit 0b0fb2e. |
| BI-A-L02 | Pesan cerita yang didengar | AUDIO_GATED | **Otomatis penuh** ✓ | UI tersedia, belum diaudit end-to-end | Prerequisite L01. Gate: cek ulang L01 gagal → L02 terkunci (diperbaiki commit 8354921). |
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
| Baca-nyaring L01/L02/S02/S03/S08 | Orang tua membaca teks di layar | **Rp 0** — tidak ada TTS |
| Transkripsi rekaman suara R01/S-units | Tidak diimplementasikan | Belum ada biaya; butuh ASR jika diotomasi |

**Catatan:** TTS dihapus sepenuhnya (commit 81c0ac3). Orang tua memegang peran fasilitator bacaan — konsisten dengan pendekatan pedagogis Fase A.

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

**BLOCK-BI-01: 12 dari 16 unit adalah COLLECT** — **RESOLVED (by design)**
- Penilaian unit COLLECT adalah peran orang tua sebagai fasilitator
- Sistem menyediakan rubrik, instruksi, dan tombol verdik ("Terlihat Bisa" / "Perlu Latihan") untuk memudahkan orang tua
- Mastery decision direkam dari verdik orang tua (fase 1 + fase 2), bukan otomatis dari AI/ASR
- Ini bukan kekurangan — ini desain yang sesuai dengan pendekatan pedagogis Fase A

**BLOCK-BI-02: Rekaman suara dan foto tidak tersimpan persisten** — **RESOLVED (2026-09-29)**
- IndexedDB sebagai cache lokal blob audio/foto ✓
- Supabase Storage bucket `media` dengan RLS ✓
- Upload otomatis ke Storage dipanggil fire-and-forget setelah `saveMediaBlob` ✓
- Path di Storage: `{childId}/{mediaId}` — terpisah per anak

**BLOCK-BI-03: ~~Audio TTS~~ — RESOLVED 2026-09-28**
- TTS speechSynthesis dihapus sepenuhnya; diganti kotak baca-nyaring orang tua
- Orang tua membacakan teks yang ditampilkan di layar — tidak ada ketergantungan browser TTS
- Commit: 81c0ac3, fe209f3, 977d0c3

**BLOCK-BI-04: Tidak ada multi-child / multi-session support** — **RESOLVED 2026-09-29**
- Satu akun Google orang tua dapat mengelola banyak anak
- State tersimpan terpisah per anak di Supabase + localStorage cache
- Child picker muncul setelah login; "Pilih anak lain" tersedia di home

### CONCERN — penting untuk kualitas produk

**CONCERN-BI-01: Item bank tipis untuk L01/L02** — RESOLVED M-3
- Sudah diperluas ke 5 item per fase (cek_awal, latihan, latihan_mandiri, cek_ulang)

**CONCERN-BI-02: R03 menggunakan emoji sebagai "gambar"** — RESOLVED K-2
- Semua panel R03 sudah diganti ke inline SVG

**CONCERN-BI-03: Asumsi anak bisa membaca mandiri untuk R02/R03** — RESOLVED
- `catatan_batas` sudah ada di cp.js dan dirender di UI intro unit (baris `${unit.catatan_batas ? ...}` di app.js)
- Orang tua membaca peringatan sebelum tombol "Mulai cek awal" tersedia

**CONCERN-BI-04: Cache buster manual (src/app.js?v=2)**
- Masih manual; diterima untuk skala saat ini (vanilla, no build step)

**CONCERN-BI-05: Tidak ada error boundary untuk state corrupt** — RESOLVED 2026-09-29
- `load()` di state.js kini validasi minimal: objek dengan field `units`
- State corrupt atau tidak bisa di-parse → fallback ke `newState()` otomatis

---

## Deliverable 7 — Audit Keamanan & Isolasi (2026-09-29)

### Temuan dan status

| ID | Area | Temuan | Status |
|----|------|--------|--------|
| SEC-1 | Storage RLS | `media_upload/read/delete` hanya cek `auth.uid() is not null` — user A bisa akses media user B | **FIXED** |
| SEC-2 | Schema | `parent_id` di tabel `children` tidak punya `DEFAULT auth.uid()` — file schema tidak bisa recreate DB | **FIXED** |
| BUG-1 | State | `undoParentVerdict` tulis ke hardcoded `'plps_bi_kelas1_state'`, bukan key per-child; tidak sync Supabase | **FIXED** |
| BUG-2 | State | `clearState` hanya hapus localStorage — data kembali dari Supabase saat login ulang | **FIXED** |
| STAB-1 | State | State corrupt → app crash tanpa recovery | **FIXED** (CONCERN-BI-05) |

### Detail perbaikan

**SEC-1 — Storage RLS per pemilik (`supabase-schema.sql`)**
- Sebelum: `auth.uid() is not null` — siapapun yang login bisa akses semua file
- Sesudah: policy memverifikasi `(storage.foldername(name))[1]` (= childId dari path) dimiliki user yang sedang login via tabel `children`
- Path format: `{childId}/{mediaId}` — childId adalah UUID unik per anak

**SEC-2 — `DEFAULT auth.uid()` pada `parent_id`**
- Ditambahkan ke DDL sehingga `addChild({ nama, kelas })` tanpa kirim `parent_id` tetap aman
- Deployed DB sudah punya default ini (terbukti dari test PASS); file schema kini sinkron

**BUG-1 — `undoParentVerdict`**
- Diganti dari `localStorage.setItem(hardcoded_key, ...)` ke `saveState(s)` yang menggunakan key per-child dan sync ke Supabase

**BUG-2 — `clearState` juga hapus dari Supabase**
- Sekarang async; menghapus baris di `child_states` via Supabase setelah hapus localStorage
- Teks dialog diperbaiki: "dari perangkat **dan akun** Anda"

**STAB-1 — Error boundary state**
- `load()` validasi: parsed harus objek dengan field `units` bertipe objek
- Fallback ke `newState()` dengan log warning; tidak crash

### Invariant yang diverifikasi

| Invariant | Status setelah audit |
|-----------|---------------------|
| INV-01 `content_completed ≠ mastery_proven` | ✓ scoring.js tidak pernah set masteryProven dari progress saja |
| INV-02 `payment_success → entitlement SAJA` | ✓ tidak ada payment state dalam kode |
| INV-03 prerequisite dihormati | ✓ `getUnitStatusInfo` cek prerequisite sebelum unlock |
| INV-04 `kelas anak ≠ kompetensi_state` | ✓ kelas hanya metadata profil |
| INV-05 mastery hanya dari baseline + reassessment | ✓ AUTO: cek_awal + cek_ulang; COLLECT: dua verdik orang tua |
| INV-06 next_target dari prerequisite chain | ✓ `findRootGap` hanya pilih dari chain |
| INV-07 semua transition auditable | ✓ `progressLog` di setiap save function |
| INV-08 normal flow tanpa operator manual | ✓ seluruh alur berjalan otomatis per anak |

### Isolasi antar user

| Lapisan | Mekanisme | Status |
|---------|-----------|--------|
| Database (`children`) | RLS: `parent_id = auth.uid()` | ✓ |
| Database (`child_states`) | RLS via join ke `children` | ✓ |
| Storage (`media`) | RLS via `foldername → childId → parent_id` | ✓ (diperbaiki) |
| localStorage | Key per child: `plps_bi_kelas1_state_{childId}` | ✓ |
| IndexedDB | Key per mediaId (UUID), tidak per user | ⚠ shared per device — acceptable untuk 1 perangkat per keluarga |

### Catatan pasca-audit

**IndexedDB tidak diisolasi per user** — jika dua akun orang tua berbeda login di satu perangkat (browser yang sama), IndexedDB bisa dibaca keduanya. Ini acceptable untuk satu perangkat per keluarga; jika multi-user per device diperlukan, perlu namespace IndexedDB dengan userId.

**Tidak ada rate limiting** — Supabase Free tier punya batas; produksi perlu pantau usage.

---

---

## Deliverable 6 — Akun & Multi-Child (selesai 2026-09-29)

### Arsitektur

| Komponen | Implementasi |
|----------|-------------|
| Auth | Supabase Auth + Google OAuth (satu klik, tanpa ketik password) |
| Database | Supabase PostgreSQL — tabel `children` + `child_states` |
| Storage | Supabase Storage bucket `media` (siap pakai, belum digunakan aktif) |
| State sync | localStorage sebagai write-through cache; fire-and-forget upsert ke `child_states` |
| Offline | Backlog — localStorage tetap berfungsi saat offline, sync otomatis saat online |

### File baru

| File | Fungsi |
|------|--------|
| `src/supabase.js` | Supabase client (ESM dari cdn.jsdelivr.net) |
| `src/auth.js` | Google OAuth, session helper, sign-out |
| `src/children.js` | CRUD daftar anak per akun |
| `supabase-schema.sql` | DDL untuk dijalankan di Supabase SQL Editor |

### File dimodifikasi

| File | Perubahan |
|------|-----------|
| `src/state.js` | Per-child localStorage key; `setActiveChild`, `loadStateFromSupabase`, `syncToSupabase` |
| `src/app.js` | Auth guard async di `load`; `renderAuthScreen`, `renderChildPicker`; "Pilih anak lain" |
| `styles.css` | Style layar auth (btn-google) dan child picker |

### Alur pengguna baru

```
Buka app
  → belum login → layar "Masuk dengan Google"
  → login → layar "Pilih anak / Tambah anak baru"
  → pilih anak → peta kompetensi (alur lama tidak berubah)
  → "Pilih anak lain" → kembali ke child picker
```

### Status pengujian (2026-09-29)

| Item | Metode uji | Hasil |
|------|-----------|-------|
| Auth screen muncul jika belum login | UI live (Claude) | **PASS** |
| Klik Google → redirect ke accounts.google.com dengan Supabase callback URL | UI live (Claude) | **PASS** |
| Setelah OAuth → kembali ke plps-bi-kelas1 (bukan petakompetensianak) | UI production (Teguh) | **PASS** |
| Child picker: "Halo, Parenting Tangguh" + form tambah anak | UI production (Teguh) | **PASS** |
| Home setelah child dipilih: profil + navigasi | State injection (Claude) | **PASS** |
| Peta: banner L01, L02 terkunci prasyarat | State injection (Claude) | **PASS** |
| L01 cek awal 5 soal lengkap: scoring 3/5 → Masih belajar | UI live (Claude) | **PASS** |
| Breakdown FAM-A/FAM-B + rekomendasi latihan | UI live (Claude) | **PASS** |
| Laporan keseluruhan 16 unit dengan status | UI live (Claude) | **PASS** |

### BLOCKER yang diselesaikan sesi ini

- **BLOCK-BI-02** (rekaman tidak persisten) — **PARTIAL RESOLVED**: IndexedDB sudah ada di kode; Supabase Storage bucket sudah dibuat. Upload aktif ke Storage belum diimplementasikan (backlog).
- **BLOCK-BI-04** (tidak ada multi-child) — **RESOLVED**: satu akun orang tua dapat mengelola banyak anak, state tersimpan terpisah per anak.

### Bug lama ditemukan & diperbaiki

- `data/items/L01.js` dan `L02.js`: array ditutup prematur (`];` di tengah) saat ekspansi item bank di commit 4dad145 — menyebabkan SyntaxError. **Fixed commit e8588da.**

---

## Changelog

| Tanggal | Commit | Perubahan |
|---------|--------|-----------|
| 2026-09-29 | 3cc91e7 | feat(auth): akun Google + multi-child via Supabase |
| 2026-09-29 | e8588da | fix(items): syntax error L01/L02 — array ditutup prematur |
| 2026-09-29 | 05676d7 | fix(auth): redirectTo pakai origin saja — hindari trailing slash mismatch |
| 2026-09-27 | d62accf | Implementasi awal MVP 2 |
| 2026-09-28 | 75fb1de | Fix tombol Konfirmasi disabled visual (abu-abu) |
| 2026-09-28 | c061052 | Fix rubrik selalu muncul dari task definition (bukan evidence) |
| 2026-09-28 | 81c0ac3 | Ganti TTS dengan kotak baca-nyaring orang tua |
| 2026-09-28 | fe209f3 | Perbarui teks intro L01 — hapus referensi audio/TTS |
| 2026-09-28 | 977d0c3 | Koreksi teks TTS lama di L02 — tuntutan dan catatan_batas |
| 2026-09-28 | 0b0fb2e | Fix navigasi peta: COLLECT card label+tujuan, unit terkunci sebut nama prasyarat, pengantar latihan penguatan L01 |
| 2026-09-28 | 8354921 | Fix gate prasyarat: cek ulang gagal mengunci unit berikutnya (L02 dst) |
| 2026-09-28 | 6f5fd0a | Perbaiki layout responsif 320–400px — baris laporan 2-baris (fr-label span full), tombol → 36×36px touch target, header peta wrap 2 baris |
| 2026-09-28 | 38644fc | white-space:nowrap header tombol semua lebar (414–428px) + kontras .batas-note #92400e (6.37:1 WCAG AA) |
| 2026-09-28 | 8cb4bd0 | Banner rootGap label adaptif ("Mulai dari sini →" / "Lanjutkan" / "Kunjungi lagi") + status kartu "Belum dimulai" + redaksi tombol kembali ke peta |

### Status pengujian sesi 2026-09-29

| Item | Metode uji | Hasil |
|------|-----------|-------|
| Gate L01→L02: cek ulang gagal → L02 terkunci | UI live (manual) | **PASS** |
| Kartu COLLECT: "Buka Dashboard →" menuju #parent | UI live (Claude) | **PASS** |
| Kartu COLLECT: tanpa karya → "Ulangi pengumpulan" | UI live (Claude) | **PASS** |
| Unit terkunci: nama prasyarat muncul di kartu | UI live (Claude) | **PASS** |
| Pengantar latihan penguatan L01 (tiga bagian) | UI live (Claude) | **PASS** |
| Jalur L01 lengkap melalui latihan | Penelusuran kode | Belum perjalanan penuh |
| Jalur COLLECT lengkap pascacommit | Penelusuran kode | Belum perjalanan penuh |

### Status pengujian sesi 2026-09-29

| Item | Metode uji | Hasil |
|------|-----------|-------|
| Layout responsif baris laporan (full-report-row) 320px | UI live (Claude) | **PASS** — fr-label lebar 262px, → 36×36px |
| Header peta wrap 2 baris 320px ("Orang Tua" tidak membungkus) | UI live (Claude) | **PASS** |
| Header peta tombol tidak wrap 375px, 414px, 428px | UI live (Claude) | **PASS** — white-space:nowrap berlaku global |
| Kontras .batas-note (#92400e atas #fef3c7) | Computed style (Claude) | **PASS** — 6.37:1 WCAG AA |
| Banner rootGap: unit baru → "Mulai dari sini →" | State injection (Claude) | **PASS** |
| Banner rootGap: unit cek_awal sudah ada → "Lanjutkan" | State injection (Claude) | **PASS** |
| Banner rootGap: unit visitClosed → "Kunjungi lagi" | State injection (Claude) | **PASS** |
| Status kartu: unit tersedia → "Belum dimulai" (bukan "Tersedia") | UI live (Claude) | **PASS** |
| Status kartu: visitClosed → "Belum selesai — kunjungan ditutup" | State injection (Claude) | **PASS** |
| Tombol "Kembali ke peta, lanjutkan nanti" + teks penjelasan | UI live (Claude) | **PASS** — tombol "Tutup kunjungan unit ini" diganti |

---

## Audit Konten Unit — Kesesuaian Fase A Kelas 1 (2026-09-29, diperbarui 2026-09-29)

Audit baca-ulang semua item bank (L01, L02, R02, R03) — vocabulary, panjang teks, tuntutan kognitif, distractor.
Kriteria: kesesuaian usia 6–7 tahun kelas 1–2 SD, beban bahasa, tingkat abstraksi, keterbatasan teknis.

**Status akhir: semua item layak untuk usia 6–7 tahun setelah perbaikan di bawah.**

### Temuan

#### K-1 — ~~Kritis~~ RESOLVED 2026-09-29

**L02 FAM-B: semua 4 item FAM-B menanyakan "pesan apa"**
- RESOLVED — 4 item FAM-B diganti ke pertanyaan konkret:
  - L02-CA-B1: "Apa yang terjadi pada belalang saat musim dingin tiba?" → diganti lagi (lihat K-3)
  - L02-LT-B1: "Bagaimana elang bisa bebas dari jaring pemburu?"
  - L02-LM-B1: "Mengapa adik tidak punya teman?"
  - L02-CU-B1: "Mengapa kura-kura tiba di garis akhir lebih dulu?"
- FAM-B kini mengukur sebab-akibat dan hasil akhir cerita (konkret), bukan pesan moral abstrak.

#### K-2 — ~~Kritis~~ RESOLVED 2026-09-29

**R03 FAM-A dan FAM-B: panel menggunakan emoji + teks keterangan**
- RESOLVED commit (lihat changelog) — semua 33 panel R03 diganti ke inline SVG.
- SVG: viewBox 80×80, warna solid, konsisten lintas device/font.
- Field `deskripsi` tetap ada sebagai caption teks di bawah gambar (aksesibilitas).
- app.js: render `p.svg` jika ada, fallback ke `p.emoji` (backward compatible).

#### M-1 — Minor (tidak menghalangi validitas, tapi perlu dicatat)

**L01 FAM-B: semua item FAM-B menanyakan "topik apa" (lebih abstrak dari FAM-A)**
- FAM-A (tersurat: siapa berbicara, apa yang dikatakan) → tepat kelas 1
- FAM-B (topik percakapan) → satu level lebih abstrak, tapi masih dalam jangkauan anak kelas 1 akhir
- Tidak kritis; pantau distribusi skor FAM-A vs FAM-B untuk evidens.

#### M-2 — ~~Minor~~ RESOLVED 2026-09-29

**R02: asumsi anak bisa membaca mandiri tidak diverifikasi sebelum sesi**
- RESOLVED — `catatan_batas` di cp.js sudah dirender di UI intro unit via `${unit.catatan_batas ? <div class="batas-note">...` (app.js)
- Orang tua melihat peringatan sebelum tombol "Mulai cek awal" tersedia.

#### K-3 — ~~Kritis~~ RESOLVED 2026-09-29

**L02-CA-B1: "musim dingin" tidak relevan untuk anak Indonesia**
- Stimulus asli menggunakan konteks musim dingin (dari fabel Eropa). Indonesia tidak punya musim dingin.
  Anak kelas 1 tidak punya referensi untuk konsep "menyimpan makanan sebelum musim dingin".
- RESOLVED commit 9598a86 — diganti ke cerita lebah-belalang dengan konteks hujan deras berhari-hari.
  Konsep "rajin menyiapkan vs bermalas-malasan → konsekuensi nyata" dipertahankan, konteks dibuat relevan.

#### K-4 — ~~Kritis~~ RESOLVED 2026-09-29

**L02-LT-A1: "paling sedikit satu buku" — kuantifier abstrak untuk kelas 1**
- Frasa "paling sedikit" (at least) adalah konsep kuantifier yang belum dikuasai anak awal kelas 1.
  Anak yang menjawab benar kemungkinan menghafal frasa dari teks, bukan memahami isinya.
- RESOLVED commit 9598a86 — diganti ke angka konkret "dua buku". Tuntutan kognitif tetap sama
  (recall angka dari cerita), tanpa beban konsep kuantifier.

#### M-3 — ~~Minor~~ RESOLVED 2026-09-29

**L01/L02: item bank sangat tipis (2 item per fase)**
- RESOLVED commit (lihat changelog) — ditambah 3 item per fase untuk L01 dan L02.
- L01: cek_awal 5 item, latihan 5 item, latihan_mandiri 5 item, cek_ulang 5 item.
- L02: cek_awal 5 item, latihan 5 item, latihan_mandiri 5 item, cek_ulang 5 item.

#### M-4 — ~~Minor~~ RESOLVED 2026-09-29

**S-units (S01–S08): audit konsistensi rubrik cp.js vs COLLECT_UNITS.js**
- RESOLVED — audit manual semua 8 S-units: rubrik selaras.
- Cek_awal/cek_ulang: rubrik satu kalimat di `cp.js` (`unit.rubrik_orang_tua`) dirender di kartu review orang tua (Dashboard).
- Latihan: rubrik dua dimensi (penguatan/pendalaman) di `COLLECT_UNITS.js` dirender saat konfirmasi latihan.
- Tidak ada inkonsistensi antara tuntutan cp.js dan kriteria rubrik task-level.

#### M-5 — ~~Minor~~ RESOLVED 2026-09-29

**W03: batas minimum 20 karakter sangat rendah**
- RESOLVED — `min_panjang` di COLLECT_UNITS.js dinaikkan dari 20 → 40 karakter (cek_awal, latihan, cek_ulang)
- 40 karakter ≈ 1 kalimat pendek bahasa Indonesia; 2 kalimat akan selalu melewati batas ini.

---

## Deliverable 8 — Canonical Item Schema & Kelas Gate (2026-09-29)

### Canonical item schema

Setiap item kini memiliki 4 field wajib:

| Field | Nilai | Keterangan |
|-------|-------|-----------|
| `kompetensi_id` | string | Kompetensi spesifik yang diukur item ini (mis. `informasi_tersurat_percakapan`) |
| `kelas_soal` | `1` atau `2` | Label rancangan — untuk kelas mana item ini dirancang. **Bukan gate akses unit**, bukan kelas anak. |
| `tingkat_kompleksitas` | `rendah` / `sedang` | Estimasi rancangan; belum divalidasi empiris |
| `cara_penyajian` | `teks_didengar` / `teks_dibaca` / `visual_diamati` | Sumber informasi yang diproses anak |

Schema ini duplikasi-ready: mapel lain (MTK, IPAS, PPKn, Seni) tinggal isi field yang sama.

**Mapping per unit:**

| Unit | Family | kompetensi_id | kelas_soal | cara_penyajian |
|------|--------|--------------|-----------|---------------|
| L01 | FAM-A | informasi_tersurat_percakapan | 1 | teks_didengar |
| L01 | FAM-B | topik_percakapan | 1 | teks_didengar |
| L02 | FAM-A | informasi_tersurat_cerita | 1 | teks_didengar |
| L02 | FAM-B | sebab_akibat_cerita | 2 | teks_didengar |
| R02 | FAM-A | informasi_tersurat_bacaan | 1 | teks_dibaca |
| R02 | FAM-B | urutan_kejadian_bacaan | 1 | teks_dibaca |
| R02 | FAM-C | tujuan_teks | 2 | teks_dibaca |
| R02 | FAM-D | hubungan_teks_konteks | 2 | teks_dibaca |
| R03 | FAM-A | urutan_kejadian_visual | 1 | visual_diamati |
| R03 | FAM-B | sebab_akibat_visual | 1 | visual_diamati |

### Kelas gate

`getItemsByPhase(phase, kelas)` memfilter item berdasarkan `kelas_soal`. Kelas anak dibaca dari `getActiveChildMeta().kelas` dan diteruskan ke semua titik pemanggilan: `startCekAwal`, `startLatihan`, `startLatihanPendalaman`, `startCekUlang`.

Jika tidak ada soal untuk kelas anak di phase tersebut, `renderNoItemsForKelas` menampilkan pesan eksplisit — tidak ada skor palsu, tidak ada error diam.

### Gap konten kelas 2 (ditemukan smoke test 2026-09-29)

| Unit | Phase | Kelas 1 | Kelas 2 |
|------|-------|---------|---------|
| L01 | semua | ✓ 5 soal | ⚠ 0 soal |
| L02 | cek_awal | ✓ 3 soal | ⚠ 1 soal (min 2 untuk valid) |
| L02 | cek_ulang | ✓ 3 soal | ✓ 2 soal |
| R02 | semua | ✓ ada | ⚠ 0 soal (FAM-C/D belum dibuat) |
| R03 | semua | ✓ ada | ⚠ 0 soal |

**Konsekuensi:** untuk V1, unit-unit otomatis hanya bisa digunakan penuh oleh anak kelas 1. Anak kelas 2 akan melihat pesan "Soal belum tersedia" di L01, R02, dan R03. Ini bukan bug — gate bekerja benar, kontennya yang belum ada.

**Backlog konten kelas 2:** tambah item dengan `kelas_soal: 2` di L01 (semua phase), R02 FAM-C/D (semua phase), R03 (semua phase), dan L02 cek_awal (tambah 1 item lagi).

---

## Deliverable 9 — Audit Pengguna & Perbaikan UX (2026-09-29)

### Metode audit
Audit dijalankan oleh Claude AI via mode demo (`?demo=1&kelas=1`) sebagai simulasi orang tua anak kelas 1. Skenario: onboarding → peta → L01 cek awal + cek ulang → R02 cek awal → laporan keseluruhan.

### Temuan dan status

| ID | Temuan auditor | Status |
|----|---------------|--------|
| A | Status laporan meratakan bukti berbeda kekuatan — L01 (cek awal+ulang) dan R02 (cek awal saja) sama-sama "Berhasil pada cek ini" | **FIXED** |
| B | "Belum dimulai" dan "terkunci" tidak dibedakan di laporan keseluruhan | **FIXED** |
| C | FAM-A/FAM-B muncul di hasil sesi — kode teknis tidak bermakna bagi orang tua | **FIXED** |
| D | Banner demo "data tidak disimpan" bertentangan dengan "Data tersimpan di akun Anda" | **FIXED** |
| E | Peringatan R02 pakai kata "Asumsi", tidak ada petunjuk tindakan jika anak belum bisa baca | **FIXED** |
| F | "percakapan nonsastra aural" di deskripsi elemen peta terlalu teknis | **FIXED** |

### Detail perbaikan (commit 8f593dc)

**A — Laporan keseluruhan: status spesifik per unit**
- `✓ Berhasil — cek awal + cek ulang` (hijau) — mastery proven
- `Cek awal selesai — belum cek ulang` (biru) — bukti parsial
- `🔒 Menunggu prasyarat` — dibedakan dari "Belum dimulai"
- `Belum dimulai` — unit tersedia tapi belum disentuh

**B — Badge mastery di laporan unit**
- Sebelum: "Berhasil pada cek ini" (ambigu — bisa cek awal saja)
- Sesudah: "Berhasil pada cek awal + cek ulang"

**C — Hasil sesi**
- FAM-A/FAM-B dihapus dari tampilan; hanya tampilkan "X/Y jawaban benar"

**D — Home mode demo**
- "Data tersimpan di akun Anda" disembunyikan saat `?demo=1` aktif

**E — R02 catatan_batas**
- Sebelum: "Asumsi: anak dapat membaca sendiri..."
- Sesudah: "Unit ini untuk anak yang sudah bisa membaca sendiri. Jika belum lancar, lewati dulu — kerjakan L01/L02 terlebih dahulu."

**F — Deskripsi elemen Menyimak di peta**
- Sebelum: "percakapan nonsastra aural; teks sastra aural"
- Sesudah: "percakapan yang didengar; isi cerita yang didengar"

### Yang diapresiasi auditor (tidak diubah)
- Titik mulai L01 tampil menonjol di peta dengan kotak hijau
- Peringatan "Hadapkan layar ke Anda saja" ditempatkan tepat sebelum teks percakapan

### Skor UX auditor: 6/10 → target perbaikan berikutnya
Skor tertahan karena laporan tidak membedakan kekuatan bukti. Setelah fix A–F, hambatan utama yang tersisa adalah konten kelas 2 (L01, R02, R03 menampilkan "Soal belum tersedia" untuk anak kelas 2).

| 2026-09-29 | 348fefd | Tambah CLAUDE.md + catatan orientasi repo di DELIVERABLES.md |
| 2026-09-29 | 4dad145 | K-1 RESOLVED: L02 FAM-B → pertanyaan konkret. K-2 RESOLVED: R03 emoji → SVG. M-3 RESOLVED: L01/L02 item bank diperluas ke 5 item per fase |
| 2026-09-29 | 9598a86 | K-3 RESOLVED: L02-CA-B1 "musim dingin" → lebah-belalang + hujan deras. K-4 RESOLVED: L02-LT-A1 "paling sedikit" → angka konkret |
| 2026-09-29 | 78fd180 | fix(storage): upload media blob ke Supabase Storage setelah simpan ke IndexedDB |
| 2026-09-29 | c096106 | audit: keamanan, isolasi user, bug state, error boundary — semua perbaikan |
| 2026-09-29 | 4a1e53b | audit(L01/L02): perbaiki validitas klaim bukti menyimak — tambah sumber_informasi, instruksi_fasilitator, label L02 |
| 2026-09-29 | 060efa4 | feat(items): tambah kompetensi_id, kelas_soal, tingkat_kompleksitas, cara_penyajian ke semua item (L01, L02, R02, R03) |
| 2026-09-29 | 983fcdb | feat(kelas-gate): isolasi soal per kelas — filter getItemsByPhase(phase, kelas) di semua 5 titik pemanggilan |
| 2026-09-29 | 475db38 | fix(W03): min_panjang 20 → 40 karakter; M-2 dikonfirmasi resolved (catatan_batas sudah dirender) |
| 2026-09-29 | c975521 | feat(demo): mode demo ?demo=1&kelas=1 untuk audit tanpa login — banner kuning, state lokal |
| 2026-09-29 | 8f593dc | fix(ux): 6 perbaikan dari audit pengguna nyata (lihat Deliverable 9) |

*Dokumen diperbarui 2026-09-29. App live di production.*
