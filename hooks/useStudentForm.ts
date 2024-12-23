'use client';

import { useState } from 'react';
import { Student } from '@/types';

export function useStudentForm(initialData?: Partial<Student>) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [cohort, setCohort] = useState(initialData?.cohort ?? 'AY 2024-25');
  const [class_, setClass] = useState('CBSE 9');
  const [courses, setCourses] = useState(initialData?.courses ?? {
    cbse9: { science: false, math: false },
    cbse10: { science: false, math: false }
  });
  const [status, setStatus] = useState<'active' | 'inactive'>(initialData?.status ?? 'active');

  // Reset other class's courses when class changes
  const handleClassChange = (newClass: string) => {
    setClass(newClass);
    setCourses(prev => ({
      cbse9: newClass === 'CBSE 9' ? prev.cbse9 : { science: false, math: false },
      cbse10: newClass === 'CBSE 10' ? prev.cbse10 : { science: false, math: false }
    }));
  };

  return {
    name,
    setName,
    cohort,
    setCohort,
    class_,
    setClass: handleClassChange,
    courses,
    setCourses,
    status,
    setStatus,
    formData: {
      name,
      cohort,
      courses,
      status
    }
  };
}