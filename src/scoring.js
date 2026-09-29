/**
 * Scoring engine — deterministic
 *
 * Prinsip: AI may generate content; deterministic rules decide academic state.
 */

export const OUTCOME = {
  TERLIHAT_BISA:    'TERLIHAT_BISA',
  MASIH_BELAJAR:    'MASIH_BELAJAR',
  BUKTI_BELUM_CUKUP: 'BUKTI_BELUM_CUKUP',
  BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS: 'BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS',
  TUGAS_GAGAL_BERJALAN: 'TUGAS_GAGAL_BERJALAN',
  DINILAI_ORANG_TUA_BISA: 'DINILAI_ORANG_TUA_BISA',
  DINILAI_ORANG_TUA_PERLU_LATIHAN: 'DINILAI_ORANG_TUA_PERLU_LATIHAN',
};

export const MASTERY_THRESHOLD = 0.80;

/**
 * Menilai satu sesi AUTO/AUDIO_GATED.
 */
export function scoreSession(responses, itemsInSession) {
  if (!responses || responses.length === 0) {
    return { outcome: OUTCOME.BUKTI_BELUM_CUKUP, totalItems: 0, correctItems: 0, ratio: null };
  }
  if (responses.length < 2) {
    return { outcome: OUTCOME.BUKTI_BELUM_CUKUP, totalItems: responses.length, correctItems: 0, ratio: null };
  }

  const totalItems = responses.length;
  const correctItems = responses.filter(r => r.isCorrect).length;
  const ratio = correctItems / totalItems;

  const familyMap = {};
  for (const r of responses) {
    if (!familyMap[r.family]) familyMap[r.family] = { correct: 0, total: 0 };
    familyMap[r.family].total++;
    if (r.isCorrect) familyMap[r.family].correct++;
  }
  const anyFamilyZero = Object.values(familyMap).some(f => f.correct === 0);

  const outcome = (ratio >= MASTERY_THRESHOLD && !anyFamilyZero)
    ? OUTCOME.TERLIHAT_BISA
    : OUTCOME.MASIH_BELAJAR;

  return { outcome, totalItems, correctItems, ratio, familyBreakdown: familyMap, anyFamilyZero };
}

/**
 * Keputusan mastery untuk unit AUTO.
 * Label dijaga agar tidak menyatakan lebih dari yang bisa dibuktikan.
 */
export function decideMastery(cekAwalResult, cekUlangResult) {
  if (!cekAwalResult || !cekUlangResult) {
    return { masteryProven: false, reason: 'Salah satu atau kedua hasil tidak tersedia.' };
  }
  if (cekUlangResult.outcome === OUTCOME.TERLIHAT_BISA) {
    return {
      masteryProven: true,
      reason: `Cek ulang: ${cekUlangResult.correctItems} dari ${cekUlangResult.totalItems} soal dijawab benar, dengan soal baru yang berbeda dari cek awal.`,
    };
  }
  const pct = Math.round((cekUlangResult.ratio ?? 0) * 100);
  const wrongFamily = cekUlangResult.anyFamilyZero
    ? ' Ada jenis soal yang belum terjawab dengan benar.'
    : '';
  return {
    masteryProven: false,
    reason: `Cek ulang: ${cekUlangResult.correctItems} dari ${cekUlangResult.totalItems} soal dijawab benar (${pct}%).${wrongFamily} Anak perlu lebih banyak latihan sebelum cek ini dianggap berhasil.`,
  };
}

/**
 * Root gap: unit pertama yang belum dikuasai dan prasyaratnya terpenuhi.
 * Parent verdict 'BISA' dianggap setara dengan TERLIHAT_BISA untuk prasyarat.
 */
export function findRootGap(unitStates, units) {
  const mastered = new Set(
    Object.entries(unitStates)
      .filter(([, v]) => v === OUTCOME.TERLIHAT_BISA || v === OUTCOME.DINILAI_ORANG_TUA_BISA)
      .map(([k]) => k)
  );

  for (const unit of units) {
    if (mastered.has(unit.id)) continue;
    const prereqsSatisfied = unit.prerequisite.every(id => mastered.has(id));
    if (prereqsSatisfied) return unit.id;
  }
  return null;
}

export function getOutcomeLabel(outcome) {
  switch (outcome) {
    case OUTCOME.TERLIHAT_BISA:    return 'Berhasil pada cek ini';
    case OUTCOME.MASIH_BELAJAR:    return 'Masih dalam proses belajar';
    case OUTCOME.BUKTI_BELUM_CUKUP: return 'Bukti belum cukup';
    case OUTCOME.BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS:
      return 'Bukti terkumpul — menunggu penilaian orang tua';
    case OUTCOME.TUGAS_GAGAL_BERJALAN: return 'Tugas gagal berjalan';
    case OUTCOME.DINILAI_ORANG_TUA_BISA: return 'Dinilai orang tua: Sudah bisa';
    case OUTCOME.DINILAI_ORANG_TUA_PERLU_LATIHAN: return 'Dinilai orang tua: Perlu latihan lagi';
    default: return 'Belum diperiksa';
  }
}
