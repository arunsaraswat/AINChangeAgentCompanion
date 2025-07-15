import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ChevronRight, CheckCircle } from "lucide-react";
import ExerciseForm from "@/components/ExerciseForm";
import { useCourseProgress } from "@/contexts/CourseProgressContext";
import ContentService from "../../../data/services/ContentService";
import type { Lesson, SubLesson, Exercise, ExerciseStep } from "@shared/types";

interface LessonPageProps {
  lessonId: number;
  subLessonId?: string;
}

export default function LessonPage({ lessonId, subLessonId }: LessonPageProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentSubLesson, setCurrentSubLesson] = useState<SubLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const { getSubLessonProgress, markSubLessonComplete, getExerciseAnswer } = useCourseProgress();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const loadLesson = async () => {
      try {
        setLoading(true);
        const lessonData = await ContentService.getLesson(lessonId);
        
        if (lessonData) {
          setLesson(lessonData);
          
          // If no subLessonId provided, redirect to first sub-lesson
          if (!subLessonId && lessonData.subLessons.length > 0) {
            setLocation(`/lesson/${lessonId}/${lessonData.subLessons[0].id}`);
            return;
          }
          
          // Find the current sub-lesson
          const subLesson = lessonData.subLessons.find((sl: SubLesson) => sl.id === subLessonId);
          if (subLesson) {
            // Merge saved answers with the sub-lesson exercises
            const subLessonWithAnswers: SubLesson = {
              ...subLesson,
              exercises: subLesson.exercises?.map((exercise: Exercise) => {
                const savedAnswer = getExerciseAnswer(lessonId, subLessonId!, exercise.id);
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
            setCurrentSubLesson(subLessonWithAnswers);
          }
        } else {
          // Reset state when lesson doesn't exist
          setLesson(null);
          setCurrentSubLesson(null);
        }
      } catch (error) {
        console.error("Failed to load lesson:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId, subLessonId, setLocation, getExerciseAnswer]);

  const handleCompleteSubLesson = () => {
    if (currentSubLesson) {
      markSubLessonComplete(lessonId, currentSubLesson.id);
      
      // Navigate to next sub-lesson if available
      const currentIndex = lesson?.subLessons.findIndex(sl => sl.id === currentSubLesson.id) ?? -1;
      if (lesson && currentIndex < lesson.subLessons.length - 1) {
        const nextSubLesson = lesson.subLessons[currentIndex + 1];
        setLocation(`/lesson/${lessonId}/${nextSubLesson.id}`);
      } else {
        // All sub-lessons completed, go back to dashboard
        setLocation("/");
      }
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
      <div className="max-w-4xl mx-auto">
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

  const isCompleted = getSubLessonProgress(lessonId, currentSubLesson.id);
  const currentSubIndex = lesson.subLessons.findIndex(sl => sl.id === currentSubLesson.id);
  const isLastSubLesson = currentSubIndex === lesson.subLessons.length - 1;

  return (
    <div className="max-w-4xl mx-auto">
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

        {/* Sub-lesson navigation */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {lesson.subLessons.map((subLesson, index) => {
            const isActive = subLesson.id === currentSubLesson.id;
            const isSubCompleted = getSubLessonProgress(lessonId, subLesson.id);
            
            return (
              <React.Fragment key={subLesson.id}>
                <Link href={`/lesson/${lessonId}/${subLesson.id}`}>
                  <Button
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className="relative"
                  >
                    {isSubCompleted && (
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    )}
                    {subLesson.id}
                  </Button>
                </Link>
                {index < lesson.subLessons.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Sub-lesson content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{currentSubLesson.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose prose-sm dark:prose-invert max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: currentSubLesson.content }}
          />
        </CardContent>
      </Card>

      {/* Exercises */}
      {currentSubLesson.exercises && currentSubLesson.exercises.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Exercises</h3>
          {currentSubLesson.exercises.map((exercise) => (
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
          {isCompleted && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Section completed</span>
            </div>
          )}
        </div>
        
        <Button
          onClick={handleCompleteSubLesson}
          size="lg"
          className="min-w-[200px]"
        >
          {isCompleted ? (
            isLastSubLesson ? "Back to Dashboard" : "Next Section"
          ) : (
            "Mark as Complete"
          )}
          {!isLastSubLesson && <ChevronRight className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}