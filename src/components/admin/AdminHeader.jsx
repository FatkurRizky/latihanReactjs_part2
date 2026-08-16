import { Link } from 'react-router-dom';
import { Store, Receipt, Plus, Sparkles, FileSpreadsheet, Download } from 'lucide-react';

export default function AdminHeader({ onOpenAddModal, csvInputRef, handleImportCSV }) {
  return (
    <div className="relative overflow-hidden bg-[#121215]/90 border border-zinc-800/90 p-5 rounded-2xl backdrop-blur-xl shadow-xl">
      {/* Background Ambient Glow */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden File Input for CSV Import */}
      <input 
        type="file" 
        accept=".csv,.txt"
        ref={csvInputRef}
        onChange={handleImportCSV}
        className="hidden"
      />

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent uppercase tracking-wider">
              Gudang Toko Lala
            </span>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE STORAGE</span>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Halo Boss selamat datang
          </h1>
          <p className="text-xs text-zinc-400">Kelola inventaris barang, harga modal, dan pemantauan stok sembako real-time</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <Link 
            to="/" 
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#09090b] hover:bg-zinc-800 text-zinc-200 hover:text-white px-3.5 py-2.5 rounded-xl border border-zinc-800 hover:border-emerald-500/40 text-xs font-semibold transition-all shadow-sm"
          >
            <Store size={15} className="text-emerald-400" />
            <span>Kasir</span>
          </Link>

          <Link 
            to="/history" 
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#09090b] hover:bg-zinc-800 text-zinc-200 hover:text-white px-3.5 py-2.5 rounded-xl border border-zinc-800 hover:border-indigo-500/40 text-xs font-semibold transition-all shadow-sm"
          >
            <Receipt size={15} className="text-indigo-400" />
            <span>Omset</span>
          </Link>

          {/* Tombol Download Template CSV */}
          <a 
            href="/daftar_sembako_toko_lala.csv"
            download="daftar_sembako_toko_lala.csv"
            className="flex items-center justify-center gap-1.5 bg-[#09090b] hover:bg-zinc-800 text-zinc-300 hover:text-white px-3 py-2.5 rounded-xl border border-zinc-800 text-xs font-semibold transition-all shadow-sm"
            title="Download Template Contoh 20 Barang Sembako"
          >
            <Download size={14} className="text-amber-400" />
            <span>Template CSV</span>
          </a>

          {/* Tombol Import Excel / CSV */}
          <button 
            type="button"
            onClick={() => csvInputRef.current?.click()}
            className="flex items-center justify-center gap-2 bg-[#09090b] hover:bg-zinc-800 text-teal-300 hover:text-teal-200 px-3.5 py-2.5 rounded-xl border border-teal-500/30 hover:border-teal-400 text-xs font-bold transition-all shadow-sm"
            title="Upload File Excel / CSV (Import 200+ Produk Sekaligus)"
          >
            <FileSpreadsheet size={15} className="text-teal-400" />
            <span>Import CSV</span>
          </button>

          <button 
            onClick={onOpenAddModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-zinc-950 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Tambah Barang</span>
            <Sparkles size={13} className="text-zinc-900" />
          </button>
        </div>
      </div>
    </div>
  );
}
