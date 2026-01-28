import { BookOpen } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <BookOpen className="w-16 h-16 text-amber-700" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Abebe Bookstore
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Quality Books for Everyone
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover a curated collection of books, notebooks and learning materials
          to inspire and educate readers of all ages.
        </p>
      </div>
    </section>
  );
}
