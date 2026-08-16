import { ShoppingCart, Plus, PackageX, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductGrid({ products, cart, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="min-h-[320px] bg-[#121215]/80 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center space-y-3">
        <div className="w-14 h-14 bg-zinc-800/80 rounded-2xl flex items-center justify-center border border-zinc-700/80 text-zinc-500 shadow-inner">
          <PackageX size={28} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-300">Tidak ada produk ditemukan</h3>
          <p className="text-xs text-zinc-500 mt-1">Stok di gudang belum diisi atau tidak cocok dengan pencarian</p>
        </div>
        <Link 
          to="/admin" 
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-zinc-950 px-4 py-2 rounded-xl text-xs font-extrabold shadow-lg transition"
        >
          <Sparkles size={14} /> Restock di Gudang Admin
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
      {products.map(product => {
        const inCart = cart.find(c => c.id === product.id);
        const isOutOfStock = product.stock <= 0;
        const catName = typeof product.category === 'object' ? product.category?.name : (product.category || 'Umum');

        return (
          <div 
            key={product.id} 
            onClick={() => !isOutOfStock && onAddToCart(product)}
            className={`group relative bg-[#121215]/90 border border-zinc-800/90 hover:border-emerald-500/50 p-3.5 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:scale-[1.02] active:scale-[0.98] ${
              isOutOfStock ? 'opacity-40 cursor-not-allowed border-zinc-800' : ''
            }`}
          >
            <div>
              {/* Image Container with Glow */}
              <div className="relative h-32 bg-[#09090b] rounded-xl mb-3 overflow-hidden border border-zinc-800/80 group-hover:border-emerald-500/30 flex items-center justify-center transition-all">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="text-3xl">📦</div>
                )}

                {/* Stock Badge Overlay */}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${
                    isOutOfStock 
                      ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' 
                      : product.stock <= 3 
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                      : 'bg-zinc-900/80 border-zinc-700 text-zinc-300'
                  }`}>
                    {isOutOfStock ? 'Habis' : `Stok: ${product.stock}`}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start gap-1">
                <h3 className="font-bold text-zinc-100 text-xs line-clamp-1 group-hover:text-emerald-400 transition-colors">
                  {product.name}
                </h3>
                {inCart && (
                  <span className="bg-indigo-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.4)] animate-bounce">
                    {inCart.qty}x
                  </span>
                )}
              </div>
              <p className="text-[10px] text-emerald-400 font-bold uppercase mt-0.5">{catName}</p>
            </div>

            {/* Price & Quick Add */}
            <div className="flex justify-between items-center mt-3 pt-2 border-t border-zinc-800/60">
              <span className="text-white font-extrabold text-sm">
                Rp {Number(product.price).toLocaleString('id-ID')}
              </span>
              <div className="w-7 h-7 bg-emerald-500/10 group-hover:bg-emerald-500 text-emerald-400 group-hover:text-zinc-950 border border-emerald-500/30 rounded-xl flex items-center justify-center transition-all">
                <Plus size={14} strokeWidth={3} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
