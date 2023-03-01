const fs = require('fs');
const path = require('path');
const globalLoc = require('child_process').execSync('npm root -g').toString().trim() + '/';
let dotenv = require(`${globalLoc}dotenv`).config();

if(!process.env.mysqlHost) {
  dotenv = require(`${globalLoc}dotenv`).config({
    path: `${path.join(__dirname, '../JoinUs/')}`
  });
}

const mysqlConn = {
  host: process.env.mysqlHost,
  port: process.env.mysqlPort,
  db: process.env.mysqlDb,
  user: process.env.mysqlUser,
  pwd: process.env.mysqlPwd,
}

const phpSession = process.env.phpSessions;
 
module.exports = {
  globalLoc
  ,mysqlConn
  ,fs
  ,phpSession
}