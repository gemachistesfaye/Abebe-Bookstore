import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const faqs = [
  {
    q: 'What types of books do you sell?',
    a: 'We specialize in Ethiopian literature including Amharic, Afaan Oromo, and English books. Our collection covers history, literature, children\'s books, business, culture, and language learning materials.',
  },
  {
    q: 'Do you offer delivery within Ethiopia?',
    a: 'Yes! We deliver across Ethiopia. Orders within Harar are delivered same-day. For Addis Ababa and other cities, delivery takes 2-3 business days. Free delivery on orders over ETB 2,000.',
  },
  {
    q: 'Can I place a special order for rare books?',
    a: 'Absolutely. If you\'re looking for a specific title that isn\'t in our catalog, contact us and we\'ll do our best to source it for you. We have connections with publishers across Ethiopia.',
  },
  {
    q: 'Do you accept returns?',
    a: 'We accept returns within 7 days of purchase if the book is in its original, undamaged condition. Simply bring your receipt or order confirmation to our store.',
  },
  {
    q: 'How can I pay for my order?',
    a: 'We accept TeleBirr, CBE Birr, bank transfers, and cash on delivery. Online payments can be completed securely through our checkout page.',
  },
  {
    q: 'Do you have a loyalty program?',
    a: 'Yes! Our Book Lovers Club rewards you with points on every purchase. Accumulate points and redeem them for discounts on future purchases. Ask in-store for details.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-[#fdfaf6] dark:bg-stone-900 transition-colors">
      <div className="max-w-3xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-amber-700 dark:text-amber-500" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              Got questions? We've got answers.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i}>
              <div className="bg-white dark:bg-stone-800 rounded-xl border border-stone-100 dark:border-stone-700 overflow-hidden transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-stone-900 dark:text-white text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-sm text-stone-500 dark:text-stone-400 leading-relaxed border-t border-stone-50 dark:border-stone-700 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
