/*
  # Initial Database Schema Setup

  1. New Tables
    - `users`
      - `id` (integer, primary key)
      - `username` (text, unique)
      - `password` (text)
      - `role` (text, either 'user' or 'admin')
    - `products`
      - `id` (integer, primary key)
      - `nama_produk` (text)
      - `harga_satuan` (integer)
      - `quantity` (integer)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated access

  3. Sample Data
    - Insert demo users and products
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'admin'))
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  nama_produk TEXT NOT NULL,
  harga_satuan INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read all user data"
  ON users
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for products table
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert products"
  ON products
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update products"
  ON products
  FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can delete products"
  ON products
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Insert sample users
INSERT INTO users (username, password, role) VALUES
  ('user1', 'password123', 'user'),
  ('admin1', 'adminpassword', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert sample products
INSERT INTO products (nama_produk, harga_satuan, quantity) VALUES
  ('Laptop A', 12000000, 5),
  ('Mouse B', 150000, 20),
  ('Keyboard C', 300000, 10),
  ('Monitor D', 2500000, 8),
  ('Headset E', 750000, 15)
ON CONFLICT DO NOTHING;