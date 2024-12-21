'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useStudentStore } from '@/lib/store';
import { deleteStudent, updateStudent } from '@/lib/api';
import { Student } from '@/types';

interface StudentActionsProps {
  student: Student;
  onEdit: (student: Student) => void;
}

export function StudentActions({ student, onEdit }: StudentActionsProps) {
  const { students, setStudents } = useStudentStore();

  const handleDelete = async () => {
    try {
      await deleteStudent(student.id);
      setStudents(students.filter((s) => s.id !== student.id));
    } catch (error) {
      console.error('Failed to delete student:', error);
    }
  };

  const handleStatusToggle = async () => {
    try {
      const updatedStudent = await updateStudent(student.id, {
        status: student.status === 'active' ? 'inactive' : 'active',
      });
      setStudents(
        students.map((s) => (s.id === student.id ? updatedStudent : s))
      );
    } catch (error) {
      console.error('Failed to update student status:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(student)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleStatusToggle}>
          {student.status === 'active' ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}