'use client';

import { useState } from 'react';
import { useStudentStore } from '@/lib/store';
import { createStudent } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const COHORTS = ['AY 2024-25', 'AY 2023-24'];
const CLASSES = ['CBSE 9', 'CBSE 10'];

export function AddStudentDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [cohort, setCohort] = useState('AY 2024-25');
  const [class_, setClass] = useState('CBSE 9');
  const [courses, setCourses] = useState({
    cbse9: { science: false, math: false },
    cbse10: { science: false, math: false }
  });

  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const addStudent = useStudentStore((state) => state.addStudent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newStudent = await createStudent({
        name,
        cohort,
        courses,
        date_joined: new Date().toISOString(),
        last_login: new Date().toISOString(),
        status,
      });
      addStudent(newStudent);
      setOpen(false);
      setName('');
      setCourses({
        cbse9: { science: false, math: false },
        cbse10: { science: false, math: false }
      });

    } catch (error) {
      console.error('Failed to create student:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-zinc-600 hover:bg-zinc-900">
          <Plus className="mr-2 h-4 w-4" /> Add new Student
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
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

          <Button type="submit" className="w-full">Add Student</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}