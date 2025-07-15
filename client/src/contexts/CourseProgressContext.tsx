import React, { createContext, useContext, useState, useEffect } from "react";

export interface Exercise {
  id: string;
  type: "text" | "textarea" | "radio" | "checkbox" | "multi-step" | "radio-with-text";
  label: string;
  description?: string;
  options?: string[];
  answer?: string | string[];
  component?: string;
  followUpLabel?: string;
  followUpDescription?: string;
  followUpAnswer?: string;
}

export interface SubLesson {
  id: string;
  title: string;
  completed: boolean;
  exercises: Exercise[];
}

export interface Lesson {
  id: number;
  title: string;
  subLessons: SubLesson[];
}

interface CourseProgress {
  lessons: {
    [lessonId: number]: {
      subLessons: {
        [subLessonId: string]: {
          completed: boolean;
          exercises: {
            [exerciseId: string]: {
              answer: string | string[] | undefined;
              followUpAnswer?: string;
            };
          };
        };
      };
    };
  };
}

interface CourseProgressContextValue {
  progress: CourseProgress;
  updateExerciseAnswer: (
    lessonId: number,
    subLessonId: string,
    exerciseId: string,
    answer: string | string[] | undefined,
    followUpAnswer?: string
  ) => void;
  markSubLessonComplete: (lessonId: number, subLessonId: string) => void;
  getSubLessonProgress: (lessonId: number, subLessonId: string) => boolean;
  getExerciseAnswer: (
    lessonId: number,
    subLessonId: string,
    exerciseId: string
  ) => { answer: string | string[] | undefined; followUpAnswer?: string } | undefined;
  getOverallProgress: () => number;
  getLessonProgress: (lessonId: number) => number;
  exportProgress: () => void;
  importProgress: (data: string) => void;
  clearProgress: () => void;
}

const CourseProgressContext = createContext<CourseProgressContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "ai-change-agent-course-progress";

export function CourseProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<CourseProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Failed to parse saved progress:", error);
      }
    }
    return { lessons: {} };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateExerciseAnswer = (
    lessonId: number,
    subLessonId: string,
    exerciseId: string,
    answer: string | string[] | undefined,
    followUpAnswer?: string
  ) => {
    setProgress((prev) => ({
      ...prev,
      lessons: {
        ...prev.lessons,
        [lessonId]: {
          ...prev.lessons[lessonId],
          subLessons: {
            ...prev.lessons[lessonId]?.subLessons,
            [subLessonId]: {
              ...prev.lessons[lessonId]?.subLessons?.[subLessonId],
              completed: prev.lessons[lessonId]?.subLessons?.[subLessonId]?.completed || false,
              exercises: {
                ...prev.lessons[lessonId]?.subLessons?.[subLessonId]?.exercises,
                [exerciseId]: {
                  answer,
                  followUpAnswer,
                },
              },
            },
          },
        },
      },
    }));
  };

  const markSubLessonComplete = (lessonId: number, subLessonId: string) => {
    setProgress((prev) => ({
      ...prev,
      lessons: {
        ...prev.lessons,
        [lessonId]: {
          ...prev.lessons[lessonId],
          subLessons: {
            ...prev.lessons[lessonId]?.subLessons,
            [subLessonId]: {
              ...prev.lessons[lessonId]?.subLessons?.[subLessonId],
              completed: true,
              exercises: prev.lessons[lessonId]?.subLessons?.[subLessonId]?.exercises || {},
            },
          },
        },
      },
    }));
  };

  const getSubLessonProgress = (lessonId: number, subLessonId: string): boolean => {
    return progress.lessons[lessonId]?.subLessons?.[subLessonId]?.completed || false;
  };

  const getExerciseAnswer = (
    lessonId: number,
    subLessonId: string,
    exerciseId: string
  ) => {
    return progress.lessons[lessonId]?.subLessons?.[subLessonId]?.exercises?.[exerciseId];
  };

  const getOverallProgress = (): number => {
    // This will be calculated based on actual course content when loaded
    return 0;
  };

  const getLessonProgress = (lessonId: number): number => {
    // This will be calculated based on actual lesson content when loaded
    return 0;
  };

  const exportProgress = () => {
    const dataStr = JSON.stringify(progress, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `ai-change-agent-progress-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importProgress = (data: string) => {
    try {
      const parsed = JSON.parse(data);
      setProgress(parsed);
    } catch (error) {
      console.error("Failed to import progress:", error);
      throw new Error("Invalid progress data format");
    }
  };

  const clearProgress = () => {
    if (window.confirm("Are you sure you want to clear all progress? This cannot be undone.")) {
      setProgress({ lessons: {} });
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  return (
    <CourseProgressContext.Provider
      value={{
        progress,
        updateExerciseAnswer,
        markSubLessonComplete,
        getSubLessonProgress,
        getExerciseAnswer,
        getOverallProgress,
        getLessonProgress,
        exportProgress,
        importProgress,
        clearProgress,
      }}
    >
      {children}
    </CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const context = useContext(CourseProgressContext);
  if (context === undefined) {
    throw new Error("useCourseProgress must be used within a CourseProgressProvider");
  }
  return context;
}