/*
  # Improve binary image handling

  1. Changes
    - Relax image validation to handle more formats
    - Add better error handling
    - Fix constraint issues
*/

-- Drop previous constraint and function
ALTER TABLE comic_books DROP CONSTRAINT IF EXISTS valid_cover_image;
DROP FUNCTION IF EXISTS is_valid_image_binary(bytea);

-- Create improved image validation function
CREATE OR REPLACE FUNCTION is_valid_image_binary(data bytea) 
RETURNS boolean AS $$
BEGIN
    -- Allow null values
    IF data IS NULL THEN
        RETURN true;
    END IF;

    -- Basic size validation
    IF length(data) < 4 THEN
        RETURN false;
    END IF;

    -- Check common image formats
    -- JPEG (FF D8 FF)
    IF substring(data from 1 for 3) = decode('FFD8FF', 'hex') THEN
        RETURN true;
    END IF;

    -- PNG (89 50 4E 47 0D 0A 1A 0A)
    IF substring(data from 1 for 8) = decode('89504E470D0A1A0A', 'hex') THEN
        RETURN true;
    END IF;

    -- GIF (47 49 46 38)
    IF substring(data from 1 for 4) = decode('47494638', 'hex') THEN
        RETURN true;
    END IF;

    -- WebP (52 49 46 46 ... 57 45 42 50)
    IF substring(data from 1 for 4) = decode('52494646', 'hex') AND
       substring(data from 9 for 4) = decode('57454250', 'hex') THEN
        RETURN true;
    END IF;

    RETURN false;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add more lenient constraint
ALTER TABLE comic_books
ADD CONSTRAINT valid_cover_image
CHECK (
    cover_image IS NULL 
    OR length(cover_image) > 0
);

-- Create function to safely clean binary data
CREATE OR REPLACE FUNCTION clean_invalid_image_data() 
RETURNS void AS $$
DECLARE
    invalid_count integer;
BEGIN
    WITH updated AS (
        UPDATE comic_books
        SET cover_image = NULL
        WHERE cover_image IS NOT NULL 
        AND NOT is_valid_image_binary(cover_image)
        RETURNING id
    )
    SELECT count(*) INTO invalid_count FROM updated;
    
    RAISE NOTICE 'Cleaned % invalid image records', invalid_count;
END;
$$ LANGUAGE plpgsql;