import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Home,
  Eye,
  Brain,
  Users,
  Map,
  Compass,
  Presentation,
  ClipboardCheck,
  Rocket,
  Megaphone,
  TrendingUp,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourseProgress } from "@/contexts/CourseProgressContext";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Lesson 1: AI Opportunity Blind Spots", href: "/lesson/1", icon: Eye },
  { name: "Lesson 2: Advancing AI Fluency", href: "/lesson/2", icon: Brain },
  { name: "Lesson 3: Using Expert Facilitation to Guide Successful AI Solutions", href: "/lesson/3", icon: Users },
  { name: "Lesson 4: Creating the Stakeholder Map and Workshop Charter", href: "/lesson/4", icon: Map },
  { name: "Lesson 5: From Signals to Entry Points", href: "/lesson/5", icon: Compass },
  { name: "Lesson 6: Facilitating The AI-Native Value Workshop", href: "/lesson/6", icon: Presentation },
  { name: "Lesson 7: Wrapping Up the Workshop: Defining the Implementation Roadmap", href: "/lesson/7", icon: ClipboardCheck },
  { name: "Lesson 8: Guiding Successful Implementations", href: "/lesson/8", icon: Rocket },
  { name: "Lesson 9: Scaling Success by Storytelling", href: "/lesson/9", icon: Megaphone },
  { name: "Lesson 10: Expanding Your Impact", href: "/lesson/10", icon: TrendingUp },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { exportProgress, importProgress, clearProgress } = useCourseProgress();

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        try {
          importProgress(text);
          alert("Progress imported successfully!");
        } catch (error) {
          alert("Failed to import progress. Please check the file format.");
        }
      }
    };
    input.click();
  };

  return (
    <div className="w-80 bg-card border-r flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Course Navigation</h2>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={exportProgress}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Progress
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={handleImport}
        >
          <Upload className="mr-2 h-4 w-4" />
          Import Progress
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={clearProgress}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear Progress
        </Button>
      </div>
    </div>
  );
}