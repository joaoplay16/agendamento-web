import axios from 'axios'

const mpApi = axios.create({
  baseURL: `http://localhost:8080`,
})


export const payNow =  (data) => {

 return mpApi.post('/process_payment', data)
}
