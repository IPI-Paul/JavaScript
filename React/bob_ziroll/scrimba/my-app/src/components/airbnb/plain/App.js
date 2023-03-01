import Navbar from "../Navbar";
import Hero from "../Hero";
import Card from "./Card";
import '../style.css'
import data from '../data'

const App = () => (
  <div>
    <Navbar />
    <Hero />
    <section className="cards--list">
      {
      data.map(d => 
          <Card 
            key={d.id}
            img={d.coverImg}  
            name={d.coverImg.replace('.jpg', '')} 
            rating={d.stats.rating} 
            reviewCount={d.stats.reviewCount}
            location={d.location} 
            title={d.title} 
            price={d.price} 
            uom='person'
            openSpots={d.openSpots}
          />      
        )
      }
    </section>
  </div>
);

export default App
;