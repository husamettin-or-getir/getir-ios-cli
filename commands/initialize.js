const shell = require('shelljs')
const { Bitbucket } = require('bitbucket')
const execute = require('../helpers/execute')
const saveDirectory = require('../helpers/save-directory')
const readInput = require('../helpers/read_input')
const logMessage = require('../helpers/log-message')

async function initialize() {
    // Read inputs
    let bitbucketEmail = await readInput('Enter your bibucket email')
    let bitbucketPassword = await readInput('Enter your bitbucket password')
    let sshKeyPassword = await readInput('Create a password for SSH key')

    const clientOptions = {
        auth: {
          username: bitbucketEmail,
          password: bitbucketPassword,
        },
    }

    const bitbucket = new Bitbucket(clientOptions)

    // Create SSH key
    const sshDirectory = '~/.ssh/getir_ios_id_rsa'
    execute(`ssh-keygen -t rsa -C ${bitbucketEmail} -N ${sshKeyPassword} -m PEM -f ${sshDirectory}`, 'Creating SSH key')

    // Start SSH agent
    execute('eval `ssh-agent`', 'starting SSH agent')

    // Add SSH key into authentication agent
    execute(`ssh-add -K ${sshDirectory}`, 'adding ssh key to authentication agent')

    // Check if ssh config exists and if not create for system to remember password
    const keyConfigCommand = shell.exec('cat ~/.ssh/config', { silent: true })
    if (keyConfigCommand.code !== 0) {
        shell.exec('touch ~/.ssh/config')
        shell.exec('echo "Host *" >> ~/.ssh/config')
        shell.exec('echo "UseKeychain yes" >> ~/.ssh/config')
    }

    // Get user uuid
    const id = await getUserId(bitbucket)

    // Copy key
    const key = shell.exec(`cat ${sshDirectory}.pub`, { silent: true }).stdout

    // Send SSH key to bitbucket
    const createdKey = createKey(bitbucket, key, id)
    if (!createdKey.uuid) {
        logMessage('Failed created SSH key on bitbucket')
        return
    }

    // Start cloning
    execute('git clone git@bitbucket.org:getirdev/getir-ios-client.git -b develop --recurse-submodules', 'cloning repository')

    // Change directory to repository
    shell.cd('getir-ios-client')

    // Save repository directory
    saveDirectory()

    // Update submodules
    execute('git submodule update --init', 'updating submodules')

    // Run setup script
    execute(`sh ${process.cwd()}/setup_project.sh`, 'setup project')

    // Install SwiftLint
    execute('brew install swiftlint', 'installing swiftlint')
}

async function getUserId(bitbucket) {
    const { data } = await bitbucket.user.get({ })
    return data.uuid
}

async function createKey(bitbucket, key, id) {
    const { data } = await bitbucket.ssh.createKey({ _body: { key: key }, selected_user: id })
    return data
}

module.exports = initialize