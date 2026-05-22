import React from 'react';
import { formatCurrency } from '../utils/taxCalculator';

export default function ResultCard({ result }) {
  if (!result) {
    return (
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 border-dashed text-center flex flex-col items-center justify-center min-h-[300px]">
        <h2 className="text-lg font-bold text-slate-500 mb-2">Langkah 3: Hasil Perhitungan</h2>
        <p className="text-slate-400 text-sm">Lengkapi langkah 1 dan 2, lalu klik Hitung Pajak</p>
      </div>
    );
  }

  const { pk, dpp, ppn, ppnbm, total, notes } = result;

  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl border border-emerald-500/30 ring-1 ring-emerald-500/10">
      <div className="mb-6 border-b border-slate-700 pb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-xs text-white">3</span>
          Rincian Perhitungan
        </h2>
      </div>
      
      <div className="space-y-4 text-sm md:text-base">
        <div className="flex justify-between items-center py-2 text-slate-300">
          <span>Harga Pokok</span>
          <span className="font-mono">{formatCurrency(pk)}</span>
        </div>
        <div className="flex justify-between items-center py-2 text-slate-300">
          <span>Dasar Pengenaan Pajak (DPP)</span>
          <span className="font-mono">{formatCurrency(dpp)}</span>
        </div>
        <div className="flex justify-between items-center py-2 text-emerald-400 font-medium">
          <span>PPN Terutang</span>
          <span className="font-mono">{formatCurrency(ppn)}</span>
        </div>
        {ppnbm > 0 && (
          <div className="flex justify-between items-center py-2 text-rose-400 font-medium">
            <span>PPnBM Terutang</span>
            <span className="font-mono">{formatCurrency(ppnbm)}</span>
          </div>
        )}
        
        <div className="pt-4 mt-2 border-t border-slate-700">
          <div className="flex justify-between items-center py-3 text-white font-bold text-lg md:text-xl">
            <span>Total yang Harus Dibayar</span>
            <span className="font-mono text-emerald-400">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-slate-950/50 p-4 rounded-lg text-xs text-slate-400 border border-slate-800">
        <strong className="text-slate-300">Catatan:</strong> {notes}
      </div>
    </div>
  );
}