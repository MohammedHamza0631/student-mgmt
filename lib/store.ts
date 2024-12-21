import { create } from 'zustand';
import { Student } from '@/types';

interface StudentStore {
  students: Student[];
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  updateStudent: (id: string, updatedStudent: Student) => void;
  deleteStudent: (id: string) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  setStudents: (students) => set({ students }),
  addStudent: (student) => 
    set((state) => ({ students: [...state.students, student] })),
  updateStudent: (id, updatedStudent) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === id ? updatedStudent : student
      ),
    })),
  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((student) => student.id !== id),
    })),
}));