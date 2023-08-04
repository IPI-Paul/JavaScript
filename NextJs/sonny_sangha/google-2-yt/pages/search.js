import Header from "@/components/Header"
import Head from "next/head"
// import { API_KEY, CONTEXT_KEY } from '@/keys'
import Response from "@/Response"
import { useRouter } from "next/router"
import SearchResults from "@/components/SearchResults"

function search({ results }) {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>{`${router.query.term} - Google Search`}</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <SearchResults results={results} />
    </div>
  )
}

export default search

export async function getServerSideProps(context) {
  const useDummyData = false
  const depth = context.query.depth || '0'
  const startIndex = context.query.start || '0'
  const BASE_Path = process.env.BASE_Path

  // const data = useDummyData ? Response : await fetch(`https://googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`).then(response => response.json())
  
  const data = useDummyData ? Response : await fetch(`http://localhost:3000/api/files?dir=${BASE_Path}&term=${context.query.term}&depth=${depth}&start=${startIndex}`).then(response => response.json())

  // After the Server has rendered... Pass the results to the client
  return {
    props: {
      results: data
    }
  }
}