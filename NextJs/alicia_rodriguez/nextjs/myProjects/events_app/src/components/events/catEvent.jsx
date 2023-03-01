import Image from "next/image"
import Link from "next/link"


const CatEvent = ({ data }) => {
  return (
    <div className="cat_events">
      <h1>Events in {data[0].city}</h1>
      <div className="content">
        {
          data.map(ev => (
            <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} className='card'>
              <Image width={350} height={200} alt={ev.title} src={ev.image} />
              <h2> {ev.title} </h2>
              <p> { ev.description } </p>
            </Link>
          ))
        }
        {/* <a href="/event/event1"> 
          <img />
          <h2> Event 1 </h2>
        </a>
        <a href="/event/event2"> 
          <img />
          <h2> Event 2 </h2>
        </a>
        <a href="/event/event3"> 
          <img />
          <h2> Event 3 </h2>
        </a>
        <a href="/event/event4"> 
          <img />
          <h2> Event 4 </h2>
        </a>
        <a href="/event/event5"> 
          <img />
          <h2> Event 5 </h2>
        </a>
        <a href="/event/event6"> 
          <img />
          <h2> Event 6 </h2>
        </a> */}
      </div>
    </div>
  )
}

export default CatEvent