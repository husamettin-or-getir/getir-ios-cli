const chalk = require('chalk')
const open = require('open');
const fs = require('fs')
const readline = require('readline');

function log(task, options) {

    if (Object.keys(options).length > 1 && !options.message) {
        console.log("You cannot use multiple type options.")
        return
    }

    var typeDirectory = null

    if (options.fixed) {
        typeDirectory = "Fixed"
    } else if (options.changed) {
        typeDirectory = "Changed"
    } else if (options.added) {
        typeDirectory = "Added"
    } else if (options.removed) {
        typeDirectory = "Removed"
    } else {
        console.log("Missing type argument: --fixed, --changed, --added, --removed")
        return
    }

    let configData = fs.readFileSync(`${__dirname}/../config.json`);
    let config = JSON.parse(configData);

    var repositoryDirectory = config.GETIR_DIR

    if (!repositoryDirectory) {
        const cwd = process.cwd()
        if (cwd.endsWith('getir-ios-client')) {
            repositoryDirectory = cwd
        } else {
            console.log("Go to repository directory or use mark-repo command.")
            return
        }
    }
    const logDirectory = `${repositoryDirectory}/Changelog/Unreleased/${typeDirectory}`

    if (!fs.existsSync(logDirectory)){
        fs.mkdirSync(logDirectory, { recursive: true });
    }

    const fileDirectory = `${logDirectory}/${task}.md`

    if (fs.existsSync(fileDirectory)) {
        console.log("File already exists!")
        open(fileDirectory)
        return
    }

    var message = '{Update here}'

    if (options.message) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Enter your message: ', function (userMessage) {
            message = userMessage
            rl.close();
        });

        rl.on('close', function () {
            createFile(fileDirectory, task, message)
        });
    } else {
        createFile(fileDirectory, task, message)
    }
}

function createFile(directory, task, message) {
    const content = `- ${message} [${task}] (https://getirdev.atlassian.net/browse/${task})`
    fs.writeFile(directory, content, { flag: 'wx' }, function(error) {
        if (error) throw error

        console.log(chalk.hex('FFD300').bold('getir'))
        console.log(`Your CHANGELOG file for ${task} created successfully!`)

        open(directory)
    })
}

module.exports = log