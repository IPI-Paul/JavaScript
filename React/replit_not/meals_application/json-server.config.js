const {execSync} = require('child_process');
const pwd = process.cwd();
process.chdir('../../../SourceFiles/json/');
console.log(process.cwd());
execSync(`json-server --watch themealdb.com.json --port 5000 && cd ${pwd}`, {stdio: 'inherit'});