/*
  # Clear cover image data

  1. Changes
    - Sets all cover_image values to NULL in the comic_books table
    - Updates the updated_at timestamp for affected rows

  2. Purpose
    - Clean up potentially corrupted or invalid image data
    - Prepare for new image upload implementation
*/

-- Clear all cover_image data and update timestamps
UPDATE comic_books
SET 
  cover_image = NULL,
  updated_at = CURRENT_TIMESTAMP;

-- Add notification for tracking
DO $$
BEGIN
  RAISE NOTICE 'Successfully cleared cover_image data from all comic books';
END $$;