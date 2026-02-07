const { TASKS } = require('./task')

const getTopics = (req, res) => {

  const TOPICS = []

  TASKS.forEach(t => {

    if(TOPICS.includes(t.topic)) {

    } else {
      TOPICS.push(t.topic)
    }

  })

  res.json({
    status: 'OK',
    data: TOPICS
  })

}

module.exports = {
  getTopics,
}