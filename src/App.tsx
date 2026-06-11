import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContactButtons from './components/FloatingContactButtons';
import ProductDetails from './components/ProductDetails';

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
    <div className="min-h-screen bg-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:id" element={<ProductDetails />} />
        <Route path="*" element={
          <div className="min-h-screen bg-[#fdfaf6] flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-stone-900 mb-4">404</h1>
            <p className="text-stone-500 mb-4">Page not found.</p>
            <a href="/" className="text-amber-800 font-medium hover:underline">
              Back to Home
            </a>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
