CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cohort text NOT NULL,
  courses jsonb NOT NULL DEFAULT '{
  "cbse9": {
    "science": false,
    "math": false
  },
  "cbse10": {
    "science": false,
    "math": false
  }
}',
  date_joined timestamp with time zone DEFAULT now(),
  last_login timestamp with time zone DEFAULT now(),
  status text NOT NULL DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);
