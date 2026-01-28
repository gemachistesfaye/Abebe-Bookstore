import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContactButtons from './components/FloatingContactButtons';
import ProductDetails from './components/ProductDetails';
import ShoppingCart from './components/ShoppingCart';
import { CartProvider } from './contexts/CartContext';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'product'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Book | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const handleProductClick = (product: Book) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navigation onCartClick={() => setCartOpen(true)} />

        {currentPage === 'home' ? (
          <>
            <Hero />
            <FeaturedProducts onProductClick={handleProductClick} />
            <About />
            <Contact />
            <Footer />
            <FloatingContactButtons />
          </>
        ) : (
          selectedProduct && <ProductDetails book={selectedProduct} onBack={handleBackToHome} />
        )}

        <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;
