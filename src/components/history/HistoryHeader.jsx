import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, DollarSign, Receipt } from 'lucide-react';

export default function HistoryHeader({ totalRevenue, totalProfit, totalTransactions }) {
  const profitMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#121215] border border-zinc-800 p-5 rounded-xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Laporan Keuangan & Riwayat Transaksi</h1>
          <p className="text-xs text-zinc-400 mt-0.5">Analisis omset kotor, keuntungan bersih, dan cetak struk belanja</p>
        </div>
        <Link to="/admin" className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-2 rounded-lg border border-zinc-700 text-xs font-medium transition">
          <ArrowLeft size={14} /> Kembali ke Gudang
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-[#121215] border border-zinc-800 p-4 rounded-xl">
          <div className="flex justify-between items-center text-zinc-400 mb-1">
            <span className="text-[11px] font-medium">Total Omset Kotor</span>
            <DollarSign size={15} className="text-zinc-500" />
          </div>
          <span className="text-2xl font-bold text-white block">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="bg-[#121215] border border-zinc-800 p-4 rounded-xl">
          <div className="flex justify-between items-center text-emerald-400 mb-1">
            <span className="text-[11px] font-medium text-zinc-400">Keuntungan Bersih (Profit)</span>
            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              +{profitMargin}% Margin
            </span>
          </div>
          <span className="text-2xl font-bold text-emerald-400 block">
            Rp {totalProfit.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="bg-[#121215] border border-zinc-800 p-4 rounded-xl">
          <div className="flex justify-between items-center text-zinc-400 mb-1">
            <span className="text-[11px] font-medium">Total Transaksi</span>
            <Receipt size={15} className="text-zinc-500" />
          </div>
          <span className="text-2xl font-bold text-white block">
            {totalTransactions} <span className="text-xs font-normal text-zinc-500">Nota</span>
          </span>
        </div>
      </div>
    </div>
  );
}
