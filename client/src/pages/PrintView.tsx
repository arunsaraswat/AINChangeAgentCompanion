import { useEffect, useState } from "react";
import { useCourseProgress } from "@/contexts/CourseProgressContext";
import ContentService from "../../../data/services/ContentService";
import type { Lesson, Activity, Exercise } from "@shared/types";
import { Check } from "lucide-react";

export default function PrintView() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const { getExerciseAnswer, getActivityProgress } = useCourseProgress();

  useEffect(() => {
    const loadAllLessons = async () => {
      const loadedLessons: Lesson[] = [];
      for (let i = 1; i <= 10; i++) {
        const lesson = await ContentService.getLesson(i);
        if (lesson) {
          loadedLessons.push(lesson);
        }
      }
      setLessons(loadedLessons);
      setLoading(false);
    };
    loadAllLessons();
  }, []);

  const renderExerciseAnswer = (exercise: Exercise, answer: any) => {
    if (!answer || (typeof answer === 'string' && !answer.trim())) {
      return (
        <div className="answer-box unanswered">
          <em>Not yet answered</em>
        </div>
      );
    }

    if (exercise.type === 'radio' || exercise.type === 'checkbox') {
      const selectedOptions = Array.isArray(answer) ? answer : [answer];
      return (
        <div className="answer-box">
          <div className="selected-options">
            {selectedOptions.map((option, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (exercise.type === 'multi-step' && answer.stepAnswers) {
      return (
        <div className="answer-box">
          {exercise.steps?.map((step, idx) => (
            <div key={step.id} className="mb-4 last:mb-0">
              <h5 className="font-medium mb-2">Step {idx + 1}: {step.label}</h5>
              {step.description && <p className="text-sm text-gray-600 mb-2">{step.description}</p>}
              <div className="pl-4 border-l-2 border-gray-200">
                {answer.stepAnswers[step.id] ? (
                  <p className="whitespace-pre-wrap">{answer.stepAnswers[step.id]}</p>
                ) : (
                  <em className="text-gray-500">Not answered</em>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="answer-box">
        <p className="whitespace-pre-wrap">{answer}</p>
      </div>
    );
  };

  const renderExercise = (exercise: Exercise, lessonId: number, contextId: string, index: number) => {
    const answerData = getExerciseAnswer(lessonId, contextId, exercise.id);
    
    return (
      <div key={exercise.id} className="exercise mb-8">
        <div className="question-header mb-3">
          <h4 className="text-base font-medium">
            {index}. {exercise.label}
          </h4>
          {exercise.description && (
            <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
          )}
        </div>
        
        {exercise.type === 'component' ? (
          <div className="answer-box">
            <em className="text-gray-600">Interactive exercise - see online version</em>
          </div>
        ) : (
          renderExerciseAnswer(exercise, answerData?.answer)
        )}
        
        {answerData?.followUpAnswer && (
          <div className="mt-4">
            <h5 className="text-sm font-medium mb-2">Follow-up Response:</h5>
            <div className="answer-box">
              <p className="whitespace-pre-wrap">{answerData.followUpAnswer}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderActivity = (activity: Activity, lessonId: number, subLessonId?: string, activityIndex?: number) => {
    const isComplete = getActivityProgress(lessonId, activity.id, subLessonId);
    const contextId = activity.id;
    let exerciseCounter = 1;

    return (
      <div key={activity.id} className="activity-section mb-10">
        <div className="activity-header mb-4">
          <div className="flex items-center gap-3">
            {activityIndex !== undefined && (
              <span className="activity-number">
                {subLessonId ? `${subLessonId}.${activityIndex + 1}` : `${lessonId}.${activityIndex + 1}`}
              </span>
            )}
            <h3 className="text-lg font-semibold">{activity.title}</h3>
            {isComplete && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                <Check className="w-3 h-3" />
                Complete
              </span>
            )}
          </div>
          {activity.type && (
            <p className="text-sm text-gray-600 mt-1 capitalize">
              {activity.type.replace('-', ' ')} {activity.duration && `• ${activity.duration}`}
            </p>
          )}
        </div>

        {activity.exercises && activity.exercises.length > 0 && (
          <div className="exercises pl-6">
            {activity.exercises.map((exercise) => {
              const currentCount = exerciseCounter++;
              return renderExercise(exercise, lessonId, contextId, currentCount);
            })}
          </div>
        )}
      </div>
    );
  };

  const getLessonCompletion = (lesson: Lesson) => {
    let totalActivities = 0;
    let completedActivities = 0;

    if (lesson.activities) {
      totalActivities = lesson.activities.length;
      completedActivities = lesson.activities.filter(activity => 
        getActivityProgress(lesson.id, activity.id)
      ).length;
    }

    if (lesson.subLessons) {
      lesson.subLessons.forEach(subLesson => {
        if (subLesson.activities) {
          totalActivities += subLesson.activities.length;
          completedActivities += subLesson.activities.filter(activity =>
            getActivityProgress(lesson.id, activity.id, subLesson.id)
          ).length;
        }
      });
    }

    return { total: totalActivities, completed: completedActivities };
  };

  if (loading) {
    return (
      <div className="print-view-loading">
        <p>Loading course content...</p>
      </div>
    );
  }

  return (
    <div className="print-view">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Inter:wght@400;500;600&display=swap');
        
        .print-view {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 1in;
          background: white;
          color: #1a1a1a;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
        }

        .print-header {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 3px solid #e5e7eb;
        }

        .print-header h1 {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .print-header .subtitle {
          font-size: 1.25rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .print-header .date {
          font-size: 0.875rem;
          color: #9ca3af;
        }

        .lesson-section {
          margin-bottom: 4rem;
          page-break-inside: avoid;
        }

        .lesson-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .lesson-header h2 {
          font-family: 'Merriweather', Georgia, serif;
          font-size: 1.875rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .progress-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          background: #f3f4f6;
          border-radius: 9999px;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .progress-badge.complete {
          background: #d1fae5;
          color: #059669;
        }

        .activity-section {
          margin-bottom: 2.5rem;
        }

        .activity-header {
          margin-bottom: 1rem;
        }

        .sub-lesson-section {
          margin-top: 2.5rem;
          margin-bottom: 2.5rem;
        }

        .sub-lesson-header {
          background: #f9fafb;
          border-left: 4px solid #6366f1;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          border-radius: 0.375rem;
        }

        .sub-lesson-title {
          font-size: 1.375rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .sub-lesson-description {
          font-size: 0.9375rem;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }

        .sub-lesson-content {
          padding-left: 1.5rem;
        }

        .activity-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 3rem;
          height: 2rem;
          background: #f3f4f6;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4b5563;
          padding: 0 0.75rem;
        }

        .exercise {
          margin-bottom: 2rem;
        }

        .question-header h4 {
          font-size: 1rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .answer-box {
          background: #f9fafb;
          border-left: 4px solid #22c55e;
          border-radius: 0.375rem;
          padding: 1rem;
          margin-top: 0.75rem;
        }

        .answer-box.unanswered {
          background: #fef3c7;
          border-left-color: #f59e0b;
          color: #92400e;
          font-style: italic;
        }

        .selected-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        @media print {
          @page {
            margin: 0.75in;
            size: letter;
          }

          .print-view {
            padding: 0;
            max-width: 100%;
          }

          .no-print {
            display: none !important;
          }

          .lesson-section {
            page-break-before: auto;
            page-break-after: auto;
            page-break-inside: avoid;
          }

          .lesson-header {
            page-break-after: avoid;
          }

          .activity-section {
            page-break-inside: avoid;
          }

          .exercise {
            page-break-inside: avoid;
          }

          .answer-box {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .sub-lesson-header {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            page-break-after: avoid;
          }

          .sub-lesson-section {
            page-break-inside: avoid;
          }
        }
      ` }} />

      <header className="print-header">
        <h1>AI-Native Change Agent</h1>
        <p className="subtitle">Course Progress Report</p>
        <p className="date">{new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </header>

      <main className="print-content">
        {lessons.map((lesson) => {
          const completion = getLessonCompletion(lesson);
          const isComplete = completion.completed === completion.total && completion.total > 0;

          return (
            <section key={lesson.id} className="lesson-section">
              <div className="lesson-header">
                <h2>Lesson {lesson.id}: {lesson.title}</h2>
                <span className={`progress-badge ${isComplete ? 'complete' : ''}`}>
                  {isComplete && <Check className="w-4 h-4" />}
                  {completion.completed}/{completion.total} Complete
                </span>
              </div>

              {lesson.activities && lesson.activities.map((activity, idx) => 
                renderActivity(activity, lesson.id, undefined, idx)
              )}

              {lesson.subLessons && lesson.subLessons.map(subLesson => (
                <div key={subLesson.id} className="sub-lesson-section">
                  <div className="sub-lesson-header">
                    <h3 className="sub-lesson-title">
                      {subLesson.id} {subLesson.title}
                    </h3>
                    {subLesson.description && (
                      <p className="sub-lesson-description">{subLesson.description}</p>
                    )}
                  </div>
                  <div className="sub-lesson-content">
                    {subLesson.activities && subLesson.activities.map((activity, idx) => 
                      renderActivity(activity, lesson.id, subLesson.id, idx)
                    )}
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </main>
    </div>
  );
}