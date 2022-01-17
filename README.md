# Getir iOS CLI

## Installation
If you do not have `npm`, run the command below:
```bash
brew install npm
```

To install CLI, you can use:
```bash
npm i -g git+ssh://git@github.com:husamettin-or-getir/getir-ios-cli.git
```

## Usage
To be able to use commands you should either be in root directory of `getir-ios-client` project or mark the directory of repository with `mark-repo` command.

### Marking Repository
You can mark the directory of `getir-ios-client` repository to be able to use CLI commands anywhere. To enable it, you should go to the root directory of the repository and run `mark-repo` command.

Example:
``` bash
$ getir mark-repo
```

### Creating Changelog
You can create a changelog file with given type and for given task.

Example:
```bash
$ getir log -f CCS-1234
$ getir log CCS-1234 -f
$ getir log -a CM-123 -m
```

Type options with `log` command:
* `-f, --fixed` creates file in Fixed directory
* `-c, --changed` creates file in Changed directory
* `-a, --added` creates file in Added directory
* `-r, --removed` creates file in Removed directory

Command accepts only one type option.

If you specify `-m, --message` option, terminal opens a user input for you to enter your changelog message.

