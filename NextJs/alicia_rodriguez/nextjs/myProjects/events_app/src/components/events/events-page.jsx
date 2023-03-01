import Image from "next/image"
import Link from "next/link"

const AllEvents = ({ data }) => {
  return (
    <div className='events_page'>
      {/* <h1>Events Page</h1> */}
      {
        data.map(ev => (
          <Link key={ev.id} href={`/events/${ev.id}`} className='card'>
            <Image src={ev.image} alt={ev.title} width="400" height="200" />
            <h2>{ev.title}</h2>
          </Link>
        ))
      }
      {/* <a href=''>
        <img />
        <h2>Events in London</h2>
      </a>
      <a href=''>
        <img />
        <h2>Events in San Fransisco</h2>
      </a>
      <a href=''>
        <img />
        <h2>Events in Barcelona</h2>
      </a> */}
    </div>
  )
}

export default AllEvents