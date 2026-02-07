# Task Manager API (RESTful) — Node.js + Express

Backend-only REST API for managing tasks, built with Node.js and Express.  
This API supports creating, listing, updating, and deleting tasks, plus helper endpoints to discover available **topics** and **assignees**.

---

## Features
- CRUD operations for tasks
- Filter, sort, and paginate tasks via query parameters
- Get unique Topics list
- Get unique Assignees list (`assignedTo`)
- Middleware validation (create vs update)

---

## Data Model (Task)


Typical task object:

{
  "id": "1",
  "title": "Setup Node.js project",
  "description": "Initialize project with Express",
  "status": "todo",
  "priority": "high",
  "topic": "Tasks Management",
  "assignedTo": "Miguel",
  "dueDate": "2026-02-10",
  "createdAt": "2026-01-25",
  "updatedAt": "2026-01-30"
}

## Routes

1) Tasks Routes

Create a task
POST /tasks

Uses validateCreateTask middleware (required fields must exist and cannot be empty)

Request body (JSON):

{
  "title": "New task",
  "description": "Something to do",
  "status": "todo",
  "priority": "medium",
  "topic": "Tasks Management",
  "assignedTo": "Ana",
  "dueDate": "2026-02-14"
}

{
  "status": "OK",
  "message": "Task created",
  "data": { ...task }
}

List tasks
GET /tasks

Supports filtering/sorting/pagination with query parameters (see: Query Parameters)

{
  "status": "OK",
  "data": [ ...tasks ]
}
Get one task by id
GET /tasks/:id

Update a task (partial update)
PATCH /tasks/:id

Uses validateUpdateTask middleware:

If req.body is null/undefined or empty → blocks with “No fields provided to update”

Validates only fields the user actually sent (PATCH behavior)

Request body example (partial):

{ "status": "done" }
{
  "status": "OK",
  "message": "Task updated",
  "data": { ...updatedTask }
}

Delete a task
DELETE /tasks/:id


2) Topics Routes
Get unique topics
GET /topics

Returns a list of unique topic values that exist in tasks.

{
  "status": "OK",
  "total": 5,
  "data": ["Backend Setup", "Authentication", "Tasks Management", "Security", "Testing"]
}

How this helps users:
Clients can load /topics first and then filter tasks by topic:

GET /tasks?topic=Authentication

3) AssignedTo Routes
Get unique assignees
GET /assignedTo

Returns a list of unique assignedTo values that exist in tasks.

{
  "status": "OK",
  "total": 3,
  "data": ["Miguel", "Ana", "Rita"]
}
How this helps users:
Clients can load /assignedTo and then filter tasks by assignee:

GET /tasks?assignedTo=Rita

Query Parameters (Filtering, Sorting, Pagination)

The /tasks list endpoint supports query parameters to make it easy for users to find what they need.

Filtering
status — filter by task status

Example: GET /tasks?status=done

priority — filter by priority

Example: GET /tasks?priority=high

topic — filter by topic

Example: GET /tasks?topic=Authentication

assignedTo — filter by assignee

Example: GET /tasks?assignedTo=Miguel

You can combine filters:

GET /tasks?status=todo&priority=high&assignedTo=Ana
Sorting (by dueDate)
sortBy=dueDate

order=asc or order=dsc (both accepted)

asc = oldest due date first

dsc/desc = newest due date first

Examples:

GET /tasks?sortBy=dueDate&order=asc
GET /tasks?sortBy=dueDate&order=dsc
Limiting results
limit — returns only the first N tasks after filters/sort

Example:

GET /tasks?limit=5
Pagination (recommended)
If your implementation includes pagination:

page and limit

Example:

GET /tasks?page=2&limit=10
Middleware Used

1) validateCreateTask
Used on POST /tasks.
Ensures required fields exist and are not empty:

title

description

status

priority

topic

assignedTo

dueDate

2) validateUpdateTask
Used on PATCH /tasks/:id.
PATCH is a partial update, so it validates:

request body must not be null/empty

only validates the fields that were actually sent

(optional enhancement) restricts updates to allowed fields only

# Notes
This API is designed so a client can quickly discover valid filters:

Call /topics to get available topics

Call /assignedTo to get available assignees

Use those values to filter /tasks with query parameters
