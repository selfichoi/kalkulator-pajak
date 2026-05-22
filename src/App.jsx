import React, { useState } from 'react';
import Header from './components/Header';
import TaxForm from './components/TaxForm';
import ResultCard from './components/ResultCard';

export default function App() {
  // State untuk navigasi: 'login', 'dashboard', atau 'calculator'
  const [activePage, setActivePage] = useState('login'); 
  const [result, setResult] = useState(null);

  // State untuk Form Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Fungsi Proses Login
  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah halaman reload
    
    // Cek kecocokan username dan password (DUMMY)
    if (username === 'kelompok7' && password === 'pajak123') {
      setActivePage('dashboard');
      setLoginError('');
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Username atau password salah!');
    }
  };

  // Fungsi Logout
  const handleLogout = () => {
    setActivePage('login');
    setResult(null);
  };

  // Fungsi Kembali ke Dashboard
  const handleBackToDashboard = () => {
    setActivePage('dashboard');
    setResult(null);
  };

  const inputClass = "w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all";

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans">
      <Header isLoggedIn={activePage !== 'login'} onLogout={handleLogout} />
      
      <main className="flex-grow max-w-5xl mx-auto px-4 mt-10 w-full flex flex-col">
        
        {/* === HALAMAN LOGIN === */}
        {activePage === 'login' && (
          <div className="flex-grow flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-700/50 w-full max-w-md relative overflow-hidden">
              {/* Efek cahaya dekoratif di background form */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
              
              <div className="text-center mb-8 relative z-10">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-2xl shadow-lg border-2 border-emerald-500/50">
                    <img 
                        src="/foto-kelompok.jpg" 
                        alt="Foto Kelompok 7" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">WELCOME </h2>
                <p className="text-slate-400 text-sm mt-2">Silakan masuk</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                  <input 
                    type="text" 
                    className={inputClass}
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                  <input 
                    type="password" 
                    className={inputClass}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {loginError && (
                  <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm px-4 py-3 rounded-lg text-center font-medium">
                    {loginError}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98]"
                >
                  Masuk Sekarang
                </button>

                <div className="text-center mt-4 text-xs text-slate-500">
                  <p>Hint - Username: <span className="text-slate-300 font-mono">kelompok7</span></p>
                  <p>Hint - Password: <span className="text-slate-300 font-mono">pajak123</span></p>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* === HALAMAN DASHBOARD === */}
        {activePage === 'dashboard' && (
          <div className="animate-in fade-in duration-500 pt-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">PajakID</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Portal pintar untuk menghitung berbagai kebutuhan perpajakan Anda dengan cepat, akurat, dan sesuai regulasi terbaru.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => setActivePage('calculator')}
                className="bg-slate-800 rounded-2xl p-6 border border-emerald-500/30 hover:border-emerald-500 cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-900/20 group"
              >
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Kalkulator PPN & PPnBM</h3>
                <p className="text-slate-400 text-sm">Hitung PPN 12%, DPP Nilai Lain, dan Pajak Barang Mewah sesuai UU HPP.</p>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 opacity-70 cursor-not-allowed">
                <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center text-2xl mb-4">
                  💼
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Kalkulator PPh 21</h3>
                <p className="text-slate-400 text-sm mb-3">Hitung Pajak Penghasilan karyawan dengan tarif efektif rata-rata (TER).</p>
                <span className="text-xs font-semibold bg-slate-700 text-slate-300 px-2 py-1 rounded-full">Segera Hadir</span>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 opacity-70 cursor-not-allowed">
                <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center text-2xl mb-4">
                  📚
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Regulasi & Aturan</h3>
                <p className="text-slate-400 text-sm mb-3">Kumpulan dasar hukum, Peraturan Menteri Keuangan, dan panduan pajak.</p>
                <span className="text-xs font-semibold bg-slate-700 text-slate-300 px-2 py-1 rounded-full">Segera Hadir</span>
              </div>
            </div>
          </div>
        )}

        {/* === HALAMAN KALKULATOR === */}
        {activePage === 'calculator' && (
          <div className="animate-in fade-in duration-500">
            <button 
              onClick={handleBackToDashboard}
              className="mb-8 flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors font-medium text-sm"
            >
              <span>←</span> Kembali ke Dashboard
            </button>

            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
                Kalkulator <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">PPN & PPnBM</span>
              </h1>
              <p className="text-slate-400">
                Pilih kategori barang/jasa dan masukkan nilai transaksi Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <TaxForm onResult={setResult} onReset={() => setResult(null)} />
              </div>
              <div className="lg:col-span-5">
                <div className="sticky top-24">
                  <ResultCard result={result} />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER WATERMARK KELOMPOK 7 */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/30 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} <span className="text-emerald-500">Kelompok 7</span>. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs mt-1.5">
            Project Tugas Aplikasi Perhitungan PPN & PPnBM.
          </p>
        </div>
      </footer>
    </div>
  );
}