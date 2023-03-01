import React from "react";
import '../style.css'

const App = () => {
  let idx = 0
  const getData = () => {
    if(idx === 0) {
      document
        .getElementById('my-form')
        .addEventListener('submit', (event) => {
          event.preventDefault()
          const formElements = event.target.elements
          if(formElements) {
            const {firstName, lastName} = formElements
            submitViaAPI({
              firstName: firstName.value,
              lastName: lastName.value
            })
          }
        })
        idx++
    }
  }
  const submitViaAPI = (data) => {
    console.log(data, '\n', 'Submitted!')
  }

  return (
    <div className="simple-form">
      <form id="my-form">
        <label htmlFor="firstName">First Name:</label>
        <input type='text' onChange={getData} name='firstName' />
        <label htmlFor="lastName">Last Name:</label>
        <input type='text' name="lastName" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App