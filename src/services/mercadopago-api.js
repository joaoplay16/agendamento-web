import axios from 'axios'

const mpApi = axios.create({
  baseURL: `https://raissequeiroz.herokuapp.com`,
})


export const payNow =  (data) => {

 return mpApi.post('/process_payment', data)
}
