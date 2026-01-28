import React from 'react';
import { 
  BookOpen, 
  Facebook, 
  Github, 
  Mail, 
  Phone, 
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 py-8 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 group">
              <div className="bg-amber-500 p-2 rounded transition-transform group-hover:rotate-12">
                <BookOpen className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Abebe Bookstore
              </span>
            </div>
            
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
                <Facebook className="w-4 h-4" />
              </a>
              
              <a
                href="https://t.me/abebebookstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
                title="Telegram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .33z"/>
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@abebebookstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                title="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.01-.01z"/>
                </svg>
              </a>
            </div>
          </div>

          {}
          <div className="md:pl-12">
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="/" className="text-slate-400 hover:text-amber-500 transition-colors">Home</a></li>
              <li><a href="/products" className="text-slate-400 hover:text-amber-500 transition-colors">Products</a></li>
              <li><a href="/about" className="text-slate-400 hover:text-amber-500 transition-colors">About</a></li>
              <li><a href="/contact" className="text-slate-400 hover:text-amber-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {}
          <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 self-start">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2 text-sm">
              <span className="w-6 h-px bg-amber-500"></span>
              Developer
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:dev@abebebookstore.com" className="text-sm text-slate-300 hover:text-amber-500 transition-colors truncate">
                  gemachistesfaye36@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+2519776601074" className="text-sm text-slate-300 hover:text-amber-500 transition-colors">
                  +251 97 7660 1074
                </a>
              </div>

              <div className="pt-1">
                <a
                  href="https://github.com/gemachistesfaye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-medium"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="border-t border-slate-800 pt-6">
          <p className="text-center text-slate-500 text-xs">
            &copy; {currentYear} Abebe Bookstore. Built in Ethiopia.
          </p>
        </div>
      </div>
    </footer>
  );
}