/*
  # Clear cover images

  1. Changes
    - Sets all cover_image values to NULL in the comic_books table
    - Keeps other columns and data intact
  
  2. Purpose
    - Clean slate for image storage
    - Remove potentially problematic binary data
*/

-- Clear all cover_image data
UPDATE comic_books
SET 
  cover_image = NULL,
  updated_at = CURRENT_TIMESTAMP;

-- Log the cleanup
DO $$
BEGIN
  RAISE NOTICE 'Cleared cover_image data from all comic books';
END $$;