import Link from 'next/link'
import Image from 'next/image'

export const HomePage = ({ data }) => (
  <div className='home_body'>
    {
      data.map(ev => (
        <Link key={ev.id} href={`/events/${ev.id}`} className='card'>
          <div className="image">
            <Image src={ev.image} width={500} height={300} alt={ev.title} />
          </div>
          <div className="content">
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </div>
        </Link>
      ))
    }
    {/* <a href='/events/london'>
      <img />
      <h2>Events in London</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto rerum delectus reiciendis autem modi, maxime hic ipsum accusamus. Earum ipsa ipsam quo natus voluptas consectetur cum? Laborum culpa sed quasi.
      </p>
    </a>
    <a href='/events/san-francisco'>
      <img />
      <h2>Events in San Francisco</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto rerum delectus reiciendis autem modi, maxime hic ipsum accusamus. Earum ipsa ipsam quo natus voluptas consectetur cum? Laborum culpa sed quasi.
      </p>
    </a>
    <a href='/events/barcelona'>
      <img />
      <h2>Events in Barcelona</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto rerum delectus reiciendis autem modi, maxime hic ipsum accusamus. Earum ipsa ipsam quo natus voluptas consectetur cum? Laborum culpa sed quasi.
      </p>
    </a> */}
  </div>
)