import { Link } from 'react-router-dom';
import { RefreshCw, Settings, ShoppingBag, Sparkles } from 'lucide-react';

export default function CashierHeader({ onRefresh }) {
  return (
    <div className="relative overflow-hidden bg-[#121215]/90 border border-zinc-800/90 p-4 rounded-2xl backdrop-blur-xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      {/* Background Ambient Glow */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="space-y-0.5 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent uppercase tracking-wider">
            POS Terminal Kasir
          </span>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[9px] font-bold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>KASIR READY</span>
          </div>
        </div>
        <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          Terminal Kasir Toko Lala 🛒
        </h1>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto relative z-10">
        <button 
          onClick={onRefresh}
          className="p-2.5 bg-[#09090b] hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl border border-zinc-800 hover:border-emerald-500/40 text-xs transition-all shadow-sm"
          title="Refresh Data Barang"
        >
          <RefreshCw size={15} className="hover:rotate-180 transition-transform duration-500" />
        </button>

        <Link 
          to="/admin" 
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#09090b] hover:bg-zinc-800 text-zinc-200 hover:text-white px-3.5 py-2.5 rounded-xl border border-zinc-800 hover:border-indigo-500/40 text-xs font-bold transition-all shadow-sm"
        >
          <Settings size={15} className="text-indigo-400" />
          <span>Gudang Admin</span>
        </Link>
      </div>
    </div>
  );
}
