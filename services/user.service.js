const jwt = require('../middlewares/auth/auth')
const __ = require('../util/response.util')
const userQuery = require('../dataAdapter/mongo/query/user.query')
const md5 = require('md5')

class UserDetails {
  /**
    *_userLogin() User login
    *@param {object} req
    *@param {object} res
    *@return {undefined}
    * */
  async _userLogin (req, res) {
    try {
      const UserDetails = await userQuery.__getUserByNumber(req.body.phoneNumber)
      if (!UserDetails) return __.customMsg(req, res, 404, 'Incorrect Number or User does not exists')
      if (!UserDetails.password || UserDetails.password !== md5(req.body.password)) return __.customMsg(req, res, 404, 'Incorrect password')
      if (UserDetails.password === md5(req.body.password)) {
        await userQuery.__updateUserDetails(UserDetails._id, { lastLoggedIn: Date.now() })
        const token = await jwt.createToken(UserDetails._id)

        UserDetails.token = token

        // Remove unwanted keys
        delete UserDetails.password
        delete UserDetails.__v
        return __.successMsg(req, res, 200, UserDetails, 'User logged in successfully')
      };
    } catch (error) {
      __.errorMsg(req, res, 503, 'Service Unavailable.', error)
    };
  };

  /**
    *_createUser() Create new User
    *@param {object} req
    *@param {object} res
    *@return {undefined}
    * */
  async _createUser (req, res) {
    try {
      const UserCount = await userQuery.__getUserCount(req.body)
      if (UserCount > 0) return __.customMsg(req, res, 404, 'User with given credentials already exist')

      if (req.body.password) {
        req.body.password = md5(req.body.password)
      }

      const createdUser = await userQuery.__insertUserDetails(req.body)
      if (createdUser) {
        delete createdUser.password
        delete createdUser.__v
        return __.successMsg(req, res, 201, createdUser, 'User Added Successfully!')
      }
    } catch (error) {
      __.errorMsg(req, res, 503, 'Service Unavaiable', error)
    }
  };

  /**
    *_updateUser() Update User
    *@param {object} req
    *@param {object} res
    *@return {undefined}
    * */
  async _updateUser (req, res) {
    try {
      if (req.body.password !== undefined) {
        req.body.password = md5(req.body.password)
      }
      const updatedUser = await userQuery.__updateUserDetails(req.params.id, req.body)
      if (!updatedUser.nModified) { return __.customMsg(req, res, 404, 'User not found') }
      delete req.body.password
      return __.successMsg(req, res, 200, req.body, 'User updated Successfully!')
    } catch (error) {
      __.errorMsg(req, res, 503, 'Service Unavaiable', error)
    }
  }

  /**
    *_deleteUser() Delete User
    *@param {object} req
    *@param {object} res
    *@return {undefined}
    * */
  async _deleteUser (req, res) {
    try {
      const updatedUser = await userQuery.__deleteUser(req.body.id)
      if (!updatedUser.nModified) return __.customMsg(req, res, 404, 'User not found')
      return __.successMsg(req, res, 202, updatedUser, 'Deleted User Successfully!')
    } catch (error) {
      __.errorMsg(req, res, 503, 'Service Unavaiable', error)
    }
  }

  /**
    *_getOneUser() Get One User
    *@param {object} req
    *@param {object} res
    *@return {undefined}
    * */
  async _getOneUser (req, res) {
    try {
      const User = await userQuery.__getUserById(req.params.id)
      if (!User) { return __.customMsg(req, res, 404, 'User not found') }
      delete User.password
      User.deleteStatus = undefined
      return __.successMsg(req, res, 200, User, 'User Returned Successfully!')
    } catch (error) {
      __.errorMsg(req, res, 503, 'Service Unavaiable', error)
    }
  }

  /**
    *_getUser() Get Users
    *@param {Object} req.query - Express req.query
    *@return {Promise}
    * */
  async _getUsers (query) {
    return userQuery.__getUsers(query)
  }
};

module.exports = new UserDetails()
