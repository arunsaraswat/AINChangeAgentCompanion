import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Info } from "lucide-react";

interface MatchTheMethodProps {
  answer: any;
  onAnswerChange: (value: any) => void;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
}

interface Approach {
  id: string;
  name: string;
}

interface Feedback {
  correct: boolean;
  message: string;
}

const scenarios: Scenario[] = [
  {
    id: "marketingContent",
    title: "Marketing Content",
    description: "A marketing team wants to create 10 creative and engaging social media posts for a product launch based on a brief description. The AI must generate fresh, original text.",
  },
  {
    id: "hrPolicyBot",
    title: "HR Policy Bot",
    description: "An HR department needs a chatbot for the intranet that must answer employee questions using only the information from the official, current employee handbook and cite the page number.",
  },
  {
    id: "customerOnboarding",
    title: "Customer Onboarding",
    description: "When a new customer is signed, the AI must trigger a workflow: 1) create a new account in Salesforce, 2) add the customer to a Mailchimp list, and 3) generate a kick-off task in Asana.",
  },
  {
    id: "medicalTranscription",
    title: "Medical Transcription",
    description: "A startup needs an AI model to accurately transcribe audio notes from specialist physicians, understanding complex medical terminology, unique accents, and specific dictation shortcuts from a large dataset of existing recordings.",
  },
];

const approaches: Approach[] = [
  { id: "promptOnly", name: "Prompt-only" },
  { id: "rag", name: "RAG (Retrieval-Augmented Generation)" },
  { id: "fineTuning", name: "Fine-tuning" },
  { id: "agentic", name: "Agentic" },
];

const correctMatches: Record<string, string> = {
  marketingContent: "promptOnly",
  hrPolicyBot: "rag",
  customerOnboarding: "agentic",
  medicalTranscription: "fineTuning",
};

const feedbackMessages: Record<string, Record<string, string>> = {
  marketingContent: {
    promptOnly: "✓ Correct! Prompt-only is perfect for creative content generation where you need fresh, original outputs based on instructions.",
    rag: "Not quite. RAG is better for retrieving specific information from documents, not creating original content.",
    fineTuning: "Not optimal. Fine-tuning is overkill for simple creative tasks that can be handled with good prompts.",
    agentic: "Too complex. Agentic AI is for multi-step workflows, not simple content generation.",
  },
  hrPolicyBot: {
    promptOnly: "Not suitable. Prompt-only can't guarantee answers come from specific documents or provide citations.",
    rag: "✓ Correct! RAG is ideal when the AI must base its answers on specific documents and provide accurate citations.",
    fineTuning: "Not ideal. Fine-tuning doesn't guarantee the AI will cite sources or stick to the handbook content.",
    agentic: "Overcomplicated. While possible, RAG is simpler and more appropriate for document-based Q&A.",
  },
  customerOnboarding: {
    promptOnly: "Insufficient. Prompt-only can't execute actions or integrate with external systems.",
    rag: "Not suitable. RAG is for information retrieval, not executing multi-step workflows.",
    fineTuning: "Wrong approach. Fine-tuning helps with understanding, not with executing actions across systems.",
    agentic: "✓ Correct! Agentic AI excels at multi-step workflows that require integrating with different systems and tools.",
  },
  medicalTranscription: {
    promptOnly: "Inadequate. Prompt-only struggles with specialized terminology and unique accents without training.",
    rag: "Not appropriate. RAG retrieves information, it doesn't improve transcription accuracy.",
    fineTuning: "✓ Correct! Fine-tuning on domain-specific data is essential for understanding medical terminology and physician speech patterns.",
    agentic: "Wrong focus. Agentic AI is for workflows, not improving domain-specific understanding.",
  },
};

export default function MatchTheMethodDragDrop({ answer = {}, onAnswerChange }: MatchTheMethodProps) {
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

  const handleDragStart = (_e: React.DragEvent, approachId: string) => {
    setDraggedItem(approachId);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, scenarioId: string) => {
    e.preventDefault();
    if (draggedItem) {
      const newMatches = { ...matches, [scenarioId]: draggedItem };
      setMatches(newMatches);
      onAnswerChange(newMatches);
      setDraggedItem(null);
    }
  };

  const removeMatch = (scenarioId: string) => {
    const newMatches = { ...matches };
    delete newMatches[scenarioId];
    setMatches(newMatches);
    onAnswerChange(newMatches);
  };

  const checkAnswers = () => {
    const newFeedback: Record<string, Feedback> = {};
    
    scenarios.forEach((scenario) => {
      const userAnswer = matches[scenario.id];
      if (userAnswer) {
        const isCorrect = userAnswer === correctMatches[scenario.id];
        newFeedback[scenario.id] = {
          correct: isCorrect,
          message: feedbackMessages[scenario.id][userAnswer],
        };
      }
    });
    
    setFeedback(newFeedback);
    setShowFeedback(true);
  };

  const getUnusedApproaches = () => {
    const usedApproaches = new Set(Object.values(matches));
    return approaches.filter((approach) => !usedApproaches.has(approach.id));
  };

  return (
    <div className="space-y-8">
      {/* AI Approaches Row */}
      <div>
        <h3 className="font-semibold text-lg mb-4">AI Approaches</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {getUnusedApproaches().map((approach) => (
            <Card
              key={approach.id}
              draggable
              onDragStart={(e) => handleDragStart(e, approach.id)}
              className="cursor-move hover:shadow-md transition-shadow bg-orange-100 dark:bg-orange-900/20"
            >
              <CardContent className="p-3 text-center">
                <p className="font-medium text-sm">{approach.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {getUnusedApproaches().length === 0 && (
          <div className="text-center text-muted-foreground p-6 border-2 border-dashed rounded-md">
            All approaches have been matched!
          </div>
        )}
      </div>

      {/* Business Scenarios Grid */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Business Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <Card
                key={scenario.id}
                className="relative"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, scenario.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{scenario.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {scenario.description}
                  </p>
                  
                  {/* Drop Zone or Matched Item */}
                  {matches[scenario.id] ? (
                    <div className="border-2 border-primary rounded-md p-3 bg-green-100 dark:bg-green-900/20">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {approaches.find((a) => a.id === matches[scenario.id])?.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMatch(scenario.id)}
                          className="h-6 px-2 text-xs"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/30 rounded-md p-4 text-center text-sm text-muted-foreground bg-muted/5">
                      Drop an AI approach here
                    </div>
                  )}
                  
                  {/* Feedback */}
                  {showFeedback && feedback[scenario.id] && (
                    <div
                      className={`mt-3 p-3 rounded-md text-sm ${
                        feedback[scenario.id].correct
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                          : "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {feedback[scenario.id].correct ? (
                          <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        <p>{feedback[scenario.id].message}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
      </div>

      {/* Check Answers Button */}
      <div className="flex justify-center mt-6">
        <Button
          onClick={checkAnswers}
          disabled={Object.keys(matches).length !== scenarios.length}
          size="lg"
        >
          Check Your Matches
        </Button>
      </div>
      
      {Object.keys(matches).length < scenarios.length && (
        <p className="text-center text-sm text-muted-foreground">
          Match all scenarios before checking your answers ({Object.keys(matches).length}/{scenarios.length} matched)
        </p>
      )}
    </div>
  );
}