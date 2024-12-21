/*
  # Set up storage for comic covers
  
  1. Changes
    - Remove old binary storage column
    - Add storage URL column
    - Set up storage bucket and policies
  
  2. Security
    - Enable RLS on storage bucket
    - Set up policies for authenticated users
*/

-- Remove old binary storage completely
ALTER TABLE comic_books 
DROP COLUMN IF EXISTS cover_image CASCADE;

-- Ensure storage URL column exists
ALTER TABLE comic_books 
ADD COLUMN IF NOT EXISTS storage_url text;

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('comic-covers', 'Comic book covers', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view comic covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload comic covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their comic covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their comic covers" ON storage.objects;

-- Create new policies
CREATE POLICY "Anyone can view comic covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'comic-covers');

CREATE POLICY "Authenticated users can upload comic covers"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'comic-covers');

CREATE POLICY "Authenticated users can update their comic covers"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'comic-covers');

CREATE POLICY "Authenticated users can delete their comic covers"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'comic-covers');