const cluster = require('cluster')
// const numCPUs = require('os').cpus().length
const numCPUs = 1
const chalk = require('chalk')
const log = console.log
class Cluster {
  constructor () {
    if (cluster.isMaster) {
      //   require('./lib/cron/beatplan');
      log(chalk.blue.bgRed.bold(` [ ✓ ] Master ${process.pid} is running`))

      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
      }

      cluster.on('exit', (worker, code, signal) => {
        log(`worker ${worker.process.pid} died`)
      })
    } else {
      log(chalk.white(` [ ✓ ] Worker ${process.pid} started`))
    }
  };
};

module.exports = new Cluster()
