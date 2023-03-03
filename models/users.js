const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an Email!'],
    unique: [true, 'Email Exist']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    unique: false
  },
  first_name: {
    type: String,
    required: false,
    maxLength: 100
  },
  last_name: {
    type: String,
    required: false,
    maxLength: 100
  },
  telephone: {
    type: String,
    required: false
  }
})
module.exports = mongoose.model.users || mongoose.model('Users', UserSchema)
