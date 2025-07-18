import { Lesson } from '@shared/types';

export const lesson5: Lesson = {
  id: 5,
  title: "From Signals to Entry Points",
  duration: "50 minutes",
  description: "Recognize opportunities and create pathways for AI integration",
  subLessons: [
    {
      id: '5.1',
      title: 'Finding Your Organization\'s Signals',
      description: 'Organizations face pressure from many directions as AI evolves rapidly. These pressures are "signals" that indicate opportunities for change. Learning to identify and prioritize these signals is the first step in guiding successful AI transformation.',
      activities: [
        {
          id: '5.1.1',
          title: 'Group Discussion: AI Conversations You\'re Hearing',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                Every organization is feeling pressure from the rapid evolution of AI. These pressures are the 
                'signals' that indicate a need for change. What AI conversations are happening in your organization 
                right now? Are there concerns about competition? Questions from leadership? Requests from customers?
              </p>
            </div>
          `,
          exercises: [
            {
              id: '5.1.1.1',
              type: 'textarea',
              label: 'Share the AI conversations and pressures your group is observing.',
              helperPrompt: `Help me identify and categorize the AI-related signals I'm hearing in my organization. Based on these conversations and pressures: [describe what you're hearing], help me understand which signals have the most energy and urgency behind them.`
            }
          ]
        },
        {
          id: '5.1.2',
          title: '5.1 Find the Energy',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                Read the sponsor's statement below, which contains several 'acceleration signals.' Your goal is to 
                identify the single signal with the most energy behind it—the one causing the most immediate and 
                tangible pain. Discuss with your group to reach a consensus.
              </p>
              
              <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p class="italic">
                  "Look, I'll be direct. The board is pressuring me about AI ever since our CEO returned from 
                  that industry conference. But that's not the main issue. The real problem is that our main 
                  competitor just launched an AI-powered 'Instant Quoting' feature, and our sales team has 
                  confirmed we've lost at least three major deals last month because we're still taking 48 hours 
                  to respond. We have ten years of historical quote data just sitting in a database doing 
                  nothing—I have to believe the answer is in there. Frankly, I'm nervous because the last 'AI 
                  project' we attempted two years ago was a complete failure that set my budget back a million 
                  dollars. But doing nothing feels even worse."
                </p>
              </div>
            </div>
          `,
          exercises: [
            {
              id: '5.1.2.1',
              type: 'radio',
              label: 'The signal with the most energy is:',
              options: [
                'Past AI failures',
                'Competitive gaps',
                'Leadership pressure',
                'Customer expectations',
                'Scale limitations',
                'Unused assets',
                'Compliance concerns',
                'Innovation opportunities'
              ],
              helperPrompt: `Analyze this sponsor statement for acceleration signals. Help me identify which signal has the most energy by looking for: explicit language ("the real problem is"), quantifiable impacts (lost deals), and urgency indicators (happening now vs. potential future issues). The correct answer is "Competitive gaps" because the sponsor explicitly says "...the real problem is..." and then describes losing three specific deals. This is a quantifiable, urgent business pain happening right now, which carries the most energy for driving action.`
            }
          ]
        },
        {
          id: '5.1.3',
          title: 'Strategic Advantage of Finding Real Problems',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                In the exercise, you found the strongest signal among competing pressures. This is a critical 
                first move. By focusing on the sponsor's real problem (the competitive gap) instead of their 
                stated problem (the board pressure), you build trust, frame the project around tangible value, 
                and create urgency.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '5.1.3.1',
              type: 'textarea',
              label: 'What strategic advantage do you gain by starting the conversation with the sponsor\'s real problem?',
              helperPrompt: `Help me articulate the strategic advantages of addressing the sponsor's real problem (competitive gap) versus their stated problem (board pressure). Consider trust-building, value framing, urgency creation, and stakeholder alignment.`
            }
          ]
        }
      ]
    },
    {
      id: '5.2',
      title: 'Using Lenses to Guide Discovery',
      description: 'Different AI requests require different discovery approaches. By choosing the right "lens" for exploration and the right "entry point" for workshops, you can guide teams toward solutions that address their most pressing needs while building momentum for transformation.',
      activities: [
        {
          id: '5.2.1',
          title: 'Group Discussion: Three Different AI Requests',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                Each type of AI request requires a different discovery approach. Imagine three different leaders 
                approach you with the ideas below. For each scenario, what is the very first question you would 
                need to ask to understand the situation before proposing any solution?
              </p>
              
              <ol class="list-decimal list-inside space-y-2 mt-4">
                <li>'Our competitor just launched an AI feature, and the board wants to know our response.'</li>
                <li>'I keep hearing about the 10 years of customer data we have that's just sitting there unused.'</li>
                <li>'Our internal processes are so slow and manual; we have to be able to fix them with AI.'</li>
              </ol>
            </div>
          `,
          exercises: [
            {
              id: '5.2.1.1',
              type: 'textarea',
              label: 'For each of the three scenarios, what is the first question you would ask?',
              helperPrompt: `Help me craft discovery questions for these three AI scenarios. For each, suggest a first question that: 1) Uncovers the real pain or opportunity, 2) Avoids jumping to solutions, 3) Opens up productive dialogue about value and feasibility.`
            }
          ]
        },
        {
          id: '5.2.2',
          title: 'Choose Your Lens, Pick Your Door',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                Based on the 'Instant Quoting' competitor scenario, you must now prepare for the discovery 
                conversation and plan the workshop. First, choose the most effective 'Discovery Lens' to start 
                the conversation. Second, choose the best 'Workshop Entry Point' to begin the workshop after 
                the Value Thesis. Your reasoning should connect the two.
              </p>
              
              <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p class="font-semibold mb-2">Scenario Recap:</p>
                <p>
                  Your sponsor's primary concern is losing deals to a competitor who has a new AI-powered 
                  "Instant Quoting" feature. The sponsor knows they have a decade of historical quote data 
                  and feels a sense of urgency to counter this threat.
                </p>
              </div>
            </div>
          `,
          exercises: [
            {
              id: '5.2.2.1',
              type: 'radio',
              label: 'Choose Your Discovery Lens',
              options: [
                'Fix Operations',
                'Catch Competitors',
                'Unlock Assets',
                'Meet Mandates'
              ],
              helperPrompt: `The correct choice is "Catch Competitors" since the primary signal is a competitive gap.`
            },
            {
              id: '5.2.2.2',
              type: 'radio',
              label: 'Choose Your Workshop Entry Point',
              options: [
                'AI Solution',
                'Data Strategy',
                'Production Operations',
                'Risk Management'
              ],
              helperPrompt: `The correct choice is "AI Solution". When the pressure is an external threat, the most urgent question is, 'WHAT can we build to counter this threat?' We first decide on the recipe (AI Solution) before we start pulling ingredients from the pantry (Data Strategy).`
            },
            {
              id: '5.2.2.3',
              type: 'textarea',
              label: 'Explain your reasoning using this structure: "We chose the (Lens) because..., and that discovery process will naturally lead us to start the workshop at the (Entry Point) because..."',
              helperPrompt: `Help me understand the connection between Discovery Lenses and Workshop Entry Points. Given a competitive threat scenario, explain why "Catch Competitors" lens leads to "AI Solution" entry point, and how this sequencing creates the right momentum for the workshop.`
            }
          ]
        },
        {
          id: '5.2.3',
          title: 'Class Discussion: Entry Point Energy Management',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                In that exercise, you made a critical strategic decision: to focus on the 'AI Solution' first. 
                A Change Agent's ability to choose the right entry point shapes the workshop's narrative and 
                focuses the team's energy on the most valuable problem.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '5.2.3.1',
              type: 'textarea',
              label: 'How does making the right choice of entry point help you manage the room\'s energy and maintain the sponsor\'s engagement?',
              helperPrompt: `Help me articulate how choosing the right workshop entry point impacts group dynamics. Consider: energy management, sponsor engagement, narrative flow, and how starting with the AI Solution (vs. other entry points) affects workshop momentum and outcomes.`
            }
          ]
        }
      ]
    }
  ],
  activities: [
    {
      id: '5.7',
      title: 'Insights & Action: Reflect and Apply',
      type: 'reflection',
      content: `
        <div class="space-y-4">
          <p>
            Think about a recent meeting where multiple priorities competed for attention. How might using the 
            'signals and lenses' framework have helped focus the conversation on what truly mattered most? 
            To apply this, try crafting a prompt for an AI to help you prepare for a similar discovery conversation.
          </p>
        </div>
      `,
      exercises: [
        {
          id: '5.7.1',
          type: 'textarea',
          label: 'My Personal Reflection (e.g., "Ask AI: I\'m preparing for a discovery conversation with [stakeholder]. They\'ve mentioned [AI request]. Help me identify signals and craft 3 questions using the most appropriate lens.")',
          helperPrompt: `Help me create a template for using AI to prepare for discovery conversations. Include: 1) How to describe the stakeholder and context, 2) How to identify competing signals, 3) How to select the right lens, 4) How to craft discovery questions that uncover real value.`
        }
      ]
    }
  ]
};