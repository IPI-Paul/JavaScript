import React, { useState } from "react"
import { useEffect } from "react"
import { render } from 'react-dom'
import MyLogin from '../views/MyLogin'

const copyStyles = (sourceDoc, targetDoc) => {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) { // true for inline styles
      const newStyleEl = targetDoc.createElement('style')

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        newStyleEl.appendChild(targetDoc.createTextNode(cssRule.cssText))
      })

      targetDoc.head.appendChild(newStyleEl)
    } else if (styleSheet.href) { // true for stylesheets loaded from a URL
      const newLinkEl = targetDoc.createElement('link')

      newLinkEl.rel = 'stylesheet'
      newLinkEl.href = styleSheet.href
      targetDoc.head.appendChild(newLinkEl)
    }
  })
}

function Hook() {
  const State = {
    set current(state) {
      if(this.states.find(d => d.obj === state.obj) === undefined) {
        this.states.push({obj: state.obj, state: state.state})
      } else {
        this.states.find(d => d.obj === state.obj).state = state.state
      }
    },
    states: []
  }
  
  return (initialState) => {
    if(State.states.find(d => d.obj === initialState.obj) === undefined) {
      State.current = {obj: initialState.obj, state: initialState.state}
    }
    return ([ 
      (obj) => State?.states?.find(d => d.obj === obj)?.state,
    (newState) => State.current = {obj: newState.obj, state: newState.state}
  ])}
}
const useMyState = new Hook()
const [myState, setMyState] = useMyState({obj: 'collection', state: 0})

let idx = 0

function MyAppDocs() {
  const [docs, setDocs] = useState()

  useEffect(() => {}, [myState, docs])

  return [docs, setDocs]
}

function MyAppState(val) {
  const [state, setState] = useState(val)

  useEffect(() => {
    const uid = localStorage.getItem('whatsAppUsers')
    if(!uid) {
      setMyState({obj: 'status', state: null})
      setState()
    }
    if (!myState('user') || !myState('user')?.email) {
      setMyState({obj: 'status', state: 'loading'})
    } else {
      setMyState({obj: 'status', state: null})
    }
  }, [myState('status'), state])
  return [state, setState]
}

function MyAppUser(auth, collection) {
  const [user, setUser] = useState(auth.user)
  useEffect(() => {
    const uid = localStorage.getItem('whatsAppUsers')
    const getUsers = async () => {
      if(!uid) {
        setUser(null)
        setMyState({obj: 'status', state: null})
        return
      }
      const response = await collection('whatsAppLogin')
        .doc(uid).set({}, {merge: false})
      if(response) {
        auth.user = await response[0]
        setMyState({obj: 'user', state: await auth.user})
        setMyState({obj: 'status', state: null})
          setUser(await myState('user'))
      } 
    }
    if (idx == 0) {
      getUsers()
      idx++
    } else {
      setMyState({obj: 'status', state: null})
      idx = 0
    }
  }, [myState('user')?.id])
  return [user, setUser]
}

class MyWindowPortal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.containerEl = null;
    this.externalWindow = null;
  }

  componentDidMount() {
    this.externalWindow = window.open('', '', `width=900,height=600,left=${window.screenX + (window.outerWidth / 4)},top=${window.screenY}`);
    this.containerEl = this.externalWindow.document.createElement('div');
    this.externalWindow.document.body.appendChild(this.containerEl);
    this.externalWindow.document.title = `Login With ${this.props.provider}`;
    copyStyles(document, this.externalWindow.document);
    render(this.props.children, this.containerEl);
    this.externalWindow.addEventListener('beforeunload', () => {
      document.getElementById('__next').removeChild(document.getElementById('root'))
      // document.location.reload()
    });
  }

  componentWillUnmount() {
    // Run a close window function
  }
  
  render() {
    if (!this.containerEl) {
      return null;
    }   
    return render(this.props.children, this.containerEl); 
  }
}

const App = () => {
  const maxIteration = 4
  let appInput
  let setThisUser
  let setThisState
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
              data: obj,
              table: table
            }
            ),
          headers: headersList
        })
      ).json()
    )
  }

  const auth = {
    docs: () => myState('collection'),
    signInWithPopup: (provider) => (
      {
        catch: (alert) => {
          if(provider == 'Credentials') {
            const el = document.createElement('div')
            el.id = 'root'
            document.getElementById('__next').appendChild(el)
            render(<MyWindowPortal provider={provider}><MyLogin /></MyWindowPortal>, document.getElementById('root'))
          } else {
            alert('Sorry No Google Here!')
          }
        }
      }
    ),
    signOut: async () => {
      const uTable = 'whatsAppUsers'
      const stats = await deleteDoc({url: `http://localhost:5000/${uTable}`, table: uTable, ...myState('user')})
      if(stats?.status == 200) {
        localStorage.removeItem(uTable)
        auth.user = null
        setMyState({obj: 'user', state: null})
        document.location.href = 'http://localhost:3000'
      }
    },
    user: null
  }
  
  const close = () => (
    console.log('Nothing to do')
  )
  
  const collection = (table, joinOn, joinTo) => {
    let uid
    let obj = () => {
      if (joinOn) {      
        return ({
          table,
          joinOn,
          joinTo,
          url: `http://localhost:5000/${joinTo}`
        })
      }
      return { url: `http://localhost:5000/${table}` }
    }
    obj.add = async (input, setDocs) => {
      let column
      let filter
      Object.entries(input).map(([k, v]) => {
        input[k] = v.join(',')
        column = k
        filter = v[0]
        return input
      })
      await addDoc({url: obj().url, table: table}, input)
      appInput = await collection(table).where(column, '', filter)
      const data = myState(JSON.stringify(appInput))
      if (data?.docs) {
        const addDocs = {table: table, column: column, input: filter, users: []}
        await data.docs.map(doc => addDocs.users.push(doc.users.split(',')))
        setMyState({obj: JSON.stringify(appInput), state: {...addDocs, docs: {id: doc.id, data: () => ({users: addDocs.users})}}})
        setThisState('loading')
      }
      setDocs({docs: await data.docs.map(doc => ({id: doc.id, data: () => ({...doc, users: doc.users.split(',')})}))})
      return {docs: await data.docs.map(doc => ({id: doc.id, data: () => ({...doc, users: doc.users.split(',')})}))}
    }
    obj.doc = (uid) => {
      let obj1 = obj.doc
      obj1.uid = uid
      obj1.table = table
      obj1.obj = {table: table, column: 'id', input: uid}
      return obj1
    }
    obj.doc.collection = (table) => {
      let obj1 = obj.doc.collection
      obj1.obj = {table: table, column: 'id', input: obj.doc.uid}
      obj1.table = table
      return obj1
    }
    obj.doc.collection.add = async (nobj) => {
      let data = await findData({}, obj.doc.collection.table, undefined, 'Show')
      const column = await data.filter(tbl => tbl.Field === `${obj.doc.table}_id`)
      const keys = await data.map(tbl => tbl.Field)
      Object.keys(nobj).map(k => {
        if(!keys.includes(k)) delete nobj[k]
      })
      if(column.length !== 0) {
        nobj[`${obj.doc.table}_id`] = obj.doc.uid
      } 
      const coll = {}
      coll[`${obj.doc.obj.table}_id`] = myState(JSON.stringify(obj.doc.obj)).id
      if(myState(JSON.stringify(obj.doc.obj))?.users.length > 0) {
        coll['user'] = myState(JSON.stringify(obj.doc.obj)).users[0]
        coll['users'] = myState(JSON.stringify(obj.doc.obj)).users
      }
      const response = await addDoc({url: obj().url, table: obj.doc.collection.table}, {...nobj, uid: myState('user').uid})
      setMyState({
        obj: JSON.stringify(obj.doc.collection.obj),
        state: {docs: [{
          id: response.id, 
          data: () => {
            if (response?.timestamp) {
              response.timestamp = new Date(response.timestamp)
              response.timestamp.toDate = () => (response.timestamp)
            }
            return {...response, ...coll}
          }
        }]}
      })
      return myState(JSON.stringify(obj.doc.collection.obj))
    }
    obj.doc.collection.orderBy = (field, order) => {
      let obj1 = obj.doc.collection.orderBy
      obj1.orderBy = Object.fromEntries([[field, order]])
      obj1.obj = obj.doc.collection.obj
      return obj1
    }
    obj.doc.collection.orderBy.get = async () => {
      if (idx < maxIteration) {
        let nobj = {uid: obj.doc.uid}
        let data = await findData({}, obj.doc.collection.table, undefined, 'Show')
        const column = await data.filter(tbl => tbl.Field === `${obj.doc.table}_id`)
        if(column.length !== 0) {
          nobj = Object.fromEntries([[`${obj.doc.table}_id`, obj.doc.uid]])
        } 
        let users = []
        if (myState(JSON.stringify(obj.doc.obj))) {
          users = myState(JSON.stringify(obj.doc.obj)).users
        } 
        if (users.length == 0) {
          await obj.doc.get()
          users = await myState(JSON.stringify(obj.doc.obj))?.users
        }
        data = await fetch(obj().url, 
          {
            method: 'POST',
            body: JSON.stringify(
              {
                func: 'Find',
                search: {...nobj, orderBy: obj.doc.collection.orderBy.orderBy}, 
                table: obj.doc.collection.table
              }
            ),
            headers: headersList
          }
        )
        if (!data) return null
        const response = await data.json()
        appInput = {table: obj.doc.collection.table, column: 'id', input: obj.doc.uid}
        setMyState(
          {obj: JSON.stringify(appInput), 
            state:  {docs: response.map(dta =>  ({
              data: () => {
                dta.timestamp = new Date(dta.timestamp)
                dta.timestamp.toDate = () => (
                  dta.timestamp
                )
                return {...dta, timestamp: dta.timestamp, user: users[0], users}
              }, 
              id: dta.id,
              obj: appInput
            }))
          }
        })
        idx++
      } else {
        idx = 0
      }
      return myState(JSON.stringify(appInput))
    }
    obj.doc.get = async () => {
      if (idx < maxIteration) {
        let data = await fetch(obj().url, 
          {
            method: 'POST',
            body: JSON.stringify(
              {
                func: 'Find',
                search: {id: obj.doc.uid}, 
                table: table
              }
            ),
            headers: headersList
          }
        )
        if (!data) return null
        const response = await data.json()
        setMyState({
          obj: JSON.stringify(obj.doc.obj), state: response.map(data =>  ({
          data: () => ({...data, users: data?.users ? data.users.split(',') : []}), 
          id: data.id,
          users: data?.users ? data.users.split(',') : []
          }))[0]
        })
        idx++
      } else {
        idx = 0
      }
      return myState(JSON.stringify(obj.doc.obj))
    }
    obj.doc.set = async (nobj, func) => {
      const { merge } = func
      let data
      if(merge) {
        const { lastSeen, timestamp } = nobj
        if (data?.lastSeen) {
          delete nobj['lastSeen']
          data = await updateDoc({ url: obj().url, table, uid: obj.doc.uid, obj: {lastSeen}})
          setMyState({obj: JSON.stringify(obj.doc.obj), state: {docs: await data.json().then(data => {
              data.lastSeen = new Date(lastSeen)
              data.lastSeen.toDate = () => (data.lastSeen)
            return ({...data, ...nobj})
          })}})
        } else {
          delete nobj['timestamp']
          data = await updateDoc({ url: obj().url, table, uid: obj.doc.uid, obj: {timestamp}})
          setMyState({obj: JSON.stringify(obj.doc.obj), state: {docs: await data.json().then(data => {
              data.timestamp = new Date(timestamp)
              data.timestamp.toDate = () => (data.timestamp)
            return ({...data, ...nobj})
          })}})
        }
        return myState(JSON.stringify(obj.doc.obj))
      }
      else {
        data = await findData({uid: obj.doc.uid}, table)
        if (!data) return null
        return data
      }
    }
    obj.where = async (column, func, input) => {
      if (myState('user')) {
        const id = Object.entries(myState('user')).map(([k, v]) => {
          if (k.substring(k.length - 2, k.length) === 'id') {
            return Object.fromEntries([[k, v]])
          }
        })[0]
        let col
        let filter
        Object.entries(id).map(([k, v]) => {
          col = k
          filter = v
        })
        if (column.substring(column.length - 2, column.length) === 'id') {
          appInput = {table: table, column: col, input: filter}
        } else {
          appInput = {table: table, column: column, input: input}
        }
        const search = Object.fromEntries([[column, input]])
        const wObj = await findData(search, table).then(data => (
          data.map(doc => {
            if(Object.keys(doc).includes('timestamp')) {
              const lastSeen = new Date(doc.timestamp)
              lastSeen.toDate = () => (lastSeen)
              return {...doc, lastSeen}
            }
            return doc
          })
        ))
        if (myState(JSON.stringify(appInput))?.length < await wObj?.length) {
          setMyState('loading')
        }
        await setMyState({obj: JSON.stringify(appInput), state: {docs: await wObj}})
        // return {docs: await wObj}
      }
      return appInput
    }
    return obj
  }

  const deleteDoc = async (obj) => {
    const setData = async () => {
      const { url, joinOn, joinTo, table, joinId, uid } = obj
      if (joinOn) {
        const newObj = {}
        newObj[`${table}_${Object.keys(joinOn)[0]}`] = Object.values(joinOn)[0]
        newObj[Object.keys(joinId)[0]] = Object.values(joinId)[0]
        return await fetch(url, 
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
      } else {
        return await fetch(url, 
          {
            method: 'POST',
            body: JSON.stringify(
              {
                func: 'Delete',
                filter: {uid}, 
                table: table
              }
            ),
            headers: headersList
          }
        )
      }
    }
    return setData()
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
  
  const findData = async (sch, table, res, func) => {
    if (!func) func = 'Find'
    let body
    if(sch && Object.keys(sch).length > 0) {
      body = JSON.stringify(
        {
          func: func,
          search: sch,
          table: table
        }
      )
    } else {
      body = JSON.stringify(
        {
          func: func,
          table: table
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

  const getDocs = async (ref, docs, setDocs) => {
    const response = await ref
    if (appInput && response?.docs?.length > 0) {
      setMyState({
        obj: JSON.stringify(appInput), 
        state: {docs:  
          response.docs
          .map((doc, idx) => ({id: doc.id, data: () => ({...response.docs[idx], users: doc?.users ? doc?.users.split(',') : []})}))
        }
      })
      if(!docs) setDocs(myState(JSON.stringify(appInput)))
      return true
    }
    return false
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

  const serverTimeStamp = () => {
    const lDate = new Date().toLocaleDateString('en-GB', { timeZone: 'Europe/London' }).split('/').reverse().join('-')
    const lTime = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London' })
    return `${lDate} ${lTime}`
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
  
  const updateDoc = async ({ url, obj, table, uid }) => (
    (
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(
          {
            func: 'Update',
            uid: uid,
            set: obj,
            table: table
          }
        ),
        headers: headersList
      })
    )
  )

  const useAuthState = (auth) => {
    if (!myState('user')) setMyState({obj: 'user', state: null})
    if (!myState('status')) setMyState({obj: 'status', state: null})
    const [state, setState] = MyAppState('loading')
    const [user, setUser] = MyAppUser(auth, collection)
    setThisUser = setUser
    setThisState = setState
    if (myState('user') && state === 'loading') {
      setState(null)
      setMyState({obj: 'status', state: null})
    }
    return [user, state ? state : myState('status')]
  }

  const useCollection = (ref) => {
    const getRef = async () => {
        const data = await ref.get()
        const items = {docs: await data.docs.map(doc => ({
          id: doc.id,
          data: () => ({...doc.data()})
        }))}
        if (idx < maxIteration) {
          setDocs({...items, data: () => items})
          idx++
        } else {
          idx = 0
        }
        return docs
    }
    const [docs, setDocs] = MyAppDocs()
    const getData = async () => {
      if (idx < maxIteration) {
        if (typeof(ref) === 'function') await getRef()
        await getDocs(myState(JSON.stringify(await ref)), docs, setDocs)
        idx++
      } else {
        idx = 0
      }
      return docs
    }
    if (idx < maxIteration) {
      getData()
      idx++
    } else {
      idx = 0
    }
    return [docs, ]
  }

  const validateLogin = async (table, email, password) => {
    const response = await fetch(`http://localhost:5000/${table}`, {
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
    if(response.status == 204) {
      setMyState({obj: 'status', state: null})
      return null
    }
    const data = await response.json()
    const uTable = 'whatsAppUsers'
    await addDoc({url: `http://localhost:5000/${uTable}`, table: uTable}, {uid: data.uid})
    localStorage.setItem(uTable, data.uid)
    auth.user = await data
    setMyState({obj: 'user', state: await data})
    setMyState({obj: 'status', state: null})
    setThisUser(await data)
    return await data
  }

  return (
    {    
      db: () => (
        {
          addDoc,
          auth,
          close,
          collection,
          deleteDoc,
          doc,
          findData,
          orderBy,
          query,
          onSnapshot,
          serverTimeStamp,
          setDoc,
          timeFrom,
          updateDoc,
          useAuthState,
          useCollection,
          validateLogin
        }
      )
    }
  )
}

export default App