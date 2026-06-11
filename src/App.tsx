import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContactButtons from './components/FloatingContactButtons';
import ProductDetails from './components/ProductDetails';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './components/CheckoutPage';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' as const } },
};

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <About />
      <Contact />
      <Footer />
      <FloatingContactButtons />
    </>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#fdfaf6] dark:bg-stone-900 flex flex-col items-center justify-center p-4 text-center transition-colors">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center animate-pulse-glow">
          <BookOpen className="w-12 h-12 text-stone-300 dark:text-stone-600" />
        </div>
        <div className="absolute -top-2 -right-2 text-6xl font-bold text-amber-200 dark:text-amber-900/40">?</div>
      </div>
      <h1 className="text-6xl font-bold text-stone-200 dark:text-stone-700 mb-2">404</h1>
      <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-white mb-3">Page Not Found</h2>
      <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-md">
        Looks like this page got lost in the stacks. Let's get you back to browsing!
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-700/20"
      >
        <BookOpen className="w-5 h-5" /> Back to Home
      </Link>
    </div>
  );
}

function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <div className="min-h-screen bg-white dark:bg-stone-900 transition-colors">
        <Navigation />
        <CartDrawer />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/book/:id" element={<PageWrapper><ProductDetails /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </div>
    </CartProvider>
  );
}

export default App;
