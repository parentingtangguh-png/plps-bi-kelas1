/**
 * PLPS BI Kelas 1 — Main application
 *
 * Routes:
 *   #home       — profil / landing
 *   #map        — peta unit
 *   #unit/X     — perjalanan unit
 *   #report/X   — laporan satu unit
 *   #fullreport — laporan semua unit
 *   #parent     — dashboard orang tua (penilaian bukti)
 */

import { UNITS, UNITS_BY_ID, ELEMEN } from '../data/cp.js';
import { ITEMS as R02_ITEMS, getItemsByPhase as R02ByPhase } from '../data/items/R02.js';
import { ITEMS as R03_ITEMS, getItemsByPhase as R03ByPhase } from '../data/items/R03.js';
import { ITEMS as L01_ITEMS, getItemsByPhase as L01ByPhase } from '../data/items/L01.js';
import { ITEMS as L02_ITEMS, getItemsByPhase as L02ByPhase } from '../data/items/L02.js';
import {
  R01_TASKS, S01_TASKS, S02_TASKS, S03_TASKS, S04_TASKS,
  S05_TASKS, S06_TASKS, S07_TASKS, S08_TASKS,
  W01_TASKS, W02_TASKS, W03_TASKS,
} from '../data/items/COLLECT_UNITS.js';
import {
  scoreSession, decideMastery, findRootGap, getOutcomeLabel, OUTCOME,
} from './scoring.js';
import {
  getState, saveProfile, getUnitState, saveCekAwal, saveLatihanResponses,
  saveCekUlang, saveMasteryDecision, saveCollectEvidence, closeVisit,
  getAllUnitOutcomes, saveParentVerdict, getPendingParentReviews,
  saveMediaBlob, getMediaBlob,
} from './state.js';

// ─────────────────────────────────────────────────────
// Item bank lookup
// ─────────────────────────────────────────────────────
const ITEM_BANKS = {
  'BI-A-L01': { all: L01_ITEMS, byPhase: L01ByPhase },
  'BI-A-L02': { all: L02_ITEMS, byPhase: L02ByPhase },
  'BI-A-R02': { all: R02_ITEMS, byPhase: R02ByPhase },
  'BI-A-R03': { all: R03_ITEMS, byPhase: R03ByPhase },
};

const COLLECT_TASKS = {
  'BI-A-R01': R01_TASKS, 'BI-A-S01': S01_TASKS, 'BI-A-S02': S02_TASKS,
  'BI-A-S03': S03_TASKS, 'BI-A-S04': S04_TASKS, 'BI-A-S05': S05_TASKS,
  'BI-A-S06': S06_TASKS, 'BI-A-S07': S07_TASKS, 'BI-A-S08': S08_TASKS,
  'BI-A-W01': W01_TASKS, 'BI-A-W02': W02_TASKS, 'BI-A-W03': W03_TASKS,
};

// ─────────────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────────────
const app = document.getElementById('app');

function navigate(hash) { window.location.hash = hash; }

window.addEventListener('hashchange', route);
window.addEventListener('load', () => {
  if (!window.location.hash) window.location.hash = '#home';
  else route();
});

function route() {
  const hash = window.location.hash.slice(1);
  const [view, param] = hash.split('/');
  switch (view) {
    case 'home':       renderHome(); break;
    case 'map':        renderMap(); break;
    case 'unit':       renderUnit(param); break;
    case 'report':     renderUnitReport(param); break;
    case 'fullreport': renderFullReport(); break;
    case 'parent':     renderParentDashboard(); break;
    default:           renderHome(); break;
  }
}

// ─────────────────────────────────────────────────────
// View: Home
// ─────────────────────────────────────────────────────
function renderHome() {
  const s = getState();
  const hasProfile = s.childName && s.kelas;

  app.innerHTML = `
    <div class="view-home">
      <div class="brand">
        <div class="brand-title">PLPS</div>
        <div class="brand-sub">Bahasa Indonesia · Kelas 1</div>
      </div>
      ${hasProfile ? `
        <div class="profile-card">
          <div class="profile-label">Anak</div>
          <div class="profile-name">${esc(s.childName)}</div>
          <div class="profile-kelas">${esc(s.kelas)}</div>
        </div>
        <button class="btn-primary" onclick="navigate('#map')">Lihat Peta Unit</button>
        <button class="btn-secondary" onclick="navigate('#parent')">Dashboard Orang Tua</button>
        <button class="btn-ghost btn-small" onclick="showResetConfirm()">Mulai ulang dengan anak lain</button>
      ` : `
        <div class="onboarding">
          <p class="onboarding-desc">Petakan kemampuan Bahasa Indonesia anak. Tidak perlu akun — data tersimpan di perangkat ini.</p>
          <form id="profileForm" class="profile-form">
            <label>Nama panggilan anak
              <input type="text" id="childName" placeholder="Contoh: Rani" required maxlength="40" />
            </label>
            <label>Kelas
              <select id="kelas" required>
                <option value="">Pilih kelas</option>
                <option value="Kelas 1 SD">Kelas 1 SD</option>
              </select>
            </label>
            <button type="submit" class="btn-primary">Mulai →</button>
          </form>
        </div>
      `}
      <footer class="home-footer">
        Data tersimpan hanya di perangkat ini.<br/>
        <a href="#fullreport" class="link-small">Lihat semua laporan</a>
      </footer>
    </div>
  `;

  document.getElementById('profileForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('childName').value.trim();
    const kelas = document.getElementById('kelas').value;
    if (!name || !kelas) return;
    saveProfile(name, kelas);
    navigate('#map');
  });
}

window.showResetConfirm = function() {
  if (confirm('Ini akan menghapus semua data dan laporan. Lanjutkan?')) {
    import('./state.js').then(m => { m.clearState(); navigate('#home'); });
  }
};

// ─────────────────────────────────────────────────────
// View: Peta Unit
// ─────────────────────────────────────────────────────
function renderMap() {
  const s = getState();
  if (!s.childName) { navigate('#home'); return; }

  const unitOutcomes = getAllUnitOutcomes();
  const rootGap = findRootGap(unitOutcomes, UNITS);
  const pendingCount = getPendingParentReviews(UNITS).length;

  const elemenGroups = Object.entries(ELEMEN).map(([key, el]) => ({
    key, el, units: UNITS.filter(u => u.elemen === key),
  }));

  app.innerHTML = `
    <div class="view-map">
      <header class="map-header">
        <button class="btn-back" onclick="navigate('#home')">← Profil</button>
        <div>
          <div class="map-title">Peta Perjalanan ${esc(s.childName)}</div>
          <div class="map-sub">${esc(s.kelas)} · Bahasa Indonesia Fase A</div>
        </div>
        <div class="map-header-actions">
          ${pendingCount > 0 ? `
            <button class="btn-parent-review" onclick="navigate('#parent')">
              👀 Perlu dinilai (${pendingCount})
            </button>
          ` : `
            <button class="btn-ghost btn-small" onclick="navigate('#parent')">Orang Tua</button>
          `}
          <button class="btn-ghost btn-small" onclick="navigate('#fullreport')">Laporan</button>
        </div>
      </header>

      ${rootGap ? `
        <div class="root-gap-banner">
          <div class="rg-label">Titik mulai yang direkomendasikan</div>
          <div class="rg-unit">${esc(UNITS_BY_ID[rootGap]?.label ?? rootGap)}</div>
          <button class="btn-accent btn-small" onclick="navigate('#unit/${rootGap}')">Mulai dari sini →</button>
        </div>
      ` : ''}

      ${elemenGroups.map(({ key, el, units }) => `
        <section class="elemen-group">
          <div class="elemen-header">
            <div class="elemen-label">${esc(el.label)}</div>
            <div class="elemen-cp">${esc(el.asal_cp)}</div>
          </div>
          <div class="unit-cards">
            ${units.map(u => renderUnitCard(u, unitOutcomes[u.id], rootGap)).join('')}
          </div>
        </section>
      `).join('')}

      <div class="map-footer-note">
        "Berhasil pada cek ini" tidak berarti kemampuan sudah stabil — perlu cek ulang untuk konfirmasi.
      </div>
    </div>
  `;
}

function renderUnitCard(unit, outcome, rootGap) {
  const us = getUnitState(unit.id);
  const isRootGap = unit.id === rootGap;
  const statusInfo = getUnitStatusInfo(unit, outcome, us);

  return `
    <div class="unit-card ${statusInfo.cssClass} ${isRootGap ? 'unit-card--root-gap' : ''}">
      <div class="unit-card-id">${esc(unit.id)}</div>
      <div class="unit-card-label">${esc(unit.label)}</div>
      <div class="unit-card-status">${statusInfo.label}</div>
      ${statusInfo.canStart ? `
        <button class="btn-unit-action" onclick="navigate('#unit/${unit.id}')">
          ${statusInfo.actionLabel}
        </button>
      ` : `<div class="unit-card-locked">${statusInfo.actionLabel}</div>`}
    </div>
  `;
}

function getUnitStatusInfo(unit, outcome, us) {
  if (us.masteryDecision?.masteryProven) {
    return { label: 'Berhasil pada cek ✓', cssClass: 'unit-card--mastered', canStart: true, actionLabel: 'Lihat laporan' };
  }
  if (us.parentVerdict?.verdict === 'BISA') {
    return { label: 'Dinilai orang tua: Bisa ✓', cssClass: 'unit-card--mastered', canStart: true, actionLabel: 'Lihat laporan' };
  }
  if (us.parentVerdict?.verdict === 'PERLU_LATIHAN') {
    return { label: 'Dinilai orang tua: Perlu latihan', cssClass: 'unit-card--active', canStart: true, actionLabel: 'Ulangi' };
  }
  if (us.collectEvidence && us.collectEvidence.length > 0 && !us.parentVerdict) {
    return { label: 'Menunggu penilaian orang tua', cssClass: 'unit-card--pending', canStart: true, actionLabel: 'Lihat bukti' };
  }
  if (us.visitClosed) {
    return { label: 'Kunjungan ditutup', cssClass: 'unit-card--closed', canStart: true, actionLabel: 'Kunjungi lagi' };
  }
  if (us.cekAwal) {
    return { label: 'Sedang dijalani', cssClass: 'unit-card--active', canStart: true, actionLabel: 'Lanjutkan' };
  }
  const unitOutcomes = getAllUnitOutcomes();
  const prereqOk = unit.prerequisite.every(id => unitOutcomes[id] === OUTCOME.TERLIHAT_BISA || unitOutcomes[id] === OUTCOME.DINILAI_ORANG_TUA_BISA);
  if (!prereqOk && unit.prerequisite.length > 0) {
    return { label: 'Prasyarat belum terpenuhi', cssClass: 'unit-card--locked', canStart: false, actionLabel: 'Selesaikan prasyarat dulu' };
  }
  return { label: 'Tersedia', cssClass: 'unit-card--available', canStart: true, actionLabel: 'Mulai cek' };
}

// ─────────────────────────────────────────────────────
// View: Unit Journey
// ─────────────────────────────────────────────────────
function renderUnit(unitId) {
  const unit = UNITS_BY_ID[unitId];
  if (!unit) { navigate('#map'); return; }
  const s = getState();
  if (!s.childName) { navigate('#home'); return; }
  const us = getUnitState(unitId);

  if (us.masteryDecision || us.parentVerdict) { renderUnitReport(unitId); return; }
  if (us.cekUlang && !us.masteryDecision) { renderCekUlangResult(unit, us); return; }
  if (us.latihan && !us.cekUlang) { renderCekUlangIntro(unit, us); return; }
  if (us.cekAwal && !us.latihan) { renderCekAwalResult(unit, us); return; }
  renderCekAwalIntro(unit);
}

// ─── Cek Awal Intro ──────────────────────────────────

function renderCekAwalIntro(unit) {
  const bank = ITEM_BANKS[unit.id];
  const isCollect = !bank;

  app.innerHTML = `
    <div class="view-check">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk anak · Cek awal</div>
      </header>
      <h1 class="check-title">${esc(unit.label)}</h1>
      <p class="check-desc">${esc(unit.tuntutan)}</p>
      ${unit.catatan_batas ? `<div class="batas-note">${esc(unit.catatan_batas)}</div>` : ''}
      ${isCollect ? `
        <div class="collect-notice">
          <strong>Unit ini dikumpulkan, bukan dinilai otomatis.</strong><br/>
          Orang tua akan menilai hasilnya dari Dashboard Orang Tua.
        </div>
        <button class="btn-primary" onclick="startCollect('${unit.id}')">Mulai kumpulkan bukti</button>
      ` : `
        <button class="btn-primary" onclick="startCekAwal('${unit.id}')">Mulai cek awal →</button>
      `}
      <button class="btn-ghost" onclick="navigate('#map')">Kembali ke peta</button>
    </div>
  `;
}

window.startCekAwal = function(unitId) {
  const unit = UNITS_BY_ID[unitId];
  const bank = ITEM_BANKS[unitId];
  if (!bank) return;
  const items = bank.byPhase('cek_awal');
  renderItemSession(unit, items, 'cek_awal', [], (responses) => {
    const result = scoreSession(responses, items);
    saveCekAwal(unitId, result);
    renderUnit(unitId);
  });
};

window.startCollect = function(unitId) {
  const tasks = COLLECT_TASKS[unitId];
  if (!tasks || tasks.length === 0) { navigate('#map'); return; }
  renderCollectTask(UNITS_BY_ID[unitId], tasks, 0);
};

// ─── Sesi Item ───────────────────────────────────────

function renderItemSession(unit, items, phase, responsesAcc, onDone) {
  if (items.length === 0 || responsesAcc.length >= items.length) {
    onDone(responsesAcc); return;
  }

  const idx = responsesAcc.length;
  const item = items[idx];
  const hasAudio = !!item.audio_script;

  const phaseLabel = {
    cek_awal: 'Cek awal', latihan: 'Latihan penguatan',
    latihan_mandiri: 'Latihan mandiri', cek_ulang: 'Cek ulang',
    latihan_pendalaman: 'Latihan pendalaman',
  }[phase] ?? phase;

  app.innerHTML = `
    <div class="view-check">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk anak · ${phaseLabel} · ${idx + 1} dari ${items.length}</div>
      </header>
      <h1 class="check-title">${esc(unit.label)}</h1>

      ${hasAudio ? `
        <div class="audio-section" id="audioSection">
          <div class="audio-label">${esc(item.instruksi_anak ?? 'Dengarkan dengan baik.')}</div>
          <div class="audio-label-content">${esc(item.audio_label)}</div>
          <button id="playBtn" class="btn-play" onclick="playAudio('${unit.id}', ${idx})">▶ Putar audio</button>
          <div id="audioStatus" class="audio-status">Tekan tombol putar.</div>
        </div>
        <div id="questionSection" style="display:none;">
      ` : ''}

      ${item.panels ? `
        <div class="visual-panels">
          ${item.panels.map((p, i) => `
            <div class="panel">
              <div class="panel-num">Gambar ${i + 1}</div>
              <div class="panel-emoji">${p.emoji}</div>
              <div class="panel-desc">${esc(p.deskripsi)}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${item.stimulus ? `<div class="stimulus-box">${esc(item.stimulus)}</div>` : ''}

      <div class="question-text">${esc(item.soal)}</div>
      <div class="options" id="options">
        ${item.opsi.map(o => `
          <button class="option-btn" data-id="${o.id}"
            onclick="selectOption(this,'${unit.id}',${idx},'${o.id}','${item.kunci}','${item.id}','${item.family}')">
            ${esc(o.teks)}
          </button>
        `).join('')}
      </div>
      <div id="feedback" class="feedback hidden"></div>

      ${hasAudio ? `</div>` : ''}
    </div>
  `;

  window._currentSession = { unit, items, phase, responsesAcc, onDone };

  if (hasAudio) {
    document.querySelector('.question-text').style.display = 'none';
    document.getElementById('options').style.display = 'none';
  }
}

window.playAudio = function(unitId, itemIdx) {
  if (!('speechSynthesis' in window)) {
    document.getElementById('audioStatus').textContent = 'Audio tidak tersedia di browser ini. Sesi dihentikan.';
    document.getElementById('playBtn').disabled = true;
    saveCekAwal(unitId, { outcome: OUTCOME.TUGAS_GAGAL_BERJALAN, totalItems: 0, correctItems: 0, ratio: null });
    setTimeout(() => renderUnit(unitId), 2000);
    return;
  }
  const sess = window._currentSession;
  const item = sess.items[itemIdx];
  const utt = new SpeechSynthesisUtterance(item.audio_script);
  utt.lang = 'id-ID'; utt.rate = 0.85;
  document.getElementById('playBtn').disabled = true;
  document.getElementById('audioStatus').textContent = '⏳ Memutar...';
  utt.onend = () => {
    document.getElementById('audioStatus').textContent = '✓ Audio selesai diputar.';
    const qs = document.getElementById('questionSection');
    const qt = document.querySelector('.question-text');
    const opts = document.getElementById('options');
    if (qs) qs.style.display = 'block';
    if (qt) qt.style.display = 'block';
    if (opts) opts.style.display = 'flex';
  };
  utt.onerror = () => {
    document.getElementById('audioStatus').textContent = 'Audio gagal diputar. Sesi dihentikan.';
    saveCekAwal(unitId, { outcome: OUTCOME.TUGAS_GAGAL_BERJALAN, totalItems: 0, correctItems: 0, ratio: null });
    setTimeout(() => renderUnit(unitId), 2000);
  };
  window.speechSynthesis.speak(utt);
};

window.selectOption = function(btn, unitId, itemIdx, selectedId, kunci, itemId, family) {
  document.querySelectorAll('.option-btn').forEach(o => o.disabled = true);
  const isCorrect = selectedId === kunci;
  btn.classList.add(isCorrect ? 'option-correct' : 'option-wrong');
  if (!isCorrect) {
    document.querySelectorAll('.option-btn').forEach(o => {
      if (o.dataset.id === kunci) o.classList.add('option-correct');
    });
  }
  const sess = window._currentSession;
  const item = sess.items[itemIdx];
  const newResponses = [...sess.responsesAcc, { itemId, family, isCorrect }];
  const isLatihan = sess.phase === 'latihan' || sess.phase === 'latihan_pendalaman';
  const feedback = document.getElementById('feedback');
  if (feedback && isLatihan && item.umpan_balik_benar && item.umpan_balik_salah) {
    feedback.textContent = isCorrect ? item.umpan_balik_benar : item.umpan_balik_salah;
    feedback.className = `feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`;
  } else if (feedback) {
    feedback.style.display = 'none';
  }
  setTimeout(() => {
    renderItemSession(sess.unit, sess.items, sess.phase, newResponses, sess.onDone);
  }, isLatihan ? 1800 : 800);
};

// ─── Hasil Cek Awal ──────────────────────────────────

function renderCekAwalResult(unit, us) {
  const result = us.cekAwal;
  const s = getState();

  // Cabang berdasarkan hasil cek awal
  const isBerhasil = result.outcome === OUTCOME.TERLIHAT_BISA;
  const isFailed = result.outcome === OUTCOME.TUGAS_GAGAL_BERJALAN;
  const isCollect = result.outcome === OUTCOME.BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS;

  app.innerHTML = `
    <div class="view-result">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk orang tua · Hasil cek awal</div>
      </header>
      <h1 class="result-title">${esc(unit.label)}</h1>
      <div class="result-outcome outcome-${result.outcome.toLowerCase()}">${getOutcomeLabel(result.outcome)}</div>

      ${result.totalItems > 0 ? `
        <div class="result-detail">
          ${result.correctItems}/${result.totalItems} jawaban benar
          ${result.familyBreakdown ? `
            <div class="family-breakdown">
              ${Object.entries(result.familyBreakdown).map(([fam, d]) =>
                `<div class="family-row"><span>${fam}</span><span>${d.correct}/${d.total}</span></div>`
              ).join('')}
            </div>
          ` : ''}
        </div>
      ` : ''}

      ${isFailed ? `
        <div class="error-note">Audio tidak berhasil diputar. Sesi dihentikan tanpa skor.</div>
        <button class="btn-primary" onclick="navigate('#map')">Kembali ke peta</button>
      ` : isCollect ? `
        <div class="collect-note">
          Bukti sudah dikumpulkan dan menunggu penilaian orang tua.<br/>
          Buka <strong>Dashboard Orang Tua</strong> untuk menilai.
        </div>
        <button class="btn-primary" onclick="navigate('#parent')">Buka Dashboard Orang Tua</button>
        <button class="btn-ghost" onclick="navigate('#map')">Kembali ke peta</button>
      ` : isBerhasil ? `
        <div class="cek-awal-berhasil">
          <p>✓ ${esc(s.childName)} berhasil pada cek awal.</p>
          <p class="hint">Lanjutkan ke cek ulang untuk konfirmasi, atau latihan pendalaman lebih dulu.</p>
        </div>
        <div class="next-steps">
          <button class="btn-primary" onclick="skipToReport('${unit.id}')">Langsung cek ulang →</button>
          <button class="btn-ghost" onclick="startLatihanPendalaman('${unit.id}')">Latihan pendalaman dulu</button>
        </div>
      ` : `
        <div class="cek-awal-perlu-latihan">
          <p>${esc(s.childName)} perlu latihan penguatan sebelum cek ulang.</p>
        </div>
        <div class="next-steps">
          <button class="btn-primary" onclick="startLatihan('${unit.id}')">Mulai latihan penguatan →</button>
        </div>
      `}
    </div>
  `;
}

window.startLatihan = function(unitId) {
  const unit = UNITS_BY_ID[unitId];
  const bank = ITEM_BANKS[unitId];
  if (!bank) return;
  const latihanItems = bank.byPhase('latihan');
  const mandiriItems = bank.byPhase('latihan_mandiri');
  renderItemSession(unit, latihanItems, 'latihan', [], (lr) => {
    renderItemSession(unit, mandiriItems, 'latihan_mandiri', [], (mr) => {
      saveLatihanResponses(unitId, [...lr, ...mr]);
      renderUnit(unitId);
    });
  });
};

window.startLatihanPendalaman = function(unitId) {
  const unit = UNITS_BY_ID[unitId];
  const bank = ITEM_BANKS[unitId];
  if (!bank) return;
  // Pendalaman: gunakan item latihan mandiri saja (soal tanpa scaffolding)
  const mandiriItems = bank.byPhase('latihan_mandiri');
  renderItemSession(unit, mandiriItems, 'latihan_pendalaman', [], (mr) => {
    saveLatihanResponses(unitId, mr);
    renderUnit(unitId);
  });
};

window.skipToReport = function(unitId) {
  saveLatihanResponses(unitId, []);
  renderUnit(unitId);
};

// ─── Cek Ulang ───────────────────────────────────────

function renderCekUlangIntro(unit, us) {
  const s = getState();
  app.innerHTML = `
    <div class="view-check">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk anak · Cek ulang</div>
      </header>
      <h1 class="check-title">${esc(unit.label)}</h1>
      <p>Waktunya cek ulang dengan bahan baru, ${esc(s.childName)}!</p>
      <p class="check-desc">Soal yang muncul berbeda dari cek awal. Tuntutan kemampuannya sama.</p>
      <button class="btn-primary" onclick="startCekUlang('${unit.id}')">Mulai cek ulang →</button>
      <button class="btn-ghost" onclick="navigate('#map')">Nanti saja</button>
    </div>
  `;
}

window.startCekUlang = function(unitId) {
  const unit = UNITS_BY_ID[unitId];
  const bank = ITEM_BANKS[unitId];
  if (!bank) return;
  const items = bank.byPhase('cek_ulang');
  renderItemSession(unit, items, 'cek_ulang', [], (responses) => {
    const result = scoreSession(responses, items);
    saveCekUlang(unitId, result);
    const us = getUnitState(unitId);
    saveMasteryDecision(unitId, decideMastery(us.cekAwal, result));
    renderUnit(unitId);
  });
};

function renderCekUlangResult(unit, us) {
  renderUnit(unit.id);
}

// ─── Collect Task ─────────────────────────────────────

function renderCollectTask(unit, tasks, taskIdx) {
  if (taskIdx >= tasks.length) {
    if (!getUnitState(unit.id).cekAwal) {
      saveCekAwal(unit.id, {
        outcome: OUTCOME.BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS,
        totalItems: 0, correctItems: 0, ratio: null,
      });
    }
    renderUnit(unit.id);
    return;
  }

  const task = tasks[taskIdx];
  const hasAudio = !!task.audio_script;
  const hasPanels = !!task.panels;
  const hasKata = !!task.kata || !!task.kata_target;
  const s = getState();

  app.innerHTML = `
    <div class="view-check">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk anak · Mengumpulkan bukti · ${taskIdx + 1} dari ${tasks.length}</div>
      </header>
      <h1 class="check-title">${esc(unit.label)}</h1>

      ${task.instruksi ? `<p class="check-desc">${esc(task.instruksi)}</p>` : ''}

      ${hasAudio ? `
        <button id="playCollectBtn" class="btn-play" onclick="playCollectAudio('${unit.id}', ${taskIdx})">▶ Putar audio</button>
        <div id="collectAudioStatus" class="audio-status">Tekan tombol putar terlebih dahulu.</div>
      ` : ''}

      ${hasPanels ? `
        <div class="visual-panels">
          ${task.panels.map((p, i) => `
            <div class="panel">
              <div class="panel-num">Gambar ${i + 1}</div>
              <div class="panel-emoji">${p.emoji}</div>
              <div class="panel-desc">${esc(p.deskripsi)}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${task.stimulus_emoji ? `
        <div class="stimulus-emoji">${task.stimulus_emoji}</div>
        <div class="stimulus-label">${esc(task.stimulus_label ?? '')}</div>
      ` : ''}

      ${task.stimulus_teks ? `<div class="stimulus-box">${esc(task.stimulus_teks)}</div>` : ''}

      ${task.kata ? `
        <div class="kata-list">${task.kata.map(k => `<span class="kata-chip">${esc(k)}</span>`).join('')}</div>
      ` : ''}
      ${task.kata_target ? `
        <div class="kata-list">${task.kata_target.map(k => `<span class="kata-chip">${esc(k)}</span>`).join('')}</div>
      ` : ''}

      ${unit.id === 'BI-A-W03' ? `
        <textarea id="writingInput" class="writing-input" placeholder="Tulis di sini..." rows="5"></textarea>
      ` : ''}

      ${unit.id === 'BI-A-W01' ? `
        <textarea id="writingInput" class="writing-input" placeholder="Tulis kata-kata di sini..." rows="3"></textarea>
      ` : ''}

      ${unit.id === 'BI-A-W02' ? `
        <div class="upload-section">
          <label class="upload-label">
            <input type="file" id="photoInput" accept="image/*" capture="environment" />
            📷 Ambil foto tulisan tangan
          </label>
          <div id="photoPreview" class="photo-preview"></div>
        </div>
      ` : ''}

      <div class="record-section" id="recordSection">
        ${needsRecording(unit.id) ? `
          <button id="recBtn" class="btn-record" onclick="toggleRecording('${unit.id}', ${taskIdx})">🎤 Mulai rekam suara</button>
          <div id="recStatus" class="rec-status">Rekaman suara tersimpan di perangkat ini.</div>
        ` : ''}
      </div>

      <button class="btn-primary" id="collectNextBtn" onclick="collectNext('${unit.id}', ${taskIdx})">
        ${taskIdx + 1 < tasks.length ? 'Lanjut →' : 'Selesai'}
      </button>
      <button class="btn-ghost" onclick="navigate('#map')">Kembali ke peta</button>
    </div>
  `;

  window._collectState = { unit, tasks, taskIdx, recording: null, recorded: false, recordingBlob: null, photoBlob: null };

  // Setup photo input listener
  const photoInput = document.getElementById('photoInput');
  if (photoInput) {
    photoInput.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      window._collectState.photoBlob = file;
      const url = URL.createObjectURL(file);
      document.getElementById('photoPreview').innerHTML = `<img src="${url}" style="max-width:100%;border-radius:8px;margin-top:8px;" />`;
    });
  }
}

function needsRecording(unitId) {
  return ['BI-A-R01','BI-A-S01','BI-A-S02','BI-A-S03','BI-A-S04',
          'BI-A-S05','BI-A-S06','BI-A-S07','BI-A-S08'].includes(unitId);
}

window.playCollectAudio = function(unitId, taskIdx) {
  const cs = window._collectState;
  if (!cs) return;
  const task = cs.tasks[taskIdx];
  if (!('speechSynthesis' in window)) {
    document.getElementById('collectAudioStatus').textContent = 'Audio tidak tersedia.';
    return;
  }
  const utt = new SpeechSynthesisUtterance(task.audio_script);
  utt.lang = 'id-ID'; utt.rate = 0.85;
  document.getElementById('playCollectBtn').disabled = true;
  document.getElementById('collectAudioStatus').textContent = '⏳ Memutar...';
  utt.onend = () => document.getElementById('collectAudioStatus').textContent = '✓ Audio selesai.';
  utt.onerror = () => {
    document.getElementById('collectAudioStatus').textContent = 'Audio gagal diputar.';
    document.getElementById('playCollectBtn').disabled = false;
  };
  window.speechSynthesis.speak(utt);
};

let mediaRecorder = null;
let recordedChunks = [];

window.toggleRecording = function(unitId, taskIdx) {
  const btn = document.getElementById('recBtn');
  const status = document.getElementById('recStatus');

  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    btn.textContent = '🎤 Rekam lagi';
    btn.classList.remove('btn-record--active');
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    status.textContent = 'Mikrofon tidak tersedia di browser ini.';
    return;
  }

  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => { if (e.data.size > 0) recordedChunks.push(e.data); };
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'audio/webm' });
      status.textContent = `✓ Rekaman selesai (${Math.round(blob.size / 1024)} KB).`;
      window._collectState.recorded = true;
      window._collectState.recordingBlob = blob;
      stream.getTracks().forEach(t => t.stop());
    };
    mediaRecorder.start();
    btn.textContent = '⏹ Hentikan rekaman';
    btn.classList.add('btn-record--active');
    status.textContent = '🔴 Merekam...';
  }).catch(() => { status.textContent = 'Izin mikrofon ditolak.'; });
};

window.collectNext = async function(unitId, taskIdx) {
  const cs = window._collectState;
  const task = cs.tasks[taskIdx];

  if (unitId === 'BI-A-W03' || unitId === 'BI-A-W01') {
    const input = document.getElementById('writingInput');
    const text = input?.value?.trim() ?? '';
    const minLen = task.min_panjang ?? (unitId === 'BI-A-W03' ? 20 : 3);
    if (text.length < minLen) {
      alert(`Tulis paling sedikit ${minLen} karakter terlebih dahulu.`);
      return;
    }
    saveCollectEvidence(unitId, { taskId: task.id, type: 'text', payload: text });

  } else if (unitId === 'BI-A-W02') {
    if (cs.photoBlob) {
      const mediaId = `${unitId}_${task.id}_${Date.now()}`;
      await saveMediaBlob(mediaId, cs.photoBlob);
      saveCollectEvidence(unitId, { taskId: task.id, type: 'photo', mediaId, payload: { size: cs.photoBlob.size } });
    } else {
      saveCollectEvidence(unitId, { taskId: task.id, type: 'skipped', payload: null });
    }

  } else if (cs.recorded && cs.recordingBlob) {
    const mediaId = `${unitId}_${task.id}_${Date.now()}`;
    await saveMediaBlob(mediaId, cs.recordingBlob);
    saveCollectEvidence(unitId, { taskId: task.id, type: 'audio', mediaId, payload: { size: cs.recordingBlob.size } });

  } else {
    saveCollectEvidence(unitId, { taskId: task.id, type: 'skipped', payload: null });
  }

  renderCollectTask(cs.unit, cs.tasks, taskIdx + 1);
};

// ─────────────────────────────────────────────────────
// View: Dashboard Orang Tua
// ─────────────────────────────────────────────────────
function renderParentDashboard() {
  const s = getState();
  const pending = getPendingParentReviews(UNITS);
  const reviewed = UNITS.filter(u => {
    const us = getUnitState(u.id);
    return !!us.parentVerdict;
  });

  app.innerHTML = `
    <div class="view-parent">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Dashboard Orang Tua</div>
      </header>
      <h1 class="parent-title">Penilaian Bukti</h1>
      <p class="parent-desc">
        Anda menilai hasil rekaman atau tulisan ${esc(s.childName || 'anak')} berdasarkan panduan di bawah ini.
        Penilaian Anda akan dicatat sebagai bukti kemampuan.
      </p>

      ${pending.length === 0 ? `
        <div class="parent-empty">
          <div class="parent-empty-icon">✓</div>
          <div>Tidak ada bukti yang menunggu penilaian saat ini.</div>
        </div>
      ` : `
        <div class="parent-section-title">Menunggu penilaian (${pending.length})</div>
        ${pending.map(u => renderParentReviewCard(u, getUnitState(u.id), false)).join('')}
      `}

      ${reviewed.length > 0 ? `
        <div class="parent-section-title parent-section-title--done">Sudah dinilai</div>
        ${reviewed.map(u => renderParentReviewCard(u, getUnitState(u.id), true)).join('')}
      ` : ''}
    </div>
  `;
}

function renderParentReviewCard(unit, us, isDone) {
  const verdict = us.parentVerdict;
  const evidenceList = us.collectEvidence ?? [];
  const hasMedia = evidenceList.some(e => e.mediaId);
  const textEvidence = evidenceList.find(e => e.type === 'text');

  return `
    <div class="parent-review-card ${isDone ? 'parent-review-card--done' : ''}">
      <div class="prc-id">${esc(unit.id)}</div>
      <div class="prc-label">${esc(unit.label)}</div>

      ${unit.rubrik_orang_tua ? `
        <div class="prc-rubrik">
          <strong>Panduan penilaian:</strong><br/>
          ${esc(unit.rubrik_orang_tua)}
        </div>
      ` : ''}

      ${textEvidence ? `
        <div class="prc-evidence">
          <strong>Tulisan anak:</strong>
          <div class="prc-text">${esc(textEvidence.payload)}</div>
        </div>
      ` : ''}

      ${hasMedia ? `
        <div class="prc-evidence">
          ${evidenceList.filter(e => e.mediaId).map(e => `
            <button class="btn-play-evidence" onclick="playEvidenceMedia('${e.mediaId}', '${e.type}', this)">
              ${e.type === 'audio' ? '▶ Putar rekaman' : '🖼 Lihat foto'}
            </button>
            <div id="media-${e.mediaId}" class="media-container"></div>
          `).join('')}
        </div>
      ` : evidenceList.every(e => e.type === 'skipped') ? `
        <div class="prc-evidence prc-skipped">Tugas ini dilewati tanpa bukti.</div>
      ` : ''}

      ${isDone ? `
        <div class="prc-verdict prc-verdict--${verdict.verdict.toLowerCase()}">
          ${verdict.verdict === 'BISA' ? '✓ Dinilai: Sudah bisa' : '○ Dinilai: Perlu latihan lagi'}
          <span class="prc-verdict-date">${formatDate(verdict.verdictAt)}</span>
        </div>
        <button class="btn-ghost btn-small" onclick="undoParentVerdict('${unit.id}')">Ubah penilaian</button>
      ` : `
        <div class="prc-actions">
          <button class="btn-verdict-bisa" onclick="submitParentVerdict('${unit.id}', 'BISA')">✓ Sudah bisa</button>
          <button class="btn-verdict-latihan" onclick="submitParentVerdict('${unit.id}', 'PERLU_LATIHAN')">○ Perlu latihan lagi</button>
        </div>
      `}
    </div>
  `;
}

window.playEvidenceMedia = async function(mediaId, type, btn) {
  const blob = await getMediaBlob(mediaId);
  const container = document.getElementById(`media-${mediaId}`);
  if (!blob || !container) {
    btn.textContent = 'Media tidak ditemukan.';
    return;
  }
  const url = URL.createObjectURL(blob);
  if (type === 'audio') {
    container.innerHTML = `<audio controls src="${url}" style="width:100%;margin-top:8px;"></audio>`;
    btn.style.display = 'none';
  } else {
    container.innerHTML = `<img src="${url}" style="max-width:100%;border-radius:8px;margin-top:8px;" />`;
    btn.style.display = 'none';
  }
};

window.submitParentVerdict = function(unitId, verdict) {
  saveParentVerdict(unitId, verdict);
  renderParentDashboard();
};

window.undoParentVerdict = function(unitId) {
  const s = getState();
  if (s.units[unitId]) {
    s.units[unitId].parentVerdict = null;
    localStorage.setItem('plps_bi_kelas1_state', JSON.stringify(s));
  }
  renderParentDashboard();
};

// ─────────────────────────────────────────────────────
// View: Unit Report
// ─────────────────────────────────────────────────────
function renderUnitReport(unitId) {
  const unit = UNITS_BY_ID[unitId];
  if (!unit) { navigate('#map'); return; }
  const s = getState();
  const us = getUnitState(unitId);
  const cekAwal = us.cekAwal;
  const cekUlang = us.cekUlang;
  const decision = us.masteryDecision;
  const pVerdict = us.parentVerdict;

  app.innerHTML = `
    <div class="view-report">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk orang tua · Laporan unit</div>
      </header>

      <h1 class="report-title">${esc(unit.label)}</h1>
      <div class="report-child">${esc(s.childName)} · ${esc(s.kelas)}</div>

      <div class="report-section">
        <div class="report-section-title">Cek awal</div>
        ${cekAwal ? `
          <div class="report-outcome outcome-${cekAwal.outcome.toLowerCase()}">${getOutcomeLabel(cekAwal.outcome)}</div>
          ${cekAwal.totalItems > 0 ? `<div class="report-detail">${cekAwal.correctItems}/${cekAwal.totalItems} benar</div>` : ''}
          <div class="report-time">Tanggal: ${formatDate(cekAwal.scoredAt)}</div>
        ` : `<div class="report-empty">Belum dilakukan.</div>`}
      </div>

      ${pVerdict ? `
        <div class="report-section mastery-section ${pVerdict.verdict === 'BISA' ? 'mastery-proven' : 'mastery-not-proven'}">
          <div class="mastery-badge">
            ${pVerdict.verdict === 'BISA' ? '✓ Dinilai orang tua: Sudah bisa' : '○ Dinilai orang tua: Perlu latihan lagi'}
          </div>
          <div class="mastery-reason">Penilaian orang tua pada ${formatDate(pVerdict.verdictAt)}</div>
          <div class="mastery-disclaimer">Penilaian ini berdasarkan panduan yang tersedia. Bukan pengganti asesmen formal.</div>
        </div>
      ` : ''}

      ${cekUlang ? `
        <div class="report-section">
          <div class="report-section-title">Cek ulang</div>
          <div class="report-outcome outcome-${cekUlang.outcome.toLowerCase()}">${getOutcomeLabel(cekUlang.outcome)}</div>
          ${cekUlang.totalItems > 0 ? `<div class="report-detail">${cekUlang.correctItems}/${cekUlang.totalItems} benar</div>` : ''}
          <div class="report-time">Tanggal: ${formatDate(cekUlang.scoredAt)}</div>
        </div>
      ` : ''}

      ${decision ? `
        <div class="report-section mastery-section ${decision.masteryProven ? 'mastery-proven' : 'mastery-not-proven'}">
          <div class="mastery-badge">
            ${decision.masteryProven ? '✓ Berhasil pada cek ini' : '○ Belum berhasil pada cek ulang'}
          </div>
          <div class="mastery-reason">${esc(decision.reason)}</div>
          ${decision.masteryProven ? `
            <div class="mastery-disclaimer">
              Ini menunjukkan anak berhasil pada sesi cek ini dengan soal berbeda dari cek awal.
              Kemampuan yang stabil perlu dikonfirmasi pada sesi lain di hari berbeda.
            </div>
            <div class="before-after">
              <div class="ba-col"><div class="ba-label">Sebelum</div><div class="ba-value">${getOutcomeLabel(cekAwal?.outcome)}</div></div>
              <div class="ba-arrow">→</div>
              <div class="ba-col"><div class="ba-label">Setelah</div><div class="ba-value">${getOutcomeLabel(cekUlang?.outcome)}</div></div>
            </div>
          ` : ''}
        </div>
      ` : ''}

      <div class="report-batas">
        <strong>Catatan batas sistem:</strong><br/>
        ${esc(unit.catatan_batas ?? '')}
      </div>

      <div class="report-actions">
        ${!decision && !pVerdict ? `<button class="btn-primary" onclick="navigate('#unit/${unit.id}')">Lanjutkan perjalanan</button>` : ''}
        <button class="btn-ghost" onclick="navigate('#map')">Kembali ke peta</button>
        ${!us.visitClosed ? `<button class="btn-ghost btn-small" onclick="doCloseVisit('${unit.id}')">Tutup kunjungan unit ini</button>` : ''}
      </div>
    </div>
  `;
}

window.doCloseVisit = function(unitId) { closeVisit(unitId); navigate('#map'); };

// ─────────────────────────────────────────────────────
// View: Full Report
// ─────────────────────────────────────────────────────
function renderFullReport() {
  const s = getState();
  const unitOutcomes = getAllUnitOutcomes();

  app.innerHTML = `
    <div class="view-report">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk orang tua · Laporan keseluruhan</div>
      </header>
      <h1 class="report-title">${s.childName ? esc(s.childName) : 'Anak'}</h1>
      <div class="report-child">${s.kelas ? esc(s.kelas) : ''} · Bahasa Indonesia Fase A</div>

      <div class="full-report-table">
        ${UNITS.map(u => {
          const us = getUnitState(u.id);
          const outcome = us.masteryDecision?.masteryProven ? OUTCOME.TERLIHAT_BISA
            : us.parentVerdict?.verdict === 'BISA' ? OUTCOME.DINILAI_ORANG_TUA_BISA
            : us.parentVerdict?.verdict === 'PERLU_LATIHAN' ? OUTCOME.DINILAI_ORANG_TUA_PERLU_LATIHAN
            : us.cekAwal?.outcome ?? null;
          return `
            <div class="full-report-row">
              <div class="fr-id">${esc(u.id)}</div>
              <div class="fr-label">${esc(u.label)}</div>
              <div class="fr-outcome ${outcome ? 'outcome-' + outcome.toLowerCase() : 'outcome-null'}">
                ${outcome ? getOutcomeLabel(outcome) : 'Belum diperiksa'}
              </div>
              <button class="btn-link" onclick="navigate('#unit/${u.id}')">→</button>
            </div>
          `;
        }).join('')}
      </div>

      <div class="report-batas">
        "Berhasil pada cek ini" menunjukkan hasil pada sesi tersebut — bukan klaim kemampuan stabil.<br/>
        Penilaian orang tua berdasarkan panduan rubrik yang disediakan sistem.
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatDate(isoString) {
  if (!isoString) return '-';
  try {
    return new Date(isoString).toLocaleString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch { return isoString; }
}

window.navigate = navigate;
