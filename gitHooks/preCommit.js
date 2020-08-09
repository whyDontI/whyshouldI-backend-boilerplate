const chalk = require('chalk')
const exec = require('../util/genericFunctions.util').exec
const log = console.log
const TIMEOUT = 5000

preCommit()
cleanup()

function preCommit () {
  checkBranchName()
  checkLinting()
  process.exit(0)
}

function checkBranchName () {
  const branchName = exec('git rev-parse --abbrev-ref HEAD', { trim: true })
  // check if this branch already exists in the remote
  const isInRemote = exec(`git show-branch remotes/origin/${branchName}`, { toString: false }).code === 0

  if (!isInRemote) {
    const validBranchPrefix = 'feature|fix|hotfix|chore|tests|automation'
    // feature|bugfix|hotfix
    const validBranchesRegex = new RegExp(`^(${validBranchPrefix})/[\\w.-]+$`)
    if (!validBranchesRegex.test(branchName)) {
      const msg = `Branch names in this project must adhere to this contract: ${validBranchPrefix}.`
      log(chalk.bgRed.white.bold(msg))
      process.exit(1)
    }
  }
}

function checkLinting () {
  const lintData = chalk.bgRed.white.bold(exec('standard --fix', { trim: true }))
  if (lintData) {
    log(lintData)
    process.exit(1)
  }
}

function cleanup () {
  setTimeout(() => {
    log(chalk.bgRed.white.bold('PreCommit hook is taking a lot of time to execute!'))
    process.exit(0)
  }, TIMEOUT)
}
