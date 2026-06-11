import { BookOpen, Menu, X, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import DarkModeToggle from './DarkModeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', id: null },
  { label: 'Products', id: 'featured-products' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [badgeKey, setBadgeKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, dispatch } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > 0) setBadgeKey(prev => prev + 1);
  }, [cartCount]);

  const scrollToSection = (id: string | null) => {
    if (!id) {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl shadow-md'
        : 'bg-white dark:bg-stone-900 shadow-sm'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BookOpen className="w-8 h-8 text-amber-700 dark:text-amber-500 mr-2" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">Abebe Bookstore</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id)}
                className="relative px-4 py-2 text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 font-medium transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-700 dark:bg-amber-500 rounded-full transition-all duration-300 group-hover:w-3/4" />
              </button>
            ))}

            <DarkModeToggle />

            <button
              onClick={() => dispatch({ type: 'TOGGLE_DRAWER' })}
              className="relative p-2 text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 transition-colors ml-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.span
                    key={badgeKey}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <DarkModeToggle />
            <button
              onClick={() => dispatch({ type: 'TOGGLE_DRAWER' })}
              className="relative p-2 text-gray-700 dark:text-stone-300"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence mode="wait">
                {cartCount > 0 && (
                  <motion.span
                    key={badgeKey}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-stone-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-stone-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - slides from right */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-stone-900 shadow-xl z-50 md:hidden p-6 pt-20"
            >
              <div className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left py-3 text-gray-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-500 font-medium text-lg border-b border-stone-100 dark:border-stone-800 transition-colors"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
