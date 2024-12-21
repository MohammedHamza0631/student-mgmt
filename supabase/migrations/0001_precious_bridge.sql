/*
  # Create students table and related schemas

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `cohort` (text)
      - `courses` (jsonb)
      - `date_joined` (timestamp)
      - `last_login` (timestamp)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `students` table
    - Add policies for authenticated users to:
      - Read all students
      - Create new students
      - Update existing students
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cohort text NOT NULL,
  courses jsonb NOT NULL DEFAULT '{"science": false, "math": false}',
  date_joined timestamp with time zone DEFAULT now(),
  last_login timestamp with time zone DEFAULT now(),
  status text NOT NULL DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read students"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to create students"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update students"
  ON students
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();