import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ContactButton {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  url: string;
}

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

export default function FloatingContactButtons() {
  const [isOpen, setIsOpen] = useState(false);

  const contactButtons: ContactButton[] = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <FacebookIcon className="w-6 h-6" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: 'https://www.facebook.com/abebebookstore',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <TelegramIcon className="w-6 h-6" />,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: 'https://t.me/abebebookstore',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.01-.01z"/></svg>,
      color: 'bg-black hover:bg-gray-800',
      url: 'https://www.tiktok.com/@abebebookstore',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
      color: 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 hover:opacity-90',
      url: 'https://www.instagram.com/abebebookstore',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
      {isOpen && (
        <div className="flex flex-col sm:flex-row gap-2 animate-in fade-in duration-200">
          {contactButtons.map((button) => (
            <a
              key={button.id}
              href={button.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg ${button.color} transition-all duration-300 hover:shadow-xl`}
              title={button.name}
            >
              {button.icon}
              <span className="hidden sm:inline font-medium text-sm">{button.name}</span>
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-amber-600 hover:bg-amber-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-110"
        title="Contact Us"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
