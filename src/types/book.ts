export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  language: 'Amharic' | 'Afaan Oromo' | 'English' | 'Bilingual';
  price: number;
  image: string;
  rating: number;
  description: string;
  isClassic?: boolean;
}
