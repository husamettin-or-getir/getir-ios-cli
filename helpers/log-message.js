const chalk = require('chalk')

function logMessage(message) {
    console.log(chalk.hex('FFD300').bold('getir') + ` - ${message}`)
}

module.exports = logMessage