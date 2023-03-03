const User = require('../models/users')
const UserInfo = require('../models/userInfo')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register
exports.register = async (req, res) => {
  // check if email exists
  const userCheck = await User.findOne({ email: req.body.email })
  if (userCheck) {
    return res.status(400).send({
      message: 'This email already existed'
    })
  }
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
}

// login
exports.login = async (req, res) => {
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
        token,
        id: userCheck._id
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
}
// updateUserInfo
exports.user_update = async (req, res, next) => {
  try {
    const result = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    await result.save()
    res.status(200).send({
      message: 'update Successfully'
    })
  } catch (error) {
    res.status(500).send({
      message: 'something went wrong!',
      error
    })
  }
}
// updateInfo
exports.user_info_post = async (req, res) => {
  try {
    const userInfo = new UserInfo({
      user: req.user.UserId,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      telephone: req.body.telephone
    })
    try {
      const result = userInfo.save()
      res.status(201).send({
        message: 'user info created successfully.',
        result
      })
    } catch (error) {
      res.status(500).send({
        message: 'Error update user info.',
        error
      })
    }
  } catch (error) {
    res.status(500).send({
      message: 'something went wrong!',
      error
    })
  }
}
