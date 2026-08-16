import { ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';

export default function CartPanel({
  cart,
  setCart,
  decreaseQty,
  addToCart,
  paymentAmount,
  setPaymentAmount,
  paymentNum,
  changeAmount,
  totalAmount,
  handleCheckout,
  isProcessing
}) {
  return (
    <div className="w-[360px] flex-shrink-0 bg-[#121215]/95 border-l border-zinc-800/90 p-5 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
              <ShoppingBag size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Pesanan Kasir</h2>
              <span className="text-[10px] text-emerald-400 font-semibold">{cart.length} Jenis Barang</span>
            </div>
          </div>
          {cart.length > 0 && (
            <button 
              onClick={() => setCart([])}
              className="text-[11px] text-zinc-500 hover:text-rose-400 font-semibold transition flex items-center gap-1"
            >
              <Trash2 size={12} /> Hapus
            </button>
          )}
        </div>

        {/* Cart Item List */}
        <div className="max-h-[42vh] overflow-y-auto space-y-2 pr-1 no-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center text-zinc-500 py-16 text-xs flex flex-col items-center gap-2">
              <ShoppingBag size={28} className="text-zinc-700" />
              <span>Keranjang kasir masih kosong</span>
              <span className="text-[10px] text-zinc-600">Klik item sembako di sebelah kiri untuk menambah pesanan</span>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-[#09090b] border border-zinc-800/90 p-3 rounded-xl hover:border-zinc-700 transition">
                <div className="flex-1 pr-2">
                  <h4 className="font-bold text-xs text-zinc-100 line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-emerald-400 font-extrabold mt-0.5">
                    Rp {Number(item.price).toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => decreaseQty(item.id)} 
                    className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg flex items-center justify-center transition border border-zinc-700"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="font-black text-xs w-4 text-center text-white">{item.qty}</span>
                  <button 
                    onClick={() => addToCart(item)} 
                    className="w-7 h-7 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg flex items-center justify-center transition border border-zinc-700"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-800 space-y-3 relative z-10">
        {cart.length > 0 && (
          <div>
            <div className="flex justify-between items-center text-xs text-zinc-400 mb-1">
              <span className="font-semibold text-zinc-300">Uang Tunai (Rp)</span>
              {paymentNum > 0 && (
                <span className={changeAmount >= 0 ? 'text-emerald-400 font-extrabold' : 'text-rose-400 font-extrabold'}>
                  {changeAmount >= 0 ? `Kembali: Rp ${changeAmount.toLocaleString('id-ID')}` : 'Kurang'}
                </span>
              )}
            </div>
            <input
              type="number"
              placeholder="Masukkan nominal tunai..."
              value={paymentAmount}
              onChange={e => setPaymentAmount(e.target.value)}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-mono font-bold"
            />
            <div className="grid grid-cols-4 gap-1.5 mt-2">
              {[totalAmount, 20000, 50000, 100000].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setPaymentAmount(val.toString())}
                  className="bg-[#09090b] hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/40 text-[10px] font-bold text-zinc-300 py-1.5 rounded-lg transition shadow-sm"
                >
                  {val === totalAmount ? 'Uang Pas' : `${val/1000}k`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Total Tagihan Card */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 p-4 rounded-xl flex justify-between items-end shadow-inner">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-extrabold block">Total Tagihan</span>
            <span className="text-2xl font-black text-white tracking-tight">Rp {totalAmount.toLocaleString('id-ID')}</span>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
            {cart.reduce((s, i) => s + i.qty, 0)} pcs
          </span>
        </div>
        
        <button 
          onClick={handleCheckout} 
          disabled={cart.length === 0 || isProcessing}
          className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-950 font-extrabold py-3.5 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>{isProcessing ? 'Memproses...' : 'Proses Pembayaran'}</span>
          {!isProcessing && <ArrowRight size={15} />}
        </button>
      </div>
    </div>
  );
}
