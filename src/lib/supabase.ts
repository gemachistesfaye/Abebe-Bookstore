import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  featured: boolean;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}
