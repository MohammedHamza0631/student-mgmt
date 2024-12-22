'use client';

import { Badge } from '@/components/ui/badge';
import { BookOpen, Calculator } from 'lucide-react';
import { Student } from '@/types';

interface CoursesBadgesProps {
    courses: Student['courses'];
}

export function CoursesBadges({ courses }: CoursesBadgesProps) {
    return (
        <div className="flex flex-col gap-2">
            {/* CBSE 9 Courses */}
            <div className="flex flex-wrap gap-2">
                {courses.cbse9.science && (
                    <Badge variant="secondary">
                        <BookOpen className="mr-1 h-3 w-3" />
                        CBSE 9 Science
                    </Badge>
                )}
                {courses.cbse9.math && (
                    <Badge variant="secondary">
                        <Calculator className="mr-1 h-3 w-3" />
                        CBSE 9 Math
                    </Badge>
                )}
            </div>

            {/* CBSE 10 Courses */}
            <div className="flex flex-wrap gap-2">
                {courses.cbse10.science && (
                    <Badge variant="secondary">
                        <BookOpen className="mr-1 h-3 w-3" />
                        CBSE 10 Science
                    </Badge>
                )}
                {courses.cbse10.math && (
                    <Badge variant="secondary">
                        <Calculator className="mr-1 h-3 w-3" />
                        CBSE 10 Math
                    </Badge>
                )}
            </div>
        </div>
    );
}