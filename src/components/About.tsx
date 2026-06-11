import { BookOpen, Users, BookMarked } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

export default function About() {
  const books = useCountUp(500, 2000);
  const years = useCountUp(6, 1500);
  const categories = useCountUp(6, 1500);

  return (
    <section id="about" className="bg-[#f3ede4] dark:bg-stone-800 py-24 px-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#009b48] rounded-full"></div>
              <div className="w-8 h-1 bg-[#ffff00] rounded-full"></div>
              <div className="w-8 h-1 bg-[#da121a] rounded-full"></div>
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white mb-4">About Abebe Bookstore</h2>
            <div className="w-20 h-1 bg-amber-700 mx-auto rounded-full"></div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                Abebe Bookstore has been Harar's trusted source for quality books, learning materials and
                cultural resources for over five years. We specialize in Ethiopian literature, children's
                educational materials, and books in Amharic, Afaan Oromo, English and bilingual formats.
              </p>
              <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed mb-8">
                Our mission is to make quality reading materials accessible to all Ethiopians while preserving
                and promoting our rich literary heritage. From classic Ethiopian texts to modern educational
                resources, we believe that books have the power to transform lives and communities.
              </p>
              <div className="flex gap-4">
                <BookOpen className="w-6 h-6 text-amber-700 dark:text-amber-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-white mb-1">Curated Collection</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400">Hand-picked titles across all genres and languages</p>
                </div>
              </div>
            </div>

            {/* Stats with count-up */}
            <div className="grid grid-cols-3 gap-4">
              <div ref={books.ref} className="bg-white dark:bg-stone-700/50 p-6 rounded-2xl text-center shadow-sm border border-stone-100 dark:border-stone-600 transition-colors">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-amber-700 dark:text-amber-500" />
                </div>
                <div className="text-3xl font-bold text-stone-900 dark:text-white mb-1">{books.count}+</div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Books Available</div>
              </div>
              <div ref={years.ref} className="bg-white dark:bg-stone-700/50 p-6 rounded-2xl text-center shadow-sm border border-stone-100 dark:border-stone-600 transition-colors">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-amber-700 dark:text-amber-500" />
                </div>
                <div className="text-3xl font-bold text-stone-900 dark:text-white mb-1">{years.count}</div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Years Serving</div>
              </div>
              <div ref={categories.ref} className="bg-white dark:bg-stone-700/50 p-6 rounded-2xl text-center shadow-sm border border-stone-100 dark:border-stone-600 transition-colors">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookMarked className="w-6 h-6 text-amber-700 dark:text-amber-500" />
                </div>
                <div className="text-3xl font-bold text-stone-900 dark:text-white mb-1">{categories.count}</div>
                <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Categories</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
