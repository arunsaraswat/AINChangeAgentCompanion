import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CourseProgressProvider } from "./contexts/CourseProgressContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LessonPage from "./pages/LessonPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/lesson/:id/activity/:activityId">
        {(params) => <LessonPage lessonId={parseInt(params.id)} activityId={params.activityId} />}
      </Route>
      <Route path="/lesson/:id/:subLessonId/activity/:activityId">
        {(params) => <LessonPage lessonId={parseInt(params.id)} subLessonId={params.subLessonId} activityId={params.activityId} />}
      </Route>
      <Route path="/lesson/:id/:subLessonId?">
        {(params) => <LessonPage lessonId={parseInt(params.id)} subLessonId={params.subLessonId} />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CourseProgressProvider>
          <TooltipProvider>
            <Layout>
              <Router />
            </Layout>
            <Toaster />
          </TooltipProvider>
        </CourseProgressProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;