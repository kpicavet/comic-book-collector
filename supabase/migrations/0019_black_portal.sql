/*
  # Update comic state from 'very old' to 'versleten'

  1. Changes
    - Add new state 'versleten' to comic_state enum
    - Update existing records with 'very old' to 'versleten'
*/

-- First transaction: Add new enum value
BEGIN;
ALTER TYPE comic_state ADD VALUE 'versleten';
COMMIT;

-- Second transaction: Update existing records
BEGIN;
UPDATE comic_books 
SET state = 'versleten'::comic_state
WHERE state = 'very old'::comic_state;
COMMIT;