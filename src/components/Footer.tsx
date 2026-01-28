import { BookOpen, Facebook, Github, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <div className="flex items-center mb-3">
              <BookOpen className="w-7 h-7 text-amber-500 mr-2" />
              <span className="text-lg font-bold">Abebe Bookstore</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Quality books and learning materials for everyone since 2019.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-300 flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-500" />
              Developer Contact
            </h3>
            <div className="flex flex-col gap-3 space-y-2">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Email</p>
                <a
                  href="mailto:dev@abebebookstore.com"
                  className="text-gray-300 hover:text-amber-500 transition-colors text-sm"
                  title="Developer Email"
                >
                  dev@abebebookstore.com
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone</p>
                <a
                  href="tel:+251911234567"
                  className="text-gray-300 hover:text-amber-500 transition-colors text-sm"
                  title="Developer Phone"
                >
                  +251 91 123 4567
                </a>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Follow</p>
                <a
                  href="https://github.com/abebebookstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200 transition-colors inline-flex items-center gap-2"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://www.facebook.com/abebebookstore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              title="Follow us on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <svg className="w-5 h-5 text-gray-400 hover:text-sky-400 transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24" onClick={() => window.open('https://t.me/abebebookstore', '_blank')} title="Chat with us on Telegram">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.002-1.206-.02-4.413-.031-8.842l8.136-7.335z"/>
            </svg>
            <svg className="w-5 h-5 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24" onClick={() => window.open('https://www.tiktok.com/@abebebookstore', '_blank')} title="Follow us on TikTok">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.01-.01z"/>
            </svg>
          </div>
          <p className="text-center text-gray-500 text-sm">&copy; {new Date().getFullYear()} Abebe Bookstore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
