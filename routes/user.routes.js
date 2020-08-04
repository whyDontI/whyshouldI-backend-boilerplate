const express = require('express')
const app = express.Router()
const userService = require('../services/user.service')
const userValidator = require('../middlewares/validators/user.validator')
const { isValidId } = require('../middlewares/validators/id.validator')
const auth = require('../middlewares/auth/auth')
const __ = require('../util/response.util')

app.post('/login', userValidator.userLogin, async (req, res) => {
  try {
    const { userData, message, status } = await userService._userLogin(req.body)
    return __.successMsg(req, res, status, userData, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.get('/', auth.authentication, async (req, res) => {
  try {
    const { userData, message, status } = await userService._getUsers(req.query)
    return __.successMsg(req, res, status, userData, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.get('/:id', auth.authentication, isValidId, async (req, res) => {
  try {
    const { userData, message, status } = await userService._getOneUser(req.params.id)
    return __.successMsg(req, res, status, userData, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.post('/', auth.authentication, userValidator.createUser, async (req, res) => {
  try {
    const { createdUser, message, status } = await userService._createUser(req.body)
    return __.successMsg(req, res, status, createdUser, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.patch('/:id', auth.authentication, isValidId, userValidator.updateUser, async (req, res) => {
  try {
    const { updatedUser, message, status } = await userService._updateUser(req.params.id, req.body)
    return __.successMsg(req, res, status, updatedUser, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

app.delete('/:id', auth.authentication, isValidId, async (req, res) => {
  try {
    const { deletedUser, message, status } = await userService._deleteUser(req.params.id)
    return __.successMsg(req, res, status, deletedUser, message)
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
})

module.exports = app
