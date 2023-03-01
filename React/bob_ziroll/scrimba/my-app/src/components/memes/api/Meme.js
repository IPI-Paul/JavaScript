import React, { useState } from 'react';

const Meme = () => {
  const [meme, setMeme] = React.useState({
    topText: '',
    bottomText: '',
    randomImage: '../../images/Sport-06.jpg'
  });
  const [allMemes, setAllMemes] = useState([])
  React.useEffect(() => {
    fetch('http://localhost:5000/get_memes')
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
  }, [])  
  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme(prevState => ({
      ...prevState, 
      randomImage: url
    }));
  };
  const handleChange = (event) => {
    const {name, value} = event.target
    setMeme(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  return (
    <main className='meme-main'>
      <div className='meme-container'>
        <div className="form">
          <input 
            type="text" 
            placeholder="Top text"
            className="form--input"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
          <input 
            type="text" 
            placeholder="Bottom text"
            className="form--input"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
          <button 
            className="form--button"
            onClick={getMemeImage}
          >
            Get a new image
          </button>
        </div>
        <div className="meme">
          <img 
            src={meme.randomImage} 
            alt={meme.randomImage} 
            className='meme--image' 
          />
          <h2 className="meme-text top">{meme.topText}</h2>
          <h2 className="meme-text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
};

export default Meme;