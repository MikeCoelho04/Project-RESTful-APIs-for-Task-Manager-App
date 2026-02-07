const express = require('express')

const router = express.Router()

const getAssignments = require('../controllers/assignedTo')

router.get('/', getAssignments)

module.exports = router