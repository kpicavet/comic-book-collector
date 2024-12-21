/*
  # Simplify image handling

  1. Changes
    - Remove all complex constraints and functions
    - Add simple size limit for cover_image
    - Clear existing cover_image data to start fresh
*/

-- Remove all existing constraints and functions
DROP TRIGGER IF EXISTS validate_cover_image_trigger ON comic_books CASCADE;
DROP FUNCTION IF EXISTS validate_cover_image() CASCADE;
DROP FUNCTION IF EXISTS is_valid_image_binary(bytea) CASCADE;
DROP FUNCTION IF EXISTS validate_binary_data(bytea) CASCADE;
DROP FUNCTION IF EXISTS check_existing_binary_data() CASCADE;

-- Remove existing constraints
ALTER TABLE comic_books DROP CONSTRAINT IF EXISTS valid_cover_image;
ALTER TABLE comic_books DROP CONSTRAINT IF EXISTS cover_image_size_check;

-- Clear existing cover_image data
UPDATE comic_books SET cover_image = NULL;

-- Add simple size constraint
ALTER TABLE comic_books
ADD CONSTRAINT cover_image_size_check
CHECK (
    cover_image IS NULL 
    OR length(cover_image) <= 10485760  -- 10MB max
);