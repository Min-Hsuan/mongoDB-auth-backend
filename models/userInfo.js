const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserInfoSchema = new mongoose.Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'Users',
    required: true
  },
  first_name: {
    type: String,
    required: true,
    maxLength: 100
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 100
  },
  telephone: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model.UserInfo || mongoose.model('UserInfo', UserInfoSchema)
