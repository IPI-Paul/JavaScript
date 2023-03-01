import { useContext } from "react"
import DataContext from "../../services/DataContext"
import Feed from "../16tut/Feed"

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext)
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {
        !isLoading && fetchError && 
        <p 
          className="statusMsg" 
          style={{ color: 'red'}}
        >
          {fetchError}
        </p> 
      }
      {
        !isLoading && !fetchError && (
          searchResults.length 
          ? <Feed posts={searchResults} />
          : <p className="statusMsg">No posts to display</p>
        )
      }
    </main>
  )
}

export default Home