import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone } from 'lucide-react';

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-stone-950 text-slate-200 py-8 px-6 border-t border-slate-800 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-amber-500 p-2 rounded transition-transform group-hover:rotate-12">
                <BookOpen className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Abebe Bookstore
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Quality books and learning materials for everyone since 2019. Visit us for a curated selection and exceptional service.
            </p>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/abebebookstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href="https://t.me/abebebookstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
                title="Telegram"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="md:pl-12">
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/" className="text-slate-400 hover:text-amber-500 transition-colors">Home</Link></li>
              <li><Link to="/" className="text-slate-400 hover:text-amber-500 transition-colors">Products</Link></li>
              <li>
                <button
                  onClick={() => {
                    if (window.location.pathname !== '/') {
                      window.location.href = '/#about';
                    } else {
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (window.location.pathname !== '/') {
                      window.location.href = '/#contact';
                    } else {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/40 dark:bg-stone-800/40 p-5 rounded-xl border border-slate-700/50 dark:border-stone-700/50 self-start transition-colors">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
              <span className="w-6 h-px bg-amber-500"></span>
              Developer
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href="tel:+251976601074"
                  className="text-sm text-slate-300 hover:text-amber-500 transition-colors"
                >
                  +251 97 660 1074
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href="mailto:gemachistesfaye36@gmail.com"
                  className="text-sm text-slate-300 hover:text-amber-500 transition-colors truncate"
                >
                  gemachistesfaye36@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <TelegramIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href="https://t.me/GemachisTesfaye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-300 hover:text-amber-500 transition-colors truncate"
                >
                  Telegram Channel
                </a>
              </div>

              <div className="flex items-center gap-3">
                <GithubIcon className="w-4 h-4 text-amber-500 shrink-0" />
                <a
                  href="https://github.com/gemachistesfaye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-300 hover:text-amber-500 transition-colors truncate"
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 dark:border-stone-800 pt-6">
          <p className="text-center text-slate-500 text-xs">
            &copy; {currentYear} Abebe Bookstore. Built in Ethiopia.
          </p>
        </div>
      </div>
    </footer>
  );
}
