import { BookOpen, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-300 py-16 px-4 relative transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
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

          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-wider uppercase">Categories</h4>
            <ul className="space-y-2 text-sm">
              {['Amharic Literature', 'Afaan Oromo Books', 'English Books', 'Children\'s Books', 'Ethiopian History', 'Business & Economics'].map(c => (
                <li key={c}>
                  <button className="hover:text-amber-500 transition-colors text-left">{c}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'New Arrivals', 'Best Sellers', 'Contact', 'FAQ'].map(l => (
                <li key={l}>
                  <button className="hover:text-amber-500 transition-colors text-left">{l}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-wider uppercase">Newsletter</h4>
            <p className="text-sm text-stone-400 mb-3">Get updates on new arrivals and special offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 p-2.5 bg-stone-800 dark:bg-stone-900 rounded-lg border border-stone-700 focus:border-amber-500 outline-none text-sm text-white placeholder-stone-500 transition-colors"
              />
              <button className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                Join
              </button>
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>+251 91 234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>info@abebebookstore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Madjet Street, Harar, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-500">© 2024 Abebe Bookstore. All rights reserved.</p>
          <p className="text-xs text-stone-600 italic">Built with ❤ in Harar, Ethiopia</p>
        </div>
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-amber-700 hover:bg-amber-800 text-white p-3 rounded-full shadow-lg shadow-amber-700/30 transition-all hover:-translate-y-1 z-40 animate-fade-in-up"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
