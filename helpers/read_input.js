const readline = require('readline');

async function readInput(message) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const input = await new Promise(resolve => {
        rl.question(`${message}: `, resolve)
    })

    rl.close()
    return input
}

module.exports = readInput