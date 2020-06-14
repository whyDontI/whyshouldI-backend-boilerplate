const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: false
  },
  password: {
    type: String,
    default: 'DefaultPassword'
  },
  lastLoggedIn: {
    type: Date,
    default: ''
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', user, 'users') // ( ModelName, Schema, CollectionName )
