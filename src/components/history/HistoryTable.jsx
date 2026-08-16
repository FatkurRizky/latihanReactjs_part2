import { Printer, Trash2 } from 'lucide-react';

export default function HistoryTable({ transactions, onSelectReceipt, onDeleteTransaction }) {
  return (
    <div className="bg-[#121215] border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#09090b] text-zinc-400 uppercase font-semibold border-b border-zinc-800">
          <tr>
            <th className="p-3">Waktu</th>
            <th className="p-3">Invoice</th>
            <th className="p-3">Total Belanja</th>
            <th className="p-3">Pembayaran / Susuk</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/80">
          {transactions.map(trx => (
            <tr key={trx.id} className="hover:bg-zinc-800/40 transition">
              <td className="p-3 text-zinc-400">
                {new Date(trx.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
              </td>
              <td className="p-3 font-mono font-semibold text-zinc-200">
                {trx.invoice_number}
              </td>
              <td className="p-3 font-bold text-white">
                Rp {Number(trx.total_amount || 0).toLocaleString('id-ID')}
              </td>
              <td className="p-3 text-[11px] text-zinc-400">
                <div>Tunai: Rp {Number(trx.payment || 0).toLocaleString('id-ID')}</div>
                <div className="text-zinc-500">
                  Kembali: Rp {Math.max(0, Number(trx.payment || 0) - Number(trx.total_amount || 0)).toLocaleString('id-ID')}
                </div>
              </td>
              <td className="p-3 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <button 
                    onClick={() => onSelectReceipt(trx)}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 rounded-lg transition font-medium text-[11px] inline-flex items-center gap-1.5"
                    title="Cetak Struk"
                  >
                    <Printer size={13} /> Lihat Struk
                  </button>
                  <button 
                    onClick={() => onDeleteTransaction(trx.id, trx.invoice_number)}
                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg transition"
                    title="Hapus Transaksi Testing"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {transactions.length === 0 && (
        <div className="text-center p-8 text-zinc-500 text-xs">Belum ada riwayat transaksi.</div>
      )}
    </div>
  );
}
