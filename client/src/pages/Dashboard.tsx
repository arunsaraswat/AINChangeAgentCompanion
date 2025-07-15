import React from "react";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Trophy, Clock } from "lucide-react";
import { useCourseProgress } from "@/contexts/CourseProgressContext";

// Placeholder lesson data - will be replaced when lessons are implemented
const lessons = [
  { id: 1, title: "AI Opportunity Blind Spots", description: "Identify and overcome hidden barriers to AI adoption" },
  { id: 2, title: "Advancing AI Fluency", description: "Build foundational AI knowledge across your organization" },
  { id: 3, title: "Using Expert Facilitation to Guide Successful AI Solutions", description: "Master facilitation techniques for AI transformation" },
  { id: 4, title: "Creating the Stakeholder Map and Workshop Charter", description: "Design comprehensive stakeholder engagement strategies" },
  { id: 5, title: "From Signals to Entry Points", description: "Recognize opportunities and create pathways for AI integration" },
  { id: 6, title: "Facilitating The AI-Native Value Workshop", description: "Lead workshops that uncover AI value opportunities" },
  { id: 7, title: "Wrapping Up the Workshop: Defining the Implementation Roadmap", description: "Convert workshop insights into actionable plans" },
  { id: 8, title: "Guiding Successful Implementations", description: "Navigate the complexities of AI implementation" },
  { id: 9, title: "Scaling Success by Storytelling", description: "Leverage storytelling to drive organizational change" },
  { id: 10, title: "Expanding Your Impact", description: "Grow your influence as an AI change agent" },
];

export default function Dashboard() {
  const { getOverallProgress, getLessonProgress } = useCourseProgress();
  const overallProgress = getOverallProgress();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to AI-Native Change Agent Training</h1>
        <p className="text-muted-foreground">
          Master the skills to lead transformative change in the AI era
        </p>
      </div>

      {/* Overall Progress Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Overall Progress
          </CardTitle>
          <CardDescription>Your journey to becoming an AI-Native Change Agent</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="mb-2" />
          <p className="text-sm text-muted-foreground">{overallProgress}% Complete</p>
        </CardContent>
      </Card>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Lessons</p>
                <p className="text-2xl font-bold">10</p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Trophy className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Est. Time</p>
                <p className="text-2xl font-bold">40h</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => {
          const progress = getLessonProgress(lesson.id);
          return (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-sm font-normal text-muted-foreground">
                    {progress}% Complete
                  </span>
                </CardTitle>
                <CardDescription className="text-lg font-semibold">
                  Lesson {lesson.id}: {lesson.title}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{lesson.description}</p>
                <Progress value={progress} className="mb-4" />
                <Link href={`/lesson/${lesson.id}`}>
                  <Button className="w-full">
                    {progress > 0 ? "Continue" : "Start"} Lesson
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}