const { globalLoc, mysqlConn } = require('../globals/globals.js');
const mysql = require(`${globalLoc}mysql`); 

const conn = mysql.createConnection({
  host: mysqlConn.host,
  port: mysqlConn.port,
  user: mysqlConn.user,
  password: mysqlConn.pwd
  ,database: mysqlConn.db
});

const connectDb = () => (
  conn.connect((err) => {
    if (err) {
      throw err;
    }
    console.log(`MySql Connected: ${mysqlConn.host}`.cyan.underline.bold);
  })  
);

module.exports = { conn, connectDb };