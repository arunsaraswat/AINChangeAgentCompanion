import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen
} from "lucide-react";
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
  const { getOverallProgress, getLessonProgress, progress } = useCourseProgress();
  const overallProgress = getOverallProgress();

  // Calculate current lesson and next action
  const currentLesson = lessons.find(lesson => {
    const progress = getLessonProgress(lesson.id);
    return progress > 0 && progress < 100;
  }) || lessons.find(lesson => getLessonProgress(lesson.id) === 0);


  return (
    <div className="space-y-6">
      {/* Hero Section - Change Agent Journey */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-lg p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Your Change Agent Journey</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {overallProgress === 0 
                ? "Ready to begin your transformation into an AI-Native Change Agent"
                : overallProgress < 30 
                ? "Building your foundation as an AI Change Agent"
                : overallProgress < 70
                ? "Developing mastery in AI transformation leadership"
                : "Preparing to lead impactful AI initiatives"}
            </p>
            {currentLesson && (
              <div className="flex items-center gap-4">
                <Link href={`/lesson/${currentLesson.id}`}>
                  <Button size="lg" className="gap-2">
                    Continue Lesson {currentLesson.id}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {currentLesson.title}
                </p>
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${overallProgress * 3.52} 352`}
                  className="text-indigo-600 dark:text-indigo-400 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{overallProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* Lesson Progress - Compact View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Lesson Progress
          </CardTitle>
          <CardDescription>Your journey through all 10 lessons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lessons.map((lesson) => {
              const lessonProgress = getLessonProgress(lesson.id);
              return (
                <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-semibold">
                        {lesson.id}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{lesson.title}</p>
                      <Progress value={lessonProgress} className="h-1.5 mt-1" />
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-sm font-medium">{lessonProgress}%</p>
                      <p className="text-xs text-muted-foreground">
                        {lessonProgress === 0 ? "Not started" : lessonProgress === 100 ? "Complete" : "In progress"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}