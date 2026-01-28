import { BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BookOpen className="w-8 h-8 text-amber-700 mr-2" />
            <span className="text-xl font-bold text-gray-900">Abebe Bookstore</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('featured-products')}
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
            >
              Contact
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsOpen(false);
              }}
              className="block w-full text-left py-2 text-gray-700 hover:text-amber-700 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('featured-products')}
              className="block w-full text-left py-2 text-gray-700 hover:text-amber-700 font-medium"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-gray-700 hover:text-amber-700 font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-2 text-gray-700 hover:text-amber-700 font-medium"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
