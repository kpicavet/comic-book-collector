/*
  # Fix Storage Setup

  1. Changes
    - Recreate storage bucket with proper public access
    - Set up correct RLS policies
    - Ensure proper authenticated access
  
  2. Security
    - Enable RLS on storage.objects
    - Add policies for public read access
    - Add policies for authenticated user operations
*/

-- First, ensure the bucket is deleted and recreated properly
DELETE FROM storage.buckets WHERE id = 'comic-covers';

-- Create bucket with public access
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('comic-covers', 'Comic book covers', true, 5242880)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies for the bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Auth Upload" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;

-- Create new policies with proper access controls
CREATE POLICY "Allow public viewing of covers"
ON storage.objects FOR SELECT
USING (bucket_id = 'comic-covers');

CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'comic-covers'
    AND (CASE WHEN RIGHT(name, 4) = '.jpg' THEN true
              WHEN RIGHT(name, 4) = '.png' THEN true
              WHEN RIGHT(name, 5) = '.jpeg' THEN true
              WHEN RIGHT(name, 4) = '.gif' THEN true
              ELSE false END)
);

CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'comic-covers');

CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'comic-covers');