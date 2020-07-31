const jwt = require('../middlewares/auth/auth')
const userQuery = require('../dataAdapter/mongo/query/user.query')
const md5 = require('md5')

/**
 *_userLogin() User login
 *@param {object} body - Express req.body
 *@param {string} body.phoneNumber - phonwNumber
 *@param {string} body.password - password
 *@return {Promise<Object>}
 * */
async function _userLogin ({
  phoneNumber,
  password
}) {
  try {
    const userData = await userQuery.__getUserByNumber(phoneNumber)
    if (!userData) return Promise.resolve({ message: 'Incorrect Number or User does not exists', status: 400, userData: {} })
    if (!userData.password || userData.password !== md5(password)) return Promise.resolve({ message: 'Incorrect password', status: 401, userData: {} })
    if (userData.password === md5(password)) {
      await userQuery.__updateUserDetails(userData._id, { lastLoggedIn: Date.now() })
      const token = await jwt.createToken(userData._id)

      userData.token = token

      // Remove unwanted keys
      delete userData.password
      delete userData.__v
      return Promise.resolve({ userData, message: 'User logged in successfully', status: 200 })
    };
  } catch (error) {
    return Promise.reject(error)
  };
};

/**
 *_createUser() Create new User
 *@param {object} body - Express body object
 *@param {string} body.name - name
 *@param {string} body.email - email
 *@param {string} body.phoneNumber - phoneNumber
 *@param {string} body.password - password
 *@return {Promise}
 * */
async function _createUser ({
  name,
  email,
  phoneNumber,
  password
}) {
  try {
    const UserCount = await userQuery.__getUserCount(phoneNumber)
    if (UserCount) {
      return Promise.resolve({ createdUser: {}, message: 'User already exists', status: 400 })
    }
    if (password) {
      password = md5(password)
    }

    const createdUser = await userQuery.__insertUserDetails({
      name,
      email,
      phoneNumber,
      password
    })

    delete createdUser.password
    delete createdUser.__v
    return Promise.resolve({ createdUser, message: 'User created successfully', status: 200 })
  } catch (error) {
    return Promise.reject(error)
  }
};

/**
 *_updateUser() Update User
 *@param {string} id - User _id
 *@param {object} data - User data to be updated
 *@return {Promise<Object>}
 * */
async function _updateUser (id, data) {
  try {
    if (data.password !== undefined) {
      data.password = md5(data.password)
    }
    const updatedUser = await userQuery.__updateUserDetails(id, data)
    if (!updatedUser.nModified) { return Promise.resolve({ message: 'User not found', updatedUser, status: 400 }) }
    delete data.password
    return Promise.resolve({ message: 'User updated Successfully!', updatedUser, status: 200 })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 *_deleteUser() Delete User
 *@param {object} req
 *@param {object} res
 *@return {undefined}
 * */
async function _deleteUser (id) {
  try {
    const deletedUser = await userQuery.__deleteUser(id)
    if (!deletedUser.deletedCount) return Promise.resolve({ deletedUser, message: 'User not found', status: 400 })
    return Promise.resolve({ deletedUser, message: 'Deleted User Successfully!', status: 200 })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 *_getOneUser() Get One User
 *@param {string} id - User _id
 *@return {Promise<Object>}
 * */
async function _getOneUser (id) {
  try {
    const userData = await userQuery.__getUserById(id)
    if (!userData) { return Promise.resolve({ userData, message: 'User not found', status: 400 }) }
    delete userData.password
    userData.deleteStatus = undefined
    return Promise.resolve({ userData, message: 'User Returned Successfully!', status: 200 })
  } catch (error) {
    return Promise.reject(error)
  }
}

/**
 *_getUser() Get Users
 *@param {Object} req.query - Express req.query
 *@return {Promise<Object>}
 * */
async function _getUsers (query) {
  try {
    const userData = await userQuery.__getUsers(query)
    if (!userData.length) { return Promise.resolve({ userData, message: 'Users not found', status: 400 }) }
    return Promise.resolve({ userData, message: 'Users returned successfully', status: 200 })
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports = {
  _userLogin,
  _createUser,
  _updateUser,
  _deleteUser,
  _getOneUser,
  _getUsers
} 
