const { GrocSQL } = require('../api/Groc');
const { conn } = require('../config/db');
const db = conn;

const Query = {
  add: async (props) => {
    const { table, obj } = props
    let sql = `insert into ${table} set ?`;
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, obj, function(err, result)  {
        if(err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from ${table} where _id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, p.insertId, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return n;
  },
  find: async (obj) => {
    if(!obj) {
      let sql = 'select * from post;'
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) return resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(results)));
        })
      });
      return p;
    } else {
      const sql = await GrocSQL.getSQL(obj)
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) return resolve(JSON.parse(JSON.stringify(err)));
          let allObjects = results.map(result => {
            let newObj = {}
            Object.keys(result).map(k => {
              if(k.includes('.')) {
                if(!Object.keys(newObj).includes(k.split('.')[0])) {
                  newObj[k.split('.')[0]] = {}
                }
                newObj[k.split('.')[0]][k.split('.')[1]] = result[k]
              } else {
                newObj[k] = result[k]
              }
            })
            return newObj
          })
          if(obj.length > 1 && obj[3] && allObjects.length > 0) {
            allObjects = allObjects[obj[3]]
          }
          resolve(JSON.parse(JSON.stringify(allObjects)))
        })
      });
      return p;
    }
  }
};

module.exports = Query;