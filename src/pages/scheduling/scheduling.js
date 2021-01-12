import React from 'react'
import styled from 'styled-components'
import { Grid as MaterialGrid, Card as MaterialCard } from '@material-ui/core'
import { CardLink, Content, H3, H5, HeaderContent } from 'ui'
import { SCHEDULE, RESERVATIONS } from 'routes'

const Scheduling = () => {
  return (
      <MainContent>
        <HeaderContent>
          <MainTitle>Agendamento online</MainTitle>
        </HeaderContent>
        <Grid container justify='flex-end'>
          <Card backgroundColor="#1db198">
            <CardLink to={SCHEDULE}>
              <H5>AGENDAR</H5>
            </CardLink>
          </Card>
          <Card backgroundColor="#34425a">
            <CardLink to={RESERVATIONS} >
              <H5>RESERVAS</H5>
            </CardLink>
          </Card>
        </Grid>
      </MainContent>
  )
}

const MainContent = styled(Content)`
background: linear-gradient(rgba(254,254,254,0.3),rgba(254,254,254,0.3)),
               url(https://instagram.fthe11-1.fna.fbcdn.net/v/t51.2885-15/e35/89358927_2375870306038400_6794170017724109574_n.jpg?_nc_ht=instagram.fthe11-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=irBfJ7yRFKAAX8lZSYL&tp=1&oh=9a609413d9c850f6e9e848e2a7217e14&oe=60254AC7);
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
position: relative;
`

const MainTitle = styled(H3)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-family: ${({ theme }) => theme.typography.subtitle2.fontFamily};
  font-weight: ${({ theme }) => theme.typography.subtitle2.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
  letter-spacing: ${({ theme }) => theme.typography.subtitle2.letterSpacing};
  text-shadow: rgba(0, 0, 0, 0.4) 0px 1px 1px;
`

const Grid = styled(MaterialGrid)`
  margin-top: ${({ theme }) => theme.spacing(7)}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
`

const Card = styled(MaterialCard).attrs({
  variant: 'outlined',
})`
  align-items: center;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  background-color: ${({ backgroundColor }) => backgroundColor}; 
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  min-width: 180px;
`


export default Scheduling