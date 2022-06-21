import axios from 'axios'

const HOST = process.env.REACT_APP_API_HOST

console.log("HOst", HOST);

const mpApi = axios.create({
  baseURL: HOST
})

export const payNow = (data) => {
  return mpApi.post('/process_payment', data)
}
