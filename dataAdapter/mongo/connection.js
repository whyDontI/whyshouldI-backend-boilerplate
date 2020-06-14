const mongoose = require('mongoose')
const envConfig = require('../../server').envConfig
mongoose.connect(`mongodb://${envConfig.database.localDB.db_host}:27017/${envConfig.database.localDB.db_name}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

var connection = mongoose.connection

connection.on('error', (err) => {
  console.log('Could not connect to Database: ', err)
})

connection.on('open', (ref) => {
  console.log('Connected to Database.')
})

module.exports = connection
