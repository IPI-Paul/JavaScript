import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
const examples = [
  {key: './App', value: 'Select an example'},
  {key: './components/adding/App', value: 'Add Item'},
  {key: './components/airbnb/plain/App', value: 'airbnb (plain)'},
  {key: './components/airbnb/object/App', value: 'airbnb (object)'},
  {key: './components/api/App', value: 'APIs'},
  {key: './components/boxes/App-props/App', value: 'Boxes Dark Mode', 
    props: {darkMode: true}
  },
  {key: './components/boxes/App-props/App', value: 'Boxes Light Mode', 
    props: {darkMode: false}
  },
  {key: './components/boxes/declarative/App', 
    value: 'Boxes Using Declarative Function'
  },
  {key: './components/boxes/imperative/App', 
    value: 'Boxes Using Imperative Function'
  },
  {key: './components/complex/App', value: 'Complex State'},
  {key: './components/contacts/App', value: 'Contacts'},
  {key: './components/counter/App', value: 'Counter'},
  {key: './components/handler/App', value: 'Event Handler'},
  {key: './components/forms/js-simple/App', value: 'Forms - JavaScript Simple'},
  {key: './components/forms/react/checked/App', value: 'Forms - React Checked'},
  {key: './components/forms/newsletter/App', value: 'Forms - React Newsletter'},
  {key: './components/forms/react/simple/App', value: 'Forms - React Simple'},
  {key: './components/fun-facts/plain/App', value: 'Fun Fatcs'},
  {key: './components/fun-facts/modes/App', value: 'Fun Fatcs - Light/Dark Mode'},
  {key: './components/jokes/conditional/App', value: 'Jokes - Conditional Layout'},
  {key: './components/jokes/modular/App', value: 'Jokes - Modular Layout'},
  {key: './components/jokes/plain/App', value: 'Jokes - Plain Layout'},
  {key: './components/notes/plain/App', value: 'Markdown Notes App'},
  {key: './components/notes/local-storage/App', value: 'Markdown Notes App - Local Storage'},
  {key: './components/memes/api/App', value: 'Meme Generator - API'},
  {key: './components/memes/async/App', value: 'Meme Generator - async'},
  {key: './components/memes/local/App', value: 'Meme Generator - Local'},
  {key: './components/hierarchy/App', value: 'Passing Data to Components'},
  {key: './components/tenzies/App', value: 'Tenzies'},
  {key: './components/unread/challenge-01/App', value: 'Unread Messages - Challenge 1'},
  {key: './components/unread/challenge-02/App', value: 'Unread Messages - Challenge 2'},
  {key: './components/ternary/App', value: 'Using ternary'},
  {key: './components/states/App', value: 'Using useState'},
  {key: './components/tracker/App', value: 'Window Tracker'},
];
let example;

const Selector = () => (
  <>
    <div className='selector'>
      <select id='selExample' onChange={updateApp}>
        {
          examples.map((el, idx) => <option key={idx} value={el.key}>{el.value}</option>)
        }
      </select>
    </div>
  </>
);

const updateApp = (obj) => {
  let idx = obj ? obj.target.selectedIndex : 0;
  if(obj && obj.target.selectedIndex > 0) {
    example = obj.target.value;
  }
  if(!example || idx > 0) {
    document.title = examples[idx].value;
    import(`${examples[idx].key}`)
      .then((module) => {
        const Home =  module.default;  
        root.render(
          <React.StrictMode>
            <Selector />
            <Home obj={examples[idx].props && examples[idx].props} />
          </React.StrictMode>
        );
      }); 
  }
  if(obj) {
    obj.target.selectedIndex = 0;
  }
};

export default updateApp;