const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dbConnent = require('./db/dbConnect')
const bcrypt = require('bcrypt')
const User = require('./db/userModel')
const jwt = require('jsonwebtoken')

// execute database connection
dbConnent()
// body parser configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request, response, next) => {
  response.json({ message: 'Hey! This is your server response!' })
  next()
})
// register endpoint
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // create a new user instance and collect the data
    const user = new User({
      email: req.body.email,
      password: hashedPassword
    })
    // save the new user
    try {
      const result = user.save()
      res.status(201).send({
        message: 'User Created Successfully',
        result
      })
    } catch (error) {
      this.response.status(500).send({
        message: 'Error Creating user',
        error
      })
    }
  } catch (error) {
    res.status(500).send({
      message: 'Password was not hashed successfully',
      error
    })
  }
})

// login endpoint
app.post('/login', async (req, res) => {
  try {
    // check if email exists
    const userCheck = await User.findOne({ email: req.body.email })
    if (!userCheck) {
      throw new Error('The email does not exist')
    }
    try {
      // compare the password entered and the hashed password found
      const passwordCheck = await bcrypt.compare(req.body.password, userCheck.password)
      // check if password matches
      if (!passwordCheck) {
        return res.status(400).send({
          message: 'Passwords does not match'
        })
      }
      // create JWT token
      const token = jwt.sign({
        userId: userCheck._id,
        uerEmail: userCheck.email
      }, 'RANDOM-TOKEN', { expiresIn: '24h' })
      // return success response
      res.status(200).send({
        message: 'Login Successful',
        email: userCheck.email,
        token
      })
    } catch (error) {
      res.status(400).send({
        message: 'Passwords does not match',
        error
      })
    }
  } catch (error) {
    res.status(404).send({
      message: 'Email not found',
      error
    })
  }
})
module.exports = app
