const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../auth')
router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/user/:id/update', auth, userController.user_update)
module.exports = router
