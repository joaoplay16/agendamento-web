import axios from 'axios'

const mpApi = axios.create({
  baseURL: `http://0.0.0.0:${process.env.PORT}`,
})

export const payNow =  (data) => {
 return mpApi.post('/process_payment', data)
}
