import {
  Card as MaterialCard,
  CardActions,
  CardContent as MaterialCardContent,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core"
import { DeleteSharp } from "@material-ui/icons"
import { useAuth, useShoppingCart } from "hooks"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { SCHEDULE } from "routes"
import styled from "styled-components"
import { Button, Content, H6, Modal, Spacer } from "ui"
import { toMoney } from "utils"
import MercadoLivreCardForm from "./mercado-livre-form"
function Checkout() {

  const location = useLocation()

  const {
    schedules,
    fetchLocalSchedules,
    removeScheduleFromShoppingCart,
  } = useShoppingCart()

  const { userInfo } = useAuth()

  useEffect(() => {
   fetchLocalSchedules()
  }, [])

  useEffect(() => {
    const pathname = location.pathname
    document.title = pathname.substring(
      pathname.lastIndexOf("/") + 1,
      pathname.length
    )

    console.log(`SCHEDULES`, schedules)
  }, [schedules])

  const getPrice = () => {
    let total = 0
    let payment = 0
    const percentage = 30
    schedules?.forEach((schedule) => {
      const currentPrice = parseFloat(schedule.professional.price)
      total += currentPrice
      console.log(currentPrice)
    })
    payment = (percentage / 100) * total
    payment = parseFloat(payment.toFixed(2))
    return {
      total,
      payment,
      percentage,
    }
  }

  const removeSchedule = (schedule) => () => {
    removeScheduleFromShoppingCart(schedule)
  }

  const [open, setModalOpen] = useState(false)
  const handleOpenCloseModal = () => {
    setModalOpen(!open)
  }

  return (
    <Content>
      <Grid container justify="center">
        { schedules.length > 0 &&  <Grid item sm={8} lg={6} md={6} xs={12}>
          <Grid container>
            {schedules?.map((schedule, index) => (
              <Card key={index}>
                <CardContent className="first-card-content">
                  <CardText variant="subtitle1">
                    {new Date(schedule.selectedDate).toLocaleDateString(
                      "pt-BR",
                      { weekday: "short" }
                    )}
                  </CardText>
                  <CardText noWrap variant="h5">
                    {new Date(schedule.selectedDate).getDate()}
                    <CardText noWrap variant="caption">
                      {" "}
                      de{" "}
                      {new Date(schedule.selectedDate).toLocaleDateString(
                        "pt-BR",
                        { month: "short" }
                      )}
                    </CardText>
                  </CardText>

                  <CardText variant="subtitle1">
                    {schedule.selectedTime}
                  </CardText>
                </CardContent>
                <CardContent className="card-info">
                  <CardText variant="h6" noWrap>
                    {schedule.procedure.name}
                  </CardText>
                  <CardText variant="subtitle1" noWrap>
                    {schedule.professional.name}
                  </CardText>
                  <CardText variant="subtitle1">
                    {toMoney(schedule.professional.price)}
                  </CardText>
                </CardContent>
                <CardContent className="card-action">
                  <CardActions>
                    <IconButton onClick={removeSchedule(schedule)}>
                      <DeleteSharp />
                    </IconButton>
                  </CardActions>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Spacer />
          <Grid item xs={12}>
            <Grid container justify="center">
              <Button to={`/${SCHEDULE}`} variant="outlined" color="primary">
                Adicionar outro serviço
              </Button>
            </Grid>
            <Spacer />
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={6}>
                  <Typography variant="body2" noWrap>
                    TOTAL
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" variant="body2" noWrap>
                    {toMoney(getPrice().total)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={6}>
                  <Typography variant="body1" noWrap>
                    Você pagará
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right" variant="body1" noWrap>
                    {toMoney(getPrice().payment)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Spacer />
            <Typography variant="h5" noWrap>
              Pagamento
            </Typography>
            <Spacer />
            <FormControl>
              <RadioGroup>
                <FormControlLabel
                  value="card"
                  checked
                  control={<Radio color="secondary" />}
                  label="Cartão de crédito"
                />
                {/* <FormControlLabel
                  value="spot"
                  control={<Radio color="secondary" />}
                  label="Pagamento no local"
                />
                <FormControlLabel
                  value="bank-slip"
                  control={<Radio color="secondary" />}
                  label="Boleto"
                /> */}
              </RadioGroup>
            </FormControl>
            <Spacer />
            <Grid container justify="center">
              <Modal isOpen={open} handleOpenClose={handleOpenCloseModal}>
                <MercadoLivreCardForm
                  schedules={schedules}
                  price={getPrice().payment}
                  userInfo={userInfo}
                  handleCloseModal={handleOpenCloseModal}
                />
              </Modal>
              <Spacer />
              <Spacer />
            </Grid>
          </Grid>
        </Grid>}
        {schedules.length === 0 && (
          <Grid  item justify="center" >
          <H6>O carrinho está vazio.</H6>  
          <Button to={`/${SCHEDULE}`} variant="outlined" color="primary">
            Adicionar um serviço
          </Button>
        </Grid>
        )}
      </Grid>
    </Content>
  )
}

const Card = styled(MaterialCard)`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border-left: 5px solid ${({ theme }) => theme.palette.primary.light};
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`
const CardContent = styled(MaterialCardContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  padding-left: ${({ theme }) => theme.spacing(1)}px;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
  padding-top: 0px;
  padding-bottom: 0px;

  &&.first-card-content {
    border-right: 2px solid #111;
  }

  &&.card-info {
    max-width: 58%;
  }

  &&.card-action {
    flex-grow: 1;
    align-items: flex-end;
    justify-content: center;
  }
`

const CardText = styled(Typography)`
  max-width: 100%;
  width: 100%;
`

export default Checkout
