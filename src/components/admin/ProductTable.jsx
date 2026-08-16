import { Edit3, Trash2, Package, Sparkles, AlertCircle } from 'lucide-react';

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="bg-[#121215]/90 border border-zinc-800/90 rounded-2xl overflow-hidden shadow-xl backdrop-blur-xl">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-[#09090b] text-zinc-400 uppercase font-extrabold tracking-wider border-b border-zinc-800/80 text-[10px]">
          <tr>
            <th className="p-4">Foto</th>
            <th className="p-4">Nama Sembako</th>
            <th className="p-4">Kategori</th>
            <th className="p-4">Harga Jual</th>
            <th className="p-4">Harga Modal</th>
            <th className="p-4 text-center">Status Stok</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60">
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-12 text-zinc-500">
                <div className="flex flex-col items-center gap-2">
                  <Package size={32} className="text-zinc-600 animate-bounce" />
                  <span className="text-sm font-semibold text-zinc-400">Belum ada barang di inventaris gudang</span>
                  <span className="text-xs text-zinc-600">Klik "+ Tambah Barang" di atas untuk memasukkan produk sembako baru</span>
                </div>
              </td>
            </tr>
          ) : (
            products.map(product => {
              const catName = typeof product.category === 'object' ? product.category?.name : (product.category || 'Umum');
              const isOut = product.stock <= 0;
              const isLow = product.stock > 0 && product.stock <= 3;

              return (
                <tr key={product.id} className="hover:bg-zinc-800/40 transition-colors group">
                  {/* Foto Thumbnail */}
                  <td className="p-4">
                    {product.image_url ? (
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-zinc-700/50 group-hover:ring-emerald-500/50 transition-all">
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-[#09090b] rounded-xl flex items-center justify-center border border-zinc-800 text-zinc-600 group-hover:border-zinc-700 transition">
                        📦
                      </div>
                    )}
                  </td>

                  {/* Nama Barang */}
                  <td className="p-4 font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    {product.name}
                  </td>

                  {/* Kategori Badge */}
                  <td className="p-4">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide">
                      {catName}
                    </span>
                  </td>

                  {/* Harga Jual */}
                  <td className="p-4 font-black text-white text-sm">
                    Rp {Number(product.price).toLocaleString('id-ID')}
                  </td>

                  {/* Harga Modal */}
                  <td className="p-4 font-semibold text-zinc-400">
                    Rp {Number(product.cost_price || product.price * 0.85).toLocaleString('id-ID')}
                  </td>

                  {/* Status Stok Pill Badges */}
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold border ${
                      isOut 
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]' 
                        : isLow 
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]' 
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isOut ? 'bg-rose-400' : isLow ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
                      }`} />
                      {isOut ? 'HABIS (0)' : isLow ? `TIPIS (${product.stock} ${product.unit || 'pcs'})` : `${product.stock} ${product.unit || 'pcs'}`}
                    </span>
                  </td>

                  {/* Tombol Aksi */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => onEdit(product)} 
                        className="p-2 bg-zinc-800/80 hover:bg-emerald-500/20 text-zinc-300 hover:text-emerald-400 border border-zinc-700/80 hover:border-emerald-500/40 rounded-xl transition-all shadow-sm hover:scale-105"
                        title="Edit / Restock Barang"
                      >
                        <Edit3 size={15} />
                      </button>

                      <button 
                        onClick={() => onDelete(product.id)} 
                        className="p-2 bg-zinc-800/80 hover:bg-rose-500/20 text-rose-400 border border-zinc-700/80 hover:border-rose-500/40 rounded-xl transition-all shadow-sm hover:scale-105"
                        title="Hapus Barang"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
