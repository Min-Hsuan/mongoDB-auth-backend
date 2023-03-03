const createError = require('http-errors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dbConnent = require('./db/dbConnect')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
// execute database connection
dbConnent()

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})
// body parser configuration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', indexRouter)
app.use('/user', userRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// app.get('/', (req, res, next) => {
//   res.json({ message: 'Hey! This is your server response!' })
//   next()
// })

// // free endpoint
// app.get('/free-endpoint', (req, res) => {
//   res.json({ message: 'You are free to access me anytime' })
// })
// // authentication endpoint
// app.get('/auth-endpoint', auth, (req, res) => {
//   res.json({ message: 'You are autorized to access me', ...req.user })
// })
module.exports = app
