import { Star, ShoppingCart, Search } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

interface FeaturedProductsProps {
  onProductClick: (product: Book) => void;
}

const books: Book[] = [
  {
    id: 1,
    title: "The Ancient Wisdom of Ethiopia",
    author: "Dr. Tadesse Amare",
    category: "History",
    price: 29.99,
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    description: "A comprehensive exploration of Ethiopian history and culture spanning millennia."
  },
  {
    id: 2,
    title: "Modern Ethiopian Literature",
    author: "Almaz Desta",
    category: "Literature",
    price: 24.99,
    image: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    description: "Contemporary voices in Ethiopian literature, showcasing diverse perspectives."
  },
  {
    id: 3,
    title: "Business in the Horn of Africa",
    author: "Girma Wolde",
    category: "Business",
    price: 34.99,
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4,
    description: "Strategic insights for entrepreneurs and business leaders in East Africa."
  },
  {
    id: 4,
    title: "Amharic Language Mastery",
    author: "Prof. Kebede",
    category: "Language",
    price: 19.99,
    image: "https://images.pexels.com/photos/1559827/pexels-photo-1559827.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    description: "Complete guide to learning and mastering Amharic language and writing."
  },
  {
    id: 5,
    title: "Children's Stories from Ethiopia",
    author: "Selam Mekonnen",
    category: "Children",
    price: 14.99,
    image: "https://images.pexels.com/photos/3714897/pexels-photo-3714897.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    description: "Delightful tales that educate and entertain young readers."
  },
  {
    id: 6,
    title: "Ethiopian Coffee Culture",
    author: "Yohannes Assefa",
    category: "Culture",
    price: 22.99,
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    description: "Discover the rich traditions and heritage of Ethiopian coffee ceremonies."
  }
];

export default function FeaturedProducts({ onProductClick }: FeaturedProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { addItem } = useCart();

  const categories = ["All", ...new Set(books.map(b => b.category))];

  let filteredBooks = selectedCategory === "All"
    ? books
    : books.filter(b => b.category === selectedCategory);

  if (searchQuery) {
    filteredBooks = filteredBooks.filter(b =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleAddToCart = (book: Book) => {
    addItem({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.image,
    });
  };

  return (
    <section id="featured-products" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
          Our Collection
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Handpicked books for every reader and interest
        </p>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-amber-700 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div
                className="h-64 overflow-hidden bg-gray-200 cursor-pointer"
                onClick={() => onProductClick(book)}
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                    {book.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(book.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <h3
                  className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-amber-700"
                  onClick={() => onProductClick(book)}
                >
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {book.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-700">
                    ${book.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="bg-amber-700 hover:bg-amber-800 text-white p-3 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No books found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
