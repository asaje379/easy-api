const chalk = require("chalk");
const rl = require('readline');
const usage = require("../libs/usage");

module.exports = {};
const m = module.exports;

const rd = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

m.print_error = msg => {
    console.log(chalk.red('Error: ') + chalk.yellowBright(msg) + '\n');
};

m.print_success = msg => {
    console.log(chalk.greenBright('Success: ') + chalk.cyanBright(msg) + '\n');
};

m.print_usage = _ => console.log(usage());

m.prompt = query => {
    return new Promise(resolve => {
        rd.question(query, ans => {
            rd.close();
            resolve(ans);
        });
    });
};