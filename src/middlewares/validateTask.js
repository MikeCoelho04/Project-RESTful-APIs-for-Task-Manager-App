const validateTask = (req, res, next) => {

  const { title, description, status, priority, topic, assignedTo, dueDate, 
   } = req.body

  if(!title) {

    res.status(400).json({
      status: 'FAILED',
      message: 'Please enter a title'
    })

  }

  if(!description) {

    res.status(400).json({
      status: 'FAILED',
      message: 'Please enter a description'
    })

  }

  if(!status) {

    res.status(400).json({
      status: 'FAILED',
      message: 'Please enter a status'
    })

  }

  if(!priority) {

    res.status(400).json({
      status: 'FAILED',
      message: 'Please enter a priority'
    })

  }

  if(!topic) {

    res.status(400).json({
      status: 'FAILED',
      message: 'Please enter a topic'
    })

  }

  if(!assignedTo) {

    res.status(400).json({
      status: 'FAILED',
      message: 'Please enter the collaborator responsible for this task'
    })

  }

  if(!dueDate) {

    res.status(400).json({
      status: 'FAILED',
      message: 'Please enter de task due date'
    })

  }

}

module.exports = validateTask