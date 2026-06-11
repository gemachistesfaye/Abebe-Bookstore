import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const confettiColors = ['#009b48', '#ffff00', '#da121a', '#f59e0b', '#8b5e3c'];

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), opacity: 1, rotate: 0 }}
          animate={{ y: typeof window !== 'undefined' ? window.innerHeight + 20 : 800, rotate: 720, opacity: 0 }}
          transition={{ duration: 2 + Math.random() * 2, ease: 'easeOut', delay: Math.random() * 0.5 }}
          className="absolute w-2 h-2 rounded-sm"
          style={{ backgroundColor: confettiColors[i % confettiColors.length] }}
        />
      ))}
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shaking, setShaking] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const validate = (field: string, value: string) => {
    const newErrors = { ...errors };
    if (!value.trim()) {
      newErrors[field] = 'This field is required';
    } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors[field] = 'Please enter a valid email';
    } else {
      delete newErrors[field];
    }
    setErrors(newErrors);
    if (newErrors[field]) {
      setShaking(field);
      setTimeout(() => setShaking(null), 500);
    }
    return !newErrors[field];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fields = ['name', 'email', 'subject', 'message'];
    const allValid = fields.every(f => validate(f, formData[f as keyof typeof formData]));
    if (allValid) {
      setShowConfetti(true);
      setShowSuccess(true);
      setTimeout(() => { setShowConfetti(false); setShowSuccess(false); }, 4000);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) validate(field, value);
  };

  const inputClass = (field: string) =>
    `w-full p-4 bg-stone-50 dark:bg-stone-700 border rounded-xl outline-none text-stone-900 dark:text-white transition-all ${
      errors[field]
        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
        : 'border-stone-200 dark:border-stone-600 focus:border-amber-500 focus:bg-white dark:focus:bg-stone-600 focus:ring-2 focus:ring-amber-800/20'
    } ${shaking === field ? 'animate-shake' : ''} placeholder-stone-400`;

  return (
    <section id="contact" className="bg-[#fdfaf6] dark:bg-stone-900 py-24 px-4 relative transition-colors">
      {showConfetti && <Confetti />}

      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex justify-center gap-2 mb-4">
              <div className="w-8 h-1 bg-[#009b48] rounded-full"></div>
              <div className="w-8 h-1 bg-[#ffff00] rounded-full"></div>
              <div className="w-8 h-1 bg-[#da121a] rounded-full"></div>
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-white mb-4">Get in Touch</h2>
            <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Have a question about our collection or want to place a special order? We'd love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <ScrollReveal className="col-span-1">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-amber-700 dark:text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-white mb-1">Visit Us</h4>
                  <p className="text-stone-500 dark:text-stone-400 text-sm">Madjet Street, Harar, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-amber-700 dark:text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-white mb-1">Call Us</h4>
                  <p className="text-stone-500 dark:text-stone-400 text-sm">+251 91 234 5678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-amber-700 dark:text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-white mb-1">Email Us</h4>
                  <p className="text-stone-500 dark:text-stone-400 text-sm">info@abebebookstore.com</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="col-span-1 lg:col-span-4">
            <div>
              <AnimatePresence mode="wait">
                {showSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="bg-white dark:bg-stone-800 p-12 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-4">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="text-amber-700 dark:text-amber-500 font-medium text-sm hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 space-y-4 transition-colors w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <input
                          type="text"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className={inputClass('name')}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <input
                          type="email"
                          placeholder="Your Email *"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className={inputClass('email')}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <input
                        type="text"
                        placeholder="Subject *"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className={inputClass('subject')}
                      />
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <textarea
                        placeholder="Your Message *"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className={`${inputClass('message')} resize-none`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </motion.div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-amber-700/20 text-base"
                    >
                      <Send className="w-5 h-5" /> Send Message
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
