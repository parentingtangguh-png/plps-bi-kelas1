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
import { COLLECT_PHASES } from '../data/items/COLLECT_UNITS.js';
import {
  scoreSession, decideMastery, findRootGap, getOutcomeLabel, OUTCOME,
} from './scoring.js';
import {
  getState, saveProfile, getUnitState, saveCekAwal, saveLatihanResponses,
  saveCekUlang, saveMasteryDecision, saveCollectEvidence, saveCollectLatihanEvidence,
  saveCollectCekUlangEvidence, saveParentVerdict, saveParentVerdictCekUlang, closeVisit,
  getAllUnitOutcomes, getPendingVerdict1, getPendingVerdict2, getPendingParentReviews,
  saveLatihanKonfirmasi, resetLatihanPercobaan, saveMediaBlob, getMediaBlob,
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

function isCollectUnit(unitId) { return !!COLLECT_PHASES[unitId]; }

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
  const dest = statusInfo.actionDest ?? `#unit/${unit.id}`;

  return `
    <div class="unit-card ${statusInfo.cssClass} ${isRootGap ? 'unit-card--root-gap' : ''}">
      <div class="unit-card-id">${esc(unit.id)}</div>
      <div class="unit-card-label">${esc(unit.label)}</div>
      <div class="unit-card-status">${statusInfo.label}</div>
      ${statusInfo.canStart ? `
        <button class="btn-unit-action" onclick="navigate('${dest}')">
          ${statusInfo.actionLabel}
        </button>
      ` : `<div class="unit-card-locked">${statusInfo.actionLabel}</div>`}
    </div>
  `;
}

function getUnitStatusInfo(unit, outcome, us) {
  if (us.masteryDecision?.masteryProven) {
    return { label: 'Dinilai bisa: cek awal + cek ulang ✓', cssClass: 'unit-card--mastered', canStart: true, actionLabel: 'Lihat laporan' };
  }
  if (us.masteryDecision && !us.masteryDecision.masteryProven) {
    return { label: 'Perlu latihan lanjutan', cssClass: 'unit-card--active', canStart: true, actionLabel: 'Lanjutkan' };
  }
  if (isCollectUnit(unit.id)) {
    if (us.collectCekUlangEvidence?.length > 0) {
      const allSkipped2 = us.collectCekUlangEvidence.every(e => e.type === 'skipped');
      if (allSkipped2) {
        return { label: 'Belum ada karya cek ulang', cssClass: 'unit-card--closed', canStart: true, actionLabel: 'Ulangi pengumpulan' };
      }
      return { label: 'Menunggu penilaian cek ulang', cssClass: 'unit-card--pending', canStart: true, actionLabel: 'Buka Dashboard →', actionDest: '#parent' };
    }
    if (us.parentVerdict) {
      return { label: `Verdik cek awal: ${us.parentVerdict.verdict === 'BISA' ? 'Bisa' : 'Perlu latihan'}`, cssClass: 'unit-card--active', canStart: true, actionLabel: 'Lanjutkan' };
    }
    if (us.collectEvidence?.length > 0) {
      const allSkipped1 = us.collectEvidence.every(e => e.type === 'skipped');
      if (allSkipped1) {
        return { label: 'Belum ada karya', cssClass: 'unit-card--closed', canStart: true, actionLabel: 'Ulangi pengumpulan' };
      }
      return { label: 'Menunggu penilaian cek awal', cssClass: 'unit-card--pending', canStart: true, actionLabel: 'Buka Dashboard →', actionDest: '#parent' };
    }
  }
  if (us.visitClosed) {
    return { label: 'Kunjungan ditutup', cssClass: 'unit-card--closed', canStart: true, actionLabel: 'Kunjungi lagi' };
  }
  if (us.cekAwal) {
    return { label: 'Sedang dijalani', cssClass: 'unit-card--active', canStart: true, actionLabel: 'Lanjutkan' };
  }
  const unitOutcomes = getAllUnitOutcomes();
  const prereqOk = unit.prerequisite.every(id => unitOutcomes[id] === OUTCOME.TERLIHAT_BISA);
  if (!prereqOk && unit.prerequisite.length > 0) {
    const unmetNames = unit.prerequisite
      .filter(id => unitOutcomes[id] !== OUTCOME.TERLIHAT_BISA)
      .map(id => UNITS_BY_ID[id]?.label ?? id)
      .join(', ');
    return { label: 'Prasyarat belum terpenuhi', cssClass: 'unit-card--locked', canStart: false, actionLabel: `Selesaikan dulu: ${unmetNames}` };
  }
  return { label: 'Tersedia', cssClass: 'unit-card--available', canStart: true, actionLabel: 'Mulai cek' };
}

// ─────────────────────────────────────────────────────
// View: Unit Journey — dispatcher
// ─────────────────────────────────────────────────────
function renderUnit(unitId) {
  const unit = UNITS_BY_ID[unitId];
  if (!unit) { navigate('#map'); return; }
  const s = getState();
  if (!s.childName) { navigate('#home'); return; }
  const us = getUnitState(unitId);

  if (isCollectUnit(unitId)) {
    renderCollectUnit(unit, us);
  } else {
    renderAutoUnit(unit, us);
  }
}

function renderAutoUnit(unit, us) {
  if (us.masteryDecision) { renderUnitReport(unit.id); return; }
  if (us.cekUlang && !us.masteryDecision) { renderCekUlangResult(unit, us); return; }
  if (us.latihan && !us.cekUlang) { renderCekUlangIntro(unit, us); return; }
  if (us.cekAwal && !us.latihan) { renderCekAwalResult(unit, us); return; }
  renderCekAwalIntro(unit);
}

function renderCollectUnit(unit, us) {
  if (us.masteryDecision) { renderUnitReport(unit.id); return; }
  if (us.collectCekUlangEvidence?.length > 0) { renderCollectCekUlangWaiting(unit, us); return; }
  // latihan selesai + konfirmasi orang tua → siap cek ulang
  if (us.latihan && us.latihanKonfirmasi && us.parentVerdict && !us.collectCekUlangEvidence?.length) { renderPostLatihanCollect(unit, us); return; }
  // latihan selesai tapi belum dikonfirmasi orang tua → layar konfirmasi + tampilkan karya
  if (us.latihan && !us.latihanKonfirmasi && us.parentVerdict) { renderLatihanKonfirmasiOrangTua(unit, us); return; }
  if (us.parentVerdict) { renderPostVerdict1(unit, us); return; }
  if (us.cekAwal) { renderCekAwalResultCollect(unit, us); return; }
  renderCekAwalIntro(unit);
}

// ─── Cek Awal Intro ──────────────────────────────────

function renderCekAwalIntro(unit) {
  const isCollect = isCollectUnit(unit.id);

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
  const phases = COLLECT_PHASES[unitId];
  if (!phases?.cek_awal?.length) { navigate('#map'); return; }
  renderCollectTask(UNITS_BY_ID[unitId], phases.cek_awal, 0, 'cek_awal');
};

window.startCollectLatihan = function(unitId) {
  const phases = COLLECT_PHASES[unitId];
  if (!phases?.latihan?.length) { navigate('#map'); return; }
  // Bersihkan percobaan latihan sebelumnya agar tinjauan hanya melihat karya terbaru
  resetLatihanPercobaan(unitId);
  const verdict1 = getUnitState(unitId).parentVerdict?.verdict ?? 'PERLU_LATIHAN';
  // Inject panduan yang sesuai jalur: penguatan (remedial) vs pendalaman (pengayaan)
  const tasks = phases.latihan.map(t => ({
    ...t,
    panduan: verdict1 === 'BISA' ? (t.panduan_pendalaman ?? t.panduan) : (t.panduan_penguatan ?? t.panduan),
    _latihanJenis: verdict1 === 'BISA' ? 'pendalaman' : 'penguatan',
  }));
  renderCollectTask(UNITS_BY_ID[unitId], tasks, 0, 'latihan');
};

window.startCollectCekUlang = function(unitId) {
  const phases = COLLECT_PHASES[unitId];
  if (!phases?.cek_ulang?.length) { navigate('#map'); return; }
  renderCollectTask(UNITS_BY_ID[unitId], phases.cek_ulang, 0, 'cek_ulang');
};

// ─── Sesi Item (AUTO) ─────────────────────────────────

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
          <div class="audio-label">${esc(item.audio_label)}</div>
          <div class="read-aloud-box">
            <p class="read-aloud-label">📖 Orang tua membacakan untuk anak:</p>
            <p class="read-aloud-text">${esc(item.audio_script)}</p>
          </div>
          <button id="playBtn" class="btn-primary" onclick="markAudioRead('${unit.id}', ${idx})">Sudah dibacakan →</button>
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

window.markAudioRead = function(unitId, itemIdx) {
  document.getElementById('playBtn').disabled = true;
  const qs = document.getElementById('questionSection');
  const qt = document.querySelector('.question-text');
  const opts = document.getElementById('options');
  if (qs) qs.style.display = 'block';
  if (qt) qt.style.display = 'block';
  if (opts) opts.style.display = 'flex';
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

// ─── Hasil Cek Awal (AUTO) ───────────────────────────

function renderCekAwalResult(unit, us) {
  const result = us.cekAwal;
  const s = getState();
  const isBerhasil = result.outcome === OUTCOME.TERLIHAT_BISA;
  const isFailed = result.outcome === OUTCOME.TUGAS_GAGAL_BERJALAN;

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
          <button class="btn-primary" onclick="showLatihanPenguatanIntro('${unit.id}')">Mulai latihan penguatan →</button>
        </div>
      `}
    </div>
  `;
}

window.showLatihanPenguatanIntro = function(unitId) {
  const unit = UNITS_BY_ID[unitId];
  if (!unit) return;
  app.innerHTML = `
    <div class="view-check">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk anak · Latihan penguatan</div>
      </header>
      <h1 class="check-title">${esc(unit.label)}</h1>
      <div class="collect-notice">
        <strong>Jalur latihan ini berisi tiga bagian:</strong>
        <ol style="margin:8px 0 0 16px;line-height:1.8;">
          <li><strong>Latihan penguatan</strong> — soal dengan umpan balik langsung</li>
          <li><strong>Latihan mandiri</strong> — soal tanpa umpan balik</li>
          <li><strong>Cek ulang</strong> — soal baru untuk konfirmasi kemampuan</li>
        </ol>
      </div>
      <button class="btn-primary" onclick="startLatihan('${unitId}')">Mulai latihan penguatan →</button>
      <button class="btn-ghost" onclick="navigate('#map')">Nanti saja</button>
    </div>
  `;
};

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

// ─── Cek Ulang (AUTO) ─────────────────────────────────

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

// ─────────────────────────────────────────────────────
// COLLECT unit — alur lengkap
// ─────────────────────────────────────────────────────

// Setelah cek_awal selesai: tampilkan link ke dashboard
function renderCekAwalResultCollect(unit, us) {
  const s = getState();
  const allSkipped = us.collectEvidence?.every(e => e.type === 'skipped');

  app.innerHTML = `
    <div class="view-result">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk orang tua · Bukti cek awal</div>
      </header>
      <h1 class="result-title">${esc(unit.label)}</h1>

      ${allSkipped ? `
        <div class="collect-skipped-warning">
          ⚠ Semua tugas dilewati tanpa bukti. ${esc(s.childName)} perlu mengulangi tugas ini agar orang tua bisa menilai.
        </div>
        <button class="btn-primary" onclick="startCollect('${unit.id}')">Ulangi pengumpulan bukti</button>
      ` : `
        <div class="collect-note">
          Bukti cek awal sudah dikumpulkan dan menunggu penilaian orang tua.
        </div>
        <div class="journey-steps">
          <div class="journey-step journey-step--done">① Kumpulkan bukti cek awal ✓</div>
          <div class="journey-step journey-step--active">② Orang tua nilai cek awal ← sekarang</div>
          <div class="journey-step journey-step--pending">③ Latihan</div>
          <div class="journey-step journey-step--pending">④ Kumpulkan bukti cek ulang</div>
          <div class="journey-step journey-step--pending">⑤ Orang tua nilai cek ulang</div>
        </div>
        <button class="btn-primary" onclick="navigate('#parent')">Buka Dashboard Orang Tua</button>
      `}
      <button class="btn-ghost" onclick="navigate('#map')">Kembali ke peta</button>
    </div>
  `;
}

// Setelah verdik pertama: tampilkan pilihan lanjutan
function renderPostVerdict1(unit, us) {
  const s = getState();
  const verdict1 = us.parentVerdict;

  app.innerHTML = `
    <div class="view-result">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk orang tua · Setelah penilaian cek awal</div>
      </header>
      <h1 class="result-title">${esc(unit.label)}</h1>

      <div class="prc-verdict prc-verdict--${verdict1.verdict.toLowerCase()} result-verdict-summary">
        ${verdict1.verdict === 'BISA' ? '✓ Orang tua menilai: Sudah bisa (cek awal)' : '○ Orang tua menilai: Perlu latihan (cek awal)'}
      </div>

      <div class="journey-steps">
        <div class="journey-step journey-step--done">① Kumpulkan bukti cek awal ✓</div>
        <div class="journey-step journey-step--done">② Orang tua nilai cek awal ✓</div>
        <div class="journey-step journey-step--active">③ Latihan ← sekarang</div>
        <div class="journey-step journey-step--pending">④ Kumpulkan bukti cek ulang</div>
        <div class="journey-step journey-step--pending">⑤ Orang tua nilai cek ulang</div>
      </div>

      <p class="check-desc">
        ${verdict1.verdict === 'BISA'
          ? `${esc(s.childName)} menunjukkan kemampuan pada cek awal. Lanjutkan ke latihan pendalaman, lalu buktikan lagi dengan cek ulang berbahan baru.`
          : `${esc(s.childName)} perlu latihan penguatan. Setelah latihan, lakukan cek ulang dengan bahan baru untuk konfirmasi.`
        }
      </p>

      <button class="btn-primary" onclick="startCollectLatihan('${unit.id}')">
        ${verdict1.verdict === 'BISA' ? 'Mulai latihan pendalaman →' : 'Mulai latihan penguatan →'}
      </button>
      <button class="btn-ghost" onclick="navigate('#map')">Nanti saja</button>
    </div>
  `;
}

// Fix A: blokir latihan jika tidak ada karya sama sekali
function renderLatihanBlokirTanpaKarya(unit) {
  app.innerHTML = `
    <div class="view-result">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk anak · Latihan</div>
      </header>
      <h1 class="result-title">${esc(unit.label)}</h1>
      <div class="collect-skipped-warning">
        ⚠ Latihan perlu diselesaikan dengan karya nyata (rekaman, foto, atau tulisan) agar bisa lanjut ke cek ulang.
        Lewati tugas hanya jika ada halangan teknis, bukan karena ingin melompat.
      </div>
      <button class="btn-primary" onclick="startCollectLatihan('${unit.id}')">Coba lagi latihan →</button>
      <button class="btn-ghost" onclick="navigate('#map')">Nanti saja</button>
    </div>
  `;
}

// Fix B: setelah latihan selesai, orang tua lihat karya + wajib jawab rubrik jalur-spesifik
async function renderLatihanKonfirmasiOrangTua(unit, us) {
  const s = getState();
  const jenis = us.parentVerdict?.verdict === 'BISA' ? 'pendalaman' : 'penguatan';
  const evidence = us.collectLatihanEvidence ?? [];
  const phases = COLLECT_PHASES[unit.id];
  const latihanTasks = phases?.latihan ?? [];

  // Lacak media yang hilang untuk blokir konfirmasi
  const missingMedia = [];

  // Loop berdasarkan latihanTasks (bukan evidence) agar rubrik selalu muncul
  // meski blob URL expired atau evidence kosong — rubrik bergantung pada task definition,
  // bukan pada ketersediaan media saat render
  const karya = await Promise.all(latihanTasks.map(async (task, taskIdx) => {
    const ev = evidence.find(e => e.taskId === task.id);
    // Pilih rubrik sesuai jalur
    const rubrikArr = (task.rubrik_orang_tua?.[jenis]) ?? [];

    let mediaHtml = '';
    if (!ev) {
      mediaHtml = `<p style="color:#9ca3af;font-size:0.9rem;">— belum dikumpulkan —</p>`;
    } else if (ev.type === 'audio' && ev.mediaId) {
      const blob = await getMediaBlob(ev.mediaId);
      if (blob) {
        const url = URL.createObjectURL(blob);
        mediaHtml = `<audio controls src="${url}" style="width:100%;margin:8px 0;"></audio>`;
      } else {
        missingMedia.push(task.id);
        mediaHtml = `<p class="collect-skipped-warning" data-missing="1">⚠ Rekaman tidak ditemukan di perangkat ini. Tidak dapat dikonfirmasi — ulangi latihan.</p>`;
      }
    } else if (ev.type === 'photo' && ev.mediaId) {
      const blob = await getMediaBlob(ev.mediaId);
      if (blob) {
        const url = URL.createObjectURL(blob);
        mediaHtml = `<img src="${url}" style="max-width:100%;border-radius:8px;margin:8px 0;" />`;
      } else {
        missingMedia.push(task.id);
        mediaHtml = `<p class="collect-skipped-warning" data-missing="1">⚠ Foto tidak ditemukan di perangkat ini. Tidak dapat dikonfirmasi — ulangi latihan.</p>`;
      }
    } else if (ev.type === 'text') {
      mediaHtml = `<div class="stimulus-box" style="white-space:pre-wrap;">${esc(ev.payload ?? '')}</div>`;
    } else {
      mediaHtml = `<p style="color:#9ca3af;font-size:0.9rem;">— tugas dilewati —</p>`;
    }

    // Rubrik selalu muncul berdasarkan task definition, bukan kondisi media
    const rubrikHtml = rubrikArr.length ? `
      <div style="margin-top:10px;">
        <strong style="font-size:0.85rem;">Yang perlu diamati:</strong>
        ${rubrikArr.map((r, rIdx) => `
          <div class="rubrik-item" style="margin:8px 0;">
            <p style="margin:0 0 4px;font-size:0.9rem;">${esc(r)}</p>
            <label style="margin-right:12px;">
              <input type="radio" name="rubrik_${taskIdx}_${rIdx}" value="ok" onchange="checkKonfirmasiReady('${unit.id}')">
              ✓ Sesuai panduan
            </label>
            <label>
              <input type="radio" name="rubrik_${taskIdx}_${rIdx}" value="retry" onchange="checkKonfirmasiReady('${unit.id}')">
              ✗ Perlu mencoba lagi
            </label>
          </div>`).join('')}
      </div>` : '';

    return `
      <div class="task-review-card" style="border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px;margin:10px 0;">
        <div style="font-size:0.85rem;color:#6b7280;margin-bottom:6px;">${esc(task.instruksi ?? task.id)}</div>
        ${mediaHtml}
        ${rubrikHtml}
      </div>`;
  }));

  // Hitung total butir rubrik dari task definition (bukan dari evidence)
  const totalRubrik = latihanTasks.reduce((acc, task) => {
    const arr = task.rubrik_orang_tua?.[jenis] ?? [];
    return acc + arr.length;
  }, 0);

  app.innerHTML = `
    <div class="view-result">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk orang tua · Tinjau hasil latihan</div>
      </header>
      <h1 class="result-title">${esc(unit.label)}</h1>

      <div class="journey-steps">
        <div class="journey-step journey-step--done">① Kumpulkan bukti cek awal ✓</div>
        <div class="journey-step journey-step--done">② Orang tua nilai cek awal ✓</div>
        <div class="journey-step journey-step--done">③ Latihan ${jenis} ✓ — menunggu tinjauan</div>
        <div class="journey-step journey-step--pending">④ Kumpulkan bukti cek ulang</div>
        <div class="journey-step journey-step--pending">⑤ Orang tua nilai cek ulang</div>
      </div>

      <p class="check-desc">
        ${esc(s.childName)} sudah menyelesaikan latihan ${jenis}. Lihat karya, jawab setiap poin, lalu konfirmasi.
      </p>

      ${karya.join('')}

      <div id="konfirmasiStatus" style="margin:12px 0;font-size:0.9rem;color:#6b7280;">
        ${missingMedia.length
          ? '⚠ Ada karya yang tidak ditemukan. Ulangi latihan agar semua karya tersedia.'
          : totalRubrik > 0
            ? 'Jawab semua poin pengamatan di atas untuk melanjutkan.'
            : ''}
      </div>

      <button id="btnKonfirmasi" class="btn-primary" disabled onclick="konfirmasiLatihanSelesai('${unit.id}')">
        Konfirmasi — lanjut ke cek ulang →
      </button>
      <!-- Fix 1: tombol ulangi tampak langsung jika ada media hilang; hidden jika tidak -->
      <button id="btnUlangLatihan" class="btn-secondary"
        style="display:${missingMedia.length ? '' : 'none'}"
        onclick="startCollectLatihan('${unit.id}')">Ulangi latihan</button>
      <button class="btn-ghost" onclick="navigate('#map')">Nanti saja</button>
    </div>
  `;

  // Simpan konteks untuk checkKonfirmasiReady
  window._konfirmasiCtx = { unitId: unit.id, totalRubrik, hasMissingMedia: missingMedia.length > 0 };

  // Jika tidak ada rubrik dan tidak ada media hilang (mis. semua dilewati), aktifkan langsung
  if (totalRubrik === 0 && missingMedia.length === 0) {
    document.getElementById('btnKonfirmasi').disabled = false;
    document.getElementById('konfirmasiStatus').textContent = '';
  }
}

window.checkKonfirmasiReady = function(unitId) {
  const ctx = window._konfirmasiCtx;
  if (!ctx || ctx.unitId !== unitId) return;

  const form = document.querySelectorAll('input[type=radio]');
  const groups = {};
  form.forEach(r => { groups[r.name] = groups[r.name] || []; groups[r.name].push(r); });

  const answeredCount = Object.values(groups).filter(g => g.some(r => r.checked)).length;
  const anyRetry = Object.values(groups).some(g => g.find(r => r.value === 'retry' && r.checked));
  const allAnswered = answeredCount === ctx.totalRubrik;

  const btnK = document.getElementById('btnKonfirmasi');
  const btnU = document.getElementById('btnUlangLatihan');
  const status = document.getElementById('konfirmasiStatus');

  if (ctx.hasMissingMedia) {
    btnK.disabled = true;
    btnU.style.display = '';
    status.textContent = '⚠ Ada karya yang tidak ditemukan. Ulangi latihan.';
  } else if (anyRetry) {
    btnK.disabled = true;
    btnU.style.display = '';
    status.textContent = '○ Ada poin yang perlu diperbaiki. Gunakan tombol "Ulangi latihan" di bawah.';
  } else if (allAnswered) {
    btnK.disabled = false;
    btnU.style.display = 'none';
    status.textContent = '✓ Semua poin sesuai panduan. Siap lanjut ke cek ulang.';
  } else {
    btnK.disabled = true;
    btnU.style.display = 'none';
    status.textContent = `Jawab semua poin pengamatan (${answeredCount}/${ctx.totalRubrik} dijawab).`;
  }
};

window.konfirmasiLatihanSelesai = function(unitId) {
  // Fix 2: kumpulkan semua jawaban radio dan simpan ke state
  const rubrikAnswers = {};
  document.querySelectorAll('input[type=radio]:checked').forEach(r => {
    rubrikAnswers[r.name] = r.value;
  });
  saveLatihanKonfirmasi(unitId, rubrikAnswers);
  startCollectCekUlang(unitId);
};

// Setelah latihan: pengalihan ke cek ulang ditampilkan di sini
// (latihan selesai → saveLatihanResponses kosong → renderUnit → renderPostLatihanCollect)
function renderPostLatihanCollect(unit, us) {
  const s = getState();
  app.innerHTML = `
    <div class="view-result">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk anak · Siap cek ulang</div>
      </header>
      <h1 class="result-title">${esc(unit.label)}</h1>

      <div class="journey-steps">
        <div class="journey-step journey-step--done">① Kumpulkan bukti cek awal ✓</div>
        <div class="journey-step journey-step--done">② Orang tua nilai cek awal ✓</div>
        <div class="journey-step journey-step--done">③ Latihan ✓</div>
        <div class="journey-step journey-step--active">④ Kumpulkan bukti cek ulang ← sekarang</div>
        <div class="journey-step journey-step--pending">⑤ Orang tua nilai cek ulang</div>
      </div>

      <p class="check-desc">
        Bagus! ${esc(s.childName)} sudah berlatih. Sekarang waktunya kumpulkan bukti dengan bahan baru untuk cek ulang.
      </p>
      <button class="btn-primary" onclick="startCollectCekUlang('${unit.id}')">Mulai cek ulang →</button>
      <button class="btn-ghost" onclick="navigate('#map')">Nanti saja</button>
    </div>
  `;
}

// Setelah cek_ulang: tunggu verdik kedua
function renderCollectCekUlangWaiting(unit, us) {
  const allSkipped = us.collectCekUlangEvidence?.every(e => e.type === 'skipped');
  const s = getState();

  app.innerHTML = `
    <div class="view-result">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk orang tua · Bukti cek ulang</div>
      </header>
      <h1 class="result-title">${esc(unit.label)}</h1>

      ${allSkipped ? `
        <div class="collect-skipped-warning">
          ⚠ Semua tugas cek ulang dilewati tanpa bukti. Perlu diulang agar orang tua bisa menilai.
        </div>
        <button class="btn-primary" onclick="startCollectCekUlang('${unit.id}')">Ulangi cek ulang</button>
      ` : `
        <div class="collect-note">
          Bukti cek ulang sudah dikumpulkan dan menunggu penilaian orang tua.
        </div>
        <div class="journey-steps">
          <div class="journey-step journey-step--done">① Kumpulkan bukti cek awal ✓</div>
          <div class="journey-step journey-step--done">② Orang tua nilai cek awal ✓</div>
          <div class="journey-step journey-step--done">③ Latihan ✓</div>
          <div class="journey-step journey-step--done">④ Kumpulkan bukti cek ulang ✓</div>
          <div class="journey-step journey-step--active">⑤ Orang tua nilai cek ulang ← sekarang</div>
        </div>
        <button class="btn-primary" onclick="navigate('#parent')">Buka Dashboard Orang Tua</button>
      `}
      <button class="btn-ghost" onclick="navigate('#map')">Kembali ke peta</button>
    </div>
  `;
}

// ─── Collect Task ─────────────────────────────────────

function renderCollectTask(unit, tasks, taskIdx, phase) {
  if (taskIdx >= tasks.length) {
    if (phase === 'cek_ulang') {
      // cek_ulang selesai → tandai di state sebagai done dengan dummy cekAwal jika belum ada
      renderUnit(unit.id);
    } else if (phase === 'latihan') {
      // Fix A: blokir jika tidak ada satu pun karya nyata
      const done = window._collectState?.latihanTasksDone ?? 0;
      if (done === 0) {
        renderLatihanBlokirTanpaKarya(unit);
        return;
      }
      // latihan selesai dengan karya → simpan; dispatcher akan routing ke konfirmasi orang tua
      saveLatihanResponses(unit.id, [{ tasksDone: done }]);
      renderUnit(unit.id);
      return;
    } else {
      // cek_awal selesai
      if (!getUnitState(unit.id).cekAwal) {
        saveCekAwal(unit.id, {
          outcome: OUTCOME.BUKTI_TERKUMPUL_BELUM_DAPAT_DINILAI_OTOMATIS,
          totalItems: 0, correctItems: 0, ratio: null,
        });
      }
      renderUnit(unit.id);
    }
    return;
  }

  const task = tasks[taskIdx];
  const hasAudio = !!task.audio_script;
  const hasPanels = !!task.panels;
  const hasKata = !!task.kata || !!task.kata_target;
  const hasPhoto = !!task.needsPhoto;
  const hasText = !!task.needsText;
  const phaseLabel = { cek_awal: 'Cek awal', latihan: 'Latihan', cek_ulang: 'Cek ulang' }[phase] ?? phase;

  app.innerHTML = `
    <div class="view-check">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk anak · ${phaseLabel} · ${taskIdx + 1} dari ${tasks.length}</div>
      </header>
      <h1 class="check-title">${esc(unit.label)}</h1>

      ${task.panduan ? `<div class="collect-panduan">${task.panduan}</div>` : ''}

      ${task.instruksi ? `<p class="check-desc">${esc(task.instruksi)}</p>` : ''}

      ${hasAudio ? `
        <div class="read-aloud-box">
          <p class="read-aloud-label">📖 Orang tua membacakan untuk anak:</p>
          <p class="read-aloud-text">${esc(task.audio_script)}</p>
        </div>
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
      ${task.stimulus_label && !task.stimulus_emoji && !hasPanels && !hasAudio ? `<div class="stimulus-box">${esc(task.stimulus_label)}</div>` : ''}

      ${hasKata ? `
        <div class="kata-list">${(task.kata || task.kata_target).map(k => `<span class="kata-chip">${esc(k)}</span>`).join('')}</div>
      ` : ''}

      ${hasText ? `
        <textarea id="writingInput" class="writing-input" placeholder="Tulis di sini..." rows="5"></textarea>
      ` : ''}

      ${hasPhoto ? `
        <div class="upload-section">
          <label class="upload-label">
            <input type="file" id="photoInput" accept="image/*" capture="environment" />
            📷 Ambil foto atau pilih gambar
          </label>
          <div id="photoPreview" class="photo-preview"></div>
        </div>
      ` : ''}

      <div class="record-section" id="recordSection">
        ${task.needsRecording ? `
          <button id="recBtn" class="btn-record" onclick="toggleRecording('${unit.id}', ${taskIdx})">🎤 Mulai rekam suara</button>
          <div id="recStatus" class="rec-status">Rekaman suara tersimpan di perangkat ini.</div>
        ` : ''}
      </div>

      <button class="btn-primary" id="collectNextBtn" onclick="collectNext('${unit.id}', ${taskIdx}, '${phase}')">
        ${taskIdx + 1 < tasks.length ? 'Lanjut →' : 'Selesai'}
      </button>
      <button class="btn-ghost" onclick="navigate('#map')">Kembali ke peta</button>
    </div>
  `;

  window._collectState = {
    unit, tasks, taskIdx, phase,
    recording: null, recorded: false, recordingBlob: null, photoBlob: null,
    // Fix A: lacak jumlah task latihan yang benar-benar dikerjakan (bukan dilewati)
    // Reset di task pertama; pertahankan saat navigasi antar task dalam satu sesi
    latihanTasksDone: (taskIdx === 0) ? 0 : (window._collectState?.latihanTasksDone ?? 0),
  };

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

window.collectNext = async function(unitId, taskIdx, phase) {
  const cs = window._collectState;
  const task = cs.tasks[taskIdx];
  // Latihan bukan untuk direview orang tua — hanya cek_awal dan cek_ulang yang disimpan sebagai bukti
  const saveEv = phase === 'cek_ulang' ? saveCollectCekUlangEvidence
               : phase === 'latihan'   ? saveCollectLatihanEvidence
               : saveCollectEvidence;

  if (task.needsText) {
    const input = document.getElementById('writingInput');
    const text = input?.value?.trim() ?? '';
    const minLen = task.min_panjang ?? 20;
    if (text.length < minLen) {
      alert(`Tulis paling sedikit ${minLen} karakter terlebih dahulu.`);
      return;
    }
    if (saveEv) saveEv(unitId, { taskId: task.id, type: 'text', payload: text });
    if (phase === 'latihan') cs.latihanTasksDone = (cs.latihanTasksDone ?? 0) + 1;

  } else if (task.needsPhoto) {
    if (cs.photoBlob) {
      const mediaId = `${unitId}_${task.id}_${phase}_${Date.now()}`;
      // Fix C: jika IndexedDB gagal, blokir — jangan catat sebagai bukti bermedia
      const savedId = await saveMediaBlob(mediaId, cs.photoBlob);
      if (!savedId) {
        alert('Foto gagal disimpan (IndexedDB tidak tersedia). Coba lagi atau gunakan browser lain.');
        return;
      }
      if (saveEv) saveEv(unitId, { taskId: task.id, type: 'photo', mediaId, payload: { size: cs.photoBlob.size } });
      if (phase === 'latihan') cs.latihanTasksDone = (cs.latihanTasksDone ?? 0) + 1;
    } else if (saveEv) {
      saveEv(unitId, { taskId: task.id, type: 'skipped', payload: null });
    }

  } else if (cs.recorded && cs.recordingBlob) {
    const mediaId = `${unitId}_${task.id}_${phase}_${Date.now()}`;
    // Fix C: jika IndexedDB gagal, blokir — jangan catat sebagai bukti bermedia
    const savedId = await saveMediaBlob(mediaId, cs.recordingBlob);
    if (!savedId) {
      alert('Rekaman gagal disimpan (IndexedDB tidak tersedia). Coba lagi atau gunakan browser lain.');
      return;
    }
    if (saveEv) saveEv(unitId, { taskId: task.id, type: 'audio', mediaId, payload: { size: cs.recordingBlob.size } });
    if (phase === 'latihan') cs.latihanTasksDone = (cs.latihanTasksDone ?? 0) + 1;

  } else if (saveEv) {
    saveEv(unitId, { taskId: task.id, type: 'skipped', payload: null });
  }

  renderCollectTask(cs.unit, cs.tasks, taskIdx + 1, phase);
};

// ─────────────────────────────────────────────────────
// View: Dashboard Orang Tua
// ─────────────────────────────────────────────────────
function renderParentDashboard() {
  const s = getState();
  const pendingV1 = getPendingVerdict1(UNITS);
  const pendingV2 = getPendingVerdict2(UNITS);
  const reviewed = UNITS.filter(u => {
    const us = getUnitState(u.id);
    return us.parentVerdictCekUlang || us.parentVerdict;
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
        Penilaian Anda dicatat sebagai bukti kemampuan.
      </p>

      ${pendingV1.length === 0 && pendingV2.length === 0 ? `
        <div class="parent-empty">
          <div class="parent-empty-icon">✓</div>
          <div>Tidak ada bukti yang menunggu penilaian saat ini.</div>
        </div>
      ` : ''}

      ${pendingV1.length > 0 ? `
        <div class="parent-section-title">Menunggu penilaian cek awal (${pendingV1.length})</div>
        ${pendingV1.map(u => renderParentReviewCard(u, getUnitState(u.id), 'cek_awal', false)).join('')}
      ` : ''}

      ${pendingV2.length > 0 ? `
        <div class="parent-section-title">Menunggu penilaian cek ulang (${pendingV2.length})</div>
        ${pendingV2.map(u => renderParentReviewCard(u, getUnitState(u.id), 'cek_ulang', false)).join('')}
      ` : ''}

      ${reviewed.length > 0 ? `
        <div class="parent-section-title parent-section-title--done">Sudah dinilai</div>
        ${reviewed.map(u => {
          const us = getUnitState(u.id);
          const donePhase = us.parentVerdictCekUlang ? 'cek_ulang' : 'cek_awal';
          return renderParentReviewCard(u, us, donePhase, true);
        }).join('')}
      ` : ''}
    </div>
  `;
}

function renderParentReviewCard(unit, us, verdikPhase, isDone) {
  const evidenceList = verdikPhase === 'cek_ulang'
    ? (us.collectCekUlangEvidence ?? [])
    : (us.collectEvidence ?? []);
  const verdict = verdikPhase === 'cek_ulang' ? us.parentVerdictCekUlang : us.parentVerdict;

  const hasRealEvidence = evidenceList.some(e => e.type !== 'skipped');
  const allSkipped = evidenceList.length > 0 && !hasRealEvidence;
  const hasMedia = evidenceList.some(e => e.mediaId);
  const textEvidence = evidenceList.find(e => e.type === 'text');

  const phaseLabel = verdikPhase === 'cek_ulang' ? 'Cek ulang' : 'Cek awal';

  return `
    <div class="parent-review-card ${isDone ? 'parent-review-card--done' : ''}">
      <div class="prc-id">${esc(unit.id)} · ${phaseLabel}</div>
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
      ` : allSkipped ? `
        <div class="prc-evidence prc-skipped">Tugas ini dilewati tanpa bukti.</div>
      ` : ''}

      ${isDone ? `
        <div class="prc-verdict prc-verdict--${verdict.verdict.toLowerCase()}">
          ${verdict.verdict === 'BISA' ? '✓ Dinilai: Sudah bisa' : '○ Dinilai: Perlu latihan lagi'}
          <span class="prc-verdict-date">${formatDate(verdict.verdictAt)}</span>
        </div>
        <button class="btn-ghost btn-small" onclick="undoParentVerdict('${unit.id}', '${verdikPhase}')">Ubah penilaian</button>
      ` : allSkipped ? `
        <div class="prc-warning">
          ⚠ Tidak ada karya anak yang tersimpan. Tugas perlu diulang sebelum dapat dinilai.
        </div>
        <button class="btn-ghost" onclick="navigate('#unit/${unit.id}')">Ulang tugas ini</button>
      ` : `
        <div class="prc-actions">
          <button class="btn-verdict-bisa" onclick="submitParentVerdict('${unit.id}', 'BISA', '${verdikPhase}')">✓ Sudah bisa</button>
          <button class="btn-verdict-latihan" onclick="submitParentVerdict('${unit.id}', 'PERLU_LATIHAN', '${verdikPhase}')">○ Perlu latihan lagi</button>
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

window.submitParentVerdict = function(unitId, verdict, phase) {
  if (phase === 'cek_ulang') {
    saveParentVerdictCekUlang(unitId, verdict);
  } else {
    saveParentVerdict(unitId, verdict);
  }
  renderParentDashboard();
};

window.undoParentVerdict = function(unitId, phase) {
  const s = getState();
  if (s.units[unitId]) {
    if (phase === 'cek_ulang') {
      s.units[unitId].parentVerdictCekUlang = null;
      s.units[unitId].masteryDecision = null;
    } else {
      s.units[unitId].parentVerdict = null;
    }
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
  const pVerdict1 = us.parentVerdict;
  const pVerdict2 = us.parentVerdictCekUlang;
  const isCollect = isCollectUnit(unitId);

  app.innerHTML = `
    <div class="view-report">
      <header class="check-header">
        <button class="btn-back" onclick="navigate('#map')">← Peta</button>
        <div class="check-badge">Untuk orang tua · Laporan unit</div>
      </header>

      <h1 class="report-title">${esc(unit.label)}</h1>
      <div class="report-child">${esc(s.childName)} · ${esc(s.kelas)}</div>

      ${isCollect ? `
        <div class="report-section">
          <div class="report-section-title">Cek awal</div>
          ${pVerdict1 ? `
            <div class="report-outcome outcome-${pVerdict1.verdict === 'BISA' ? 'terlihat_bisa' : 'masih_belajar'}">
              ${pVerdict1.verdict === 'BISA' ? 'Dinilai orang tua: Sudah bisa' : 'Dinilai orang tua: Perlu latihan'}
            </div>
            <div class="report-time">Tanggal: ${formatDate(pVerdict1.verdictAt)}</div>
          ` : cekAwal ? `
            <div class="report-outcome outcome-bukti_terkumpul_belum_dapat_dinilai_otomatis">Bukti terkumpul — belum dinilai</div>
          ` : `<div class="report-empty">Belum dilakukan.</div>`}
        </div>

        ${pVerdict2 ? `
          <div class="report-section">
            <div class="report-section-title">Cek ulang</div>
            <div class="report-outcome outcome-${pVerdict2.verdict === 'BISA' ? 'terlihat_bisa' : 'masih_belajar'}">
              ${pVerdict2.verdict === 'BISA' ? 'Dinilai orang tua: Sudah bisa' : 'Dinilai orang tua: Perlu latihan'}
            </div>
            <div class="report-time">Tanggal: ${formatDate(pVerdict2.verdictAt)}</div>
          </div>
        ` : ''}

        ${decision ? `
          <div class="report-section mastery-section ${decision.masteryProven ? 'mastery-proven' : 'mastery-not-proven'}">
            <div class="mastery-badge">
              ${decision.masteryProven
                ? (decision.verdict1 === 'BISA'
                    ? '✓ Dinilai bisa: cek awal dan cek ulang'
                    : '✓ Dinilai bisa pada cek ulang (setelah berlatih)')
                : (decision.verdict1 === 'BISA'
                    ? '○ Dinilai bisa pada cek awal, perlu latihan pada cek ulang'
                    : '○ Perlu latihan pada cek awal dan cek ulang')}
            </div>
            <div class="mastery-reason">${esc(decision.reason)}</div>
            ${decision.masteryProven ? `
              <div class="mastery-disclaimer">
                Ini mencatat bahwa orang tua menilai anak bisa pada kedua cek dengan bahan berbeda.
                Penilaian ini bukan pengganti asesmen formal — kemampuan yang stabil perlu dikonfirmasi
                pada sesi lain di hari berbeda oleh pengamat berbeda.
              </div>
            ` : ''}
          </div>
        ` : ''}
      ` : `
        <div class="report-section">
          <div class="report-section-title">Cek awal</div>
          ${cekAwal ? `
            <div class="report-outcome outcome-${cekAwal.outcome.toLowerCase()}">${getOutcomeLabel(cekAwal.outcome)}</div>
            ${cekAwal.totalItems > 0 ? `<div class="report-detail">${cekAwal.correctItems}/${cekAwal.totalItems} benar</div>` : ''}
            <div class="report-time">Tanggal: ${formatDate(cekAwal.scoredAt)}</div>
          ` : `<div class="report-empty">Belum dilakukan.</div>`}
        </div>

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
      `}

      <div class="report-batas">
        <strong>Catatan batas sistem:</strong><br/>
        ${esc(unit.catatan_batas ?? '')}
      </div>

      <div class="report-actions">
        ${!decision ? `<button class="btn-primary" onclick="navigate('#unit/${unit.id}')">Lanjutkan perjalanan</button>` : ''}
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
        <button class="btn-back" onclick="navigate('#home')">← Profil</button>
        <div class="check-badge">Untuk orang tua · Laporan keseluruhan</div>
      </header>
      <h1 class="report-title">${s.childName ? esc(s.childName) : 'Anak'}</h1>
      <div class="report-child">${s.kelas ? esc(s.kelas) : ''} · Bahasa Indonesia Fase A</div>

      <div class="full-report-table">
        ${UNITS.map(u => {
          const us = getUnitState(u.id);
          const outcome = us.masteryDecision?.masteryProven ? OUTCOME.TERLIHAT_BISA
            : us.masteryDecision && !us.masteryDecision.masteryProven ? OUTCOME.MASIH_BELAJAR
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
        "Dinilai bisa: cek awal + cek ulang" = orang tua menilai anak bisa pada kedua cek dengan bahan berbeda.
        Ini bukan klaim kemampuan stabil — bukan pengganti asesmen formal.<br/>
        "Berhasil pada cek ini" = hasil sesi tunggal — belum dikonfirmasi.
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
