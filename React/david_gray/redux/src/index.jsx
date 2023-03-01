import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppContextProvider } from './services/AppContextProvider';
import { 
  Selector, Tut01, Tut02, Tut03, Tut04, Tut05, Tut06, Tut07 
} from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AppContextProvider>
    <Selector />
    <App />
    <Tut01 />
    <Tut02 />
    <Tut03 />
    <Tut04 />
    <Tut05 />
    <Tut06 />
    <Tut07 />
  </AppContextProvider>
  </React.StrictMode>
);
