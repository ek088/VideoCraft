# VideoCraft AI

A small Next.js dashboard for creating and tracking AI-generated video tasks.
It talks to a video-generation backend over HTTP and uses Genkit (Google AI) to suggest video subjects.

## Features

- Grid of video tasks with progress bars and links to finished videos
- "Create Task" modal with subject, clip duration and paragraph count
- Automatic polling of task status every 60 seconds
- AI-powered video subject suggestions

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```bash
   # Base URL of the video-generation backend (default shown)
   API_BASE_URL=http://127.0.0.1:8080/api/v1

   # Required for AI subject suggestions
   GOOGLE_GENAI_API_KEY=your-key-here
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

   The app is served at http://localhost:9002.

## Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the Next.js dev server on port 9002 |
| `npm run build`     | Create a production build                |
| `npm run start`     | Run the production build                 |
| `npm run lint`      | Run ESLint                               |
| `npm run typecheck` | Run the TypeScript compiler without emit |
| `npm run genkit:dev`| Start the Genkit developer UI            |

## Project layout

- `src/app` – Next.js app router entry point and global styles
- `src/components` – dashboard, task grid, create-task modal and UI primitives
- `src/hooks` – data hooks such as `use-tasks`
- `src/lib/api.ts` – server actions that call the backend API
- `src/ai` – Genkit configuration and flows
- `docs/blueprint.md` – product and style guidelines
