import axios from 'axios'

const mpApi = axios.create({
  baseURL: `${process.env.BASE_URI}:${process.env.PORT}`,
})

console.log("URI", `${process.env.BASE_URI}:${process.env.PORT}`)

export const payNow =  (data) => {
 return mpApi.post('/process_payment', data)
}
