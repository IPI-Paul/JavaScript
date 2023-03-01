const { globalLoc } = require('./globals.js');
const express = require(`${globalLoc}express`);
const colors = require(`${globalLoc}colors`);
const cors = require(`${globalLoc}cors`);
const { connectDb } = require('./config/db');
const bodyParser = require(`${globalLoc}body-parser`);
const Meetup = require('./models/Meetup');

const port = process.env.PORT || 5000;
const app = express();

const db = connectDb();
app.use(cors());
app.use(bodyParser.json());

app.get('/meetups', async (req, res) =>{
  const data = await Meetup.find();
  res.send(data);
})

app.post('/meetups', async (req, res) =>{
  if(req.body?.func) {
    if(req.body?.data && req.body.func === 'Add') {
      new Meetup.addMeetup(req.body.data);
      await Meetup.save();
    }  
    if(req.body?.search && req.body.func === 'Find') {
      const data = await Meetup.find(req.body.search);
      return res.send(data[0]);
    } 
  }
  const data = await Meetup.find();
  res.send(data);
})

app.listen(port, console.log(`Server running on port ${port}`));