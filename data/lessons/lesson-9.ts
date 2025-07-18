import type { Lesson } from "@shared/types";

export const lesson9: Lesson = {
  id: 9,
  title: "Scaling Success by Storytelling",
  duration: "45 minutes",
  description: "Master the art of transforming AI success stories into organizational momentum. Learn how to identify, craft, and share compelling narratives that inspire broader AI adoption and drive change across teams.",
  activities: [
    {
      id: "activity-1",
      type: "discussion",
      title: "Activity 1: Group Discussion - The Scaling Success Gap",
      duration: "10 minutes",
      content: `<p>Project Cygnus delivered 83% time savings and a 4x ROI—undeniably successful results. What's the single biggest reason breakthrough AI successes like this often stay trapped in silos instead of spreading across the organization? Consider barriers like communication gaps, busy teams, or a lack of process for sharing wins.</p>`,
      exercises: [
        {
          type: "textarea",
          id: "scaling-gap-discussion",
          label: "What is the biggest reason successful projects stay in silos?"
        }
      ]
    },
    {
      id: "activity-2",
      type: "group-work",
      title: "Activity 2: Group Activity - 9.1 Success Storyboard",
      duration: "20 minutes",
      content: `<p>Your goal is to turn a successful AI pilot into a story that builds momentum and inspires action. First, review the summary of "Project Cygnus" below. Then, as a group, outline a 6-part presentation by writing a compelling headline and 2-3 key bullet points for each part, following the 6-part story framework.</p>`,
      exercises: [
        {
          type: "multi-step",
          id: "success-storyboard",
          label: "Success Storyboard",
          description: "**Initial Problem:** The enterprise sales team spent an average of 12 hours creating each complex renewal proposal. The manual process led to inconsistent quality, errors, and significant rework, pulling top sellers away from client-facing activities.\n\n**The AI Solution:** A RAG-based AI assistant, \"Project Cygnus,\" was built. It securely connects to Salesforce for client data and to SharePoint for product information to generate a high-quality first draft in minutes.\n\n**The Results (90 Days Post-Launch):** Proposal creation time was reduced from 12 hours to 2 (an 83% reduction). Errors dropped by 90%. The solution freed up an estimated 500 hours per month across the sales team. The total project cost was $150,000, and the value of time saved is estimated at $600,000 annually, yielding a 4x ROI.\n\n---\n\n**Example for \"The Proof\":**\nHeadline: Massive Gains in Speed, Quality, and Value\nBullets:\n• 83% Faster (12 hours to 2)\n• 90% Fewer Errors\n• 4x ROI ($150k investment delivers $600k annual value)\n\n**Facilitator Tips:** When presenting results, translate data into impact. For example, frame \"500 hours saved per month\" as \"We gave our sales team a week of their time back, every month.\" For the \"What's Next?\" slide, propose a specific, logical next step (like automating Statements of Work) to make other leaders see themselves in the story.",
          steps: [
            {
              id: "part-1-challenge",
              type: "textarea",
              label: "Part 1: The Challenge (Describe the \"before\" state and the business pain)"
            },
            {
              id: "part-2-commitment",
              type: "textarea",
              label: "Part 2: The Commitment to Act (What was the trigger event or \"why now?\")"
            },
            {
              id: "part-3-discovery",
              type: "textarea",
              label: "Part 3: The Discovery (What was the unexpected \"aha!\" moment that revealed a new path?)"
            },
            {
              id: "part-4-journey",
              type: "textarea",
              label: "Part 4: The Journey (Briefly describe the process of designing and building the solution)"
            },
            {
              id: "part-5-proof",
              type: "textarea",
              label: "Part 5: The Proof (What were the quantifiable results that demonstrated success?)"
            },
            {
              id: "part-6-next",
              type: "textarea",
              label: "Part 6: What's Next? (What is the future opportunity and call to action for other teams?)"
            }
          ]
        }
      ]
    },
    {
      id: "activity-3",
      type: "discussion",
      title: "Activity 3: Class Discussion - Success Storyboard Debrief",
      duration: "10 minutes",
      content: `<p>A great success story translates data into impact and focuses on business benefits. It makes other leaders see themselves in the story and inspires them to act. Share some of the key headlines your group created that were designed to generate interest from other teams.</p>`,
      exercises: [
        {
          type: "textarea",
          id: "storyboard-debrief",
          label: "Share your group's headline for \"The Proof\" and \"What's Next?\". Explain how these headlines create interest and a call to action."
        }
      ]
    },
    {
      id: "activity-4",
      type: "reflection",
      title: "Activity 4: Individual Reflection - Scaling Success",
      duration: "5 minutes",
      content: `<p>Think about a successful project in your organization that few people know about. How could you transform this hidden success into a compelling story? To apply this, try asking an AI to help you craft an executive summary for a recently completed project.</p>`,
      exercises: [
        {
          type: "textarea",
          id: "scaling-reflection",
          label: "My Personal Reflection (e.g., \"Ask AI: I recently completed [project]. Help me craft a compelling 3-slide executive summary that highlights the problem, approach, and measurable impact.\")"
        }
      ]
    }
  ]
};