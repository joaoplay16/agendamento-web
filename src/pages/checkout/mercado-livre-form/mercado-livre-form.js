import { Select, Button } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Dialog, TextField } from "ui"
import "./style.css"
import { useDatabase, useShoppingCart } from "hooks"
import * as mpApi from "services/mercadopago-api"
import { RESERVATIONS } from "routes"
import strings from "strings/mercadopago-response"
const MercadoLivreCardForm = ({ history, schedules, price, userInfo }) => {
  let mercadopago = new MercadoPago(process.env.REACT_APP_MP_PUBLISHABLE_KEY)

  const { setPaymentStatusDetails } = useShoppingCart()
  const { submitSchedule } = useDatabase()

  const [isDialogOpen, setOpenDialog] = useState(false)
  const [paymentResult, setPaymentResult] = useState(null)
  const [dialogData, setDialogData] = useState({
    message: ""
  })

  const handleCloseDialog = () => {
    window.location.replace(RESERVATIONS)
  }

  const cardForm = {
    amount: price.toString(),
    autoMount: true,
    form: {
      id: "form-checkout",
      cardholderName: {
        id: "form-checkout__cardholderName",
        placeholder: "Titular do cartão",
      },
      cardholderEmail: {
        id: "form-checkout__cardholderEmail",
        placeholder: "E-mail",
      },
      cardNumber: {
        id: "form-checkout__cardNumber",
        placeholder: "Número do cartão",
      },
      cardExpirationDate: {
        id: "form-checkout__cardExpirationDate",
        placeholder: "Data de vencimento (MM/YYYY)",
      },
      securityCode: {
        id: "form-checkout__securityCode",
        placeholder: "Código de segurança",
      },
      installments: {
        id: "form-checkout__installments",
        placeholder: "Parcelas",
      },
      identificationType: {
        id: "form-checkout__identificationType",
        placeholder: "Tipo de documento",
      },
      identificationNumber: {
        id: "form-checkout__identificationNumber",
        placeholder: "Número do documento",
      },
      issuer: {
        id: "form-checkout__issuer",
        placeholder: "Banco emissor",
      },
    },
    callbacks: {
      onFormMounted: (error) => {
        if (error) return console.warn("Form Mounted handling error: ", error)
        console.log("Form mounted")
      },
      onSubmit: (event) => {
        event.preventDefault()
        const {
          paymentMethodId,
          issuerId,
          cardholderEmail: email,
          token,
          installments,
          identificationNumber,
          identificationType,
        } = mercadopago.cardForm(cardForm).getCardFormData()

        const data = {
          token,
          issuerId,
          paymentMethodId,
          transactionAmount: Number(price),
          installments: Number(installments),
          description: getDescription(),
          payer: {
            email,
            identification: {
              docType: identificationType,
              docNumber: identificationNumber,
            },
          },
        }
        mpApi.payNow(data).then((response) => {
          const { data } = response
          console.log("response", data)
            setPaymentResult(data)

          if (!data.hasOwnProperty("error_message")) {
            // setDialogData({
            //   message: strings[data.status][data.status_detail]
            // })
            setOpenDialog(true)
            
          } else {
            // setDialogData({
            //   message: strings[data.status][data.status_detail]
            // })
          }
        })
      },
      onFetching: (resource) => {
        console.log("Fetching resource: ", resource)

        // Animate progress bar
        const progressBar = document.querySelector(".progress-bar")
        progressBar.removeAttribute("value")

        return () => {
          progressBar.setAttribute("value", "0")
        }
      },
    },
  }

  useEffect(() => {
    mercadopago.cardForm(cardForm)
  }, [])

  useEffect(() => {
    if (paymentResult != undefined && paymentResult != null) {
      console.log(
        `component didMount ${
          paymentResult.status 
        } ${paymentResult.status_detail}`
      )
    }
  }, [paymentResult])

  const getDescription = (withBrand = false) => {
    let decription = withBrand ? "Agendamento Web - " : ""
    schedules.forEach((schedule, index) => {
      let name = schedule.procedure.name
      let date = new Date(schedule.selectedDate).toLocaleDateString()
      decription +=
        schedules.length != index + 1
          ? `${name} (${date}) , `
          : `${name} (${date})`
    })

    return decription
  }

  function cleanCardInfo() {
    document.getElementById("cardNumber").style.backgroundImage = ""
    document.getElementById("issuerInput").classList.add("hidden")
    document.getElementById("issuer").options.length = 0
    document.getElementById("installments").options.length = 0
  }

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
                <form id="form-checkout">
                  <h3 class="title">Suas informações</h3>
                  <div class="row">
                    <div class="form-group col">
                      <label for="email">E-Mail </label>
                      <TextField
                        required
                        id="form-checkout__cardholderEmail"
                        name="cardholderEmail"
                        defaultValue={userInfo.user.email}
                        type="text"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-sm-5">
                      <label for="docType">Tipo de documento</label>
                      <Select
                        native
                        required
                        id="form-checkout__identificationType"
                        name="identificationType"
                        type="text"
                        variant="outlined"
                      />
                    </div>
                    <div class="form-group col-sm-7">
                      <label for="docNumber">CPF</label>
                      <TextField
                        id="form-checkout__identificationNumber"
                        name="identificationNumber"
                        defaultValue="76185675900"
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
                        id="form-checkout__cardholderName"
                        name="cardholderName"
                        defaultValue="James Bernes Lee"
                        type="text"
                      />
                    </div>
                    <div class="form-group col-sm-4">
                      <label for="">Válido até</label>
                      <div class="input-group expiration-date">
                        <TextField
                          required
                          type="text"
                          defaultValue="12/2022"
                          id="form-checkout__cardExpirationDate"
                          name="cardExpirationDate"
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div class="form-group col-sm-8">
                      <label for="cardNumber">Número do cartão</label>
                      <TextField
                        required
                        type="text"
                        id="form-checkout__cardNumber"
                        name="cardNumber"
                        defaultValue="6062826786276634"
                        autoComplete="off"
                      />
                    </div>
                    <div class="form-group col-sm-4">
                      <label for="securityCode">CVV</label>
                      <TextField
                        id="form-checkout__securityCode"
                        required
                        defaultValue="123"
                        name="securityCode"
                        autoComplete="off"
                      />
                    </div>
                    <div id="issuerInput" class="form-group col-sm-12 hidden">
                      <label for="issuer">Issuer</label>
                      <Select
                        native
                        id="form-checkout__issuer"
                        name="issuer"
                        class="form-control"
                      />
                    </div>
                    <div class="form-group col-sm-12">
                      <label for="installments">Parcelas</label>
                      <Select
                        native
                        type="text"
                        id="form-checkout__installments"
                        variant="outlined"
                      />
                    </div>
                    <div class="form-group col-sm-12">
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
                      <progress value="0" class="progress-bar">
                        Carregando...
                      </progress>
                      <br />
                      <button
                        type="submit"
                        id="form-checkout__submit"
                        class="btn btn-primary btn-block"
                      >
                        Pagar
                      </button>
                      <br />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Dialog
            open={isDialogOpen}
            handelCloseDialog={handleCloseDialog}
            description={ 
                "dialogData.message "
            }
            dialogActions={
              <Button onClick={handleCloseDialog} color="primary">
                Fechar
              </Button>
            }
          />
        </section>
      </main>
    </>
  )
}

export default MercadoLivreCardForm
