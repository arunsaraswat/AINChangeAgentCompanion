import type { Lesson } from "@shared/types";

export const lesson10: Lesson = {
  id: 10,
  title: "Expanding Your Impact",
  duration: "10 minutes",
  description: "Grow your influence as an AI change agent and chart your path to becoming a Trusted Advisor in AI transformation.",
  activities: [
    {
      id: "activity-1",
      type: "reflection",
      title: "Activity 1: Individual Reflection - Your Path to Trusted Advisor",
      duration: "10 minutes",
      content: `<p>This final lesson is about your future. Take a moment to reflect on your career journey and the path ahead. The evolution from Change Agent to Trusted Advisor is a significant step. Think about what aspects of the Trusted Advisor role excite you most, what becoming a Trusted Advisor would mean for your impact on your organization, and what skills you'd need to develop to get there. Use the space below to set your 'North Star' for this journey and apply your learning by crafting a prompt for an AI to help you plan.</p>`,
      exercises: [
        {
          type: "textarea",
          id: "trusted-advisor-reflection",
          label: "My Personal Reflection (e.g., \"Ask AI: I'm a Change Agent interested in becoming a Trusted Advisor. Based on the responsibilities of guiding strategy and providing upskilling, help me create a 12-month skill development plan with specific learning goals.\")"
        }
      ]
    }
  ]
};