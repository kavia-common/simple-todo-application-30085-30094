# Simple Todo Application (Frontend)

A modern, single-page React Todo app implementing CRUD features with local persistence and Ocean Professional styling.

## Features
- Add, edit, delete, and toggle completion of todos
- Local persistence via `localStorage` (key: `todos`)
- Responsive layout: header, form panel, and list panel
- Keyboard accessibility: 
  - Enter to submit (except when typing in textarea with shift+enter for new line)
  - Esc to cancel edit
- Ocean Professional theme:
  - Primary: #2563EB, Secondary: #F59E0B, Error: #EF4444
  - Subtle gradients, rounded corners, and modern shadows
  - Light/Dark theme toggle

## Tech
- React 18, no external UI frameworks
- Organized components under `src/components/`

## Run locally
1. cd simple-todo-application-30085-30094/todo_frontend
2. npm install
3. npm start
4. Open http://localhost:3000

## Project Structure
- src/App.js: Application state & wiring (CRUD + persistence)
- src/styles.css: Theme and component styles
- src/components/Header.jsx: Header bar with theme toggle
- src/components/TodoForm.jsx: Add/Edit form
- src/components/TodoList.jsx: List container
- src/components/TodoItem.jsx: Individual todo item

## Data shape
```js
{ id: string, title: string, notes?: string, completed: boolean, createdAt: number }
```

## Notes
- No external services or API keys are required.
- To reset data, clear your browser's localStorage key `todos`.
