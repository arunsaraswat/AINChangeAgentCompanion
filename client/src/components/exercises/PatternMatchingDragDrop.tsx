import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Info } from "lucide-react";

interface PatternMatchingProps {
  answer: any;
  onAnswerChange: (value: any) => void;
}

interface Statement {
  id: string;
  text: string;
}

interface Pattern {
  id: string;
  name: string;
  description: string;
}

interface Feedback {
  correct: boolean;
  message: string;
}

const statements: Statement[] = [
  {
    id: "supportAgents",
    text: "Our support agents need to answer complex technical questions. The AI must use our 5,000-page internal knowledge base and nothing from the public internet.",
  },
  {
    id: "dealClosed",
    text: "When a new deal is marked 'Closed-Won' in Salesforce, I want an AI to automatically generate the invoice in QuickBooks and create a new project in Asana.",
  },
  {
    id: "brandVoice",
    text: "Our brand has a very specific, quirky voice. I want a model that learns to write exactly in that style from our years of approved marketing copy.",
  },
  {
    id: "taglines",
    text: "I need five different catchy taglines for our new campaign, and they need to be under 10 words.",
  },
  {
    id: "visualDefects",
    text: "We need to automatically inspect our product line for visual defects. It's too slow for humans to do.",
  },
];

const patterns: Pattern[] = [
  { 
    id: "traditionalML", 
    name: "Traditional ML",
    description: "Forecasting, Pattern Recognition, Computer Vision"
  },
  { 
    id: "promptOnly", 
    name: "Prompt-only",
    description: "chatbot"
  },
  { 
    id: "rag", 
    name: "RAG",
    description: "Retrieval-Augmented Generation"
  },
  { 
    id: "fineTuning", 
    name: "Fine-Tuning",
    description: ""
  },
  { 
    id: "agentic", 
    name: "Agentic",
    description: "workflows, tools, and automation"
  },
];

const correctMatches: Record<string, string> = {
  supportAgents: "rag",
  dealClosed: "agentic",
  brandVoice: "fineTuning",
  taglines: "promptOnly",
  visualDefects: "traditionalML",
};

const feedbackMessages: Record<string, Record<string, string>> = {
  supportAgents: {
    traditionalML: "Not quite. Traditional ML is better for pattern recognition and computer vision, not text-based Q&A.",
    promptOnly: "Close, but not ideal. Prompt-only can't guarantee answers come from your specific knowledge base.",
    rag: "✓ Correct! RAG is perfect when you need the AI to search and retrieve information from a specific knowledge base and cite sources.",
    fineTuning: "Not optimal. Fine-tuning learns patterns but doesn't guarantee answers from your specific documents.",
    agentic: "Too complex. While possible, RAG is simpler and more appropriate for knowledge base Q&A.",
  },
  dealClosed: {
    traditionalML: "Not suitable. Traditional ML doesn't handle multi-system workflows and automation.",
    promptOnly: "Insufficient. Prompt-only can't execute actions or integrate with external systems like Salesforce or QuickBooks.",
    rag: "Not appropriate. RAG is for information retrieval, not executing automated workflows.",
    fineTuning: "Wrong approach. Fine-tuning helps with understanding, not with executing actions across systems.",
    agentic: "✓ Correct! Agentic AI excels at multi-step workflows that require integrating with different tools and systems.",
  },
  brandVoice: {
    traditionalML: "Not suitable. Traditional ML doesn't handle creative text generation with specific styles.",
    promptOnly: "Partially works, but inconsistent. Prompt-only struggles to consistently maintain a specific writing style.",
    rag: "Not ideal. RAG retrieves information, it doesn't learn to mimic writing styles.",
    fineTuning: "✓ Correct! Fine-tuning on your existing marketing copy is the best way to teach a model your specific brand voice.",
    agentic: "Overcomplicated. Agentic AI is for workflows, not style learning.",
  },
  taglines: {
    traditionalML: "Not appropriate. Traditional ML doesn't generate creative text content.",
    promptOnly: "✓ Correct! Prompt-only is ideal for creative tasks like generating multiple variations of short text.",
    rag: "Not suitable. RAG retrieves existing information, it doesn't create new taglines.",
    fineTuning: "Overkill. Fine-tuning is unnecessary for simple creative generation tasks.",
    agentic: "Too complex. Agentic AI is for multi-step processes, not simple text generation.",
  },
  visualDefects: {
    traditionalML: "✓ Correct! Traditional ML with computer vision is the established approach for visual inspection and defect detection.",
    promptOnly: "Not possible. Prompt-only works with text, not visual inspection.",
    rag: "Not applicable. RAG is for text retrieval, not image analysis.",
    fineTuning: "Partially correct, but Traditional ML is more specific for computer vision tasks.",
    agentic: "Wrong focus. Agentic AI is for workflows, not visual analysis.",
  },
};

export default function PatternMatchingDragDrop({ answer = {}, onAnswerChange }: PatternMatchingProps) {
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

  const handleDragStart = (_e: React.DragEvent, patternId: string) => {
    setDraggedItem(patternId);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, statementId: string) => {
    e.preventDefault();
    if (draggedItem) {
      const newMatches = { ...matches, [statementId]: draggedItem };
      setMatches(newMatches);
      onAnswerChange(newMatches);
      setDraggedItem(null);
    }
  };

  const removeMatch = (statementId: string) => {
    const newMatches = { ...matches };
    delete newMatches[statementId];
    setMatches(newMatches);
    onAnswerChange(newMatches);
  };

  const checkAnswers = () => {
    const newFeedback: Record<string, Feedback> = {};
    
    statements.forEach((statement) => {
      const userAnswer = matches[statement.id];
      if (userAnswer) {
        const isCorrect = userAnswer === correctMatches[statement.id];
        newFeedback[statement.id] = {
          correct: isCorrect,
          message: feedbackMessages[statement.id][userAnswer],
        };
      }
    });
    
    setFeedback(newFeedback);
    setShowFeedback(true);
  };

  const getUnusedPatterns = () => {
    const usedPatterns = new Set(Object.values(matches));
    return patterns.filter((pattern) => !usedPatterns.has(pattern.id));
  };

  return (
    <div className="space-y-8">
      {/* AI Patterns Row */}
      <div>
        <h3 className="font-semibold text-lg mb-4">AI Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {getUnusedPatterns().map((pattern) => (
            <Card
              key={pattern.id}
              draggable
              onDragStart={(e) => handleDragStart(e, pattern.id)}
              className="cursor-move hover:shadow-md transition-shadow bg-blue-100 dark:bg-blue-900/20"
            >
              <CardContent className="p-3 text-center">
                <p className="font-medium text-sm">{pattern.name}</p>
                {pattern.description && (
                  <p className="text-xs text-muted-foreground mt-1">{pattern.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {getUnusedPatterns().length === 0 && (
          <div className="text-center text-muted-foreground p-6 border-2 border-dashed rounded-md">
            All patterns have been matched!
          </div>
        )}
      </div>

      {/* Stakeholder Statements */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Stakeholder Statements</h3>
        <div className="space-y-4">
          {statements.map((statement, index) => (
            <Card
              key={statement.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, statement.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-sm text-muted-foreground">
                    {index + 1}.
                  </span>
                  <div className="flex-1">
                    <p className="text-sm mb-3">{statement.text}</p>
                    
                    {/* Drop Zone or Matched Item */}
                    {matches[statement.id] ? (
                      <div className="border-2 border-primary rounded-md p-3 bg-green-100 dark:bg-green-900/20">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {patterns.find((p) => p.id === matches[statement.id])?.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMatch(statement.id)}
                            className="h-6 px-2 text-xs"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/30 rounded-md p-4 text-center text-sm text-muted-foreground bg-muted/5">
                        Drop an AI pattern here
                      </div>
                    )}
                    
                    {/* Feedback */}
                    {showFeedback && feedback[statement.id] && (
                      <div
                        className={`mt-3 p-3 rounded-md text-sm ${
                          feedback[statement.id].correct
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                            : "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {feedback[statement.id].correct ? (
                            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          )}
                          <p>{feedback[statement.id].message}</p>
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
          disabled={Object.keys(matches).length !== statements.length}
          size="lg"
        >
          Check Your Matches
        </Button>
      </div>
      
      {Object.keys(matches).length < statements.length && (
        <p className="text-center text-sm text-muted-foreground">
          Match all statements before checking your answers ({Object.keys(matches).length}/{statements.length} matched)
        </p>
      )}
    </div>
  );
}