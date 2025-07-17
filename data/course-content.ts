import { Lesson } from '@shared/types';
import { lesson1 } from './lessons/lesson-1';
import { lesson2 } from './lessons/lesson-2';
import { lesson3 } from './lessons/lesson-3';
import { lesson4 } from './lessons/lesson-4';

// Import additional lessons as they are created
// import { lesson5 } from './lessons/lesson-5';
// etc...

export async function getCourseContent(): Promise<Lesson[]> {
  // In the future, this could fetch from an API
  // For now, return our static lesson data
  return [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    // lesson5,
    // lesson6,
    // lesson7,
    // lesson8,
    // lesson9,
    // lesson10,
  ];
}

export const courseMetadata = {
  title: "AI-Native Change Agent",
  description: "Master the skills to lead successful AI transformations in your organization",
  totalLessons: 10,
  estimatedDuration: "8 hours",
};