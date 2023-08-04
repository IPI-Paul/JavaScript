const { globalLoc } = require('./globals.js');
const express = require(`${globalLoc}express`);
const colors = require(`${globalLoc}colors`);
const cors = require(`${globalLoc}cors`);
const { connectDb } = require('./config/db');
const bodyParser = require(`${globalLoc}body-parser`);
const Query = require('./models/Query');

const port = process.env.PORT || 5000;
const app = express();

const db = connectDb();
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));

app.get('/post', async (req, res) =>{
  const data = await Query.find();
  res.send(data);
})

app.post('/post', async (req, res) =>{
  if(req.body?.func) {
    if(req.body?.data && req.body.func === 'Add') {
      new Query.addQuery(req.body.data);
      await Query.save();
    }  
    if(req.body?.search && req.body.func === 'Find') {
      const data = await Query.find(req.body.search);
      return res.send(data);
    } 
  }
  const data = await Query.find();
  res.send(data);
})

app.post('/comment', async (req, res) =>{
  if(req.body?.func) {
    if(req.body?.data && req.body.func === 'Add') {
      const data = await Query.add(req.body.data);
      return res.send(data);
    }  
    if(req.body?.search && req.body.func === 'Find') {
      const data = await Query.find(req.body.search);
      return res.send(data);
    } 
  }
  const data = await Query.find();
  res.send(data);
})

app.listen(port, console.log(`Server running on port ${port}`));