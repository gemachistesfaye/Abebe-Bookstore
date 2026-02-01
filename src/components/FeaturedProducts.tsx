import { Star, Search, BookOpen, Coffee, Scroll, Users, Languages, Map, Heart, Eye, Filter } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  language: 'Amharic' | 'Afaan Oromo' | 'English' | 'Bilingual';
  price: number;
  image: string;
  rating: number;
  description: string;
  isClassic?: boolean;
}

interface FeaturedProductsProps {
  onProductClick: (product: Book) => void;
}
const books: Book[] = [
  // HISTORY
  {
    id: 1,
    title: "Ethiopia: A History",
    author: "Harold G. Marcus",
    category: "History",
    language: "English",
    price: 550,
    image: "/images/Ethiopia_A_History_by_Harold_G.Marcus.jpg",
    rating: 5,
    description: "The definitive guide to the Ethiopian state, from the ancient Axumite Empire to the modern era."
  },
  {
    id: 2,
    title: "A History of Modern Ethiopia",
    author: "Bahru Zewde",
    category: "History",
    language: "English",
    price: 580,
    image: "/images/A_History_of_Modern_Ethiopia_by_Bahru_Zewde.jpg",
    rating: 5,
    description: "The essential textbook for understanding the formation of the modern nation and its political evolution (1855–1991)."
  },
  {
    id: 3,
    title: "Oromo Democracy",
    author: "Asmarom Legesse",
    category: "History",
    language: "English",
    price: 700,
    image: "/images/Oromo_Democracy_by_Asmarom_Legesse.jpeg",
    rating: 5,
    isClassic: true,
    description: "A world-renowned study on the Gadaa System, showcasing the brilliance of Oromo democratic institutions."
  },
  // LITERATURE
  {
    id: 4,
    title: "Fikir Eske Mekabir",
    author: "Haddis Alemayehu",
    category: "Literature",
    language: "Amharic",
    price: 750,
    image: "/images/Fikir_Eske_Mekabir_by_Haddis_Alemayehu.jpg",
    rating: 5,
    isClassic: true,
    description: "The masterpiece of Amharic literature—an epic story of love, social class and the struggle against feudalism."
  },
  {
    id: 5,
    title: "Godannisa (The Scar)",
    author: "Kuusaa Gadaa",
    category: "Literature",
    language: "Afaan Oromo",
    price: 620,
    image: "/images/Godannisa_by_Kuusaa_Gadaa.jpeg",
    rating: 5,
    isClassic: true,
    description: "The first published novel in Afaan Oromo. A historic milestone representing the soul and identity of the Oromo people."
  },
  {
    id: 6,
    title: "Adefris (አዴፍርስ)",
    author: "Dagnachew Worku",
    category: "Literature",
    language: "Amharic",
    price: 680,
    image: "/images/Adefris_(አዴፍርስ)_by_Dagnachew_Worku.jpeg",
    rating: 4,
    description: "A complex modernist novel that brilliantly captures the tension between tradition and the 1960s revolution."
  },
  // BUSINESS
  {
    id: 7,
    title: "Made in Ethiopia",
    author: "Arkebe Oqubay",
    category: "Business",
    language: "English",
    price: 600,
    image: "/images/Made_in_Ethiopia_by_Arkebe_Oqubay.jpeg",
    rating: 5,
    description: "A critical analysis of industrial policy and the roadmap for transforming Ethiopia into a manufacturing hub."
  },
  {
    id: 8,
    title: "Entrepreneurial Ecosystem",
    author: "Mulu Gebreeyesus",
    category: "Business",
    language: "English",
    price: 420,
    image: "/images/Entrepreneurial_Ecosystem_by_Mulu_Gebreeyesus.jpg",
    rating: 4,
    description: "Explores digital transformation, tech startups and the evolving business landscape in Addis Ababa."
  },
  {
    id: 9,
    title: "My Life, My Vision",
    author: "Bulcha Demeksa",
    category: "Business",
    language: "English",
    price: 480,
    image:"/images/My_Life_My_Vision_by_Bulcha_Demeksa.jpg",
    rating: 5,
    description: "Insights from a top economist on banking, development and Oromo economic participation."
  },
  // LANGUAGE
  {
    id: 10,
    title: "Selam! Learn Amharic",
    author: "Dawit Lambebo Gulta",
    category: "Language",
    language: "Amharic",
    price: 350,
    image: "/images/Selam!_Learn_Amharic_by_Dawit_Lambebo_Gulta.jpg", 
    rating: 5,
    description: "A practical beginner-friendly guide to learning Amharic vocabulary, grammar and conversational skills."
  },
  {
    id: 11,
    title: "Afan Oromo: A Guide to Speaking the Language of Oromo People",
    author: "Abebe Bulto & Andrew Tadross",
    category: "Language",
    language: "Afaan Oromo",
    price: 280,
    image: "/images/Afan-Oromo_A_Guide_to_Speaking_the_Language_of_Oromo_People.jpg", 
    rating: 5,
    description: "A comprehensive guide to mastering Afaan Oromo phrases, vocabulary and culture."
  },
  {
    id: 12,
    title: "Amharic: My First Words",
    author: "Melkam Media",
    category: "Language",
    language: "Amharic",
    price: 250,
    image: "/images/Amharic_My_First_Words_by_Melkam_Media.jpeg", 
    rating: 5,
    description: "A fun and colorful picture book for beginners to start learning essential Amharic words."
  },
  // CHILDREN
  {
    id: 13,
    title: "The Little Girl and The Three Lions",
    author: "Kiazpora",
    category: "Children",
    language: "Afaan Oromo",
    price: 280,
    image: "/images/The_Little_Girl_and_The_Three_Lions_by_Kiazpora.jpg",
    rating: 5,
    description: "An engaging Oromo folktale adaptation about a little girl’s adventure with three lions — perfect for young readers learning language and culture."
  },
  {
    id: 14,
    title: "The Runaway Injera: An Ethiopian Fairy Tale",
    author: "Various / Traditional",
    category: "Children",
    language: "Bilingual",
    price: 350,
    image: "/images/The_Runaway_Injera_An_Ethiopian_Fairy_Tale.jpg",
    rating: 5,
    description: "A lively retelling of a beloved Ethiopian folk tale inspired by the classic runaway food story, filled with cultural charm and playful illustrations."
  },
  {
    id: 15,
    title: "ፀሃይ እና ንፋስ እንዲሁም ሌሎች ተረቶች",
    author: "Mosisa Wakshum",
    category: "Children",
    language: "Amharic",
    price: 300,
    image: "/images/ፀሃይ_እና_ንፋስ_እንዲሁም_ሌሎ_ተረቶች.webp",
    rating: 5,
    description: "An Amharic collection of short folktales for children, including the story of the Sun and Wind and other traditional moral tales."
  },
  // CULTURE
  {
    id: 16,
    title: "The Flavors of Ethiopia",
    author: "Chef Yohanis",
    category: "Culture",
    language: "English",
    price: 600,
    image: "/images/The_Flavors_of_Ethiopia.jpg",
    rating: 5,
    description: "An award-winning cookbook and cultural guide celebrating the art of Gursha and traditional recipes."
  },
  {
    id: 17,
    title: "አማርኛ የቡና ታሪክ እና ባህላዊ ሥነ ሥርዓት",
    author: "ማህበረ ‑ ባህላዊ ጥናት ተቋማት",
    category: "Culture",
    language: "Amharic",
    price: 420,
    image: "/images/አማርኛ_የቡና_ታሪክ_እና_ባህላዊ_ሥነ_ሥርዓት_መፅሃፍ_ካቫር.jpg",
    rating: 5,
    description: "A detailed guide in Amharic exploring the rich history and cultural rituals of Ethiopian coffee traditions and ceremonies."
  },
  {
    id: 18,
    title: "Oromia: An Introduction",
    author: "Gadaa Melbaa",
    category: "Culture",
    language: "English",
    price: 550,
    image: "/images/Oromia_An_Introduction.jpg",
    rating: 5,
    description: "A foundational look at Oromo social values, Siinqee and the core philosophies of Gadaa culture."
  }
];


export default function FeaturedProducts({ onProductClick }: FeaturedProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLang, setSelectedLang] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const categories = ["All", "History", "Literature", "Business", "Language", "Children", "Culture"];
  const languages = ["All", "Amharic", "Afaan Oromo", "English", "Bilingual"];

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
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
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100 flex flex-col group overflow-hidden h-full"
            >
             
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onProductClick(book); }}
                    className="p-2 bg-white rounded-full text-stone-900 hover:bg-amber-800 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
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
                  <button 
                    onClick={() => onProductClick(book)}
                    className="text-amber-800 text-[11px] font-bold flex items-center gap-1"
                  >
                    View <BookOpen className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
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