const { globalLoc, mysqlConn, fs, phpSession } = require('./globals');
const express = require(`${globalLoc}/express`);
const bodyParser = require(`${globalLoc}/body-parser`);
let mysql = require(`${globalLoc}/mysql`);
let session = require(`${globalLoc}/express-session`);
const app = express();

let db = mysql.createConnection({
  host: mysqlConn.host,
  port: mysqlConn.port,
  user: mysqlConn.user,
  password: mysqlConn.pwd
  ,database: mysqlConn.db
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});

const User = require('./models/users');

app.use(bodyParser.json());
app.use(session({
  secret: 'anystringtobeusedtohashthecookie',
  saveUninitialized: false, // cookie not created for anyone not authenticated
  resave: false // force resave the cookie when back-end is changed
}))

app.post('/api/login', async (req, res) => {
  const {username, password, session_id} = req.body;

  let sql = 'select * from intro2angular_users where username = ? and password = ?;'
  db.query(sql, [username, password], (err, results) => {
    if (err) throw err;
    if(results.length == 0) {
      // user login is incorrect
      console.log("Incorrect details");
      // fs.writeFileSync(`${phpSession}${session_id}`, '', (err) => {
      //   if (err) throw err;
      //   console.log('The file has been saved!');
      // });
      res.json({
        success: false,
        message: 'That user and/or password combination is incorrect!'
      });
    } else {
      // make a session and set user to logged in.
      console.log("Logging you in");
      // fs.writeFileSync(`${phpSession}${session_id}`, 'user|s:5:"admin";', (err) => {
      //   if (err) throw err;
      //   console.log('The file has been saved!');
      // });
      req.session.username = username;
      req.session.save();
      res.json({
        success: true,
        message: 'Welcome back!'
      });
    }
  });
});

app.post('/');

app.post('/api/quote', (req, res) => {
  console.log(req.session.username, req.body.quote);
  if(req.session.username) {
    let sql = 'select username, quote from intro2angular_users where username = ?';
    db.query(sql, req.session.username, (err, result) => {
      if(err) throw err;
      if(result.length === 0) {
        res.json({
          success: false,
          message: 'Invalid user!'
        });
      } else {
        sql = 'update intro2angular_users set ?';
        db.query(sql, req.body, (err, result) => {
          if(err) throw err;
          res.json({
            success: true
          });
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: "You are not logged in to mysql!"
    });
  }
});

app.post('/api/register', (req, res) => {
  const {username} = req.body;
  
  let sql = 'select username, password from intro2angular_users where username = ?'
  db.query(sql, [username], (err, results) => {
    if (err) throw err;
    if(results.length > 0) {
      res.json({
        success: false,
        message: 'Email already in use'
      });
    } else {
      sql = 'insert into intro2angular_users set ?;'
      db.query(sql, req.body, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.json({
          success: true,
          message: 'Welcome!'
        });
      });
    }
  });
});

app.get('/api/isloggedin', (req , res) => {
  res.json({
    status: !!req.session.username
  });
});

app.get('/api/data', (req, res) => {
  let sql = 'select username, quote from intro2angular_users where username = ?';
  db.query(sql, req.session.username, (err, result) => {
    if(err) throw err;
    if(result.length === 0) {
      res.json({
        status: false,
        message: 'User not found'
      })
    } else {
      res.json({
        status: true,
        username: req.session.username,
        quote: result[0].quote
      });
    }
  })
});

app.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.json({
    success: true
  });
});

const svrPort = 3000;
app.listen(svrPort, () => console.log(`Server listening at ${svrPort}`));