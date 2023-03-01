import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Selector, Tut02, Tut03, Tut04, Tut05, Tut06, Tut07, Tut08, Tut09, 
  Tut10, Tut11, Tut13, Tut14, Tut15, Tut16, Tut19, Tut20, Tut21, Tut22
} from './components';
import { AppContextProvider } from './services/AppContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <Selector />
      <App />
      <Tut02 />
      <Tut03 />
      <Tut04 />
      <Tut05 />
      <Tut06 />
      <Tut07 />
      <Tut08 />
      <Tut09 />
      <Tut10 />
      <Tut11 />
      <Tut13 />
      <Tut14 />
      <Tut15 />
      <Tut16 />
      <Tut19 />
      <Tut20 />
      <Tut21 />
      <Tut22 />
    </AppContextProvider>
  </React.StrictMode>
);
