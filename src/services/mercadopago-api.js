import axios from 'axios'

const mpApi = axios.create({
  baseURL: `${window.location.hostname}:${process.env.PORT}`,
})

export const payNow =  (data) => {
 return mpApi.post('/process_payment', data)
}
