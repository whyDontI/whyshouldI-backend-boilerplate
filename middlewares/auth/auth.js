const jwt = require('jsonwebtoken')
const __ = require('../../util/response.util')
const mongoose = require('mongoose')
const userModelAccess = require('../../dataAdapter/mongo/query/user.query')
const { encryptorToken } = require('./encryptor')
const { decryptorToken } = require('./decryptor')

async function createToken (userId) {
  userId = userId.toString()
  return jwt.sign({ userId: encryptorToken(userId) }, process.env.SECRET_KEY, { expiresIn: '1d' })
};

async function authentication (req, res, next) {
  try {
    const decoded = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
    if (decoded) {
      const verifyUser = await userModelAccess.__getUserById(mongoose.Types.ObjectId(decryptorToken(decoded.userId)))
      if (!verifyUser) return res.status(401).json({ message: 'Illegal access' })
      req.userId = verifyUser.userId
      next()
    };
  } catch (error) {
    return __.errorMsg(req, res, 401, error.message, error, 'authentication')
  }
}

module.exports = {
  createToken,
  authentication
}
