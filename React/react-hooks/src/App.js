import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { EffectTutorial, LayoutEffectTutorial, NavBar, ReducerTutorial, RefTutorial, StateTutorial } from './components';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ImperativeHandle from './components/ImperativeHandle';
import ContextTutorial from './components/ContextTutorial';
import MemoTutorial from './components/MemoTutorial';
import CallbackTutorial from './components/CallbackTutorial';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache
});

function App() {
  const [example, setExample] = useState('');

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <NavBar setExample={setExample} />
        </header>
        {example === 'callback' && <CallbackTutorial />}
        {example === 'context' && <ContextTutorial />}
        {example === 'effect' && <EffectTutorial />}
        {example === 'imperative' && <ImperativeHandle />}
        {example === 'layout' && <LayoutEffectTutorial />}
        {example === 'memo' && <MemoTutorial />}
        {example === 'reducer' && <ReducerTutorial />}
        {example === 'ref' && <RefTutorial />}
        {example === 'state' && <StateTutorial />}
      </div>
    </ApolloProvider>
  );
}

export default App;
