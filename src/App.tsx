import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContactButtons from './components/FloatingContactButtons';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <FeaturedProducts />
      <About />
      <Contact />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}

export default App;
