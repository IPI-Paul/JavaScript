const { conn } = require('../config/db');
const db = conn;

const Posts = {  
  add: async (obj) => {
    let sql = 'insert into fbpost set ?';
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, obj, function(err, result)  {
        if(err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from fbpost where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, p.insertId, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(result[0])));
      })
    });
    return n;
  },
  find: async (obj) => {
    if(!obj) {
      let sql = 'select * from fbpost;'
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) return resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(results)));
        })
      });
      return p;
    } else {
      let sql = `select * from fbpost where ${
        Object.entries(obj).map(([key, value]) => 
          key === 'id'
          ? key + " = " + value 
          : key + " like '%" + value + "%'"
        )
      };`
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) return resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(results)));
        })
      });
      return p;
    }
  },
  findByIdAndRemove: async (id) => {
    let sql = `select * from fbpost where id = ?;`;
    const p = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    if(p.errno) return p;
    sql = `delete from fbpost where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return p;
  },
  orderBy: async (obj) => {
    let sql = `select * from fbpost order by ${obj.field} ${obj.order};`
    const p = await new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(results)));
      })
    });
    return p;
  },
  update: async (id, obj, args) => {
    let sql = 'update fbpost set ? where id = ?';
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, [obj, id], function(err, result)  {
        if(err) throw err;
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from fbpost where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(result[0])));
      })
    });
    return n;
  }
};

module.exports = Posts;