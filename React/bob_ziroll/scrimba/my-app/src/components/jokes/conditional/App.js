import Joke from "./Joke";
import jokesData from "../jokesData";

const App = () => {
  const jokeElements = jokesData.map(({setup, punchline}) => {
    return (
      <Joke 
        setup={setup}
        punchline={punchline}
      />
    )
  });
  return (
    <div>
      {jokeElements}
    </div>
  )
};

export default App;