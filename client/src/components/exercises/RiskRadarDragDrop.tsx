import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Info } from "lucide-react";

interface RiskRadarProps {
  answer: any;
  onAnswerChange: (value: any) => void;
}

interface Request {
  id: string;
  text: string;
}

interface Risk {
  id: string;
  name: string;
}

interface Feedback {
  correct: boolean;
  message: string;
}

const requests: Request[] = [
  {
    id: "hiringModel",
    text: "Let's just use the employment history and performance data of our current top 10% of reps—they're our 'gold standard' for a hiring model.",
  },
  {
    id: "frenchData",
    text: "Our marketing partner in France has a great dataset on consumer trends. Let's just pull their data via API to help our model.",
  },
  {
    id: "webScraping",
    text: "To understand the market, let's have the AI scrape the top 20 industry news sites and our main competitors' blogs every day.",
  },
  {
    id: "cameraTracking",
    text: "Let's use our in-store camera footage, combined with transaction data, to identify our top 100 customers by face and track their shopping paths.",
  },
];

const risks: Risk[] = [
  { id: "piiPrivacy", name: "PII / Privacy Violation" },
  { id: "dataBias", name: "Data Bias" },
  { id: "regulatory", name: "Regulatory / Compliance Violation" },
  { id: "ipCopyright", name: "IP / Copyright Infringement" },
];

const correctMatches: Record<string, string> = {
  hiringModel: "dataBias",
  frenchData: "regulatory",
  webScraping: "ipCopyright",
  cameraTracking: "piiPrivacy",
};

const feedbackMessages: Record<string, Record<string, string>> = {
  hiringModel: {
    piiPrivacy: "Not the primary risk. While employee data is sensitive, the bigger issue is bias in the hiring model.",
    dataBias: "✓ Correct! Using only top performers creates bias—you'll build a model that discriminates against diverse candidates who might succeed through different paths.",
    regulatory: "Not the main concern. Internal employee data use is typically allowed with proper consent.",
    ipCopyright: "Not applicable. This is your own employee data, not copyrighted external content.",
  },
  frenchData: {
    piiPrivacy: "Possible concern, but not the primary risk for cross-border data transfers.",
    dataBias: "Not the main issue. The risk here is about legal data transfer, not bias.",
    regulatory: "✓ Correct! GDPR and other regulations strictly control cross-border data transfers. You need proper agreements and safeguards.",
    ipCopyright: "Not the issue. Your partner owns the data, but regulatory compliance is the real challenge.",
  },
  webScraping: {
    piiPrivacy: "Not the primary concern for public news sites and blogs.",
    dataBias: "Possible, but the legal risk of scraping is more immediate.",
    regulatory: "Close, but the specific risk is intellectual property, not general compliance.",
    ipCopyright: "✓ Correct! Many websites prohibit scraping in their terms of service, and content is copyrighted. This could lead to legal action.",
  },
  cameraTracking: {
    piiPrivacy: "✓ Correct! Facial recognition for customer tracking is a major privacy violation. Many jurisdictions ban or heavily regulate this practice.",
    dataBias: "Not the main risk. The privacy violation is far more serious.",
    regulatory: "Related, but PII/Privacy is more specific to this facial recognition scenario.",
    ipCopyright: "Not applicable. This is about privacy rights, not intellectual property.",
  },
};

export default function RiskRadarDragDrop({ answer = {}, onAnswerChange }: RiskRadarProps) {
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

  const handleDragStart = (_e: React.DragEvent, riskId: string) => {
    setDraggedItem(riskId);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, requestId: string) => {
    e.preventDefault();
    if (draggedItem) {
      const newMatches = { ...matches, [requestId]: draggedItem };
      setMatches(newMatches);
      onAnswerChange(newMatches);
      setDraggedItem(null);
    }
  };

  const removeMatch = (requestId: string) => {
    const newMatches = { ...matches };
    delete newMatches[requestId];
    setMatches(newMatches);
    onAnswerChange(newMatches);
  };

  const checkAnswers = () => {
    const newFeedback: Record<string, Feedback> = {};
    
    requests.forEach((request) => {
      const userAnswer = matches[request.id];
      if (userAnswer) {
        const isCorrect = userAnswer === correctMatches[request.id];
        newFeedback[request.id] = {
          correct: isCorrect,
          message: feedbackMessages[request.id][userAnswer],
        };
      }
    });
    
    setFeedback(newFeedback);
    setShowFeedback(true);
  };

  const getUnusedRisks = () => {
    const usedRisks = new Set(Object.values(matches));
    return risks.filter((risk) => !usedRisks.has(risk.id));
  };

  return (
    <div className="space-y-8">
      {/* Hidden Risks Row */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Hidden Risks</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {getUnusedRisks().map((risk) => (
            <Card
              key={risk.id}
              draggable
              onDragStart={(e) => handleDragStart(e, risk.id)}
              className="cursor-move hover:shadow-md transition-shadow bg-red-100 dark:bg-red-900/20"
            >
              <CardContent className="p-3 text-center">
                <p className="font-medium text-sm">{risk.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {getUnusedRisks().length === 0 && (
          <div className="text-center text-muted-foreground p-6 border-2 border-dashed rounded-md">
            All risks have been matched!
          </div>
        )}
      </div>

      {/* Stakeholder Requests */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Stakeholder Requests</h3>
        <div className="space-y-4">
          {requests.map((request, index) => (
            <Card
              key={request.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, request.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <span className="font-semibold text-sm text-muted-foreground">
                    {index + 1}.
                  </span>
                  <div className="flex-1">
                    <p className="text-sm mb-3">{request.text}</p>
                    
                    {/* Drop Zone or Matched Item */}
                    {matches[request.id] ? (
                      <div className="border-2 border-primary rounded-md p-3 bg-green-100 dark:bg-green-900/20">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {risks.find((r) => r.id === matches[request.id])?.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMatch(request.id)}
                            className="h-6 px-2 text-xs"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/30 rounded-md p-4 text-center text-sm text-muted-foreground bg-muted/5">
                        Drop a hidden risk here
                      </div>
                    )}
                    
                    {/* Feedback */}
                    {showFeedback && feedback[request.id] && (
                      <div
                        className={`mt-3 p-3 rounded-md text-sm ${
                          feedback[request.id].correct
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                            : "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {feedback[request.id].correct ? (
                            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          )}
                          <p>{feedback[request.id].message}</p>
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
          disabled={Object.keys(matches).length !== requests.length}
          size="lg"
        >
          Check Your Matches
        </Button>
      </div>
      
      {Object.keys(matches).length < requests.length && (
        <p className="text-center text-sm text-muted-foreground">
          Match all requests before checking your answers ({Object.keys(matches).length}/{requests.length} matched)
        </p>
      )}
    </div>
  );
}