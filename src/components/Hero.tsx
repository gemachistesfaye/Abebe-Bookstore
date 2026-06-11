import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const phrases = [
  "Quality Ethiopian Books",
  "Amharic, Afaan Oromo & English",
  "Classics & Modern Literature",
  "Serving Since 2019"
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 py-20 px-4 overflow-hidden transition-colors">
      {/* Ethiopian geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #92400e 0, #92400e 1px, transparent 0, transparent 50%)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Floating book stack */}
        <div className="flex justify-center mb-8 relative h-24">
          <div className="animate-float-book absolute">
            <div className="w-16 h-20 bg-amber-700 rounded-sm shadow-lg flex items-center justify-center -rotate-6">
              <BookOpen className="w-6 h-6 text-amber-100" />
            </div>
          </div>
          <div className="animate-float-book-2 absolute left-1/2 -translate-x-8">
            <div className="w-16 h-20 bg-[#009b48] rounded-sm shadow-lg flex items-center justify-center rotate-3">
              <BookOpen className="w-6 h-6 text-green-100" />
            </div>
          </div>
          <div className="animate-float-book-3 absolute right-1/2 translate-x-8">
            <div className="w-16 h-20 bg-[#da121a] rounded-sm shadow-lg flex items-center justify-center -rotate-2">
              <BookOpen className="w-6 h-6 text-red-100" />
            </div>
          </div>
        </div>

        {/* Ethiopian flag stripe */}
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-10 h-1 bg-[#009b48] rounded-full animate-fade-in-up" style={{ animationDelay: '0.1s' }} />
          <div className="w-10 h-1 bg-[#ffff00] rounded-full animate-fade-in-up" style={{ animationDelay: '0.2s' }} />
          <div className="w-10 h-1 bg-[#da121a] rounded-full animate-fade-in-up" style={{ animationDelay: '0.3s' }} />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Abebe Bookstore
        </h1>

        {/* Typing animation */}
        <div className="h-10 mb-6 flex items-center justify-center">
          <span className="text-xl md:text-2xl text-amber-700 dark:text-amber-500 font-serif italic">
            {displayText}
          </span>
          <span className="ml-0.5 w-0.5 h-6 bg-amber-700 dark:bg-amber-500 animate-pulse" />
        </div>

        <p className="text-lg text-gray-600 dark:text-stone-400 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          Discover a curated collection of books, notebooks and learning materials
          to inspire and educate readers of all ages.
        </p>

        <Link
          to="#featured-products"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-bold py-3.5 px-8 rounded-full transition-all animate-fade-in-up animate-pulse-glow hover:scale-105 shadow-lg shadow-amber-700/20"
          style={{ animationDelay: '0.8s' }}
        >
          <BookOpen className="w-5 h-5" />
          Browse Collection
        </Link>
      </div>
    </section>
  );
}
