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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activities.map((activity, index) => {
          const isActive = activity.id === currentActivityId;
          const isCompleted = completedActivities.has(activity.id);

          return (
            <button
              key={activity.id}
              onClick={() => onActivitySelect(activity.id)}
              className={cn(
                "flex flex-col p-4 rounded-lg border-2 transition-all",
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
              <h3 className="text-sm font-medium text-left line-clamp-2">
                {activity.title}
              </h3>
              {activity.duration && (
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {activity.duration}
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="text-sm text-muted-foreground mt-4">
        Progress: {completedActivities.size} of {activities.length} activities completed
      </div>
    </div>
  );
}