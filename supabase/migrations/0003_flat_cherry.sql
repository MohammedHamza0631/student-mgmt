/*
  # Remove all RLS policies from students table

  1. Changes
    - Drop all existing policies
    - Disable RLS on students table
  
  2. Security
    - Remove all RLS policies
    - Disable RLS completely
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow authenticated users to read students" ON students;
DROP POLICY IF EXISTS "Allow authenticated users to create students" ON students;
DROP POLICY IF EXISTS "Allow authenticated users to update students" ON students;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON students;

-- Disable RLS
ALTER TABLE students DISABLE ROW LEVEL SECURITY;