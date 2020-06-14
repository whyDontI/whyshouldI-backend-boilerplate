const express = require('express')
const app = express()

app.use('/user', require('./user.routes'))

module.exports = app
