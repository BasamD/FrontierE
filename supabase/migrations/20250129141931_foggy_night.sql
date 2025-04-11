/*
  # Add initial business and social data

  1. New Data
    - Add initial business info record
    - Add initial social links record
  
  2. Changes
    - Insert default business contact information
    - Insert default social media links
*/

-- Insert initial business info
INSERT INTO business_info (address, phone, email, is_active)
VALUES (
  '123 Frontier Way, Western Springs, CO 80123',
  '(555) 123-4567',
  'info@frontierestate.com',
  true
);

-- Insert initial social links
INSERT INTO social_links (facebook, instagram, linkedin, is_active)
VALUES (
  'https://facebook.com/frontierestate',
  'https://instagram.com/frontierestate',
  'https://linkedin.com/company/frontierestate',
  true
);