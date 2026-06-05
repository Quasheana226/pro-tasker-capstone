# Forge

A modern, full-stack project management application built with the MERN stack. Forge allows users to create projects, manage tasks with a kanban-style board, and collaborate with a clean, premium dark UI.

## Live Demo

- Frontend: https://forge-frontend-3tez.onrender.com
- Backend: https://forge-backend-y3xx.onrender.com

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT, Bcrypt

## Getting Started Locally

### Backend

```bash
cd backend
npm install
cp .env.example .env  # add your MONGO_URI and JWT_SECRET
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env  # add your VITE_API_URL
npm run dev
```

## API Endpoints

### Auth

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/auth/register | Register a new user   |
| POST   | /api/auth/login    | Login and receive JWT |

### Projects

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | /api/projects     | Get all user projects |
| POST   | /api/projects     | Create a new project  |
| GET    | /api/projects/:id | Get a single project  |
| PUT    | /api/projects/:id | Update a project      |
| DELETE | /api/projects/:id | Delete a project      |

### Tasks

| Method | Endpoint                               | Description                 |
| ------ | -------------------------------------- | --------------------------- |
| GET    | /api/projects/:projectId/tasks         | Get all tasks for a project |
| POST   | /api/projects/:projectId/tasks         | Create a new task           |
| PUT    | /api/projects/:projectId/tasks/:taskId | Update a task               |
| DELETE | /api/projects/:projectId/tasks/:taskId | Delete a task               |

## Features

- User registration and login with JWT authentication
- Create, view, update and delete projects
- Kanban-style task management (To Do, In Progress, Done)
- Ownership-based authorization — users only see their own data
- Fully responsive dark UI
- Deployed on Render

## Roadmap

### AI Agent Integration (Coming Soon)

The next major feature for Forge is a built-in AI assistant powered by the Anthropic API. Each project will have its own AI chat interface where users can:

- Automatically generate and create tasks from a simple description
- Ask the agent to update task statuses across the board
- Get an instant summary of project progress
- Receive intelligent suggestions on how to organize work

This will transform Forge from a task manager into a truly intelligent project assistant.

## Project Structure

pro-tasker/
├── backend/
│ ├── config/ # Database connection
│ ├── controllers/ # Route logic
│ ├── middleware/ # Auth protection
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ └── server.js # Entry point
└── frontend/
└── src/
├── components/ # Reusable UI components
├── context/ # Global auth state
├── hooks/ # Custom React hooks
├── pages/ # Page components
└── utils/ # Axios config

## Security

- Passwords hashed with bcrypt using a pre-save hook
- All sensitive routes protected with JWT middleware
- Ownership-based authorization on every endpoint
- Environment variables managed via .env files
- .gitignore configured to exclude secrets
