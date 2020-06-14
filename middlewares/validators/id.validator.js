const __ = require('../../util/response.util')
const mongoose = require('mongoose')

class IdValidator {
  /*
    *isValidId() Validation for mongoose _id
    *@param {object} req
    *@param {object} res
    *@param {Function} next
    *@param {req.params.id} user _id
    *@return {undefined}
    * */
  async isValidId (req, res, next) {
    try {
      const result = await mongoose.Types.ObjectId.isValid(req.params.id)
      if (!result) return __.errorMsg(req, res, 400, 'Incorrect Id provided')
      return next()
    } catch (error) {
      __.errorMsg(req, res, 400, 'Incorrect Id provided', error)
    };
  };
};

module.exports = new IdValidator()
