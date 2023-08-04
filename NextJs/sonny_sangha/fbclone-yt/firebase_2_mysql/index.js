const { globalLoc } = require('./globals.js');
const express = require(`${globalLoc}express`);
const colors = require(`${globalLoc}colors`);
const cors = require(`${globalLoc}cors`);
const { connectDb } = require('./config/db');
const bodyParser = require(`${globalLoc}body-parser`);
const Posts = require('./models/Posts');

const port = process.env.PORT || 5000;
const app = express();

const db = connectDb();
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));

app.get('/posts', async (req, res) =>{
  const data = await Posts.find();
  res.send(data);
})

app.post('/posts', async (req, res) =>{
  if(req.body?.func) {
    if(req.body?.data && req.body.func === 'Add') {
      const data = await Posts.add(req.body.data);
      return res.send(data);
    }  
    if(req.body?.orderBy && req.body.func === 'Find') {
      const data = await Posts.orderBy(req.body.orderBy).then((d) => (
        d.map(obj => {
          if(!obj.postImage) return obj
          const image = new Buffer.from(obj.postImage, 'base64').toString()
          return {...obj, postImage: image}
        })          
      ));
      return res.send(data);
    }   
    if(req.body?.search && req.body.func === 'Find') {
      const data = await Posts.find(req.body.search);
      return res.send(data[0]);
    }  
    if(req.body?.set && req.body.func === 'Update') {
      const { id, set } = req.body
      const data = await Posts.update(id, set);
      return res.send(data);
    } 
  }
  const data = await Posts.find();
  res.send(data);
})

app.listen(port, console.log(`Server running on port ${port}`));