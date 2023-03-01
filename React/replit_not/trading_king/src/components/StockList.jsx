import { useEffect, useState, useContext} from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import finnHub from '../apis/finnHub'
import { WatchListContext } from '../context/WatchListContext'

const StockList = () => {
  const [stock, setStock] = useState()
  const {watchList, deleteStock} = useContext(WatchListContext)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/quote', {
          params: {
            Symbol: watchList
          }
        })
        console.log(response.data)
        if(isMounted) {
          setStock(response.data)
        }
      } catch (err) {}
    }
    fetchData()

    return () => (isMounted = false)
  }, [watchList])

  const changeColor = (change) => (
    change > 0 
      ? 'success'
      : 'danger'
  )

  const renderIcon = (change) => (
    change > 0 
      ? <BsFillCaretUpFill />
      : <BsFillCaretDownFill />
  )

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`)
  }
  
  return (
    <table className="table hover mt-5">
      <thead style={{color: 'rgb(79, 89, 102'}}>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Price/Earnings</th>
          <th scope='col'>Chg</th>
          <th scope='col'>Chg%</th>
          <th scope='col'>High</th>
          <th scope='col'>Low</th>
          {/* <th scope='col'>Open</th> */}
          <th scope='col'>Pclose</th>
        </tr>
      </thead>
      <tbody>
        {stock && 
          stock.map(stockData => {
            return (
              <tr 
                className="table-row" 
                key={stockData.Symbol}
                onClick={() => handleStockSelect(stockData.Symbol)} 
                style={{cursor: 'pointer'}}
              >
                <th scope='row'>{stockData.Symbol}</th>
                <td>{stockData['Price/Earnings']}</td>
                <td
                  className={`text-${changeColor(
                    stockData['Price/Sales'] - stockData['Price/Book']
                    )}`
                  }
                >
                  {
                    parseFloat(
                      Math.round(stockData['Price/Sales'], 2) - stockData['Price/Book']
                    ).toFixed(2)
                  } 
                  {renderIcon(stockData['Price/Sales'] - stockData['Price/Book'])}
                </td>
                <td
                  className={`text-${changeColor(
                    (stockData['Price/Sales'] - stockData['Price/Book']) / 
                    stockData['Price/Book']
                    )}`
                  }
                >
                  {
                    parseFloat(((stockData['Price/Sales'] - stockData['Price/Book']) / 
                    stockData['Price/Book']) * 100).toFixed(4)
                  } 
                  {
                    renderIcon(
                      (stockData['Price/Sales'] - stockData['Price/Book']) / 
                      stockData['Price/Book']
                    )
                  }
                </td>
                <td>{stockData['52 Week High']}</td>
                <td>{stockData['52 Week Low']}</td>
                {/* <td>{stockData.o}</td> */}
                <td>{stockData.Price}</td>
                <button 
                  className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteStock(stockData.Symbol)
                  }}
                >Remove</button>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default StockList