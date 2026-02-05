const express = require('express')

const app = express()

const taskRoutes = require('./src/routes/task')

app.use(express.urlencoded({ extended: false }))

app.use('/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    now: new Date()
  })
})

app.listen(3000, () => {
  console.log('Server is running')
})