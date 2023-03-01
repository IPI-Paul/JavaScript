import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import finnHub from "../apis/finnHub"
import StockChart from "../components/StockChart"
import StockData from "../components/StockData"

const formatData = (data) => (
  data.map((el, index) => ({
    x: new Date(el.Date).getTime(),
    y: el['VIX Close']
    // x: el,
    // y: data.c[index]
  }))
)

const StockDetailPage = () => {
  const {symbol} = useParams()
  const [chartData, setChartData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      const offset = date.getTimezoneOffset() * 60 * 1000
      const priorYears = ((365 * 3) + 1) * 24 * 60 * 60 * 1000
      const currentTime = new Date(date.getTime() - offset - priorYears)
      const getDay = (days) => (
        new Date(currentTime - days * 24 * 60 * 60 * 1000)
      )
      const oneDay = getDay(
        date.getDay() === 6 
        ? 2 
        : (
          date.getDay() === 0
            ? 3
            : 1
          )
      )
      const oneWeek = getDay(7)
      let oneMonth = new Date(currentTime)
      oneMonth = new Date(oneMonth.setMonth(oneMonth.getMonth() - 1))
      const oneYear = getDay(365)
      try {
        const responses = await Promise.all([
          finnHub.get('/stock', {
            params: {
              // symbol,
              Date_gte: oneDay.toISOString().split('T')[0],
              Date_lte: currentTime.toISOString().split('T')[0]
              // resolution: 30
            }
          }), 
          finnHub.get('/stock', {
            params: {
              // symbol,
              Date_gte: oneWeek.toISOString().split('T')[0],
              Date_lte: currentTime.toISOString().split('T')[0]
              // resolution: 60
            }
          }),
          finnHub.get('/stock', {
            params: {
              // symbol,
              Date_gte: oneMonth.toISOString().split('T')[0],
              Date_lte: currentTime.toISOString().split('T')[0]
              // resolution: 60
            }
          }),
          finnHub.get('/stock', {
            params: {
              // symbol,
              Date_gte: oneYear.toISOString().split('T')[0],
              Date_lte: currentTime.toISOString().split('T')[0]
              // resolution: 'W'
            }
          })
        ])
        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          month: formatData(responses[2].data),
          year: formatData(responses[3].data)
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [symbol])
  if(chartData) console.log(chartData)

  return (
    <div>
      {
        chartData && 
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>
      }
    </div>
  )
}

export default StockDetailPage