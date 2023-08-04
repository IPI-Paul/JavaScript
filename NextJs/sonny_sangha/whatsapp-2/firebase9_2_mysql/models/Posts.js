const { conn } = require('../config/db');
const db = conn;

const getParams = (obj, table) => {
  table = table ? table : 'whatsAppLogin';
  let where = ''
  let orderBy = ''
  Object.entries(obj).map(([k, v]) => {
    if (k === 'orderBy') {
      Object.entries(v).map(([k1, v1]) => {
        orderBy = ` order by ${k1} ${v1}`
      })
    } else {
      if(k.substring(k.length - 2, k.length) === 'id') {
        if(where !== '') where += ' and '
        where += `${k} = ${v}`
      } else {
        if(where !== '') where += ' and '
        where += `${k} like '%${v}%'`
      }
    }
  });
  if(where !== '') where = ` where ${where} `
  return {table, where, orderBy}
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
  find: async (obj, table) => {
    ({ table, where, orderBy } = getParams(obj, table))
    let sql = `select * from ${table}${where}${orderBy}`
    const p = await new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(results)));
      })
    });
    return p;
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
  show: async (table) => {
    let sql = `desc ${table}`
    const p = await new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(results)));
      })
    });
    return p;
  },
  update: async (uid, obj, table) => {
    let sql = `update ${table} set ? where uid = ?`;
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, [obj, uid], function(err, result)  {
        if(err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from ${table} where uid = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, uid, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(result[0])));
      })
    });
    return n;
  },
  validate: async (table, email, password) => {
    const sql = `select uid, email, name as name, photoURL from ${table} where email = ? and password = SHA1(?)`;
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