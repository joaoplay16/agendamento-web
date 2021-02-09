import { Select } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { TextField } from "ui"
import mpInsertionErros from "strings/mercadopago-insertion-errors"
import axios from "axios"
import "./style.css"
import { useShoppingCart } from "hooks"
import * as mpApi from 'services/mercadopago-api'

const MercadoLivreCardForm = ({ schedules, price, userInfo, onModalResult }) => {
  const [doSubmit, setDoSubmit] = useState(false)

  const [formData, setFormData] = useState({
    cardNumber: "6062826786276634",
  })

  const { setPaymentStatusDetails } = useShoppingCart()

  useEffect(() => {
    //para poder fazer outra compra com o mesmo cartão
    window.Mercadopago.clearSession()

    window.Mercadopago.setPublishableKey(
      "TEST-72a91e7b-462c-4ed6-be2c-5485b30eeb3b"
    )

    window.Mercadopago.getIdentificationTypes()

    document.getElementById("description").value = getDescription(true)
  }, [])

  useEffect(() => {
    guessPaymentMethod(formData.cardNumber)
    console.log("STATE", formData)
  }, [formData.cardNumber])

  const getDescription = (withBrand = false) => {
    let decription = withBrand ? "Raisse Queiroz & Hercules Queiroz - " : ""
    schedules.forEach((schedule, index) => {
      let name = schedule.procedure.name
      let date = schedule.selectedDate.toLocaleDateString()
      decription +=
        schedules.length != index + 1
          ? `${name} (${date}) , `
          : `${name} (${date})`
    })

    return decription
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData( state => ({
      ...state,
      [name]:value
    }))
  }

  function guessPaymentMethod(cardNumber) {
    cleanCardInfo()

    if (cardNumber.length >= 6) {
      let bin = cardNumber.substring(0, 6)
      window.Mercadopago.getPaymentMethod(
        {
          bin: bin,
        },
        setPaymentMethod
      )
    }
  }

  function setPaymentMethod(status, response) {
    if (status == 200) {
      let paymentMethod = response[0]

      document.getElementById("paymentMethodId").value = paymentMethod.id
      document.getElementById(
        "cardNumber"
      ).style.backgroundImage = `url(${paymentMethod.thumbnail})`

      if (paymentMethod.additional_info_needed.includes("issuer_id")) {
        getIssuers(paymentMethod.id)
      } else {
        document.getElementById("issuerInput").classList.add("hidden")

        getInstallments(paymentMethod.id, price)
      }
    } else {
      alert(`payment method info error: ${response.message}`)
      console.log(`payment method info `,response);

    }
  }

  function getIssuers(paymentMethodId) {
    window.Mercadopago.getIssuers(paymentMethodId, setIssuers)
  }

  function setIssuers(status, response) {
    if (status == 200) {
      let issuerSelect = document.getElementById("issuer")

      response.forEach((issuer) => {
        let opt = document.createElement("option")
        opt.text = issuer.name
        opt.value = issuer.id
        issuerSelect.appendChild(opt)
      })

      if (issuerSelect.options.length <= 1) {
        document.getElementById("issuerInput").classList.add("hidden")
      } else {
        document.getElementById("issuerInput").classList.remove("hidden")
      }

      getInstallments(
        document.getElementById("paymentMethodId").value,
        price,
        issuerSelect.value
      )
    } else {
      alert(`issuers method info error: ${response}`)
    }
  }
  // updateInstallmentsForIssuer
  const handleIssuerChange = (e) => {
    window.Mercadopago.getInstallments(
      {
        payment_method_id: document.getElementById("paymentMethodId").value,
        amount: price,
        issuer_id: parseInt(document.getElementById("issuer").value),
      },
      setInstallments
    )
  }

  function getInstallments(paymentMethodId, amount, issuerId) {
    window.Mercadopago.getInstallments(
      {
        payment_method_id: paymentMethodId,
        amount: price,
        issuer_id: issuerId ? parseInt(issuerId) : undefined,
      },
      setInstallments
    )
  }

  function setInstallments(status, response) {
    if (status == 200) {
      document.getElementById("installments").options.length = 0
      response[0].payer_costs.forEach((payerCost) => {
        let opt = document.createElement("option")
        opt.text = payerCost.recommended_message
        opt.value = payerCost.installments
        document.getElementById("installments").appendChild(opt)
      })
    } else {
      alert(`installments method info error: ${response}`)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getCardToken(e)
  }

  const pay = async () => {
    const paymentMethodId = document.getElementById("paymentMethodId").value
    const installments = document.getElementById("installments").value
    const email = document.getElementById("email").value
    const transactionAmount = document.getElementById("amount").value
    const token = document.getElementById("token").value
    const description = getDescription()
    const data = {
      email,
      description,
      installments,
      paymentMethodId,
      transactionAmount,
      token
    }
    // const res = await mpApi.post('/process_payment',data)
   const res = await mpApi.payNow(data) 
    setPaymentStatusDetails(res.data)
    console.log("RESULT", res.data)
    console.log("DADOS", data)
  }

  function getCardToken(event) {
    event.preventDefault()

    if (!doSubmit) {
      let form = document.getElementById("paymentForm")
      window.Mercadopago.createToken(form, setCardTokenAndPay)
      return false
    }
  }

  function setCardTokenAndPay(status, response) {
    if (status == 200 || status == 201) {
      let card = document.getElementById("token")
      card.value = response.id
      // let form = document.getElementById("paymentForm")
      // let card = document.createElement("input")
      // card.setAttribute("name", "token")
      // card.setAttribute("type", "hidden")
      // card.setAttribute("value", response.id)
      // form.appendChild(card)
      // setDoSubmit(true)
      // form.submit()
    pay()


      console.log("response", response.id)
    } else {
      alert(
        "Verifique os dados inseridos!\n" + JSON.stringify(response, null, 4)
      )
      // alert("Verifique os dados inseridos!\n" + mpInsertionErros[response.cause[0].code])
    }
  }

  /***
   * UX functions
   */

  function cleanCardInfo() {
    document.getElementById("cardNumber").style.backgroundImage = ""
    document.getElementById("issuerInput").classList.add("hidden")
    document.getElementById("issuer").options.length = 0
    document.getElementById("installments").options.length = 0
  }
  //Handle price update
  function updatePrice() {}
  // document.getElementById('quantity').addEventListener('change', updatePrice);
  // updatePrice();

  //Retrieve product description
  // document.getElementById('description').value = document.getElementById('product-description').innerHTML;

  return (
    <>
      <main>
        <section class="payment-form dark">
          <div class="">
            <div class="block-heading">
              <h2>Pagamento no cartão</h2>
            </div>
            <div class="form-payment">
              <div class="products">
                <h2 class="title">Itens</h2>
                <div class="item">
                  <span class="price" id="summary-price"></span>

                  <p class="item-name">
                    <em>{getDescription()}</em>{" "}
                    <span id="summary-quantity"></span>
                  </p>
                </div>
                <div class="total">
                  Valor do pagamento
                  <span class="price" id="summary-total">
                    {price}
                  </span>
                </div>
              </div>
              <div class="payment-details">
                <form onSubmit={handleSubmit} id="paymentForm">
                  <h3 class="title">Suas informações</h3>
                  <div class="row">
                    <div class="form-group col">
                      <label for="email">E-Mail</label>
                      <TextField 
                      required 
                      defaultValue='seijiyokai@gmail.com'
                      id="email" 
                      name="email" 
                      type="text" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-sm-5">
                      {/* <label for="docType">Tipo de documento</label> */}
                      <Select
                        native
                        hidden
                        inputProps={{
                          "data-checkout": "docType",
                        }}
                        id="docType"
                        name="docType"
                        type="text"
                        variant="outlined"
                        value="CPF"
                      />
                    </div>
                    <div class="form-group col-sm-7">
                      <label for="docNumber">CPF</label>
                      <TextField
                        required
                        defaultValue="76185675900"
                        id="docNumber"
                        name="docNumber"
                        inputProps={{
                          "data-checkout": "docNumber",
                        }}
                        type="text"
                      />
                    </div>
                  </div>
                  <br />
                  <h3 class="title">Detalhes do cartão de crédito</h3>
                  <div class="row">
                    <div class="form-group col-sm-8">
                      <label for="cardholderName">
                        Nome do proprietário do cartão
                      </label>
                      <TextField
                        required
                        defaultValue="Otimista"
                        id="cardholderName"
                        name="cardholderName"
                        inputProps={{
                          "data-checkout": "cardholderName",
                        }}
                        type="text"
                      />
                    </div>
                    <div class="form-group col-sm-4">
                      <label for="">Válido até</label>
                      <div class="input-group expiration-date">
                        <TextField
                          required
                          defaultValue='12'
                          type="text"
                          placeholder="MM"
                          id="cardExpirationMonth"
                          name="cardExpirationMonth"
                          inputProps={{
                            "data-checkout": "cardExpirationMonth",
                          }}
                          onselectStart={() => false}
                          onPaste={() => false}
                          onCopy={() => false}
                          onCut={() => false}
                          onDrag={() => false}
                          onDrop={() => false}
                          autoComplete="off"
                        />
                        <span class="date-separator">/</span>
                        <TextField
                          required
                          defaultValue='22'
                          type="text"
                          placeholder="YY"
                          id="cardExpirationYear"
                          name="cardExpirationYear"
                          inputProps={{
                            "data-checkout": "cardExpirationYear",
                          }}
                          onselectStart={() => false}
                          onPaste={() => false}
                          onCopy={() => false}
                          onCut={() => false}
                          onDrag={() => false}
                          onDrop={() => false}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div class="form-group col-sm-8">
                      <label for="cardNumber">Numero do cartão</label>
                      <TextField
                        required
                
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        onChange={handleChange}
                        value={formData.cardNumber}
                        inputProps={{
                          "data-checkout": "cardNumber",
                          class: "input-background",
                        }}
                        onselectStart={() => false}
                        onCopy={() => false}
                        onCut={() => false}
                        onDrag={() => false}
                        onDrop={() => false}
                        autoComplete="off"
                      />
                    </div>
                    <div class="form-group col-sm-4">
                      <label for="securityCode">CVV</label>
                      <TextField
                        required
                        defaultValue="123"
                        id="securityCode"
                        name="securityCode"
                        inputProps={{
                          "data-checkout": "securityCode",
                        }}
                        type="text"
                        onselectStart={() => false}
                        onPaste={() => false}
                        onCopy={() => false}
                        onCut={() => false}
                        onDrag={() => false}
                        onDrop={() => false}
                        autoComplete="off"
                      />
                    </div>
                    <div id="issuerInput" class="form-group col-sm-12 hidden">
                      <label for="issuer">Issuer</label>
                      <Select
                        native
                        inputProps={{
                          "data-checkout": "issuer",
                        }}
                        onChange={handleIssuerChange}
                        id="issuer"
                        name="issuer"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-sm-12">
                      <label for="installments">Parcelas</label>
                      <Select
                        native
                        type="text"
                        id="installments"
                        variant="outlined"
                      />
                    </div>
                    <div class="form-group col-sm-12">
                      <input
                        type="hidden"
                        name="transactionAmount"
                        id="amount"
                        value={price}
                      />
                      <input
                        type="hidden"
                        name="paymentMethodId"
                        id="paymentMethodId"
                      />
                      <input
                        type="hidden"
                        name="description"
                        id="description"
                      />
                      <input
                        type="hidden"
                        name="token"
                        id="token"
                      />
                      <br />
                      <button type="submit" class="btn btn-primary btn-block">
                        Pagar
                      </button>
                      <br />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default MercadoLivreCardForm
