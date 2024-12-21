/*
  # Fix Storage Policies

  1. Changes
    - Drop and recreate storage bucket with correct settings
    - Update storage policies with proper permissions
    - Add missing public access policy
  
  2. Security
    - Enable RLS on storage.objects
    - Add policies for public read access
    - Add policies for authenticated user uploads
*/

-- Recreate bucket with correct settings
DELETE FROM storage.buckets WHERE id = 'comic-covers';
INSERT INTO storage.buckets (id, name, public)
VALUES ('comic-covers', 'Comic book covers', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view comic covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload comic covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update comic covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete comic covers" ON storage.objects;

-- Create new policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'comic-covers');

CREATE POLICY "Auth Upload"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'comic-covers');

CREATE POLICY "Auth Update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'comic-covers');

CREATE POLICY "Auth Delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'comic-covers');