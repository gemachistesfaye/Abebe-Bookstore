import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ArrowLeft, Heart, BookOpen, ShieldCheck, Info, Phone, ShoppingCart, Check } from 'lucide-react';
import { books } from '../data/books';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch, isInWishlist, isInCart } = useCart();

  const book = books.find(b => b.id === Number(id));

  if (!book) {
    return (
      <div className="min-h-screen bg-[#fdfaf6] dark:bg-stone-900 flex flex-col items-center justify-center p-4 transition-colors">
        <p className="text-stone-500 dark:text-stone-400 mb-4">Book details not found.</p>
        <Link
          to="/"
          className="flex items-center gap-2 text-amber-800 dark:text-amber-500 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#fdfaf6] dark:bg-stone-900 py-6 md:py-10 px-4 transition-colors"
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-500 mb-6 font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </button>

        <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700 overflow-hidden transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12">

            <div className="md:col-span-5 bg-stone-50 dark:bg-stone-700 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-100 dark:border-stone-600 transition-colors">
              <div className="relative w-full max-w-[280px]">
                <img
                  src={book.image.startsWith('/') ? book.image : `/${book.image}`}
                  alt={book.title}
                  className="w-full h-auto rounded shadow-xl object-cover aspect-[3/4]"
                />
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', bookId: book.id })}
                  className="absolute -bottom-3 -right-3 bg-white dark:bg-stone-800 p-2 rounded-full shadow-md border border-stone-50 dark:border-stone-600 transition-transform active:scale-90 hover:scale-110"
                >
                  <Heart className={`w-5 h-5 transition-colors ${isInWishlist(book.id) ? 'text-red-500 fill-red-500' : 'text-stone-300'}`} />
                </button>
              </div>
            </div>

            <div className="md:col-span-7 p-6 md:p-8 flex flex-col">
              <div className="mb-3">
                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded uppercase tracking-widest border border-amber-100 dark:border-amber-800/30">
                  {book.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 dark:text-white mb-2 leading-tight">
                {book.title}
              </h1>
              <p className="text-lg text-stone-500 dark:text-stone-400 font-medium mb-4">by {book.author}</p>

              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stone-50 dark:border-stone-700">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < book.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200 dark:text-stone-600'}`}
                    />
                  ))}
                </div>
                <span className="text-stone-400 dark:text-stone-500 text-xs font-medium">Reader Rating</span>
              </div>

              <div className="mb-6">
                <h3 className="text-[10px] font-bold text-stone-900 dark:text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                  <BookOpen className="w-3 h-3 text-amber-800 dark:text-amber-500" />
                  About this Work
                </h3>
                <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed italic">
                  "{book.description}"
                </p>
              </div>

              <div className="mt-auto">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase font-bold tracking-tighter mb-0.5">Value</p>
                    <span className="text-3xl font-bold text-stone-900 dark:text-white">
                      ETB {book.price}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${book.inStock !== false ? 'text-green-600' : 'text-red-500'}`}>
                      {book.inStock !== false ? (
                        <>
                          <ShieldCheck className="w-3 h-3" />
                          In Library
                        </>
                      ) : (
                        'Out of Stock'
                      )}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {book.inStock !== false && (
                    <button
                      onClick={() => dispatch({ type: 'ADD_TO_CART', book })}
                      className={`w-full font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm text-center shadow-lg ${
                        isInCart(book.id)
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-amber-700 hover:bg-amber-800 text-white shadow-amber-700/10'
                      }`}
                    >
                      {isInCart(book.id) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  )}
                  <a
                    href="tel:+251976601074"
                    className="w-full bg-stone-900 dark:bg-stone-700 hover:bg-stone-800 dark:hover:bg-stone-600 text-white font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm text-center shadow-lg shadow-stone-900/10"
                  >
                    <Phone className="w-4 h-4" />
                    Call us for Order
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2 text-stone-400 dark:text-stone-500 text-[10px] py-3">
                  <Info className="w-3 h-3" />
                  Direct order line: +251 97 660 1074
                </div>

                <div className="mt-4 pt-4 border-t border-stone-50 dark:border-stone-700 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] text-stone-400 dark:text-stone-500 uppercase font-bold">Publisher</span>
                    <span className="text-xs text-stone-900 dark:text-white font-bold">Addis Books Heritage</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-stone-400 dark:text-stone-500 uppercase font-bold">Availability</span>
                    <span className="text-xs text-stone-900 dark:text-white font-bold">
                      {book.inStock !== false ? 'Physical Copy Only' : 'Currently Unavailable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
