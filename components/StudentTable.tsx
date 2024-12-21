'use client';

import { useEffect, useState } from 'react';
import { useStudentStore } from '@/lib/store';
import { fetchStudents } from '@/lib/api';
import { Student } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Calculator } from 'lucide-react';
import { StudentActions } from './StudentActions';
import { EditStudentDialog } from './EditStudentDialog';

export function StudentTable() {
  const { students, setStudents } = useStudentStore();
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };
    loadStudents();
  }, [setStudents]);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Cohort</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Last login</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.cohort}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {student.courses.science && (
                    <Badge variant="secondary">
                      <BookOpen className="mr-1 h-3 w-3" />
                      CBSE 9 Science
                    </Badge>
                  )}
                  {student.courses.math && (
                    <Badge variant="secondary">
                      <Calculator className="mr-1 h-3 w-3" />
                      CBSE 9 Math
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{new Date(student.date_joined).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(student.last_login).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant={student.status === 'active' ? 'success' : 'destructive'}
                  className="capitalize"
                >
                  {student.status}
                </Badge>
              </TableCell>
              <TableCell>
                <StudentActions student={student} onEdit={handleEdit} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditStudentDialog
        student={editingStudent}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
}