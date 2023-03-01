import { useEffect } from 'react';
import { useState } from 'react';
import { Items } from '../../interfaces/Items';
import '../04tut/App.css';
import Content from '../08tut/Content';
import Footer from '../08tut/Footer';
import Header from '../08tut/Header';
import AddItem from '../09tut/AddItem';
import SearchItem from '../09tut/SearchItem';

function Tut11() {  
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('shoppinglist')) || Items
  )
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('shoppinglist', JSON.stringify(items))
  }, [items])

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
        <Content 
          items={items.filter(item => (
              (item.item).toLowerCase()
            ).includes(search.toLowerCase())
          )}
          setItems={setItems}
          handleCheck={handleCheck} 
          handleDelete={handleDelete}
        />
        <Footer length={items.length} />
      </div>
  );
}

export default Tut11;
