import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Target,
  Lightbulb,
  Activity,
  Briefcase,
  CheckCircle,
  TrendingUp,
  Map,
  Users,
  MessageSquare,
  FileText,
  Zap
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

// Core competencies for change agents
const competencies = [
  { id: "ai-fluency", name: "AI Fluency", icon: Zap },
  { id: "facilitation", name: "Facilitation Excellence", icon: Users },
  { id: "stakeholder", name: "Stakeholder Engagement", icon: MessageSquare },
  { id: "communication", name: "Strategic Communication", icon: MessageSquare },
  { id: "planning", name: "Implementation Planning", icon: Map },
  { id: "leadership", name: "Change Leadership", icon: Target }
];

export default function Dashboard() {
  const { getOverallProgress, getLessonProgress, progress } = useCourseProgress();
  const overallProgress = getOverallProgress();

  // Calculate current lesson and next action
  const currentLesson = lessons.find(lesson => {
    const progress = getLessonProgress(lesson.id);
    return progress > 0 && progress < 100;
  }) || lessons.find(lesson => getLessonProgress(lesson.id) === 0);

  // Calculate time invested (mock data for now)
  const timeInvested = Math.round(overallProgress * 0.4); // 40 hours total
  const exercisesCompleted = Object.values(progress.lessons).reduce((total, lesson) => {
    const activities = lesson.activities ? Object.values(lesson.activities) : [];
    const subLessons = lesson.subLessons ? Object.values(lesson.subLessons) : [];
    
    const activityExercises = activities.reduce((count, activity) => {
      return count + (activity.exercises ? Object.keys(activity.exercises).length : 0);
    }, 0);
    
    const subLessonExercises = subLessons.reduce((count, subLesson) => {
      return count + (subLesson.exercises ? Object.keys(subLesson.exercises).length : 0);
    }, 0);
    
    return total + activityExercises + subLessonExercises;
  }, 0);

  // Mock implementation readiness score
  const implementationReadiness = Math.min(Math.round(overallProgress * 0.8 + exercisesCompleted * 2), 100);

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

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-8 w-8 text-indigo-500" />
              <span className="text-2xl font-bold">{exercisesCompleted}</span>
            </div>
            <p className="text-sm font-medium">Exercises Completed</p>
            <p className="text-xs text-muted-foreground">Building practical skills</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold">{timeInvested}h</span>
            </div>
            <p className="text-sm font-medium">Time Invested</p>
            <p className="text-xs text-muted-foreground">Of 40h total journey</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold">{implementationReadiness}%</span>
            </div>
            <p className="text-sm font-medium">Implementation Ready</p>
            <p className="text-xs text-muted-foreground">Prepared to lead change</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <Briefcase className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">0</span>
            </div>
            <p className="text-sm font-medium">Tools Mastered</p>
            <p className="text-xs text-muted-foreground">Ready to deploy</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Development Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Competencies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Core Competencies
            </CardTitle>
            <CardDescription>Your skill development across key areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competencies.map((competency) => {
                const Icon = competency.icon;
                // Mock skill levels based on progress
                const skillLevel = Math.min(
                  100,
                  Math.round(overallProgress * (0.7 + Math.random() * 0.3))
                );
                
                return (
                  <div key={competency.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{competency.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skillLevel}%</span>
                    </div>
                    <Progress value={skillLevel} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overallProgress > 0 ? (
                <>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Completed: Technical-Business Communication Gaps</p>
                      <p className="text-xs text-muted-foreground">Lesson 2 • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <Activity className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">In Progress: Match the Method Exercise</p>
                      <p className="text-xs text-muted-foreground">Lesson 2 • Continue now</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No activity yet</p>
                  <p className="text-xs">Start your first lesson to begin tracking</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Key Insights Captured
            </CardTitle>
            <CardDescription>Important learnings from your journey</CardDescription>
          </CardHeader>
          <CardContent>
            {exercisesCompleted > 0 ? (
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <p className="text-sm font-medium mb-1">Communication gaps create AI adoption barriers</p>
                  <p className="text-xs text-muted-foreground">From Lesson 2: Advancing AI Fluency</p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm font-medium mb-1">Stakeholder mapping is crucial for success</p>
                  <p className="text-xs text-muted-foreground">From Lesson 4: Stakeholder Mapping</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No insights captured yet</p>
                <p className="text-xs">Complete exercises to capture learnings</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Your Action Plan
            </CardTitle>
            <CardDescription>Next steps for your organization</CardDescription>
          </CardHeader>
          <CardContent>
            {exercisesCompleted > 0 ? (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-sm">Identify key stakeholders for AI initiatives</p>
                    <p className="text-xs text-muted-foreground">Priority: High</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-sm">Schedule AI fluency workshop for leadership team</p>
                    <p className="text-xs text-muted-foreground">Priority: Medium</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No action items yet</p>
                <p className="text-xs">Progress through lessons to build your plan</p>
              </div>
            )}
          </CardContent>
        </Card>
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