import { CheckCircle2, Sparkles, Receipt, ArrowRight } from 'lucide-react';

export default function SuccessModal({ successModal, onClose }) {
  if (!successModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 transition-all duration-300">
      <div className="bg-[#121215] border border-emerald-500/30 p-6 rounded-2xl w-full max-w-sm text-center shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden transform transition-all scale-100">
        
        {/* Glow Ambient background */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Badge Icon */}
        <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <CheckCircle2 size={32} />
        </div>

        {/* Header Title & Subtitle */}
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20 mb-2">
          <Sparkles size={12} /> TRANSAKSI BERHASIL
        </div>
        <h3 className="text-xl font-extrabold text-white tracking-tight">Pembayaran Selesai</h3>
        <p className="text-xs text-zinc-400 mt-1 font-mono flex items-center justify-center gap-1">
          <Receipt size={12} className="text-zinc-500" />
          <span>{successModal.invoice}</span>
        </p>

        {/* Rincian Nota Card */}
        <div className="bg-[#09090b] border border-zinc-800/90 p-4 rounded-xl my-5 text-left text-xs space-y-2.5 shadow-inner">
          <div className="flex justify-between text-zinc-400">
            <span>Total Belanja:</span>
            <span className="text-white font-bold">Rp {Number(successModal.total).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Uang Tunai:</span>
            <span className="text-white font-semibold">Rp {Number(successModal.payment).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between border-t border-zinc-800/80 pt-2 text-emerald-400 font-extrabold text-sm">
            <span>Uang Kembalian:</span>
            <span>Rp {Number(successModal.change).toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold py-3 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2 group"
        >
          <span>Selesai & Transaksi Baru</span>
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
