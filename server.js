require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'Development'
const cors = require('cors')
const chalk = require('chalk')
const cluster = require('cluster')
const reqlogger = require('./lib/logger/bunyan')
const morgan = require('morgan')
const helmet = require('helmet')

// Initialize Mongoose Models
require('./init/modelInit')

// Enviroment Setup
let envConfig

switch (environment) {
  case 'Development':
    envConfig = require('./config/local.json')
    break

  case 'Test':
    envConfig = require('./config/test.json')
    break

  case 'Production':
    envConfig = require('./config/prod.json')
    break

  default:
    envConfig = require('./config/local.json')
    break
};

module.exports = { envConfig, app }

// Config Server Port
if (!cluster.isMaster) {
  app.listen(envConfig.server.port, () => {
    console.log(chalk.blue(' [ ✓ ] Running on port : ' + envConfig.server.port))
    app.emit('app_started')
  })
}

// MiddleWares
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 10000
}))

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(require('express-request-id')())
app.use((req, res, next) => {
  const log = reqlogger.loggerInstance.child({
    id: req.id,
    path: req.url,
    body: req.body,
    token: req.headers.authorization
  }, true)
  log.info({
    req: req
  })
  next()
})

// Routers Config
app.use('/api/v1/', require('./routes/index'))

// Dependencies
require('./init/cluster')
require('./dataAdapter/mongo/connection')
