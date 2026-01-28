/*
  # Create Bookstore Tables

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Product price
      - `image_url` (text) - URL to product image
      - `featured` (boolean) - Whether to show on homepage
      - `created_at` (timestamptz) - Creation timestamp
    
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Submitter's name
      - `email` (text) - Submitter's email
      - `message` (text) - Contact message
      - `created_at` (timestamptz) - Submission timestamp
  
  2. Security
    - Enable RLS on both tables
    - Products table: Public read access for all users
    - Contact submissions: Public insert access, no read access for security
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10, 2) NOT NULL,
  image_url text NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);