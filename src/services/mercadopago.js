import mercadopago from 'mercadopago'
import axios from 'axios'

mercadopago.configure({
  access_token: 'TEST-5314855399155157-011900-516f5630ab8e49e598abe93632f73084-179865264',
  sandbox: true
})

//Create purchase item object template
const purchaseOrder = {
  items: [
    {
      id: 123,
      title: 'Mouse Optico',
      description : 'Mouse bom',
      quantity: 1,
      currency_id: 'BRL',
      unit_price: parseFloat(50)
    }
  ],
  payer : {
    email: 'nandaime@gmailcom'
  },
  auto_return : "all",
  external_reference : '456',
  back_urls : {
    success : 'http://' + "localhost:3333/payments/success",
    pending : 'http://' + "localhost:3333/payments/pending",
    failure : 'http://' + "localhost:3333/payments/failure",
  }
}






const pay = async() => {
  //Generate init_point to checkout
try {
  const preference = await mercadopago.preferences.create(purchaseOrder);
  console.log("PREFERENCE",preference.body.init_point);
}catch(err){
  console.log(err.message);
}
}

const fetchPay = () => {
  fetch(`https://api.mercadopago.com/v1/customers/search?email=bruno@gmail.com`, {
    method: "GET",
    headers: {
      'Authorization': 'Bearer TEST-5314855399155157-011900-516f5630ab8e49e598abe93632f73084-179865264'
    }
})
    .then(data => {     //vereficar os dados
        return data.json()
 4   }).then(json =>{
      console.log("JSON",json.results);
    })
}

export default pay