import { Search, BookOpen, Heart, Eye, Filter, Languages, ShoppingCart, ArrowUpDown, ToggleLeft, ToggleRight, PackageOpen } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { books } from '../data/books';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ["All", "History", "Literature", "Business", "Language", "Children", "Culture"];
const languages = ["All", "Amharic", "Afaan Oromo", "English", "Bilingual"];
type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc" | "title-asc";

export default function FeaturedProducts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort');

  const mapCategory = (cat: string | null): string => {
    if (!cat || cat === 'all') return 'All';
    const map: Record<string, string> = {
      amharic: 'Literature', oromo: 'Language', english: 'Literature',
      children: 'Children', history: 'History', business: 'Business',
    };
    return map[cat] || 'All';
  };

  const mapSort = (s: string | null): SortOption => {
    if (!s) return 'default';
    const map: Record<string, SortOption> = {
      newest: 'default', rating: 'rating-desc',
      'price-low': 'price-asc', 'price-high': 'price-desc',
    };
    return map[s] || 'default';
  };

  const [selectedCategory, setSelectedCategory] = useState<string>(mapCategory(categoryParam));
  const [selectedLang, setSelectedLang] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>(mapSort(sortParam));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [wishlistPop, setWishlistPop] = useState<number | null>(null);
  const { dispatch, isInWishlist } = useCart();

  useEffect(() => {
    const cat = mapCategory(searchParams.get('category'));
    const sort = mapSort(searchParams.get('sort'));
    if (cat !== 'All') setSelectedCategory(cat);
    if (sort !== 'default') setSortBy(sort);
    if (searchParams.get('category') || searchParams.get('sort')) {
      setTimeout(() => {
        document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [searchParams]);

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_WISHLIST', bookId: id });
    setWishlistPop(id);
    setTimeout(() => setWishlistPop(null), 300);
  };

  const addToCart = (e: React.MouseEvent, book: typeof books[0]) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', book });
  };

  const filteredBooks = useMemo(() => {
    let result = books.filter(book => {
      const categoryMatch = selectedCategory === "All" || book.category === selectedCategory;
      const langMatch = selectedLang === "All" || book.language === selectedLang;
      const searchMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const priceMatch = book.price >= priceRange[0] && book.price <= priceRange[1];
      const stockMatch = !inStockOnly || book.inStock !== false;
      return categoryMatch && langMatch && searchMatch && priceMatch && stockMatch;
    });

    switch (sortBy) {
      case "price-asc": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-desc": result = [...result].sort((a, b) => b.price - a.price); break;
      case "rating-desc": result = [...result].sort((a, b) => b.rating - a.rating); break;
      case "title-asc": result = [...result].sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return result;
  }, [selectedCategory, selectedLang, searchQuery, sortBy, priceRange, inStockOnly]);

  const activeFilters = [
    selectedCategory !== "All" && { label: selectedCategory, clear: () => setSelectedCategory("All") },
    selectedLang !== "All" && { label: selectedLang, clear: () => setSelectedLang("All") },
    inStockOnly && { label: "In Stock", clear: () => setInStockOnly(false) },
    priceRange[0] > 0 || priceRange[1] < 1000 ? { label: `ETB ${priceRange[0]}-${priceRange[1]}`, clear: () => setPriceRange([0, 1000]) } : null,
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <section id="featured-products" className="bg-[#fdfaf6] dark:bg-stone-900 min-h-screen transition-colors">

      <div className="relative h-[280px] w-full overflow-hidden bg-[#f3ede4] dark:bg-stone-800 mb-12 transition-colors">
        <div className="absolute inset-0 opacity-10">
           <div className="w-full h-full bg-[radial-gradient(#8b5e3c_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="flex gap-2 mb-4">
            <div className="w-8 h-1 bg-[#009b48] rounded-full"></div>
            <div className="w-8 h-1 bg-[#ffff00] rounded-full"></div>
            <div className="w-8 h-1 bg-[#da121a] rounded-full"></div>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 dark:text-white mb-3">
            Ethiopia's Living Library
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-sm md:text-base max-w-2xl italic">
            "A book is like a garden carried in the pocket." — Traditional Wisdom.
            Discover classics in Amharic, Afaan Oromo and English.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">

        {/* Filter bar */}
        <div className="bg-white dark:bg-stone-800 p-5 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 mb-6 -mt-16 relative z-10 transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search classics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-700 border-transparent focus:bg-white dark:focus:bg-stone-600 focus:ring-2 focus:ring-amber-800/20 rounded-lg outline-none transition-all text-sm text-stone-900 dark:text-white placeholder-stone-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-800 dark:text-amber-500" />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-700 rounded-lg outline-none text-sm text-stone-900 dark:text-white">
                {categories.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-amber-800 dark:text-amber-500" />
              <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}
                className="w-full p-2.5 bg-stone-50 dark:bg-stone-700 rounded-lg outline-none text-sm text-stone-900 dark:text-white">
                {languages.map(l => <option key={l} value={l}>{l === "All" ? "All Languages" : l}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-stone-100 dark:border-stone-700">
            <div className="space-y-2">
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" /> Sort By
              </label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full p-2 bg-stone-50 dark:bg-stone-700 rounded-lg outline-none text-sm text-stone-900 dark:text-white">
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="title-asc">Title: A to Z</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400">
                Price Range: ETB {priceRange[0]} – {priceRange[1]}
              </label>
              <div className="flex gap-2 items-center">
                <input type="range" min={0} max={1000} step={50} value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="flex-1 accent-amber-700" />
                <input type="range" min={0} max={1000} step={50} value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="flex-1 accent-amber-700" />
              </div>
            </div>
            <div className="flex items-end">
              <button onClick={() => setInStockOnly(!inStockOnly)}
                className="flex items-center gap-2 p-2 bg-stone-50 dark:bg-stone-700 rounded-lg text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600 transition-colors w-full">
                {inStockOnly ? <ToggleRight className="w-5 h-5 text-amber-700 dark:text-amber-500" /> : <ToggleLeft className="w-5 h-5 text-stone-400" />}
                In Stock Only
              </button>
            </div>
          </div>
        </div>

        {/* Active filter pills */}
        <AnimatePresence>
          {activeFilters.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-2 mb-6 overflow-hidden"
            >
              {activeFilters.map((filter, i) => (
                <motion.button
                  key={filter.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={filter.clear}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-500 rounded-full text-xs font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                >
                  {filter.label}
                  <span className="text-amber-600 dark:text-amber-400">×</span>
                </motion.button>
              ))}
              <button
                onClick={() => { setSelectedCategory("All"); setSelectedLang("All"); setInStockOnly(false); setPriceRange([0, 1000]); setSearchQuery(""); }}
                className="px-3 py-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 text-xs font-medium transition-colors"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-sm text-stone-400 dark:text-stone-500 mb-4">
          Showing {filteredBooks.length} of {books.length} books
        </p>

        {/* Book grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  to={`/book/${book.id}`}
                  className="bg-white dark:bg-stone-800 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-stone-100 dark:border-stone-700 flex flex-col group overflow-hidden h-full"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      <span className="bg-amber-800/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {book.category}
                      </span>
                      {book.isClassic && (
                        <span className="bg-[#009b48]/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Classic
                        </span>
                      )}
                      {book.rating === 5 && !book.isClassic && (
                        <span className="bg-amber-500/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </div>
                    {book.inStock === false && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-red-500/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Out of Stock
                        </span>
                      </div>
                    )}

                    {/* Bottom action buttons - slide up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <span className="p-2.5 bg-white/90 backdrop-blur rounded-full text-stone-900 hover:bg-amber-800 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </span>
                      <button
                        onClick={(e) => toggleWishlist(e, book.id)}
                        className={`p-2.5 rounded-full backdrop-blur transition-all ${
                          isInWishlist(book.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-stone-900 hover:bg-red-500 hover:text-white'
                        } ${wishlistPop === book.id ? 'animate-pop' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(book.id) ? 'fill-current' : ''}`} />
                      </button>
                      {book.inStock !== false && (
                        <button
                          onClick={(e) => addToCart(e, book)}
                          className="p-2.5 bg-white/90 backdrop-blur rounded-full text-stone-900 hover:bg-amber-800 hover:text-white transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-col flex-grow">
                    {/* Animated rating stars */}
                    <div className="flex gap-0.5 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${i < book.rating ? 'text-amber-400' : 'text-stone-200 dark:text-stone-600'}`}
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <h3 className="text-sm font-serif font-bold text-stone-900 dark:text-white line-clamp-1 mb-0.5 group-hover:text-amber-800 dark:group-hover:text-amber-500 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 font-medium mb-1.5 line-clamp-1">by {book.author}</p>
                    <p className="text-stone-600 dark:text-stone-400 text-[12px] line-clamp-2 leading-snug mb-3 h-8">
                      {book.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2.5 border-t border-stone-50 dark:border-stone-700">
                      <span className="text-sm font-bold text-stone-900 dark:text-white">ETB {book.price}</span>
                      <span className="text-amber-800 dark:text-amber-500 text-[11px] font-bold flex items-center gap-1">
                        View <BookOpen className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredBooks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <PackageOpen className="w-16 h-16 text-stone-200 dark:text-stone-700 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-stone-800 dark:text-stone-200 mb-2">No books found</h3>
            <p className="text-stone-400 dark:text-stone-500 text-sm mb-4">Try adjusting your filters or search query</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSelectedLang("All"); setInStockOnly(false); setPriceRange([0, 1000]); setSearchQuery(""); }}
              className="text-amber-700 dark:text-amber-500 font-medium text-sm hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
