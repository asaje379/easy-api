const chalk = require("chalk");

function usage() {
    return `${chalk.italic(chalk.greenBright('@easyapi/cli'))} helps you to create and manage a node/mysql backend api very easily

Usage: 
    ${chalk.cyanBright('eapi')} ${chalk.cyan('<command>')}

    Available commands are:
        ${chalk.cyanBright('new')} ${chalk.cyan('<name>')} - create new project in <name> folder

        ${chalk.cyanBright('dbconfig')} ${chalk.cyan('--<flag>=<name>')} - set database config for your project
            Available flags are: 
                ${chalk.magentaBright('--host')} - set the host (${chalk.yellow('localhost')} by default)
                ${chalk.magentaBright('--user')} - set the user (${chalk.yellow('root')} by default)
                ${chalk.magentaBright('--pass')} - set the password (${chalk.yellow('\'\'')} by default)
                ${chalk.magentaBright('--database')} - set the database name (${chalk.yellow('test')} by default)

        ${chalk.cyanBright('serve')} - start server (accept ${chalk.yellow('-r')} flag which start server with rebuild mode)
`;
}

module.exports = usage;
