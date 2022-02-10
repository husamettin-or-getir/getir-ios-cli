const chalk = require('chalk')
const fs = require('fs');
const logMessage = require('./log-message')

function saveDirectory() {
    const cwd = process.cwd()

    if (!cwd.endsWith('getir-ios-client')) {
        logMessage('This directory does not seem like getir-ios-client repository.')
        return
    }

    var config = {
        GETIR_DIR: cwd
    }

    var data = JSON.stringify(config);

    fs.writeFile(`${__dirname}/../config.json`, data, function (error) {
        if (error) {
            logMessage('There has been an error saving your configuration data.')
            return;
        }
        logMessage('Repository is marked, you can use getir commands everywhere now!')
      });
}

module.exports = saveDirectory
