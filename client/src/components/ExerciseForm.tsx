import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCourseProgress, type Exercise } from "../contexts/CourseProgressContext";
import { lazy, Suspense, useState, useEffect, useRef } from "react";

interface ExerciseFormProps {
  exercise: Exercise;
  lessonId: number;
  subLessonId: string;
}

// Dynamic import for custom exercise components
const exerciseComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  MatchTheMethodDragDrop: lazy(() => import("./exercises/MatchTheMethodDragDrop")),
  StakeholderDragDrop: lazy(() => import("./exercises/StakeholderDragDrop")),
  PatternMatchingDragDrop: lazy(() => import("./exercises/PatternMatchingDragDrop")),
  RiskRadarDragDrop: lazy(() => import("./exercises/RiskRadarDragDrop")),
  OperationalDebtDragDrop: lazy(() => import("./exercises/OperationalDebtDragDrop")),
  NinetyDayDashDragDrop: lazy(() => import("./exercises/NinetyDayDashDragDrop")),
};

export default function ExerciseForm({ exercise, lessonId, subLessonId }: ExerciseFormProps) {
  const { updateExerciseAnswer, updateStepAnswer } = useCourseProgress();
  
  // Local state for synchronous updates to prevent cursor jumping
  const [localAnswer, setLocalAnswer] = useState<string | string[]>(exercise.answer || '');
  const [localStepAnswers, setLocalStepAnswers] = useState<Record<string, string | string[]>>({});
  
  // Refs for debouncing
  const answerTimeoutRef = useRef<NodeJS.Timeout>();
  const stepTimeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});
  
  // Sync local state with props when exercise changes
  useEffect(() => {
    setLocalAnswer(exercise.answer || '');
    // Initialize step answers
    if (exercise.steps) {
      const stepAnswers: Record<string, string | string[]> = {};
      exercise.steps.forEach(step => {
        stepAnswers[step.id] = step.answer || '';
      });
      setLocalStepAnswers(stepAnswers);
    }
  }, [exercise.id]); // Re-sync when exercise changes

  const handleAnswerChange = (value: string | string[]) => {
    // Update local state immediately for responsive UI
    setLocalAnswer(value);
    
    // Clear existing timeout
    if (answerTimeoutRef.current) {
      clearTimeout(answerTimeoutRef.current);
    }
    
    // Debounce context update to prevent excessive re-renders
    answerTimeoutRef.current = setTimeout(() => {
      updateExerciseAnswer(lessonId, subLessonId, exercise.id, value);
    }, 300);
  };

  const handleStepAnswerChange = (stepId: string, value: string) => {
    // Update local state immediately
    setLocalStepAnswers(prev => ({
      ...prev,
      [stepId]: value
    }));
    
    // Clear existing timeout for this step
    if (stepTimeoutRefs.current[stepId]) {
      clearTimeout(stepTimeoutRefs.current[stepId]);
    }
    
    // Debounce context update
    stepTimeoutRefs.current[stepId] = setTimeout(() => {
      updateStepAnswer(lessonId, subLessonId, exercise.id, stepId, value);
    }, 300);
  };
  
  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (answerTimeoutRef.current) {
        clearTimeout(answerTimeoutRef.current);
      }
      Object.values(stepTimeoutRefs.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

  const renderFormField = () => {
    switch (exercise.type) {
      case 'text':
        return (
          <Input
            value={localAnswer as string}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Enter your answer..."
            className="mt-2"
          />
        );
      
      case 'textarea':
        return (
          <div className="mt-2 space-y-3">
            <Textarea
              value={localAnswer as string}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Enter your response..."
              className="min-h-[100px]"
              rows={4}
            />
          </div>
        );

      case 'radio':
        return (
          <RadioGroup
            value={localAnswer as string}
            onValueChange={(value) => handleAnswerChange(value)}
            className="mt-2 space-y-3"
          >
            {exercise.options?.map((option, index) => (
              <div key={index} className="flex items-start space-x-2">
                <RadioGroupItem value={option} id={`${exercise.id}-${index}`} className="mt-1" />
                <Label 
                  htmlFor={`${exercise.id}-${index}`} 
                  className="text-sm leading-relaxed cursor-pointer flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'multi-step':
        return (
          <div className="mt-2 space-y-4">
            {exercise.steps?.map((step) => (
              <div key={step.id} className="border-l-4 border-blue-200 dark:border-blue-700 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-foreground mb-2">{step.label}</h4>
                    {step.description && (
                      <p 
                        className="text-xs text-muted-foreground mb-3 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: step.description }}
                      />
                    )}
                  </div>
                </div>
                {step.type === 'textarea' ? (
                  <Textarea
                    value={localStepAnswers[step.id] as string || ''}
                    onChange={(e) => handleStepAnswerChange(step.id, e.target.value)}
                    placeholder="Enter your response..."
                    className="min-h-[80px]"
                    rows={3}
                  />
                ) : step.type === 'radio' ? (
                  <RadioGroup
                    value={localStepAnswers[step.id] as string || ''}
                    onValueChange={(value) => handleStepAnswerChange(step.id, value)}
                    className="mt-2 space-y-2"
                  >
                    {step.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${step.id}-${option}`} />
                        <Label htmlFor={`${step.id}-${option}`} className="text-sm font-normal">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <Input
                    value={localStepAnswers[step.id] as string || ''}
                    onChange={(e) => handleStepAnswerChange(step.id, e.target.value)}
                    placeholder="Enter your answer..."
                  />
                )}
              </div>
            ))}
          </div>
        );

      case 'component':
        if (!exercise.component || !exerciseComponents[exercise.component]) {
          return <p className="text-sm text-muted-foreground">Component not found: {exercise.component}</p>;
        }
        
        const Component = exerciseComponents[exercise.component];
        return (
          <Suspense fallback={<div className="text-sm text-muted-foreground">Loading component...</div>}>
            <Component
              answer={localAnswer}
              onAnswerChange={handleAnswerChange}
            />
          </Suspense>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">{exercise.label}</CardTitle>
        {exercise.description && (
          <CardDescription 
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: exercise.description }}
          />
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {renderFormField()}
      </CardContent>
    </Card>
  );
}