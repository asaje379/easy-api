const chalk = require('chalk');
const { exec, execSync, spawn } = require('child_process');
const { print_error, prompt, print_success } = require('./print');
const fs = require('fs');


module.exports = {};
const m = module.exports;

m.create = async name => {
    if (fs.existsSync('./' + name)) {
        print_error('A file or directory with name ' + name + ' already exists.');
        const ans = await prompt('Do you want to overwrite it ? (y/N): ');
        if (['y', 'Y', 'o', 'O'].includes(ans)) {
            console.log(chalk.cyanBright(`Removing existing directory ${name} ...`));
            fs.rmdir('./' + name, { recursive: true }, err => {
                if (err) print_error(err.message);
                else {
                    cloneProject(name);
                }
            });
        } else return;
    } else {
        cloneProject(name);
        process.exit();
    }
};

m.process_config = args => {
    fs.readFile('./config/db.config.js', 'utf8', (err, data) => {
        if (err) print_error(err.message);
        let value = data.substr(data.indexOf('{') + 1, data.indexOf('}') - data.indexOf('{') - 1).trim();
        value = value.split(',').map(el => el.trim());

        const o = {};

        for (let it of value) {
            let [k, v] = it.split(':').map(el => el.trim());
            v = v.substr(1, v.length - 2);
            o[k] = v;
        }

        o.logging = true;

        for (let it of args) {
            const [k, v] = it.substr(2).split('=');
            if (!['host', 'user', 'pass', 'database'].includes(k)) {
                print_error('Invalid flag ' + k + ' !');
                process.exit();
            }
            o[k] = v;
        }

        const code = `const config = {
    host: '${o.host}',
    user: '${o.user}',
    pass: '${o.pass}',
    database: '${o.database}',
    dialect: 'mysql',
    logging: true
};

module.exports = config;`;
        fs.writeFile('./config/db.config.js', code, err => {
            if (err) {
                print_error(err.message);
                return;
            }
            print_success('Your new config has been correctly set !');
            process.exit();
        });
    });
};

m.process_serve = args => {
    if (args.length === 0) {
        const child = spawn('npm', ['run', 'start']);
        child.stdout.setEncoding('utf-8').on('data', chunk => {
            console.log(chunk);
        });
        child.stderr.setEncoding('utf-8').on('data', chunk => {
            console.log(chunk);
        });
        child.on('error', err => console.log(err));
    } else if (args.length === 1) {
        if (args[0] !== '-r') {
            print_error('Invalid flag ' + args[0]);
            process.exit();
        }
        const child = spawn('npm', ['run', 'rebuild']);
        child.stdout.setEncoding('utf-8').on('data', chunk => {
            console.log(chunk);
        });
        child.stderr.setEncoding('utf-8').on('data', chunk => {
            console.log(chunk);
        });
        child.on('error', err => console.log(err));
    } else {
        print_error('Invalid flag');
        process.exit();
    }
};

function cloneProject(name) {
    fs.mkdir('./' + name, err => {
        if (err) print_error(err);
        else {
            console.log(chalk.cyanBright(`Creating project, please wait ...\n`));
            exec('git clone https://github.com/asaje379/node-mysql-rest-backend.git', err => {
                if (err) print_error(err);
                else {
                    fs.rename('./node-mysql-rest-backend', './' + name, (err) => {
                        if (err) {
                            print_error(err.message);
                            return;
                        }
                        print_success('Project has been created !');
                        process.chdir('./' + name);
                        console.log(chalk.cyanBright(`Installing dependencies, please wait ...`));
                        exec('npm i', _ => {
                            exec('npm i -g nodemon', _ => {
                                console.log(chalk.green('Done !'));
                                process.exit();
                            });
                        });
                    });
                }
            });
        }
    });
}