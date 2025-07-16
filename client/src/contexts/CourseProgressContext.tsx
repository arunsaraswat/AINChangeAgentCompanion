import React, { createContext, useContext, useState, useEffect } from "react";
import type { Exercise } from "@shared/types";

export { Exercise };

interface CourseProgress {
  lessons: {
    [lessonId: number]: {
      activities?: {
        [activityId: string]: {
          completed: boolean;
          exercises: {
            [exerciseId: string]: {
              answer: string | string[] | undefined;
              followUpAnswer?: string;
              stepAnswers?: {
                [stepId: string]: string | string[] | undefined;
              };
            };
          };
        };
      };
      subLessons?: {
        [subLessonId: string]: {
          completed: boolean;
          activities?: {
            [activityId: string]: {
              completed: boolean;
              exercises: {
                [exerciseId: string]: {
                  answer: string | string[] | undefined;
                  followUpAnswer?: string;
                  stepAnswers?: {
                    [stepId: string]: string | string[] | undefined;
                  };
                };
              };
            };
          };
          exercises?: {
            [exerciseId: string]: {
              answer: string | string[] | undefined;
              followUpAnswer?: string;
              stepAnswers?: {
                [stepId: string]: string | string[] | undefined;
              };
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
  updateFollowUpAnswer: (
    lessonId: number,
    subLessonId: string,
    exerciseId: string,
    followUpAnswer: string
  ) => void;
  updateStepAnswer: (
    lessonId: number,
    subLessonId: string,
    exerciseId: string,
    stepId: string,
    answer: string | string[] | undefined
  ) => void;
  markSubLessonComplete: (lessonId: number, subLessonId: string) => void;
  markActivityComplete: (lessonId: number, activityId: string, subLessonId?: string) => void;
  markActivityIncomplete: (lessonId: number, activityId: string, subLessonId?: string) => void;
  getSubLessonProgress: (lessonId: number, subLessonId: string) => boolean;
  getActivityProgress: (lessonId: number, activityId: string, subLessonId?: string) => boolean;
  getExerciseAnswer: (
    lessonId: number,
    subLessonId: string,
    exerciseId: string
  ) => { answer: string | string[] | undefined; followUpAnswer?: string; stepAnswers?: { [stepId: string]: string | string[] | undefined } } | undefined;
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
    setProgress((prev) => {
      // Check if this is an activity ID or sub-lesson ID
      if (subLessonId.startsWith('activity-')) {
        // Direct activity under lesson
        return {
          ...prev,
          lessons: {
            ...prev.lessons,
            [lessonId]: {
              ...prev.lessons[lessonId],
              activities: {
                ...prev.lessons[lessonId]?.activities,
                [subLessonId]: {
                  ...prev.lessons[lessonId]?.activities?.[subLessonId],
                  completed: prev.lessons[lessonId]?.activities?.[subLessonId]?.completed || false,
                  exercises: {
                    ...prev.lessons[lessonId]?.activities?.[subLessonId]?.exercises,
                    [exerciseId]: {
                      answer,
                      followUpAnswer,
                    },
                  },
                },
              },
            },
          },
        };
      } else {
        // Traditional sub-lesson
        return {
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
        };
      }
    });
  };

  const updateFollowUpAnswer = (
    lessonId: number,
    subLessonId: string,
    exerciseId: string,
    followUpAnswer: string
  ) => {
    setProgress((prev) => {
      if (subLessonId.startsWith('activity-')) {
        return {
          ...prev,
          lessons: {
            ...prev.lessons,
            [lessonId]: {
              ...prev.lessons[lessonId],
              activities: {
                ...prev.lessons[lessonId]?.activities,
                [subLessonId]: {
                  ...prev.lessons[lessonId]?.activities?.[subLessonId],
                  completed: prev.lessons[lessonId]?.activities?.[subLessonId]?.completed || false,
                  exercises: {
                    ...prev.lessons[lessonId]?.activities?.[subLessonId]?.exercises,
                    [exerciseId]: {
                      ...prev.lessons[lessonId]?.activities?.[subLessonId]?.exercises?.[exerciseId],
                      followUpAnswer,
                    },
                  },
                },
              },
            },
          },
        };
      } else {
        return {
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
                      ...prev.lessons[lessonId]?.subLessons?.[subLessonId]?.exercises?.[exerciseId],
                      followUpAnswer,
                    },
                  },
                },
              },
            },
          },
        };
      }
    });
  };

  const updateStepAnswer = (
    lessonId: number,
    subLessonId: string,
    exerciseId: string,
    stepId: string,
    answer: string | string[] | undefined
  ) => {
    setProgress((prev) => {
      if (subLessonId.startsWith('activity-')) {
        return {
          ...prev,
          lessons: {
            ...prev.lessons,
            [lessonId]: {
              ...prev.lessons[lessonId],
              activities: {
                ...prev.lessons[lessonId]?.activities,
                [subLessonId]: {
                  ...prev.lessons[lessonId]?.activities?.[subLessonId],
                  completed: prev.lessons[lessonId]?.activities?.[subLessonId]?.completed || false,
                  exercises: {
                    ...prev.lessons[lessonId]?.activities?.[subLessonId]?.exercises,
                    [exerciseId]: {
                      ...prev.lessons[lessonId]?.activities?.[subLessonId]?.exercises?.[exerciseId],
                      stepAnswers: {
                        ...prev.lessons[lessonId]?.activities?.[subLessonId]?.exercises?.[exerciseId]?.stepAnswers,
                        [stepId]: answer,
                      },
                    },
                  },
                },
              },
            },
          },
        };
      } else {
        return {
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
                      ...prev.lessons[lessonId]?.subLessons?.[subLessonId]?.exercises?.[exerciseId],
                      stepAnswers: {
                        ...prev.lessons[lessonId]?.subLessons?.[subLessonId]?.exercises?.[exerciseId]?.stepAnswers,
                        [stepId]: answer,
                      },
                    },
                  },
                },
              },
            },
          },
        };
      }
    });
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

  const markActivityComplete = (lessonId: number, activityId: string, subLessonId?: string) => {
    setProgress((prev) => {
      if (subLessonId) {
        // Activity within a sub-lesson
        return {
          ...prev,
          lessons: {
            ...prev.lessons,
            [lessonId]: {
              ...prev.lessons[lessonId],
              subLessons: {
                ...prev.lessons[lessonId]?.subLessons,
                [subLessonId]: {
                  ...prev.lessons[lessonId]?.subLessons?.[subLessonId],
                  activities: {
                    ...prev.lessons[lessonId]?.subLessons?.[subLessonId]?.activities,
                    [activityId]: {
                      ...prev.lessons[lessonId]?.subLessons?.[subLessonId]?.activities?.[activityId],
                      completed: true,
                      exercises: prev.lessons[lessonId]?.subLessons?.[subLessonId]?.activities?.[activityId]?.exercises || {},
                    },
                  },
                },
              },
            },
          },
        };
      } else {
        // Direct activity under lesson
        return {
          ...prev,
          lessons: {
            ...prev.lessons,
            [lessonId]: {
              ...prev.lessons[lessonId],
              activities: {
                ...prev.lessons[lessonId]?.activities,
                [activityId]: {
                  ...prev.lessons[lessonId]?.activities?.[activityId],
                  completed: true,
                  exercises: prev.lessons[lessonId]?.activities?.[activityId]?.exercises || {},
                },
              },
            },
          },
        };
      }
    });
  };

  const markActivityIncomplete = (lessonId: number, activityId: string, subLessonId?: string) => {
    setProgress((prev) => {
      if (subLessonId) {
        // Activity within a sub-lesson
        return {
          ...prev,
          lessons: {
            ...prev.lessons,
            [lessonId]: {
              ...prev.lessons[lessonId],
              subLessons: {
                ...prev.lessons[lessonId]?.subLessons,
                [subLessonId]: {
                  ...prev.lessons[lessonId]?.subLessons?.[subLessonId],
                  activities: {
                    ...prev.lessons[lessonId]?.subLessons?.[subLessonId]?.activities,
                    [activityId]: {
                      ...prev.lessons[lessonId]?.subLessons?.[subLessonId]?.activities?.[activityId],
                      completed: false,
                      exercises: prev.lessons[lessonId]?.subLessons?.[subLessonId]?.activities?.[activityId]?.exercises || {},
                    },
                  },
                },
              },
            },
          },
        };
      } else {
        // Direct activity under lesson
        return {
          ...prev,
          lessons: {
            ...prev.lessons,
            [lessonId]: {
              ...prev.lessons[lessonId],
              activities: {
                ...prev.lessons[lessonId]?.activities,
                [activityId]: {
                  ...prev.lessons[lessonId]?.activities?.[activityId],
                  completed: false,
                  exercises: prev.lessons[lessonId]?.activities?.[activityId]?.exercises || {},
                },
              },
            },
          },
        };
      }
    });
  };

  const getSubLessonProgress = (lessonId: number, subLessonId: string) => {
    return progress.lessons[lessonId]?.subLessons?.[subLessonId]?.completed || false;
  };

  const getActivityProgress = (lessonId: number, activityId: string, subLessonId?: string) => {
    if (subLessonId) {
      return progress.lessons[lessonId]?.subLessons?.[subLessonId]?.activities?.[activityId]?.completed || false;
    } else {
      return progress.lessons[lessonId]?.activities?.[activityId]?.completed || false;
    }
  };

  const getExerciseAnswer = (
    lessonId: number,
    subLessonId: string,
    exerciseId: string
  ) => {
    if (subLessonId.startsWith('activity-')) {
      return progress.lessons[lessonId]?.activities?.[subLessonId]?.exercises?.[exerciseId];
    } else {
      return progress.lessons[lessonId]?.subLessons?.[subLessonId]?.exercises?.[exerciseId];
    }
  };

  const getOverallProgress = () => {
    const totalLessons = 10; // This should be dynamic based on actual lesson count
    const completedSubLessons = Object.values(progress.lessons).reduce((total, lesson) => {
      const subLessonsCount = lesson.subLessons 
        ? Object.values(lesson.subLessons).filter((sl) => sl.completed).length
        : 0;
      const activitiesCount = lesson.activities
        ? Object.values(lesson.activities).filter((a) => a.completed).length
        : 0;
      return total + subLessonsCount + activitiesCount;
    }, 0);
    
    // This is a simplified calculation - you might want to adjust based on total sub-lessons/activities
    const averageSubLessonsPerLesson = 4;
    return Math.round((completedSubLessons / (totalLessons * averageSubLessonsPerLesson)) * 100);
  };

  const getLessonProgress = (lessonId: number) => {
    const lesson = progress.lessons[lessonId];
    if (!lesson) return 0;

    // For lesson 1, we know it has 4 activities
    if (lessonId === 1) {
      const totalActivities = 4;
      const completedActivities = lesson.activities ? Object.values(lesson.activities).filter((a) => a.completed).length : 0;
      return Math.round((completedActivities / totalActivities) * 100);
    }

    // For other lessons with sub-lessons (future implementation)
    if (lesson.subLessons) {
      const totalSubLessons = Object.keys(lesson.subLessons).length;
      if (totalSubLessons === 0) return 0;
      const completedSubLessons = Object.values(lesson.subLessons).filter((sl) => sl.completed).length;
      return Math.round((completedSubLessons / totalSubLessons) * 100);
    }

    return 0;
  };

  const exportProgress = () => {
    const dataStr = JSON.stringify(progress, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `ai-change-agent-progress-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importProgress = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      setProgress(parsedData);
    } catch (error) {
      console.error("Failed to import progress:", error);
      alert("Failed to import progress. Please check the file format.");
    }
  };

  const clearProgress = () => {
    if (confirm("Are you sure you want to clear all progress? This cannot be undone.")) {
      setProgress({ lessons: {} });
    }
  };

  return (
    <CourseProgressContext.Provider
      value={{
        progress,
        updateExerciseAnswer,
        updateFollowUpAnswer,
        updateStepAnswer,
        markSubLessonComplete,
        markActivityComplete,
        markActivityIncomplete,
        getSubLessonProgress,
        getActivityProgress,
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
  if (!context) {
    throw new Error("useCourseProgress must be used within CourseProgressProvider");
  }
  return context;
}