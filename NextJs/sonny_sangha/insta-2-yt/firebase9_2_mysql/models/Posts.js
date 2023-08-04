const { conn } = require('../config/db');
const db = conn;

const getParams = (obj, table) => {
  table = table ? table : 'instapost';
  where = ''
  Object.entries(obj).map(([k, v]) => {
    if(k.substring(k.length - 2, k.length) === 'id') {
      if(where !== '') where += ' and '
      where += `${k} = ${v}`
    } 
  });
  if(where !== '') where = ` where ${where} `
  return {table, where}
}

const Posts = {  
  add: async (obj, table) => {
    ({table} = getParams(obj, table))
    let sql = `insert into ${table} set ?`;
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, obj, function(err, result)  {
        if(err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from ${table} where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, p.insertId, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(result[0])));
      })
    });
    return n;
  },
  delete: async (obj, table) => {
    ({ table, where } = getParams(obj, table))
    let sql = `delete from ${table} ${where};`;
    const p = await new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(result)));
      })
    });
    return p;
  },
  find: async (obj) => {
    if(!obj) {
      let sql = 'select * from instapost;'
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) return resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(results)));
        })
      });
      return p;
    } else {
      let sql = `select * from instapost where ${
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
  orderBy: async (obj, table) => {
    ({ table, where } = getParams(obj, table))
    let sql = `select * from ${table}${where} order by ${obj.field} ${obj.order};`
    const p = await new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(results)));
      })
    });
    return p;
  },
  update: async (id, obj, args) => {
    let sql = 'update instapost set ? where id = ?';
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, [obj, id], function(err, result)  {
        if(err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from instapost where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(result[0])));
      })
    });
    return n;
  },
  validate: async (table, email, password) => {
    const sql = `select id, email, name as name, image from ${table} where email = ? and password = SHA1(?)`;
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, [email, password], function(err, result)  {
        if(err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(result)));
      });
    });
    return p;
  }
};

module.exports = Posts;