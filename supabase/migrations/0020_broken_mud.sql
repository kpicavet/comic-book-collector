/*
  # Fix remaining 'very old' states

  1. Changes
    - Update any remaining records with 'very old' to 'versleten'
    - Add explicit type casting for safety
*/

BEGIN;
UPDATE comic_books 
SET 
  state = 'versleten'::comic_state,
  updated_at = CURRENT_TIMESTAMP
WHERE state::text LIKE 'very old';
COMMIT;