const chalk = require('chalk')
var fs = require('fs');

function markRepo() {
    const cwd = process.cwd()

    if (!cwd.endsWith('getir-ios-client')) {
        console.log('This directory does not seem like getir-ios-client repository :(')
        return
    }

    var config = {
        GETIR_DIR: cwd
    }

    var data = JSON.stringify(config);

    fs.writeFile(`${__dirname}/../config.json`, data, function (error) {
        if (error) {
          console.log('There has been an error saving your configuration data.');
          return;
        }
        console.log(chalk.hex('FFD300').bold('getir'))
        console.log('Repository is marked, you can use getir commands everywhere now!')
      });
}

module.exports = markRepo
