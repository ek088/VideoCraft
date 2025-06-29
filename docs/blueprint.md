# **App Name**: VideoCraft AI

## Core Features:

- Task Grid Display: Display a grid of video tasks, showing their subjects, progress, and links to final videos upon completion. Pagination is implemented to show 10-20 tasks per page.
- Task Creation Modal: Implement a 'Create Task' button that opens a modal form, allowing users to input video subject, clip duration, and number of paragraphs.
- Video Creation Submission: Submit a POST request to `127.0.0.1:8080/api/v1/videos` with user-defined parameters for video creation, and display a success message with the task ID upon successful submission.
- Real-time Progress Updates: Display progress bars for each video task, updating in real-time via automatic polling every minute to `127.0.0.1:8080/api/v1/tasks`
- Video Playback Integration: Provide links to play finished videos directly within the task grid.
- AI Subject Suggestions: Integrate a generative AI 'tool' to provide suggestions for `video_subject` to give users content creation ideas.

## Style Guidelines:

- Primary color: Soft blue (#64B5F6) for a calm, professional feel.
- Background color: Light gray (#F5F5F5) for a clean, modern look.
- Accent color: Teal (#26A69A) for interactive elements and progress bars.
- Font pairing: 'Poppins' (sans-serif) for headings, and 'PT Sans' (sans-serif) for body text.
- Use minimalist icons to represent video status (e.g., loading, completed, error).
- Grid-based layout for task display to ensure responsiveness and a modern look.
- Subtle fade-in animations for tasks upon loading and progress updates.