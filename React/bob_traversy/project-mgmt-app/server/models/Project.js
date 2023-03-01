const { conn } = require('../config/db');
const db = conn;
let Schema;

const ProjectSchema = {
  name: { type: String}, 
  description: { type: String}, 
  status: { 
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed']
  },
  clientId: {
    type: Number
  }
};

const Project = {
  addProject: function add(args) {
    const State = {
      set current(args) {
        this.Schema = {...this.Schema, ...args}
      },
      Schema: ProjectSchema 
    }
    return ((args) => {
      State.current = {...args};
      Schema = State.Schema;
      return Schema;
    })(args)
  },
  create: async () => {
    let sql = `     
      CREATE TABLE projects(
      id int auto_increment primary key
      ,name varchar(100)
      ,description varchar(255)
      ,status enum('Not Started', 'In Progress', 'Completed')
      ,clientId int
      ,foreign key (clientId)
        references clients (id)
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
      DROP TABLE projects;`;
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) return resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(result)));
        });
      });
      return p;
  },
  find: async (obj) => {
    if(obj) {
      let sql = `select * from projects where ?;`
      const p = await new Promise((resolve, reject) => {
        db.query(sql, obj, (err, result) => {
          if (err) resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(result)));
        });
      });
      return p.map(e => ({...e, remove: () => Project.remove(e)}));
    } else {
      let sql = 'select * from projects;'
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) throw resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(results)));
        });
      });
      return p;
    }
  }, 
  findById: async (id) => {
    let sql = `select * from projects where id = ?;`
    const p = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) throw resolve(JSON.parse(JSON.stringify(err)));
        resolve(JSON.parse(JSON.stringify(result[0])));
      });
    });
    return p;
  },
  findByIdAndRemove: async (id) => {
    let sql = `select * from projects where id = ?;`;
    const p = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      });
    });
    if(p.errno) return p;
    sql = `delete from projects where id = ?;`;
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
    let sql = 'update projects set ? where id = ?';
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, [obj, id], function(err, result)  {
        if(err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from projects where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return n;
  },
  remove: async (obj) => {
    let sql = `delete from projects where id = ?;`;
    const p = await new Promise((resolve, reject) => {
      db.query(sql, obj.id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return p;
  },
  save: async () => {
    let sql = 'insert into projects set ?';
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, Schema, function(err, result)  {
        if(err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from projects where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, p.insertId, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return n;
  },
  schema: {}
};

module.exports = Project;