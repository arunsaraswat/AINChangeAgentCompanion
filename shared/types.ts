export interface ExerciseStep {
  id: string;
  label: string;
  description?: string;
  type?: "text" | "textarea" | "radio" | "checkbox";
  options?: string[];
  answer?: string | string[];
}

export interface Exercise {
  id: string;
  type: "text" | "textarea" | "radio" | "checkbox" | "multi-step" | "radio-with-text" | "component" | "link";
  label: string;
  description?: string;
  options?: string[];
  answer?: string | string[];
  component?: string;
  followUpLabel?: string;
  followUpDescription?: string;
  followUpAnswer?: string;
  steps?: ExerciseStep[];
  link?: string;
  helperPrompt?: string;
}

export interface SubLesson {
  id: string;
  title: string;
  content: string;
  exercises?: Exercise[];
  completed?: boolean;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  description: string;
  image?: string;
  subLessons: SubLesson[];
}