import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white dark:bg-stone-900 transition-colors">
        <Navigation />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={
            <div className="min-h-screen bg-[#fdfaf6] dark:bg-stone-900 flex flex-col items-center justify-center p-4">
              <h1 className="text-4xl font-bold text-stone-900 dark:text-white mb-4">404</h1>
              <p className="text-stone-500 dark:text-stone-400 mb-4">Page not found.</p>
              <a href="/" className="text-amber-800 dark:text-amber-500 font-medium hover:underline">
                Back to Home
              </a>
            </div>
          } />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
