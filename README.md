LearnDev - Course Explorer (React Assignment)
This is my submission for the React Intern Take-Home Assignment.

I built a Course Learning Platform where users can browse topics, read lessons, and track their progress. Since the requirement was "Client-only," I focused heavily on a smooth UI/UX and used LocalStorage to make the app feel like a real product.

🚀 Live Demo
[Insert Your Vercel Link Here]

🛠️ Tech Stack
Framework: React + Vite

Styling: Tailwind CSS

Icons: Lucide React

Routing: React Router DOM

Markdown: react-markdown + react-syntax-highlighter (for code blocks)

✨ Features Implemented
I covered all the Must-Haves and managed to add the Nice-to-Haves and some Bonuses too.

1. Course Explorer (Core)
Sidebar Navigation: You can expand Courses -> Topics -> Subtopics.

Smart Search: I implemented a "strict search" in the sidebar. If you search for a specific subtopic (e.g., "HTML"), it filters the tree to show exactly where that lesson is.


2. Learning Experience
Markdown Rendering: Lessons aren't just plain text. I added syntax highlighting (Dracula theme) so code blocks look good.

Progress Tracking: You can mark lessons as "Completed."

Dashboard: The Welcome page isn't empty. It shows a summary of courses and visual progress bars based on how much you've completed.

3. Data Persistence (No Backend)
LocalStorage: Since there's no backend, I save your progress (completed lessons) and theme preference in the browser's LocalStorage. If you close the tab and come back, your progress is still there.

JSON Import/Export (Bonus): I added a feature in the Admin panel to Export your progress to a JSON file and Import it back. This mimics a "backup" feature.

Reset Data: Added a button to wipe all progress and start fresh.

4. Admin Dashboard
A clean, read-only interface to view users from the JSON data.

Includes a search bar to filter users by name or email.


5. UI/UX Polish

Responsive Design: The sidebar collapses into a hamburger menu on mobile devices.

Modern Look: Used a clean color palette (Slate/Indigo) with glassmorphism effects on the navbar.

📂 Project Architecture
src/data: Contains the courses.json and users.json. This acts as my "database."

src/components: Broken down into Sidebar, ContentArea, Welcome, and Admin to keep code clean.

src/utils/progress.js: I separated the logic for calculating progress percentages and handling file imports/exports here to keep components tidy.

⚡ How to Run Locally
Clone the repository:

git clone <your-repo-link>
Install dependencies:


npm install
Start the server:


npm run dev