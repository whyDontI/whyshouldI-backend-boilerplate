const user = require('../models/user.model')

class User {
  /**
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

  /**
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

  /**
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

  /**
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

  /**
    *__getUsers() Get users
    *@param {Object} req.query - Express req.query
    *@param {string} query.search - Search string
    *@param {number} query.sort - [sort = -1] One for ascending / negative one for descending
    *@param {number} query.size - [size = 100] Documents per page
    *@param {number} query.page - [page = 0] Page number
    *@return {Promise<mongoose.Query>}
    * */
  async __getUsers ({
    search,
    sort = -1,
    size = 100,
    page = 0
  }) {
    const obj = (search) ? {
      name: {
        $regex: '.*' + search + '.*',
        $options: 'i'
      }
    } : {}

    return user.find(obj)
      .sort({
        _id: (sort)
      })
      .select('-password -__v')
      .limit(parseInt(size))
      .skip(parseInt(size) * parseInt(page))
      .lean()
  }

  /**
    *__insertUserDetails() Create New user with provided details
    *@param {object} body - Express request body
    *@return {Promise}
    * */
  async __insertUserDetails (body) {
    return user.create(body)
  }

  /**
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

  async __deleteUser (id) {
    return user.remove({
      _id: id
    })
  }
};

module.exports = new User()
