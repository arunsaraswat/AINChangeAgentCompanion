import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCourseProgress, type Exercise } from "../contexts/CourseProgressContext";
import { lazy, Suspense, useCallback } from "react";

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

  // Use direct updates without local state to avoid sync issues in production
  const handleAnswerChange = useCallback((value: string | string[]) => {
    updateExerciseAnswer(lessonId, subLessonId, exercise.id, value);
  }, [lessonId, subLessonId, exercise.id, updateExerciseAnswer]);

  const handleStepAnswerChange = useCallback((stepId: string, value: string) => {
    updateStepAnswer(lessonId, subLessonId, exercise.id, stepId, value);
  }, [lessonId, subLessonId, exercise.id, updateStepAnswer]);

  const renderFormField = () => {
    switch (exercise.type) {
      case 'text':
        return (
          <Input
            value={exercise.answer as string || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Enter your answer..."
            className="mt-2"
          />
        );
      
      case 'textarea':
        return (
          <div className="mt-2 space-y-3">
            <Textarea
              value={exercise.answer as string || ''}
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
            value={exercise.answer as string || ''}
            onValueChange={handleAnswerChange}
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
                    value={step.answer as string || ''}
                    onChange={(e) => handleStepAnswerChange(step.id, e.target.value)}
                    placeholder="Enter your response..."
                    className="min-h-[80px]"
                    rows={3}
                  />
                ) : step.type === 'radio' ? (
                  <RadioGroup
                    value={step.answer as string || ''}
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
                    value={step.answer as string || ''}
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
              answer={exercise.answer}
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