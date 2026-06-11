import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, Phone, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { state, dispatch, cartTotal, cartCount } = useCart();

  return (
    <div className="min-h-screen bg-[#fdfaf6] dark:bg-stone-900 py-6 md:py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-500 mb-6 font-medium transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 dark:text-white mb-6">
          Checkout Summary
        </h1>

        {state.items.length === 0 ? (
          <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700 p-12 text-center">
            <p className="text-stone-500 dark:text-stone-400 mb-4">Your cart is empty</p>
            <Link
              to="/"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-2.5 px-6 rounded-lg transition-colors text-sm"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700 divide-y divide-stone-100 dark:divide-stone-700">
              {state.items.map(item => (
                <div key={item.book.id} className="flex gap-4 p-4">
                  <img
                    src={item.book.image}
                    alt={item.book.title}
                    className="w-20 h-28 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-stone-900 dark:text-white line-clamp-1">
                      {item.book.title}
                    </h3>
                    <p className="text-xs text-stone-400 dark:text-stone-500">{item.book.author}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      ETB {item.book.price} each
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', bookId: item.book.id, quantity: item.quantity - 1 })}
                        className="w-7 h-7 flex items-center justify-center rounded bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium text-stone-900 dark:text-white w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', bookId: item.book.id, quantity: item.quantity + 1 })}
                        className="w-7 h-7 flex items-center justify-center rounded bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
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
                  <div className="text-right shrink-0">
                    <span className="font-bold text-stone-900 dark:text-white">
                      ETB {(item.book.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-100 dark:border-stone-700 p-6">
              <div className="flex justify-between mb-2">
                <span className="text-stone-500 dark:text-stone-400">Items</span>
                <span className="text-stone-900 dark:text-white font-medium">{cartCount}</span>
              </div>
              <div className="flex justify-between mb-4 pb-4 border-b border-stone-100 dark:border-stone-700">
                <span className="text-stone-500 dark:text-stone-400">Subtotal</span>
                <span className="text-xl font-bold text-stone-900 dark:text-white">ETB {cartTotal.toLocaleString()}</span>
              </div>

              <a
                href="tel:+251976601074"
                className="w-full bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-100 text-white dark:text-stone-900 font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Call to Place Order
              </a>
              <div className="flex items-center justify-center gap-2 text-stone-400 dark:text-stone-500 text-[10px] py-3">
                <Info className="w-3 h-3" />
                Direct order line: +251 97 660 1074
              </div>

              <button
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                className="w-full text-center text-sm text-red-500 hover:text-red-600 font-medium mt-2"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
