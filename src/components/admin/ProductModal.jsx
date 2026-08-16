import { Package, Upload, X } from 'lucide-react';

export default function ProductModal({
  showForm,
  closeForm,
  handleSave,
  formData,
  setFormData,
  categories,
  fileInputRef,
  handleImageChange,
  imagePreview,
  isSubmitting
}) {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4 transition-all duration-300">
      <div className="bg-[#121215] border border-zinc-800 p-6 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Glow Ambient background */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header Title */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-zinc-800 border border-zinc-700 text-white rounded-xl flex items-center justify-center">
              <Package size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {formData.id ? 'Edit / Restock Barang' : 'Tambah Barang Baru'}
              </h2>
              <p className="text-[11px] text-zinc-400">Atur harga modal, stok, & foto produk sembako</p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={closeForm}
            className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
          >
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-zinc-400 mb-1 font-medium">Foto Produk</label>
            <div className="flex items-center gap-3">
              <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="w-full bg-[#09090b] border border-zinc-800 rounded-xl p-2 text-zinc-400 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-zinc-800 file:text-white file:font-semibold cursor-pointer hover:border-zinc-700 transition"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-xl border border-zinc-700 flex-shrink-0" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1 font-medium">Kategori Sembako</label>
            <select 
              required 
              value={formData.category_id}
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
              className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-zinc-600 transition"
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-zinc-400 mb-1 font-medium">Nama Barang</label>
            <input 
              type="text" required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Contoh: Beras Semangka 5kg"
              className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-zinc-600 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Harga Jual (Rp)</label>
              <input 
                type="number" required 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="79000"
                className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-zinc-600 font-semibold transition"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Harga Modal (Rp)</label>
              <input 
                type="number" 
                value={formData.cost_price}
                onChange={(e) => setFormData({...formData, cost_price: e.target.value})}
                placeholder="72000"
                className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-300 focus:outline-none focus:border-zinc-600 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Jumlah Stok</label>
              <input 
                type="number" required 
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                placeholder="10"
                className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-zinc-600 font-semibold transition"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1 font-medium">Satuan</label>
              <select 
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                className="w-full bg-[#09090b] border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-zinc-600 transition"
              >
                <option value="pcs">pcs</option>
                <option value="kg">kg</option>
                <option value="liter">liter</option>
                <option value="karung">karung</option>
                <option value="bungkus">bungkus</option>
                <option value="botol">botol</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4 border-t border-zinc-800/80">
            <button 
              type="button" 
              onClick={closeForm}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-medium transition text-xs"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-white hover:bg-zinc-200 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed text-zinc-950 font-bold rounded-xl transition text-xs shadow-md"
            >
              {isSubmitting ? 'Memproses...' : 'Simpan Barang'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
