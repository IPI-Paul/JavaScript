const fs = require('fs');
const path = require('path');
const globalLoc = require('child_process').execSync('npm root -g').toString().trim() + '/';

require(`${globalLoc}dotenv`).config({
  path: `${path.join(__dirname, '../server/.env')}`
});

const mysqlConn = {
  host: process.env.mysqlHost,
  port: process.env.mysqlPort,
  db: process.env.mysqlDb,
  user: process.env.mysqlUser,
  pwd: process.env.mysqlPwd,
}
 
module.exports = {
  globalLoc
  ,mysqlConn
}