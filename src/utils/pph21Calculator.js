/**
 * pph21Calculator.js — Logika perhitungan PPh 21 LENGKAP
 * Mencakup: TER, Progresif, Gross/Gross-Up/Net,
 *           Pensiun, Pesangon, PNS, Bukan Karyawan, PPh 26
 */
import {
  PTKP, TARIF_PROGRESIF, TARIF_PESANGON,
  BIAYA_JABATAN_PCT, BIAYA_JABATAN_MAX,
  BIAYA_PENSIUN_PCT, BIAYA_PENSIUN_MAX,
  FAKTOR_NON_NPWP, TARIF_PPH26, TARIF_PNS_HONOR,
  getTerKategori, getTerTabel,
} from './pph21Data'

export const fmtRp  = n  => 'Rp\u00A0' + Math.round(n).toLocaleString('id-ID')
export const fmtPct = n  => (n * 100).toFixed(2).replace('.',',') + '%'

// ─── Tarif Progresif umum ───────────────────────────────────────
export function hitungProgresif(pkp, tarifTabel = TARIF_PROGRESIF) {
  let sisa = pkp, prev = 0, pajak = 0
  const lapisan = []
  for (const l of tarifTabel) {
    if (sisa <= 0) break
    const batas = l.sampai ?? l.batas ?? Infinity
    const kena  = Math.min(sisa, batas - prev)
    const pph   = kena * l.tarif
    lapisan.push({ dari: prev, sampai: Math.min(pkp, batas), tarif: l.tarif, dasar: kena, pajak: pph })
    pajak += pph; sisa -= kena; prev = batas
  }
  return { pajak, lapisan }
}

// ─── Cari TER dari tabel ─────────────────────────────────────────
export function getTarifTer(bruto, tabel) {
  for (const r of tabel) if (bruto <= r.max) return r.tarif
  return tabel[tabel.length - 1].tarif
}

// ─── GROSS UP — iteratif ─────────────────────────────────────────
export function hitungGrossUp(params) {
  let tp = 0
  for (let i = 0; i < 60; i++) {
    const p = { ...params, tunjanganLain: (params.tunjanganLain || 0) + tp }
    const { pph21Bulanan } = _progresifBulanan(p)
    if (Math.abs(pph21Bulanan - tp) < 1) break
    tp = pph21Bulanan
  }
  return tp
}

// ─── Helper: progresif bulanan (internal) ────────────────────────
function _progresifBulanan(params) {
  const { gajiPokok=0, tunjanganLain=0, iuranJabatan=0, iuranPensiun=0,
          ptkpKey='TK0', npwp=true, masa=12 } = params
  const ptkpNilai   = PTKP[ptkpKey]?.nilai ?? 54_000_000
  const brutoSebulan= gajiPokok + tunjanganLain
  const brutoSetahun= brutoSebulan * masa
  const bj          = Math.min(brutoSetahun * BIAYA_JABATAN_PCT, BIAYA_JABATAN_MAX)
  const ij          = iuranJabatan * masa
  const ip          = Math.min(iuranPensiun * masa, BIAYA_PENSIUN_MAX)
  const netto       = brutoSetahun - bj - ij - ip
  const pkp         = Math.max(0, Math.floor((netto - ptkpNilai) / 1000) * 1000)
  let { pajak, lapisan } = hitungProgresif(pkp)
  if (!npwp) pajak = Math.round(pajak * FAKTOR_NON_NPWP)
  const pph21Bulanan = Math.round(pajak / masa)
  return { pph21Bulanan, pajak, lapisan, brutoSebulan, brutoSetahun, bj, ij, ip, netto, ptkpNilai, pkp }
}

// ═══════════════════════════════════════════════════════════════════
// 1. KARYAWAN TETAP — TER (Jan–Nov)
// ═══════════════════════════════════════════════════════════════════
export function hitungTetapTER(params) {
  const { gajiPokok=0, tunjanganLain=0, brutoSebelumnya=0,
          ptkpKey='TK0', npwp=true, metodePajak='gross', masa=1 } = params
  const terKat  = getTerKategori(ptkpKey, 'tetap')
  const tabel   = getTerTabel(terKat)
  const brutoSebulan = gajiPokok + tunjanganLain
  const tarifTer = getTarifTer(brutoSebulan, tabel)
  let pph21 = Math.round(brutoSebulan * tarifTer)
  if (!npwp) pph21 = Math.round(pph21 * FAKTOR_NON_NPWP)
  const thp = brutoSebulan - (metodePajak === 'gross' ? pph21 : 0)
  const brutoKumulatif = brutoSebelumnya + brutoSebulan

  return {
    metodePerhitungan: 'TER Bulanan',
    terKategori: terKat,
    tarifTer,
    brutoSebulan,
    brutoSebelumnya,
    brutoKumulatif,
    pph21Bulanan: pph21,
    thp,
    isGrossUp: false,
    ptkpDetail: PTKP[ptkpKey],
    breakdown: [
      { label:'Penghasilan Bruto Sebelumnya (akumulasi)',nilai:brutoSebelumnya },
      { label:'Gaji Pokok Bulan Ini',                   nilai:gajiPokok },
      { label:'Tunjangan Lain Bulan Ini',               nilai:tunjanganLain },
      { label:'Penghasilan Bruto Bulan Ini',            nilai:brutoSebulan, bold:true },
      { label:'Penghasilan Bruto Kumulatif s.d. Bulan Ini', nilai:brutoKumulatif, bold:true },
      { label:`Tarif TER Kat.${terKat} (${fmtPct(tarifTer)} × bruto)`, nilai:pph21, color:'red', bold:true },
      { label:'PPh 21 Dipotong Bulan Ini',              nilai:pph21, color:'red', bold:true },
      { label:'Take Home Pay (THP)',                    nilai:thp,  color:'green', bold:true },
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════
// 2. KARYAWAN TETAP — Progresif (Desember / Rekonsiliasi)
// ═══════════════════════════════════════════════════════════════════
export function hitungTetapProgresif(params) {
  const { gajiPokok=0, tunjanganLain=0, iuranJabatan=0, iuranPensiun=0,
          brutoSebelumnya=0, pph21Sebelumnya=0,
          ptkpKey='TK0', npwp=true, masa=12, metodePajak='gross' } = params

  const ptkpData    = PTKP[ptkpKey] ?? PTKP.TK0
  const ptkpNilai   = ptkpData.nilai
  const brutoSebulan= gajiPokok + tunjanganLain
  const brutoSetahun= brutoSebulan * masa
  const brutoKumulatif = brutoSebelumnya + brutoSebulan

  const bj  = Math.min(brutoSetahun * BIAYA_JABATAN_PCT, BIAYA_JABATAN_MAX)
  const ij  = iuranJabatan * masa
  const ip  = Math.min(iuranPensiun * masa, BIAYA_PENSIUN_MAX)
  const netto = brutoSetahun - bj - ij - ip
  const pkp   = Math.max(0, Math.floor((netto - ptkpNilai) / 1000) * 1000)

  let { pajak: pphSetahun, lapisan } = hitungProgresif(pkp)
  if (!npwp) pphSetahun = Math.round(pphSetahun * FAKTOR_NON_NPWP)

  const pph21BulanIni = Math.max(0, pphSetahun - pph21Sebelumnya)
  const pph21Bulanan  = Math.round(pphSetahun / masa)
  const thp = brutoSebulan - (metodePajak === 'gross' ? pph21BulanIni : 0)

  return {
    metodePerhitungan: 'Progresif Ps.17',
    brutoSebulan,
    brutoSebelumnya,
    brutoKumulatif,
    brutoSetahun,
    biayaJabatan: bj,
    iuranJabatanTahun: ij,
    iuranPensiunTahun: ip,
    netto,
    ptkpNilai,
    ptkpDetail: ptkpData,
    pkp,
    lapisan,
    pphSetahun,
    pph21Sebelumnya,
    pph21BulanIni,
    pph21Bulanan,
    thp,
    isGrossUp: false,
    breakdown: [
      { label:'Penghasilan Bruto Sebelumnya (Jan s.d. bulan lalu)', nilai:brutoSebelumnya },
      { label:'Gaji Pokok Bulan Ini',                               nilai:gajiPokok },
      { label:'Tunjangan Lain Bulan Ini',                           nilai:tunjanganLain },
      { label:'Penghasilan Bruto Bulan Ini',                        nilai:brutoSebulan, bold:true },
      { label:'Penghasilan Bruto Kumulatif',                        nilai:brutoKumulatif },
      { label:`Penghasilan Bruto Setahun (× ${masa} bulan)`,        nilai:brutoSetahun },
      { label:'(-) Biaya Jabatan 5% maks Rp 6 jt/thn',             nilai:bj, color:'amber' },
      { label:'(-) Iuran JHT/Jabatan (karyawan)',                   nilai:ij, color:'amber' },
      { label:'(-) Iuran Pensiun maks Rp 2,4 jt/thn',              nilai:ip, color:'amber' },
      { label:'Penghasilan Netto Setahun',                          nilai:netto, bold:true },
      { label:`(-) PTKP ${ptkpKey}`,                                nilai:ptkpNilai, color:'blue' },
      { label:'PKP (dibulatkan ke Rp 1.000)',                       nilai:pkp, bold:true },
      { label:'PPh 21 Setahun (Progresif Ps.17)',                   nilai:pphSetahun, color:'red', bold:true },
      { label:'(-) PPh 21 Sudah Dipotong Jan s.d. Bulan Lalu',      nilai:pph21Sebelumnya, color:'amber' },
      { label:'PPh 21 Terutang Bulan Ini',                          nilai:pph21BulanIni, color:'red', bold:true },
      { label:'Take Home Pay (THP)',                                 nilai:thp, color:'green', bold:true },
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════
// 3. GROSS UP
// ═══════════════════════════════════════════════════════════════════
export function hitungGrossUpFull(params) {
  const { gajiPokok=0, tunjanganLain=0, metodePerhitungan='ter', ptkpKey, npwp=true } = params
  const tunjanganPajak = hitungGrossUp(params)
  const paramsGU = { ...params, tunjanganLain: tunjanganLain + tunjanganPajak }

  const hasil = metodePerhitungan === 'ter'
    ? hitungTetapTER(paramsGU)
    : hitungTetapProgresif(paramsGU)

  hasil.isGrossUp      = true
  hasil.tunjanganPajak = tunjanganPajak
  hasil.brutoGrossUp   = gajiPokok + tunjanganLain + tunjanganPajak
  hasil.thp            = gajiPokok + tunjanganLain

  hasil.breakdown = [
    { label:'Gaji Pokok',                      nilai:gajiPokok },
    { label:'Tunjangan Lain-lain',             nilai:tunjanganLain },
    { label:'Tunjangan Pajak (Gross Up)',       nilai:tunjanganPajak, color:'purple', bold:true },
    { label:'Penghasilan Bruto Total',         nilai:hasil.brutoGrossUp, bold:true },
    { label:'PPh 21 (= Tunjangan Pajak)',      nilai:hasil.pph21Bulanan||hasil.pph21BulanIni, color:'red', bold:true },
    { label:'Take Home Pay (Gaji + Tunjangan)',nilai:hasil.thp, color:'green', bold:true },
  ]
  return hasil
}

// ═══════════════════════════════════════════════════════════════════
// 4. KARYAWAN HARIAN / TIDAK TETAP
// ═══════════════════════════════════════════════════════════════════
export function hitungHarian(params) {
  const { upahHarian=0, jumlahHari=1, npwp=true, brutoSebelumnya=0 } = params
  const tabel    = getTerTabel('C')
  const tarifTer = getTarifTer(upahHarian, tabel)
  let pph21Hari  = Math.round(upahHarian * tarifTer)
  if (!npwp) pph21Hari = Math.round(pph21Hari * FAKTOR_NON_NPWP)
  const upahTotal = upahHarian * jumlahHari
  const pph21Total= pph21Hari * jumlahHari
  const thp       = upahTotal - pph21Total
  const brutoKumulatif = brutoSebelumnya + upahTotal

  return {
    metodePerhitungan: 'TER Harian Kat.C',
    tarifTer,
    upahHarian,
    upahTotal,
    brutoSebelumnya,
    brutoKumulatif,
    pph21Harian: pph21Hari,
    pph21Bulanan: pph21Total,
    thp,
    breakdown: [
      { label:'Penghasilan Bruto Sebelumnya',  nilai:brutoSebelumnya },
      { label:'Upah Harian',                   nilai:upahHarian },
      { label:`Tarif TER Kat.C (${fmtPct(tarifTer)})`, nilai:pph21Hari, color:'red' },
      { label:'PPh 21 per Hari',               nilai:pph21Hari, bold:true, color:'red' },
      { label:`Jumlah Hari (${jumlahHari} hari)`, nilai:jumlahHari },
      { label:'Upah Total',                    nilai:upahTotal, bold:true },
      { label:'Penghasilan Bruto Kumulatif',   nilai:brutoKumulatif },
      { label:'PPh 21 Total',                  nilai:pph21Total, bold:true, color:'red' },
      { label:'Take Home Pay',                 nilai:thp, bold:true, color:'green' },
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════
// 5. BUKAN KARYAWAN
// ═══════════════════════════════════════════════════════════════════
export function hitungBukanKaryawan(params) {
  const { honorarium=0, skema='tidak_berkesimbg', ptkpKey='TK0', npwp=true, brutoSebelumnya=0 } = params
  const brutoKumulatif = brutoSebelumnya + honorarium
  let dpp, pph21, metodePerhitungan, lapisan = []

  if (skema === 'tidak_berkesimbg') {
    dpp  = honorarium * 0.50
    pph21= Math.round(dpp * 0.05)
    metodePerhitungan = 'Tidak Berkesinambungan (5% flat)'
  } else if (skema === '50persen') {
    dpp  = honorarium * 0.50
    const r = hitungProgresif(dpp)
    pph21 = Math.round(r.pajak); lapisan = r.lapisan
    metodePerhitungan = 'Berkesinambungan 50% × Progresif'
  } else { // berkesimbg_ptkp
    const ptkpBulan = (PTKP[ptkpKey]?.nilai ?? 54_000_000) / 12
    dpp  = Math.max(0, honorarium * 0.50 - ptkpBulan)
    const r = hitungProgresif(dpp)
    pph21 = Math.round(r.pajak); lapisan = r.lapisan
    metodePerhitungan = 'Berkesinambungan 50% × (Bruto–PTKP/12) × Progresif'
  }
  if (!npwp) pph21 = Math.round(pph21 * FAKTOR_NON_NPWP)
  const thp = honorarium - pph21

  return {
    metodePerhitungan,
    honorarium,
    dpp,
    brutoSebelumnya,
    brutoKumulatif,
    pph21Bulanan: pph21,
    lapisan,
    thp,
    breakdown: [
      { label:'Penghasilan Bruto Sebelumnya',  nilai:brutoSebelumnya },
      { label:'Honorarium Bruto',              nilai:honorarium, bold:true },
      { label:'Penghasilan Bruto Kumulatif',   nilai:brutoKumulatif },
      { label:'DPP (Dasar Pengenaan Pajak)',   nilai:dpp, bold:true },
      { label:'PPh 21',                        nilai:pph21, color:'red', bold:true },
      { label:'Take Home Pay',                 nilai:thp, color:'green', bold:true },
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════
// 6. PENSIUN BERKALA
// ═══════════════════════════════════════════════════════════════════
export function hitungPensiun(params) {
  const { pensiunBulanan=0, iuranPensiun=0, ptkpKey='TK0', npwp=true, masa=12, brutoSebelumnya=0 } = params
  const ptkpNilai  = PTKP[ptkpKey]?.nilai ?? 54_000_000
  const brutoSetahun = pensiunBulanan * masa
  const biayaPensiun = Math.min(brutoSetahun * BIAYA_PENSIUN_PCT, BIAYA_PENSIUN_MAX)
  const netto  = brutoSetahun - biayaPensiun - (iuranPensiun * masa)
  const pkp    = Math.max(0, Math.floor((netto - ptkpNilai) / 1000) * 1000)
  let { pajak, lapisan } = hitungProgresif(pkp)
  if (!npwp) pajak = Math.round(pajak * FAKTOR_NON_NPWP)
  const pph21Bulanan = Math.round(pajak / masa)
  const brutoKumulatif = brutoSebelumnya + pensiunBulanan

  return {
    metodePerhitungan: 'Pensiun Berkala (Progresif)',
    brutoSebelumnya, brutoKumulatif,
    brutoSebulan: pensiunBulanan, brutoSetahun,
    biayaPensiun, netto, ptkpNilai, pkp, lapisan,
    pphSetahun: pajak, pph21Bulanan, thp: pensiunBulanan - pph21Bulanan,
    breakdown: [
      { label:'Penghasilan Pensiun Sebelumnya', nilai:brutoSebelumnya },
      { label:'Uang Pensiun Bulanan',           nilai:pensiunBulanan, bold:true },
      { label:'Penghasilan Bruto Kumulatif',    nilai:brutoKumulatif },
      { label:`Pensiun Setahun (× ${masa})`,   nilai:brutoSetahun },
      { label:'(-) Biaya Pensiun 5% maks Rp 2,4 jt/thn', nilai:biayaPensiun, color:'amber' },
      { label:'(-) Iuran Pensiun',             nilai:iuranPensiun * masa, color:'amber' },
      { label:'Penghasilan Netto',             nilai:netto, bold:true },
      { label:`(-) PTKP ${ptkpKey}`,           nilai:ptkpNilai, color:'blue' },
      { label:'PKP',                           nilai:pkp, bold:true },
      { label:'PPh 21 Setahun',                nilai:pajak, color:'red', bold:true },
      { label:`PPh 21/bulan (÷${masa})`,       nilai:pph21Bulanan, color:'red', bold:true },
      { label:'Take Home Pay',                 nilai:pensiunBulanan - pph21Bulanan, color:'green', bold:true },
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════
// 7. PESANGON / SEKALIGUS
// ═══════════════════════════════════════════════════════════════════
export function hitungPesangon(params) {
  const { pesangon=0, npwp=true } = params
  let { pajak, lapisan } = hitungProgresif(pesangon, TARIF_PESANGON)
  if (!npwp) pajak = Math.round(pajak * FAKTOR_NON_NPWP)
  return {
    metodePerhitungan: 'Pesangon (PP 68/2009)',
    brutoSebulan: pesangon, brutoSebelumnya: 0, brutoKumulatif: pesangon,
    pph21Bulanan: pajak, lapisan, thp: pesangon - pajak,
    breakdown: [
      { label:'Uang Pesangon / Manfaat Pensiun', nilai:pesangon, bold:true },
      { label:'PPh 21 Final (tarif pesangon)',    nilai:pajak, color:'red', bold:true },
      { label:'Pesangon Diterima (netto)',        nilai:pesangon - pajak, color:'green', bold:true },
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════
// 8. PNS / TNI / POLRI
// ═══════════════════════════════════════════════════════════════════
export function hitungPNS(params) {
  const { gajiPokok=0, tunjanganLain=0, iuranPensiun=0, skema='pns_gaji',
          ptkpKey='TK0', npwp=true, masa=12, brutoSebelumnya=0 } = params
  const brutoSebulan = gajiPokok + tunjanganLain
  const brutoKumulatif = brutoSebelumnya + brutoSebulan

  if (skema === 'pns_honor') {
    const pph21 = Math.round(brutoSebulan * TARIF_PNS_HONOR)
    return {
      metodePerhitungan: 'Honorarium PNS 15% Final',
      brutoSebulan, brutoSebelumnya, brutoKumulatif,
      pph21Bulanan: pph21, thp: brutoSebulan - pph21,
      breakdown: [
        { label:'Penghasilan Bruto Sebelumnya', nilai:brutoSebelumnya },
        { label:'Honorarium',                  nilai:brutoSebulan, bold:true },
        { label:'Bruto Kumulatif',             nilai:brutoKumulatif },
        { label:'PPh 21 Final (15%)',          nilai:pph21, color:'red', bold:true },
        { label:'Diterima (netto)',            nilai:brutoSebulan - pph21, color:'green', bold:true },
      ],
    }
  }

  // Gaji PNS — progresif, ditanggung pemerintah
  const ptkpNilai   = PTKP[ptkpKey]?.nilai ?? 54_000_000
  const brutoSetahun= brutoSebulan * masa
  const bj = Math.min(brutoSetahun * BIAYA_JABATAN_PCT, BIAYA_JABATAN_MAX)
  const ip = Math.min(iuranPensiun * masa, BIAYA_PENSIUN_MAX)
  const netto = brutoSetahun - bj - ip
  const pkp   = Math.max(0, Math.floor((netto - ptkpNilai) / 1000) * 1000)
  let { pajak, lapisan } = hitungProgresif(pkp)
  if (!npwp) pajak = Math.round(pajak * FAKTOR_NON_NPWP)
  const pph21Bulanan = Math.round(pajak / masa)

  return {
    metodePerhitungan: 'PNS — Ditanggung Pemerintah (DTP)',
    brutoSebulan, brutoSebelumnya, brutoKumulatif,
    brutoSetahun, biayaJabatan: bj, iuranPensiunTahun: ip,
    netto, ptkpNilai, pkp, lapisan, pphSetahun: pajak, pph21Bulanan,
    thp: brutoSebulan, // THP = bruto (pajak ditanggung pemerintah)
    breakdown: [
      { label:'Penghasilan Bruto Sebelumnya',    nilai:brutoSebelumnya },
      { label:'Gaji Pokok + Tunjangan/bulan',    nilai:brutoSebulan, bold:true },
      { label:'Bruto Kumulatif',                 nilai:brutoKumulatif },
      { label:`Bruto Setahun (× ${masa})`,       nilai:brutoSetahun },
      { label:'(-) Biaya Jabatan 5%',            nilai:bj, color:'amber' },
      { label:'(-) Iuran Pensiun',               nilai:ip, color:'amber' },
      { label:'Penghasilan Netto Setahun',       nilai:netto, bold:true },
      { label:`(-) PTKP ${ptkpKey}`,             nilai:ptkpNilai, color:'blue' },
      { label:'PKP',                             nilai:pkp, bold:true },
      { label:'PPh 21 Setahun (ditanggung Pem.)', nilai:pajak, color:'red', bold:true },
      { label:'PPh 21/bulan',                    nilai:pph21Bulanan, color:'red', bold:true },
      { label:'Take Home Pay (pajak DTP)',        nilai:brutoSebulan, color:'green', bold:true },
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════
// 9. PPh 26 — WP Luar Negeri
// ═══════════════════════════════════════════════════════════════════
export function hitungPPh26(params) {
  const { penghasilan=0, tarifP3B=0.20 } = params
  const pph26 = Math.round(penghasilan * tarifP3B)
  return {
    metodePerhitungan: `PPh 26 (tarif ${fmtPct(tarifP3B)})`,
    brutoSebulan: penghasilan, brutoSebelumnya: 0, brutoKumulatif: penghasilan,
    pph21Bulanan: pph26, thp: penghasilan - pph26,
    breakdown: [
      { label:'Penghasilan Bruto WP LN',         nilai:penghasilan, bold:true },
      { label:`PPh 26 (${fmtPct(tarifP3B)} × bruto)`, nilai:pph26, color:'red', bold:true },
      { label:'Penghasilan Netto (setelah PPh 26)', nilai:penghasilan - pph26, color:'green', bold:true },
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════
// ENTRY POINT
// ═══════════════════════════════════════════════════════════════════
export function hitungPPh21(params) {
  const { tipeKaryawan, metodePajak, metodePerhitungan } = params

  if (tipeKaryawan === 'harian')   return hitungHarian(params)
  if (tipeKaryawan === 'pensiun')  return hitungPensiun(params)
  if (tipeKaryawan === 'pesangon') return hitungPesangon(params)
  if (tipeKaryawan === 'pns')      return hitungPNS(params)
  if (tipeKaryawan === 'bukan_karyawan') return hitungBukanKaryawan(params)
  if (tipeKaryawan === 'mantan')   {
    const { honorarium=0, npwp=true } = params
    let { pajak, lapisan } = hitungProgresif(honorarium)
    if (!npwp) pajak = Math.round(pajak * FAKTOR_NON_NPWP)
    return { metodePerhitungan:'Mantan Pegawai (Progresif)', brutoSebulan:honorarium, brutoSebelumnya:0, brutoKumulatif:honorarium, pph21Bulanan:pajak, lapisan, thp:honorarium-pajak, breakdown:[{label:'Jasa Produksi / Bonus',nilai:honorarium,bold:true},{label:'PPh 21 (Progresif)',nilai:pajak,color:'red',bold:true},{label:'Diterima (netto)',nilai:honorarium-pajak,color:'green',bold:true}] }
  }
  if (tipeKaryawan === 'wp_ln')    return hitungPPh26(params)

  // Karyawan Tetap / Tidak Tetap
  if (metodePajak === 'gross_up')  return hitungGrossUpFull({ ...params, metodePerhitungan })

  return metodePerhitungan === 'ter'
    ? hitungTetapTER(params)
    : hitungTetapProgresif(params)
}
