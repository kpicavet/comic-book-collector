/*
  # Replace 'old' state with 'oud'

  1. Changes
    - Add new state 'oud' to comic_state enum
    - Update existing records from 'old' to 'oud'
    - Update timestamps for changed records
*/

-- First transaction: Add new enum value
BEGIN;
ALTER TYPE comic_state ADD VALUE 'oud';
COMMIT;

-- Second transaction: Update existing records
BEGIN;
UPDATE comic_books 
SET 
  state = 'oud'::comic_state,
  updated_at = CURRENT_TIMESTAMP
WHERE state = 'old'::comic_state;
COMMIT;