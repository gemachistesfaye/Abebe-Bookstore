import React from 'react';
import { 
  BookOpen, 
  Facebook, 
  Github, 
  Mail, 
  Phone
} from 'lucide-react';


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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 py-8 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          
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
                <TelegramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

         
          <div className="md:pl-12">
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="/" className="text-slate-400 hover:text-amber-500 transition-colors">Home</a></li>
              <li><a href="/products" className="text-slate-400 hover:text-amber-500 transition-colors">Products</a></li>
              <li><a href="/about" className="text-slate-400 hover:text-amber-500 transition-colors">About</a></li>
              <li><a href="/contact" className="text-slate-400 hover:text-amber-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          
          <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 self-start">
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
                <Github className="w-4 h-4 text-amber-500 shrink-0" />
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

      
        <div className="border-t border-slate-800 pt-6">
          <p className="text-center text-slate-500 text-xs">
            &copy; {currentYear} Abebe Bookstore. Built in Ethiopia.
          </p>
        </div>
      </div>
    </footer>
  );
}
