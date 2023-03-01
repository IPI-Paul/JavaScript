import { gql, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

const SEARCH_CLIENTS = gql`
  query SearchClients($name: String!) {
    clientSearch(name: $name) {
        id
        name
        email
        phone
    }
  }
`;

export default function SearchClientModal() {
  const [name, setName] = useState('');

  const [getClients, { loading, error, data, called }] = useLazyQuery(
    SEARCH_CLIENTS, {
      variables: {
        name
      }
    }
  )
  if(data) console.log(data.clientSearch);

  if(called && error) return <p>Something Went Wrong</p>;
  if(loading) return <Spinner />

  return (
    <>
      <div className="search">
        <div className="d-flex flex-row gap-1">
          <input type="text" className="form-control input-search" value={name} onChange={e => setName(e.target.value)} />
          <button 
            className="btn btn-secondary" 
            onClick={() => getClients()} 
            data-bs-toggle='modal'
            data-bs-target='#searchClientModal'
          >
            Search
          </button>
        </div>
      </div>
      {
        data && !loading && !error && 
        <div
          className='modal fade'
          id='searchClientModal'
          aria-labelledby='searchClientModalLabel' 
          aria-hidden={data && !loading && !error ? 'true' : 'false'}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 
                  className="modal-title" 
                  id='addClientModalLabel'
                >
                  Found Clients
                </h5>
                <button 
                  type='button'
                  className="btn-close"
                  data-bs-dismiss='modal' 
                  aria-label='Close'
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-hover mt-3">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.clientSearch.map(client => (
                      <ClientRow key={client.id} client={client} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
