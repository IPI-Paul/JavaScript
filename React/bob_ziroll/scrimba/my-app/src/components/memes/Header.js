import trollFace from './../../logo.svg'

const Header = () => (
  <header className="header">
    <img src={trollFace} alt="Troll Face" className="header--image" />
    <h2 className="header--title">Meme Generator</h2>
    <h4 className="header--project">React Course - Project 3</h4>
  </header>
);

export default Header;