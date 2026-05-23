import React, { useState } from 'react';

export default function Pph23Calculator() {
  // --- STATE INPUT FORM ---
  const [selKode, setSelKode] = useState('');
  const [kodeDetail, setKodeDetail] = useState(null);
  const [npwp, setNpwp] = useState('ber');
  const [jenisBruto, setJenisBruto] = useState('tunai');
  const [bruto, setBruto] = useState('');
  const [currency, setCurrency] = useState('IDR');
  const [kurs, setKurs] = useState('');
  
  // --- STATE HASIL ---
  const [hasil, setHasil] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // --- HANDLER UNTUK KODE OBJEK PAJAK ---
  const handleKodeChange = (e) => {
    const val = e.target.value;
    setSelKode(val);
    setHasil(null); // Reset hasil jika kode diubah
    
    if (!val) {
      setKodeDetail(null);
      return;
    }
    // Memecah string value dari opsi HTML
    const p = val.split('|');
    setKodeDetail({ kode: p[0], nama: p[1], tarif: parseInt(p[2]), ket: p[3], hk: p[4] });
  };

  // --- FUNGSI HITUNG ---
  const handleHitung = () => {
    setErrorMsg('');
    if (!kodeDetail) {
      setErrorMsg('⚠ Pilih kode objek pajak terlebih dahulu.');
      return;
    }
    const rawBruto = parseFloat(bruto);
    if (!rawBruto || rawBruto <= 0) {
      setErrorMsg('⚠ Masukkan penghasilan bruto yang valid.');
      return;
    }

    let brutoIDR = rawBruto;
    if (currency !== 'IDR') {
      const kursVal = parseFloat(kurs);
      if (!kursVal || kursVal <= 0) {
        setErrorMsg('⚠ Masukkan kurs KMK untuk valas.');
        return;
      }
      brutoIDR = rawBruto * kursVal;
    }

    const tarifN = kodeDetail.tarif;
    // Jika tidak ber-NPWP, tarif dikenakan 2x lipat (100% lebih tinggi)[cite: 2]
    const tarifE = npwp === 'tidak' ? tarifN * 2 : tarifN; 
    const pph = brutoIDR * (tarifE / 100);
    const neto = brutoIDR - pph;

    setHasil({
      brutoIDR,
      rawBruto,
      tarifN,
      tarifE,
      pph,
      neto
    });
  };

  // --- FORMAT RUPIAH ---
  const fmt = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

  // --- STYLE KELAS TAILWIND ---
  const cardClass = "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm mb-6 overflow-hidden";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2";
  const inputClass = "w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";
  const rcClass = "p-4 border-b border-slate-200 dark:border-slate-700";
  const rcLabelClass = "text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1";
  const rcValueClass = "font-mono text-sm text-slate-900 dark:text-slate-200";

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12 max-w-3xl mx-auto">
      
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Kalkulator PPh Pasal 23</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Hitung pemotongan PPh 23 otomatis — sesuai PMK 141/2015</p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 text-sm text-blue-800 dark:text-blue-300">
        PPh Pasal 23 dipotong oleh <strong>pihak yang membayar</strong> atas penghasilan berupa dividen, bunga, royalti, hadiah, sewa, dan imbalan jasa tertentu kepada <strong>Wajib Pajak Badan atau OP dalam negeri</strong>.
      </div>

      {/* STEP 1: OBJEK PAJAK */}
      <div className={cardClass}>
        <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            Pilih Kode Objek Pajak
          </h2>
        </div>
        <div className="p-6">
          <label className={labelClass}>Kode Objek Pajak</label>
          <select value={selKode} onChange={handleKodeChange} className={inputClass}>
            <option value="">-- Pilih Kode Objek Pajak --</option>
            <optgroup label="── Tarif 15% ──">
              <option value="24-101-01|Dividen|15|Dividen kepada WP Badan/OP dalam negeri|Ps.23(1)a UU PPh No.36/2008">24-101-01 (Dividen)</option>
              <option value="24-102-01|Bunga|15|Termasuk premium, diskonto & imbalan karena jaminan utang|Ps.23(1)a UU PPh No.36/2008">24-102-01 (Bunga)</option>
              <option value="24-103-01|Royalti|15|Atas penggunaan hak kekayaan intelektual (paten, merek, hak cipta, know-how)|Ps.23(1)a UU PPh No.36/2008">24-103-01 (Royalti)</option>
              <option value="24-100-01|Hadiah, Penghargaan, Bonus|15|Selain yang sudah dipotong PPh 21 (dibayar ke WP Badan / rekanan)|Ps.23(1)a UU PPh No.36/2008">24-100-01 (Hadiah, Penghargaan, Bonus)</option>
              <option value="24-100-02|Sewa Harta Selain Tanah/Bangunan|15|Sewa kendaraan, mesin, peralatan, kapal, dll — bukan tanah/bangunan (final)|Ps.23(1)c UU PPh No.36/2008">24-100-02 (Sewa Harta Selain Tanah/Bangunan)</option>
            </optgroup>
            <optgroup label="── Tarif 2% — Imbalan Jasa ──">
              <option value="24-104-01|Jasa Teknik|2|Pemberian jasa berupa keahlian teknis / rekayasa|PMK 141/2015">24-104-01 (Jasa Teknik)</option>
              <option value="24-104-02|Jasa Manajemen|2|Jasa pengelolaan / manajemen operasional|PMK 141/2015">24-104-02 (Jasa Manajemen)</option>
              <option value="24-104-03|Jasa Konsultan|2|Semua jenis jasa konsultansi (bisnis, strategis, dll)|PMK 141/2015">24-104-03 (Jasa Konsultan)</option>
              <option value="24-104-04|Jasa Penilai|2|Penilaian aset, bisnis, properti (appraisal)|PMK 141/2015">24-104-04 (Jasa Penilai)</option>
              <option value="24-104-05|Jasa Aktuaris|2|Jasa perhitungan aktuaria (asuransi, dana pensiun)|PMK 141/2015">24-104-05 (Jasa Aktuaris)</option>
              <option value="24-104-06|Jasa Akuntansi dan Pembukuan|2|Termasuk audit laporan keuangan oleh KAP|PMK 141/2015">24-104-06 (Jasa Akuntansi dan Pembukuan)</option>
              <option value="24-104-07|Jasa Hukum|2|Advokat, notaris, pengacara, konsultan hukum|PMK 141/2015">24-104-07 (Jasa Hukum)</option>
              <option value="24-104-08|Jasa Arsitektur|2|Perancangan bangunan dan struktur|PMK 141/2015">24-104-08 (Jasa Arsitektur)</option>
              <option value="24-104-09|Jasa Perencanaan Kota dan Lanskap|2|Urban planning, landscape architecture|PMK 141/2015">24-104-09 (Jasa Perencanaan Kota dan Lanskap)</option>
              <option value="24-104-10|Jasa Perancang/Design|2|Desain grafis, interior, fashion, produk, dll|PMK 141/2015">24-104-10 (Jasa Perancang/Design)</option>
              <option value="24-104-11|Jasa Pengeboran Migas|2|Drilling di bidang minyak dan gas bumi|PMK 141/2015">24-104-11 (Jasa Pengeboran Migas)</option>
              <option value="24-104-12|Jasa Penunjang Migas/Panas Bumi|2|Jasa pendukung operasi migas & geothermal|PMK 141/2015">24-104-12 (Jasa Penunjang Migas/Panas Bumi)</option>
              <option value="24-104-13|Jasa Penambangan Migas/Panas Bumi|2|Jasa penambangan minyak, gas, panas bumi|PMK 141/2015">24-104-13 (Jasa Penambangan Migas/Panas Bumi)</option>
              <option value="24-104-14|Jasa Penunjang Penerbangan|2|Ground handling, catering pesawat, dll|PMK 141/2015">24-104-14 (Jasa Penunjang Penerbangan)</option>
              <option value="24-104-15|Jasa Penebangan Hutan|2|Logging dan jasa kehutanan|PMK 141/2015">24-104-15 (Jasa Penebangan Hutan)</option>
              <option value="24-104-16|Jasa Pengolahan Limbah|2|Waste management, pengolahan sampah & air limbah|PMK 141/2015">24-104-16 (Jasa Pengolahan Limbah)</option>
              <option value="24-104-17|Jasa Outsourcing|2|Penyediaan tenaga kerja — atas fee/margin penyedia|PMK 141/2015">24-104-17 (Jasa Outsourcing)</option>
              <option value="24-104-18|Jasa Perantara/Keagenan|2|Broker, agen, distributor, makelar|PMK 141/2015">24-104-18 (Jasa Perantara/Keagenan)</option>
              <option value="24-104-19|Jasa Perdagangan Surat Berharga|2|Jasa di bidang pasar modal & sekuritas|PMK 141/2015">24-104-19 (Jasa Perdagangan Surat Berharga)</option>
              <option value="24-104-20|Jasa Kustodian|2|Penitipan, penyimpanan, safe deposit|PMK 141/2015">24-104-20 (Jasa Kustodian)</option>
              <option value="24-104-21|Jasa Dubbing/Sulih Suara|2|Pengisian suara untuk film/konten|PMK 141/2015">24-104-21 (Jasa Dubbing/Sulih Suara)</option>
              <option value="24-104-22|Jasa Mixing Film|2|Post-production audio/video mixing|PMK 141/2015">24-104-22 (Jasa Mixing Film)</option>
              <option value="24-104-23|Jasa Promosi Film/Iklan|2|Produksi & promosi konten film/iklan|PMK 141/2015">24-104-23 (Jasa Promosi Film/Iklan)</option>
              <option value="24-104-24|Jasa IT dan Perawatan Komputer|2|IT support, maintenance hardware/software|PMK 141/2015">24-104-24 (Jasa IT dan Perawatan Komputer)</option>
              <option value="24-104-25|Jasa Pengelolaan Website|2|Web management, hosting management|PMK 141/2015">24-104-25 (Jasa Pengelolaan Website)</option>
              <option value="24-104-26|Jasa Internet|2|Jasa konektivitas & layanan internet|PMK 141/2015">24-104-26 (Jasa Internet)</option>
              <option value="24-104-27|Jasa Pengolahan Data|2|Data processing, data entry, database management|PMK 141/2015">24-104-27 (Jasa Pengolahan Data)</option>
              <option value="24-104-28|Jasa Instalasi Mesin/Perangkat|2|Pemasangan mesin, listrik, AC, CCTV, lift, dll|PMK 141/2015">24-104-28 (Jasa Instalasi Mesin/Perangkat)</option>
              <option value="24-104-29|Jasa Perawatan Mesin/Perangkat|2|Maintenance & perbaikan mesin/peralatan|PMK 141/2015">24-104-29 (Jasa Perawatan Mesin/Perangkat)</option>
              <option value="24-104-30|Jasa Perawatan Kendaraan|2|Servis kendaraan bermotor|PMK 141/2015">24-104-30 (Jasa Perawatan Kendaraan)</option>
              <option value="24-104-31|Jasa Maklon|2|Produksi barang atas pesanan pihak lain (toll manufacturing)|PMK 141/2015">24-104-31 (Jasa Maklon)</option>
              <option value="24-104-32|Jasa Keamanan|2|Satpam, security, investigasi|PMK 141/2015">24-104-32 (Jasa Keamanan)</option>
              <option value="24-104-33|Jasa Event Organizer|2|Penyelenggara kegiatan / acara|PMK 141/2015">24-104-33 (Jasa Event Organizer)</option>
              <option value="24-104-34|Jasa Periklanan|2|Media placement, media buying, jasa iklan|PMK 141/2015">24-104-34 (Jasa Periklanan)</option>
              <option value="24-104-35|Jasa Pembasmian Hama|2|Pest control, fumigasi|PMK 141/2015">24-104-35 (Jasa Pembasmian Hama)</option>
              <option value="24-104-36|Jasa Cleaning Service|2|Kebersihan gedung, kantor, industri|PMK 141/2015">24-104-36 (Jasa Cleaning Service)</option>
              <option value="24-104-37|Jasa Sedot Septic Tank|2|Penyedotan & pengolahan tangki septik|PMK 141/2015">24-104-37 (Jasa Sedot Septic Tank)</option>
              <option value="24-104-38|Jasa Pemeliharaan Kolam|2|Maintenance kolam renang, kolam ikan, dll|PMK 141/2015">24-104-38 (Jasa Pemeliharaan Kolam)</option>
              <option value="24-104-39|Jasa Katering|2|Penyediaan makanan & minuman|PMK 141/2015">24-104-39 (Jasa Katering)</option>
              <option value="24-104-40|Jasa Freight Forwarding|2|Ekspedisi pengiriman barang internasional|PMK 141/2015">24-104-40 (Jasa Freight Forwarding)</option>
              <option value="24-104-41|Jasa Logistik|2|Pengelolaan rantai pasok & distribusi barang|PMK 141/2015">24-104-41 (Jasa Logistik)</option>
              <option value="24-104-42|Jasa Pengurusan Dokumen|2|PPJK, bea cukai, perizinan|PMK 141/2015">24-104-42 (Jasa Pengurusan Dokumen)</option>
              <option value="24-104-43|Jasa Pengepakan|2|Packing, wrapping, packaging|PMK 141/2015">24-104-43 (Jasa Pengepakan)</option>
              <option value="24-104-44|Jasa Loading/Unloading|2|Bongkar muat barang|PMK 141/2015">24-104-44 (Jasa Loading/Unloading)</option>
              <option value="24-104-45|Jasa Laboratorium/Pengujian|2|Uji mutu, kalibrasi, pengujian produk|PMK 141/2015">24-104-45 (Jasa Laboratorium/Pengujian)</option>
              <option value="24-104-46|Jasa Pengelolaan Parkir|2|Manajemen area parkir|PMK 141/2015">24-104-46 (Jasa Pengelolaan Parkir)</option>
              <option value="24-104-47|Jasa Penyondiran Tanah|2|Soil testing, sondir tanah|PMK 141/2015">24-104-47 (Jasa Penyondiran Tanah)</option>
              <option value="24-104-48|Jasa Pengolahan Lahan|2|Land clearing, pengolahan tanah pertanian|PMK 141/2015">24-104-48 (Jasa Pengolahan Lahan)</option>
              <option value="24-104-49|Jasa Pembibitan|2|Penyediaan & perawatan bibit tanaman|PMK 141/2015">24-104-49 (Jasa Pembibitan)</option>
              <option value="24-104-50|Jasa Pemeliharaan Tanaman|2|Perawatan tanaman/perkebunan|PMK 141/2015">24-104-50 (Jasa Pemeliharaan Tanaman)</option>
              <option value="24-104-51|Jasa Pemanenan|2|Harvesting tanaman/perkebunan|PMK 141/2015">24-104-51 (Jasa Pemanenan)</option>
              <option value="24-104-52|Jasa Pengolahan Hasil Pertanian|2|Post-harvest processing|PMK 141/2015">24-104-52 (Jasa Pengolahan Hasil Pertanian)</option>
              <option value="24-104-53|Jasa Dekorasi|2|Dekorasi acara, interior, dll|PMK 141/2015">24-104-53 (Jasa Dekorasi)</option>
              <option value="24-104-54|Jasa Pencetakan|2|Percetakan, printing, penerbitan|PMK 141/2015">24-104-54 (Jasa Pencetakan)</option>
              <option value="24-104-55|Jasa Penerjemahan|2|Translation & interpretasi|PMK 141/2015">24-104-55 (Jasa Penerjemahan)</option>
              <option value="24-104-56|Jasa Pengangkutan|2|Transportasi barang darat/laut/udara|PMK 141/2015">24-104-56 (Jasa Pengangkutan)</option>
              <option value="24-104-57|Jasa Pelayanan Pelabuhan|2|Jasa kepelabuhanan & terminal|PMK 141/2015">24-104-57 (Jasa Pelayanan Pelabuhan)</option>
              <option value="24-104-58|Jasa Pengangkutan Pipa|2|Pipeline transportation|PMK 141/2015">24-104-58 (Jasa Pengangkutan Pipa)</option>
              <option value="24-104-59|Jasa Penitipan Anak|2|Daycare, TPA, babysitter (badan)|PMK 141/2015">24-104-59 (Jasa Penitipan Anak)</option>
              <option value="24-104-60|Jasa Pelatihan/Kursus|2|Training, workshop, kursus (badan)|PMK 141/2015">24-104-60 (Jasa Pelatihan/Kursus)</option>
              <option value="24-104-61|Jasa Pengisian ATM|2|Cash replenishment mesin ATM|PMK 141/2015">24-104-61 (Jasa Pengisian ATM)</option>
              <option value="24-104-62|Jasa Sertifikasi|2|Penerbitan sertifikat, akreditasi|PMK 141/2015">24-104-62 (Jasa Sertifikasi)</option>
              <option value="24-104-63|Jasa Survey|2|Survei lapangan, riset pasar, survei tanah|PMK 141/2015">24-104-63 (Jasa Survey)</option>
              <option value="24-104-64|Jasa Tester|2|Quality testing, product testing|PMK 141/2015">24-104-64 (Jasa Tester)</option>
              <option value="24-104-65|Jasa Dibebankan APBN/APBD|2|Jasa yang pembayarannya dari APBN/APBD|PMK 141/2015">24-104-65 (Jasa Dibebankan APBN/APBD)</option>
              <option value="24-104-66|Jasa Transaksi Token|2|Jasa penerbitan / pengelolaan token|PMK 141/2015">24-104-66 (Jasa Transaksi Token)</option>
              <option value="24-104-67|Jasa Pemasaran Voucher|2|Marketing & distribusi voucher|PMK 141/2015">24-104-67 (Jasa Pemasaran Voucher)</option>
              <option value="24-104-68|Jasa Distribusi Voucher|2|Distribusi voucher kepada konsumen|PMK 141/2015">24-104-68 (Jasa Distribusi Voucher)</option>
              <option value="24-104-69|Jasa Program Loyalitas|2|Pengelolaan program loyalty/reward|PMK 141/2015">24-104-69 (Jasa Program Loyalitas)</option>
              <option value="24-104-70|Jasa Lain Umum|2|Jasa lain yang ditetapkan Dirjen Pajak|PMK 141/2015">24-104-70 (Jasa Lain Umum)</option>
              <option value="24-104-71|Jasa Distribusi Voucher Penyelenggara|2|Distribusi voucher oleh penyelenggara|PMK 141/2015">24-104-71 (Jasa Distribusi Voucher Penyelenggara)</option>
              <option value="24-104-72|Jasa Loyalitas Voucher|2|Pengelolaan program loyalitas berbasis voucher|PMK 141/2015">24-104-72 (Jasa Loyalitas Voucher)</option>
            </optgroup>
          </select>
          {kodeDetail && (
            <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r-lg">
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 bg-purple-600 text-white text-xs font-mono rounded">{kodeDetail.kode}</span>
                <span className={`px-2 py-1 text-white text-xs font-semibold rounded ${kodeDetail.tarif === 15 ? 'bg-rose-500' : 'bg-emerald-600'}`}>
                  Tarif {kodeDetail.tarif}%
                </span>
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{kodeDetail.nama} — {kodeDetail.ket}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">Dasar hukum: {kodeDetail.hk}</p>
            </div>
          )}
        </div>
      </div>

      {/* STEP 2: INPUT BRUTO */}
      <div className={cardClass}>
        <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
            Status NPWP & Penghasilan Bruto
          </h2>
        </div>
        <div className="p-6 space-y-5">
          
          <div>
            <label className={labelClass}>Status NPWP Penerima Penghasilan</label>
            <select value={npwp} onChange={(e) => setNpwp(e.target.value)} className={inputClass}>
              <option value="ber">Ber-NPWP — tarif normal</option>
              <option value="tidak">Tidak Ber-NPWP — tarif lebih tinggi 100%</option>
            </select>
            {npwp === 'tidak' && (
              <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-400">
                ⚠ Penerima <strong>tidak ber-NPWP</strong>: tarif PPh 23 dikenakan <strong>2× tarif normal</strong> sesuai Pasal 23 ayat (1a) UU PPh No.36/2008.
              </div>
            )}
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />

          <div>
            <label className={labelClass}>Jenis penghasilan bruto</label>
            <select value={jenisBruto} onChange={(e) => setJenisBruto(e.target.value)} className={inputClass}>
              <option value="tunai">Penghasilan tunai / transfer</option>
              <option value="natura">Natura / kenikmatan (UU HPP 2022)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Mata uang</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={inputClass}>
                <option value="IDR">IDR — Rupiah</option>
                <option value="USD">USD — Dolar AS</option>
                <option value="EUR">EUR — Euro</option>
                <option value="SGD">SGD — Dolar Singapura</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Penghasilan bruto</label>
              <input type="number" value={bruto} onChange={(e) => setBruto(e.target.value)} placeholder="0" className={inputClass} />
            </div>
          </div>

          {currency !== 'IDR' && (
            <div className="animate-in fade-in duration-300">
              <label className={labelClass}>Kurs KMK (Rp per 1 unit valas)</label>
              <input type="number" value={kurs} onChange={(e) => setKurs(e.target.value)} placeholder="Masukkan kurs KMK..." className={inputClass} />
            </div>
          )}

          <button onClick={handleHitung} className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-colors mt-2">
            Hitung PPh 23 →
          </button>
          
          {errorMsg && <p className="text-center text-sm text-red-500 font-medium">{errorMsg}</p>}

        </div>
      </div>

      {/* STEP 3: HASIL */}
      {hasil && (
        <div className={`${cardClass} border-blue-200 dark:border-blue-800 animate-in slide-in-from-bottom-4 duration-500`}>
          <div className="bg-blue-600 px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">PPh 23 Dipotong</p>
              <p className="text-white text-3xl font-mono font-bold">{fmt(hasil.pph)}</p>
            </div>
            <div className="md:text-right">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Neto Diterima</p>
              <p className="text-white text-2xl font-mono font-bold">{fmt(hasil.neto)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className={rcClass}><p className={rcLabelClass}>Kode Objek Pajak</p><p className={rcValueClass}>{kodeDetail.kode}</p></div>
            <div className={rcClass}><p className={rcLabelClass}>Jenis Objek</p><p className={rcValueClass}>{kodeDetail.nama}</p></div>
            <div className={rcClass}><p className={rcLabelClass}>Tarif Normal</p><p className={rcValueClass}>{hasil.tarifN}%</p></div>
            <div className={rcClass}>
              <p className={rcLabelClass}>Tarif Efektif</p>
              <p className={rcValueClass}>{hasil.tarifE}% {npwp === 'tidak' ? <span className="text-amber-500 text-xs">(Non-NPWP ×2)</span> : ''}</p>
            </div>
            <div className={`${rcClass} md:col-span-2`}><p className={rcLabelClass}>Penghasilan Bruto (IDR)</p><p className={rcValueClass}>{fmt(hasil.brutoIDR)} {currency !== 'IDR' && <span className="text-slate-500">({currency} {hasil.rawBruto.toLocaleString('id-ID')})</span>}</p></div>
            
            <div className="md:col-span-2 p-4 bg-slate-50 dark:bg-slate-900/80">
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
                Rumus: {hasil.tarifE}% × {fmt(hasil.brutoIDR)} = {fmt(hasil.pph)} <br/>
                {npwp === 'tidak' && <span className="text-amber-600 dark:text-amber-500">⚠ Tarif dikali 2 karena tidak ber-NPWP[cite: 2]</span>}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}