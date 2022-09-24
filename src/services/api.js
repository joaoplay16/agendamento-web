import axios from 'axios'

const HOST = process.env.REACT_APP_API_HOST

const api = axios.create({
  baseURL: HOST
})

export default api
