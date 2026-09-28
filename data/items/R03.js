/**
 * Item bank untuk BI-A-R03 — Memahami peristiwa dalam rangkaian visual
 * Evidence mode: AUTO
 *
 * Family:
 *   FAM-A: urutan kejadian dalam rangkaian visual
 *   FAM-B: hubungan sebab-akibat dalam gambar
 *
 * Panel gambar menggunakan inline SVG untuk tampilan konsisten lintas device.
 * Field `svg` berisi markup SVG; field `deskripsi` tetap ada sebagai alt-text.
 */

export const UNIT_ID = 'BI-A-R03';

// ── SVG helpers ──────────────────────────────────────────────────────────────
// Setiap SVG: viewBox="0 0 80 80", sederhana dan jelas untuk kelas 1.

const SVG = {

  // Pertumbuhan tanaman
  biji: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#E8F5E9"/>
    <rect x="0" y="48" width="80" height="32" fill="#795548"/>
    <ellipse cx="40" cy="54" rx="9" ry="6" fill="#4E342E"/>
    <line x1="40" y1="48" x2="40" y2="40" stroke="#388E3C" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  sprout: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#E8F5E9"/>
    <rect x="0" y="52" width="80" height="28" fill="#795548"/>
    <line x1="40" y1="52" x2="40" y2="24" stroke="#388E3C" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="28" cy="34" rx="12" ry="7" fill="#66BB6A" transform="rotate(-25 28 34)"/>
    <ellipse cx="52" cy="34" rx="12" ry="7" fill="#66BB6A" transform="rotate(25 52 34)"/>
  </svg>`,

  pohon_berbuah: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#E8F5E9"/>
    <rect x="0" y="58" width="80" height="22" fill="#795548"/>
    <rect x="34" y="44" width="12" height="18" fill="#6D4C41"/>
    <circle cx="40" cy="30" r="22" fill="#43A047"/>
    <circle cx="29" cy="25" r="5" fill="#E53935"/>
    <circle cx="49" cy="22" r="5" fill="#E53935"/>
    <circle cx="38" cy="38" r="5" fill="#E53935"/>
  </svg>`,

  // Hujan dan genangan
  hujan: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#B0BEC5"/>
    <ellipse cx="40" cy="22" rx="28" ry="14" fill="#78909C"/>
    <ellipse cx="22" cy="26" rx="16" ry="11" fill="#78909C"/>
    <ellipse cx="58" cy="26" rx="16" ry="11" fill="#78909C"/>
    <line x1="18" y1="44" x2="14" y2="58" stroke="#1565C0" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="33" y1="44" x2="29" y2="58" stroke="#1565C0" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="48" y1="44" x2="44" y2="58" stroke="#1565C0" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="63" y1="44" x2="59" y2="58" stroke="#1565C0" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="25" y1="54" x2="21" y2="68" stroke="#1565C0" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="55" y1="54" x2="51" y2="68" stroke="#1565C0" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  genangan: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#CFD8DC"/>
    <rect x="0" y="52" width="80" height="28" fill="#9E9E9E"/>
    <ellipse cx="40" cy="56" rx="30" ry="10" fill="#42A5F5" opacity="0.85"/>
    <ellipse cx="40" cy="56" rx="20" ry="6" fill="none" stroke="#1E88E5" stroke-width="1.5"/>
    <path d="M40 28 Q44 40 40 52 Q36 40 40 28Z" fill="#42A5F5"/>
  </svg>`,

  anak_jas_hujan: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#CFD8DC"/>
    <rect x="0" y="65" width="80" height="15" fill="#9E9E9E"/>
    <circle cx="40" cy="22" r="11" fill="#FFCC80"/>
    <path d="M27 22 Q40 6 53 22Z" fill="#F57F17"/>
    <rect x="26" y="33" width="28" height="26" rx="5" fill="#FFB300"/>
    <rect x="28" y="56" width="9" height="14" rx="3" fill="#5C6BC0"/>
    <rect x="43" y="56" width="9" height="14" rx="3" fill="#5C6BC0"/>
    <line x1="54" y1="28" x2="62" y2="65" stroke="#795548" stroke-width="3" stroke-linecap="round"/>
    <path d="M42 28 Q54 20 68 28" fill="#E53935"/>
  </svg>`,

  // Belanja
  keranjang_kosong: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF9C4"/>
    <path d="M20 30 L25 58 L55 58 L60 30Z" fill="none" stroke="#795548" stroke-width="3"/>
    <line x1="14" y1="30" x2="66" y2="30" stroke="#795548" stroke-width="3" stroke-linecap="round"/>
    <line x1="30" y1="30" x2="26" y2="18" stroke="#795548" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="50" y1="30" x2="54" y2="18" stroke="#795548" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="30" cy="62" r="4" fill="#795548"/>
    <circle cx="50" cy="62" r="4" fill="#795548"/>
  </svg>`,

  keranjang_isi: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF9C4"/>
    <path d="M20 35 L25 60 L55 60 L60 35Z" fill="none" stroke="#795548" stroke-width="3"/>
    <line x1="14" y1="35" x2="66" y2="35" stroke="#795548" stroke-width="3" stroke-linecap="round"/>
    <circle cx="32" cy="28" r="7" fill="#E53935"/>
    <circle cx="44" cy="26" r="7" fill="#E53935"/>
    <ellipse cx="38" cy="30" rx="8" ry="6" fill="#66BB6A"/>
    <circle cx="29" cy="62" r="4" fill="#795548"/>
    <circle cx="51" cy="62" r="4" fill="#795548"/>
  </svg>`,

  bayar: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF9C4"/>
    <rect x="16" y="28" width="48" height="30" rx="4" fill="#A5D6A7"/>
    <rect x="22" y="34" width="36" height="6" rx="2" fill="#2E7D32"/>
    <circle cx="34" cy="50" r="5" fill="#FDD835"/>
    <circle cx="46" cy="50" r="5" fill="#FDD835"/>
    <polyline points="28,46 34,52 52,34" fill="none" stroke="#1B5E20" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // Gigi
  tidak_gosok_gigi: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#E8EAF6"/>
    <circle cx="40" cy="30" r="16" fill="#FFCC80"/>
    <line x1="32" y1="36" x2="32" y2="40" stroke="#5D4037" stroke-width="2"/>
    <line x1="40" y1="36" x2="40" y2="40" stroke="#5D4037" stroke-width="2"/>
    <line x1="48" y1="36" x2="48" y2="40" stroke="#5D4037" stroke-width="2"/>
    <path d="M33 43 Q40 46 47 43" fill="none" stroke="#5D4037" stroke-width="2" stroke-linecap="round"/>
    <circle cx="40" cy="22" r="5" fill="none" stroke="#5D4037" stroke-width="1.5" stroke-dasharray="2,2"/>
    <line x1="55" y1="52" x2="68" y2="38" stroke="#E53935" stroke-width="3" stroke-linecap="round"/>
    <line x1="55" y1="38" x2="68" y2="52" stroke="#E53935" stroke-width="3" stroke-linecap="round"/>
    <rect x="12" y="48" width="16" height="6" rx="3" fill="#29B6F6"/>
    <text x="20" y="70" text-anchor="middle" font-size="9" fill="#1565C0">sikat gigi</text>
  </svg>`,

  gigi_sakit: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFEBEE"/>
    <path d="M30 20 L30 55 Q30 62 40 62 Q50 62 50 55 L50 20 Q47 14 40 14 Q33 14 30 20Z" fill="white" stroke="#BDBDBD" stroke-width="2"/>
    <line x1="52" y1="18" x2="58" y2="12" stroke="#E53935" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="56" y1="22" x2="64" y2="20" stroke="#E53935" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="54" y1="28" x2="62" y2="30" stroke="#E53935" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="40" cy="38" r="6" fill="#FFCDD2"/>
    <text x="40" y="42" text-anchor="middle" font-size="10" fill="#C62828">!</text>
  </svg>`,

  dokter: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#E3F2FD"/>
    <circle cx="40" cy="20" r="12" fill="#FFCC80"/>
    <rect x="24" y="32" width="32" height="34" rx="4" fill="white" stroke="#90CAF9" stroke-width="1.5"/>
    <line x1="40" y1="40" x2="40" y2="54" stroke="#E53935" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="33" y1="47" x2="47" y2="47" stroke="#E53935" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="28" y="64" width="10" height="12" rx="3" fill="#90CAF9"/>
    <rect x="42" y="64" width="10" height="12" rx="3" fill="#90CAF9"/>
    <path d="M52 28 Q58 24 62 30 Q62 36 56 36 Q50 36 50 30 Q50 24 56 24" fill="none" stroke="#B0BEC5" stroke-width="1.5"/>
  </svg>`,

  // Melukis
  kuas_kertas: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF8E1"/>
    <rect x="12" y="20" width="38" height="48" rx="3" fill="white" stroke="#E0E0E0" stroke-width="2"/>
    <line x1="58" y1="14" x2="46" y2="52" stroke="#795548" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="44" cy="54" rx="5" ry="3" fill="#42A5F5" transform="rotate(-60 44 54)"/>
  </svg>`,

  celup_cat: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF8E1"/>
    <ellipse cx="40" cy="56" rx="24" ry="14" fill="#F5F5F5" stroke="#BDBDBD" stroke-width="1.5"/>
    <circle cx="28" cy="52" r="7" fill="#E53935"/>
    <circle cx="40" cy="48" r="7" fill="#FDD835"/>
    <circle cx="52" cy="52" r="7" fill="#1565C0"/>
    <circle cx="34" cy="60" r="5" fill="#388E3C"/>
    <line x1="50" y1="14" x2="42" y2="50" stroke="#795548" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="40" cy="52" rx="4" ry="2.5" fill="#E53935" transform="rotate(-60 40 52)"/>
  </svg>`,

  lukisan_jadi: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF8E1"/>
    <rect x="10" y="12" width="60" height="48" rx="3" fill="#795548"/>
    <rect x="14" y="16" width="52" height="40" rx="2" fill="#E3F2FD"/>
    <circle cx="40" cy="30" r="10" fill="#FDD835"/>
    <path d="M16 48 Q28 34 40 42 Q52 50 64 36" fill="none" stroke="#388E3C" stroke-width="3" stroke-linecap="round"/>
    <rect x="36" y="60" width="8" height="12" fill="#795548"/>
    <rect x="28" y="70" width="24" height="4" rx="2" fill="#795548"/>
  </svg>`,

  // Menyiram bunga
  siram_bibit: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#E8F5E9"/>
    <rect x="0" y="56" width="80" height="24" fill="#795548"/>
    <line x1="36" y1="56" x2="36" y2="40" stroke="#388E3C" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="28" cy="46" rx="9" ry="5" fill="#66BB6A" transform="rotate(-20 28 46)"/>
    <path d="M14 20 L22 20 L22 32 L18 36 L14 32 Z" fill="#29B6F6"/>
    <line x1="22" y1="24" x2="50" y2="24" stroke="#29B6F6" stroke-width="2.5"/>
    <path d="M50 24 Q54 24 54 28" fill="none" stroke="#29B6F6" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="50" y1="32" x2="44" y2="44" stroke="#1E88E5" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="54" y1="30" x2="50" y2="42" stroke="#1E88E5" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="58" y1="32" x2="56" y2="44" stroke="#1E88E5" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  matahari_bibit: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFFDE7"/>
    <rect x="0" y="56" width="80" height="24" fill="#795548"/>
    <circle cx="20" cy="18" r="12" fill="#FDD835"/>
    <line x1="20" y1="2" x2="20" y2="6" stroke="#FDD835" stroke-width="2" stroke-linecap="round"/>
    <line x1="20" y1="30" x2="20" y2="34" stroke="#FDD835" stroke-width="2" stroke-linecap="round"/>
    <line x1="4" y1="18" x2="8" y2="18" stroke="#FDD835" stroke-width="2" stroke-linecap="round"/>
    <line x1="32" y1="18" x2="36" y2="18" stroke="#FDD835" stroke-width="2" stroke-linecap="round"/>
    <line x1="8" y1="6" x2="11" y2="9" stroke="#FDD835" stroke-width="2" stroke-linecap="round"/>
    <line x1="29" y1="27" x2="32" y2="30" stroke="#FDD835" stroke-width="2" stroke-linecap="round"/>
    <line x1="36" y1="40" x2="36" y2="26" stroke="#388E3C" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="26" cy="34" rx="11" ry="6" fill="#66BB6A" transform="rotate(-20 26 34)"/>
    <ellipse cx="46" cy="34" rx="11" ry="6" fill="#66BB6A" transform="rotate(20 46 34)"/>
    <line x1="36" y1="26" x2="36" y2="20" stroke="#388E3C" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="30" cy="22" rx="7" ry="4" fill="#81C784" transform="rotate(-25 30 22)"/>
  </svg>`,

  bunga_mekar: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#E8F5E9"/>
    <rect x="0" y="60" width="80" height="20" fill="#795548"/>
    <line x1="40" y1="60" x2="40" y2="38" stroke="#388E3C" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="28" cy="48" rx="11" ry="6" fill="#66BB6A" transform="rotate(-20 28 48)"/>
    <circle cx="40" cy="28" r="8" fill="#FDD835"/>
    <ellipse cx="40" cy="16" rx="7" ry="10" fill="#F48FB1"/>
    <ellipse cx="52" cy="22" rx="10" ry="7" fill="#F48FB1" transform="rotate(30 52 22)"/>
    <ellipse cx="52" cy="34" rx="10" ry="7" fill="#F48FB1" transform="rotate(-30 52 34)"/>
    <ellipse cx="40" cy="40" rx="7" ry="10" fill="#F48FB1"/>
    <ellipse cx="28" cy="34" rx="10" ry="7" fill="#F48FB1" transform="rotate(30 28 34)"/>
    <ellipse cx="28" cy="22" rx="10" ry="7" fill="#F48FB1" transform="rotate(-30 28 22)"/>
  </svg>`,

  // Anjing dan lantai
  anjing_kotor: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF8E1"/>
    <rect x="0" y="58" width="80" height="22" fill="#F5F5F5"/>
    <ellipse cx="42" cy="40" rx="22" ry="14" fill="#A1887F"/>
    <circle cx="62" cy="30" r="12" fill="#A1887F"/>
    <ellipse cx="68" cy="26" rx="5" ry="3" fill="#8D6E63" transform="rotate(-20 68 26)"/>
    <circle cx="65" cy="28" r="2" fill="#333"/>
    <line x1="28" y1="50" x2="20" y2="62" stroke="#A1887F" stroke-width="4" stroke-linecap="round"/>
    <line x1="36" y1="52" x2="32" y2="64" stroke="#A1887F" stroke-width="4" stroke-linecap="round"/>
    <line x1="48" y1="52" x2="50" y2="64" stroke="#A1887F" stroke-width="4" stroke-linecap="round"/>
    <line x1="56" y1="50" x2="62" y2="62" stroke="#A1887F" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="22" cy="64" rx="5" ry="3" fill="#6D4C41"/>
    <ellipse cx="33" cy="66" rx="5" ry="3" fill="#6D4C41"/>
    <ellipse cx="50" cy="66" rx="5" ry="3" fill="#6D4C41"/>
    <ellipse cx="62" cy="64" rx="5" ry="3" fill="#6D4C41"/>
  </svg>`,

  jejak_kotor: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#F5F5F5"/>
    <ellipse cx="18" cy="20" rx="7" ry="5" fill="#6D4C41"/>
    <ellipse cx="14" cy="14" rx="3" ry="2" fill="#6D4C41"/>
    <ellipse cx="22" cy="13" rx="3" ry="2" fill="#6D4C41"/>
    <ellipse cx="36" cy="38" rx="7" ry="5" fill="#6D4C41"/>
    <ellipse cx="32" cy="32" rx="3" ry="2" fill="#6D4C41"/>
    <ellipse cx="40" cy="31" rx="3" ry="2" fill="#6D4C41"/>
    <ellipse cx="54" cy="56" rx="7" ry="5" fill="#6D4C41"/>
    <ellipse cx="50" cy="50" rx="3" ry="2" fill="#6D4C41"/>
    <ellipse cx="58" cy="49" rx="3" ry="2" fill="#6D4C41"/>
  </svg>`,

  ibu_mengepel: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#F5F5F5"/>
    <circle cx="40" cy="16" r="10" fill="#FFCC80"/>
    <rect x="28" y="26" width="24" height="28" rx="4" fill="#EF9A9A"/>
    <rect x="30" y="52" width="8" height="16" rx="3" fill="#5C6BC0"/>
    <rect x="42" y="52" width="8" height="16" rx="3" fill="#5C6BC0"/>
    <line x1="52" y1="30" x2="66" y2="70" stroke="#795548" stroke-width="3" stroke-linecap="round"/>
    <rect x="58" y="66" width="14" height="6" rx="3" fill="#90A4AE"/>
    <path d="M28 35 Q16 40 18 50 Q20 54 26 50" fill="none" stroke="#FFCC80" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // Hadiah
  kotak_tertutup: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF3E0"/>
    <rect x="12" y="34" width="56" height="36" rx="3" fill="#FF8A65"/>
    <rect x="12" y="28" width="56" height="10" rx="3" fill="#FF5722"/>
    <line x1="40" y1="28" x2="40" y2="70" stroke="#FDD835" stroke-width="4"/>
    <path d="M40 28 Q28 18 24 24 Q20 30 40 28Z" fill="#FDD835"/>
    <path d="M40 28 Q52 18 56 24 Q60 30 40 28Z" fill="#FDD835"/>
  </svg>`,

  buka_pita: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF3E0"/>
    <rect x="14" y="38" width="52" height="32" rx="3" fill="#FF8A65"/>
    <rect x="14" y="32" width="52" height="10" rx="3" fill="#FF5722"/>
    <path d="M30 20 L46 36" stroke="#FDD835" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 20 L34 36" stroke="#FDD835" stroke-width="3" stroke-linecap="round"/>
    <rect x="52" y="10" width="20" height="8" rx="3" fill="#BDBDBD" transform="rotate(-40 52 10)"/>
    <line x1="56" y1="18" x2="44" y2="34" stroke="#BDBDBD" stroke-width="2"/>
  </svg>`,

  anak_senang_hadiah: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF3E0"/>
    <circle cx="40" cy="26" r="14" fill="#FFCC80"/>
    <circle cx="34" cy="23" r="2.5" fill="#4E342E"/>
    <circle cx="46" cy="23" r="2.5" fill="#4E342E"/>
    <path d="M34 32 Q40 38 46 32" fill="none" stroke="#4E342E" stroke-width="2" stroke-linecap="round"/>
    <rect x="18" y="54" width="16" height="14" rx="2" fill="#FF8A65"/>
    <rect x="18" y="50" width="16" height="8" rx="2" fill="#FF5722"/>
    <line x1="26" y1="50" x2="26" y2="68" stroke="#FDD835" stroke-width="2.5"/>
    <path d="M26 50 Q20 44 18 46 Q16 48 26 50Z" fill="#FDD835"/>
    <path d="M26 50 Q32 44 34 46 Q36 48 26 50Z" fill="#FDD835"/>
    <line x1="34" y1="40" x2="20" y2="52" stroke="#FFCC80" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="46" y1="40" x2="48" y2="50" stroke="#FFCC80" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // Sekolah
  matahari_terbit: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF9C4"/>
    <rect x="0" y="50" width="80" height="30" fill="#A5D6A7"/>
    <path d="M0 50 Q40 30 80 50Z" fill="#81C784"/>
    <circle cx="40" cy="50" r="22" fill="#FDD835"/>
    <line x1="40" y1="4" x2="40" y2="14" stroke="#FDD835" stroke-width="3" stroke-linecap="round"/>
    <line x1="62" y1="10" x2="58" y2="18" stroke="#FDD835" stroke-width="3" stroke-linecap="round"/>
    <line x1="18" y1="10" x2="22" y2="18" stroke="#FDD835" stroke-width="3" stroke-linecap="round"/>
    <line x1="72" y1="28" x2="63" y2="30" stroke="#FDD835" stroke-width="3" stroke-linecap="round"/>
    <line x1="8" y1="28" x2="17" y2="30" stroke="#FDD835" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  anak_ke_sekolah: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#E3F2FD"/>
    <rect x="0" y="56" width="80" height="24" fill="#A5D6A7"/>
    <rect x="36" y="22" width="36" height="34" rx="2" fill="#EF9A9A"/>
    <polygon points="36,22 54,8 72,22" fill="#E53935"/>
    <rect x="46" y="38" width="14" height="18" fill="#BBDEFB"/>
    <circle cx="18" cy="46" r="10" fill="#FFCC80"/>
    <rect x="12" y="56" width="12" height="18" rx="3" fill="#90CAF9"/>
    <rect x="8" y="52" width="6" height="12" rx="3" fill="#90CAF9"/>
    <rect x="20" y="52" width="6" height="12" rx="3" fill="#90CAF9"/>
  </svg>`,

  belajar_di_kelas: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#E8EAF6"/>
    <rect x="8" y="36" width="64" height="32" rx="3" fill="#FFFFFF" stroke="#C5CAE9" stroke-width="1.5"/>
    <rect x="14" y="42" width="28" height="20" rx="2" fill="#E3F2FD"/>
    <line x1="18" y1="48" x2="36" y2="48" stroke="#90A4AE" stroke-width="2" stroke-linecap="round"/>
    <line x1="18" y1="54" x2="34" y2="54" stroke="#90A4AE" stroke-width="2" stroke-linecap="round"/>
    <line x1="18" y1="58" x2="30" y2="58" stroke="#90A4AE" stroke-width="2" stroke-linecap="round"/>
    <line x1="50" y1="42" x2="50" y2="60" stroke="#795548" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="48" cy="44" rx="4" ry="2" fill="#F8BBD0" transform="rotate(-20 48 44)"/>
    <rect x="8" y="14" width="64" height="16" rx="2" fill="#1565C0"/>
    <line x1="16" y1="20" x2="44" y2="20" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <line x1="16" y1="26" x2="36" y2="26" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // Bola dan kaca
  anak_tendang_bola: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#E8F5E9"/>
    <rect x="0" y="62" width="80" height="18" fill="#A5D6A7"/>
    <circle cx="24" cy="24" r="10" fill="#FFCC80"/>
    <rect x="18" y="34" width="12" height="20" rx="3" fill="#90CAF9"/>
    <rect x="16" y="52" width="8" height="14" rx="3" fill="#5C6BC0"/>
    <rect x="26" y="52" width="8" height="14" rx="3" fill="#5C6BC0"/>
    <line x1="30" y1="46" x2="50" y2="38" stroke="#FFCC80" stroke-width="3" stroke-linecap="round"/>
    <circle cx="58" cy="34" r="12" fill="white" stroke="#333" stroke-width="2"/>
    <path d="M54 30 Q58 26 62 30 Q66 34 62 38 Q58 42 54 38 Q50 34 54 30Z" fill="#333" opacity="0.2"/>
    <path d="M50 36 L54 30" stroke="#333" stroke-width="1.5"/>
    <path d="M62 30 L66 28" stroke="#333" stroke-width="1.5"/>
  </svg>`,

  kaca_pecah: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#ECEFF1"/>
    <rect x="16" y="12" width="48" height="56" rx="3" fill="#B0BEC5" stroke="#78909C" stroke-width="2"/>
    <rect x="20" y="16" width="40" height="48" rx="2" fill="#E3F2FD" opacity="0.6"/>
    <line x1="40" y1="16" x2="26" y2="64" stroke="white" stroke-width="1.5" opacity="0.5"/>
    <line x1="40" y1="16" x2="38" y2="40" stroke="#90A4AE" stroke-width="2"/>
    <line x1="38" y1="40" x2="22" y2="58" stroke="#90A4AE" stroke-width="2"/>
    <line x1="38" y1="40" x2="56" y2="52" stroke="#90A4AE" stroke-width="2"/>
    <line x1="40" y1="16" x2="60" y2="30" stroke="#90A4AE" stroke-width="2"/>
    <line x1="60" y1="30" x2="50" y2="50" stroke="#90A4AE" stroke-width="2"/>
    <line x1="40" y1="16" x2="30" y2="36" stroke="#90A4AE" stroke-width="2"/>
    <circle cx="40" cy="16" r="5" fill="#FDD835" opacity="0.8"/>
  </svg>`,

  anak_takut: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#ECEFF1"/>
    <circle cx="40" cy="34" r="20" fill="#FFCC80"/>
    <circle cx="32" cy="30" r="3.5" fill="#4E342E"/>
    <circle cx="48" cy="30" r="3.5" fill="#4E342E"/>
    <circle cx="33" cy="29" r="1.5" fill="white"/>
    <circle cx="49" cy="29" r="1.5" fill="white"/>
    <ellipse cx="32" cy="26" rx="5" ry="3" fill="#FFCC80" stroke="#4E342E" stroke-width="1.5"/>
    <ellipse cx="48" cy="26" rx="5" ry="3" fill="#FFCC80" stroke="#4E342E" stroke-width="1.5"/>
    <path d="M32 42 Q36 38 40 42 Q44 46 48 42" fill="none" stroke="#4E342E" stroke-width="2" stroke-linecap="round"/>
    <rect x="28" y="54" width="24" height="22" rx="4" fill="#90CAF9"/>
    <rect x="24" y="52" width="8" height="14" rx="3" fill="#FFCC80"/>
    <rect x="48" y="52" width="8" height="14" rx="3" fill="#FFCC80"/>
  </svg>`,

  // Makan bersama
  makanan_di_meja: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF8E1"/>
    <rect x="8" y="44" width="64" height="8" rx="3" fill="#A1887F"/>
    <rect x="4" y="50" width="72" height="6" rx="3" fill="#8D6E63"/>
    <ellipse cx="28" cy="40" rx="14" ry="10" fill="white" stroke="#BDBDBD" stroke-width="1.5"/>
    <ellipse cx="28" cy="38" rx="10" ry="7" fill="#FFCC80"/>
    <ellipse cx="28" cy="37" rx="6" ry="4" fill="#FF8A65"/>
    <ellipse cx="52" cy="40" rx="12" ry="8" fill="white" stroke="#BDBDBD" stroke-width="1.5"/>
    <ellipse cx="52" cy="38" rx="8" ry="5" fill="#A5D6A7"/>
    <line x1="20" y1="30" x2="20" y2="44" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
    <line x1="36" y1="30" x2="36" y2="44" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  berdoa: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF8E1"/>
    <circle cx="40" cy="22" r="12" fill="#FFCC80"/>
    <path d="M28 22 Q28 14 40 14 Q52 14 52 22" fill="none" stroke="#4E342E" stroke-width="1.5"/>
    <path d="M28 44 Q22 52 28 60 Q34 64 40 64 Q46 64 50 60" fill="none" stroke="#FFCC80" stroke-width="3" stroke-linecap="round"/>
    <rect x="28" y="34" width="24" height="26" rx="4" fill="#FFB74D"/>
    <path d="M34 34 Q34 26 40 24 Q46 22 46 34" fill="#FFCC80"/>
    <ellipse cx="40" cy="58" rx="12" ry="8" fill="#FFCC80"/>
    <line x1="34" y1="54" x2="46" y2="54" stroke="#4E342E" stroke-width="2" stroke-linecap="round"/>
    <line x1="36" y1="58" x2="44" y2="58" stroke="#4E342E" stroke-width="2" stroke-linecap="round"/>
    <line x1="34" y1="58" x2="46" y2="58" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  makan_bersama: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="80" height="80" fill="#FFF8E1"/>
    <rect x="8" y="44" width="64" height="6" rx="3" fill="#A1887F"/>
    <circle cx="22" cy="30" r="8" fill="#FFCC80"/>
    <path d="M18 37 Q14 46 18 48 L26 48 Q30 46 26 37Z" fill="#90CAF9"/>
    <circle cx="40" cy="28" r="8" fill="#FFCC80"/>
    <path d="M36 35 Q32 44 36 46 L44 46 Q48 44 44 35Z" fill="#EF9A9A"/>
    <circle cx="58" cy="30" r="8" fill="#FFCC80"/>
    <path d="M54 37 Q50 46 54 48 L62 48 Q66 46 62 37Z" fill="#A5D6A7"/>
    <path d="M18 34 Q22 38 26 34" fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M36 32 Q40 36 44 32" fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M54 34 Q58 38 62 34" fill="none" stroke="#4E342E" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
};

export const ITEMS = [

  // ═══════════════════════════════════════════
  // CEK AWAL (2 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R03-CA-A1',
    family: 'FAM-A',
    phase: 'cek_awal',
    panels: [
      { svg: SVG.biji,         deskripsi: 'Biji kecil di dalam tanah' },
      { svg: SVG.sprout,       deskripsi: 'Tanaman kecil mulai tumbuh' },
      { svg: SVG.pohon_berbuah, deskripsi: 'Pohon besar dengan buah' },
    ],
    soal: 'Gambar mana yang paling cocok menunjukkan awal cerita?',
    opsi: [
      { id: 'a', teks: 'Pohon besar dengan buah' },
      { id: 'b', teks: 'Biji kecil di dalam tanah' },
      { id: 'c', teks: 'Tanaman kecil mulai tumbuh' },
    ],
    kunci: 'b',
  },
  {
    id: 'R03-CA-B1',
    family: 'FAM-B',
    phase: 'cek_awal',
    panels: [
      { svg: SVG.hujan,         deskripsi: 'Hujan lebat turun' },
      { svg: SVG.genangan,      deskripsi: 'Air menggenang di jalan' },
      { svg: SVG.anak_jas_hujan, deskripsi: 'Anak memakai jas hujan' },
    ],
    soal: 'Mengapa anak memakai jas hujan?',
    opsi: [
      { id: 'a', teks: 'Karena udara panas' },
      { id: 'b', teks: 'Karena sedang bermain layang-layang' },
      { id: 'c', teks: 'Karena hujan turun lebat' },
    ],
    kunci: 'c',
  },

  // ═══════════════════════════════════════════
  // LATIHAN TERPANDU (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R03-LT-A1',
    family: 'FAM-A',
    phase: 'latihan',
    panels: [
      { svg: SVG.keranjang_kosong, deskripsi: 'Ibu membawa keranjang belanja kosong' },
      { svg: SVG.keranjang_isi,   deskripsi: 'Ibu memilih buah dan sayur' },
      { svg: SVG.bayar,           deskripsi: 'Keranjang penuh, ibu membayar' },
    ],
    soal: 'Apa yang terjadi paling akhir?',
    opsi: [
      { id: 'a', teks: 'Ibu membawa keranjang kosong' },
      { id: 'b', teks: 'Ibu memilih buah dan sayur' },
      { id: 'c', teks: 'Ibu membayar belanjaan' },
    ],
    kunci: 'c',
    umpan_balik_benar: 'Betul! Membayar adalah langkah terakhir di gambar.',
    umpan_balik_salah: 'Perhatikan urutan gambar dari kiri ke kanan. Apa yang terjadi di gambar terakhir?',
  },
  {
    id: 'R03-LT-B1',
    family: 'FAM-B',
    phase: 'latihan',
    panels: [
      { svg: SVG.tidak_gosok_gigi, deskripsi: 'Anak tidak menyikat gigi sebelum tidur' },
      { svg: SVG.gigi_sakit,       deskripsi: 'Gigi anak sakit' },
      { svg: SVG.dokter,           deskripsi: 'Anak pergi ke dokter gigi' },
    ],
    soal: 'Mengapa gigi anak sakit?',
    opsi: [
      { id: 'a', teks: 'Karena ia makan terlalu banyak' },
      { id: 'b', teks: 'Karena ia tidak menyikat gigi' },
      { id: 'c', teks: 'Karena ia jatuh' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Benar! Gambar pertama menunjukkan alasannya.',
    umpan_balik_salah: 'Lihat gambar pertama. Apa yang tidak dilakukan anak itu?',
  },
  {
    id: 'R03-LT-A2',
    family: 'FAM-A',
    phase: 'latihan',
    panels: [
      { svg: SVG.kuas_kertas,  deskripsi: 'Anak mengambil kuas dan kertas' },
      { svg: SVG.celup_cat,    deskripsi: 'Anak mencelupkan kuas ke cat' },
      { svg: SVG.lukisan_jadi, deskripsi: 'Gambar indah sudah jadi' },
    ],
    soal: 'Apa yang dilakukan anak sebelum mencelupkan kuas ke cat?',
    opsi: [
      { id: 'a', teks: 'Menggantung gambar di dinding' },
      { id: 'b', teks: 'Mengambil kuas dan kertas' },
      { id: 'c', teks: 'Memperlihatkan gambar ke teman' },
    ],
    kunci: 'b',
    umpan_balik_benar: 'Tepat! Mengambil kuas dan kertas adalah langkah pertama.',
    umpan_balik_salah: 'Lihat gambar pertama — itu yang terjadi sebelum mencelupkan kuas.',
  },

  // ═══════════════════════════════════════════
  // LATIHAN MANDIRI (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R03-LM-A1',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    panels: [
      { svg: SVG.siram_bibit,    deskripsi: 'Menyiram bibit tanaman' },
      { svg: SVG.matahari_bibit, deskripsi: 'Bibit mendapat sinar matahari' },
      { svg: SVG.bunga_mekar,    deskripsi: 'Bunga mekar' },
    ],
    soal: 'Apa yang terjadi paling pertama?',
    opsi: [
      { id: 'a', teks: 'Bunga mekar' },
      { id: 'b', teks: 'Bibit mendapat sinar matahari' },
      { id: 'c', teks: 'Menyiram bibit tanaman' },
    ],
    kunci: 'c',
  },
  {
    id: 'R03-LM-B1',
    family: 'FAM-B',
    phase: 'latihan_mandiri',
    panels: [
      { svg: SVG.anjing_kotor,  deskripsi: 'Anjing berlari dengan kaki kotor' },
      { svg: SVG.jejak_kotor,   deskripsi: 'Jejak kotor di lantai bersih' },
      { svg: SVG.ibu_mengepel,  deskripsi: 'Ibu mengepel lantai' },
    ],
    soal: 'Mengapa lantai menjadi kotor?',
    opsi: [
      { id: 'a', teks: 'Karena ibu menumpahkan air' },
      { id: 'b', teks: 'Karena anjing berlari dengan kaki kotor' },
      { id: 'c', teks: 'Karena lantainya belum dipel' },
    ],
    kunci: 'b',
  },
  {
    id: 'R03-LM-A2',
    family: 'FAM-A',
    phase: 'latihan_mandiri',
    panels: [
      { svg: SVG.kotak_tertutup,    deskripsi: 'Hadiah dalam kotak tertutup' },
      { svg: SVG.buka_pita,         deskripsi: 'Tali hadiah dibuka' },
      { svg: SVG.anak_senang_hadiah, deskripsi: 'Anak senang melihat isi kotak' },
    ],
    soal: 'Apa yang terjadi setelah tali hadiah dibuka?',
    opsi: [
      { id: 'a', teks: 'Hadiah dimasukkan ke dalam kotak' },
      { id: 'b', teks: 'Anak senang melihat isi kotak' },
      { id: 'c', teks: 'Kotak hadiah diikat lagi' },
    ],
    kunci: 'b',
  },

  // ═══════════════════════════════════════════
  // CEK ULANG — bahan baru (3 soal)
  // ═══════════════════════════════════════════
  {
    id: 'R03-CU-A1',
    family: 'FAM-A',
    phase: 'cek_ulang',
    panels: [
      { svg: SVG.matahari_terbit,  deskripsi: 'Matahari terbit di pagi hari' },
      { svg: SVG.anak_ke_sekolah,  deskripsi: 'Anak-anak berangkat ke sekolah' },
      { svg: SVG.belajar_di_kelas, deskripsi: 'Murid belajar di kelas' },
    ],
    soal: 'Apa yang terjadi setelah matahari terbit?',
    opsi: [
      { id: 'a', teks: 'Murid belajar di kelas' },
      { id: 'b', teks: 'Anak-anak berangkat ke sekolah' },
      { id: 'c', teks: 'Matahari terbenam' },
    ],
    kunci: 'b',
  },
  {
    id: 'R03-CU-B1',
    family: 'FAM-B',
    phase: 'cek_ulang',
    panels: [
      { svg: SVG.anak_tendang_bola, deskripsi: 'Anak menendang bola terlalu keras' },
      { svg: SVG.kaca_pecah,        deskripsi: 'Kaca jendela pecah' },
      { svg: SVG.anak_takut,        deskripsi: 'Anak ketakutan' },
    ],
    soal: 'Mengapa kaca jendela pecah?',
    opsi: [
      { id: 'a', teks: 'Karena angin kencang' },
      { id: 'b', teks: 'Karena anak menendang bola terlalu keras' },
      { id: 'c', teks: 'Karena jendelanya sudah tua' },
    ],
    kunci: 'b',
  },
  {
    id: 'R03-CU-A2',
    family: 'FAM-A',
    phase: 'cek_ulang',
    panels: [
      { svg: SVG.makanan_di_meja, deskripsi: 'Nasi dan lauk tersaji di meja' },
      { svg: SVG.berdoa,          deskripsi: 'Keluarga berdoa sebelum makan' },
      { svg: SVG.makan_bersama,   deskripsi: 'Keluarga makan bersama dengan senang' },
    ],
    soal: 'Apa yang dilakukan keluarga sebelum makan?',
    opsi: [
      { id: 'a', teks: 'Mencuci piring' },
      { id: 'b', teks: 'Memasak nasi' },
      { id: 'c', teks: 'Berdoa' },
    ],
    kunci: 'c',
  },
];

export function getItemsByPhase(phase) {
  return ITEMS.filter(i => i.phase === phase);
}

export function getFamiliesInPhase(phase) {
  const items = getItemsByPhase(phase);
  return [...new Set(items.map(i => i.family))];
}
