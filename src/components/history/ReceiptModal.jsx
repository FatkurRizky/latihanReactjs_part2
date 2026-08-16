export default function ReceiptModal({ selectedReceipt, onClose, onPrint }) {
  if (!selectedReceipt) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white text-zinc-900 p-6 rounded-xl w-full max-w-xs shadow-2xl relative font-mono text-xs" id="printable-receipt">
        
        <button 
          onClick={onClose} 
          className="absolute top-2 right-3 text-zinc-400 hover:text-black font-bold text-base print:hidden"
        >
          ✕
        </button>

        <div className="text-center border-b border-dashed border-zinc-400 pb-3 mb-3">
          <h2 className="text-base font-bold uppercase tracking-wider">TOKO LALA SEMBAKO</h2>
          <p className="text-[10px] text-zinc-500">Kios Sembako & Ritel Lala</p>
          <div className="mt-2 text-[10px] font-bold text-zinc-800">
            {selectedReceipt.invoice_number}
          </div>
          <p className="text-[10px] text-zinc-500">{new Date(selectedReceipt.created_at).toLocaleString('id-ID')}</p>
        </div>

        <div className="space-y-2 mb-3 border-b border-dashed border-zinc-400 pb-3">
          {(selectedReceipt.details || []).map(detail => (
            <div key={detail.id} className="flex justify-between items-start text-[11px]">
              <div>
                <p className="font-semibold text-zinc-900">{detail.product?.name || 'Produk Dihapus'}</p>
                <p className="text-[10px] text-zinc-500">{detail.quantity} x Rp {Number(detail.price).toLocaleString('id-ID')}</p>
              </div>
              <span className="font-semibold text-zinc-900">Rp {Number(detail.subtotal).toLocaleString('id-ID')}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1 font-semibold text-xs">
          <div className="flex justify-between">
            <span>TOTAL:</span>
            <span>Rp {Number(selectedReceipt.total_amount).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-zinc-600 text-[11px]">
            <span>TUNAI:</span>
            <span>Rp {Number(selectedReceipt.payment).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-zinc-600 text-[11px]">
            <span>KEMBALI:</span>
            <span>Rp {(selectedReceipt.payment - selectedReceipt.total_amount).toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div className="text-center mt-5 pt-3 border-t border-dashed border-zinc-400 text-[10px] text-zinc-500">
          MATUR NUWUN - TERIMA KASIH
        </div>
        
        <button 
          onClick={onPrint}
          className="w-full mt-4 bg-zinc-900 text-white py-2 rounded-lg font-sans font-bold text-xs print:hidden hover:bg-zinc-800 transition"
        >
          Cetak Struk
        </button>
      </div>
    </div>
  );
}
