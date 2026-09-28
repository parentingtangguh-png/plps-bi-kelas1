/**
 * State management
 *
 * Schema:
 * {
 *   childName, kelas, createdAt,
 *   units: {
 *     [unitId]: {
 *       // Unit AUTO/AUDIO_GATED
 *       cekAwal: SessionResult | null,
 *       latihan: { responses, savedAt } | null,
 *       cekUlang: SessionResult | null,
 *       masteryDecision: MasteryDecision | null,
 *       visitClosed: boolean,
 *       // Unit COLLECT — perjalanan dua fase + dua verdik
 *       collectEvidence: CollectEvidence[] | null,       // bukti cek_awal
 *       collectCekUlangEvidence: CollectEvidence[] | null, // bukti cek_ulang (bahan baru)
 *       parentVerdict: ParentVerdict | null,             // verdik fase 1
 *       parentVerdictCekUlang: ParentVerdict | null,     // verdik fase 2 (penentu mastery)
 *     }
 *   },
 *   progressLog: ProgressEvent[],
 * }
 *
 * ParentVerdict: { verdict: 'BISA'|'PERLU_LATIHAN', verdictAt: ISO }
 * CollectEvidence: { taskId, type, mediaId?, payload, collectedAt }
 *   mediaId: key ke IndexedDB untuk blob audio/foto
 */

const STORAGE_KEY = 'plps_bi_kelas1_state';

// ─── IndexedDB untuk media blobs ─────────────────────

const DB_NAME = 'plps_bi_kelas1_media';
const STORE_NAME = 'recordings';

function openMediaDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveMediaBlob(id, blob) {
  try {
    const db = await openMediaDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put({ id, blob, savedAt: new Date().toISOString() });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    return id;
  } catch (e) {
    console.warn('IndexedDB tidak tersedia — blob tidak tersimpan:', e);
    return null;
  }
}

export async function getMediaBlob(id) {
  try {
    const db = await openMediaDB();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(id);
      req.onsuccess = () => resolve(req.result?.blob ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

// ─── localStorage helpers ─────────────────────────────

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
    console.warn('localStorage tidak tersedia.');
  }
}

export function getState() {
  return load() ?? newState();
}

function newState() {
  return { childName: '', kelas: '', createdAt: new Date().toISOString(), units: {}, progressLog: [] };
}

export function saveProfile(childName, kelas) {
  const s = getState();
  s.childName = childName;
  s.kelas = kelas;
  logEvent(s, 'profile_set', null, { childName, kelas });
  save(s);
}

export function getUnitState(unitId) {
  return getState().units[unitId] ?? {
    cekAwal: null, latihan: null, cekUlang: null,
    masteryDecision: null, visitClosed: false,
    collectEvidence: null, collectCekUlangEvidence: null,
    parentVerdict: null, parentVerdictCekUlang: null,
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
  if (decision.masteryProven) logEvent(s, 'mastery_proven', unitId, decision);
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

export function saveParentVerdict(unitId, verdict) {
  const s = getState();
  if (!s.units[unitId]) s.units[unitId] = {};
  s.units[unitId].parentVerdict = { verdict, verdictAt: new Date().toISOString() };
  logEvent(s, 'parent_verdict_cek_awal', unitId, { verdict });
  save(s);
}

export function saveCollectCekUlangEvidence(unitId, evidence) {
  const s = getState();
  if (!s.units[unitId]) s.units[unitId] = {};
  if (!s.units[unitId].collectCekUlangEvidence) s.units[unitId].collectCekUlangEvidence = [];
  s.units[unitId].collectCekUlangEvidence.push({ ...evidence, collectedAt: new Date().toISOString() });
  logEvent(s, 'collect_cek_ulang_evidence_saved', unitId, { taskId: evidence.taskId, type: evidence.type });
  save(s);
}

export function saveParentVerdictCekUlang(unitId, verdict) {
  const s = getState();
  if (!s.units[unitId]) s.units[unitId] = {};
  s.units[unitId].parentVerdictCekUlang = { verdict, verdictAt: new Date().toISOString() };
  // Keputusan mastery COLLECT: verdik ke-2 = BISA → mastery proven
  const masteryProven = verdict === 'BISA';
  s.units[unitId].masteryDecision = {
    masteryProven,
    reason: masteryProven
      ? 'Orang tua menilai anak bisa pada cek awal dan cek ulang (bahan berbeda). Bukan pengganti asesmen formal.'
      : 'Orang tua menilai anak perlu latihan lebih lanjut pada cek ulang.',
    decidedAt: new Date().toISOString(),
  };
  if (masteryProven) logEvent(s, 'mastery_proven', unitId, { via: 'parent_verdict_cek_ulang' });
  logEvent(s, 'parent_verdict_cek_ulang', unitId, { verdict });
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
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

function logEvent(state, eventType, unitId, data) {
  state.progressLog.push({ eventType, unitId, data, timestamp: new Date().toISOString() });
}

/**
 * Semua unit outcomes untuk findRootGap.
 * Mastery COLLECT: masteryDecision.masteryProven (set saat verdik ke-2 = BISA).
 */
export function getAllUnitOutcomes() {
  const s = getState();
  const result = {};
  for (const [unitId, us] of Object.entries(s.units)) {
    if (us.masteryDecision?.masteryProven) {
      result[unitId] = 'TERLIHAT_BISA';
    } else if (us.cekAwal?.outcome) {
      result[unitId] = us.cekAwal.outcome;
    } else {
      result[unitId] = null;
    }
  }
  return result;
}

/**
 * Unit COLLECT dengan bukti cek_awal yang menunggu verdik pertama.
 */
export function getPendingVerdict1(units) {
  const s = getState();
  return units.filter(u => {
    const us = s.units[u.id];
    if (!us) return false;
    const hasEvidence = us.collectEvidence?.length > 0;
    const noVerdict = !us.parentVerdict;
    return hasEvidence && noVerdict;
  });
}

/**
 * Unit COLLECT dengan bukti cek_ulang yang menunggu verdik kedua.
 */
export function getPendingVerdict2(units) {
  const s = getState();
  return units.filter(u => {
    const us = s.units[u.id];
    if (!us) return false;
    const hasEvidence = us.collectCekUlangEvidence?.length > 0;
    const noVerdict = !us.parentVerdictCekUlang;
    return hasEvidence && noVerdict;
  });
}

/** Gabungan semua pending untuk badge di peta. */
export function getPendingParentReviews(units) {
  return [...getPendingVerdict1(units), ...getPendingVerdict2(units)];
}
