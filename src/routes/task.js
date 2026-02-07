const express = require('express')

const router = express.Router()

const { getTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/task')

const validateTask = require('../middlewares/validateTask')

router.get('/', getTasks)

router.post('/', validateTask, createTask)

router.get('/:id', getTask)

router.patch('/:id', validateTask, updateTask)

router.delete('/:id', deleteTask)

module.exports = router 