import { Lesson } from '@shared/types';

export const lesson8: Lesson = {
  id: 8,
  title: "Guiding Successful Implementations",
  duration: "90 minutes",
  description: "Navigate the complexities of AI implementation",
  activities: [
    {
      id: "activity-1",
      title: "Group Discussion: AI Implementation Surprises",
      type: "discussion",
      duration: "15 minutes",
      content: `
        <p>The workshop provides your map, but it doesn't play the game for you. Real-world implementations are full of surprises. Imagine three 'surprise events' pop up: 1. A new stakeholder has a 'critical' new feature request. 2. A vendor offers a 'shortcut' tool that promises to do everything. 3. The data you need is much messier than you were told. At your table, choose one event and decide on your team's first move.</p>
      `,
      exercises: [
        {
          id: "exercise-1",
          type: "textarea",
          label: "Choose one surprise event and describe your team's first move.",
          placeholder: "Select one of the three surprise events and explain your team's immediate response..."
        }
      ]
    },
    {
      id: "activity-2",
      title: "8.1 Blocker Buster Challenge",
      type: "group-work",
      duration: "30 minutes",
      content: `
        <p>In the real world, roadblocks are guaranteed. Your ability to act as an impediment remover is what separates a successful project from one that ends up in the POC graveyard. Read the scenario below describing a critical, project-stopping blocker. Your mission is to create a three-part 'Blocker Buster Action Plan' by answering the strategic questions.</p>
        
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4 mb-6">
          <h4 class="font-semibold mb-3">The Scenario:</h4>
          <p>Your AI project to automate sales proposals is in its third week. The development team has hit a major roadblock. The AI needs to pull customer history from a legacy CRM system, but the Head of IT Operations, a stakeholder who was missed during chartering, has put an immediate 90-day hold on your integration request. Her reasoning via email: "Any new integration with this mission-critical—but fragile—system is high-risk. My team has no bandwidth to support a new API connection until next quarter. We cannot risk system stability for an experimental AI project." The development team is now completely blocked.</p>
        </div>
      `,
      exercises: [
        {
          id: "exercise-2",
          type: "multi-step",
          label: "Create your three-part Blocker Buster Action Plan",
          steps: [
            {
              id: "first-conversation",
              type: "textarea",
              label: "1. The First Conversation: Who is the first person you must talk to, and what is the single most important, open-ended question you will ask to open the conversation productively?",
              description: "Ideal answer: The best first person to talk to is the Head of IT Operations. A great question is: \"Thank you for flagging this risk—protecting system stability is critical. To help us build a better plan, could you walk us through your biggest concerns and what a 'safe' integration process would look like from your team's perspective?\" This shows respect and turns an adversary into a partner."
            },
            {
              id: "workaround",
              type: "textarea",
              label: "2. The Workaround: What is one practical, short-term task the development team can work on for the next two weeks to maintain momentum, even while the main API access is blocked?",
              description: "Ideal answer: A practical workaround is to have the development team create a mock data file (e.g., a JSON file) that mimics the real CRM data. This allows them to continue building and testing the core AI logic in parallel, maintaining momentum."
            },
            {
              id: "escalation",
              type: "textarea",
              label: "3. The Escalation: To whom do you need to escalate this issue, and how will you frame the problem in a way that connects it to the project's core business value and avoids laying blame?",
              description: "Ideal answer: Escalate to the project's Executive Sponsor. Frame the issue by connecting it to business value: \"Our partners in IT have surfaced a valid stability risk, which currently blocks our path to achieving our goal of [mention specific success metric, e.g., 'a 15% increase in renewal rate']. I need your help in a conversation with IT leadership to align on a solution that protects both system stability and our business goal.\" This elevates the issue from a technical squabble to a strategic problem."
            }
          ]
        }
      ]
    },
    {
      id: "activity-3",
      title: "Change Agent Roles Discussion",
      type: "discussion",
      duration: "15 minutes",
      content: `
        <p>In the 'Blocker Buster' challenge, you had to decide on a first move, tackling either the technical blocker, the stakeholder relationship, or the escalation path. A great Change Agent knows which 'hat' to wear in which conversation.</p>
      `,
      exercises: [
        {
          id: "exercise-3",
          type: "textarea",
          label: "In that high-pressure moment, is the Change Agent's most critical role that of a Project Manager, a Diplomat, or a Strategist? And why?",
          placeholder: "Choose one role and explain why it's most critical in this scenario..."
        }
      ]
    },
    {
      id: "activity-4",
      title: "Insights & Action: Reflect and Apply",
      type: "reflection",
      duration: "10 minutes",
      content: `
        <p>Think about a project you worked on that hit unexpected roadblocks after planning was "complete." How could the impediment remover role have helped navigate those surprises? To apply this, try asking an AI to help you evaluate how to handle a specific blocker on a current project.</p>
      `,
      exercises: [
        {
          id: "exercise-4",
          type: "textarea",
          label: "My Personal Reflection",
          placeholder: "e.g., \"Ask AI: I'm managing an AI implementation that just discovered [blocker]. Help me evaluate whether to pivot, persevere, or escalate, and suggest three next steps.\""
        }
      ]
    }
  ]
};