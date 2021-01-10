import React, { useEffect } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import {
  Grid,
  Card as MaterialCard,
  CardContent as MaterialCardContent,
  CardActions,
  Paper,
  Typography,
  IconButton
} from '@material-ui/core'
import {
  DeleteSharp
} from '@material-ui/icons'
import {
  Content
} from 'ui'
import { useShoppingCart } from 'hooks'
import { singularOrPlural, toMoney } from 'utils'
function Checkout ({ location }) {
  const { schedules } = useShoppingCart()

  useEffect(() => {
    console.log('schedules', schedules)
    document.title = location.pathname.replace(/^\//, '')
  }, [])

  return (
    <Content>
      <Grid container justify='center'>
        <Grid item sm={8} lg={6} md={6} xs={12}>
          <Grid container spacing={2}>
            {schedules.map((order) => (
              <Card>
                <CardContent className='first-card-content'>
                  <CardText variant='subtitle1'>
                    {new Date(order.selectedDate)
                      .toLocaleDateString('pt-BR', {weekday: 'short'})}
                    </CardText>
                  <CardText variant='h5'>
                    {format(new Date(order.selectedDate), 'dd')}
                    </CardText>
                  <CardText variant='subtitle1'>{order.selectedTime}</CardText>
                </CardContent>
                <CardContent className='card-info'>
                  <CardText variant='h6' noWrap>{order.procedure.name}</CardText>
                  <CardText variant='subtitle1' noWrap>{order.professional.name}</CardText>
                  <CardText variant='subtitle1' >{toMoney(order.professional.price)}</CardText>
                </CardContent>
                <CardContent className='card-action'>
                  <CardActions>
                    <IconButton >
                      <DeleteSharp />
                    </IconButton>
                  </CardActions>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Content>
  )
}

const Card = styled(MaterialCard)`
  display: flex;
  flex-direction: row;
  flex-grow:1;
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
  padding-right: ${({ theme }) => theme.spacing(1)}px;
  padding-top: 0px;
  padding-bottom: 0px;

  &&.first-card-content{
    border-right: 2px solid #111;
  }

  &&.card-info{
    max-width: 58%;
  }

  &&.card-action{
    flex-grow: 1;
    align-items: flex-end;
    justify-content: center;
  }
`

const CardText = styled(Typography)`
  max-width: 100%;
  width: 100%;
`

const PaperContainer = styled(Paper)`
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export default Checkout
