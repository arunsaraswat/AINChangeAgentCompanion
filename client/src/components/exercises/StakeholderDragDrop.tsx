import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck } from "lucide-react";

interface StakeholderDragDropProps {
  answer: any;
  onAnswerChange: (value: any) => void;
}

interface Stakeholder {
  id: string;
  name: string;
  title: string;
}

const stakeholders: Stakeholder[] = [
  { id: "customerService", name: "Head of Customer Service", title: "Head of Customer Service" },
  { id: "sales", name: "VP of Sales", title: "VP of Sales" },
  { id: "legal", name: "General Counsel", title: "General Counsel (Legal)" },
  { id: "warehouse", name: "VP of Warehouse Operations", title: "VP of Warehouse Operations" },
  { id: "ciso", name: "Chief Information Security Officer", title: "Chief Information Security Officer (CISO)" },
  { id: "cto", name: "Chief Technology Officer", title: "Chief Technology Officer (CTO)" },
  { id: "product", name: "VP of Product Management", title: "VP of Product Management" },
  { id: "privacy", name: "Head of Privacy & Compliance", title: "Head of Privacy & Compliance" },
  { id: "supplyChain", name: "VP of Supply Chain", title: "VP of Supply Chain" },
  { id: "cfo", name: "Chief Financial Officer", title: "Chief Financial Officer (CFO)" },
  { id: "ux", name: "Head of User Experience", title: "Head of User Experience (UX)" },
  { id: "engineering", name: "VP of Engineering", title: "VP of Engineering" },
];

export default function StakeholderDragDrop({ answer = {}, onAnswerChange }: StakeholderDragDropProps) {
  // Parse answer if it's a string
  const parsedAnswer = typeof answer === 'string' ? (answer === '{}' ? {} : JSON.parse(answer)) : answer || {};
  
  const [criticalStakeholders, setCriticalStakeholders] = useState<string[]>(parsedAnswer.criticalStakeholders || []);
  const [executiveSponsor, setExecutiveSponsor] = useState<string | null>(parsedAnswer.executiveSponsor || null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    const parsed = typeof answer === 'string' ? (answer === '{}' ? {} : JSON.parse(answer)) : answer || {};
    if (parsed && typeof parsed === 'object') {
      if (parsed.criticalStakeholders) setCriticalStakeholders(parsed.criticalStakeholders);
      if (parsed.executiveSponsor) setExecutiveSponsor(parsed.executiveSponsor);
    }
  }, [answer]);

  const updateAnswer = (newCritical: string[], newSponsor: string | null) => {
    const newAnswer = {
      criticalStakeholders: newCritical,
      executiveSponsor: newSponsor
    };
    onAnswerChange(newAnswer);
  };

  const handleDragStart = (_e: React.DragEvent, stakeholderId: string) => {
    setDraggedItem(stakeholderId);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDropCritical = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem && criticalStakeholders.length < 3 && !criticalStakeholders.includes(draggedItem)) {
      const newCritical = [...criticalStakeholders, draggedItem];
      setCriticalStakeholders(newCritical);
      updateAnswer(newCritical, executiveSponsor);
    }
    setDraggedItem(null);
  };

  const handleDropSponsor = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem) {
      setExecutiveSponsor(draggedItem);
      updateAnswer(criticalStakeholders, draggedItem);
    }
    setDraggedItem(null);
  };

  const removeCriticalStakeholder = (stakeholderId: string) => {
    const newCritical = criticalStakeholders.filter(id => id !== stakeholderId);
    setCriticalStakeholders(newCritical);
    updateAnswer(newCritical, executiveSponsor);
  };

  const removeSponsor = () => {
    setExecutiveSponsor(null);
    updateAnswer(criticalStakeholders, null);
  };

  const getAvailableStakeholders = () => {
    const usedIds = new Set([...criticalStakeholders, executiveSponsor].filter(Boolean));
    return stakeholders.filter(s => !usedIds.has(s.id));
  };

  const getStakeholderById = (id: string) => stakeholders.find(s => s.id === id);

  return (
    <div className="space-y-6">
      {/* Available Stakeholders */}
      <div>
        <h3 className="font-semibold text-base mb-3">Available Stakeholders</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {getAvailableStakeholders().map((stakeholder) => (
            <Card
              key={stakeholder.id}
              draggable
              onDragStart={(e) => handleDragStart(e, stakeholder.id)}
              className="cursor-move hover:shadow-md transition-shadow bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
            >
              <CardContent className="p-3">
                <p className="text-xs font-medium text-center">{stakeholder.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {getAvailableStakeholders().length === 0 && (
          <div className="text-center text-muted-foreground p-4 border-2 border-dashed rounded-md">
            All stakeholders have been assigned!
          </div>
        )}
      </div>

      {/* Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Critical Stakeholders Drop Zone */}
        <Card 
          onDragOver={handleDragOver}
          onDrop={handleDropCritical}
          className="min-h-[200px]"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-4 w-4" />
              Critical Stakeholders (3)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalStakeholders.map((stakeholderId) => {
                const stakeholder = getStakeholderById(stakeholderId);
                return stakeholder ? (
                  <div
                    key={stakeholderId}
                    className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md"
                  >
                    <span className="text-sm font-medium">{stakeholder.title}</span>
                    <button
                      onClick={() => removeCriticalStakeholder(stakeholderId)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ) : null;
              })}
              
              {criticalStakeholders.length < 3 && (
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-md p-8 text-center text-sm text-muted-foreground">
                  Drop stakeholders here ({criticalStakeholders.length}/3)
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Executive Sponsor Drop Zone */}
        <Card 
          onDragOver={handleDragOver}
          onDrop={handleDropSponsor}
          className="min-h-[200px]"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Executive Sponsor
            </CardTitle>
          </CardHeader>
          <CardContent>
            {executiveSponsor ? (
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <span className="text-sm font-medium">
                  {getStakeholderById(executiveSponsor)?.title}
                </span>
                <button
                  onClick={removeSponsor}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/30 rounded-md p-8 text-center text-sm text-muted-foreground">
                Drop executive sponsor here
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Drag stakeholders to identify the 3 most critical ones and select the best executive sponsor
      </p>
    </div>
  );
}