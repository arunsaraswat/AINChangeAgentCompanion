import { Lesson } from '@shared/types';

export const lesson6: Lesson = {
  id: 6,
  title: "Facilitating The AI-Native Value Workshop",
  duration: "180 minutes",
  description: "Lead workshops that uncover AI value opportunities",
  subLessons: [
    {
      id: '6.1',
      title: 'Value Thesis',
      description: 'Guide teams to define powerful, quantified business metrics that drive real value.',
      activities: [
        {
          id: '6.1.1',
          title: 'Group Discussion: What Makes a Project Fail?',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                Let's analyze a case study. A company spent $2 million on a mobile app for its sales team. 
                The project was on time and under budget, but six months after launch, 90% of the sales team 
                was still using their old binders. What questions do you think the project team failed to ask 
                the sales team before they started building?
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.1.1.1',
              type: 'textarea',
              label: 'What questions did the project team fail to ask?',
              helperPrompt: 'Help me identify critical questions the project team should have asked the sales team before building the mobile app. Consider questions about: current workflows, pain points, mobile device usage patterns, field conditions, and what makes the binders valuable to them.'
            }
          ]
        },
        {
          id: '6.1.2',
          title: '6.1 Value Thesis – Facilitation Challenge',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                Your goal is to guide, not prescribe. The team's "Success Metrics" are a weak project milestone 
                instead of a business outcome. Your task is to analyze the provided materials and craft insightful 
                questions to help the team define powerful, quantified business metrics.
              </p>
              
              <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 class="font-semibold mb-2">The Scenario:</h4>
                <p class="mb-4">
                  The team has a solid grasp of the problem, but the critical weakness is in how they plan to 
                  measure success. If you measure the wrong thing, you build the wrong thing.
                </p>
                
                <h4 class="font-semibold mb-2">The Team's Flawed Blueprint:</h4>
                <ul class="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Challenge or Opportunity:</strong> The manual renewal proposal process takes 8-10 business days, costing an estimated $1.2M annually in lost or delayed renewals.</li>
                  <li><strong>Stakeholders:</strong> Primary users are Junior Account Managers; the Decision-Maker is the VP of Sales.</li>
                  <li><strong>(Flawed) Success Metrics:</strong> Launch the AI assistant by the end of Q3.</li>
                  <li><strong>Value Capture:</strong> Reduce proposal creation time to increase AM capacity for higher-value client relationships.</li>
                </ul>
                
                <h4 class="font-semibold mb-2">Voices from the Meeting:</h4>
                <div class="space-y-3">
                  <p><strong>VP of Sales (The Skeptic):</strong> "Launch date is a project metric, not a business metric. I need to see how this impacts my team's performance."</p>
                  <p><strong>Account Manager (The User):</strong> "If this just makes proposals faster but they're still bad, I'm not sure it helps me."</p>
                </div>
              </div>
            </div>
          `,
          exercises: [
            {
              id: '6.1.2.1',
              type: 'textarea',
              label: 'Craft 3 powerful questions to guide the team to define better metrics, and explain the strategic purpose of each question.',
              helperPrompt: 'Help me craft 3 powerful questions to guide the team toward business-focused metrics. Each question should: 1) Connect to a specific stakeholder concern, 2) Move from project milestones to business outcomes, 3) Encourage quantifiable measurement. Include the strategic purpose of each question.'
            }
          ]
        },
        {
          id: '6.1.3',
          title: 'Value Thesis Debrief',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                The objective of the last exercise was to practice co-creating metrics by surfacing the specific 
                needs of each stakeholder. As a group, share one of the powerful questions you prepared and 
                explain the strategic thinking behind it.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.1.3.1',
              type: 'textarea',
              label: 'Share one of your powerful questions and its rationale.',
              helperPrompt: 'Help me articulate the strategic thinking behind my question. Explain how it: surfaces stakeholder needs, shifts focus from outputs to outcomes, and creates alignment between technical deliverables and business value.'
            }
          ]
        },
        {
          id: '6.1.4',
          title: 'Insights & Action: Reflect on Value Thesis',
          type: 'reflection',
          content: `
            <div class="space-y-4">
              <p>
                Think about a recent project planning meeting. Were the success metrics truly co-created, or 
                were they dictated? How might you have used powerful questions to guide the team to more 
                meaningful, business-focused metrics?
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.1.4.1',
              type: 'textarea',
              label: 'My Personal Reflection',
              helperPrompt: 'Help me reflect on a recent project planning meeting and how I could have better guided metric definition. Consider: Were metrics focused on deliverables or outcomes? Did we quantify business impact? How could powerful questions have shifted the conversation?'
            }
          ]
        }
      ]
    },
    {
      id: '6.2',
      title: 'AI Solution',
      description: 'Help teams choose the most achievable technical path by understanding AI patterns and trade-offs.',
      activities: [
        {
          id: '6.2.1',
          title: 'Group Discussion: Your New AI Teammate',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                An AI teammate joins your squad next week. Which everyday, time-consuming task will you happily 
                delegate to it? How will your team use the time it wins back for higher-value work?
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.2.1.1',
              type: 'textarea',
              label: 'What task would you delegate and how would you use the extra time?',
              helperPrompt: 'Help me identify time-consuming tasks suitable for AI delegation. Consider: repetitive documentation, data entry, initial analysis, report generation, or routine responses. Then explore how the freed time could be used for strategic thinking, relationship building, or creative work.'
            }
          ]
        },
        {
          id: '6.2.2',
          title: '6.2 What\'s the Pattern?',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                This activity will train your ear to spot keywords that point to a specific technical path. 
                For each stakeholder statement, decide which of the five AI patterns is the "best fit" to 
                solve the underlying problem.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.2.2.1',
              type: 'component',
              component: 'PatternMatchingDragDrop',
              label: 'Match each stakeholder statement to the best AI pattern'
            }
          ]
        },
        {
          id: '6.2.3',
          title: 'Class Discussion: Finding the Best Fit',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                You just practiced "training your ear" to spot patterns in stakeholder requests. This fluency 
                allows you to guide conversations and surface hidden constraints.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.2.3.1',
              type: 'textarea',
              label: 'As a Change Agent, how does having a \'trained ear\' allow you to guide the conversation more effectively and keep it from going off track?',
              helperPrompt: 'Help me articulate the value of pattern recognition in AI conversations. Consider: avoiding overengineering, setting realistic expectations, identifying hidden requirements, steering toward feasible solutions, and preventing scope creep.'
            }
          ]
        },
        {
          id: '6.2.4',
          title: 'Group Discussion: The Production Reality Check',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                Imagine a data scientist demos a brilliant AI on their laptop that summarizes legal documents. 
                The sponsor wants to roll it out to 300 lawyers next month. Brainstorm the technical realities 
                and hidden costs (e.g., infrastructure, licensing, scalability) that might turn this 'brilliant 
                demo' into a production nightmare.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.2.4.1',
              type: 'textarea',
              label: 'What are the hidden costs and technical realities?',
              helperPrompt: 'Help me identify production challenges for scaling an AI demo. Consider: infrastructure costs, API rate limits, data privacy requirements, user authentication, performance at scale, model versioning, monitoring, legal compliance, training requirements, and ongoing maintenance.'
            }
          ]
        },
        {
          id: '6.2.5',
          title: '6.3 AI Solution – Facilitation Challenge',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                A Change Agent's AI fluency helps guide teams to the most achievable path. The team's proposed 
                technical approach is a classic case of over-engineering. Your task is to craft jargon-free 
                questions to clarify the business trade-offs.
              </p>
              
              <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 class="font-semibold mb-2">The Scenario:</h4>
                <p class="mb-4">
                  The team's vision is clear, but their technical approach—building a custom, from-scratch 
                  model—could impact cost, timeline, and maintainability.
                </p>
                
                <h4 class="font-semibold mb-2">The Team's Flawed Blueprint:</h4>
                <ul class="list-disc list-inside space-y-2 mb-4">
                  <li><strong>(Flawed) AI Classification:</strong> We will build a custom, from-scratch, fine-tuned Large Language Model to learn the "VeridianFlux style."</li>
                  <li><strong>AI Capabilities:</strong> Generate a full proposal draft based on client data from Salesforce.</li>
                  <li><strong>Human-AI Interaction:</strong> AI generates a complete draft; the human AM reviews and edits for tone and strategic details.</li>
                </ul>
                
                <h4 class="font-semibold mb-2">Voices from the Meeting:</h4>
                <div class="space-y-3">
                  <p><strong>Lead Engineer (Technical Enthusiast):</strong> "Fine-tuning our own model is the only way to get the perfect 'VeridianFlux voice'!"</p>
                  <p><strong>Director of Finance (The Pragmatist):</strong> "I just saw the budget request for the GPU compute time on this. Are we sure there isn't a more affordable way?"</p>
                </div>
              </div>
            </div>
          `,
          exercises: [
            {
              id: '6.2.5.1',
              type: 'textarea',
              label: 'Craft 3 powerful questions to clarify the business trade-offs of this technical choice, and explain the purpose of each question.',
              helperPrompt: 'Help me craft questions that translate technical choices into business trade-offs. Focus on: cost comparisons, time to market, maintenance requirements, risk factors, and alternatives. Each question should help stakeholders understand the implications without technical jargon.'
            }
          ]
        },
        {
          id: '6.2.6',
          title: 'Translation Excellence: AI Solution Debrief',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                Skillful facilitation translates complex technical choices into clear business trade-offs. 
                As a group, share one of the powerful questions you prepared that moves the conversation 
                from a technical debate to a business decision about value.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.2.6.1',
              type: 'textarea',
              label: 'Share one of your powerful questions and its rationale.',
              helperPrompt: 'Help me explain how my question bridges technical and business perspectives. Show how it: avoids jargon, focuses on outcomes, quantifies trade-offs, and helps non-technical stakeholders make informed decisions.'
            }
          ]
        },
        {
          id: '6.2.7',
          title: 'Insights & Action: Reflect on AI Solution',
          type: 'reflection',
          content: `
            <div class="space-y-4">
              <p>
                Think about a recent meeting where technical and business teams struggled to understand each 
                other. How might having AI fluency have changed that conversation? To apply this, try crafting 
                a prompt to help you explain a complex AI concept simply.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.2.7.1',
              type: 'textarea',
              label: 'My Personal Reflection (e.g., "Ask AI: Create a simple analogy to explain RAG to my non-technical manager.")',
              helperPrompt: 'Help me create effective prompts for explaining AI concepts to non-technical audiences. Include: using analogies, avoiding jargon, focusing on business benefits, and providing concrete examples.'
            }
          ]
        }
      ]
    },
    {
      id: '6.3',
      title: 'Data Strategy',
      description: 'Navigate data requirements while uncovering hidden risks and compliance challenges.',
      activities: [
        {
          id: '6.3.1',
          title: 'Group Discussion: The "Simple" Data Request',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                Your team wants to build an AI to analyze customer sentiment. The project lead says, "Just get 
                me all the customer support tickets from the last five years." Brainstorm all the unexpected 
                problems, questions, and roadblocks you might encounter (e.g., location, format, quality, 
                access rights, privacy) trying to fulfill that 'simple' request.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.3.1.1',
              type: 'textarea',
              label: 'What are the problems and roadblocks with this data request?',
              helperPrompt: 'Help me identify hidden complexities in data requests. Consider: data formats (structured vs unstructured), storage locations, access permissions, PII concerns, data quality issues, retention policies, system integrations, and compliance requirements.'
            }
          ]
        },
        {
          id: '6.3.2',
          title: '6.4 Hidden Risk Radar',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                As a Change Agent, you're a human "risk radar." Stakeholders make data requests that sound 
                reasonable but contain hidden dangers. For each request below, match it to the single most 
                critical hidden risk it represents.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.3.2.1',
              type: 'component',
              component: 'RiskRadarDragDrop',
              label: 'Match each stakeholder request to its hidden risk'
            }
          ]
        },
        {
          id: '6.3.3',
          title: 'Class Discussion: Reflecting on Risk Detection',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                Spotting hidden data risks requires a different way of thinking. This exercise was designed 
                to build that critical thinking muscle.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.3.3.1',
              type: 'textarea',
              label: 'What was the most difficult or surprising part of that activity for your group, and what is the single most important lesson you will take back to your projects about handling data requests?',
              helperPrompt: 'Help me reflect on risk detection challenges. Consider: the subtlety of risks, how reasonable requests can hide dangers, the importance of asking probing questions, and specific safeguards to implement.'
            }
          ]
        },
        {
          id: '6.3.4',
          title: 'Group Discussion: Navigating Sensitive Data Conversations',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                You're in a meeting to discuss data for a new AI project. You suspect the quality is poor, 
                but the data's owner insists, "The data is fine. It's clean." You know challenging them 
                directly could make them defensive. Discuss: What gentle but effective questions could you 
                ask to uncover the real state of the data together?
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.3.4.1',
              type: 'textarea',
              label: 'What gentle but effective questions could you ask?',
              helperPrompt: 'Help me craft diplomatic questions about data quality. Consider: asking about specific examples, validation processes, known edge cases, data collection methods, update frequency, and missing values - all framed collaboratively.'
            }
          ]
        },
        {
          id: '6.3.5',
          title: '6.5 Data Strategy – Facilitation Challenge',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                A psychologically safe environment is required to uncover hidden risks. The team has left the 
                "Privacy, Security & Compliance" section blank—a major red flag. Your task is to formulate 
                non-accusatory questions to make this abstract risk feel concrete and solvable.
              </p>
              
              <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 class="font-semibold mb-2">The Scenario:</h4>
                <p class="mb-4">
                  The team has a plan for data sources and lifecycle, but their blind spot is a completely 
                  blank section for Privacy, Security & Compliance.
                </p>
                
                <h4 class="font-semibold mb-2">The Team's Flawed Blueprint:</h4>
                <ul class="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Data Sources & Acquisition:</strong> We will use the Salesforce API for customer data and SharePoint for product info.</li>
                  <li><strong>(Flawed) Privacy, Security & Compliance:</strong> [This section is blank]</li>
                  <li><strong>Data Lifecycle Management:</strong> AI-generated drafts will be stored for 12 months for analysis and then archived.</li>
                </ul>
                
                <h4 class="font-semibold mb-2">Voices from the Meeting:</h4>
                <div class="space-y-3">
                  <p><strong>Legal Counsel:</strong> "We can't proceed until a formal privacy review is complete. Feeding client PII into a new AI system is a non-starter."</p>
                  <p><strong>Project Manager:</strong> "Legal will slow us down for months. Can't we just build the tool and get the review done in parallel?"</p>
                </div>
              </div>
            </div>
          `,
          exercises: [
            {
              id: '6.3.5.1',
              type: 'textarea',
              label: 'Craft 3 powerful questions designed to invite partnership from Legal rather than assign blame, and explain the purpose of each.',
              helperPrompt: 'Help me craft questions that build bridges with Legal/Compliance teams. Focus on: shared goals, early collaboration benefits, specific guidance needed, and how to make compliance easier. Frame questions to position Legal as partners, not obstacles.'
            }
          ]
        },
        {
          id: '6.3.6',
          title: 'Data Strategy Debrief',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                The objective was to practice creating psychological safety to turn potential adversaries into 
                collaborative partners. As a group, share one of the powerful questions you prepared and 
                explain how it was designed to invite partnership.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.3.6.1',
              type: 'textarea',
              label: 'Share one of your powerful questions and its rationale.',
              helperPrompt: 'Help me explain how my question creates psychological safety and invites partnership. Show how it: avoids blame, acknowledges expertise, focuses on shared success, and makes compliance feel achievable rather than burdensome.'
            }
          ]
        },
        {
          id: '6.3.7',
          title: 'Insights & Action: Reflect on Data Strategy',
          type: 'reflection',
          content: `
            <div class="space-y-4">
              <p>
                Think about a data request you recently made or received. What were the hidden complexities 
                that weren't immediately obvious? How might approaching it with the "risk radar" mindset have 
                changed the conversation?
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.3.7.1',
              type: 'textarea',
              label: 'My Personal Reflection (e.g., "Ask AI: Help me create a checklist of 5 things I should examine for data quality, and suggest questions to ask data owners diplomatically.")',
              helperPrompt: 'Help me create practical tools for data strategy. Consider: quality checklists, diplomatic question templates, risk assessment frameworks, and ways to surface hidden complexities early in projects.'
            }
          ]
        }
      ]
    },
    {
      id: '6.4',
      title: 'Production Operations',
      description: 'Ensure projects run reliably over time, not just at launch.',
      activities: [
        {
          id: '6.4.1',
          title: 'Group Discussion: From Demo to Reality',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                A developer demos a fantastic AI chatbot on their laptop. The plan is to launch it to 10,000 
                customers next month. Brainstorm all the things in the production environment that are different 
                from that one laptop and could cause the chatbot to fail spectacularly at launch.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.4.1.1',
              type: 'textarea',
              label: 'What could cause the production launch to fail?',
              helperPrompt: 'Help me identify production environment differences. Consider: concurrent users, network latency, authentication systems, rate limiting, error handling, monitoring, logging, security policies, data persistence, and integration dependencies.'
            }
          ]
        },
        {
          id: '6.4.2',
          title: '6.6 The Operational Debt Detector',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                You must protect projects from "operational debt"—vague, non-committal plans that guarantee 
                future failure. Match each Vague Plan Statement below to the single most likely Operational 
                Crisis it will cause.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.4.2.1',
              type: 'component',
              component: 'OperationalDebtDragDrop',
              label: 'Match each vague plan to its operational crisis'
            }
          ]
        },
        {
          id: '6.4.3',
          title: 'Class Discussion: Connecting Plans to Reality',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                In every case in the last activity, a vague phrase like "as needed" or "periodically" masked 
                a major, unplanned risk. Your job as a facilitator is to recognize that a vague phrase is an 
                unactionable plan.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.4.3.1',
              type: 'textarea',
              label: 'What specific, clarifying questions could you ask to turn one of the vague plans into a concrete, realistic one?',
              helperPrompt: 'Help me craft questions that transform vague plans into actionable ones. Focus on: specific timelines, resource requirements, success criteria, responsibilities, and contingency plans.'
            }
          ]
        },
        {
          id: '6.4.4',
          title: 'Group Discussion: The Week Two Disaster',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                An AI tool launches successfully. But in Week Two, it's slow, costs are triple the estimate, 
                and a bug is causing inaccurate data. The support team doesn't know who to call. Your blueprint 
                had vague plans like "Scaling Strategy: To be determined post-launch" and "Incident Response: 
                Dev team will be available." Connect each disaster from Week Two directly to a specific piece 
                of vague information in the blueprint.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.4.4.1',
              type: 'textarea',
              label: 'Connect each disaster to a vague plan.',
              helperPrompt: 'Help me map operational failures to planning gaps. Show how: slowness relates to scaling plans, cost overruns to resource planning, bugs to testing/monitoring, and support confusion to incident response procedures.'
            }
          ]
        },
        {
          id: '6.4.5',
          title: '6.7 Production Operations – Facilitation Challenge',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                A project is successful when it runs reliably over time, not just when it launches. The team's 
                plan is dangerously focused on "Day 1." The "Incident Response & Recovery" plan is particularly 
                weak. Your task is to formulate questions that use storytelling to highlight the "Day 2" risks.
              </p>
              
              <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 class="font-semibold mb-2">The Scenario:</h4>
                <p class="mb-4">
                  The team's plan is dangerously focused on "Day 1" (launch). The Incident Response & Recovery 
                  plan is particularly weak, creating significant hidden business risk.
                </p>
                
                <h4 class="font-semibold mb-2">The Team's Flawed Blueprint:</h4>
                <ul class="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Infrastructure & Scalability:</strong> Deploy on standard cloud environment with auto-scaling for 200 concurrent users.</li>
                  <li><strong>MLOps & LLMOps:</strong> RAG knowledge base will be refreshed quarterly.</li>
                  <li><strong>(Flawed) Incident Response & Recovery:</strong> If the AI has an issue, users can submit a standard IT helpdesk ticket.</li>
                </ul>
                
                <h4 class="font-semibold mb-2">Voices from the Meeting:</h4>
                <div class="space-y-3">
                  <p><strong>Project Manager:</strong> "Our goal is to launch. We can build a better support plan after we see if people even use it."</p>
                  <p><strong>IT Operations Lead:</strong> "A standard helpdesk ticket for an AI generating client proposals? The SLA for that queue is 48 hours. That's not a viable plan."</p>
                </div>
              </div>
            </div>
          `,
          exercises: [
            {
              id: '6.4.5.1',
              type: 'textarea',
              label: 'Craft 3 powerful questions that use storytelling or visualization to make the "Day 2" risks feel concrete and urgent, and explain your strategy.',
              helperPrompt: 'Help me craft storytelling questions about operational risks. Use scenarios like: "Imagine it\'s Monday morning and...", paint vivid pictures of failure, quantify business impact, and make abstract risks feel immediate and personal.'
            }
          ]
        },
        {
          id: '6.4.6',
          title: 'Class Discussion: Turning Risk Into Action',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                The most effective questions in the last exercise likely painted a vivid picture of failure 
                with real business consequences. This narrative approach makes a future risk feel present and 
                creates a shared sense of urgency.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.4.6.1',
              type: 'textarea',
              label: 'Share one of your storytelling questions and explain why that approach is more effective than just asking "Is the plan good enough?"',
              helperPrompt: 'Help me explain the power of storytelling in risk communication. Show how vivid scenarios: create emotional engagement, make abstract risks concrete, build consensus for action, and overcome planning optimism.'
            }
          ]
        },
        {
          id: '6.4.7',
          title: 'Insights & Action: Reflect on Production Operations',
          type: 'reflection',
          content: `
            <div class="space-y-4">
              <p>
                Think about a project in your organization that had a rough production launch. Which operational 
                planning gaps (infrastructure, monitoring, incident response) contributed most to the problems? 
                How might proper facilitation of these topics have changed the outcome?
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.4.7.1',
              type: 'textarea',
              label: 'My Personal Reflection (e.g., "Ask AI: Help me create a checklist of the top 5 operational risks for my AI project and suggest one question to ask the technical team for each.")',
              helperPrompt: 'Help me create operational readiness tools. Consider: infrastructure checklists, monitoring requirements, incident response templates, and questions to surface operational gaps before launch.'
            }
          ]
        }
      ]
    },
    {
      id: '6.5',
      title: 'Risk Management & Compliance',
      description: 'Transform abstract risks into concrete business discussions.',
      activities: [
        {
          id: '6.5.1',
          title: 'Group Discussion: Unexpected AI Consequences',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                Imagine your company rolls out an internal AI assistant, 'BizBot,' to help with daily tasks—writing 
                emails, analyzing sales data, answering HR questions. Brainstorm the unexpected, negative 
                consequences that could arise from employees using this 'helpful' tool. Think about what could 
                go wrong for the company, its customers, and the employees.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.5.1.1',
              type: 'textarea',
              label: 'What are the unexpected negative consequences of \'BizBot\'?',
              helperPrompt: 'Help me identify unintended AI consequences. Consider: data leakage, bias amplification, overreliance on AI, quality degradation, compliance violations, employee deskilling, customer trust issues, and liability concerns.'
            }
          ]
        },
        {
          id: '6.5.2',
          title: '6.8 The Dangerous Dismissal – Facilitation Challenge',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                Risk management isn't about saying 'no'; it's about understanding challenges to find a safe way 
                to say 'yes.' The team has dismissed ethical and bias implications as "Not Applicable." This is 
                a dangerous blind spot. Your task is to formulate non-confrontational questions to help the 
                Project Sponsor see the potential business risk.
              </p>
              
              <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 class="font-semibold mb-2">The Scenario:</h4>
                <p class="mb-4">
                  The team has considered some risks but has completely dismissed the ethical and bias implications, 
                  marking it "Not Applicable." This is the highest-impact flaw because ethical failures can cause 
                  significant reputational damage.
                </p>
                
                <h4 class="font-semibold mb-2">The Team's Flawed Blueprint:</h4>
                <ul class="list-disc list-inside space-y-2 mb-4">
                  <li><strong>(Flawed) AI Ethics & Bias:</strong> [Marked "Not Applicable - internal tool."]</li>
                  <li><strong>Copyright & IP Compliance:</strong> AI will be trained only on company-owned documents.</li>
                  <li><strong>Regulatory & Legal Compliance:</strong> The project will adhere to all GDPR and CCPA protocols.</li>
                </ul>
                
                <h4 class="font-semibold mb-2">Voices from the Meeting:</h4>
                <div class="space-y-3">
                  <p><strong>Data Scientist:</strong> "An AI trained on historical proposals might learn to create less favorable terms for smaller clients if that's what the data shows. We should check for that."</p>
                  <p><strong>Project Sponsor:</strong> "This is an internal efficiency tool. Let's not boil the ocean with ethical what-ifs. We need to focus on getting it done."</p>
                </div>
              </div>
            </div>
          `,
          exercises: [
            {
              id: '6.5.2.1',
              type: 'textarea',
              label: 'Craft 3 powerful questions to reframe the abstract topic of \'ethics\' into a concrete business risk the sponsor will understand, and explain your strategy.',
              helperPrompt: 'Help me reframe ethics as business risk. Focus on: reputation damage, customer trust, employee morale, regulatory scrutiny, competitive disadvantage, and litigation exposure. Make abstract ethics concrete and quantifiable.'
            }
          ]
        },
        {
          id: '6.5.3',
          title: 'Risk Management Debrief',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                The objective was to practice reframing sensitive topics into practical, business-focused 
                discussions. You had to connect the abstract concept of 'ethics' to concrete business risks. 
                As a group, share one of the powerful questions you prepared and explain how it reframes the 
                conversation.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.5.3.1',
              type: 'textarea',
              label: 'Share one of your reframing questions and its rationale.',
              helperPrompt: 'Help me explain how my question reframes ethics as business value. Show how it: connects to sponsor priorities, quantifies potential impact, provides concrete examples, and positions ethics as competitive advantage.'
            }
          ]
        },
        {
          id: '6.5.4',
          title: 'Insights & Action: Reflect on Risk Management',
          type: 'reflection',
          content: `
            <div class="space-y-4">
              <p>
                Think about a recent AI or technology project in your organization. Which risk category 
                (ethics, IP, compliance, or operational) was most overlooked? How might proper risk management 
                have changed the outcome?
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.5.4.1',
              type: 'textarea',
              label: 'My Personal Reflection (e.g., "Ask AI: For my project, help me identify the top 3 risks across ethics, IP, and compliance, and suggest one mitigation action for each.")',
              helperPrompt: 'Help me create a risk management framework. Consider: identifying blind spots, categorizing risks by impact, creating mitigation strategies, and building risk awareness into project planning.'
            }
          ]
        }
      ]
    },
    {
      id: '6.6',
      title: 'Value Realization',
      description: 'Connect technical success to business value through effective change management.',
      activities: [
        {
          id: '6.6.1',
          title: 'Group Discussion: From Promise to Proof',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                At the start of a workshop (the "Value Thesis"), a team promises: "Our AI for RFPs will win 
                15% more deals, generating $5M in new revenue." Now, after planning the full solution, you 
                know it requires new infrastructure, a complex data pipeline, and significant change management. 
                Put on the hat of a skeptical CFO. What hard, challenging questions would you ask now to 
                ensure the promised value is real and worth the now-fully-understood cost and effort?
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.6.1.1',
              type: 'textarea',
              label: 'What hard questions would a skeptical CFO ask?',
              helperPrompt: 'Help me think like a skeptical CFO about AI ROI. Consider: total cost breakdown, timeline to value, adoption assumptions, risk factors, opportunity costs, success measurement, and what happens if projections are wrong.'
            }
          ]
        },
        {
          id: '6.6.2',
          title: '6.9 Building the Business Case – Facilitation Challenge',
          type: 'exercise',
          content: `
            <div class="space-y-6">
              <p>
                True ROI can only be calculated when the Total Cost of Ownership—including human adoption—is 
                understood. The team's "Change Management" plan is dangerously simplistic and guarantees the 
                project will fail to realize its value. Your task is to formulate questions to help the team 
                think more deeply about driving user adoption.
              </p>
              
              <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 class="font-semibold mb-2">The Scenario:</h4>
                <p class="mb-4">
                  The team has a plan for costs and returns, but their Change Management plan is dangerously 
                  simplistic. The greatest AI solution is worthless if no one uses it.
                </p>
                
                <h4 class="font-semibold mb-2">The Team's Flawed Blueprint:</h4>
                <ul class="list-disc list-inside space-y-2 mb-4">
                  <li><strong>Resource Requirements:</strong> Cost is 2 AI engineers and 1 PM for three months, plus $50k annual hosting.</li>
                  <li><strong>Revenue Model:</strong> Cost savings from efficiency, projected at $450k annually.</li>
                  <li><strong>(Flawed) Change Management:</strong> We will send an email announcing the new tool and provide a link to the user guide.</li>
                </ul>
                
                <h4 class="font-semibold mb-2">Voices from the Meeting:</h4>
                <div class="space-y-3">
                  <p><strong>Senior Account Manager (The User):</strong> "Great, another tool I have to figure out on my own. I don't have time for this. I'll probably just keep doing it the old way."</p>
                  <p><strong>Head of Sales Enablement:</strong> "You're expecting 50 account managers to fundamentally change their workflow based on an email? That has never worked."</p>
                </div>
              </div>
            </div>
          `,
          exercises: [
            {
              id: '6.6.2.1',
              type: 'textarea',
              label: 'Craft 3 powerful questions to help the team see user adoption as a critical, resourced part of the project, and explain your strategy.',
              helperPrompt: 'Help me craft questions that elevate change management. Focus on: adoption costs, training requirements, resistance factors, success metrics, pilot strategies, and champion programs. Connect adoption directly to ROI.'
            }
          ]
        },
        {
          id: '6.6.3',
          title: 'Value Realization Debrief',
          type: 'discussion',
          content: `
            <div class="space-y-4">
              <p>
                Your questions in the last exercise should have connected the 'soft' skill of change management 
                to the 'hard' numbers of the budget and ROI. You forced the team to treat adoption as a real, 
                resourced part of the project.
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.6.3.1',
              type: 'textarea',
              label: 'Share one of your questions and explain how it connects the human element of adoption to the project\'s financial business case.',
              helperPrompt: 'Help me explain how my question bridges change management and financial returns. Show how it: quantifies adoption impact, treats training as investment, measures behavioral change, and links usage to value realization.'
            }
          ]
        },
        {
          id: '6.6.4',
          title: 'Insights & Action: Reflect on Value Realization',
          type: 'reflection',
          content: `
            <div class="space-y-4">
              <p>
                Think about a project you've seen with great technical success but poor adoption. Which element 
                of Value Realization (resources, revenue model, ROI, or change management) was missing? How 
                did that gap lead to failure?
              </p>
            </div>
          `,
          exercises: [
            {
              id: '6.6.4.1',
              type: 'textarea',
              label: 'My Personal Reflection (e.g., "Ask AI: Help me build a business case for my project, including all costs (dev, ops, change management) and value streams, then suggest three sensitivity scenarios.")',
              helperPrompt: 'Help me create comprehensive business cases for AI projects. Include: full cost accounting, adoption timelines, value measurement frameworks, and sensitivity analysis for different adoption scenarios.'
            }
          ]
        }
      ]
    }
  ],
  activities: []
};