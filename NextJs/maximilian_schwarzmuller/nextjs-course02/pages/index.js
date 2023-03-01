import MeetupList from "@/components/meetups/MeetupList"
import Head from "next/head"
import { Fragment } from "react"
import App from '../../server/api/App'

// const DUMMY_MEETUPS = [
//   { 
//     id: 'm1',  
//     title: 'A First Meetup',
//     image: 'http://localhost:8080/SourceFiles/images/Poznan Square.jpg',
//     address: 'Some Address 5, 12345 Some City',
//     description: 'This is a first meetup!'
//   },
//   { 
//     id: 'm2',  
//     title: 'A Second Meetup',
//     image: 'http://localhost:8080/SourceFiles/images/Colt Steele - Clouds.png',
//     address: 'Some Address 10, 12345 Some City',
//     description: 'This is a second meetup!'
//   }
// ]

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta 
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

// Executed during build process. Runs server side onplay. 
// NextJs runs this instead of HomePage and awaits the promise
export async function getStaticProps() {
  // fetch data from an API
  const client = App()
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find()

  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup.id.toString()
      }))
    },
    revalidate: 3600 // seconds, depends on the frequency of data changes
  }
}

// Will always run on the server and runs for every request
/*export async function getServerSideProps(context) {
  // Gives access to incoming requests, allows server side authentication
  const req = context.req
  const res = context.res
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  }
}*/

export default HomePage