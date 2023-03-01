const { conn } = require('../config/db');
const db = conn;
let Schema;

const meetupSchema = {
  title: { type: String}, 
  image: { type: String}, 
  address: { type: String}, 
  description: { type: String}
};

const Meetup = {
  addMeetup: function add(args) {
    const State = {
      set current(args) {
        this.Schema = {...this.Schema, ...args}
      },
      Schema: meetupSchema 
    }
    return ((args) => {
      State.current = {...args};
      Schema = State.Schema;
      return Schema;
    })(args)
  },
  create: async () => {
    let sql = `
      CREATE TABLE meetups(
        id int not null auto_increment,
        title varchar(100),
        image varchar(255),
        address varchar(400),
        description varchar(400)
        ,created_at timestamp default now()
        ,primary key (id)
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
      DROP TABLE meetups;`;
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
      let sql = 'select * from meetups;'
      const p = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) return resolve(JSON.parse(JSON.stringify(err)));
          resolve(JSON.parse(JSON.stringify(results)));
        })
      });
      return p;
    } else {
      let sql = `select * from meetups where ${
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
    let sql = `select * from meetups where id = ?;`;
    const p = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return p;
  },
  findByIdAndRemove: async (id) => {
    let sql = `select * from meetups where id = ?;`;
    const p = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    if(p.errno) return p;
    sql = `delete from meetups where id = ?;`;
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
    let sql = 'update meetups set ? where id = ?';
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, [obj, id], function(err, result)  {
        if(err) throw err;
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from meetups where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, id, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return n;
  },
  save: async () => {
    let sql = 'insert into meetups set ?';
    const p = await new Promise((resolve, reject) => {
      conn.query(sql, Schema, function(err, result)  {
        if(err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result);
      });
    });
    if(p.errno) return p;
    sql = `select * from meetups where id = ?;`;
    n = await new Promise((resolve, reject) => {
      db.query(sql, p.insertId, (err, result) => {
        if (err) return resolve(JSON.parse(JSON.stringify(err)));
        resolve(result[0]);
      })
    });
    return n;
  }
};

module.exports = Meetup;