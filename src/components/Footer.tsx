import { BookOpen, Phone, Mail, Send, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Amharic Literature', param: 'amharic' },
  { name: 'Afaan Oromo Books', param: 'oromo' },
  { name: 'English Books', param: 'english' },
  { name: "Children's Books", param: 'children' },
  { name: 'Ethiopian History', param: 'history' },
  { name: 'Business & Economics', param: 'business' },
];

const quickLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'New Arrivals', param: 'sort', value: 'newest' },
  { name: 'Best Sellers', param: 'sort', value: 'rating' },
  { name: 'Contact', href: '#contact' },
  { name: 'FAQ', href: '#faq' },
];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (param: string) => {
    navigate(`/?category=${param}`);
    setTimeout(() => scrollTo('featured-products'), 100);
  };

  const handleSortClick = (param: string, value: string) => {
    navigate(`/?${param}=${value}`);
    setTimeout(() => scrollTo('featured-products'), 100);
  };

  const handleHashClick = (href: string) => {
    const id = href.replace('#', '');
    if (window.location.pathname === '/') {
      scrollTo(id);
    } else {
      navigate('/');
      setTimeout(() => scrollTo(id), 100);
    }
  };

  return (
    <>
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-300 pt-16 pb-6 px-4 relative transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-6">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-amber-500 mr-2" />
              <span className="text-lg font-bold text-white">Abebe Bookstore</span>
            </div>
            <p className="text-sm text-stone-400 mb-4">
              Your trusted source for Ethiopian literature and educational materials since 2019.
            </p>
            <div className="flex gap-1 mb-4">
              <div className="w-6 h-1 bg-[#009b48] rounded-full"></div>
              <div className="w-6 h-1 bg-[#ffff00] rounded-full"></div>
              <div className="w-6 h-1 bg-[#da121a] rounded-full"></div>
            </div>
          </div>

          <div className="hidden md:block">
            <h4 className="font-bold text-white mb-4 text-sm tracking-wider uppercase">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.map(c => (
                <li key={c.name}>
                  <button onClick={() => handleCategoryClick(c.param)} className="hover:text-amber-500 transition-colors text-left">{c.name}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-bold text-white mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map(l => (
                <li key={l.name}>
                  {l.href ? (
                    <button onClick={() => handleHashClick(l.href)} className="hover:text-amber-500 transition-colors text-left">{l.name}</button>
                  ) : (
                    <button onClick={() => handleSortClick(l.param!, l.value!)} className="hover:text-amber-500 transition-colors text-left">{l.name}</button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-wider uppercase">Developer</h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+251976601074" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>+251 97 660 1074</span>
              </a>
              <a href="mailto:gemachistesfaye36@gmail.com" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>gemachistesfaye36@gmail.com</span>
              </a>
              <a href="https://t.me/GemachisTech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                <Send className="w-4 h-4 text-amber-500" />
                <span>Telegram Channel</span>
              </a>
              <a href="https://github.com/gemachistesfaye" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-4">
          <p className="text-xs text-stone-400 text-center">© {new Date().getFullYear()} Abebe Bookstore. All rights reserved.</p>
        </div>
      </div>

    </footer>

    {showBackToTop && isMobile && (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 bg-amber-700 hover:bg-amber-800 text-white p-3 rounded-full shadow-lg shadow-amber-700/30 transition-all hover:-translate-y-1 z-40 animate-fade-in-up"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    )}
    </>
  );
}
