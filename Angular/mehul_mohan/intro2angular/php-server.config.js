const {execSync, pwd} = require('child_process');
process.chdir('src/assets');
console.log(process.cwd());
execSync(`php -S localhost:5000 && cd ../../..`, {stdio: 'inherit'});