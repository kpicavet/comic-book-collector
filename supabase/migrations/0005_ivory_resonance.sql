/*
  # Add 'Niet in bezit' state to comic_state enum

  1. Changes
    - Add new state 'niet in bezit' to comic_state enum
    
  2. Notes
    - Using ALTER TYPE to add new enum value
    - Safe operation that doesn't affect existing data
*/

ALTER TYPE comic_state ADD VALUE IF NOT EXISTS 'niet in bezit';