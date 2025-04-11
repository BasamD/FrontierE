/*
  # Add contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `message` (text)
      - `read` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policies for public insert and admin read/write access
*/

-- Contact Messages table
CREATE TABLE contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public insert policy
CREATE POLICY "Allow public to insert contact messages" ON contact_messages
  FOR INSERT TO public
  WITH CHECK (true);

-- Admin read/write policy
CREATE POLICY "Allow authenticated users to manage contact messages" ON contact_messages
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);