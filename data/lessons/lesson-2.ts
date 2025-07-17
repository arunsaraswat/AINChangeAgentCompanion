import { Lesson } from '@shared/types';

export const lesson2: Lesson = {
  id: 2,
  title: "Advancing AI Fluency",
  duration: "45 minutes",
  description: "Build foundational AI knowledge across your organization",
  image: "/images/lesson2.jpg",
  activities: [
    {
      id: "activity-1",
      title: "Group Discussion - Translation Problems",
      type: "discussion",
      duration: "10 minutes",
      content: `
        <p>In this activity, we'll explore the communication challenges that arise when technical and business teams try to collaborate on initiatives.</p>
      `,
      exercises: [
        {
          id: "2.1.1",
          type: "textarea",
          label: "Group Discussion: Technical-Business Communication Gaps",
          description: "Let's surface some of the real communication breakdowns we've all experienced. When technical teams and business teams try to work together on initiatives, what usually gets lost in translation? Please share specific examples of these translation problems in the space below.",
          answer: ""
        }
      ]
    },
    {
      id: "activity-2",
      title: "Group Activity - Match the Method",
      type: "group-work",
      duration: "15 minutes",
      content: `
        <p>In this activity, you'll match AI approaches to business scenarios, then discuss your choices as a group to understand the "why" behind each pairing.</p>
      `,
      exercises: [
        {
          id: "2.2.1",
          type: "component",
          label: "2.1 Match the Method",
          description: "Drag and drop the Al Approach that is the \"best fit\" for each Business Scenario. After making your individual selections, discuss with your group to reach a consensus, explaining the 'why' behind your choices.",
          component: "MatchTheMethodDragDrop",
          answer: {}
        }
      ]
    },
    {
      id: "activity-3",
      title: "Class Discussion - Practical Risk vs. Perfect Solution",
      type: "discussion",
      duration: "15 minutes",
      content: `
        <p>Let's explore how AI Fluency helps you balance practical implementation needs with technical possibilities.</p>
      `,
      exercises: [
        {
          id: "2.3.1",
          type: "textarea",
          label: "Practical Risk vs. Perfect Solution",
          description: "During the last activity, you probably debated some of your matches. A Change Agent's job is to find the best fit for right now, not the perfect technical solution. Choosing an approach that is possible but not the best fit creates risks like \"wasted resources,\" \"unnecessary complexity,\" or \"slower time-to-value.\" How does your AI Fluency help you guide the team to the most practical starting point and avoid these risks?",
          answer: ""
        }
      ]
    },
    {
      id: "activity-4",
      title: "Individual Reflection",
      type: "reflection",
      duration: "10 minutes",
      content: `
        <p>Take time to reflect on how AI fluency can bridge communication gaps and improve collaboration.</p>
      `,
      exercises: [
        {
          id: "2.4.1",
          type: "textarea",
          label: "Insights & Action: Reflect and Apply",
          description: "Think about a recent meeting where technical and business teams struggled to understand each other. How might your AI fluency have changed that conversation? What questions could you have asked to bridge the gap? To apply this, try crafting a prompt for an AI to help you communicate a technical concept simply.",
          helperPrompt: "My Personal Reflection (e.g., \"Ask AI: Help me create a simple analogy to explain fine-tuning to my non-technical manager.\")",
          answer: ""
        }
      ]
    }
  ]
};