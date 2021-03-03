import axios from 'axios'

const mpApi = axios.create({
  baseURL: `https://raissequeiroz.herokuapp.com:${process.env.PORT}`,
})


export const payNow =  (data) => {
console.log("URI", `${process.env.BASE_URI}:${process.env.PORT}`)

 return mpApi.post('/process_payment', data)
}
