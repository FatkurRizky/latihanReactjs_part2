import { Search, SlidersHorizontal } from 'lucide-react';

export default function AdminFilter({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  searchTerm, 
  setSearchTerm 
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 justify-between items-center bg-[#121215]/80 border border-zinc-800/90 p-3.5 rounded-2xl backdrop-blur-md shadow-sm">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 no-scrollbar">
        <div className="flex items-center gap-1.5 text-zinc-500 mr-1 text-xs font-semibold">
          <SlidersHorizontal size={14} />
          <span className="hidden sm:inline">Kategori:</span>
        </div>

        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedCategory === 'ALL'
              ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[1.02]'
              : 'bg-[#09090b] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
          }`}
        >
          Semua Sembako
        </button>

        {categories.map(cat => (
          <button
            key={cat.id || cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat.name
                ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[1.02]'
                : 'bg-[#09090b] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Modern Search Field */}
      <div className="relative w-full lg:w-72">
        <Search className="absolute left-3.5 top-3 text-zinc-500" size={15} />
        <input
          type="text"
          placeholder="Cari beras, minyak, gula..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300 text-xs font-bold"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
