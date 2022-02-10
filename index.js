#! /usr/bin/env node

const { program } = require('commander')
const initialize = require('./commands/initialize')
const log = require('./commands/log')
const markRepo = require('./commands/mark-repo')

program
    .command('initialize')
    .action(initialize)

program
    .command('log')
    .description('create changelog file for specified task')
    .option('-f, --fixed', 'create fixed task')
    .option('-c, --changed', 'create changed task')
    .option('-a, --added', 'create added task')
    .option('-r, --removed', 'create removed task')
    .option('-m, --message', 'enter message content of changelog file')
    .arguments('<task>')
    .action(log)

program
    .command('mark-repo')
    .description('marks repository directory')
    .action(markRepo)

program
    .version('1.0.0')

program.parse()