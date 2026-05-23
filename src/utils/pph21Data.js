/**
 * pph21Data.js — Data referensi PPh 21 LENGKAP
 * Berdasarkan: UU HPP No.7/2021, PMK 168/2023, PER-2/PJ/2024,
 *              PER-16/PJ/2016, KEP-606/PJ/2001
 */

// ─────────────────────────────────────────────────────────────────
// KODE OBJEK PAJAK PPh 21/26 (sesuai PER-14/PJ/2013 & PER-2/PJ/2024)
// ─────────────────────────────────────────────────────────────────
export const KODE_OBJEK_PAJAK = [
  // ── Karyawan Tetap ──
  { kode:'21-100-01', label:'Penghasilan Pegawai Tetap (reguler)',           tipe:['tetap'],         metodeHitung:'progresif_ter' },
  { kode:'21-100-02', label:'Penerimaan dalam Bentuk Natura/Kenikmatan',    tipe:['tetap'],         metodeHitung:'progresif_ter' },
  // ── Karyawan Tidak Tetap ──
  { kode:'21-100-03', label:'Upah Pegawai Tidak Tetap / Tenaga Kerja Lepas',tipe:['tidak_tetap','harian'], metodeHitung:'ter_harian' },
  // ── Bukan Karyawan ──
  { kode:'21-100-04', label:'Imbalan kepada Distributor MLM / Direct Selling',tipe:['bukan_karyawan'], metodeHitung:'bukan_karyawan' },
  { kode:'21-100-05', label:'Imbalan kepada Peserta Kegiatan',               tipe:['bukan_karyawan'], metodeHitung:'bukan_karyawan' },
  { kode:'21-100-06', label:'Imbalan kepada Tenaga Ahli (konsultan dll)',    tipe:['bukan_karyawan'], metodeHitung:'bukan_karyawan' },
  { kode:'21-100-07', label:'Honorarium / Komisi kepada Penjaja Barang',    tipe:['bukan_karyawan'], metodeHitung:'bukan_karyawan' },
  { kode:'21-100-08', label:'Honorarium kepada Seniman / Olahragawan',      tipe:['bukan_karyawan'], metodeHitung:'bukan_karyawan' },
  { kode:'21-100-09', label:'Imbalan kepada Penasihat / Pengajar',          tipe:['bukan_karyawan'], metodeHitung:'bukan_karyawan' },
  // ── Pensiun ──
  { kode:'21-100-10', label:'Uang Pensiun Berkala dari Dana Pensiun',        tipe:['pensiun'],       metodeHitung:'pensiun' },
  { kode:'21-100-11', label:'Pesangon / Uang Manfaat Pensiun (sekaligus)',  tipe:['pesangon'],      metodeHitung:'pesangon' },
  // ── Pejabat Negara / PNS ──
  { kode:'21-100-12', label:'Penghasilan PNS / Anggota TNI-Polri (gaji dll)',tipe:['pns'],          metodeHitung:'pns' },
  { kode:'21-100-13', label:'Honorarium PNS dari APBN/APBD',                tipe:['pns'],           metodeHitung:'pns_honor' },
  // ── Mantan Karyawan / Jasa Produksi ──
  { kode:'21-100-14', label:'Jasa Produksi, Tantiem, Bonus Mantan Pegawai', tipe:['mantan'],        metodeHitung:'progresif' },
  // ── PPh 26 (WP LN) ──
  { kode:'21-100-15', label:'PPh 26 — Penghasilan WP Luar Negeri (tarif 20%/P3B)', tipe:['wp_ln'], metodeHitung:'pph26' },
]

// ─────────────────────────────────────────────────────────────────
// TIPE PENERIMA PENGHASILAN
// ─────────────────────────────────────────────────────────────────
export const TIPE_KARYAWAN = [
  { value:'tetap',          label:'Pegawai Tetap (bulanan)',           kodeDefault:'21-100-01' },
  { value:'tidak_tetap',    label:'Pegawai Tidak Tetap (bulanan)',     kodeDefault:'21-100-03' },
  { value:'harian',         label:'Pegawai Harian / Lepas',           kodeDefault:'21-100-03' },
  { value:'bukan_karyawan', label:'Bukan Pegawai (jasa/honorarium)',  kodeDefault:'21-100-06' },
  { value:'pensiun',        label:'Penerima Pensiun Berkala',         kodeDefault:'21-100-10' },
  { value:'pesangon',       label:'Penerima Pesangon / Sekaligus',    kodeDefault:'21-100-11' },
  { value:'pns',            label:'PNS / TNI / Polri',                kodeDefault:'21-100-12' },
  { value:'mantan',         label:'Mantan Pegawai (jasa produksi)',   kodeDefault:'21-100-14' },
]

// ─────────────────────────────────────────────────────────────────
// SKEMA PERHITUNGAN
// ─────────────────────────────────────────────────────────────────
export const SKEMA_PERHITUNGAN = {
  tetap: [
    { value:'ter',       label:'TER Bulanan (Jan–Nov)',          desc:'Tarif Efektif Rata-rata PMK 168/2023. Digunakan Januari s.d. November.' },
    { value:'progresif', label:'Progresif Ps.17 (Desember / Rekonsiliasi)', desc:'Tarif progresif tahunan. Wajib digunakan masa Desember atau bila ingin rekonsiliasi.' },
  ],
  tidak_tetap: [
    { value:'ter',       label:'TER Bulanan',                   desc:'Penghasilan kumulatif sebulan, tarif TER Kat.A atau B.' },
    { value:'harian',    label:'TER Harian (Kat. C)',            desc:'Upah harian/satuan, tidak lebih dari 10 hari dalam sebulan.' },
  ],
  harian: [
    { value:'harian',    label:'TER Harian (Kat. C)',            desc:'Tarif TER khusus penghasilan harian sesuai PMK 168/2023.' },
  ],
  bukan_karyawan: [
    { value:'50persen',  label:'50% × Bruto × Tarif Ps.17',    desc:'Berkesinambungan tanpa PTKP: DPP 50% bruto, tarif progresif.' },
    { value:'berkesimbg_ptkp', label:'50% × (Bruto–PTKP) × Tarif Ps.17', desc:'Berkesinambungan dengan PTKP: DPP 50% bruto dikurangi PTKP.' },
    { value:'tidak_berkesimbg', label:'Tidak Berkesinambungan (5% flat)', desc:'Tidak berkesinambungan: DPP 50% bruto, tarif flat 5%.' },
  ],
  pensiun: [
    { value:'pensiun_berkala', label:'Pensiun Berkala (bulanan)', desc:'5% dari penghasilan bruto dikurangi biaya pensiun, lalu dikalikan tarif progresif.' },
  ],
  pesangon: [
    { value:'pesangon',  label:'Pesangon / Sekaligus',           desc:'Tarif progresif khusus: 0%, 5%, 15%, 25% atas lapisan pesangon.' },
  ],
  pns: [
    { value:'pns_gaji',  label:'Gaji/Tunjangan PNS (ditanggung pemerintah)', desc:'PPh 21 ditanggung pemerintah (DTP). Tarif progresif atas penghasilan netto.' },
    { value:'pns_honor', label:'Honorarium APBN/APBD (15% final)', desc:'Tarif 15% final atas honorarium yang dibayar dari APBN/APBD.' },
  ],
  mantan: [
    { value:'progresif', label:'Progresif Ps.17 (tahunan)',      desc:'Jasa produksi, tantiem, bonus, gratifikasi mantan pegawai.' },
  ],
}

// ─────────────────────────────────────────────────────────────────
// PTKP (Penghasilan Tidak Kena Pajak) — PMK 101/PMK.010/2016
// ─────────────────────────────────────────────────────────────────
export const PTKP = {
  TK0: { label:'TK/0 — Tidak Kawin, 0 tanggungan',            nilai:54_000_000, komponenDiri:54_000_000, komponenKawin:0, komponenTanggungan:0 },
  TK1: { label:'TK/1 — Tidak Kawin, 1 tanggungan',            nilai:58_500_000, komponenDiri:54_000_000, komponenKawin:0, komponenTanggungan:4_500_000 },
  TK2: { label:'TK/2 — Tidak Kawin, 2 tanggungan',            nilai:63_000_000, komponenDiri:54_000_000, komponenKawin:0, komponenTanggungan:9_000_000 },
  TK3: { label:'TK/3 — Tidak Kawin, 3 tanggungan',            nilai:67_500_000, komponenDiri:54_000_000, komponenKawin:0, komponenTanggungan:13_500_000 },
  K0:  { label:'K/0 — Kawin, 0 tanggungan',                   nilai:58_500_000, komponenDiri:54_000_000, komponenKawin:4_500_000, komponenTanggungan:0 },
  K1:  { label:'K/1 — Kawin, 1 tanggungan',                   nilai:63_000_000, komponenDiri:54_000_000, komponenKawin:4_500_000, komponenTanggungan:4_500_000 },
  K2:  { label:'K/2 — Kawin, 2 tanggungan',                   nilai:67_500_000, komponenDiri:54_000_000, komponenKawin:4_500_000, komponenTanggungan:9_000_000 },
  K3:  { label:'K/3 — Kawin, 3 tanggungan',                   nilai:72_000_000, komponenDiri:54_000_000, komponenKawin:4_500_000, komponenTanggungan:13_500_000 },
  KI0: { label:'K/I/0 — Kawin, istri berkerja, 0 tanggungan', nilai:112_500_000, komponenDiri:54_000_000, komponenKawin:4_500_000, komponenTanggungan:0,  komponenIstri:54_000_000 },
  KI1: { label:'K/I/1 — Kawin, istri bekerja, 1 tanggungan',  nilai:117_000_000, komponenDiri:54_000_000, komponenKawin:4_500_000, komponenTanggungan:4_500_000, komponenIstri:54_000_000 },
  KI2: { label:'K/I/2 — Kawin, istri bekerja, 2 tanggungan',  nilai:121_500_000, komponenDiri:54_000_000, komponenKawin:4_500_000, komponenTanggungan:9_000_000, komponenIstri:54_000_000 },
  KI3: { label:'K/I/3 — Kawin, istri bekerja, 3 tanggungan',  nilai:126_000_000, komponenDiri:54_000_000, komponenKawin:4_500_000, komponenTanggungan:13_500_000,komponenIstri:54_000_000 },
}

// ─────────────────────────────────────────────────────────────────
// TARIF PROGRESIF Pasal 17 — UU HPP No.7/2021
// ─────────────────────────────────────────────────────────────────
export const TARIF_PROGRESIF = [
  { dari:0,           sampai:60_000_000,    tarif:0.05, label:'s.d. Rp 60 jt' },
  { dari:60_000_000,  sampai:250_000_000,   tarif:0.15, label:'Rp 60 jt – Rp 250 jt' },
  { dari:250_000_000, sampai:500_000_000,   tarif:0.25, label:'Rp 250 jt – Rp 500 jt' },
  { dari:500_000_000, sampai:5_000_000_000, tarif:0.30, label:'Rp 500 jt – Rp 5 M' },
  { dari:5_000_000_000, sampai:Infinity,    tarif:0.35, label:'di atas Rp 5 M' },
]

// Tarif khusus Pesangon (PP 68/2009)
export const TARIF_PESANGON = [
  { dari:0,           sampai:50_000_000,    tarif:0.00 },
  { dari:50_000_000,  sampai:100_000_000,   tarif:0.05 },
  { dari:100_000_000, sampai:500_000_000,   tarif:0.15 },
  { dari:500_000_000, sampai:Infinity,      tarif:0.25 },
]

// ─────────────────────────────────────────────────────────────────
// TER — PMK 168/2023
// ─────────────────────────────────────────────────────────────────
export const TER_A = [
  { max:5_400_000,tarif:0.00 },{ max:5_650_000,tarif:0.0025 },{ max:5_950_000,tarif:0.005 },
  { max:6_300_000,tarif:0.0075 },{ max:6_750_000,tarif:0.01 },{ max:7_500_000,tarif:0.0125 },
  { max:8_550_000,tarif:0.015 },{ max:9_650_000,tarif:0.0175 },{ max:10_050_000,tarif:0.02 },
  { max:10_350_000,tarif:0.0225 },{ max:10_700_000,tarif:0.025 },{ max:11_050_000,tarif:0.03 },
  { max:11_600_000,tarif:0.035 },{ max:12_500_000,tarif:0.04 },{ max:13_750_000,tarif:0.05 },
  { max:15_100_000,tarif:0.06 },{ max:16_950_000,tarif:0.07 },{ max:19_750_000,tarif:0.08 },
  { max:24_150_000,tarif:0.09 },{ max:26_450_000,tarif:0.10 },{ max:28_000_000,tarif:0.11 },
  { max:30_050_000,tarif:0.12 },{ max:32_400_000,tarif:0.13 },{ max:35_400_000,tarif:0.14 },
  { max:39_100_000,tarif:0.15 },{ max:43_850_000,tarif:0.16 },{ max:47_800_000,tarif:0.17 },
  { max:51_400_000,tarif:0.18 },{ max:56_300_000,tarif:0.19 },{ max:62_200_000,tarif:0.20 },
  { max:74_950_000,tarif:0.21 },{ max:89_000_000,tarif:0.22 },{ max:99_000_000,tarif:0.23 },
  { max:125_000_000,tarif:0.24 },{ max:141_000_000,tarif:0.25 },{ max:157_000_000,tarif:0.26 },
  { max:206_000_000,tarif:0.27 },{ max:337_000_000,tarif:0.28 },{ max:454_000_000,tarif:0.29 },
  { max:550_000_000,tarif:0.30 },{ max:695_000_000,tarif:0.31 },{ max:910_000_000,tarif:0.32 },
  { max:1_400_000_000,tarif:0.33 },{ max:Infinity,tarif:0.34 },
]
export const TER_B = [
  { max:6_200_000,tarif:0.00 },{ max:6_500_000,tarif:0.0025 },{ max:6_850_000,tarif:0.005 },
  { max:7_300_000,tarif:0.0075 },{ max:9_200_000,tarif:0.01 },{ max:10_750_000,tarif:0.015 },
  { max:11_250_000,tarif:0.02 },{ max:11_600_000,tarif:0.025 },{ max:12_600_000,tarif:0.03 },
  { max:13_600_000,tarif:0.04 },{ max:14_950_000,tarif:0.05 },{ max:16_400_000,tarif:0.06 },
  { max:18_450_000,tarif:0.07 },{ max:21_850_000,tarif:0.08 },{ max:26_000_000,tarif:0.09 },
  { max:27_700_000,tarif:0.10 },{ max:29_350_000,tarif:0.11 },{ max:31_450_000,tarif:0.12 },
  { max:33_950_000,tarif:0.13 },{ max:37_100_000,tarif:0.14 },{ max:41_100_000,tarif:0.15 },
  { max:45_800_000,tarif:0.16 },{ max:49_500_000,tarif:0.17 },{ max:53_800_000,tarif:0.18 },
  { max:58_500_000,tarif:0.19 },{ max:64_000_000,tarif:0.20 },{ max:71_000_000,tarif:0.21 },
  { max:80_000_000,tarif:0.22 },{ max:96_000_000,tarif:0.23 },{ max:124_000_000,tarif:0.24 },
  { max:136_000_000,tarif:0.25 },{ max:150_000_000,tarif:0.26 },{ max:192_000_000,tarif:0.27 },
  { max:321_000_000,tarif:0.28 },{ max:438_000_000,tarif:0.29 },{ max:530_000_000,tarif:0.30 },
  { max:670_000_000,tarif:0.31 },{ max:880_000_000,tarif:0.32 },{ max:1_360_000_000,tarif:0.33 },
  { max:Infinity,tarif:0.34 },
]
export const TER_C = [
  { max:450_000,tarif:0.00 },
  { max:2_500_000,tarif:0.005 },
  { max:Infinity,tarif:0.015 },
]

export function getTerKategori(ptkpKey, tipeKaryawan) {
  if (tipeKaryawan === 'harian') return 'C'
  if (['TK0','TK1','TK2','TK3','K0'].includes(ptkpKey)) return 'A'
  return 'B'
}
export function getTerTabel(kategori) {
  if (kategori === 'A') return TER_A
  if (kategori === 'B') return TER_B
  return TER_C
}

// ─────────────────────────────────────────────────────────────────
// KONSTANTA
// ─────────────────────────────────────────────────────────────────
export const BIAYA_JABATAN_PCT  = 0.05
export const BIAYA_JABATAN_MAX  = 6_000_000
export const BIAYA_PENSIUN_PCT  = 0.05
export const BIAYA_PENSIUN_MAX  = 2_400_000
export const FAKTOR_NON_NPWP   = 1.20
export const TARIF_PPH26        = 0.20   // WP LN tanpa P3B
export const TARIF_PNS_HONOR    = 0.15   // Honorarium PNS final
