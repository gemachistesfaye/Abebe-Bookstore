import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { state, dispatch, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {state.isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-stone-900 shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-700">
              <h2 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Cart ({state.items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
              <button
                onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}
                className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-stone-200 dark:text-stone-700 mx-auto mb-3" />
                  <p className="text-stone-500 dark:text-stone-400">Your cart is empty</p>
                  <Link
                    to="/"
                    onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}
                    className="mt-4 inline-block text-amber-700 dark:text-amber-500 font-medium hover:underline text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                state.items.map(item => (
                  <div
                    key={item.book.id}
                    className="flex gap-3 bg-stone-50 dark:bg-stone-800 rounded-lg p-3"
                  >
                    <img
                      src={item.book.image}
                      alt={item.book.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-stone-900 dark:text-white line-clamp-1">
                        {item.book.title}
                      </h3>
                      <p className="text-xs text-stone-400 dark:text-stone-500">{item.book.author}</p>
                      <p className="text-sm font-bold text-stone-900 dark:text-white mt-1">
                        ETB {item.book.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', bookId: item.book.id, quantity: item.quantity - 1 })}
                          className="w-6 h-6 flex items-center justify-center rounded bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium text-stone-900 dark:text-white w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QUANTITY', bookId: item.book.id, quantity: item.quantity + 1 })}
                          className="w-6 h-6 flex items-center justify-center rounded bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => dispatch({ type: 'REMOVE_FROM_CART', bookId: item.book.id })}
                          className="ml-auto p-1 text-stone-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {state.items.length > 0 && (
              <div className="border-t border-stone-200 dark:border-stone-700 p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500 dark:text-stone-400">Subtotal</span>
                  <span className="font-bold text-stone-900 dark:text-white">ETB {cartTotal.toLocaleString()}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}
                  className="block w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 rounded-lg text-center transition-colors"
                >
                  Checkout
                </Link>
                <Link
                  to="/"
                  onClick={() => dispatch({ type: 'CLOSE_DRAWER' })}
                  className="block text-center text-sm text-amber-700 dark:text-amber-500 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
