const shell = require('shelljs')

async function IDGenerator () {
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

function exec (cmd, options) {
  const defaultOptions = { silent: true }
  let output = shell.exec(cmd, { ...defaultOptions, ...(options || {}) })
  if (options && options.toString !== false) {
    output = output.toString()
    output = options.trim ? output.trim() : output
  }
  return output
}

module.exports = {
  IDGenerator,
  exec
}
