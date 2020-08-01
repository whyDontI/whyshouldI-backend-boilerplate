const logger = require('../lib/logger/bunyan')

function errorMsg (req, res, status, message, error, scope) {
  logger.logResponse(req.id, { status: status, message: message }, status)
  res.status(status).json({ message: message })
};

function successMsg (req, res, status, data, message) {
  const obj = { status, message, data }
  if (Array.isArray(data)) { obj.count = data.length }
  logger.logResponse(req.id, obj, status)
  res.status(status).json(obj)
};

function customMsg (req, res, status, message) {
  logger.logResponse(req.id, { status: status, message: message }, status)
  res.status(status).json({ message: message })
};

module.exports = {
  errorMsg,
  successMsg,
  customMsg
}
