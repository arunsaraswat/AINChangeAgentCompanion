# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **AI-Native Change Agent Class Companion** - a React-based educational platform that provides interactive learning experiences for change management in the AI era. The application serves as a comprehensive learning companion with 6 structured lessons covering change fundamentals, stakeholder engagement, communication strategies, and implementation planning.

## Development Commands

### Core Development
- `npm run dev` - Start development server with hot reload (runs on port 5001)
- `npm run build` - Build production application
- `npm start` - Run production server
- `npm run check` - Run TypeScript type checking

### Testing
There are no specific test scripts configured. Check if tests exist in the codebase before assuming testing frameworks.

## Architecture Overview

### Full-Stack Structure
- **Frontend**: React 18 + TypeScript + Vite in `client/` directory
- **Backend**: Express.js server in `server/` directory
- **Data**: Course content and lessons in `data/` directory
- **Shared**: Common types in `shared/` directory

### Key Architectural Patterns
- **Monorepo Structure**: Client and server code in same repository
- **Type-Safe Development**: TypeScript throughout
- **Local-First Data**: All progress stored in localStorage
- **Component-Based UI**: Radix UI primitives with shadcn/ui components

### Frontend Architecture
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API + localStorage persistence
- **UI Components**: Radix UI primitives + shadcn/ui + Tailwind CSS
- **Data Fetching**: TanStack Query for server state management
- **Styling**: Tailwind CSS

### Backend Architecture
- **API Design**: REST endpoints with `/api` prefix
- **Static Serving**: Express static file serving in production
- **No Database**: Pure local storage implementation

## Key Components & Features

### Core Application Components
- **CourseProgressContext**: Manages lesson completion and exercise answers
- **ThemeContext**: Light/dark theme management
- **Layout**: Main application shell with sidebar navigation
- **Sidebar**: Course navigation with progress management tools

### Data Management
- **Local Storage**: All progress data persisted locally
- **Import/Export**: JSON-based data portability
- **Course Schema**: Comprehensive lesson/exercise data structure

## Course Structure

The application contains 10 main lessons:
1. **AI Opportunity Blind Spots** - Identify and overcome hidden barriers to AI adoption
2. **Advancing AI Fluency** - Build foundational AI knowledge across your organization
3. **Using Expert Facilitation to Guide Successful AI Solutions** - Master facilitation techniques for AI transformation
4. **Creating the Stakeholder Map and Workshop Charter** - Design comprehensive stakeholder engagement strategies
5. **From Signals to Entry Points** - Recognize opportunities and create pathways for AI integration
6. **Facilitating The AI-Native Value Workshop** - Lead workshops that uncover AI value opportunities
7. **Wrapping Up the Workshop: Defining the Implementation Roadmap** - Convert workshop insights into actionable plans
8. **Guiding Successful Implementations** - Navigate the complexities of AI implementation
9. **Scaling Success by Storytelling** - Leverage storytelling to drive organizational change
10. **Expanding Your Impact** - Grow your influence as an AI change agent

## Environment Configuration

### Development Setup
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Application runs on `http://localhost:5001`

## File Structure Conventions

### Path Aliases
- `@/` - Points to `client/src/`
- `@shared/` - Points to `shared/`

### Component Organization
- UI primitives in `client/src/components/ui/`
- Page components in `client/src/pages/`
- Context providers in `client/src/contexts/`
- Utility functions in `client/src/lib/` and `client/src/utils/`

## Development Guidelines

### Adding New Features
1. Create components in appropriate directories
2. Use TypeScript for all new code
3. Follow existing patterns for state management
4. Ensure dark mode compatibility
5. Test import/export functionality with new data

### Working with Lessons
1. Lesson data goes in `data/lessons/`
2. Each lesson should export a typed Lesson object
3. Update course-content.ts when adding lessons
4. Create specialized components as needed

### Styling Guidelines
- Use Tailwind CSS classes
- Follow shadcn/ui component patterns
- Ensure responsive design
- Support dark/light themes

## Important Notes

- No backend database - all data is stored locally
- Progress tracking is client-side only
- Import/export provides data portability
- Theme preference is persisted locally