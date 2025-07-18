import { Lesson } from '@shared/types';

export const lesson7: Lesson = {
  id: 7,
  title: "Wrapping Up the Workshop: Defining the Implementation Roadmap",
  duration: "90 minutes",
  description: "Convert workshop insights into actionable implementation plans",
  activities: [
    {
      id: "activity-1",
      title: "Group Discussion: The Implementation Relay Race",
      type: "discussion",
      duration: "15 minutes",
      content: `
        <h3>Group Discussion: The Implementation Relay Race</h3>
        <p>A 90-day implementation is a high-stakes relay race where the 'baton' is the project's momentum. The race is won or lost in the handoffs. At your table, identify the first three critical handoffs in a project's race. For each, define: Who passes the baton? Who receives it? What signals a successful handoff?</p>
      `,
      exercises: [
        {
          id: "exercise-1",
          type: "textarea",
          label: "Describe your group's first three critical handoffs.",
          placeholder: "Enter your group's discussion about the three critical handoffs in an implementation relay race..."
        }
      ]
    },
    {
      id: "activity-2",
      title: "7.1 The 90-Day Dash",
      type: "group-work",
      duration: "30 minutes",
      content: `
        <h3>7.1 The 90-Day Dash</h3>
        <p>The AI-Native Value Blueprint is your map; now you must chart the course. A successful implementation depends on understanding dependencies. Read the Blueprint Summary and the 12 project milestones. Your mission is to create a logical 90-day roadmap by placing each milestone into the correct phase. Finally, identify the single most critical dependency.</p>
        
        <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
          <h4 class="font-semibold mb-3">Blueprint Summary:</h4>
          <ul class="space-y-2 text-sm">
            <li><strong>Value Thesis:</strong> Goal is to reduce proposal creation time by 75%, saving an estimated $2M annually. The Executive Sponsor (VP of Sales) requires a finalized budget from Finance before releasing a formal project code.</li>
            <li><strong>AI Solution:</strong> A RAG solution. The Core Development Team will build the backend logic; the UX Design Team will create wireframes.</li>
            <li><strong>Data Strategy:</strong> Requires real-time, read-only API access to Salesforce and SharePoint. The Data Engineering Team is responsible for provisioning credentials.</li>
            <li><strong>Risk Management:</strong> Legal and Compliance require a formal review of data handling protocols, and their explicit sign-off is required before development can begin.</li>
            <li><strong>Production & Operations:</strong> The solution will be deployed to a new cloud environment provisioned by the DevOps Team. The IT Support Team will take over day-to-day support after a formal handoff.</li>
            <li><strong>Value Realization:</strong> The Sales Enablement Team and "Change Champions" are responsible for creating training materials and leading User Acceptance Testing (UAT).</li>
          </ul>
        </div>
      `,
      exercises: [
        {
          id: "exercise-2a",
          type: "component",
          component: "NinetyDayDashDragDrop",
          label: "Create a logical 90-day roadmap by placing each milestone into the correct phase."
        },
        {
          id: "exercise-2b",
          type: "textarea",
          label: "Identify the single most critical dependency in your roadmap—a link between two milestones where a delay would cause the biggest ripple effect—and explain your choice.",
          placeholder: "Describe the critical dependency and explain why a delay here would have the biggest impact..."
        }
      ]
    },
    {
      id: "activity-3",
      title: "Class Discussion: Visual Tools for Momentum",
      type: "discussion",
      duration: "15 minutes",
      content: `
        <h3>Class Discussion: Visual Tools for Momentum</h3>
        <p>The roadmap you built is a story about how this project will succeed. It is also a powerful communication tool for making the consequences of change visible to everyone. Imagine it's Week 3 and an excited executive stakeholder asks you to start a 'Month 3' task immediately.</p>
      `,
      exercises: [
        {
          id: "exercise-3",
          type: "textarea",
          label: "How do you use the roadmap you just built as a visual tool to facilitate that conversation without just saying 'no'?",
          placeholder: "Describe how you would use the visual roadmap to explain dependencies and impacts..."
        }
      ]
    },
    {
      id: "activity-4",
      title: "Insights & Action: Reflect and Apply",
      type: "reflection",
      duration: "10 minutes",
      content: `
        <h3>Insights & Action: Reflect and Apply</h3>
        <p>Think about a project that had a great plan but failed during implementation. Which specific handoff or dependency might have caused the failure, and how would a visual roadmap have helped? To apply this, try asking an AI to help you plan a roadmap for an upcoming project.</p>
      `,
      exercises: [
        {
          id: "exercise-4",
          type: "textarea",
          label: "My Personal Reflection",
          placeholder: "e.g., \"Ask AI: Help me create a 90-day roadmap for my project, identify the top 5 critical dependencies, and suggest the optimal sequence.\""
        }
      ]
    }
  ]
};