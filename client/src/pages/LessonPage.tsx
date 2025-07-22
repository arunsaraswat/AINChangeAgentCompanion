import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, CheckCircle, RotateCcw } from "lucide-react";
import ExerciseForm from "@/components/ExerciseForm";
import ActivityNav from "@/components/ActivityNav";
import { useCourseProgress } from "@/contexts/CourseProgressContext";
import ContentService from "../../../data/services/ContentService";
import type { Lesson, SubLesson, Activity, Exercise, ExerciseStep } from "@shared/types";

interface LessonPageProps {
  lessonId: number;
  subLessonId?: string;
  activityId?: string;
}

export default function LessonPage({ lessonId, subLessonId, activityId }: LessonPageProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentSubLesson, setCurrentSubLesson] = useState<SubLesson | null>(null);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const { 
    getSubLessonProgress, 
    markSubLessonComplete, 
    getActivityProgress,
    markActivityComplete,
    markActivityIncomplete,
    getExerciseAnswer 
  } = useCourseProgress();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const loadLesson = async () => {
      try {
        setLoading(true);
        const lessonData = await ContentService.getLesson(lessonId);
        
        if (lessonData) {
          setLesson(lessonData);
          
          // Handle navigation based on lesson structure
          // Prioritize sub-lessons over direct activities
          if (lessonData.subLessons) {
            // Sub-lessons structure
            if (!subLessonId && !activityId && lessonData.subLessons.length > 0) {
              // No sub-lesson or activity specified, go to first sub-lesson
              setLocation(`/lesson/${lessonId}/${lessonData.subLessons[0].id}`);
              return;
            }
            
            // Check if we're viewing a direct activity (reflection)
            if (!subLessonId && activityId && lessonData.activities) {
              const activity = lessonData.activities.find(a => a.id === activityId);
              if (activity) {
                setCurrentActivity(mergeActivityWithAnswers(activity, lessonId, null, activityId));
                return;
              }
            }
            
            // Find current sub-lesson
            const subLesson = lessonData.subLessons.find(sl => sl.id === subLessonId);
            if (subLesson) {
              setCurrentSubLesson(subLesson);
              
              // If sub-lesson has activities
              if (subLesson.activities && subLesson.activities.length > 0) {
                if (!activityId) {
                  setLocation(`/lesson/${lessonId}/${subLessonId}/activity/${subLesson.activities[0].id}`);
                  return;
                }
                
                const activity = subLesson.activities.find(a => a.id === activityId);
                if (activity) {
                  setCurrentActivity(mergeActivityWithAnswers(activity, lessonId, subLessonId, activityId));
                }
              }
            }
          } else if (lessonData.activities) {
            // Direct activities under lesson (only if no sub-lessons)
            if (!activityId && lessonData.activities.length > 0) {
              setLocation(`/lesson/${lessonId}/activity/${lessonData.activities[0].id}`);
              return;
            }
            
            // Find current activity
            const activity = lessonData.activities.find(a => a.id === activityId);
            if (activity) {
              setCurrentActivity(mergeActivityWithAnswers(activity, lessonId, null, activityId));
            }
          }
        } else {
          // Reset state when lesson doesn't exist
          setLesson(null);
          setCurrentSubLesson(null);
          setCurrentActivity(null);
        }
      } catch (error) {
        console.error("Failed to load lesson:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId, subLessonId, activityId, setLocation]);

  // Helper function to merge saved answers with activity
  const mergeActivityWithAnswers = (
    activity: Activity, 
    lessonId: number, 
    subLessonId: string | null, 
    activityId: string
  ): Activity => {
    return {
      ...activity,
      exercises: activity.exercises?.map((exercise: Exercise) => {
        const savedAnswer = getExerciseAnswer(lessonId, subLessonId || activityId, exercise.id);
        return {
          ...exercise,
          answer: savedAnswer?.answer || exercise.answer,
          followUpAnswer: savedAnswer?.followUpAnswer || exercise.followUpAnswer,
          steps: exercise.steps?.map((step: ExerciseStep) => {
            const stepAnswer = savedAnswer?.stepAnswers?.[step.id];
            return {
              ...step,
              answer: stepAnswer || step.answer,
            };
          }),
        };
      }) || [],
    };
  };

  const handleCompleteActivity = () => {
    if (currentActivity && lesson) {
      if (lesson.activities && !subLessonId) {
        // Direct activities
        markActivityComplete(lessonId, currentActivity.id);
        
        const currentIndex = lesson.activities.findIndex(a => a.id === currentActivity.id);
        if (currentIndex < lesson.activities.length - 1) {
          const nextActivity = lesson.activities[currentIndex + 1];
          setLocation(`/lesson/${lessonId}/activity/${nextActivity.id}`);
        } else {
          setLocation("/");
        }
      } else if (currentSubLesson) {
        // Activities within sub-lesson
        markActivityComplete(lessonId, currentActivity.id, subLessonId!);
        
        const currentIndex = currentSubLesson.activities.findIndex(a => a.id === currentActivity.id);
        if (currentIndex < currentSubLesson.activities.length - 1) {
          const nextActivity = currentSubLesson.activities[currentIndex + 1];
          setLocation(`/lesson/${lessonId}/${subLessonId}/activity/${nextActivity.id}`);
        } else {
          // Mark sub-lesson as complete when all activities are done
          markSubLessonComplete(lessonId, subLessonId!);
          
          // Navigate to next sub-lesson or reflection activity
          const subLessonIndex = lesson.subLessons!.findIndex(sl => sl.id === subLessonId);
          if (subLessonIndex < lesson.subLessons!.length - 1) {
            const nextSubLesson = lesson.subLessons![subLessonIndex + 1];
            setLocation(`/lesson/${lessonId}/${nextSubLesson.id}`);
          } else if (lesson.activities && lesson.activities.length > 0) {
            // All sub-lessons complete, go to reflection
            setLocation(`/lesson/${lessonId}/activity/${lesson.activities[0].id}`);
          } else {
            setLocation("/");
          }
        }
      }
    }
  };

  const handleMarkIncomplete = () => {
    if (currentActivity && lesson) {
      markActivityIncomplete(lessonId, currentActivity.id, subLessonId);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lesson content...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    // Show coming soon message for lessons that don't exist yet
    const lessonTitles: { [key: number]: string } = {
      1: "AI Opportunity Blind Spots",
      2: "Advancing AI Fluency",
      3: "Using Expert Facilitation to Guide Successful AI Solutions",
      4: "Creating the Stakeholder Map and Workshop Charter",
      5: "From Signals to Entry Points",
      6: "Facilitating The AI-Native Value Workshop",
      7: "Wrapping Up the Workshop: Defining the Implementation Roadmap",
      8: "Guiding Successful Implementations",
      9: "Scaling Success by Storytelling",
      10: "Expanding Your Impact",
    };

    return (
      <div className="max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">
              Lesson {lessonId}: {lessonTitles[lessonId] || "Unknown Lesson"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg text-muted-foreground mb-6">
              <p className="mb-4">This lesson is coming soon!</p>
              <p>We're working hard to bring you the best content for your AI transformation journey.</p>
            </div>
            <Link href="/">
              <Button size="lg">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render content based on lesson structure
  // Prioritize sub-lessons over direct activities for display
  if (lesson.subLessons && (!activityId || subLessonId)) {
    // Sub-lesson based structure
    if (!currentSubLesson) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Sub-lesson not found</h2>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      );
    }

    // Check if all sub-lessons are complete to show reflection
    const allSubLessonsComplete = lesson.subLessons.every(sl => 
      getSubLessonProgress(lessonId, sl.id)
    );
    
    // If all sub-lessons are complete and we have reflection activities, redirect to first reflection
    if (allSubLessonsComplete && lesson.activities && lesson.activities.length > 0 && !activityId && !subLessonId) {
      setLocation(`/lesson/${lessonId}/activity/${lesson.activities[0].id}`);
      return null;
    }

    // Render sub-lesson with activities
    if (currentSubLesson.activities && currentActivity) {
      const completedActivities = new Set(
        currentSubLesson.activities
          .filter(a => getActivityProgress(lessonId, a.id, currentSubLesson.id))
          .map(a => a.id)
      );

      return (
        <div className="max-w-4xl">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">
                Lesson {lessonId}: {lesson.title}
              </h1>
              <p className="text-muted-foreground">
                {lesson.description}
              </p>
            </div>

            {/* Sub-lesson navigation with flow arrows */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {lesson.subLessons.map((subLesson, index) => {
                const isActive = subLesson.id === currentSubLesson.id;
                const isSubCompleted = getSubLessonProgress(lessonId, subLesson.id);
                
                return (
                  <React.Fragment key={subLesson.id}>
                    <Link href={`/lesson/${lessonId}/${subLesson.id}`}>
                      <Button
                        variant={isActive ? "default" : "outline"}
                        className="justify-start relative"
                      >
                        {isSubCompleted && (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        )}
                        <span className="truncate">{subLesson.id}: {subLesson.title}</span>
                      </Button>
                    </Link>
                    {index < lesson.subLessons.length - 1 && (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </React.Fragment>
                );
              })}
              {/* Show reflection link */}
              {lesson.activities && lesson.activities.length > 0 && (
                <>
                  {lesson.subLessons.length > 0 && (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                  <Link href={`/lesson/${lessonId}/activity/${lesson.activities[0].id}`}>
                    <Button
                      variant={allSubLessonsComplete ? "outline" : "ghost"}
                      className="justify-start relative"
                      disabled={!allSubLessonsComplete}
                    >
                      {allSubLessonsComplete && (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      )}
                      Reflection
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Visual separator */}
            <hr className="mb-6 border-t border-gray-200 dark:border-gray-700" />

            {/* Activity navigation within sub-lesson */}
            <ActivityNav
              activities={currentSubLesson.activities}
              currentActivityId={currentActivity.id}
              completedActivities={completedActivities}
              onActivitySelect={(activityId) => setLocation(`/lesson/${lessonId}/${currentSubLesson.id}/activity/${activityId}`)}
            />
          </div>

          {/* Activity content */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{currentActivity.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-sm dark:prose-invert max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: currentActivity.content }}
              />
            </CardContent>
          </Card>

          {/* Exercises */}
          {currentActivity.exercises && currentActivity.exercises.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Exercises</h3>
              {currentActivity.exercises.map((exercise) => (
                <ExerciseForm
                  key={exercise.id}
                  exercise={exercise}
                  lessonId={lessonId}
                  subLessonId={currentSubLesson.id}
                />
              ))}
            </div>
          )}

          {/* Completion button */}
          <div className="mt-8 flex justify-between items-center pb-8">
            <div>
              {completedActivities.has(currentActivity.id) && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Activity completed</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              {completedActivities.has(currentActivity.id) && (
                <Button
                  onClick={handleMarkIncomplete}
                  size="lg"
                  variant="outline"
                  className="min-w-[180px]"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Mark as Incomplete
                </Button>
              )}
              <Button
                onClick={handleCompleteActivity}
                size="lg"
                className="min-w-[200px]"
              >
                {completedActivities.has(currentActivity.id) ? (
                  currentSubLesson.activities.findIndex(a => a.id === currentActivity.id) === currentSubLesson.activities.length - 1 
                    ? (getSubLessonProgress(lessonId, currentSubLesson.id) ? "Next Sub-lesson" : "Complete Sub-lesson")
                    : "Next Activity"
                ) : (
                  "Mark as Complete"
                )}
                {currentSubLesson.activities.findIndex(a => a.id === currentActivity.id) < currentSubLesson.activities.length - 1 && 
                  <ChevronRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Fallback for sub-lessons without activities
    const isCompleted = getSubLessonProgress(lessonId, currentSubLesson.id);
    const currentSubIndex = lesson.subLessons.findIndex(sl => sl.id === currentSubLesson.id);
    const isLastSubLesson = currentSubIndex === lesson.subLessons.length - 1;

    return (
      <div className="max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">
              Lesson {lessonId}: {lesson.title}
            </h1>
            <p className="text-muted-foreground">
              {lesson.description}
            </p>
          </div>

          {/* Sub-lesson navigation with flow arrows */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {lesson.subLessons.map((subLesson, index) => {
              const isActive = subLesson.id === currentSubLesson.id;
              const isSubCompleted = getSubLessonProgress(lessonId, subLesson.id);
              
              return (
                <React.Fragment key={subLesson.id}>
                  <Link href={`/lesson/${lessonId}/${subLesson.id}`}>
                    <Button
                      variant={isActive ? "default" : "outline"}
                      className="justify-start relative"
                    >
                      {isSubCompleted && (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      )}
                      <span className="truncate">{subLesson.id}: {subLesson.title}</span>
                    </Button>
                  </Link>
                  {index < lesson.subLessons.length - 1 && (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </React.Fragment>
              );
            })}
            {/* Show reflection link */}
            {lesson.activities && lesson.activities.length > 0 && (
              <>
                {lesson.subLessons.length > 0 && (
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                )}
                <Link href={`/lesson/${lessonId}/activity/${lesson.activities[0].id}`}>
                  <Button
                    variant={allSubLessonsComplete ? "outline" : "ghost"}
                    className="justify-start relative"
                    disabled={!allSubLessonsComplete}
                  >
                    {allSubLessonsComplete && (
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    )}
                    Reflection
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Sub-lesson content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{currentSubLesson.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {currentSubLesson.description || "This sub-lesson has no activities."}
            </p>
          </CardContent>
        </Card>

        {/* Completion button */}
        <div className="mt-8 flex justify-between items-center pb-8">
          <div>
            {isCompleted && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Section completed</span>
              </div>
            )}
          </div>
          
          <Button
            onClick={() => markSubLessonComplete(lessonId, currentSubLesson.id)}
            size="lg"
            className="min-w-[200px]"
          >
            {isCompleted ? (
              isLastSubLesson ? (allSubLessonsComplete && lesson.activities ? "View Reflection" : "Back to Dashboard") : "Next Section"
            ) : (
              "Mark as Complete"
            )}
            {!isCompleted && !isLastSubLesson && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    );
  } else if (lesson.activities) {
    // Direct activities under lesson (only shown if no sub-lessons OR viewing reflection)
    if (!currentActivity) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Activity not found</h2>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      );
    }

    const completedActivities = new Set(
      lesson.activities
        .filter(a => getActivityProgress(lessonId, a.id))
        .map(a => a.id)
    );

    return (
      <div className="max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-2">
              Lesson {lessonId}: {lesson.title}
            </h1>
            <p className="text-muted-foreground">
              {lesson.description}
            </p>
          </div>

          {/* Show sub-lesson navigation if lesson has sub-lessons */}
          {lesson.subLessons && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {lesson.subLessons.map((subLesson) => {
                  const isSubCompleted = getSubLessonProgress(lessonId, subLesson.id);
                  
                  return (
                    <Link key={subLesson.id} href={`/lesson/${lessonId}/${subLesson.id}`}>
                      <Button
                        variant="outline"
                        className="w-full justify-start relative"
                      >
                        {isSubCompleted && (
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        )}
                        <span className="truncate">{subLesson.id}: {subLesson.title}</span>
                      </Button>
                    </Link>
                  );
                })}
                {/* Show reflection link as active */}
                {lesson.activities && lesson.activities.length > 0 && (
                  <Button
                    variant="default"
                    className="w-full justify-start relative"
                  >
                    Reflection
                  </Button>
                )}
              </div>
              {/* Visual separator */}
              <hr className="mb-6 border-t border-gray-200 dark:border-gray-700" />
            </>
          )}

          {/* Activity navigation */}
          {!lesson.subLessons && (
            <ActivityNav
              activities={lesson.activities}
              currentActivityId={currentActivity.id}
              completedActivities={completedActivities}
              onActivitySelect={(activityId) => setLocation(`/lesson/${lessonId}/activity/${activityId}`)}
            />
          )}
        </div>

        {/* Activity content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{currentActivity.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm dark:prose-invert max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: currentActivity.content }}
            />
          </CardContent>
        </Card>

        {/* Exercises */}
        {currentActivity.exercises && currentActivity.exercises.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Exercises</h3>
            {currentActivity.exercises.map((exercise) => (
              <ExerciseForm
                key={exercise.id}
                exercise={exercise}
                lessonId={lessonId}
                subLessonId={currentActivity.id}
              />
            ))}
          </div>
        )}

        {/* Completion button */}
        <div className="mt-8 flex justify-between items-center pb-8">
          <div>
            {completedActivities.has(currentActivity.id) && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Activity completed</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            {completedActivities.has(currentActivity.id) && (
              <Button
                onClick={handleMarkIncomplete}
                size="lg"
                variant="outline"
                className="min-w-[180px]"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Mark as Incomplete
              </Button>
            )}
            <Button
              onClick={handleCompleteActivity}
              size="lg"
              className="min-w-[200px]"
            >
              {completedActivities.has(currentActivity.id) ? (
                lesson.activities.findIndex(a => a.id === currentActivity.id) === lesson.activities.length - 1 
                  ? "Back to Dashboard" 
                  : "Next Activity"
              ) : (
                "Mark as Complete"
              )}
              {lesson.activities.findIndex(a => a.id === currentActivity.id) < lesson.activities.length - 1 && 
                <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}