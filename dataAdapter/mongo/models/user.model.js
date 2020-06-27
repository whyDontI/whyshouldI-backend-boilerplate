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
    default: 'c21f969b5f03d33d43e04f8f136e7682' // The default password is md5 encrypted 'default'
  },
  lastLoggedIn: {
    type: Date,
    default: ''
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', user, 'users') // ( ModelName, Schema, CollectionName )
