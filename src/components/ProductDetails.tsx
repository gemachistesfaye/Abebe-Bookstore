import { useParams, Link } from 'react-router-dom';
import { BookOpen, Heart, ArrowLeft, ShoppingCart, Share2, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { books } from '../data/books';
import ScrollReveal from './ScrollReveal';

export default function ProductDetails() {
  const { id } = useParams();
  const { dispatch, isInWishlist } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [qty, setQty] = useState(1);
  const book = books.find(b => b.id === Number(id));

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfaf6] dark:bg-stone-900 transition-colors">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-stone-200 dark:text-stone-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">Book Not Found</h2>
          <p className="text-stone-500 dark:text-stone-400 mb-6">Sorry, we couldn't find the book you're looking for.</p>
          <Link to="/" className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const relatedBooks = books
    .filter(b => b.id !== book.id && (b.category === book.category || b.author === book.author))
    .slice(0, 6);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: book.title, text: `Check out "${book.title}" at Abebe Bookstore`, url }); }
      catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD_TO_CART', book });
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] dark:bg-stone-900 transition-colors">
      <div className="bg-[#f3ede4] dark:bg-stone-800 py-6 px-4 transition-colors">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
            <Link to="/" className="hover:text-amber-700 dark:hover:text-amber-500">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/" onClick={(e) => { e.preventDefault(); document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-amber-700 dark:hover:text-amber-500">
              Books
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-stone-900 dark:text-white font-medium">{book.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-500 hover:underline mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to all books
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Cover */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full max-w-md mx-auto group">
              <div className="absolute -inset-4 bg-amber-200/20 dark:bg-amber-900/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <img
                src={book.image}
                alt={book.title}
                className="relative w-full aspect-[3/4] object-cover rounded-xl shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-500 text-xs font-bold px-3 py-1 rounded-full">
                {book.category}
              </span>
              {book.isClassic && (
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                  Classic
                </span>
              )}
              {book.inStock === false && (
                <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-white mb-2">{book.title}</h1>
            <p className="text-lg text-stone-500 dark:text-stone-400 mb-4">by <span className="font-medium text-stone-700 dark:text-stone-300">{book.author}</span></p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < book.rating ? 'text-amber-400' : 'text-stone-200 dark:text-stone-700'}`}>★</span>
                ))}
              </div>
              <span className="text-sm text-stone-400 dark:text-stone-500">({book.rating}/5)</span>
            </div>

            <p className="text-stone-600 dark:text-stone-300 leading-relaxed mb-8">{book.description}</p>

            <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 mb-8 transition-colors">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-stone-900 dark:text-white">ETB {book.price}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-stone-500 dark:text-stone-400">Quantity</span>
                <div className="flex items-center border border-stone-200 dark:border-stone-600 rounded-lg">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-l-lg transition-colors">-</button>
                  <span className="px-4 py-2 text-stone-900 dark:text-white font-medium border-x border-stone-200 dark:border-stone-600 min-w-[48px] text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-r-lg transition-colors">+</button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAdd}
                  disabled={book.inStock === false}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-700/20"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', bookId: book.id })}
                  className={`p-3.5 rounded-full transition-all hover:scale-105 ${
                    isInWishlist(book.id)
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 ring-2 ring-red-200 dark:ring-red-800'
                      : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(book.id) ? 'fill-current' : ''}`} />
                </button>
                <button onClick={handleShare} className="p-3.5 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 rounded-full hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors hover:scale-105">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2.5 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              {book.inStock === false ? 'Currently unavailable' : 'Usually ships within 2-3 business days'}
            </div>
          </motion.div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <ScrollReveal>
            <div className="mt-20">
              <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-white mb-6">You Might Also Like</h2>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
                {relatedBooks.map((b) => (
                  <Link key={b.id} to={`/book/${b.id}`} className="min-w-[200px] max-w-[200px] snap-start flex-shrink-0 group">
                    <div className="relative mb-2 overflow-hidden rounded-lg">
                      <img src={b.image} alt={b.title} className="w-full aspect-[3/2] object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute top-2 right-2 bg-amber-800/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">{b.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-white line-clamp-1 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">{b.title}</h3>
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 mb-1">{b.author}</p>
                    <p className="text-xs font-bold text-amber-800 dark:text-amber-500">ETB {b.price}</p>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium animate-fade-in-up">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
}
