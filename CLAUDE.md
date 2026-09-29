# PLPS — Bahasa Indonesia Kelas 1

## PENTING: Orientasi repo

```
Repo aktif   : D:\ribuan_pengguna\CLAUDE\plps-bi-kelas1\
GitHub       : https://github.com/parentingtangguh-png/plps-bi-kelas1
Deploy       : https://plps-bi-kelas1.parentingtangguh.workers.dev
Branch       : master
Stack        : Vanilla HTML/CSS/JS — tidak ada framework, tidak ada build step
```

**Repo lain yang ada di mesin ini (jangan campur):**

| Folder | GitHub | Status |
|--------|--------|--------|
| `D:\ribuan_pengguna\CLAUDE\plps` | `parentingtangguh-png/petakompetensianak` | FREEZE — Numerasi/Literasi kelas 3–6, bukan target kerja saat ini |

Jika diminta membaca `DELIVERABLES.md`, `CLAUDE.md`, atau file apapun — cari di **folder ini dulu**, bukan di `plps`.

---

## Produk

PLPS Bahasa Indonesia Kelas 1 — diagnostic kompetensi CP Fase A (Kelas 1–2).

**Scope V1:**
- Mata pelajaran: Bahasa Indonesia
- Fase: A (Kelas 1–2, Kurikulum Merdeka)
- Elemen prioritas: semua 4 elemen (Menyimak, Membaca & Memirsa, Berbicara & Mempresentasikan, Menulis)

**Unit dan status otomasi — ringkasan:**
- Otomatis penuh: L01, L02, R02, R03
- Hanya kumpulkan bukti (COLLECT): R01, S01–S08, W01–W03

Detail lengkap: lihat `DELIVERABLES.md`.

---

## Cara menjalankan

```bash
npx serve D:/ribuan_pengguna/CLAUDE/plps-bi-kelas1 -p 3100
# buka http://localhost:3100/
```

Atau gunakan launch.json di `.claude/launch.json` repo ini (nama konfigurasi: `plps-bi-kelas1`).

---

## State

- **Auth**: Supabase Auth + Google OAuth
- **Database**: Supabase PostgreSQL — tabel `children` + `child_states`
- **localStorage**: write-through cache per anak — key `plps_bi_kelas1_state_{childId}`
- **Demo mode**: `?demo=1&kelas=1` atau `?demo=1&kelas=2` — bypass login, state lokal saja
- Rekaman audio & foto: IndexedDB (lokal) + Supabase Storage bucket `media`

---

## Status saat ini (2026-09-29)

Semua BLOCKER dan temuan kritis **sudah resolved**. Detail lengkap: lihat `DELIVERABLES.md`.

**Backlog terbuka:**
- U-4: L01 kelas 2 hanya 2 soal per cek — perlu tambah konten item (bukan bug, batas minimum scoring terpenuhi)
- Kelas 2: item bank L01/R02/R03 ada tapi tipis; perlu diperluas sebelum produksi skala besar
- IndexedDB tidak diisolasi per user (acceptable untuk 1 perangkat per keluarga)
- Tidak ada rate limiting Supabase (pantau saat scale)

---

## Invariant produk yang tidak boleh dilanggar

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

## Pemisahan domain yang tidak boleh dicampur

```
ACADEMIC STATE    KompetensiState, CPState, ElemenState, Prerequisite
COMMERCIAL STATE  Entitlement, Order, Payment, Product
```

Payment success hanya boleh mengubah commercial state. Academic state hanya berubah melalui assessment dan rule engine.
