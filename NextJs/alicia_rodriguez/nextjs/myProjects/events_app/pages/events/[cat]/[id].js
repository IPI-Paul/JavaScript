import SingleEvent from '@/src/components/events/single-event'

const EventPage = ( {data} ) => {
  return (
    <SingleEvent data={data} />
  )
}

export default EventPage

export async function getStaticPaths() {
  const data = await import('/data/data.json')
  const { allEvents } = data

  const allPaths = allEvents.map(ev => (
    {
      params: {
        cat: ev.city,
        id: ev.id
      }
    }
  ))

  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const id = context.params.id
  const { allEvents } = await import('/data/data.json')
  const eventData = allEvents.find(ev => ev.id === id)

  return {
    props: {
      data: eventData
    }
  }
}