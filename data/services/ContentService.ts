import { Lesson } from '@shared/types';
import { getCourseContent } from '../course-content';

class ContentService {
  private static instance: ContentService;
  private courseContent: Lesson[] | null = null;

  private constructor() {}

  static getInstance(): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService();
    }
    return ContentService.instance;
  }

  async getCourseContent(): Promise<Lesson[]> {
    if (!this.courseContent) {
      // In a real app, this might fetch from an API
      // For now, we'll load from our local data
      this.courseContent = await getCourseContent();
    }
    return this.courseContent;
  }

  async getLesson(lessonId: number): Promise<Lesson | undefined> {
    const content = await this.getCourseContent();
    return content.find(lesson => lesson.id === lessonId);
  }

  async getSubLesson(lessonId: number, subLessonId: string) {
    const lesson = await this.getLesson(lessonId);
    return lesson?.subLessons?.find(sub => sub.id === subLessonId);
  }

  async getActivity(lessonId: number, activityId: string, subLessonId?: string) {
    const lesson = await this.getLesson(lessonId);
    if (!lesson) return undefined;

    if (subLessonId && lesson.subLessons) {
      // Activity within a sub-lesson
      const subLesson = lesson.subLessons.find(sl => sl.id === subLessonId);
      return subLesson?.activities?.find(a => a.id === activityId);
    } else if (lesson.activities) {
      // Direct activity under lesson
      return lesson.activities.find(a => a.id === activityId);
    }

    return undefined;
  }
}

export default ContentService.getInstance();