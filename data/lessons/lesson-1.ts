import { Lesson } from '@shared/types';

export const lesson1: Lesson = {
  id: 1,
  title: "AI Opportunity Blind Spots",
  duration: "45 minutes",
  description: "Identify and overcome hidden barriers to AI adoption",
  image: "/images/lesson1.jpg",
  subLessons: [
    {
      id: "1.1",
      title: "Section 1: Group Discussion - Failed Projects",
      content: `
        <p>In this section, we'll explore 'cool' initiatives in organizations that generated excitement but ultimately failed to deliver on their promises.</p>
      `,
      exercises: [
        {
          id: "1.1.1",
          type: "textarea",
          label: "Group Discussion: Failed Projects",
          description: "Think about the 'cool' initiatives in your organization that everyone was excited about but that never quite delivered what was promised. In the space below, please share your group's thoughts on a specific example and what got in the way of its success.",
          answer: ""
        }
      ]
    },
    {
      id: "1.2",
      title: "Section 2: Class Activity - Where Is Your Blind Spot?",
      content: `
        <p>This activity has three steps. First, you will reflect silently. Second, you will vote on your organization's biggest blind spot. Third, you will discuss your choice with a group.</p>
      `,
      exercises: [
        {
          id: "1.2.1",
          type: "multi-step",
          label: "Class Activity: 1.1 Where Is Your Blind Spot",
          description: "This activity has three steps. First, you will reflect silently. Second, you will vote on your organization's biggest blind spot. Third, you will discuss your choice with a group.",
          steps: [
            {
              id: "step-1",
              label: "Step 1: Reflect",
              description: "Take a moment to silently consider the three AI Opportunity blind spots: Value Gap, POC Graveyard, and Hype vs. Reality. Think about your own organization. Which of these three blind spots, if solved, would unlock the most significant, tangible value?",
              type: "text",
              answer: ""
            },
            {
              id: "step-2",
              label: "Step 2: Vote",
              description: "Please select the blind spot that represents your organization's biggest obstacle and opportunity.",
              type: "radio",
              options: ["Value Gap", "POC Graveyard", "Hype vs. Reality"],
              answer: ""
            },
            {
              id: "step-3",
              label: "Step 3: Group Discussion & Diagnosis",
              description: "Now that you are in a group with people who share your perspective, your task is to discuss and share specific examples of how this blind spot shows up at work. What does it look like? What does it cost you? Try to identify a common theme or the most impactful story from your collective experience.",
              type: "textarea",
              answer: ""
            }
          ]
        }
      ]
    },
    {
      id: "1.3",
      title: "Section 3: Class Discussion - Insights Debrief",
      content: `
        <p>Review your group's findings and prepare to share with the class.</p>
      `,
      exercises: [
        {
          id: "1.3.1",
          type: "textarea",
          label: "Class Discussion: Insights",
          description: "As a group, review your notes from the previous exercise. Nominate one person to summarize your findings by answering the questions below. Please summarize your group's discussion. Be sure to include: 1. The name of your blind spot. 2. Common patterns and examples. 3. The most significant negative impact you identified.",
          answer: ""
        }
      ]
    },
    {
      id: "1.4",
      title: "Section 4: Individual Reflection",
      content: `
        <p>Take time to reflect personally on how these blind spots affect your organization's AI initiatives.</p>
      `,
      exercises: [
        {
          id: "1.4.1",
          type: "textarea",
          label: "Insights & Action: Reflect",
          description: "Think about a recent 'cool technology' project in your organization. Use the space below to write about which of the three blind spots most likely caused its struggles and how the Change Agent approach might have prevented these issues.",
          answer: ""
        }
      ]
    }
  ]
};