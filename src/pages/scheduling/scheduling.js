import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Grid as MaterialGrid, Card as MaterialCard } from '@material-ui/core'
import { CardLink, Content, H3, H4,H5, HeaderContent, Button } from 'ui'
import { SCHEDULE, RESERVATIONS } from 'routes'
import { Link } from 'react-router-dom'
import pay from 'services/mercadopago'
const Scheduling = () => {
  useEffect(()=>{
    // pay()
  },[])
  return (
    <MainContent>
      <Grid
        direction='column'
        container spacing={6}
      >
        <Grid item xs={12}>
          <MainTitle>Agendamento online</MainTitle>
        </Grid>
        <Grid item xs={12}>
          <ButtonsContainer
            direction='row'
            container
            justify='center'>
            <BigButton to={SCHEDULE}>Agendar</BigButton>
            <BigButton backgroundColor='#34425a' to={RESERVATIONS}>Reservar</BigButton>
          </ButtonsContainer>
        </Grid>
      </Grid>
    </MainContent>
  )
}

const BigButton = styled(Link)`
  align-items: center;
  background-color: ${({theme, backgroundColor}) => 
    backgroundColor ? backgroundColor : theme.palette.primary.main};
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  height: 110px;
  justify-content: center;
  margin-right: 5px;
  text-decoration: none;
  text-transform: uppercase;
  width: 180px;
`

const MainContent = styled(Content)`
display: flex;
align-content: space-around;
padding-top: ${({theme}) => theme.spacing(15)}px;
background: linear-gradient(rgba(254,254,254,0.3),rgba(254,254,254,0.3)),
               url(https://cdn.pixabay.com/photo/2018/09/24/15/54/background-3700256_960_720.jpg);
  /* Background image is centered vertically and horizontally at all times */
  background-position: center center;
  /* Background image doesn't tile */
  background-repeat: no-repeat;
  /* Background image is fixed in the viewport so that it doesn't move when 
     the content's height is greater than the image's height */
  background-attachment: fixed;
  /* This is what makes the background image rescale based
     on the container's size */
  background-size: cover;
  /* Set a background color that will be displayed
     while the background image is loading */
`

const MainTitle = styled(H4).attrs({
  display: 'noWrap'
})`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-family: ${({ theme }) => theme.typography.subtitle2.fontFamily};
  font-weight: ${({ theme }) => theme.typography.subtitle2.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
  letter-spacing: ${({ theme }) => theme.typography.subtitle2.letterSpacing};
  text-shadow: rgba(0, 0, 0, 0.4) 0px 1px 1px;
`

const Grid = styled(MaterialGrid)`
  flex-wrap: nowrap;
`

const ButtonsContainer =styled(MaterialGrid)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-wrap: nowrap;
`

const Card = styled(MaterialCard).attrs({
  variant: 'outlined',
})`
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  background-color: ${({ backgroundColor }) => backgroundColor}; 
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  min-width: 180px;
`


export default Scheduling