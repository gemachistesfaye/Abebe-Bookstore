import { Search, BookOpen, Heart, Eye, Filter, Languages } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { books } from '../data/books';

const categories = ["All", "History", "Literature", "Business", "Language", "Children", "Culture"];
const languages = ["All", "Amharic", "Afaan Oromo", "English", "Bilingual"];

export default function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLang, setSelectedLang] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const categoryMatch = selectedCategory === "All" || book.category === selectedCategory;
      const langMatch = selectedLang === "All" || book.language === selectedLang;
      const searchMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && langMatch && searchMatch;
    });
  }, [selectedCategory, selectedLang, searchQuery]);

  return (
    <section className="bg-[#fdfaf6] min-h-screen">

      <div className="relative h-[280px] w-full overflow-hidden bg-[#f3ede4] mb-12">
        <div className="absolute inset-0 opacity-10">
           <div className="w-full h-full bg-[radial-gradient(#8b5e3c_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="flex gap-2 mb-4">
            <div className="w-8 h-1 bg-[#009b48] rounded-full"></div>
            <div className="w-8 h-1 bg-[#ffff00] rounded-full"></div>
            <div className="w-8 h-1 bg-[#da121a] rounded-full"></div>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-3">
            Ethiopia's Living Library
          </h1>
          <p className="text-stone-600 text-sm md:text-base max-w-2xl italic">
            "A book is like a garden carried in the pocket." — Traditional Wisdom.
            Discover classics in Amharic, Afaan Oromo and English.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 mb-10 -mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search classics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border-transparent focus:bg-white focus:ring-2 focus:ring-amber-800/20 rounded-lg outline-none transition-all text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-800" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 bg-stone-50 rounded-lg outline-none border-transparent focus:ring-2 focus:ring-amber-800/20 text-sm"
              >
                {categories.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-amber-800" />
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="w-full p-2.5 bg-stone-50 rounded-lg outline-none border-transparent focus:ring-2 focus:ring-amber-800/20 text-sm"
              >
                {languages.map(l => <option key={l} value={l}>{l === "All" ? "All Languages" : l}</option>)}
              </select>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBooks.map(book => (
            <Link
              to={`/book/${book.id}`}
              key={book.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100 flex flex-col group overflow-hidden h-full"
            >

              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="p-2 bg-white rounded-full text-stone-900 hover:bg-amber-800 hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </span>
                  <button
                    onClick={(e) => toggleWishlist(e, book.id)}
                    className={`p-2 rounded-full transition-colors ${wishlist.includes(book.id) ? 'bg-red-500 text-white' : 'bg-white text-stone-900'}`}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(book.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="bg-amber-800/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                    {book.category}
                  </span>
                  {book.isClassic && (
                    <span className="bg-[#009b48]/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      Classic
                    </span>
                  )}
                </div>
              </div>


              <div className="p-3.5 flex flex-col flex-grow">
                <h3 className="text-sm font-serif font-bold text-stone-900 line-clamp-1 mb-0.5 group-hover:text-amber-800 transition-colors">
                  {book.title}
                </h3>
                <p className="text-[10px] text-stone-400 font-medium mb-1.5 line-clamp-1">by {book.author}</p>

                <p className="text-stone-600 text-[12px] line-clamp-2 leading-snug mb-3 h-8">
                  {book.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-2.5 border-t border-stone-50">
                  <span className="text-sm font-bold text-stone-900">ETB {book.price}</span>
                  <span className="text-amber-800 text-[11px] font-bold flex items-center gap-1">
                    View <BookOpen className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-8 h-8 text-stone-200 mx-auto mb-3" />
            <h3 className="text-md font-serif font-bold text-stone-800">No books found</h3>
          </div>
        )}
      </div>
    </section>
  );
}
