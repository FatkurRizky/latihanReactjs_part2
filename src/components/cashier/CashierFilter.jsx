import { Search, Sparkles } from 'lucide-react';

export default function CashierFilter({
  categories,
  categoriesList,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm
}) {
  const rawList = categoriesList || categories || [];
  const catList = Array.isArray(rawList) ? rawList.filter(c => c !== 'ALL') : [];

  return (
    <div className="flex flex-col lg:flex-row gap-3 justify-between items-center bg-[#121215]/80 border border-zinc-800/90 p-3 rounded-2xl backdrop-blur-md shadow-sm">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 no-scrollbar">
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

        {catList.map(cat => {
          const catName = typeof cat === 'object' ? (cat.name || cat) : cat;
          const catKey = typeof cat === 'object' ? (cat.id || cat.name) : cat;

          return (
            <button
              key={catKey}
              onClick={() => setSelectedCategory(catName)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === catName
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-300 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[1.02]'
                  : 'bg-[#09090b] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              {catName}
            </button>
          );
        })}
      </div>

      {/* Search Field */}
      <div className="relative w-full lg:w-64">
        <Search className="absolute left-3.5 top-2.5 text-zinc-500" size={14} />
        <input
          type="text"
          placeholder="Cari produk kasir..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full bg-[#09090b] border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
