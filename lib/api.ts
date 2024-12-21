import { supabase } from './supabase';
import { Student } from '@/types';

export async function fetchStudents() {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function createStudent(student: Omit<Student, 'id'>) {
  const { data, error } = await supabase
    .from('students')
    .insert([student])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateStudent(id: string, student: Partial<Student>) {
  const { data, error } = await supabase
    .from('students')
    .update(student)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteStudent(id: string) {
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}