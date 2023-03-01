fetch('http://localhost:1234/api/login', {
  method: 'POST',
  body: JSON.stringify({
    email: 'hhjh',
    password: 'ljljjl'
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
  })
  .then(res => res.json())
  .then(console.log);