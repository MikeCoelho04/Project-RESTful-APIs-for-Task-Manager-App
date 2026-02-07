let TASKS = [
  {
    id: "1",
    title: "Setup Node.js project",
    description: "Initialize project with Express and base folder structure",
    status: "done",
    priority: "high",
    topic: "Backend Setup",
    assignedTo: "Miguel",
    dueDate: "2026-02-01",
    createdAt: "2026-01-20",
    updatedAt: "2026-01-22"
  },
  {
    id: "2",
    title: "Configure environment variables",
    description: "Setup dotenv and environment-based configuration",
    status: "done",
    priority: "medium",
    topic: "Backend Setup",
    assignedTo: "Miguel",
    dueDate: "2026-02-02",
    createdAt: "2026-01-21",
    updatedAt: "2026-01-22"
  },
  {
    id: "3",
    title: "Design database schema",
    description: "Define User and Task data models",
    status: "doing",
    priority: "high",
    topic: "Architecture",
    assignedTo: "Ana",
    dueDate: "2026-02-05",
    createdAt: "2026-01-22",
    updatedAt: "2026-01-30"
  },
  {
    id: "4",
    title: "Implement user registration",
    description: "Create register endpoint with password hashing",
    status: "doing",
    priority: "high",
    topic: "Authentication",
    assignedTo: "Ana",
    dueDate: "2026-02-06",
    createdAt: "2026-01-23",
    updatedAt: "2026-01-30"
  },
  {
    id: "5",
    title: "Implement user login",
    description: "JWT-based login endpoint",
    status: "todo",
    priority: "high",
    topic: "Authentication",
    assignedTo: "Miguel",
    dueDate: "2026-02-07",
    createdAt: "2026-01-24",
    updatedAt: "2026-01-24"
  },
  {
    id: "6",
    title: "Create task creation endpoint",
    description: "POST /tasks with validation",
    status: "todo",
    priority: "high",
    topic: "Tasks Management",
    assignedTo: "Rita",
    dueDate: "2026-02-08",
    createdAt: "2026-01-24",
    updatedAt: "2026-01-24"
  },
  {
    id: "7",
    title: "List tasks with pagination",
    description: "GET /tasks with page and limit",
    status: "todo",
    priority: "medium",
    topic: "Tasks Management",
    assignedTo: "Rita",
    dueDate: "2026-02-09",
    createdAt: "2026-01-25",
    updatedAt: "2026-01-25"
  },
  {
    id: "8",
    title: "Add task filtering",
    description: "Filter tasks by status and priority",
    status: "todo",
    priority: "medium",
    topic: "Tasks Management",
    assignedTo: "Miguel",
    dueDate: "2026-02-10",
    createdAt: "2026-01-25",
    updatedAt: "2026-01-25"
  },
  {
    id: "9",
    title: "Implement task update",
    description: "PATCH /tasks/:id endpoint",
    status: "todo",
    priority: "medium",
    topic: "Tasks Management",
    assignedTo: "Ana",
    dueDate: "2026-02-11",
    createdAt: "2026-01-26",
    updatedAt: "2026-01-26"
  },
  {
    id: "10",
    title: "Implement task deletion",
    description: "DELETE /tasks/:id with soft delete",
    status: "todo",
    priority: "low",
    topic: "Tasks Management",
    assignedTo: "Miguel",
    dueDate: "2026-02-12",
    createdAt: "2026-01-26",
    updatedAt: "2026-01-26"
  },
  {
    id: "11",
    title: "Global error handling",
    description: "Centralized error-handling middleware",
    status: "doing",
    priority: "high",
    topic: "Architecture",
    assignedTo: "Rita",
    dueDate: "2026-02-03",
    createdAt: "2026-01-22",
    updatedAt: "2026-01-30"
  },
  {
    id: "12",
    title: "Input validation",
    description: "Validate request payloads using Zod",
    status: "todo",
    priority: "medium",
    topic: "Architecture",
    assignedTo: "Ana",
    dueDate: "2026-02-04",
    createdAt: "2026-01-23",
    updatedAt: "2026-01-23"
  },
  {
    id: "13",
    title: "Add rate limiting",
    description: "Protect authentication routes from brute-force attacks",
    status: "todo",
    priority: "medium",
    topic: "Security",
    assignedTo: "Miguel",
    dueDate: "2026-02-05",
    createdAt: "2026-01-24",
    updatedAt: "2026-01-24"
  },
  {
    id: "14",
    title: "Write API documentation",
    description: "Create Swagger/OpenAPI documentation",
    status: "todo",
    priority: "high",
    topic: "Documentation",
    assignedTo: "Rita",
    dueDate: "2026-02-13",
    createdAt: "2026-01-27",
    updatedAt: "2026-01-27"
  },
  {
    id: "15",
    title: "Implement integration tests",
    description: "Write integration tests for auth and task routes",
    status: "todo",
    priority: "high",
    topic: "Testing",
    assignedTo: "Miguel",
    dueDate: "2026-02-14",
    createdAt: "2026-01-27",
    updatedAt: "2026-01-27"
  }
]

let taskCounter = 16

const getTasks = (req, res) => {

  const { searchText, priority, sortBy, order, limit, status } = req.query

  let tasks = TASKS

  if(searchText) {
    tasks = tasks.filter(t => t.title.includes(searchText))
  }

  if(priority) {
    tasks = tasks.filter(t => t.priority == priority)
  }

  if(sortBy == 'dueDate') {

    tasks = tasks.sort((a, b) => {
      const dateA =  new Date(a.dueDate)
      const dateB = new Date(b.dueDate)

      return order == 'asc' ? dateB - dateA : dateA - dateB

    })
  }

  if(limit) {
    tasks = tasks.slice(0, Number(limit))
  }

  if(status) {
    tasks = tasks.filter(t => t.status == status)
  }

  res.json({
    status: 'OK',
    requestAt: new Date(),
    limit: limit,
    data: tasks,
  })

}

const createTask = (req, res) => { 
  
  const { title, description, status, priority, topic, assignedTo, dueDate } = req.body

  const newTask = {
    id: taskCounter++,
    title,
    description,
    status,
    priority,
    topic,
    assignedTo,
    dueDate,
    createdAt: new Date(),
    updatedAt: undefined,
  }

  TASKS.push(newTask)

  res.json({
    status: 'OK',
    data: TASKS,
  })

}

const getTask = (req, res) => {

  const { id } = req.params 

  const task = TASKS.find(t => t.id == id)

  if(!task) {
    res.status(400).json({
      status: 'FAILED',
      message: 'Task not found'
    })
    return
  }

  res.json(
    {
      status: 'OK',
      data: task,
    }
  )

}

const updateTask = (req, res) => {

  const { id } = req.params

  const { title, description, status, priority, topic, assignedTo, dueDate } = req.body

  const taskIndex = TASKS.findIndex(t => t.id == id)

  if(taskIndex) {
    res.status(400).json({
      status: 'FAILED',
      message: 'Task not found'
    })
    return
  }

  if(title) {
    TASKS[taskIndex].title = title
  }

  if(description) {
    TASKS[taskIndex].description = description
  }

  if(status) {
    TASKS[taskIndex].status = status
  }

  if(priority) {
    TASKS[taskIndex].priority = priority
  }

  if(topic) {
    TASKS[taskIndex].topic = topic
  }

  if(assignedTo) {
    TASKS[taskIndex].assignedTo = assignedTo
  }


  if(dueDate) {
    TASKS[taskIndex].dueDate = dueDate
  }


  TASKS[taskIndex].updatedAt = new Date()

  res.json({
    status: 'OK',
    message: 'Task updated',
    data: TASKS[taskIndex]
  })

}

const deleteTask = (req, res) => {

  const { id } = req.params

  const task = TASKS.find(t => t.id == id)

  if(!task) {
    res.status(400).json({
      status: 'FAILED',
      message: 'Task not found'
    })
    return
  }

  TASKS = TASKS.filter(t => t.id != id)

  res.json({
    status: 'Ok',
    message: 'Task deleted successfully'
  })

}

module.exports = {
  TASKS,
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}