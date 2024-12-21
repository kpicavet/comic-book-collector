/*
  # Fix image upload functionality

  1. Changes
    - Removes complex validation functions and triggers in correct order
    - Adds simple size constraint for cover_image
    - Ensures cover_image can be null
  
  2. Security
    - Maintains RLS policies
    - Adds basic size validation
*/

-- First drop the trigger that depends on the function
DROP TRIGGER IF EXISTS validate_cover_image_trigger ON comic_books CASCADE;

-- Now we can safely drop the functions
DROP FUNCTION IF EXISTS validate_cover_image() CASCADE;
DROP FUNCTION IF EXISTS is_valid_image_binary(bytea) CASCADE;
DROP FUNCTION IF EXISTS validate_binary_data(bytea) CASCADE;

-- Remove existing constraint
ALTER TABLE comic_books DROP CONSTRAINT IF EXISTS valid_cover_image;
ALTER TABLE comic_books DROP CONSTRAINT IF EXISTS cover_image_size_check;

-- Add simple size constraint
ALTER TABLE comic_books
ADD CONSTRAINT cover_image_size_check
CHECK (
    cover_image IS NULL 
    OR length(cover_image) <= 10485760  -- 10MB max
);