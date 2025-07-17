import { Lesson } from '@shared/types';

export const lesson3: Lesson = {
  id: 3,
  title: 'Using Expert Facilitation to Guide Successful AI Solutions',
  duration: '45 minutes',
  description: 'Master facilitation techniques for AI transformation',
  image: 'https://images.unsplash.com/photo-1594122230689-7bad3ccbbe13?auto=format&fit=crop&q=80&w=2400',
  activities: [
    {
      id: 'activity-1',
      title: 'Group Discussion - What Makes Meetings Frustrating?',
      type: 'discussion',
      duration: '10 minutes',
      content: `
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Think about the most frustrating planning meeting you've been in. What made it so frustrating? 
          Consider common themes like a lack of structure, no clear decisions being made, the wrong people 
          dominating the conversation, or good ideas being ignored. In the space below, share what was missing.
        </p>
      `,
      exercises: [
        {
          id: 'meetings-frustration',
          type: 'textarea',
          label: "Share your group's examples of frustrating meetings."
        }
      ]
    },
    {
      id: 'activity-2',
      title: '3.1 Paraphrase vs. React',
      type: 'group-work',
      duration: '15 minutes',
      content: `
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Your goal is to turn a statement of resistance into a moment of connection and clarity. 
          First, read the scenario below. Then, as a group, draft two different responses: 
          one that breaks psychological safety and one that builds it.
        </p>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 class="font-semibold mb-2">The Scenario:</h4>
          <p class="text-gray-700 dark:text-gray-300">
            You're leading an early discovery meeting for a new AI project. The goal is to develop an AI assistant 
            to help the sales team draft proposals faster. Business sponsors, product managers, and technical leads 
            are present. You turn to the Head of Sales Engineering, a key stakeholder whose team will be significantly 
            affected. She says, "Look, my team is already overwhelmed. We just finished a big data warehouse project 
            that nobody is even using. I can't ask them to take on another 'game-changing' AI initiative. We lack the capacity."
          </p>
        </div>
      `,
      exercises: [
        {
          id: 'paraphrase-vs-react',
          type: 'multi-step',
          label: 'Practice Paraphrasing',
          steps: [
            {
              id: 'safety-breaking',
              type: 'textarea',
              label: 'Draft a "Safety-Breaking" Response',
              description: 'Write a response that is likely to make the stakeholder defensive by judging, dismissing, or distorting their concern.<br><br><em class="text-xs text-muted-foreground">Note: This type of response is dysfunctional because it can be accusatory or dismissive, making the stakeholder feel their concern is not valued and increasing project risk.</em>'
            },
            {
              id: 'safety-building',
              type: 'textarea',
              label: 'Draft a "Safety-Building" Paraphrase',
              description: 'Write a response that validates the stakeholder\'s concern, accurately reflects the underlying emotion and facts, and encourages them to say more.<br><br><em class="text-xs text-muted-foreground">Example: "Thank you for bringing that up. I\'m hearing that there\'s a real concern about team burnout and, just as importantly, a deep skepticism about starting another major project that might not deliver value... Have I captured that correctly?" This works because it validates the emotion, recognizes the subtext about the past failure, uses tentative language, and ends with a verifying question to give the stakeholder the final say.</em>'
            }
          ]
        }
      ]
    },
    {
      id: 'activity-3',
      title: 'The Art of the Paraphrase: Debrief',
      type: 'discussion',
      duration: '15 minutes',
      content: `
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          You just practiced how paraphrasing can uncover a hidden risk, like skepticism from a past failure. 
          As a group, nominate a spokesperson to share your "Safety-Building" paraphrase and explain why it 
          is more effective at mitigating project risk.
        </p>
      `,
      exercises: [
        {
          id: 'paraphrase-debrief',
          type: 'textarea',
          label: 'Share your group\'s "Safety-Building" paraphrase and explain its strategic purpose.'
        }
      ]
    },
    {
      id: 'activity-4',
      title: 'Insights & Action: Reflect and Apply',
      type: 'reflection',
      duration: '10 minutes',
      content: `
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Think about a recent meeting where important concerns went unspoken. Write about how the outcome 
          might have changed if you had used one facilitation technique from this lesson to create psychological 
          safety. To apply this skill, try crafting a prompt for an AI that could help you prepare for a similar situation.
        </p>
      `,
      exercises: [
        {
          id: 'personal-reflection',
          type: 'textarea',
          label: 'My Personal Reflection',
          helperPrompt: 'e.g., "Ask AI: I\'m facilitating a meeting on [topic]. Help me craft 3 open-ended questions to surface hidden concerns from different stakeholders."'
        }
      ]
    }
  ]
};