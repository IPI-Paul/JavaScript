import { useEffect, useState } from 'react';
import '../04tut/App.css';
import Content from './Content';
import Footer from '../08tut/Footer';
import Header from '../08tut/Header';
import AddItem from '../09tut/AddItem';
import SearchItem from '../09tut/SearchItem';

function Tut13() {  
  const API_URL = 'http://localhost:3500/items'
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if(!response.ok) throw Error('Did not receive expected data')
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch (error) {
        setFetchError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      fetchItems()
    }, 2000)
  }, [])

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = { id, checked: false, item}
    const listItems = [...items, myNewItem]
    setItems(listItems)
  }

  const handleCheck = (id) => {
    const listItems = items.map(item => item.id === id 
      ? { ...item, checked: !item.checked}
      : item
    )
    setItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter(item => item.id !== id)
    setItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!newItem) return
    addItem(newItem)
    setNewItem('')
  }

  return (
      <div className="Tut">
        <Header title='Grocery List' />
        <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}
        />
        <SearchItem
          search={search}
          setSearch={setSearch}
        />
        <main>
          {isLoading && <p className='p-5'>Loading Items...</p>}
          {fetchError && 
            <p 
              style={{ color: 'red'}}
              className='p-5'
            >{`Error: ${fetchError}`}</p>
          }
          {!fetchError && !isLoading &&
            <Content 
              items={items.filter(item => (
                  (item.item).toLowerCase()
                ).includes(search.toLowerCase())
              )}
              setItems={setItems}
              handleCheck={handleCheck} 
              handleDelete={handleDelete}
            />
          }
        </main>
        <Footer length={items.length} />
      </div>
  );
}

export default Tut13;