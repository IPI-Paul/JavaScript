import Clients from '../components/Clients';
import AddClientModal from '../components/AddClientModal';
import Projects from '../components/Projects';
import AddProjectModal from '../components/AddProjectModal';
import SearchClientModal from '../components/SearchClientModal';

export default function Home() {
  return (
    <>
    <div className="container-fluid d-flex gap-3 mb-4">
      <AddClientModal />
      <AddProjectModal />
      <SearchClientModal />
    </div>
      <Projects />
      <Clients />
    </>
  )
}
