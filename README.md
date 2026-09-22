# Task Manager API

A beginner-level RESTful API for managing tasks, built with Node.js and Express.js using in-memory storage (no database). Built as a BeTechified capstone group project.

## Objectives
Demonstrate REST API fundamentals: HTTP methods, status codes, request/response handling, middleware, CRUD operations, input validation, and centralized error handling.

## Technologies Used
- Node.js
- Express.js
- Postman (testing)
- Git & GitHub (version control)

## Project Structure
```
task-manager-api/
├── src/
│   ├── controllers/taskController.js
│   ├── routes/taskRoutes.js
│   ├── data/tasks.js
│   └── middleware/errorHandler.js
├── app.js
├── server.js
├── package.json
├── .gitignore
└── postman/Task-Manager-API.postman_collection.json
```

## Architecture

```
Client (Postman) → Routes → Controllers → In-memory data → JSON response
```

## Installation
```powershell
git clone <repo-url>
cd task-manager-api
npm install
```

## Running the project
```powershell
npm run dev     # development, auto-restart via nodemon
npm start       # production-style start
```
Server runs at http://localhost:3000

## API Base URL
`http://localhost:3000/api/tasks`

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Welcome message |
| GET | /api/health | Check API status |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get one task |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Request example (Create Task)
```json
{
  "title": "Learn Express.js",
  "description": "Study REST API development",
  "status": "pending"
}
```

## Response example
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Learn Express.js",
    "description": "Study REST API development",
    "status": "pending",
    "createdAt": "2026-09-22T10:00:00.000Z",
    "updatedAt": "2026-09-22T10:00:00.000Z"
  }
}
```

## Validation Rules
- `title`, `description`, `status` are all required strings, non-empty after trimming
- `status` must be `pending` or `completed`

## HTTP Status Codes
- 200 — success
- 201 — resource created
- 400 — invalid input
- 404 — not found
- 500 — unexpected server error

## Testing with Postman
Import `postman/Task-Manager-API.postman_collection.json`, set the `baseUrl` collection variable to `http://localhost:3000`, then run requests top to bottom.

## Team Contributions
See Git history — each member worked from their own `feature/*` branch off `develop`, opened a PR, and merged after review.

## Future Improvements
Database persistence, authentication/JWT, search/filter/pagination, due dates, categories, a frontend, automated tests, deployment.