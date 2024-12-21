export interface Student {
  id: string;
  name: string;
  cohort: string;
  courses: {
    science: boolean;
    math: boolean;
  };
  date_joined: string;
  last_login: string;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface Course {
  id: string;
  name: string;
  icon: string;
}