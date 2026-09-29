# PLPS Business Journey — Jalur CP
## V1.1 — 2026-09-29 (direvisi sesuai implementasi)

---

## Fondasi: Mengapa Jalur CP

Jalur domain (Numerasi/Literasi) valid secara akademik tetapi asing bagi orang tua.
Jalur CP (Kelas → CP → Elemen → Kompetensi) mengikuti bahasa yang sudah dikenal:
kurikulum sekolah anak mereka. Ini bukan hanya UX decision — ini alignment fundamental
antara apa yang sekolah harapkan dan apa yang PLPS buktikan.

**Scope V1 ini:**
- Kelas 1–2 SD (Fase A, Kurikulum Merdeka)
- Mata pelajaran: Bahasa Indonesia
- Elemen: semua 4 elemen CP Fase A

---

## Struktur Kompetensi: Bahasa Indonesia Fase A

### Empat Elemen CP Bahasa Indonesia Fase A

```
CP Bahasa Indonesia Fase A (Kelas 1–2)
├── Elemen 1: Menyimak                           [L01, L02]
├── Elemen 2: Membaca dan Memirsa                [R01, R02, R03]
├── Elemen 3: Berbicara dan Mempresentasikan     [S01–S08]
└── Elemen 4: Menulis                            [W01–W03]
```

### Unit per Elemen dan Cara Pengukurannya

Terdapat dua jenis unit berdasarkan cara pengukuran:

**OTOMATIS** — sistem menilai sendiri berdasarkan pilihan jawaban:

| Unit | Elemen | Yang Diukur |
|------|--------|-------------|
| L01 | Menyimak | Informasi tersurat + topik dari percakapan yang didengar |
| L02 | Menyimak | Informasi tersurat + sebab-akibat dari cerita yang didengar |
| R02 | Membaca & Memirsa | Informasi tersurat + sebab-akibat + tujuan teks dari bacaan |
| R03 | Membaca & Memirsa | Urutan kejadian + sebab-akibat dari rangkaian gambar |

**COLLECT** — orang tua mengumpulkan dan menilai bukti karya anak:

| Unit | Elemen | Yang Diukur |
|------|--------|-------------|
| R01 | Membaca & Memirsa | Membaca kata sederhana dengan suara |
| S01–S08 | Berbicara & Mempresentasikan | Berbagai kompetensi lisan (tanya, jawab, cerita, presentasi) |
| W01–W03 | Menulis | Berbagai kompetensi menulis |

**Catatan tentang batas digital assessment:**
Unit OTOMATIS mengukur pemahaman melalui pilihan jawaban — valid untuk kompetensi
pemahaman (apa, siapa, mengapa, bagaimana urutan). Kompetensi yang memerlukan
observasi cara anak berbicara, membaca keras, atau menulis tidak dapat dinilai
dari pilihan jawaban; itulah sebabnya R01, S01–S08, dan W01–W03 menggunakan
model COLLECT: bukti dikumpulkan (rekaman suara atau foto tulisan) dan dinilai
langsung oleh orang tua dengan panduan dari sistem.

---

## Struktur Diagnostic per Unit

Setiap unit OTOMATIS menggunakan siklus empat fase yang sama:

```
CEK AWAL
  → Soal diagnostik awal (tanpa bantuan)
  → Sistem menilai otomatis

  Jika hasil CEK AWAL ≥ threshold:
    → LATIHAN PENDALAMAN (soal lebih dalam / kompleksitas lebih tinggi)
    → LATIHAN MANDIRI
    → CEK ULANG (soal baru, konteks baru)
    → Mastery decision

  Jika hasil CEK AWAL < threshold:
    → LATIHAN PENGUATAN (soal lebih mudah + umpan balik per jawaban)
    → LATIHAN MANDIRI
    → CEK ULANG (soal baru, konteks baru)
    → Mastery decision
```

Unit COLLECT menggunakan siklus serupa tetapi buktinya berupa karya anak
(rekaman / foto) yang dikumpulkan per tugas, bukan pilihan jawaban.

**Jumlah soal per fase (unit OTOMATIS):**

| Unit | Cek Awal | Latihan | Latihan Mandiri | Cek Ulang |
|------|----------|---------|----------------|-----------|
| L01 | 5 soal | 5 soal | 5 soal | 5 soal |
| L02 | 3 soal | 3 soal | 3 soal | 3 soal |
| R02 | 2 soal | 3 soal | 3 soal | 3 soal |
| R03 | 2 soal | 3 soal | 3 soal | 3 soal |

Jumlah soal sama antara Kelas 1 dan Kelas 2 untuk setiap unit dan fase.

**Mastery threshold (unit OTOMATIS):**
- ≥ 60% benar di cek ulang → mastery proven
- Ditampilkan sebagai: "Berhasil pada cek awal + cek ulang" atau
  "Berhasil pada cek ulang setelah berlatih" — tergantung riwayat

---

## Core Loop yang Tidak Boleh Rusak

```
KELAS ANAK
  → DIAGNOSTIC GRATIS (semua elemen, semua unit)
  → ROOT GAP (unit paling awal dalam prerequisite chain yang belum dikuasai)
  → OFFER (produk untuk root gap)
  → PAYMENT → ENTITLEMENT
  → INTERVENTION (sesi per kompetensi)
  → REASSESSMENT (bukti before/after)
  → MASTERY PROVEN
  → NEXT TARGET (unit berikutnya dalam chain)
  → REPEAT PURCHASE
  ↺
```

---

## Perjalanan Pengguna Lengkap

### Tahap 0 — Akuisisi dan Masuk

**Pemicu orang tua:**
- Anak kesulitan membaca, menyimak, berbicara, atau menulis
- Nilai Bahasa Indonesia di bawah ekspektasi
- Guru memberi catatan "perlu perhatian"
- Orang tua ingin tahu di mana posisi anak sebelum naik kelas

**Entry point (implementasi saat ini):**
- Orang tua masuk menggunakan akun Google
- Mendaftarkan nama anak dan kelas (1 atau 2 SD)
- Dapat mendaftarkan lebih dari satu anak dalam satu akun
- Setiap anak memiliki state diagnostik yang terisolasi

**Catatan:** Model entry dengan akun adalah keputusan yang disengaja untuk
memastikan data anak tersimpan secara permanen dan dapat diakses lintas sesi.
Ini berbeda dari model "tanpa akun" yang dipertimbangkan sebelumnya.

---

### Tahap 1 — Diagnostic (semua elemen)

**Yang diukur per elemen:**

*Menyimak (L01, L02):*
- Informasi tersurat dari percakapan dan cerita yang didengar
- Topik, sebab-akibat dari cerita lisan

*Membaca dan Memirsa (R01, R02, R03):*
- Membaca kata keras (COLLECT — dinilai orang tua)
- Informasi tersurat, sebab-akibat, tujuan teks dari bacaan
- Urutan kejadian dan sebab-akibat dari rangkaian visual

*Berbicara dan Mempresentasikan (S01–S08):*
- Kompetensi lisan: mengajukan pertanyaan, menjawab, bercerita, presentasi (COLLECT)

*Menulis (W01–W03):*
- Kompetensi menulis: kata, kalimat, teks pendek (COLLECT)

**Signal yang dihasilkan per unit:**
- `TERLIHAT_BISA`: hasil cek awal ≥ threshold, dikonfirmasi cek ulang
- `MASIH_BELAJAR`: hasil cek ulang < threshold setelah latihan
- `MASTERY_PROVEN`: berhasil di cek ulang (dengan atau tanpa latihan dahulu)
- `BELUM_DIMULAI`: unit belum dikerjakan

**Prerequisite antar unit:**
Unit-unit dalam satu elemen memiliki urutan prerequisite. Unit berikutnya
hanya terbuka jika unit sebelumnya sudah mastery. Prerequisite dihormati
secara sistem — tidak bisa dilangkahi.

---

### Tahap 2 — Root Gap

**Definisi root gap:**
Unit paling awal dalam prerequisite chain yang belum mastery.

**Yang ditampilkan ke orang tua:**
Bukan skor angka. Kalimat konkret berbasis unit dan elemen:
> "Dari yang kami periksa, [nama] terlihat bisa memahami informasi dari
> bacaan yang ia dengar. Memahami urutan kejadian dari gambar belum terlihat —
> ini yang perlu diperkuat terlebih dahulu."

**Yang tidak ditampilkan:**
- Persentase (misleading untuk jumlah soal yang terbatas)
- Label "gagal" atau "tidak bisa"
- Perbandingan dengan anak lain

---

### Tahap 3 — Offer *(belum dibangun)*

**Produk berbasis unit, bukan "paket kelas":**

| Produk | Isi |
|--------|-----|
| Penguatan [unit] — Kelas [X] B. Indonesia | Intervention untuk satu unit spesifik |
| Bundle Menyimak Kelas 1 | L01 + L02 lengkap |
| Bundle Membaca & Memirsa Kelas 1 | R01–R03 lengkap |
| Bundle Lengkap Bahasa Indonesia Kelas 1 | Semua elemen |

**Framing offer:**
> "Kami siapkan latihan bertahap untuk membantu [nama] memahami urutan
> kejadian dalam rangkaian gambar. Ada 3 sesi, masing-masing 15–20 menit."

**Yang tidak boleh dilakukan:**
- Menjual "akses belajar" tanpa tujuan kompetensi spesifik
- Menjanjikan naik nilai atau ranking
- Membundel terlalu banyak sebelum mastery loop terbukti

---

### Tahap 4 — Entitlement setelah Pembayaran *(belum dibangun)*

Payment success → unlock sesi intervention untuk unit yang dibeli.
Payment TIDAK mengubah kompetensi state anak.
Academic state hanya berubah melalui assessment dan rule engine.

---

### Tahap 5 — Intervention *(sebagian sudah dibangun sebagai latihan)*

**Struktur satu sesi (per unit):**
```
1. Cek awal — soal diagnostik tanpa bantuan
2. Latihan penguatan / pendalaman — soal dengan feedback per jawaban
3. Latihan mandiri — soal tanpa bantuan (ini yang jadi evidence)
4. Cek ulang — soal baru, konteks baru → mastery decision
```

Struktur ini sudah berjalan untuk unit OTOMATIS (L01, L02, R02, R03).
Unit COLLECT (R01, S01–S08, W01–W03) menggunakan model pengumpulan
bukti yang dinilai orang tua.

**Prinsip konten:**
- Konteks personal dan dekat kehidupan anak
- Bahasa beban rendah — kosakata tidak jadi hambatan
- Scaffold menurun: bantuan tinggi di awal, menurun di latihan mandiri

---

### Tahap 6 — Mastery Evidence

**Format:**
- Soal cek ulang berbeda dari cek awal (item bank terpisah)
- Konteks berbeda
- Minimal 2–5 soal tergantung unit

**Before/after proof:**
```
Snapshot sebelum: hasil cek awal
Snapshot sesudah: hasil cek ulang
Selisih inilah yang dijual — bukan durasi belajar, bukan jumlah soal
```

**Yang ditampilkan ke orang tua:**
> "[Nama] sebelumnya belum bisa memahami urutan kejadian dari gambar.
> Setelah berlatih, [nama] menjawab 3 dari 3 soal cek ulang dengan benar.
> Kompetensi ini sekarang terlihat dikuasai."

Label yang digunakan sistem saat ini:
- "Berhasil pada cek awal + cek ulang" — mastery sejak awal
- "Berhasil pada cek ulang setelah berlatih" — perlu latihan dulu

**Yang tidak boleh diklaim:**
- Mastery dari satu soal atau satu sesi
- "Nilai akan naik" sebagai konsekuensi mastery
- Klaim permanen tanpa reassessment berkala

---

### Tahap 7 — Next Target + Repeat Purchase *(belum dibangun)*

**Setelah satu unit mastery:**
Unlock unit berikutnya dalam prerequisite chain.

```
L01 mastery → unlock L02
L02 mastery → unlock elemen lain (sesuai chain)
Semua unit satu elemen mastery → "Elemen [X] Kelas 1 selesai"
  → Offer: elemen berikutnya, atau unit Kelas 2 yang setara
```

**North-star event V1:** `mastery_proven`
**Metrik bisnis paling penting:** `repeat_purchase_after_mastery`

---

## Pemisahan Domain yang Tidak Boleh Dicampur

```
ACADEMIC STATE    KompetensiState, CPState, ElemenState, Prerequisite
COMMERCIAL STATE  Entitlement, Order, Payment, Product
```

Payment success hanya boleh mengubah commercial state.
Academic state hanya berubah melalui assessment dan rule engine.

---

## Pemisahan Logic

```
DETERMINISTIC   scoring, mastery threshold, prerequisite check, root gap,
                progression, unlock, reassessment rule, next target eligibility

AI-ASSISTED     variasi stimulus dari template, variasi konteks soal,
                penjelasan alternatif, feedback bahasa, ringkasan perkembangan
```

Prinsip: **AI may generate content; deterministic rules decide academic state.**

---

## Invariant Produk

```
INV-01  content_completed ≠ mastery_proven
INV-02  payment_success → entitlement SAJA, bukan academic_state
INV-03  prerequisite kompetensi wajib dihormati sebelum unlock
INV-04  kelas anak ≠ kompetensi_state anak
INV-05  mastery_proven hanya valid jika ada baseline_snapshot + reassessment ≥ threshold
INV-06  next_target hanya dari prerequisite chain, bukan acak
INV-07  semua state transition harus auditable
INV-08  normal flow harus berjalan tanpa operator manual per anak
```

---

## Status Implementasi

```
✅ SELESAI
  P0  Struktur CP       (CP, Elemen, Unit, Prerequisite — Fase A B. Indonesia)
  P1  Diagnostic        (semua 4 elemen, Kelas 1 & 2, item bank seimbang)
      ├─ Unit OTOMATIS  L01, L02, R02, R03 — cek_awal → latihan → cek_ulang → mastery
      ├─ Unit COLLECT   R01, S01–S08, W01–W03 — collect evidence, parent verdict
      ├─ Auth           Google OAuth, multi-anak per akun
      ├─ State          localStorage + Supabase (RLS per parent_id)
      ├─ Dashboard      peta unit, laporan per anak, penilaian bukti orang tua
      └─ Deploy         Cloudflare Workers, live di plps-bi-kelas1.parentingtangguh.workers.dev

🔲 BELUM DIBANGUN
  P2  Commerce          (produk per unit, checkout, payment gateway, entitlement)
  P3  Intervention      (sesi berbayar yang terkunci di balik entitlement)
  P4  Evidence lanjutan (upload media otomatis ke cloud, before/after report narasi)
  P5  Progression       (next target setelah mastery, offer repeat purchase)
  P6  Retensi           (notifikasi, pengingat jadwal, progress digest ke orang tua)
  P7  Ekspansi          (Mapel lain, Fase B, Kelas 3–6)
```

---

## Batas yang Harus Jujur Dikomunikasikan ke Orang Tua

1. **Unit OTOMATIS** mengukur pemahaman melalui pilihan jawaban — tidak mengukur
   cara anak melafalkan, berbicara, atau menulis secara langsung.

2. **Unit COLLECT** memerlukan keterlibatan aktif orang tua: merekam anak membaca
   atau berbicara, memfoto tulisan, dan menilai dengan panduan sistem.
   Tanpa keterlibatan ini, unit COLLECT tidak dapat diselesaikan.

3. **Hasil diagnostic** adalah gambaran kompetensi pada satu titik waktu dengan
   jumlah soal terbatas. Bukan pengganti asesmen formal sekolah.

4. **Mastery yang dibuktikan** adalah mastery pada kompetensi spesifik yang dilatih,
   bukan jaminan nilai rapor atau performa di asesmen sekolah.

---

## Definition of Done V1

Sistem dianggap siap untuk monetisasi jika perjalanan ini berjalan tanpa
operator manual (P0–P5 selesai):

```
orang tua baru
  → login Google → daftarkan nama + kelas anak    [✅ selesai]
  → diagnostic gratis semua elemen                [✅ selesai]
  → root gap teridentifikasi                      [✅ selesai]
  → offer ditampilkan                             [🔲 belum]
  → pembayaran berhasil → entitlement aktif       [🔲 belum]
  → intervention sesi berbayar                    [🔲 belum]
  → mastery_proven (atau: offer sesi tambahan)    [🔲 belum]
  → laporan before/after narasi ke orang tua      [🔲 belum]
  → next target ditawarkan → repeat purchase      [🔲 belum]
```

---

*V1.1 — direvisi 2026-09-29. Mencerminkan implementasi aktual P0–P1.*
*P2–P7 adalah roadmap yang belum dibangun.*
*Scope Numerasi/Literasi (jalur domain) di-freeze sampai ada keputusan eksplisit.*
