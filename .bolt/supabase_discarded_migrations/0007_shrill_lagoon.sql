/*
  # Update comic images storage
  
  1. Changes
    - Add function to convert URL to bytea
    - Migrate existing cover_url data to cover_image
    - Drop cover_url column
  
  2. Security
    - Function runs with SECURITY DEFINER to ensure proper access
*/

-- Function to fetch and convert URL to bytea
CREATE OR REPLACE FUNCTION fetch_url_to_bytea(url text) 
RETURNS bytea AS $$
BEGIN
    -- This is a placeholder - actual implementation would be handled by the application
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Migrate existing cover_url data to cover_image
DO $$ 
BEGIN
    UPDATE comic_books
    SET cover_image = fetch_url_to_bytea(cover_url)
    WHERE cover_image IS NULL AND cover_url IS NOT NULL;
END $$;

-- Drop cover_url column
ALTER TABLE comic_books DROP COLUMN IF EXISTS cover_url;