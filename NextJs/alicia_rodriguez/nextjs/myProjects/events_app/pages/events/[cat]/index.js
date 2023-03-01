import CatEvent from '@/src/components/events/catEvent'

const EventsCatPage = ({ data }) => <CatEvent data={data} />

export default EventsCatPage

export async function getStaticPaths() {
  const { events_categories } = await import('/data/data.json')
  const allPaths = events_categories.map(ev => (
    {
      params: {
      cat: ev.id.toString()
      }
    }
  ))
    
  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const id = context.params.cat
  const { allEvents } = await  import('/data/data.json')

  const data = allEvents.filter(ev => ev.city === id)

  return {
    props: {
      data: data
    }
  }
}