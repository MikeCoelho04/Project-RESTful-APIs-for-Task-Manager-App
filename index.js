const express = require('express')

const app = express()

const taskRoutes = require('./src/routes/task')

const topicsRoute = require('./src/routes/topics')

const assignedToRoute = require('./src/routes/assignedTo')

app.use(express.urlencoded({ extended: false }))

app.use('/tasks', taskRoutes)

app.use('/topics', topicsRoute)

app.use('/assignedTo', assignedToRoute)

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    now: new Date()
  })
})

app.listen(3000, () => {
  console.log('Server is running')
})