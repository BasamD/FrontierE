/*
  # Add contact form settings

  1. New Tables
    - `contact_settings`
      - `id` (uuid, primary key)
      - `form_url` (text, Google Form URL)
      - `is_active` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `contact_settings` table
    - Add policies for public read and admin write access
*/

-- Contact Settings table
CREATE TABLE contact_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create partial unique index for single active contact settings
CREATE UNIQUE INDEX single_active_contact_settings ON contact_settings (is_active) WHERE (is_active = true);

-- Enable Row Level Security
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Allow public read access to contact_settings" ON contact_settings
  FOR SELECT TO public USING (true);

-- Admin write policy
CREATE POLICY "Allow authenticated users to manage contact_settings" ON contact_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert initial contact settings
INSERT INTO contact_settings (form_url)
VALUES ('https://docs.google.com/forms/d/e/1FAIpQLSfxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/viewform?embedded=true');