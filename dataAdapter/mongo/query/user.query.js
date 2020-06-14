const user = require('../models/user.model')

class User {
  /*
    *__getUserById() Get user by Id
    *@param {string} id - user _id
    *@return {Promise}
    * */
  async __getUserById (id) {
    return user.findOne({
      _id: id
    })
      .lean()
  }

  /*
    *__getUserByEmail() Get user by Email
    *@param {string} email - user email
    *@return {Promise}
    * */
  async __getUserByEmail (email) {
    return user.findOne({
      email: email
    })
      .lean()
  }

  /*
    *__getUserByNumber() Get user by Number
    *@param {string} number - user Number
    *@return {Promise}
    * */
  async __getUserByNumber (number) {
    return user.findOne({
      phoneNumber: number
    })
      .lean()
  }

  /*
    *__getUserCount() Get user Count
    *@param {object} body - Express request body
    *@param {object} body.phoneNumber - user phoneNumber
    *@return {Promise}
    * */
  async __getUserCount (body) {
    return user.find({
      phoneNumber: body.phoneNumber
    })
      .countDocuments()
  }

  /*
    *__getUsers() Get users
    *@param {object} query - Express request query
    *@return {Promise}
    * */
  async __getUsers (query) {
    const obj = (query.search) ? {
      name: {
        $regex: '.*' + query.search + '.*',
        $options: 'i'
      }
    } : {}

    return user.find(obj)
      .sort({
        name: (query.name || 1),
        _id: (query.sort || -1)
      })
      .select('-password -__v')
      .limit((parseInt(query.size) || 100))
      .skip((parseInt(query.size) || 100) * (parseInt(query.page) || 0))
      .lean()
  }

  /*
    *__insertUserDetails() Create New user with provided details
    *@param {object} body - Express request body
    *@return {Promise}
    * */
  async __insertUserDetails (body) {
    return user.create(body)
  }

  /*
    *__updateUserDetails() Update user
    *@param {string} id - user _id
    *@param {object} body - Express request body
    *@return {Promise}
    * */
  async __updateUserDetails (id, body) {
    return user.updateOne({
      _id: id
    }, {
      $set: body
    })
  }

  /*
    *__deleteUser() Delete user
    *@param {string} id - user _id
    *@return {Promise}
    * */
  async __deleteUser (id) {
    return user.remove({
      _id: id
    })
  }
};

module.exports = new User()
