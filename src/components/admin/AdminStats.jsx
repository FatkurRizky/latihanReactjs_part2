import { PackageCheck, Boxes, AlertTriangle, TrendingUp } from 'lucide-react';

export default function AdminStats({ products }) {
  const totalItems = products.length;
  const outOfStockItems = products.filter(p => p.stock <= 0).length;
  const lowStockItems = products.filter(p => p.stock > 0 && p.stock <= 3).length;
  const totalStockCount = products.reduce((acc, p) => acc + Number(p.stock), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Stat Card 1: Total Jenis Barang */}
      <div className="group relative overflow-hidden bg-[#121215]/80 border border-zinc-800/80 hover:border-indigo-500/40 p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Total Jenis Barang</span>
            <div className="text-2xl font-black text-white tracking-tight flex items-baseline gap-1.5">
              {totalItems} <span className="text-xs font-semibold text-zinc-500">Kategori / Variant</span>
            </div>
          </div>
          <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <PackageCheck size={20} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10px] text-indigo-400 font-bold">
          <TrendingUp size={12} />
          <span>Katalog Aktif di Gudang</span>
        </div>
      </div>

      {/* Stat Card 2: Total Stok Unit */}
      <div className="group relative overflow-hidden bg-[#121215]/80 border border-zinc-800/80 hover:border-emerald-500/40 p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Total Stok Fisik</span>
            <div className="text-2xl font-black text-emerald-400 tracking-tight flex items-baseline gap-1.5">
              {totalStockCount.toLocaleString('id-ID')} <span className="text-xs font-semibold text-zinc-500">Unit / Liter</span>
            </div>
          </div>
          <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Boxes size={20} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Siap Dijual ke Tetangga</span>
        </div>
      </div>

      {/* Stat Card 3: Alert Stok Habis / Tipis */}
      <div className={`group relative overflow-hidden bg-[#121215]/80 border p-4 rounded-2xl transition-all duration-300 shadow-sm ${
        outOfStockItems > 0 
          ? 'border-rose-500/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]' 
          : lowStockItems > 0 
          ? 'border-amber-500/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
          : 'border-zinc-800/80 hover:border-zinc-700'
      }`}>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Perhatian Stok</span>
            <div className={`text-2xl font-black tracking-tight flex items-baseline gap-1.5 ${
              outOfStockItems > 0 ? 'text-rose-400' : lowStockItems > 0 ? 'text-amber-400' : 'text-zinc-200'
            }`}>
              {outOfStockItems} <span className="text-xs font-semibold text-zinc-500">Habis</span>
              {lowStockItems > 0 && (
                <span className="text-xs font-bold text-amber-400 ml-1">({lowStockItems} Tipis)</span>
              )}
            </div>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
            outOfStockItems > 0 
              ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' 
              : lowStockItems > 0 
              ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' 
              : 'bg-zinc-800 text-zinc-400'
          }`}>
            <AlertTriangle size={20} />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10px] font-bold">
          {outOfStockItems > 0 ? (
            <span className="text-rose-400">⚠️ Segera Restock dari Pasar</span>
          ) : lowStockItems > 0 ? (
            <span className="text-amber-400">⚡ Persediaan Stok Tinggal Sedikit</span>
          ) : (
            <span className="text-emerald-400">✓ Semua Stok Aman Tersedia</span>
          )}
        </div>
      </div>
    </div>
  );
}
