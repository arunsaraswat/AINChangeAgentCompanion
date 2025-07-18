import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Info } from "lucide-react";

interface OperationalDebtProps {
  answer: any;
  onAnswerChange: (value: any) => void;
}

interface VaguePlan {
  id: string;
  category: string;
  text: string;
}

interface Crisis {
  id: string;
  label: string;
  description: string;
}

interface Feedback {
  correct: boolean;
  message: string;
}

const vaguePlans: VaguePlan[] = [
  {
    id: "infrastructure",
    category: "Infrastructure Plan",
    text: "The solution will be deployed to the cloud for maximum scalability.",
  },
  {
    id: "integration",
    category: "Integration Plan",
    text: "The AI will connect to the main enterprise data warehouse as needed.",
  },
  {
    id: "mlops",
    category: "MLOps Plan",
    text: "The model will be updated periodically to ensure continued accuracy.",
  },
  {
    id: "incident",
    category: "Incident Response Plan",
    text: "If there's a critical issue, the dev team will be available to help.",
  },
];

const crises: Crisis[] = [
  { 
    id: "securityDelay",
    label: "A",
    description: "The project is delayed by two months because the \"as needed\" connection requires a formal security review that was never scheduled."
  },
  { 
    id: "bugFixDelay",
    label: "B",
    description: "An urgent bug fix takes 48 hours because there is no clear on-call rotation or defined escalation path."
  },
  { 
    id: "performanceIssue",
    label: "C",
    description: "The team chose a GPU-intensive model, but \"the cloud\" was provisioned with cheaper CPU-based servers, causing the application to be too slow."
  },
  { 
    id: "degradation",
    label: "D",
    description: "The model's performance degrades, but since \"periodically\" was never defined, no one notices until customers complain."
  },
];

const correctMatches: Record<string, string> = {
  infrastructure: "performanceIssue",
  integration: "securityDelay",
  mlops: "degradation",
  incident: "bugFixDelay",
};

const feedbackMessages: Record<string, Record<string, string>> = {
  infrastructure: {
    securityDelay: "Not quite. This crisis is about integration approvals, not infrastructure choices.",
    bugFixDelay: "Not the match. This crisis is about incident response, not infrastructure.",
    performanceIssue: "✓ Correct! Vague infrastructure planning (\"the cloud\") led to mismatched resources—CPU servers for a GPU-intensive model.",
    degradation: "Not related. This crisis is about model maintenance, not infrastructure.",
  },
  integration: {
    securityDelay: "✓ Correct! The vague \"as needed\" integration plan failed to account for security review requirements, causing delays.",
    bugFixDelay: "Not the match. This is about incident response, not integration planning.",
    performanceIssue: "Not related. This is an infrastructure issue, not integration.",
    degradation: "Not the issue. This is about model updates, not system integration.",
  },
  mlops: {
    securityDelay: "Not related. This is about integration security, not model operations.",
    bugFixDelay: "Not the match. This is about incident response, not MLOps.",
    performanceIssue: "Not related. This is an infrastructure issue, not model maintenance.",
    degradation: "✓ Correct! \"Periodically\" is too vague—without defined update schedules, model drift goes unnoticed until it impacts customers.",
  },
  incident: {
    securityDelay: "Not related. This is about integration planning, not incident response.",
    bugFixDelay: "✓ Correct! \"Dev team will be available\" is not a real incident response plan—no on-call rotation or escalation path means slow resolution.",
    performanceIssue: "Not the match. This is about infrastructure, not incident response.",
    degradation: "Not related. This is about model maintenance, not incident handling.",
  },
};

export default function OperationalDebtDragDrop({ answer = {}, onAnswerChange }: OperationalDebtProps) {
  // Parse answer if it's a string
  const parsedAnswer = typeof answer === 'string' ? (answer === '{}' ? {} : JSON.parse(answer)) : answer || {};
  
  const [matches, setMatches] = useState<Record<string, string>>(parsedAnswer);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, Feedback>>({});

  useEffect(() => {
    const parsed = typeof answer === 'string' ? (answer === '{}' ? {} : JSON.parse(answer)) : answer || {};
    if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
      setMatches(parsed);
    }
  }, [answer]);

  const handleDragStart = (_e: React.DragEvent, crisisId: string) => {
    setDraggedItem(crisisId);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, planId: string) => {
    e.preventDefault();
    if (draggedItem) {
      const newMatches = { ...matches, [planId]: draggedItem };
      setMatches(newMatches);
      onAnswerChange(newMatches);
      setDraggedItem(null);
    }
  };

  const removeMatch = (planId: string) => {
    const newMatches = { ...matches };
    delete newMatches[planId];
    setMatches(newMatches);
    onAnswerChange(newMatches);
  };

  const checkAnswers = () => {
    const newFeedback: Record<string, Feedback> = {};
    
    vaguePlans.forEach((plan) => {
      const userAnswer = matches[plan.id];
      if (userAnswer) {
        const isCorrect = userAnswer === correctMatches[plan.id];
        newFeedback[plan.id] = {
          correct: isCorrect,
          message: feedbackMessages[plan.id][userAnswer],
        };
      }
    });
    
    setFeedback(newFeedback);
    setShowFeedback(true);
  };

  const getUnusedCrises = () => {
    const usedCrises = new Set(Object.values(matches));
    return crises.filter((crisis) => !usedCrises.has(crisis.id));
  };

  return (
    <div className="space-y-8">
      {/* Operational Crises Row */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Operational Crises</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {getUnusedCrises().map((crisis) => (
            <Card
              key={crisis.id}
              draggable
              onDragStart={(e) => handleDragStart(e, crisis.id)}
              className="cursor-move hover:shadow-md transition-shadow bg-purple-100 dark:bg-purple-900/20"
            >
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <span className="font-bold text-lg">{crisis.label}.</span>
                  <p className="text-sm">{crisis.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {getUnusedCrises().length === 0 && (
          <div className="text-center text-muted-foreground p-6 border-2 border-dashed rounded-md">
            All crises have been matched!
          </div>
        )}
      </div>

      {/* Vague Plan Statements */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Vague Plan Statements</h3>
        <div className="space-y-4">
          {vaguePlans.map((plan, index) => (
            <Card
              key={plan.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, plan.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-sm text-muted-foreground">
                    {index + 1}.
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-1">{plan.category}:</p>
                    <p className="text-sm mb-3 italic">"{plan.text}"</p>
                    
                    {/* Drop Zone or Matched Item */}
                    {matches[plan.id] ? (
                      <div className="border-2 border-primary rounded-md p-3 bg-green-100 dark:bg-green-900/20">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            Crisis {crises.find((c) => c.id === matches[plan.id])?.label}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMatch(plan.id)}
                            className="h-6 px-2 text-xs"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/30 rounded-md p-4 text-center text-sm text-muted-foreground bg-muted/5">
                        Drop an operational crisis here
                      </div>
                    )}
                    
                    {/* Feedback */}
                    {showFeedback && feedback[plan.id] && (
                      <div
                        className={`mt-3 p-3 rounded-md text-sm ${
                          feedback[plan.id].correct
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                            : "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {feedback[plan.id].correct ? (
                            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          )}
                          <p>{feedback[plan.id].message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Check Answers Button */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={checkAnswers}
          disabled={Object.keys(matches).length !== vaguePlans.length}
          size="lg"
        >
          Check Your Matches
        </Button>
      </div>
      
      {Object.keys(matches).length < vaguePlans.length && (
        <p className="text-center text-sm text-muted-foreground">
          Match all plans before checking your answers ({Object.keys(matches).length}/{vaguePlans.length} matched)
        </p>
      )}
    </div>
  );
}