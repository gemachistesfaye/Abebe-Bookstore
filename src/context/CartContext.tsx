import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Book, CartItem } from '../types/book';

interface CartState {
  items: CartItem[];
  wishlist: number[];
  isDrawerOpen: boolean;
}

type CartAction =
  | { type: 'ADD_TO_CART'; book: Book }
  | { type: 'REMOVE_FROM_CART'; bookId: number }
  | { type: 'UPDATE_QUANTITY'; bookId: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISHLIST'; bookId: number }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'LOAD_STATE'; state: CartState };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(item => item.book.id === action.book.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.book.id === action.book.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { book: action.book, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.book.id !== action.bookId),
      };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.book.id !== action.bookId),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.book.id === action.bookId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_WISHLIST': {
      const isWishlisted = state.wishlist.includes(action.bookId);
      return {
        ...state,
        wishlist: isWishlisted
          ? state.wishlist.filter(id => id !== action.bookId)
          : [...state.wishlist, action.bookId],
      };
    }
    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false };
    case 'LOAD_STATE':
      return action.state;
    default:
      return state;
  }
}

const STORAGE_KEY = 'abebe-cart';

function loadInitialState(): CartState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...parsed, isDrawerOpen: false };
    }
  } catch {
    // ignore
  }
  return { items: [], wishlist: [], isDrawerOpen: false };
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  cartCount: number;
  cartTotal: number;
  isInWishlist: (bookId: number) => boolean;
  isInCart: (bookId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    const toStore = { items: state.items, wishlist: state.wishlist };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }, [state]);

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const isInWishlist = (bookId: number) => state.wishlist.includes(bookId);
  const isInCart = (bookId: number) => state.items.some(item => item.book.id === bookId);

  return (
    <CartContext.Provider value={{ state, dispatch, cartCount, cartTotal, isInWishlist, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
