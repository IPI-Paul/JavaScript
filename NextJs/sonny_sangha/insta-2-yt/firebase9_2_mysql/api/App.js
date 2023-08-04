const App = () => {
  const headersList = {
    "Content-Type": "application/json"
  }

  const addDoc = async ({ url, joinOn, joinTo, table }, obj) => {
    if (joinTo) {
      return (
        (
          await fetch(url, {
            method: 'POST',
            body: JSON.stringify(
              {
                func: 'Add',
                data: {...(Object.fromEntries([[`${table}_${Object.keys(joinOn)[0]}`, Object.values(joinOn)[0]]])), ...obj},
                table: joinTo
              }
              ),
            headers: headersList
          })
        ).json()
      )
    }
    return (
      (
        await fetch(url, {
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
    )
  }
  
  const close = () => (
    console.log('Nothing to do')
  )
  
  const collection = (table, joinOn, joinTo) => {
    if (joinOn) {      
      return ({
        table,
        joinOn,
        joinTo,
        url: `http://localhost:5000/${joinTo}`
      })
    }
    return ({ url: `http://localhost:5000/${table}` })
  }

  const deleteDoc = (obj) => {
    const setData = async () => {
      const { url, joinOn, joinTo, table, joinId } = obj
      const newObj = {}
      newObj[`${table}_${Object.keys(joinOn)[0]}`] = Object.values(joinOn)[0]
      newObj[Object.keys(joinId)[0]] = Object.values(joinId)[0]
      await fetch(url, 
        {
          method: 'POST',
          body: JSON.stringify(
            {
              func: 'Delete',
              data: {...newObj}, 
              table: joinTo
            }
          ),
          headers: headersList
        }
      )
    }
    setData()
  }

  const doc = function(table, joinOn, joinTo, joinId) {
    return ({
      table,
      joinOn,
      joinTo,
      joinId,
      url: `http://localhost:5000/${joinTo}`
    })
  }
  
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
  
  const orderBy = (field, order) => ({
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
  
  const query = (collection, orderBy) => {
    const { url, joinOn, joinTo, table } = collection
    if (joinTo) {
      const { body } = orderBy
      let newBody = JSON.parse(body)
      Object.entries(newBody).map(([k, v]) => {
        if(k === 'orderBy') {
          newBody = {...newBody, orderBy: {...newBody[k], ...(Object.fromEntries([[`${table}_${Object.keys(joinOn)[0]}`, Object.values(joinOn)[0]]]))}, table: joinTo}
        }
      })
      return (
        {
          url,
          orderBy: {...orderBy, body: JSON.stringify(newBody)}
        }
      )
    }
    return ({url, orderBy})
  }
  
  const onSnapshot = (obj, func) => {
    const getData = async () => {
      const { url , orderBy } = obj
      return await (await fetch(url, orderBy)).json().then(dta => {
        func({docs: dta})
      }) 
    }
    getData()
  }

  const setDoc = (obj, fld) => {
    const setData = async () => {
      const { url, joinOn, joinTo, table, joinId } = obj
      const newObj = {}
      newObj[`${table}_${Object.keys(joinOn)[0]}`] = Object.values(joinOn)[0]
      newObj[Object.keys(joinId)[0]] = Object.values(joinId)[0]
      return await fetch(url, 
        {
          method: 'POST',
          body: JSON.stringify(
            {
              func: 'Add',
              data: { ...newObj, ...fld }, 
              table: joinTo
            }
          ),
          headers: headersList
        }
      )
    }
    setData()
  }

  const timeFrom = (dt) => {
    const dateinteger = dt - 0
    const minute = 60000
    const second = minute / 60
    const hour = minute * 60
    const day = hour * 24
    const week = day * 7
    const ago = new Date() - dt 
    if(ago < minute) {
      return 'Less than a minute ago'
    } else if(ago < hour) {
      const ret = Math.round(ago / minute, 0)
      return `${ret} minute${ret > 1 && 's'} ago`
    } else if(ago < day) {
      const ret = Math.round(ago / hour, 0)
      return `${ret} hour${ret > 1 && 's'} ago`
    } else if(ago < week) {
      const ret = Math.round(ago / day, 0)
      return `${ret} day${ret > 1 && 's'} ago`
    } else if(ago >= week && dt.getMonth() == new Date().getMonth()) {
      const ret = Math.round(ago / week, 0)
      return `${ret} week${ret > 1 && 's'} ago`
    } else if(dt.getMonth() < new Date().getMonth() && new Date().getMonth() - dt.getMonth() < 12) {
      const ret = new Date().getMonth() - dt.getMonth()
      return `${ret} month${ret > 1 && 's'} ago`
    } else {
      const ret = new Date().getFullYear() - dt.getFullYear()
      return `${ret} year${ret > 1 && 's'} ago`
    }
  }
  
  const updateDoc = async ({ url }, id, obj) => (
    (
      await fetch(url, {
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

  const validateLogin = async(table, email, password) => (
    (
      await fetch(`http://localhost:5000/${table}`, {
        method: 'POST',
        body: JSON.stringify(
          {
            func: 'Validate',
            table,
            email,
            password
          }
        ),
        headers: headersList
      })
    ).json()

  )

  return (
    {    
      db: () => (
        {
          addDoc,
          close,
          collection,
          deleteDoc,
          doc,
          findData,
          orderBy,
          query,
          onSnapshot,
          setDoc,
          timeFrom,
          updateDoc,
          validateLogin
        }
      )
    }
  )
}

export default App