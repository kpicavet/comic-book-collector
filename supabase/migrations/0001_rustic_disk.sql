/*
  # Comic Books Schema

  1. New Tables
    - `comic_books`
      - `id` (uuid, primary key)
      - `number` (integer, unique)
      - `title` (text)
      - `cover_url` (text)
      - `state` (enum)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `comic_books` table
    - Add policies for authenticated users to read and modify comic books
*/

-- Create enum type for comic book states
CREATE TYPE comic_state AS ENUM ('very old', 'old', 'ok', 'good', 'perfect');

-- Create comic books table
CREATE TABLE IF NOT EXISTS comic_books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number integer UNIQUE NOT NULL,
  title text NOT NULL,
  cover_url text NOT NULL,
  state comic_state NOT NULL DEFAULT 'ok',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE comic_books ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view comic books"
  ON comic_books
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert comic books"
  ON comic_books
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update comic books"
  ON comic_books
  FOR UPDATE
  TO authenticated
  USING (true);

-- Insert some dummy data
INSERT INTO comic_books (number, title, cover_url, state) VALUES
(1, 'De Jacht op een Voetbal', 'https://www.jommeke.be/albums/1.jpg', 'good'),
(2, 'De Zingende Aap', 'https://www.jommeke.be/albums/2.jpg', 'ok'),
(3, 'Het Staartendorp', 'https://www.jommeke.be/albums/3.jpg', 'very old'),
(4, 'Dolle Fratsen', 'https://www.jommeke.be/albums/4.jpg', 'perfect'),
(5, 'De Muzikale Bella', 'https://www.jommeke.be/albums/5.jpg', 'old');