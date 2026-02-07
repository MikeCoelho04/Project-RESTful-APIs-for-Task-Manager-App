const { TASKS } = require('./task')

const getAssignments = (req, res) => {

  const ASSIGNMENTS = []

  TASKS.forEach(t => {

    if(ASSIGNMENTS.includes(t.assignedTo)) {

    } else {
      ASSIGNMENTS.push(t.assignedTo)
    }

  })

  res.json({
    status: 'OK',
    data: ASSIGNMENTS
  })

}

module.exports = getAssignments