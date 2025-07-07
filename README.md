
# TaskFlow

TaskFlow is a modern, visually appealing, and fully client-side task management web application built with React, TypeScript, and Vite. It features user authentication (username-based), persistent storage using localStorage, and a rich set of features for managing, filtering, and searching tasks.

## Features

- **User Authentication:** Simple username-based login. Each user has their own task list.
- **Persistent Storage:** All data is stored in the browser's localStorage. No backend required.
- **Task Management:** Create, edit, delete, and mark tasks as complete/incomplete.
- **Task Details:** Each task can have a title, description, priority, due date, and category.
- **Filtering & Search:** Filter tasks by status (all, completed, pending), priority, category, and search by text.
- **Responsive UI:** Beautiful, modern design with Tailwind CSS and Lucide icons.
- **TypeScript:** Type-safe codebase for reliability and maintainability.

## Project Structure

```
src/
  App.tsx                # Main app logic, handles user state and routing
  main.jsx               # Entry point, renders App
  index.css, App.css     # Global and app-specific styles
  components/
    Login.tsx            # Login form and logic
    TaskDashboard.tsx    # Main dashboard after login
    TaskList.tsx         # Renders a list of tasks
    TaskItem.tsx         # Renders a single task with actions
    TaskForm.tsx         # Form for creating/editing tasks
    TaskFilter.tsx       # Filter tabs (all, completed, pending)
    PriorityDropdown.tsx # Dropdown for priority filter
    SearchBar.tsx        # Search input for tasks
  types/
    Task.ts              # Task and filter type definitions
    User.ts              # User type definition
  utils/
    localStorage.ts      # All localStorage interactions (users, tasks)
public/
  vite.svg               # App icon
```

## How It Works

- On first load, users are prompted to enter a username. This creates or loads a user profile in localStorage.
- After login, users see the Task Dashboard, where they can:
  - Add new tasks (with title, description, priority, due date, category)
  - Edit or delete existing tasks
  - Mark tasks as complete/incomplete
  - Filter tasks by status, priority, or category
  - Search tasks by text
- All changes are saved instantly to localStorage, scoped to the current user.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd task
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and go to `http://localhost:5173` (or the port shown in your terminal).

### Build for Production

```sh
npm run build
# or
yarn build
```


## Customization

- **Styling:** Uses Tailwind CSS for rapid UI development. You can customize styles in `App.css`, `index.css`, or directly in components.
- **Icons:** Uses Lucide icons for a modern look.
- **Data Model:** Types are defined in `src/types/Task.ts` and `src/types/User.ts`.

## File Overview

- **App.tsx:** Handles authentication state, loading spinner, and routes between Login and TaskDashboard.
- **Login.tsx:** Username input, creates/loads user, and sets current user in localStorage.
- **TaskDashboard.tsx:** Main UI for managing tasks, including filters, search, and task list.
- **TaskList.tsx / TaskItem.tsx:** Render the list of tasks and individual task cards.
- **TaskForm.tsx:** Modal form for adding/editing tasks.
- **TaskFilter.tsx / PriorityDropdown.tsx / SearchBar.tsx:** UI controls for filtering and searching tasks.
- **localStorage.ts:** All logic for storing and retrieving users and tasks from localStorage.

## Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons

