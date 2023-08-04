import { GrocObject } from './Groc'

const headersList = {
  "Content-Type": "application/json"
 }
 
const App = () => {
  const findData = async (obj) => {
    const body = JSON.stringify(
      {
        func: 'Find',
        search: obj
      }
    )
    const data = await (
      await fetch(`http://localhost:5000/${Object.keys(obj[0])[0]}`, {
        method: 'POST',
        body: body,
        headers: headersList
      })
    ).json()
    return data
  }
  return (
    {
      close: () => (
        console.log('Nothing to do')
      ),
      db: () => (
        {
          create: async (props) => {
            const { table, obj } = GrocObject.getInsert(props)
            const body = JSON.stringify(
              {
                func: 'Add',
                data: { table, obj }
              }
            )
            return await (
              (
                await fetch(`http://localhost:5000/${table}`, {
                  method: 'POST',
                  body,
                  headers: headersList
                })
              ).json()
            )
          },
          fetch: async (query, params) => {
            let {arr, _type, criteria, results} = GrocObject.getQueries(query)
            let { base, joins, where } = GrocObject.getBase(query, params, arr, criteria, _type)
            const skip = GrocObject.skip
            let obj = {}
            if(arr && skip(params)) {
              obj[_type] = await findData([base, joins, where, results])
              const { objFrame } = GrocObject.getArrays(arr, obj, _type)
              return Promise.all(Object.keys(objFrame).map(async (o) => {
                const { base, joins, where, results } = objFrame[o]
                obj[o] = await findData([base, joins, where, results])
                obj[_type] = { ...obj[_type], ...Object.fromEntries ([[o, obj[o]]]) }
                obj = Object.fromEntries([[_type, obj[_type]]])
                return obj
              })).then(d => {
                return d[0]
              })
            } else if(Object.keys(criteria).length > 0 && skip(params)) {
              obj[_type] = await findData([base, joins, where, results])
              return obj
            } else {
              return await findData([base, joins, where, results])
            }
          }
        }
      )
    }
  )
}
export default App