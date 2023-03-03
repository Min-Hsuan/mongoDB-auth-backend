const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../auth')

router.post('/user/:id/update', auth, userController.user_update)

module.exports = router
