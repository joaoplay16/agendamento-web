import React from "react"
import styled from "styled-components"
import {
  Card as MaterialCard,
  CardContent as MaterialCardContent,
  CardActions,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core"

import { Content } from "ui"
import { useDatabase } from "hooks"
import { toMoney, getPercentage } from "utils"
import { useEffect } from "react"
import { useAuth } from "hooks"

const Reservations = () => {
  const { userSchedules, fetchUserSchedules } = useDatabase()

  const { userInfo } = useAuth()

  useEffect(() => {
    fetchUserSchedules(userInfo)
    console.log(getPercentage(30, 100));
  }, [])

  useEffect(() => {
  }, [userSchedules])

  return (
    <Content>
      <Grid container justify="center">
        <Grid item sm={10} lg={8} md={6} xs={12}>
          <Grid container>
            {userSchedules.map((us, index) => {
            {return us.schedules.map(schedule => (
              <Card key={schedule.scheduleDate.toMillis()}>
                <CardContent className="card-info">
                  <CardText variant="inherit">
                    {new Date(schedule.scheduleDate.toMillis()).toLocaleDateString(
                      "pt-BR",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}{" "}
                    - {schedule.scheduleTime}
                  </CardText>
                  <CardText variant="subtitle1">
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
                    <CardText variant="body1" noWrap>
                      {us.paymentInfo.status} 
                    </CardText>
                    <CardText variant="body2" noWrap>
                      sinal {toMoney(getPercentage(schedule.professional.price))}
                    </CardText>
                    <CardText variant="body2" noWrap>
                      restante {toMoney(schedule.professional.price - getPercentage(schedule.professional.price))}
                    </CardText>
                </CardContent>
              </Card>
              ))}
            })}
          </Grid>
        </Grid>
      </Grid>
    </Content>
  )
}
const Card = styled(MaterialCard)`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  border-left: 5px solid cyan;
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

export default Reservations
