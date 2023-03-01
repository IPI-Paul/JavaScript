import React from "react";
import '../style.css'

const App = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    passwordConfirm: '',
    accept: false
  })
  const handleChange = (event) => {
    const {name, value, type, checked} = event.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if(formData.password !== formData.passwordConfirm) {
      alert('Passwords do not match!')
    } else {
      console.log(
        !formData.accept 
        ? 'Successfully signed up!'
        : 'Thanks for singning up for our newsletter!')
    }
  }
  return (
    <div className="newsletter-container">
      <br />
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type='email'
          placeholder="Email address"
          className="form--input"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input 
          type='password'
          placeholder="Password"
          className="form--input"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input 
          type='password' 
          placeholder="Confirm password"
          className="form--input"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
        />
        <div className="form--marketing">
          <input 
            type='checkbox'
            className="form--input"
            name='accept'
            id='accept'
            checked={formData.accept}
            onChange={handleChange}
          />
          <label htmlFor="accept">I want to join the newsletter</label>
        </div>
        <div className="submit">
          <button>Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default App