import { X, Minus, Plus, ShoppingBag, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types/book';

export default function CartDrawer() {
  const { state, dispatch, cartTotal, cartCount } = useCart();
  const { items: cart, isDrawerOpen } = state;

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={() => dispatch({ type: 'TOGGLE_DRAWER' })}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-stone-900 shadow-xl"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-700">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Cart ({cartCount})
            </h2>
            <button onClick={() => dispatch({ type: 'TOGGLE_DRAWER' })} className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <ShoppingBag className="w-16 h-16 text-stone-200 dark:text-stone-700 mx-auto mb-4" />
                  <p className="text-stone-500 dark:text-stone-400 mb-4">Your cart is empty</p>
                  <Link
                    to="/"
                    onClick={() => dispatch({ type: 'TOGGLE_DRAWER' })}
                    className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors text-sm font-medium"
                  >
                    Browse Books
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item: CartItem) => (
                    <motion.div
                      key={item.book.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                      className="flex gap-4 bg-stone-50 dark:bg-stone-800 p-3 rounded-xl"
                    >
                      <img src={item.book.image} alt={item.book.title} className="w-16 h-20 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-stone-900 dark:text-white text-sm line-clamp-1">{item.book.title}</h3>
                        <p className="text-xs text-stone-400 dark:text-stone-500">{item.book.author}</p>
                        <p className="text-amber-700 dark:text-amber-500 font-bold text-sm mt-1">ETB {item.book.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', bookId: item.book.id, quantity: Math.max(1, item.quantity - 1) })}
                            className="p-1 bg-white dark:bg-stone-700 rounded border border-stone-200 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600 transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium text-stone-900 dark:text-white w-6 text-center">{item.quantity}</span>
                          <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', bookId: item.book.id, quantity: item.quantity + 1 })}
                            className="p-1 bg-white dark:bg-stone-700 rounded border border-stone-200 dark:border-stone-600 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-600 transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                          <a href="tel:+251976601074"
                            className="ml-auto flex items-center gap-1 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 rounded text-xs font-medium hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors">
                            <Phone className="w-3 h-3" /> Call to Order
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {cart.length > 0 && (
            <div className="p-4 border-t border-stone-200 dark:border-stone-700">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-stone-600 dark:text-stone-400">Total</span>
                <span className="text-xl font-bold text-stone-900 dark:text-white">ETB {cartTotal}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => dispatch({ type: 'TOGGLE_DRAWER' })}
                className="block w-full bg-amber-700 hover:bg-amber-800 text-white text-center font-bold py-3.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-700/20"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
