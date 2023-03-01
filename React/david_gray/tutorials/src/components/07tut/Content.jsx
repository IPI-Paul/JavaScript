import { useState } from "react"
import { FaTrashAlt } from 'react-icons/fa'
import { Items } from "../../interfaces/Items"

const Content = () => {
  const [items, setItems] = useState(Items)

  const handleCheck = (id) => {
    const listItems = items.map(item => item.id === id 
      ? { ...item, checked: !item.checked}
      : item
    )
    setItems(listItems)
    localStorage.setItem('shoppinglist', JSON.stringify(listItems))
  }

  const handleDelete = (id) => {
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)
    localStorage.setItem('shoppinglist', JSON.stringify(listItems))
  }

  return (
    <main>
      {items.length > 0 ? (
        <ul>
          {items.map((item, idx) => (
            <li className="item" key={idx}>
              <input 
                type="checkbox" 
                onChange={() => handleCheck(item.id)}
                checked={item.checked}
              />
              <label
                style={item.checked ? {textDecoration: 'line-through'} : null}
                onDoubleClick={() => handleCheck(item.id)}
              >{item.item}</label>
              <FaTrashAlt 
                onClick={() => handleDelete(item.id)}
                role='button' 
                tabIndex={0}
              />
            </li>
          ))}
        </ul>
        ) : (
          <p style={{marginTop: '2rem'}}>Your list is empty</p>
        )
      }
    </main>
  )
}

export default Content