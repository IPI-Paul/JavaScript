const Joke = ({setup, punchline}) => (
  <div className="joke-container">
    {/* <h3 style={{display: setup ? 'block' : 'none'}}>Setup: {setup}</h3> */}
    {setup && <h3>Setup: {setup}</h3>}
    <p>Punchline: {punchline}</p>
    <hr />
  </div>
);

export default Joke;