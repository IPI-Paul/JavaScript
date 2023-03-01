const { conn } = require('../config/db');
const db = conn;
let Schema;

const ClientSchema = {
  name: { type: String}, 
  email: { type: String}, 
  phone: { type: String}
};

const Client = {
  addClient: function add(args) {
    const State = {
      set current(args) {
        this.Schema = {...this.Schema, ...args}
      },
      Schema: ClientSchema 
    }
    return ((args) => {
      State.current = {...args};
      Schema = State.Schema;
      return Schema;
    })(args)
  },
  create: async () => {
    let sql = `
      CREATE TABLE clients(
      id int auto_increment primary key
      ,name varchar(50)
      ,email varchar(100) unique 
      ,phone varchar(50)
      );`;
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) return resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(result)));
        });
      });
      return p;
  },
  drop: async () => {
    let sql = `
      DROP TABLE clients;`;
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) return resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(result)));
        });
      });
      return p;
  },
  find: async (obj) => {
    if(!obj) {
      let sql = 'select * from clients;'
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) return resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(results)));
        })
      });
      return p;
    } else {
      let sql = `select * from clients where ${
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
  findById: async (id) => {
    let sql = `select * from clients where id = ?;`;
    const p = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return p;
  },
  findByIdAndRemove: async (id) => {
    let sql = `select * from clients where id = ?;`;
    const p = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    if(p.errno) return p;
    sql = `delete from clients where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return p;
  },
  findByIdAndUpdate: async (id, set, args) => {
    const obj = Object.fromEntries(
      Object.entries(
        set['$set']
      ).filter(([key, value]) => value > '' && [key, value])
    );
    let sql = 'update clients set ? where id = ?';
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, [obj, id], function(err, result)  {
        if(err) throw err;
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from clients where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return n;
  },
  save: async () => {
    let sql = 'insert into clients set ?';
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, Schema, function(err, result)  {
        if(err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from clients where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, p.insertId, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return n;
  }
};

module.exports = Client;