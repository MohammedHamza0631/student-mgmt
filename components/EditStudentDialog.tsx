'use client';

import { useState, useEffect } from 'react';
import { useStudentStore } from '@/lib/store';
import { updateStudent } from '@/lib/api';
import { Student } from '@/types';
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
  const [name, setName] = useState(student?.name ?? '');
  const [cohort, setCohort] = useState(student?.cohort ?? 'AY 2024-25');
  const [class_, setClass] = useState('CBSE 9');
  const [courses, setCourses] = useState(student?.courses ?? {
    cbse9: { science: false, math: false },
    cbse10: { science: false, math: false }
  });
  const [status, setStatus] = useState<'active' | 'inactive'>(student?.status ?? 'active');
  const { students, setStudents } = useStudentStore();

  useEffect(() => {
    if (student) {
      setName(student.name);
      setCohort(student.cohort);
      setCourses(student.courses);
      setStatus(student.status);
    }
  }, [student]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    try {
      const updatedStudent = await updateStudent(student.id, {
        name,
        cohort,
        courses,
        status,
      });
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
          <div>
            <Label htmlFor="name">Student Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="space-y-4">
            <Label>CBSE 9 Courses</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cbse9-science"
                  checked={courses.cbse9.science}
                  onCheckedChange={(checked) =>
                    setCourses((prev) => ({
                      ...prev,
                      cbse9: { ...prev.cbse9, science: checked === true }
                    }))
                  }
                />
                <Label htmlFor="cbse9-science">CBSE 9 Science</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cbse9-math"
                  checked={courses.cbse9.math}
                  onCheckedChange={(checked) =>
                    setCourses((prev) => ({
                      ...prev,
                      cbse9: { ...prev.cbse9, math: checked === true }
                    }))
                  }
                />
                <Label htmlFor="cbse9-math">CBSE 9 Math</Label>
              </div>
            </div>
            <Label>CBSE 10 Courses</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cbse10-science"
                  checked={courses.cbse10.science}
                  onCheckedChange={(checked) =>
                    setCourses((prev) => ({
                      ...prev,
                      cbse10: { ...prev.cbse10, science: checked === true }
                    }))
                  }
                />
                <Label htmlFor="cbse10-science">CBSE 10 Science</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cbse10-math"
                  checked={courses.cbse10.math}
                  onCheckedChange={(checked) =>
                    setCourses((prev) => ({
                      ...prev,
                      cbse10: { ...prev.cbse10, math: checked === true }
                    }))
                  }
                />
                <Label htmlFor="cbse10-math">CBSE 10 Math</Label>
              </div>
            </div>
          </div>

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