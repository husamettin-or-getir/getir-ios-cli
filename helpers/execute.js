const shell = require('shelljs')
const logMessage = require('./log-message')

function execute(command, message) {
    logMessage(`Started ${message}`)
    const executingCommand = shell.exec(command)
    if (executingCommand.code == 0) {
        logMessage(`Completed ${message}`)
    } else {
        logMessage(`Failed ${message}`)
        shell.exit(1)
    }
}

module.exports = execute