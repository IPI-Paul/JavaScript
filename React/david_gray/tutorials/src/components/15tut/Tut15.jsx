import { useEffect } from "react"
import { useState } from "react"
import Form from "./Form"
import './index.css'
// import List from "./List"
import Table from "./Table"

const Tut15 = () => {
  const API_URL = 'http://localhost:8080/SourceFiles/json/jsonplaceholder-'
  const [reqType, setReqType] = useState('users')
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}${reqType}.json`)
        const data = await response.json()
        console.log(reqType, data[reqType])
        setItems(data[reqType])
      } catch (error) {
        console.log(error)
      }
    }
    fetchItems()
  }, [reqType])

  return (
    <div className="Tut15">
      <Form reqType={reqType} setReqType={setReqType} />
      {/* <List items={items} /> */}
      <Table items={items} />
    </div>
  )
}

export default Tut15