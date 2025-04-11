/*
  # Initial Schema Setup

  1. New Tables
    - business_info: Company contact details
    - sales: Estate sale listings
    - team_members: Staff profiles
    - social_links: Social media links
  
  2. Security
    - Enable RLS on all tables
    - Public read access
    - Authenticated users get full access
*/

-- Create enum for sale status
CREATE TYPE sale_status AS ENUM ('upcoming', 'active', 'completed');

-- Business Info table
CREATE TABLE business_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create partial unique index for single active business info
CREATE UNIQUE INDEX single_active_business_info ON business_info (is_active) WHERE (is_active = true);

-- Sales table
CREATE TABLE sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  dates text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  image_url text,
  status sale_status NOT NULL DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

-- Team Members table
CREATE TABLE team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Social Links table
CREATE TABLE social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  facebook text,
  instagram text,
  linkedin text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create partial unique index for single active social links
CREATE UNIQUE INDEX single_active_social_links ON social_links (is_active) WHERE (is_active = true);

-- Enable Row Level Security
ALTER TABLE business_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read access to business_info" ON business_info
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access to sales" ON sales
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access to team_members" ON team_members
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access to social_links" ON social_links
  FOR SELECT TO public USING (true);

-- Admin write policies
CREATE POLICY "Allow authenticated users to manage business_info" ON business_info
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage sales" ON sales
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage team_members" ON team_members
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage social_links" ON social_links
  FOR ALL TO authenticated USING (true) WITH CHECK (true);