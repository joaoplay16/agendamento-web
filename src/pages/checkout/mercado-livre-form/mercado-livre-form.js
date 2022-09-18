import {
  Select,
  Button,
  Grid,
  FormLabel,
  FormGroup,
  Chip,
  Typography,
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { Dialog, PaperContainer, TextField, H5, Divider } from "ui"
import { useDatabase, useShoppingCart } from "hooks"
import * as mpApi from "services/mercadopago-api"
import { RESERVATIONS, CHECKOUT } from "routes"
import strings from "strings/mercadopago-response"
import { toMoney, getPaymentStatusMessage } from "utils"
const MercadoLivreCardForm = ({ schedules, price, userInfo }) => {
  let mercadopago = new MercadoPago(process.env.REACT_APP_MP_PUBLISHABLE_KEY)

  const { setPaymentStatusDetails, resetShoppingCart } = useShoppingCart()
  const { submitSchedule } = useDatabase()

  const [isDialogOpen, setOpenDialog] = useState(false)
  const [paymentResult, setPaymentResult] = useState(null)
  const [dialogData, setDialogData] = useState({
    success: false,
    title: null,
    message: null,
  })

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

        setDialogData((prevState) => ({
          ...prevState,
          message: "aguarde...",
        }))
        setOpenDialog(true)

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

        mpApi
          .payNow(data)
          .then((response) => {
            const { data } = response
            setPaymentResult(data)

            const errorCodes = strings.errorCodes

            //if true has a json data of payment result
            const dataStatus = data.status
            //if true has a json data of payment processing
            if (data.status != 400 && !data.hasOwnProperty("cause")) {
              const success = ["approved", "in_process"].includes(dataStatus)

              const paymentStatus = getPaymentStatusMessage(dataStatus)

              setDialogData({
                title: paymentStatus,
                success: success,
                message: strings[data.status][data.status_detail],
              })

              const { uid, displayName, photoURL, email } = userInfo.user

              submitSchedule({
                userId: uid,
                userName: displayName,
                userPhoto: photoURL,
                userEmail: email,
                schedules: getFilteredSchedules(),
                paymentInfo: data,
              }).then(res => {
                console.log("SALVOU", res);
              })
            } else {
              //json error data
              const responseErrorCode =
                data.cause[0].code !== undefined ? data.cause[0].code : 0

              setDialogData({
                title: `Erro ${responseErrorCode}`,
                success: false,
                message: errorCodes[responseErrorCode],
              })
            }
          })
          .catch((error) => {
            setDialogData({
              title: `${error}`,
              success: false,
              message: "Erro ao conectar api de pagamentos",
            })
          })
      },
      onFetching: (resource) => {
        // console.log("Fetching resource: ", resource)
        // // Animate progress bar
        // const progressBar = document.querySelector(".progress-bar")
        // progressBar.removeAttribute("value")
        // return () => {
        //   progressBar.setAttribute("value", "0")
        // }
      },
    },
  }

  useEffect(() => {
    mercadopago.cardForm(cardForm)
  }, [])

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

  const getFilteredSchedules = () =>
    schedules.map((schedule) => ({
      procedure: {
        id: schedule.procedure.id,
        name: schedule.procedure.name,
        time: schedule.procedure.time,
      },
      professional: {
        id: schedule.professional.id,
        name: schedule.professional.name,
        photo: schedule.professional.photo,
        price: parseFloat(schedule.professional.price),
      },
      scheduleDate: schedule.selectedDate,
      scheduleTime: schedule.selectedTime,
      
    }))

  const handleCloseDialog = () => {
    if (dialogData.title !== null) {
      setOpenDialog(false)
      if (!dialogData.success) {
        // window.location.replace(CHECKOUT)
      } else {
        window.location.replace(RESERVATIONS)
        // resetShoppingCart()
      }
      setDialogData({
        success: false,
        title: "",
        message: "",
      })
    }
  }

  return (
    <>
      <PaperContainer>
        <form id="form-checkout">
          <H5>Pagamento no cartão</H5>

          <Grid container alignItems="center" direction="column" spacing={1}>
            {schedules.map((schedule, index) => {
              let name = schedule.procedure.name
              let date = new Date(schedule.selectedDate).toLocaleDateString()
              let description =
                schedules.length != index + 1
                  ? `${name} (${date}) , `
                  : `${name} (${date})`

              return (
                <Grid item>
                  <Chip color="primary" label={description} size="small" />
                </Grid>
              )
            })}

            <Grid item style={{ marginTop: 5 }}>
              <Typography>Total: {toMoney(price)}</Typography>
            </Grid>
            <Divider />
          </Grid>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}>
            <Grid item md={3} sm={3} xs={12}>
              <FormLabel for="docType">E-mail</FormLabel>
              <TextField
                required
                id="form-checkout__cardholderEmail"
                name="cardholderEmail"
                defaultValue={userInfo.user.email}
                type="text"
              />
            </Grid>
            <Grid item md={6} sm={7} xs={12}>
              <FormLabel>Documento</FormLabel>
              <FormGroup row>
                <Select
                  native
                  id="form-checkout__identificationType"
                  name="identificationType"
                  variant="outlined"
                  defaultValue={"CPF"}
                />

                <TextField
                  id="form-checkout__identificationNumber"
                  name="identificationNumber"
                  defaultValue="76185675900"
                  type="text"
                  sm
                  xs
                />
              </FormGroup>
            </Grid>
            <Grid item md={6} sm={6} xs>
              <FormLabel>Nome do proprietário do cartão</FormLabel>
              <TextField
                required
                id="form-checkout__cardholderName"
                name="cardholderName"
                defaultValue="James Bernes Lee"
                type="text"
              />
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
              <FormLabel>Válido até</FormLabel>
              <TextField
                required
                type="text"
                defaultValue="12/2022"
                id="form-checkout__cardExpirationDate"
                name="cardExpirationDate"
                autoComplete="off"
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <FormLabel>Número do cartão</FormLabel>
              <TextField
                required
                type="text"
                id="form-checkout__cardNumber"
                name="cardNumber"
                defaultValue="6062826786276634"
                autoComplete="off"
              />
            </Grid>
            <Grid item md={1} sm={4} xs={12}>
              <FormLabel>CVV</FormLabel>
              <TextField
                id="form-checkout__securityCode"
                required
                defaultValue="123"
                name="securityCode"
                autoComplete="off"
              />
            </Grid>
            <div id="issuerInput" class="form-group col-sm-12 hidden">
              <Select
                native
                id="form-checkout__issuer"
                name="issuer"
                hidden
                class="form-control"
              />
            </div>
            <Grid item md={4} sm={5} xs={12}>
              <FormLabel>Parcelas</FormLabel>
              <FormGroup row>
                <Select
                  native
                  type="text"
                  id="form-checkout__installments"
                  variant="outlined"
                  fullWidth
                />
              </FormGroup>
            </Grid>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center">
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                id="form-checkout__submit">
                Pagar
              </Button>
            </Grid>
            <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
            <input type="hidden" name="description" id="description" />
            {/* <progress value="0" class="progress-bar">
              Carregando...
            </progress> */}
          </Grid>

          <Dialog
            open={isDialogOpen}
            handelCloseDialog={handleCloseDialog}
            title={dialogData.title}
            description={dialogData.message}
            dialogActions={
              <Button onClick={handleCloseDialog} color="primary">
                Fechar
              </Button>
            }
          />
        </form>
      </PaperContainer>
    </>
  )
}

export default MercadoLivreCardForm
