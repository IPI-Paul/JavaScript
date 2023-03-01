import Contact from "./Contact";
import './style.css'

const App = () => (
  <div className="contacts">
    <Contact 
      img="./../images/mr-whiskerson.png"
      name="Mr. Whiskerson" 
      phone="(212) 555-1234"
      email="mr.whiskaz@catnap.meow"
    />
    <Contact 
      img="../../images/fluffykins.png"
      name="Fluffykins" 
      phone="(212) 555-2345"
      email="fluff@me.com"
    />
    <Contact 
      img="../../images/felix.png"
      name="Felix" 
      phone="(212) 555-4567"
      email="thecat@hotmail.com"
    />
    <Contact 
      img="../../images/pumpkin.png"
      name="Pumpkin" 
      phone="(0800) CAT KING"
      email="pumpkin@scrimba.com"
    />
  </div>
);

export default App;


/* <div className="contact-card">
<img src="../../images/mr-whiskerson.png" alt="Mr. Whiskerson" />
<h3>Mr. Whiskerson</h3>
<div className="info-group">
  <img src="../../images/phone-icon.svg" alt="phone-icon" />
  <p>(212) 555-1234</p>
</div>
<div className="info-group">
  <img src="../../images/mail-icon.svg" alt="mail-icon" />
  <p>mr.whiskaz@catnap.meow</p>
</div>
</div>
<div className="contact-card">
<img src="../../images/fluffykins.png" alt="Fluffykins" />
<h3>Fluffykins</h3>
<div className="info-group">
  <img src="../../images/phone-icon.svg" alt="phone-icon" />
  <p>(212) 555-2345</p>
</div>
<div className="info-group">
  <img src="../../images/mail-icon.svg" alt="mail-icon" />
  <p>fluff@me.com</p>
</div>
</div>
<div className="contact-card">
<img src="../../images/felix.png" alt="Felix" />
<h3>Felix</h3>
<div className="info-group">
  <img src="../../images/phone-icon.svg" alt="phone-icon" />
  <p>(212) 555-4567</p>
</div>
<div className="info-group">
  <img src="../../images/mail-icon.svg" alt="mail-icon" />
  <p>thecat@hotmail.com</p>
</div>
</div>
<div className="contact-card">
<img src="../../images/pumpkin.png" alt="Pumpkin" />
<h3>Pumpkin</h3>
<div className="info-group">
  <img src="../../images/phone-icon.svg" alt="phone-icon" />
  <p>(0800) CAT KING</p>
</div>
<div className="info-group">
  <img src="../../images/mail-icon.svg" alt="mail-icon" />
  <p>pumpkin@scrimba.com</p>
</div>
</div> */