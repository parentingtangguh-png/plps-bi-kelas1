/**
 * Scoring engine — deterministic
 *
 * Prinsip: AI may generate content; deterministic rules decide academic state.
 *
 * Outcome yang mungkin per sesi:
 *   TERLIHAT_BISA           — signal jelas, ≥80% benar, tidak ada family kosong
 *   MASIH_BELAJAR           — signal jelas, <80% benar atau ada family kosong
 *   BUKTI_BELUM_CUKUP       — terlalu sedikit respons untuk diputuskan
 *   BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS — unit COLLECT
 *   TUGAS_GAGAL_BERJALAN    — audio/gambar gagal dimuat
 */

export const OUTCOME = {
  TERLIHAT_BISA:    'TERLIHAT_BISA',
  MASIH_BELAJAR:    'MASIH_BELAJAR',
  BUKTI_BELUM_CUKUP: 'BUKTI_BELUM_CUKUP',
  BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS: 'BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS',
  TUGAS_GAGAL_BERJALAN: 'TUGAS_GAGAL_BERJALAN',
};

export const MASTERY_THRESHOLD = 0.80; // 80%

/**
 * Menilai satu sesi AUTO/AUDIO_GATED.
 *
 * @param {Array} responses - [{itemId, family, isCorrect}]
 * @param {Array} itemsInSession - item bank untuk sesi ini (untuk verifikasi)
 * @returns {{ outcome, totalItems, correctItems, familyBreakdown, ratio }}
 */
export function scoreSession(responses, itemsInSession) {
  if (!responses || responses.length === 0) {
    return { outcome: OUTCOME.BUKTI_BELUM_CUKUP, totalItems: 0, correctItems: 0, ratio: null };
  }

  // Minimal 2 item untuk mengambil keputusan
  if (responses.length < 2) {
    return { outcome: OUTCOME.BUKTI_BELUM_CUKUP, totalItems: responses.length, correctItems: 0, ratio: null };
  }

  const totalItems = responses.length;
  const correctItems = responses.filter(r => r.isCorrect).length;
  const ratio = correctItems / totalItems;

  // Family breakdown: apakah ada family dengan 0 benar?
  const familyMap = {};
  for (const r of responses) {
    if (!familyMap[r.family]) familyMap[r.family] = { correct: 0, total: 0 };
    familyMap[r.family].total++;
    if (r.isCorrect) familyMap[r.family].correct++;
  }

  const anyFamilyZero = Object.values(familyMap).some(f => f.correct === 0);

  let outcome;
  if (ratio >= MASTERY_THRESHOLD && !anyFamilyZero) {
    outcome = OUTCOME.TERLIHAT_BISA;
  } else {
    outcome = OUTCOME.MASIH_BELAJAR;
  }

  return {
    outcome,
    totalItems,
    correctItems,
    ratio,
    familyBreakdown: familyMap,
    anyFamilyZero,
  };
}

/**
 * Keputusan mastery: membandingkan hasil cek_awal dan cek_ulang.
 *
 * Mastery hanya valid jika:
 * 1. Ada baseline_snapshot (cek_awal tersimpan sebelum latihan)
 * 2. Reassessment (cek_ulang) menghasilkan TERLIHAT_BISA
 * 3. Bahan cek_ulang berbeda dari bahan cek_awal
 *
 * @param {Object} cekAwalResult - hasil dari scoreSession untuk cek_awal
 * @param {Object} cekUlangResult - hasil dari scoreSession untuk cek_ulang
 * @returns {{ masteryProven, reason }}
 */
export function decideMastery(cekAwalResult, cekUlangResult) {
  if (!cekAwalResult || !cekUlangResult) {
    return { masteryProven: false, reason: 'Salah satu atau kedua hasil tidak tersedia.' };
  }

  if (cekUlangResult.outcome === OUTCOME.TERLIHAT_BISA) {
    return {
      masteryProven: true,
      reason: `Cek ulang: ${cekUlangResult.correctItems}/${cekUlangResult.totalItems} benar (${Math.round(cekUlangResult.ratio * 100)}%). Semua keluarga soal memiliki jawaban benar.`,
    };
  }

  return {
    masteryProven: false,
    reason: `Cek ulang: ${cekUlangResult.correctItems}/${cekUlangResult.totalItems} benar (${Math.round((cekUlangResult.ratio ?? 0) * 100)}%). Belum memenuhi threshold 80% atau ada keluarga soal dengan 0 benar.`,
  };
}

/**
 * Menentukan root gap dari daftar unit states.
 * Root gap = unit paling awal dalam prerequisite chain yang belum TERLIHAT_BISA.
 *
 * @param {Object} unitStates - { unitId: outcome | null }
 * @param {Array} units - daftar semua unit dari cp.js
 * @returns { rootGapUnitId | null }
 */
export function findRootGap(unitStates, units) {
  // Cari unit yang belum dikuasai dan prerequisite-nya sudah dikuasai (atau tidak ada)
  for (const unit of units) {
    const state = unitStates[unit.id];
    if (state === OUTCOME.TERLIHAT_BISA) continue; // sudah dikuasai

    // Periksa prerequisite
    const prereqsSatisfied = unit.prerequisite.every(
      prereqId => unitStates[prereqId] === OUTCOME.TERLIHAT_BISA
    );

    if (prereqsSatisfied) {
      return unit.id; // ini root gap
    }
  }
  return null;
}

/**
 * Label output yang ditampilkan ke orang tua/anak.
 */
export function getOutcomeLabel(outcome) {
  switch (outcome) {
    case OUTCOME.TERLIHAT_BISA:
      return 'Terlihat bisa pada aspek yang diperiksa';
    case OUTCOME.MASIH_BELAJAR:
      return 'Masih belajar pada aspek yang diperiksa';
    case OUTCOME.BUKTI_BELUM_CUKUP:
      return 'Bukti belum cukup';
    case OUTCOME.BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS:
      return 'Bukti terkumpul — belum dapat dinilai otomatis';
    case OUTCOME.TUGAS_GAGAL_BERJALAN:
      return 'Tugas gagal berjalan';
    default:
      return 'Belum diperiksa';
  }
}
