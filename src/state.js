/**
 * State management — localStorage-backed
 *
 * Schema state:
 * {
 *   childName: string,
 *   kelas: string,
 *   createdAt: ISO string,
 *   units: {
 *     [unitId]: {
 *       cekAwal: SessionResult | null,
 *       latihan: { responses: Response[] } | null,
 *       cekUlang: SessionResult | null,
 *       masteryDecision: MasteryDecision | null,
 *       visitClosed: boolean,
 *       collectEvidence: CollectEvidence[] | null,
 *     }
 *   },
 *   progressLog: ProgressEvent[],
 * }
 *
 * SessionResult: { outcome, totalItems, correctItems, ratio, familyBreakdown, scoredAt }
 * ProgressEvent: { eventType, unitId, data, timestamp }
 * CollectEvidence: { taskId, type, payload, collectedAt }
 *
 * Pemisahan: state akademik TIDAK diubah oleh payment.
 * (MVP ini belum ada payment — entitlement bukan bagian state akademik)
 */

const STORAGE_KEY = 'plps_bi_kelas1_state';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function save(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage tidak tersedia — state tidak bertahan setelah reload
    console.warn('localStorage tidak tersedia. State tidak akan tersimpan.');
  }
}

export function getState() {
  return load() ?? newState();
}

function newState() {
  return {
    childName: '',
    kelas: '',
    createdAt: new Date().toISOString(),
    units: {},
    progressLog: [],
  };
}

export function saveProfile(childName, kelas) {
  const s = getState();
  s.childName = childName;
  s.kelas = kelas;
  logEvent(s, 'profile_set', null, { childName, kelas });
  save(s);
}

export function getUnitState(unitId) {
  const s = getState();
  return s.units[unitId] ?? {
    cekAwal: null,
    latihan: null,
    cekUlang: null,
    masteryDecision: null,
    visitClosed: false,
    collectEvidence: null,
  };
}

export function saveCekAwal(unitId, sessionResult) {
  const s = getState();
  if (!s.units[unitId]) s.units[unitId] = {};
  s.units[unitId].cekAwal = { ...sessionResult, scoredAt: new Date().toISOString() };
  logEvent(s, 'cek_awal_completed', unitId, { outcome: sessionResult.outcome });
  save(s);
}

export function saveLatihanResponses(unitId, responses) {
  const s = getState();
  if (!s.units[unitId]) s.units[unitId] = {};
  s.units[unitId].latihan = { responses, savedAt: new Date().toISOString() };
  save(s);
}

export function saveCekUlang(unitId, sessionResult) {
  const s = getState();
  if (!s.units[unitId]) s.units[unitId] = {};
  s.units[unitId].cekUlang = { ...sessionResult, scoredAt: new Date().toISOString() };
  logEvent(s, 'cek_ulang_completed', unitId, { outcome: sessionResult.outcome });
  save(s);
}

export function saveMasteryDecision(unitId, decision) {
  const s = getState();
  if (!s.units[unitId]) s.units[unitId] = {};
  s.units[unitId].masteryDecision = { ...decision, decidedAt: new Date().toISOString() };
  if (decision.masteryProven) {
    logEvent(s, 'mastery_proven', unitId, decision);
  }
  save(s);
}

export function saveCollectEvidence(unitId, evidence) {
  const s = getState();
  if (!s.units[unitId]) s.units[unitId] = {};
  if (!s.units[unitId].collectEvidence) s.units[unitId].collectEvidence = [];
  s.units[unitId].collectEvidence.push({ ...evidence, collectedAt: new Date().toISOString() });
  logEvent(s, 'collect_evidence_saved', unitId, { taskId: evidence.taskId, type: evidence.type });
  save(s);
}

export function closeVisit(unitId) {
  const s = getState();
  if (!s.units[unitId]) s.units[unitId] = {};
  s.units[unitId].visitClosed = true;
  logEvent(s, 'visit_closed', unitId, {});
  save(s);
}

export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

function logEvent(state, eventType, unitId, data) {
  state.progressLog.push({
    eventType,
    unitId,
    data,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Kembalikan semua unit states dalam format { unitId: outcome | null }
 * untuk dipakai oleh scoring.findRootGap()
 */
export function getAllUnitOutcomes() {
  const s = getState();
  const result = {};
  for (const [unitId, unitState] of Object.entries(s.units)) {
    if (unitState.masteryDecision?.masteryProven) {
      result[unitId] = 'TERLIHAT_BISA';
    } else if (unitState.cekAwal?.outcome) {
      result[unitId] = unitState.cekAwal.outcome;
    } else {
      result[unitId] = null;
    }
  }
  return result;
}
