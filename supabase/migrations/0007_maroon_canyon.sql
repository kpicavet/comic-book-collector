/*
  # Verify binary storage setup

  1. Changes
    - Add proper constraints and checks for binary data
    - Add helper functions for binary data validation
    - Add trigger to validate binary data on insert/update
  
  2. Verification
    - Add function to check existing binary data
    - Report any invalid binary data
*/

-- Function to validate binary data
CREATE OR REPLACE FUNCTION validate_binary_data(data bytea) 
RETURNS boolean AS $$
BEGIN
    -- Check if data is null
    IF data IS NULL THEN
        RETURN true;
    END IF;
    
    -- Check if data is empty
    IF length(data) = 0 THEN
        RETURN false;
    END IF;
    
    -- Check if data is too large (max 10MB)
    IF length(data) > 10485760 THEN
        RETURN false;
    END IF;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check existing data
CREATE OR REPLACE FUNCTION check_existing_binary_data()
RETURNS TABLE (
    comic_number integer,
    issue text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        number,
        CASE
            WHEN cover_image IS NULL THEN 'No binary data'
            WHEN NOT validate_binary_data(cover_image) THEN 'Invalid binary data'
            ELSE 'Valid'
        END as issue
    FROM comic_books
    WHERE cover_image IS NOT NULL
    AND NOT validate_binary_data(cover_image);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add trigger to validate binary data on insert/update
CREATE OR REPLACE FUNCTION validate_cover_image()
RETURNS trigger AS $$
BEGIN
    IF NEW.cover_image IS NOT NULL AND NOT validate_binary_data(NEW.cover_image) THEN
        RAISE EXCEPTION 'Invalid binary data for cover image';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS validate_cover_image_trigger ON comic_books;
CREATE TRIGGER validate_cover_image_trigger
    BEFORE INSERT OR UPDATE ON comic_books
    FOR EACH ROW
    EXECUTE FUNCTION validate_cover_image();

-- Check existing data
SELECT * FROM check_existing_binary_data();