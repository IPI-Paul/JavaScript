import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { GET_CLIENTS } from '../queries/clientQueries';
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectForm({ project }) {
  const enums = {'Not Started': 'new', 'In Progress': 'progress', completed: 'completed'};
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(enums[project.status]);
  const [clientId, setClientId] = useState(project.client.id);

  const[updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {id: project.id, name, description, status, clientId},
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id }}]
  });

  const {loading, error, data} = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status || !clientId) {
      return alert('Please fill out all fields')
    }

    updateProject(name, description, status, clientId);

    if(loading) return null;
    if(error) return 'Something Went Wrong';
  }

  return (
    <>
      {!loading && !error && (
        <>
          <div className="mt-5">
            <h3>Update Project Details</h3>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" id="name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea id="description" className="form-control" value={description} onChange={e => setDescription(e.target.value)}></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select id="status" className='form-select' value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="new">Not Started</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-3">
                <label className='form-label'>Client</label>
                <select id="clientId" className="form form-select" value={clientId} onChange={e => setClientId(e.target.value)}>
                  <option value="">Select Client</option>
                  {data.clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </>
      )}      
    </>
  );
}
