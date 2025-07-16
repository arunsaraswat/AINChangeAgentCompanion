import React from "react";
import { Activity } from "@shared/types";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityNavProps {
  activities: Activity[];
  currentActivityId: string;
  completedActivities: Set<string>;
  onActivitySelect: (activityId: string) => void;
}

export default function ActivityNav({
  activities,
  currentActivityId,
  completedActivities,
  onActivitySelect,
}: ActivityNavProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-4 pr-2 scrollbar-hide">
        {activities.map((activity, index) => {
          const isActive = activity.id === currentActivityId;
          const isCompleted = completedActivities.has(activity.id);
          const isLast = index === activities.length - 1;

          return (
            <React.Fragment key={activity.id}>
              <button
                onClick={() => onActivitySelect(activity.id)}
                className={cn(
                  "flex flex-col items-center min-w-[100px] md:min-w-[120px] p-2 md:p-3 rounded-lg border-2 transition-all",
                  "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary",
                  isActive && "border-primary bg-primary/5",
                  !isActive && isCompleted && "border-green-500 bg-green-50 dark:bg-green-950",
                  !isActive && !isCompleted && "border-gray-300 dark:border-gray-700"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : isActive ? (
                    <div className="h-5 w-5 rounded-full border-2 border-primary bg-primary animate-pulse" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <span className="text-sm font-medium">
                    Activity {index + 1}
                  </span>
                </div>
                <h3 className="text-xs font-medium text-center line-clamp-2">
                  {activity.title}
                </h3>
                {activity.duration && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.duration}
                  </div>
                )}
              </button>
              {!isLast && (
                <div className="flex items-center">
                  <div className={cn(
                    "h-0.5 w-8 transition-colors",
                    isCompleted ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                  )} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      <div className="text-sm text-muted-foreground mt-2">
        Progress: {completedActivities.size} of {activities.length} activities completed
      </div>
    </div>
  );
}