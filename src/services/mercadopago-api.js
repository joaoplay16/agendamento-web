import axios from 'axios'

const HOST = process.env.NODE_ENV === 'production' 
  ? `https://agendamentoweb.herokuapp.com` : `http://localhost:8080`

const mpApi = axios.create({
  baseURL: HOST
})

export const payNow =  (data) => {

 return mpApi.post('/process_payment', data)
}
