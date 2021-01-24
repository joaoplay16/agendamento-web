import { getAccessToken, Juno } from 'juno-api-wrapper'

export function getClientHash(clientId, clientSecret) {
  const data = `${clientId}:${clientSecret}`;
  const buff = Buffer.from(data);

  return buff.toString('base64');
}

 function getToken(){
  let res =   getClientHash('cw5yFT7QDukEBJoM', 'V9d^?8J}yE^ze.I:L][w||xYk4S%L41g')
  return res
}
const token = getToken()

const options = {
  accessToken: token,
  resourceToken: '0F02613B12041889E6653A6124BDAF6710062F4F6E00F343430F342F091D9754',
  isSandbox: true
}

const juno = new Juno(options)

delete juno.headers['User-Agent']

juno.headers['Access-Control-Allow-Methods'] = "GET, POST"
juno.headers['Access-Control-Allow-Origin'] = "*"

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
console.log(
  "resultado",
  res
);
}

export {createCharge}