import { BookOpen, Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import DarkModeToggle from './DarkModeToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, dispatch } = useCart();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const goHome = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-stone-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BookOpen className="w-8 h-8 text-amber-700 dark:text-amber-500 mr-2" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Abebe Bookstore</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={goHome}
              className="text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('featured-products')}
              className="text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 font-medium transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 font-medium transition-colors"
            >
              Contact
            </button>

            <DarkModeToggle />

            <button
              onClick={() => dispatch({ type: 'TOGGLE_DRAWER' })}
              className="relative p-2 text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <DarkModeToggle />
            <button
              onClick={() => dispatch({ type: 'TOGGLE_DRAWER' })}
              className="relative p-2 text-gray-700 dark:text-stone-300"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-stone-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-stone-300" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <button
              onClick={goHome}
              className="block w-full text-left py-2 text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('featured-products')}
              className="block w-full text-left py-2 text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 font-medium"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-2 text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 font-medium"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
