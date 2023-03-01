import React from "react";
import '../../style.css'

const App = () => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    comments: '',
    isFriendly: null
  })
  
  const handleChange = (event) => 
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }))

  return (
    <form id="my-form">
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
    </form>
  )
}

export default App