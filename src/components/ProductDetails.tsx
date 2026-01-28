import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

interface ProductDetailsProps {
  book: Book;
  onBack: () => void;
}

export default function ProductDetails({ book, onBack }: ProductDetailsProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.image,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Collection
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div>
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div>
              <div className="mb-4">
                <span className="text-sm font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                  {book.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">by {book.author}</p>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(book.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">({book.rating} stars)</span>
              </div>

              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                {book.description}
              </p>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold text-amber-700">
                    ${book.price}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <p>✓ Free shipping on orders over $50</p>
                  <p>✓ 30-day money-back guarantee</p>
                  <p>✓ Secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
