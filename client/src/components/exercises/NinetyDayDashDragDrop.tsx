import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, AlertCircle, CheckCircle } from "lucide-react";

interface NinetyDayDashDragDropProps {
  answer: any;
  onAnswerChange: (value: any) => void;
}

interface Milestone {
  id: string;
  text: string;
  correctPhase: string;
}

const milestones: Milestone[] = [
  { id: "1", text: "Draft initial user guides and training materials", correctPhase: "weeks3-4" },
  { id: "2", text: "Obtain formal project code from the Finance team", correctPhase: "weeks1-2" },
  { id: "3", text: "Deploy the fully-tested solution to the live Production environment", correctPhase: "month3" },
  { id: "4", text: "Conduct formal User Acceptance Testing (UAT)", correctPhase: "month2" },
  { id: "5", text: "Secure final, written sign-off from the Legal & Compliance team", correctPhase: "weeks1-2" },
  { id: "6", text: "Develop the core AI prototype and backend logic", correctPhase: "weeks3-4" },
  { id: "7", text: "Handoff system runbooks to the IT Support team", correctPhase: "month3" },
  { id: "8", text: "Provision the Staging environment in the cloud", correctPhase: "month2" },
  { id: "9", text: "Conduct internal Integration Testing", correctPhase: "month2" },
  { id: "10", text: "Obtain secure API credentials for Salesforce and SharePoint", correctPhase: "weeks1-2" },
  { id: "11", text: "Begin tracking post-launch value realization and adoption metrics", correctPhase: "month3" },
  { id: "12", text: "Design and validate the UI/UX wireframes with pilot users", correctPhase: "weeks3-4" }
];

const phases = [
  { id: "weeks1-2", name: "Weeks 1–2: Foundation Actions", color: "blue" },
  { id: "weeks3-4", name: "Weeks 3–4: Parallel Workstreams", color: "purple" },
  { id: "month2", name: "Month 2: Integration & Testing", color: "orange" },
  { id: "month3", name: "Month 3: Production Readiness", color: "green" }
];

export default function NinetyDayDashDragDrop({ answer = {}, onAnswerChange }: NinetyDayDashDragDropProps) {
  const parsedAnswer = typeof answer === 'string' ? (answer === '{}' ? {} : JSON.parse(answer)) : answer || {};
  
  const [phaseAssignments, setPhaseAssignments] = useState<Record<string, string[]>>(
    parsedAnswer.phaseAssignments || {
      "weeks1-2": [],
      "weeks3-4": [],
      "month2": [],
      "month3": []
    }
  );
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const parsed = typeof answer === 'string' ? (answer === '{}' ? {} : JSON.parse(answer)) : answer || {};
    if (parsed && typeof parsed === 'object' && parsed.phaseAssignments) {
      setPhaseAssignments(parsed.phaseAssignments);
      setShowFeedback(parsed.showFeedback || false);
    }
  }, [answer]);

  const updateAnswer = (newAssignments: Record<string, string[]>, feedback: boolean = false) => {
    const newAnswer = {
      phaseAssignments: newAssignments,
      showFeedback: feedback
    };
    onAnswerChange(newAnswer);
  };

  const handleDragStart = (_e: React.DragEvent, milestoneId: string) => {
    setDraggedItem(milestoneId);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, phaseId: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    // Remove from all phases first
    const newAssignments = { ...phaseAssignments };
    Object.keys(newAssignments).forEach(phase => {
      newAssignments[phase] = newAssignments[phase].filter(id => id !== draggedItem);
    });

    // Add to new phase
    if (!newAssignments[phaseId].includes(draggedItem)) {
      newAssignments[phaseId] = [...newAssignments[phaseId], draggedItem];
    }

    setPhaseAssignments(newAssignments);
    updateAnswer(newAssignments);
    setDraggedItem(null);
  };

  const removeMilestone = (milestoneId: string, phaseId: string) => {
    const newAssignments = { ...phaseAssignments };
    newAssignments[phaseId] = newAssignments[phaseId].filter(id => id !== milestoneId);
    setPhaseAssignments(newAssignments);
    updateAnswer(newAssignments);
  };

  const getUnassignedMilestones = () => {
    const assignedIds = new Set(Object.values(phaseAssignments).flat());
    return milestones.filter(m => !assignedIds.has(m.id));
  };

  const getMilestoneById = (id: string) => milestones.find(m => m.id === id);

  const checkAnswers = () => {
    setShowFeedback(true);
    updateAnswer(phaseAssignments, true);
  };

  const isCorrectPlacement = (milestoneId: string, phaseId: string) => {
    const milestone = getMilestoneById(milestoneId);
    return milestone?.correctPhase === phaseId;
  };

  const getColorClass = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
      orange: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
      green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      {/* Unassigned Milestones */}
      <div>
        <h3 className="font-semibold text-base mb-3">Project Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {getUnassignedMilestones().map((milestone) => (
            <Card
              key={milestone.id}
              draggable
              onDragStart={(e) => handleDragStart(e, milestone.id)}
              className="cursor-move hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-800"
            >
              <CardContent className="p-3">
                <p className="text-xs">{milestone.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {getUnassignedMilestones().length === 0 && (
          <div className="text-center text-muted-foreground p-4 border-2 border-dashed rounded-md">
            All milestones have been assigned! 
            <button 
              onClick={checkAnswers}
              className="ml-2 text-primary hover:underline"
            >
              Check your roadmap
            </button>
          </div>
        )}
      </div>

      {/* Phase Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {phases.map((phase) => (
          <Card 
            key={phase.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, phase.id)}
            className="min-h-[200px]"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {phase.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {phaseAssignments[phase.id].map((milestoneId) => {
                  const milestone = getMilestoneById(milestoneId);
                  const isCorrect = isCorrectPlacement(milestoneId, phase.id);
                  return milestone ? (
                    <div
                      key={milestoneId}
                      className={`p-2 rounded-md border ${
                        showFeedback 
                          ? isCorrect 
                            ? "bg-green-50 dark:bg-green-900/20 border-green-500" 
                            : "bg-red-50 dark:bg-red-900/20 border-red-500"
                          : getColorClass(phase.color)
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs flex-1">{milestone.text}</p>
                        <button
                          onClick={() => removeMilestone(milestoneId, phase.id)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
                        >
                          ×
                        </button>
                      </div>
                      {showFeedback && (
                        <div className="mt-1">
                          {isCorrect ? (
                            <CheckCircle className="h-3 w-3 text-green-600 inline" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-red-600 inline" />
                          )}
                        </div>
                      )}
                    </div>
                  ) : null;
                })}
                
                {phaseAssignments[phase.id].length === 0 && (
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-md p-6 text-center text-xs text-muted-foreground">
                    Drop milestones here
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showFeedback && (
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-sm">Correct Sequence:</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <p><strong>Weeks 1-2:</strong> #5 (Legal Sign-off), #2 (Finance Project Code), #10 (API Credentials)</p>
            <p><strong>Weeks 3-4:</strong> #6 (Develop Backend), #12 (Design UI/UX), #1 (Draft Training)</p>
            <p><strong>Month 2:</strong> #9 (Integration Testing), #8 (Provision Staging), #4 (UAT)</p>
            <p><strong>Month 3:</strong> #3 (Deploy to Production), #7 (Handoff to Support), #11 (Track Metrics)</p>
            <p className="mt-3 font-medium">Critical Dependency: The most critical dependency is the link between "Secure Legal Sign-off" (#5) and "Develop core AI prototype" (#6). This is the handoff from 'planning and permission' to 'active building.' A delay here stops all development before it can even start.</p>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Drag milestones to create your 90-day implementation roadmap
      </p>
    </div>
  );
}