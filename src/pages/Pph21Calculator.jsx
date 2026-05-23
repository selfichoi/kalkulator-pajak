import React, { useState } from 'react';
import { TIPE_KARYAWAN, PTKP } from '../utils/pph21Data';
import { hitungPPh21 } from '../utils/pph21Calculator';

export default function Pph21Calculator() {
  // --- STATE INPUT FORM ---
  const [jenisPemotongan, setJenisPemotongan] = useState('');
  const [kodeObjekPajak, setKodeObjekPajak] = useState('');
  const [skemaPenghitungan, setSkemaPenghitungan] = useState('Netto'); // Default Netto
  const [brutoSebelumnya, setBrutoSebelumnya] = useState('');
  const [bruto, setBruto] = useState('');
  const [statusPtkp, setStatusPtkp] = useState('');
  const [isDtp, setIsDtp] = useState(false);

  // --- STATE HASIL PERHITUNGAN ---
  const [hasil, setHasil] = useState({
    dpp: 0,
    tarif: 0,
    pph21: 0
  });

  // --- FUNGSI RESET ---
  const handleReset = () => {
    setJenisPemotongan('');
    setKodeObjekPajak('');
    setSkemaPenghitungan('Netto');
    setBrutoSebelumnya('');
    setBruto('');
    setStatusPtkp('');
    setIsDtp(false);
    setHasil({ dpp: 0, tarif: 0, pph21: 0 });
  };

  // --- FUNGSI HITUNG ---
  const handleHitung = () => {
    // Menyesuaikan pilihan dropdown skema dengan format yang diminta rumus
    let metodePajakParam = 'gross';
    if (skemaPenghitungan === 'Gross Up') metodePajakParam = 'gross_up';
    else if (skemaPenghitungan === 'Netto') metodePajakParam = 'netto';

    const params = {
      tipeKaryawan: jenisPemotongan || 'tetap', 
      gajiPokok: Number(bruto) || 0,
      brutoSebelumnya: Number(brutoSebelumnya) || 0,
      ptkpKey: statusPtkp || 'TK0',
      metodePerhitungan: 'ter',
      metodePajak: metodePajakParam, // <-- Sudah dinamis mengikuti pilihan Gross/Netto/Gross Up
      npwp: true
    };

    const kalkulasi = hitungPPh21(params);
    
    setHasil({
      dpp: kalkulasi.pkp || kalkulasi.dpp || Number(bruto), 
      tarif: kalkulasi.tarifTer ? (kalkulasi.tarifTer * 100).toFixed(2) : 0, 
      pph21: kalkulasi.pph21Bulanan || kalkulasi.pph21BulanIni || 0
    });
  };

  // --- STYLE KELAS TAILWIND ---
  const inputContainer = "border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden";
  const labelClass = "block text-[11px] text-slate-400 dark:text-slate-500 px-4 pt-2 pb-0.5 bg-white dark:bg-slate-800";
  const inputClass = "w-full bg-white dark:bg-slate-800 px-4 pb-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none";
  const readOnlyInputClass = "w-full bg-slate-100 dark:bg-slate-900/50 px-4 py-2 text-sm text-slate-800 dark:text-slate-200 outline-none";

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12">
      
      {/* HEADER JUDUL */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Kalkulator PPh 21</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Hitung pajak penghasilan untuk pegawai dengan mudah.</p>
      </div>

      {/* CARD 1: DATA PERHITUNGAN */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm mb-6">
        <div className="text-center py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-700 dark:text-slate-200">Data Perhitungan</h2>
        </div>
        
        <div className="p-6 space-y-4">
          
          <div className={inputContainer}>
            <label className={labelClass}>Jenis Pemotongan ?</label>
            <select value={jenisPemotongan} onChange={(e) => setJenisPemotongan(e.target.value)} className={inputClass}>
              <option value="" disabled>Pilih Jenis Pemotongan</option>
              {TIPE_KARYAWAN.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          {/* REVISI 1: Opsi Kode Objek Pajak dilengkapin */}
          <div className={inputContainer}>
            <label className={labelClass}>Kode Objek Pajak ?</label>
            <select value={kodeObjekPajak} onChange={(e) => setKodeObjekPajak(e.target.value)} className={inputClass}>
              <option value="" disabled>Pilih Kode Objek Pajak</option>
              <option value="21-100-01">21-100-01 (Pegawai Tetap)</option>
              <option value="21-100-02">21-100-02 (Pegawai Tidak Tetap)</option>
              <option value="21-100-03">21-100-03 (Pensiunan)</option>
              <option value="21-100-04">21-100-04 (Pejabat Negara)</option>
              <option value="21-100-05">21-100-05 (Konsultan)</option>
            </select>
          </div>

          {/* REVISI 2: Skema Penghitungan jadi Dropdown */}
          <div className={inputContainer}>
            <label className={labelClass}>Skema Penghitungan ?</label>
            <select value={skemaPenghitungan} onChange={(e) => setSkemaPenghitungan(e.target.value)} className={inputClass}>
              <option value="Netto">Netto</option>
              <option value="Gross">Gross</option>
              <option value="Gross Up">Gross Up</option>
            </select>
          </div>

          <div className={inputContainer}>
            <label className={labelClass}>Penghasilan Bruto Sebelumnya (Rp) ?</label>
            <input type="number" value={brutoSebelumnya} onChange={(e) => setBrutoSebelumnya(e.target.value)} className={inputClass} placeholder="0" />
          </div>

          <div className={inputContainer}>
            <label className={labelClass}>Penghasilan Bruto (Rp) ?</label>
            <input type="number" value={bruto} onChange={(e) => setBruto(e.target.value)} className={inputClass} placeholder="0" />
          </div>

          <div className={inputContainer}>
            <label className={labelClass}>Status PTKP ?</label>
            <select value={statusPtkp} onChange={(e) => setStatusPtkp(e.target.value)} className={inputClass}>
              <option value="" disabled>Pilih Status PTKP</option>
              {Object.keys(PTKP).map(key => (
                <option key={key} value={key}>{PTKP[key].label}</option>
              ))}
            </select>
          </div>

          {/* Checkbox DTP */}
          <div className="flex items-center justify-center pt-4">
            <input 
              type="checkbox" 
              id="dtp" 
              checked={isDtp}
              onChange={(e) => setIsDtp(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
            />
            <label htmlFor="dtp" className="ml-3 text-sm font-medium text-slate-600 dark:text-slate-300">
              PPh 21 Ditanggung Pemerintah (DTP) ?
            </label>
          </div>

        </div>
      </div>

      {/* CARD 2: HASIL PERHITUNGAN */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm mb-8">
        <div className="text-center py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-700 dark:text-slate-200">Hasil Perhitungan</h2>
        </div>
        
        <div className="p-6 space-y-4">
          
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <label className="block text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-900/50 px-4 pt-2">DPP (Rp)</label>
            <input type="text" readOnly value={hasil.dpp.toLocaleString('id-ID')} className={readOnlyInputClass} />
          </div>

          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <label className="block text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-900/50 px-4 pt-2">Tarif (%)</label>
            <input type="text" readOnly value={hasil.tarif} className={readOnlyInputClass} />
          </div>

          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <label className="block text-[11px] text-slate-500 bg-slate-100 dark:bg-slate-900/50 px-4 pt-2">PPh 21 (Rp)</label>
            <input type="text" readOnly value={hasil.pph21.toLocaleString('id-ID')} className={readOnlyInputClass} />
          </div>

        </div>
      </div>

      {/* TOMBOL AKSI */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={handleHitung}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-blue-500 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          Hitung PPh 21 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
        </button>
        
        <button 
          onClick={handleReset}
          className="px-6 py-2.5 rounded-full border-2 border-slate-300 text-slate-500 dark:text-slate-400 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Reset
        </button>
      </div>

    </div>
  );
}