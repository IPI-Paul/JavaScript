import './App.css';
import Search from './components/Search';
import Favourites from './components/Favourites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import { useGlobalContext } from './services/AppProvider';

function App() {
  const { showModal, favourites } = useGlobalContext()
  return (
    <main>
      <Search />
      {favourites.length > 0 && <Favourites />}
      <Meals />
      {showModal && <Modal /> }
    </main>
  );
}

export default App;
