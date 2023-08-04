const headersList = {
  "Content-Type": "application/json"
 }
 
const App = () => (
  {
    close: () => (
      console.log('Nothing to do')
    ),
    db: () => (
      {
        collection: (table) => {
          const findData = async (sch, res) => {
            let body
            if(sch && Object.keys(sch).length > 0) {
              body = JSON.stringify(
                {
                  func: 'Find',
                  search: sch
                }
              )
            } else {
              body = JSON.stringify(
                {
                  func: 'Find'
                }
              )
            }
            const data = await (
              await fetch(`http://localhost:5000/${table}`, {
                method: 'POST',
                body: body,
                headers: headersList
              })
            ).json()
            if(res) {
              let keys = [] 
              Object.keys(data[0]).map(key => Object.keys(res).includes(key) && keys.push(key))
              return data.map(d => Object.fromEntries(keys.map(key => [key, d[key]])))
            } else {
              return data
            }
          }
          return (
            {
              add: async (obj) => (
                (
                  await fetch(`http://localhost:5000/${table}`, {
                    method: 'POST',
                    body: JSON.stringify(
                      {
                        func: 'Add',
                        data: obj
                      }
                      ),
                    headers: headersList
                  })
                ).json()
              ),
              find: findData,
              orderBy: async (field, order) => (
                (
                  await fetch(`http://localhost:5000/${table}`, {
                    method: 'POST',
                    body: JSON.stringify(
                      {
                        func: 'Find',
                        orderBy: {
                          field: field,
                          order: order
                        }
                      }
                      ),
                    headers: headersList
                  })
                ).json()
              ),
              update: async (id, obj) => (
                (
                  await fetch(`http://localhost:5000/${table}`, {
                    method: 'POST',
                    body: JSON.stringify(
                      {
                        func: 'Update',
                        id: id,
                        set: obj
                      }
                      ),
                    headers: headersList
                  })
                ).json()
              )
            }          
          )
        }
      }
    )
  }
)

export default App