'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StudentTable } from '@/components/StudentTable';
import { AddStudentDialog } from '@/components/AddStudentDialog';

export default function StudentDashboard() {
  const [selectedYear, setSelectedYear] = useState('AY 2024-25');
  const [selectedClass, setSelectedClass] = useState('CBSE 9');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
              <SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CBSE 9">CBSE 9</SelectItem>
              <SelectItem value="CBSE 10">CBSE 10</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AddStudentDialog />
      </div>
      <div className="overflow-x-auto">
        <StudentTable />
      </div>
    </div>
  );
}