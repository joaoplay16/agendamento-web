const express = require("express")
const app = express()
const mercadopago = require("mercadopago")
const cors = require("cors")
require("dotenv").config()

//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN)

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("./build"))

app.get("*", function (req, res) {
  res.status(200).sendFile(__dirname + "/build/index.html")
})

app.post("/process_payment", (req, res) => {
  const { body } = req
  const { payer } = body
  const payment_data = {
    transaction_amount: Number(body.transactionAmount),
    token: body.token,
    description: body.description,
    installments: Number(body.installments),
    payment_method_id: body.paymentMethodId,
    issuer_id: body.issuerId,
    payer: {
      email: payer.email,
      identification: {
        type: payer.identification.docType,
        number: payer.identification.docNumber,
      },
    },
  }

  mercadopago.payment
    .save(payment_data)
    .then(function (response) {
      const { body } = response
      // res.status(response.status).json({
      //   status: response.body.status,
      //   status_detail: response.body.status_detail,
      //   id: response.body.id
      // });
      res.status(201).json({
        id: body.id,
        date_created: body.date_created,
        date_approved: body.date_approved,
        status: body.status,
        status_detail: body.status_detail,
        payment_type_id: body.payment_type_id,
        payment_method_id: body.payment_method_id,
        description: body.description,
        installments: body.installments,
        transaction_amount: body.transaction_amount,
        // payer: {
        //   email: payer.email,
        //   identification: {
        //     doc_type: payer.identification.docType,
        //     doc_number: payer.identification.docNumber
        //   }
        // }
      })
      console.log("body", response.body)
    })
    .catch(function (error) {
      console.log(error)

      res.json(error)
    })
})

app.listen(process.env.PORT || 8088, () => {
  console.log("The server is now running on Port 8088")
})
