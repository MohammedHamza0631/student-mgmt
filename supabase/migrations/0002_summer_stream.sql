/*
  # Fix RLS policies for students table

  1. Changes
    - Drop existing policies
    - Add new policies with proper authentication checks
    - Enable RLS on students table
  
  2. Security
    - Enable RLS
    - Add policies for CRUD operations
    - Ensure proper authentication checks
*/

-- First enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated users to read students" ON students;
DROP POLICY IF EXISTS "Allow authenticated users to create students" ON students;
DROP POLICY IF EXISTS "Allow authenticated users to update students" ON students;

-- Create new policies with proper authentication checks
CREATE POLICY "Enable read access for authenticated users"
ON students FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert access for authenticated users"
ON students FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
ON students FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users"
ON students FOR DELETE
TO authenticated
USING (true);