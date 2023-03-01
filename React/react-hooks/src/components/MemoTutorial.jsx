import React, { useEffect, useMemo, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const GET_CLIENTS = gql`
  query getClients($name: String!) {
    clientSearch(name: $name) {
      name
    }
  }
`

const MemoTutorial = () => {
  const [name, setName] = useState(null)
  const [clients, setClients] = useState(null)
  const [toggle, setToggle] = useState(false)
  const [getClients, {loading, error, called, data}] = useLazyQuery(GET_CLIENTS, {
    variables: {
      name
    }
  })

  useEffect(() => {
    getClients()
    if(data && called && !error && !loading) {
      setClients(data.clientSearch)
    }
  }, [data])

  const findLongestName = (comments) => {
    if(!comments) return null

    let longestName = ""
    for(let i = 0; i < comments.length; i++) {
      let currentName = comments[i].name
      if(currentName.length > longestName.length) {
        longestName = currentName
      }
    }

    console.log('This was computed')

    return longestName
  }

  const getLongestName = useMemo(() => findLongestName(clients), [clients])

  return (
    <div className='p-2 d-flex flex-column'>
      <div className='m-3'>{getLongestName}</div>
      <div className='mb-3'>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="rounded-2" />
      </div>
      <div>
        <button
          onClick={() => {
            setToggle(prev => !prev)
          }}
          className='rounded-3 bg-primary text-white'
        >
          Toggle
        </button>
      </div>
      {toggle && <h1> toggle </h1>}
    </div>
  )
}

export default MemoTutorial