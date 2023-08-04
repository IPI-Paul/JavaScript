const GrocObject = {
  getArrays: (arr, obj, _type) => {
  let joinObj = []
    let i = 1
    let arrObj = {}
    let base = {}
    arr[0].map(c => {
      arrObj[c.replace(/'/g, '')] = Object.assign({}, ...arr[i].map(e => {
        const res = e.map(f => {
          if(f[0] == '_type') {
            base['base'] = {}
            base['base'][f[1]] = ['*']
          } else {
            if(f[1] != true && f[1] != false) {
              f[1] = f[1].replace(/\^/g, _type).trim()
            }
            return f
          }
        })
        if(res[0] != undefined) {
          return Object.fromEntries(res)
        }
      }))
      i++
    })
    joinObj.push(arrObj)
    let objFrame = {}
    joinObj.map(o => {
      Object.keys(o).map((k, idx) => {
        const newObj = {}
        Object.values(o[k]).map((v, idx) => {
          if(v != true && v != false) {
            let val = obj[_type][`${v.replace(`${_type}.`, '')}`]
            if(val !== undefined) {
              newObj[Object.keys(o[k])[idx]] = val
            }
          }
        })
        if(Object.keys(newObj).length > 0) {
          objFrame[k] = {...base, where: {...o[k], ...newObj}, joins: undefined, results: undefined}
        }
      })
    })
    return { objFrame }
  },
  getBase: (query, params, arr, criteria, _type) => {
    let base = {}
    let fields = query.match(/{(.*)/gis)[0]
    let joins = query.match(/([a-z]+).*->+/gi)?.map(d => d.replace(' ->', ''))
    if(joins) {
      let i = 0
      joins = joins.map(d => {
        const repReg = new RegExp(`->|\{|\}|\n`, 'g')
        const obj = {}
        const matched = query.match(/ -> ({.*[a-z|\s\S}]+?})/gi)[i]
        obj[`${d}`] = matched.replace(repReg, '').split(',').map(e => `${e.trim()}`)
        fields = fields.replace(d + matched + ',\n    ', '')
        if(arr) {
          query.match(/\: \*\[[\s\S]+(.*)*\]/)[0].split(',').map((e, idx) => {
            if(idx == 0) {
              fields = fields.split(arr[0][idx] + e + ',').join('')
            } else {
              fields = fields.split(arr[0][idx] + e.match(/\: \*\[[\s\S]+(.*)*\]/)[0] + ',').join('')
            }
          })
        }
        i++
        return obj
      })
    } 
    fields = fields.replace(/\n/g, '').replace(/  |{|}/g, '').replace(/,,/g, ',').split(',')
    base[_type] = fields
    let where = {}
    if(params){
      Object.keys(params).map(k => {
        if(Object.keys(criteria).includes(k)) {
          where[`${_type}.${k}`] = params[k]
        }
      })
    }
    return { base, fields, joins, where }
  },
  getInsert: (obj) => {
    let newObject
    const baseObj = Object.entries(obj).filter(([k, v]) => {
      if(typeof(v) == 'object') {
        newObject = Object.entries(v).filter(([f, r]) => r != 'reference')
        newObject = newObject.map(([f, r]) => [`${k}${f}`, r])
      } else {
        return typeof(v) != 'object' && k != '_type'
      }
    })
    newObject.map(e => baseObj.push(e))
    newObject = Object.fromEntries(baseObj)
    return (
      {
        table: Object.entries(obj).find(([k, v]) => {
        if(k == '_type') return v
      })[1], 
        obj: {...newObject, slug: newObject.name.replace(/\s/g, '-').toLowerCase()}
      }
    )
  },
  getQueries: (query) => {
    const queries = query.match(/\[(.*)\]/)[0].split(' && ').map(e => e.replace(/"/g, '').match(/[_a-z|a-z]* =+ [a-z| $a-z]*/i)[0].split(' == '))
    let arr
    if(query.match(/\: \*\[[\s\S]+(.*)*\]/)) {
      arr = []
      query.match(/\: \*\[[\s\S]+(.*)*\]/)[0].split(',').map((e, idx) => {
        if(idx == 0) {
          arr.push(e)
        } else {
          arr.push(e.match(/\: \*\[[\s\S]+(.*)*\]/)[0])
        }
      })
      arr = arr.map(d => d.split(' && ').map(e => e.replace(/"/g, '').match(/[a-z._a-a|_a-z|a-z]* =+ [\^._a-z|a-z| $a-z]*/gi).map(f => {
        return f.split(' == ').map(v => {
          if(v == 'true') return true
          if(v == 'false') return false
          return v
        })
      })))
      arr.splice(0, 0, query.match(/('[a-z|a-z\sa-z]*'):/gi).map(e => e.replace(/:/g, '')))
    }
    const { _type } = Object.fromEntries(queries.slice(0, 1))
    const criteria = Object.fromEntries(queries.slice(1))
    let results = query.match(/\[([0-9])\]/)
    if(results) {
      results = results[1]
    }
    return {queries, arr, _type, criteria, results}
  },
  skip: (params) => (
    Object.entries(params).map(([k, v]) => k == 'slug' && v.match(/.*(\.[svg|png|jpg|gif|bmp|ico]+)/gi) != null).includes(false)
  )
}

const GrocSQL = {
  getSQL: (obj) => {
    const base = Object.keys(obj[0])[0]
    const baseFields = Object.values(obj[0]).map(values => values.map(
      value => `${base}.${value}`
    ))
    const joinFields = obj.length > 1 && obj[1]
      ? ', ' + obj[1].map(arr => 
        Object.values(arr).map(values => values.map(
          value => `${Object.keys(arr)}.${value} as \`${Object.keys(arr)}.${value}\``
        ))
      ).join(', ')
      : ''
    let sql = `select ${baseFields}${joinFields} from ${base} `
    let joins = obj.length > 1 && obj[1]
      ? obj[1].map(arr => {
        const table = Object.keys(arr)
        return `left outer join ${table} on ${table}._id = ${base}.${table}_id`
      }).join(' ')
      : ''
    sql += joins
    let where = obj.length > 1 && obj[2] &&
      Object.entries(obj[2]).map(([key, value]) => 
          key === '_id' || key.search('_ref') > 0
          ? key + " = " + value 
          : (
            key === 'slug'
            ? key + " = '" + value + "'"
            : key + (
              typeof(value) === 'boolean' 
              ? ' = ' + value
              : " like '%" + value + "%'")
          )
        )
    where = where.length > 0 ? ` where ${where}`.split(',').join(' and ') : ''
    sql += where
    return sql
  }
}

module.exports = {
  GrocObject,
  GrocSQL
}