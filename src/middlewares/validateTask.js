const validateCreateTask = (req, res, next) => {

  const { title, description, status, priority, topic, assignedTo, dueDate, 
   } = req.body

  if(!title) {

    return res.status(400).json({
      status: 'FAILED',
      message: 'Please enter a title'
    })

  }

  if(!description) {

    return res.status(400).json({
      status: 'FAILED',
      message: 'Please enter a description'
    })

  }

  if(!status) {

    return res.status(400).json({
      status: 'FAILED',
      message: 'Please enter a status'
    })

  }

  if(!priority) {

    return res.status(400).json({
      status: 'FAILED',
      message: 'Please enter a priority'
    })

  }

  if(!topic) {

    return res.status(400).json({
      status: 'FAILED',
      message: 'Please enter a topic'
    })

  }

  if(!assignedTo) {

    return res.status(400).json({
      status: 'FAILED',
      message: 'Please enter the collaborator responsible for this task'
    })

  }

  if(!dueDate) {

    return res.status(400).json({
      status: 'FAILED',
      message: 'Please enter de task due date'
    })

  }

  next()

}

const validateUpdateTask = (req, res, next) => {

  const body = req.body ?? {}

  const keys = Object.keys(body)

  if(keys.length == 0) {
    return res.status(400).json({
      status: 'FAILED',
      message: 'No fileds provided to update'
    })
  }

  const empty = keys.filter(k => {
    const v = req.body[k];
    return v === null || v === undefined || (typeof v === "string" && v.trim() === "")
  })

  if (empty.length) {
    return res.status(400).json({
      status: "FAILED",
      message: "Fields cannot be empty",
      fields: empty
    })
  }

  next()
}

module.exports = {
  validateCreateTask,
  validateUpdateTask
}