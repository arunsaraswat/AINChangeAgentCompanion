import { Lesson } from '@shared/types';

export const lesson4: Lesson = {
  id: 4,
  title: 'Creating the Stakeholder Map and Workshop Charter',
  duration: '50 minutes',
  description: 'Design comprehensive stakeholder engagement strategies',
  image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2400',
  activities: [
    {
      id: 'activity-1',
      title: 'Group Discussion - The Missing Person Problem',
      type: 'discussion',
      duration: '10 minutes',
      content: `
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Describe a time when a project was derailed or needed major rework because a key person was excluded from planning. 
          What was the impact? (e.g., rework, political drama, delays, blown budget)
        </p>
      `,
      exercises: [
        {
          id: 'missing-person-story',
          type: 'textarea',
          label: "Share your group's \"missing person\" story and its impact.",
          helperPrompt: 'e.g., "We launched a new feature without consulting the support team. Call volume spiked 200%, and we had to roll it back, which delayed the entire roadmap by a quarter."'
        }
      ]
    },
    {
      id: 'activity-2',
      title: '4.1 The Stakeholder Scramble',
      type: 'group-work',
      duration: '15 minutes',
      content: `
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <h4 class="font-semibold mb-2">The Scenario:</h4>
          <p class="text-gray-700 dark:text-gray-300">
            The Head of Marketing at a large online retailer has championed a new AI-powered "Personal Shopper" 
            recommendation engine. Working directly with the data science team, they've built an impressive prototype 
            that suggests items based on a user's browse history. The stated goal is to increase the average customer 
            order value. The marketing team is thrilled with the prototype and has secured a spot on the quarterly 
            product release schedule to launch the feature on the live website in two weeks. They consider the project ready to go.
          </p>
        </div>
      `,
      exercises: [
        {
          id: 'individual-analysis',
          type: 'component',
          component: 'StakeholderDragDrop',
          label: 'Individual Analysis',
          description: 'Based on the scenario, drag and drop to identify:<br>• The three most critical stakeholders who have been overlooked<br>• The single best person to secure as the Executive Sponsor'
        },
        {
          id: 'group-consensus',
          type: 'textarea',
          label: 'Group Consensus & Justification',
          description: 'As a group, compare your individual findings and agree on a final list. Explain your choice of sponsor and why including your chosen stakeholders is essential to keep this AI project out of the POC graveyard.'
        }
      ]
    },
    {
      id: 'activity-3',
      title: 'From Stakeholder Map to Strategic Asset',
      type: 'discussion',
      duration: '15 minutes',
      content: `
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          In the exercise, you identified critical stakeholders who were left in the dark. As a Change Agent, 
          your next step isn't just to add them to a list; it's to engage them effectively. Imagine your first 
          conversation with the overlooked Head of Customer Service. What is the single most powerful, open-ended 
          question you could ask them to understand their perspective and begin turning them into a contributor?
        </p>
      `,
      exercises: [
        {
          id: 'strategic-question',
          type: 'textarea',
          label: 'What is the single most powerful, open-ended question you would ask the Head of Customer Service?',
          helperPrompt: 'e.g., "From your team\'s perspective on the front lines, what usually goes wrong for customers when a new recommendation engine like this is released?"'
        }
      ]
    },
    {
      id: 'activity-4',
      title: 'Reflection: Learning from Past Projects',
      type: 'reflection',
      duration: '10 minutes',
      content: `
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          Reflect on a past project where stakeholder mapping could have made a difference.
        </p>
      `,
      exercises: [
        {
          id: 'past-project-reflection',
          type: 'textarea',
          label: 'Reflect on a Past Project',
          description: 'Consider a recent project where an important stakeholder was excluded from planning. Describe how a stakeholder mapping exercise could have prevented the issues that occurred. What specific questions would you have asked to identify missing voices early on?<br><br><em class="text-xs text-muted-foreground">e.g., "On the \'Omega\' project, we didn\'t involve security until the end. A mapping exercise would have identified the CISO as critical for the Data Strategy. I would have asked, \'Who owns the data we need, and who has to approve its use?\'"</em>'
        }
      ]
    }
  ]
};