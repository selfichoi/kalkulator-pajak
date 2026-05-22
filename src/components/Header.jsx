import React from 'react';

export default function Header({ isLoggedIn, onLogout }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold text-white">
          <span>📊</span>
          <span>Pajak<span className="text-emerald-500">ID</span></span>
          <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 hidden md:inline-block">
            UU HPP 2022
          </span>
        </div>
        
        {/* Tombol Logout hanya muncul jika user sudah login */}
        {isLoggedIn && (
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-rose-400 transition-colors bg-slate-800 hover:bg-rose-950/30 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-rose-900/50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}