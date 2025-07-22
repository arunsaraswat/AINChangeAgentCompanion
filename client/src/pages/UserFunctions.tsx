import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Moon, 
  Sun, 
  Download, 
  Upload, 
  RotateCcw, 
  Printer,
  FileDown,
  FileUp,
  Trash2,
  Eye
} from "lucide-react";
import { useCourseProgress } from "@/contexts/CourseProgressContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function UserFunctions() {
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Functions</h1>
        <p className="text-muted-foreground">
          Manage your app preferences and course progress data
        </p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how the app looks on your device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <>
                <Moon className="mr-2 h-4 w-4" />
                Switch to Dark Mode
              </>
            ) : (
              <>
                <Sun className="mr-2 h-4 w-4" />
                Switch to Light Mode
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* View Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            View Options
          </CardTitle>
          <CardDescription>
            Different ways to view your course progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => window.open('/print-view', '_blank')}
          >
            <Printer className="mr-2 h-4 w-4" />
            Open Print View
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Opens a printer-friendly version of your course progress in a new tab
          </p>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>
            Export, import, or reset your course progress data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={exportProgress}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Progress
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Download your course progress as a JSON file to save or share
            </p>
          </div>

          <div>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleImport}
            >
              <Upload className="mr-2 h-4 w-4" />
              Import Progress
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Load previously exported progress from a JSON file
            </p>
          </div>

          <div className="pt-4 border-t">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-destructive hover:text-destructive"
              onClick={() => {
                if (confirm("Are you sure you want to clear all your progress? This action cannot be undone.")) {
                  clearProgress();
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All Data
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Permanently delete all your course progress and answers
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}