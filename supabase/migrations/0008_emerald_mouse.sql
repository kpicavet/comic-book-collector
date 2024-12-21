/*
  # Fix binary image validation

  1. Changes
    - Add proper image format validation
    - Clean up invalid binary data
    - Add constraints and indexes
*/

-- Function to validate image binary data
CREATE OR REPLACE FUNCTION is_valid_image_binary(data bytea) 
RETURNS boolean AS $$
BEGIN
    -- Basic validation
    IF data IS NULL OR length(data) = 0 THEN
        RETURN false;
    END IF;

    -- Check for JPEG magic numbers (FF D8)
    IF substring(data from 1 for 2) = decode('FFD8', 'hex') THEN
        RETURN true;
    END IF;

    -- Check for PNG magic numbers (89 50 4E 47)
    IF substring(data from 1 for 4) = decode('89504E47', 'hex') THEN
        RETURN true;
    END IF;

    RETURN false;
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT;

-- Clean up invalid binary data
UPDATE comic_books
SET cover_image = NULL
WHERE cover_image IS NOT NULL 
AND NOT is_valid_image_binary(cover_image);

-- Add constraint to ensure valid binary data
ALTER TABLE comic_books
DROP CONSTRAINT IF EXISTS valid_cover_image;

ALTER TABLE comic_books
ADD CONSTRAINT valid_cover_image
CHECK (
    cover_image IS NULL 
    OR is_valid_image_binary(cover_image)
);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_comic_books_cover_image 
ON comic_books USING btree (number) 
WHERE cover_image IS NOT NULL;