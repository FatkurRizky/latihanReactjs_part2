import { Trophy, TrendingUp, ShoppingBag } from 'lucide-react';

export default function TopProductsChart({ transactions }) {
  // Hitung jumlah barang terjual & omset per produk dari seluruh riwayat
  const productStats = {};

  transactions.forEach(trx => {
    (trx.details || []).forEach(item => {
      const productName = item.product?.name || 'Produk Lainnya';
      const qty = Number(item.quantity || 0);
      const subtotal = Number(item.subtotal || item.price * qty || 0);

      if (!productStats[productName]) {
        productStats[productName] = { name: productName, totalQty: 0, totalRevenue: 0 };
      }
      productStats[productName].totalQty += qty;
      productStats[productName].totalRevenue += subtotal;
    });
  });

  // Urutkan produk dari yang paling laku (terbanyak dibeli)
  const sortedProducts = Object.values(productStats).sort((a, b) => b.totalQty - a.totalQty);
  const maxQty = sortedProducts.length > 0 ? sortedProducts[0].totalQty : 1;

  return (
    <div className="bg-[#121215] border border-zinc-800 p-5 rounded-xl space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center border border-amber-500/20">
            <Trophy size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Grafik Produk Terlaris (Top Selling)</h3>
            <p className="text-[11px] text-zinc-400">Peringkat barang sembako paling banyak dibeli tetangga</p>
          </div>
        </div>
        <span className="text-[11px] text-zinc-500 font-medium">{sortedProducts.length} Jenis Produk Terjual</span>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-6 text-zinc-500 text-xs flex flex-col items-center gap-2">
          <ShoppingBag size={24} className="text-zinc-600" />
          <span>Belum ada data barang terjual untuk ditampilkan di grafik.</span>
        </div>
      ) : (
        <div className="space-y-3 pt-1">
          {sortedProducts.slice(0, 5).map((item, index) => {
            const percentage = Math.round((item.totalQty / maxQty) * 100);
            
            return (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      index === 0 ? 'bg-amber-400 text-zinc-950 shadow-[0_0_10px_rgba(251,191,36,0.3)]' : 
                      index === 1 ? 'bg-zinc-300 text-zinc-950' : 
                      index === 2 ? 'bg-amber-700 text-white' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      #{index + 1}
                    </span>
                    <span className="font-semibold text-zinc-200">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-400">{item.totalQty} terjual</span>
                    <span className="text-zinc-500 text-[10px] ml-2">
                      (Rp {item.totalRevenue.toLocaleString('id-ID')})
                    </span>
                  </div>
                </div>

                {/* Progress Bar Visual Grafik */}
                <div className="w-full bg-[#09090b] h-2.5 rounded-full overflow-hidden border border-zinc-800/80 p-0.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      index === 0 ? 'bg-gradient-to-r from-amber-500 to-emerald-400' :
                      index === 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-400' :
                      'bg-gradient-to-r from-zinc-600 to-zinc-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
