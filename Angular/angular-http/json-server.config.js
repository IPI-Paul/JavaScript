const {execSync, pwd} = require('child_process');
process.chdir('src/assets/json');
console.log(process.cwd());
execSync(`json-server --watch users.json --port 5000 && cd ../../..`, {stdio: 'inherit'});