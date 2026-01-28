import { MessageCircle, Facebook } from 'lucide-react';
import { useState } from 'react';

interface ContactButton {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  url: string;
}

export default function FloatingContactButtons() {
  const [isOpen, setIsOpen] = useState(false);

  const contactButtons: ContactButton[] = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: 'https://www.facebook.com/abebebookstore',
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <i className="bi bi-telegram" />,
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
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
      {isOpen && (
        <div className="flex flex-col gap-2 animate-in fade-in duration-200">
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
