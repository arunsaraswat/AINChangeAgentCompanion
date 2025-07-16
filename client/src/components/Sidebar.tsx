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
  Sparkles,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourseProgress } from "@/contexts/CourseProgressContext";
import { useTheme } from "@/contexts/ThemeContext";

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

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location, setLocation] = useLocation();
  const { exportProgress, importProgress, clearProgress } = useCourseProgress();
  const { theme, toggleTheme } = useTheme();

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

  const handleNavigation = (href: string) => {
    setLocation(href);
    // Close sidebar on mobile after navigation
    if (onClose && window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <div className="w-80 bg-card border-r flex flex-col h-full">
      {/* App Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-primary-foreground" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-semibold">AI-Native Change Agent</h1>
              <p className="text-xs text-muted-foreground">Class Companion App</p>
            </div>
          </div>
          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="space-y-1">
          {/* Dashboard Link */}
          <button
            onClick={() => handleNavigation("/")}
            className={cn(
              "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors mb-4",
              location === "/"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Home className="mr-3 h-4 w-4 flex-shrink-0" />
            Dashboard
          </button>

          {/* Lessons Separator */}
          <div className="pt-2 pb-2">
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Lessons
            </p>
          </div>

          {/* Lesson Links */}
          {navigation.slice(1).map((item) => {
            // Check if the current location starts with the lesson path
            // This handles both /lesson/1 and /lesson/1/activity URLs
            const isActive = location.startsWith(item.href);
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                <span className="text-left">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto border-t">
        {/* Dark Mode Toggle */}
        <div className="p-4 border-b">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon className="mr-2 h-4 w-4" />
            ) : (
              <Sun className="mr-2 h-4 w-4" />
            )}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </Button>
        </div>

        {/* Data Management */}
        <div className="p-4 space-y-2">
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
            Clear All Data
          </Button>
        </div>
      </div>
    </div>
  );
}