import React, { useState } from 'react';
import { taxData } from '../utils/taxData';
import { calculateTax } from '../utils/taxCalculator';

export default function TaxForm({ onResult, onReset }) {
  const [group, setGroup] = useState('');
  const [sub, setSub] = useState('');
  const [method, setMethod] = useState('excl');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');

  const selectedRule = group && sub !== '' ? taxData[group].items[parseInt(sub)] : null;

  const handleCalculate = () => {
    if (!selectedRule) return setError("⚠ Pilih kelompok dan sub-kategori terlebih dahulu.");
    const rawPrice = parseFloat(price);
    if (!rawPrice || rawPrice <= 0) return setError("⚠ Masukkan harga satuan yang valid.");
    setError('');
    onResult(calculateTax(rawPrice, qty, method, selectedRule));
  };

  const inputClass = "w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all";

  return (
    <div className="space-y-6">
      {/* STEP 1 */}
      <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50">
        <div className="mb-6 border-b border-slate-700 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-xs text-white">1</span>
            Pilih Kategori Barang / Jasa
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Kelompok Kategori</label>
            <select className={inputClass} value={group} onChange={(e) => { setGroup(e.target.value); setSub(''); onReset(); }}>
              <option value="">— Pilih kelompok —</option>
              {Object.keys(taxData).map(key => (
                <option key={key} value={key}>{taxData[key].label}</option>
              ))}
            </select>
          </div>

          {group && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Sub-Kategori</label>
              <select className={inputClass} value={sub} onChange={(e) => { setSub(e.target.value); onReset(); }}>
                <option value="">— Pilih sub-kategori —</option>
                {taxData[group].items.map((item, idx) => (
                  <option key={idx} value={idx}>{item.n}</option>
                ))}
              </select>
            </div>
          )}

          {selectedRule && (
             <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
               <p className="text-sm text-emerald-400 font-semibold mb-1">Info Tarif:</p>
               <p className="text-xs text-slate-300">{selectedRule.note}</p>
               <p className="text-xs text-slate-500 mt-2">Dasar Hukum: {selectedRule.hk}</p>
             </div>
          )}
        </div>
      </div>

      {/* STEP 2 */}
      <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700/50">
        <div className="mb-6 border-b border-slate-700 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-xs text-white">2</span>
            Input Nilai Transaksi
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Metode Harga</label>
            <select className={inputClass} value={method} onChange={(e) => { setMethod(e.target.value); onReset(); }}>
              <option value="excl">Belum termasuk PPN (Eksklusif)</option>
              <option value="incl">Sudah termasuk PPN (Inklusif)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Harga Satuan (Rp)</label>
              <input type="number" className={inputClass} placeholder="0" value={price} onChange={(e) => { setPrice(e.target.value); onReset(); }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Kuantitas</label>
              <input type="number" className={inputClass} min="1" value={qty} onChange={(e) => { setQty(e.target.value); onReset(); }} />
            </div>
          </div>

          <button 
            onClick={handleCalculate}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex justify-center items-center gap-2"
          >
            Hitung Pajak
          </button>
          
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}