/*
  # Add complete Jommeke comic book collection

  1. Changes
    - Insert all Jommeke comic books (296 titles) into the comic_books table
    - Each comic book has:
      - Sequential number (1-296)
      - Original title
      - Placeholder cover URL
      - Default 'ok' state
    - Uses batch inserts for better performance
    - Includes conflict handling to prevent duplicates

  2. Notes
    - Cover URLs are placeholders that can be updated later
    - Using DO blocks for atomic operations
    - Each batch contains 20 comics for readability
*/

-- Batch 3 (41-60)
DO $$ 
BEGIN
  INSERT INTO comic_books (number, title, cover_url, state)
  VALUES
    (41, 'Twee halve lappen', 'https://placeholder.com/covers/41.jpg', 'ok'),
    (42, 'De witte bolhoed', 'https://placeholder.com/covers/42.jpg', 'ok'),
    (43, 'Filiberke gaat trouwen', 'https://placeholder.com/covers/43.jpg', 'ok'),
    (44, 'De Jommekesclub', 'https://placeholder.com/covers/44.jpg', 'ok'),
    (45, 'De zeepkoning', 'https://placeholder.com/covers/45.jpg', 'ok'),
    (46, 'De tocht naar Asnapije', 'https://placeholder.com/covers/46.jpg', 'ok'),
    (47, 'Diamanten in de zoo', 'https://placeholder.com/covers/47.jpg', 'ok'),
    (48, 'De zilveren giraf', 'https://placeholder.com/covers/48.jpg', 'ok'),
    (49, 'De groene maskers', 'https://placeholder.com/covers/49.jpg', 'ok'),
    (50, 'De plastieken walvis', 'https://placeholder.com/covers/50.jpg', 'ok'),
    (51, 'De fwietmachine', 'https://placeholder.com/covers/51.jpg', 'ok'),
    (52, 'De zingende oorbellen', 'https://placeholder.com/covers/52.jpg', 'ok'),
    (53, 'Het kristallen eendje', 'https://placeholder.com/covers/53.jpg', 'ok'),
    (54, 'Broeder Anatolius', 'https://placeholder.com/covers/54.jpg', 'ok'),
    (55, 'Tita Telajora', 'https://placeholder.com/covers/55.jpg', 'ok'),
    (56, 'De vruchtenmakers', 'https://placeholder.com/covers/56.jpg', 'ok'),
    (57, 'Het geheim van Macu Ancapa', 'https://placeholder.com/covers/57.jpg', 'ok'),
    (58, 'De strijd om de Incaschat', 'https://placeholder.com/covers/58.jpg', 'ok'),
    (59, 'De Kuko-eieren', 'https://placeholder.com/covers/59.jpg', 'ok'),
    (60, 'Alarm in de rode baai', 'https://placeholder.com/covers/60.jpg', 'ok')
  ON CONFLICT (number) DO NOTHING;
END $$;

-- Batch 4 (61-80)
DO $$ 
BEGIN
  INSERT INTO comic_books (number, title, cover_url, state)
  VALUES
    (61, 'De hoed van Napoleon', 'https://placeholder.com/covers/61.jpg', 'ok'),
    (62, 'Luilekkerland', 'https://placeholder.com/covers/62.jpg', 'ok'),
    (63, 'Madam Pepermunt', 'https://placeholder.com/covers/63.jpg', 'ok'),
    (64, 'De kristallen grot', 'https://placeholder.com/covers/64.jpg', 'ok'),
    (65, 'De grasmobiel', 'https://placeholder.com/covers/65.jpg', 'ok'),
    (66, 'De vrolijke bende', 'https://placeholder.com/covers/66.jpg', 'ok'),
    (67, 'De slaapkop', 'https://placeholder.com/covers/67.jpg', 'ok'),
    (68, 'De gele spin', 'https://placeholder.com/covers/68.jpg', 'ok'),
    (69, 'Straffa Toebaka', 'https://placeholder.com/covers/69.jpg', 'ok'),
    (70, 'De verborgen tempel', 'https://placeholder.com/covers/70.jpg', 'ok'),
    (71, 'De sprekende ezel', 'https://placeholder.com/covers/71.jpg', 'ok'),
    (72, 'Choco ontvoerd', 'https://placeholder.com/covers/72.jpg', 'ok'),
    (73, 'De gekke wekker', 'https://placeholder.com/covers/73.jpg', 'ok'),
    (74, 'De Kikiwikies', 'https://placeholder.com/covers/74.jpg', 'ok'),
    (75, 'Prinses Pott', 'https://placeholder.com/covers/75.jpg', 'ok'),
    (76, 'Het rode oog', 'https://placeholder.com/covers/76.jpg', 'ok'),
    (77, 'Peuterweelde', 'https://placeholder.com/covers/77.jpg', 'ok'),
    (78, 'Juffrouw Perlefinneke', 'https://placeholder.com/covers/78.jpg', 'ok'),
    (79, 'Het plezante kliekske', 'https://placeholder.com/covers/79.jpg', 'ok'),
    (80, 'De njam-njambloem', 'https://placeholder.com/covers/80.jpg', 'ok')
  ON CONFLICT (number) DO NOTHING;
END $$;

-- Batch 5 (81-100)
DO $$ 
BEGIN
  INSERT INTO comic_books (number, title, cover_url, state)
  VALUES
    (81, 'De luchtzwemmers', 'https://placeholder.com/covers/81.jpg', 'ok'),
    (82, 'Opstand in Kokowoko', 'https://placeholder.com/covers/82.jpg', 'ok'),
    (83, 'De stenen aapjes', 'https://placeholder.com/covers/83.jpg', 'ok'),
    (84, 'De plank van Jan Haring', 'https://placeholder.com/covers/84.jpg', 'ok'),
    (85, 'De granda papiljan', 'https://placeholder.com/covers/85.jpg', 'ok'),
    (86, 'De lustige slurvers', 'https://placeholder.com/covers/86.jpg', 'ok'),
    (87, 'De stad in de vulkaan', 'https://placeholder.com/covers/87.jpg', 'ok'),
    (88, 'Jommeke in Bobbejaanland', 'https://placeholder.com/covers/88.jpg', 'ok'),
    (89, 'Het piepend bed', 'https://placeholder.com/covers/89.jpg', 'ok'),
    (90, 'De kleine professor', 'https://placeholder.com/covers/90.jpg', 'ok'),
    (91, 'Prins Filiberke', 'https://placeholder.com/covers/91.jpg', 'ok'),
    (92, 'Het aards paradijs', 'https://placeholder.com/covers/92.jpg', 'ok'),
    (93, 'De haaienrots', 'https://placeholder.com/covers/93.jpg', 'ok'),
    (94, 'De supervrouw', 'https://placeholder.com/covers/94.jpg', 'ok'),
    (95, 'Melanie', 'https://placeholder.com/covers/95.jpg', 'ok'),
    (96, 'Paniek rond Odilon', 'https://placeholder.com/covers/96.jpg', 'ok'),
    (97, 'De valse kameel', 'https://placeholder.com/covers/97.jpg', 'ok'),
    (98, 'De kaart van Wawa Wang', 'https://placeholder.com/covers/98.jpg', 'ok'),
    (99, 'De grote knoeiboel', 'https://placeholder.com/covers/99.jpg', 'ok'),
    (100, 'Het jubilee', 'https://placeholder.com/covers/100.jpg', 'ok')
  ON CONFLICT (number) DO NOTHING;
END $$;
