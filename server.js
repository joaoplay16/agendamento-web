const express = require("express")
const app = express()
const url = require("url")
const mercadopago = require("mercadopago")
const cors = require("cors")
//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken(
  "TEST-5314855399155157-011900-516f5630ab8e49e598abe93632f73084-179865264"
)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
// app.use(express.static("../../client"));
app.use(express.static("./build"))

app.get("*", function (req, res) {
  res.status(200).sendFile(__dirname + "/build/index.html")
})

app.post("/process_payment", (req, res) => {
  var payment_data = {
    transaction_amount: Number(req.body.transactionAmount),
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuer,
    payer: {
      email: req.body.email,
      identification: {
        type: req.body.docType,
        number: req.body.docNumber,
      },
    },
  }

  // console.log(payment_data)

  mercadopago.payment
    .save(payment_data)
    .then(function (response) {
      // res.status(response.status).json({
      //   status: response.body.status,
      //   status_detail: response.body.status_detail,
      //   id: response.body.id
      // });
      res.json({
        id: response.body.id,
        status: response.body.status,
        payment_type_id: response.body.payment_type_id,
        status_detail: response.body.status_detail,
        date_approved: response.body.date_approved,
        description: response.body.description,
        installments: response.body.installments,
        transaction_amount: response.body.transaction_amount
      })
      // console.log("body", response.body)
    })
    .catch(function (error) {
      console.log(error)

      res.json(error)
    })
})

app.listen(8080, () => {
  console.log("The server is now running on Port 8080")
})
