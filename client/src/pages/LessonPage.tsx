import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LessonPageProps {
  lessonId: number;
  subLessonId?: string;
}

const lessonTitles: { [key: number]: string } = {
  1: "AI Opportunity Blind Spots",
  2: "Advancing AI Fluency",
  3: "Using Expert Facilitation to Guide Successful AI Solutions",
  4: "Creating the Stakeholder Map and Workshop Charter",
  5: "From Signals to Entry Points",
  6: "Facilitating The AI-Native Value Workshop",
  7: "Wrapping Up the Workshop: Defining the Implementation Roadmap",
  8: "Guiding Successful Implementations",
  9: "Scaling Success by Storytelling",
  10: "Expanding Your Impact",
};

export default function LessonPage({ lessonId, subLessonId }: LessonPageProps) {
  return (
    <div>
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-2">
          Lesson {lessonId}: {lessonTitles[lessonId] || "Unknown Lesson"}
        </h1>
        <p className="text-muted-foreground">
          Lesson content will be implemented here
          {subLessonId && ` - Sub-lesson: ${subLessonId}`}
        </p>
      </div>

      <div className="bg-card border rounded-lg p-8 text-center">
        <p className="text-lg text-muted-foreground">
          This lesson will be developed as part of the course content implementation.
        </p>
      </div>
    </div>
  );
}