/*
  # Switch to Storage Bucket for Comic Covers

  1. Changes
    - Add storage_url column for cover images
    - Remove binary storage column
    - Update RLS policies for storage

  2. Security
    - Enable RLS for storage bucket
    - Add policies for authenticated users
*/

-- Add new column for storage URLs
ALTER TABLE comic_books 
ADD COLUMN IF NOT EXISTS storage_url text;

-- Remove old binary storage
ALTER TABLE comic_books 
DROP COLUMN IF EXISTS cover_image;

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('comic-covers', 'comic-covers')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Storage Policies
CREATE POLICY "Authenticated users can upload comic covers"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'comic-covers' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update comic covers"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'comic-covers' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Anyone can view comic covers"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'comic-covers');