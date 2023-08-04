const { globalLoc } = require('./globals/globals.js');
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
app.use(bodyParser.json({limit: '5mb'}))

app.post('*', async (req, res) =>{
  if(req.body?.func) {
    if(req.body?.data && req.body?.table && req.body.func === 'Add') {
      const data = await Posts.add(req.body.data, req.body.table);
      return res.send(data);
    }  
    if(req.body?.orderBy && req.body.func === 'Find') {
      const data = await Posts.orderBy(req.body.orderBy).then((d) => (
        d.map(obj => {
          if(!obj.image) return obj
          const image = new Buffer.from(obj.image, 'base64').toString()
          return {...obj, image: image}
        })          
      ));
      return res.send(data);
    }   
    if(req.body?.table && req.body.func === 'Show') {
      const data = await Posts.show(req.body.table);
      return res.send(data);
    }  
    if(req.body?.search && req.body?.table && req.body.func === 'Find') {
      const data = await Posts.find(req.body.search, req.body.table);
      return res.send(data);
    }  
    if(req.body?.set && req.body?.table && req.body.func === 'Update') {
      const { uid, set, table } = req.body;
      const data = await Posts.update(uid, set, table);
      return res.send(data);
    } 
    if((req.body?.table === 'comments' || req.body?.table === 'likes') && req.body.func === 'Add') {
      const data = await Posts.add(req.body.data, req.body.table);
      return res.send(data);
    }
    if(req.body?.filter &&req.body?.table &&  req.body.func === 'Delete') {
      await Posts.delete(req.body.filter, req.body.table);
      return res.sendStatus(200);
    }
    if(req.body?.orderBy && (req.body?.table === 'comments' || req.body?.table === 'likes') && req.body.func === 'Find') {
      const data = await Posts.orderBy(req.body.orderBy, req.body.table);
      return res.send(data);
    }
    if(req.body?.email && req.body.func === 'Validate') {
      const { table, email, password } = req.body;
      const data = await Posts.validate(table, email, password);
      if(data.length == 0) return res.sendStatus(204);
      return res.send(data[0]);
    } 
  }
  return res.sendStatus(404);
})

app.listen(port, console.log(`Server running on port ${port}`));