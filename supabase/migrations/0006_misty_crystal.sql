/*
  # Add binary image storage
  
  1. Changes
    - Add cover_image column of type bytea to store binary image data
    - Add function to handle base64 image conversion
    - Update RLS policies to handle the new column
  
  2. Notes
    - Keeping the cover_url for fallback/compatibility
    - Added helper function for base64 conversion
*/

-- Add new column for binary image storage
ALTER TABLE comic_books 
ADD COLUMN IF NOT EXISTS cover_image bytea;

-- Create function to convert base64 to bytea
CREATE OR REPLACE FUNCTION base64_to_bytea(base64_text text) 
RETURNS bytea AS $$
BEGIN
    RETURN decode(base64_text, 'base64');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policies to include new column
CREATE POLICY "Users can upload images"
    ON comic_books
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);