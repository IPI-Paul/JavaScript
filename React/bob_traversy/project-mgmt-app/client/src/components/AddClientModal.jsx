import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function AddClientModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {name, email, phone},
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS
      });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] }
      });
    }
  })

  const onSubmit = (e) => {
    e.preventDefault();
    
    if(name === '' || email === '' || phone === '') {
      return alert('Please fill in all fields');
    }

    addClient(name, email, phone);

    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <>
      <button 
        type='button'
        className="btn btn-secondary"
        data-bs-toggle='modal'
        data-bs-target='#addClientModal'
      >
        <div className="d-flex align-items-center">
          <FaUser className='icon' />
          <div>Add Cient</div>
        </div>
      </button>
      <div
        className='modal fade'
        id='addClientModal'
        aria-labelledby='addClientModalLabel' 
        aria-hidden='true'
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 
                className="modal-title" 
                id='addClientModalLabel'
              >
                Add Client
              </h5>
              <button 
                type='button'
                className="btn-close"
                data-bs-dismiss='modal' 
                aria-label='Close'
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" id="name" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" id="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" id="phone" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <button type='submit' className="btn btn-secondary" data-bs-dismiss='modal'>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
