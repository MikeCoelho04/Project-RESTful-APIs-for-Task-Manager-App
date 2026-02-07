const express = require('express')

const router = express.Router()

const { getTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/task')

const { validateCreateTask, validateUpdateTask } = require('../middlewares/validateTask')

router.get('/', getTasks)

router.post('/', validateCreateTask, createTask)

router.get('/:id', getTask)

router.patch('/:id', validateUpdateTask, updateTask)

router.delete('/:id', deleteTask)

module.exports = router 