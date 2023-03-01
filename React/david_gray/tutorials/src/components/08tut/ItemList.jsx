import LineItem from "./LineItem"

const ItemList = ({items, handleCheck, handleDelete}) => {
  return (
    <ul>
      {items.map((item, idx) => (
        <LineItem
          key={idx}
          item={item} 
          handleCheck={handleCheck} 
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  )
}

export default ItemList