const logger = require('../lib/logger/bunyan')

class SendResponse {
  errorMsg (req, res, status, message, error, scope) {
    logger.logResponse(req.id, { status: status, message: message }, 200)
    res.status(status).json({ message: message })
  };

  successMsg (req, res, status, data, message) {
    const obj = { status: status, message: message, data: data }
    if (Array.isArray(data)) { obj.count = data.length }
    logger.logResponse(req.id, obj, 200)
    res.status(status).json(obj)
  };

  customMsg (req, res, status, message) {
    logger.logResponse(req.id, { status: status, message: message }, 200)
    res.status(status).json({ message: message })
  };
};

module.exports = new SendResponse()
