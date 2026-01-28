import { BookOpen, Phone, Mail, MapPin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="w-8 h-8 text-amber-500 mr-2" />
              <span className="text-xl font-bold">Abebe Bookstore</span>
            </div>
            <p className="text-gray-400">
              Quality books and learning materials for everyone since 2019.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-2" />
                +251 11 234 5678
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-2" />
                info@abebebookstore.com
              </li>
              <li className="flex items-start text-gray-400">
                <MapPin className="w-5 h-5 mr-2 mt-1" />
                <span>123 Main Street<br />Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://www.facebook.com/abebebookstore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              title="Follow us on Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <svg className="w-6 h-6 text-gray-400 hover:text-sky-400 transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24" onClick={() => window.open('https://t.me/abebebookstore', '_blank')} title="Chat with us on Telegram">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295-.002-1.206-.02-4.413-.031-8.842l8.136-7.335z"/>
            </svg>
            <svg className="w-6 h-6 text-gray-400 hover:text-black transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24" onClick={() => window.open('https://www.tiktok.com/@abebebookstore', '_blank')} title="Follow us on TikTok">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.01-.01z"/>
            </svg>
          </div>
          <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} Abebe Bookstore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
