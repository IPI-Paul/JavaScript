import MeetupDetail from '@/components/meetups/MeetupDetail'
import Head from 'next/head'
import { Fragment } from 'react'
import App from '../../../server/api/App'

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta 
          name="description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail 
        image={props.meetupData.image}
        title={props.meetupData.title} 
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  )
}

export async function getStaticPaths() {
  const client = App()
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find({}, { id: 1 })

  client.close()

  return {
    fallback: 'blocking',
    paths: meetups.map(meetup => ( { 
      params: { meetupId: meetup.id.toString()}
    }))
    // paths: [
    //   {
    //     params: {
    //       meetupId: 'm1'
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2'
    //     }
    //   }
    // ]
  }
}

export async function getStaticProps(context) {
  // fetch data for a single meetup 

  const meetupId = context.params.meetupId

  const client = App()
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const selectedMeetup = await meetupsCollection.findOne({ id: meetupId })

  client.close()

  return {
    props: {
      meetupData: selectedMeetup
    }
  }
}

export default MeetupDetails