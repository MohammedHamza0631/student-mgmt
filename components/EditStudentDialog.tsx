'use client';

import { useEffect } from 'react';
import { useStudentStore } from '@/lib/store';
import { updateStudent } from '@/lib/api';
import { Student } from '@/types';
import { useStudentForm } from '@/hooks/useStudentForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const COHORTS = ['AY 2024-25', 'AY 2023-24'];
const CLASSES = ['CBSE 9', 'CBSE 10'];

interface EditStudentDialogProps {
  student: Student | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditStudentDialog({
  student,
  open,
  onOpenChange,
}: EditStudentDialogProps) {
  const {
    name,
    setName,
    cohort,
    setCohort,
    class_,
    setClass,
    courses,
    setCourses,
    status,
    setStatus,
    formData
  } = useStudentForm(student || undefined);

  const { students, setStudents } = useStudentStore();

  useEffect(() => {
    if (student) {
      setName(student.name);
      setCohort(student.cohort);
      setCourses(student.courses);
      setStatus(student.status);
    }
  }, [student, setName, setCohort, setCourses, setStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    try {
      const updatedStudent = await updateStudent(student.id, formData);
      setStudents(
        students.map((s) => (s.id === student.id ? updatedStudent : s))
      );
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update student:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field */}
          <div>
            <Label htmlFor="name">Student Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Cohort field */}
          <div>
            <Label>Cohort</Label>
            <Select value={cohort} onValueChange={setCohort}>
              <SelectTrigger>
                <SelectValue placeholder="Select cohort" />
              </SelectTrigger>
              <SelectContent>
                {COHORTS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Class field */}
          <div>
            <Label>Class</Label>
            <Select value={class_} onValueChange={setClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {CLASSES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Courses section */}
          <div className="space-y-4">
            <Label>{class_} Courses</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${class_.toLowerCase()}-science`}
                  checked={class_ === 'CBSE 9' ? courses.cbse9.science : courses.cbse10.science}
                  onCheckedChange={(checked) =>
                    setCourses((prev) => ({
                      ...prev,
                      [class_ === 'CBSE 9' ? 'cbse9' : 'cbse10']: {
                        ...prev[class_ === 'CBSE 9' ? 'cbse9' : 'cbse10'],
                        science: checked === true
                      }
                    }))
                  }
                />
                <Label htmlFor={`${class_.toLowerCase()}-science`}>{class_} Science</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`${class_.toLowerCase()}-math`}
                  checked={class_ === 'CBSE 9' ? courses.cbse9.math : courses.cbse10.math}
                  onCheckedChange={(checked) =>
                    setCourses((prev) => ({
                      ...prev,
                      [class_ === 'CBSE 9' ? 'cbse9' : 'cbse10']: {
                        ...prev[class_ === 'CBSE 9' ? 'cbse9' : 'cbse10'],
                        math: checked === true
                      }
                    }))
                  }
                />
                <Label htmlFor={`${class_.toLowerCase()}-math`}>{class_} Math</Label>
              </div>
            </div>
          </div>

          {/* Status field */}
          <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={(value: 'active' | 'inactive') => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}