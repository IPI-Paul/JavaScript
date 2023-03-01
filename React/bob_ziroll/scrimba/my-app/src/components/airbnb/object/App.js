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
            item={{...d, name: d.coverImg.replace('.jpg', ''), uom: 'person'}}
          />      
        )
      }
    </section>
  </div>
);

export default App
;