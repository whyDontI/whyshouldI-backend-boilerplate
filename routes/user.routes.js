const express = require('express')
const app = express.Router()
const userService = require('../services/user.service')
const userValidator = require('../middlewares/validators/user.validator')
const idValidator = require('../middlewares/validators/id.validator')
const auth = require('../middlewares/auth/auth')
const __ = require('../util/response.util')

app.post('/login', userValidator.userLogin, userService._userLogin) // LogIn

// app.get('/', auth.authentication, userService._getUsers) // Get users
app.get('/', auth.authentication, async (req, res) => {
  try {
    const userData = await userService._getUsers(req.query)
    if (!userData.length) return __.customMsg(req, res, 404, 'Users not found')
    return __.successMsg(req, res, 200, userData, 'Users Returned Successfully!')
  } catch (error) {
    return __.errorMsg(req, res, 503, 'Service Unavaiable', error)
  }
}) // Get users

app.get('/:id', auth.authentication, idValidator.isValidId, userService._getOneUser) // Get one User

app.post('/', auth.authentication, userValidator.createUser, userService._createUser) // Create User

app.patch('/:id', auth.authentication, idValidator.isValidId, userValidator.updateUser, userService._updateUser) // Update User

app.delete('/:id', auth.authentication, idValidator.isValidId, userService._deleteUser) // Delete User

module.exports = app
