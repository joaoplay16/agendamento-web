import { getAccessToken, Juno } from 'juno-api-wrapper'

function getToken(){
  let res =  getAccessToken('cw5yFT7QDukEBJoM', 'V9d^?8J}yE^ze.I:L][w||xYk4S%L41g')
  return res
}
const token = getToken()

const options = {
  accessToken: token,
  resourceToken: process.env.TOKEN,
  isSandbox: true
}

const juno = new Juno(options)

const newCharge = {
  description: "Bolacha",
  totalAmount: 10.0,
  amount: 10.0,
  installments: 1,
  paymentTypes: 'CREDIT_CARD'
}

const billing = {
  name: "Nienke",
  document: "000111222333",
  email: "nieke@gmail.com",
  phone: "5599988194455",
}

async function createCharge(){
  const res = await juno.createCharge(newCharge, billing)
console.log(res);
}

export {createCharge}