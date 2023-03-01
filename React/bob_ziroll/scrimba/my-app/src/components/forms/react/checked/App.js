import React from "react";
import '../../style.css'

const App = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    comments: '',
    isFriendly: true,
    employment: '',
    favColor: ''
  })
  console.log(formData.favColor);
  const handleChange = (event) => {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    submitToAPI(formData)
  }
  const submitToAPI = (data) => console.log(data)
  return (
    <form id="my-form" onSubmit={handleSubmit}>
      <input
        type='text' 
        placeholder="First Name"
        onChange={handleChange} 
        name='firstName'
        value={formData.firstName}
      />
      <input
        type='text' 
        placeholder="Last Name"
        onChange={handleChange} 
        name='lastName'
        value={formData.lastName}
      />
      <input
        type='email' 
        placeholder="Email"
        onChange={handleChange} 
        name='email'
        value={formData.email}
      />
      <textarea 
        rows={4}
        placeholder="Comments"
        onChange={handleChange} 
        value={formData.comments}
        name='comments'
      />
      <div>
        <input
          type='checkbox'
          id='isFriendly'
          name="isFriendly"
          onChange={handleChange} 
          checked={formData.isFriendly}
        />
        <label htmlFor="isFriendly">Are you friendly?</label>
      </div>
      <br />
      <br />
      <fieldset>
        <legend>Current employment status</legend>   
        <input 
          type='radio'
          id='unemployed'
          name='employment'
          onChange={handleChange} 
          value={formData.employment === 'unemployed'}
        />
        <label htmlFor="unemployed">Unemployed</label>
        <br />
        <input 
          type='radio'
          id='part-time'
          name='employment'
          onChange={handleChange} 
          value={formData.employment === 'part-time'}
        />
        <label htmlFor="part-time">Part-time</label>
        <br />
        <input 
          type='radio'
          id='full-time'
          name='employment'
          onChange={handleChange} 
          value={formData.employment === 'full-time'}
        />
        <label htmlFor="full-time">Full-time</label>
      </fieldset>
      <br />
      <label htmlFor="favColor">What is your favourite colour?</label>
      <select 
        id="favColor" 
        name="favColor"
        onChange={handleChange} 
        value={formData.favColor}
      >
        <option value=''>--Choose a Colour--</option>
        <option value='red'>Red</option>
        <option value='orange'>Orange</option>
        <option value='yellow'>Yellow</option>
        <option value='green'>Green</option>
        <option value='blue'>Blue</option>
        <option value='indigo'>Indigo</option>
        <option value='violet'>Violet</option>
      </select>
      <button>Submit</button>
    </form>
  )
}

export default App