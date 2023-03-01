import { useEffect, useState } from 'react'
import finnHub from '../apis/finnHub'

const StockData = ({symbol}) => {
  const [stockData, setStockData] = useState()
  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/quote', {
          params: {
            Symbol: symbol
          }
        })
        if(isMounted) {
          setStockData(response.data[0])
        }
      } catch (error) {
        console.log(error)
      }
      return () => {
        isMounted = false
      }
    }
    fetchData()
  }, [symbol])

  return (
    <div>
      {
        stockData && 
        <div className="row border bg-white rounded shadow-sm pm-4 mt-5">
          <div className="col">
            <div>
              <span className="fw-bold">name: </span>
              {stockData.Name}
            </div>
            <div>
              <span className="fw-bold">country: </span>
            </div>
            <div>
              <span className="fw-bold">ticker: </span>
              {stockData.Symbol}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: </span>
            </div>
            <div>
              <span className="fw-bold">Industry: </span>
              {stockData.Sector}
            </div>
            <div>
              <span className="fw-bold">IPO: </span>
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">MarketCap: </span>
              {stockData['Market Cap']}
            </div>
            <div>
              <span className="fw-bold">Shares Outstanding: </span>
            </div>
            <div>
              <span className="fw-bold">url: </span>
              <a href={stockData['SEC Filings']}>{stockData['SEC Filings']}</a>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default StockData