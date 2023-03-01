import { useState } from 'react';
import { Items } from '../../interfaces/Items';
import '../04tut/App.css';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

function Tut08() {  
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
      <div className="Tut">
        <Header title='Grocery List' />
        <Content 
          items={items}
          setItems={setItems}
          handleCheck={handleCheck} 
          handleDelete={handleDelete}
        />
        <Footer length={items.length} />
      </div>
  );
}

export default Tut08;
