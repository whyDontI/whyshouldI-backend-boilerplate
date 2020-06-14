class GenericFunction {
  async IDGenerator () {
    this.length = 5
    this.timestamp = +new Date()

    const _getRandomInt = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const ts = this.timestamp.toString()
    const parts = ts.split('').reverse()
    let id = ''

    for (var i = 0; i < this.length; ++i) {
      const index = _getRandomInt(0, parts.length - 1)
      id += parts[index]
    }

    return id
  }
};

module.exports = new GenericFunction()
