import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const GET_CLIENTS = gql`
query SearchClients($id: ID!)
  {
    clientSearch(id: $id) {
      id
      name
      email
      phone
    }
  }
`

const EffectTutorial = () => {
    const [client, setClient] = useState('')
    const [count, setCount] = useState(1)
    const [getClients, { loading, error, called, data }] = useLazyQuery(GET_CLIENTS, {
      variables: {
        id: count
      }
    })

  useEffect(() => {
    getClients()
    if(called && !loading && !error && data) {
      setClient(data.clientSearch[0])
    }
  }, [data])
  

  return (
    <div>
      Hello World 
      <h1>{client && client.email}</h1>
      <h1>{count}</h1>
      <div>
        <button onClick={() => {
          setCount(prev => prev - 1)
        }}>
          Previous
        </button>
        <button onClick={() => {
          setCount(prev => prev + 1)
        }}>
          Next
        </button>
      </div>
    </div>
  )
}

export default EffectTutorial