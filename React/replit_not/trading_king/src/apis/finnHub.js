import axios from 'axios'

const TOKEN = ''

export default axios.create({
  baseURL: "http://localhost:5000",
  params: {
    token: TOKEN
  }
})