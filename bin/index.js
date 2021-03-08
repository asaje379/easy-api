#!/usr/bin/env node

const chalk = require("chalk");
const { create, process_config, process_serve } = require("./commands");
const { print_error, print_usage } = require("./print");
const arg = process.argv[2];

switch (arg) {
    case 'new':
        const value = process.argv[3];
        create(value).then();
        break;
    case 'dbconfig':
        process_config(process.argv.slice(3));
        break;
    case 'serve':
        process_serve(process.argv.slice(3));
        break;
    default:
        if (!arg) {
            print_error('One argument at least is required !');
            print_usage();
            process.exit();
        } else {
            print_error('Invalid argument ' + chalk.italic(chalk.yellow(arg)));
            process.exit();
        }
}
