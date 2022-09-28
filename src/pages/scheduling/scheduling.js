import React, { useEffect } from "react"
import styled from "styled-components"
import { Grid, Card as MaterialCard } from "@material-ui/core"
import { Content, H2 } from "ui"
import { SCHEDULE, RESERVATIONS } from "routes"
import { Link } from "react-router-dom"
const Scheduling = () => {
  useEffect(() => {}, [])

  return (
    <MainContent>
      <Grid direction="column" container spacing={6}>
        <Grid item xs={12}>
          <MainTitle>Agendamento online</MainTitle>
        </Grid>
        <Grid item xs={12}>
          <Grid direction="row" container justifyContent="center" wrap="nowrap">
            <BigButton to={SCHEDULE}>Agendar</BigButton>
            <BigButton backgroundcolor="#34425a" to={RESERVATIONS}>
              Reservas
            </BigButton>
          </Grid>
        </Grid>
      </Grid>
    </MainContent>
  )
}

const BigButton = styled(Link)`
  align-items: center;
  background-color: ${({ theme, backgroundcolor }) =>
    backgroundcolor || theme.palette.primary.main};
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
  align-content: space-around;
  padding-top: ${({ theme }) => theme.spacing(15)}px;
  background: linear-gradient(
      rgba(254, 254, 254, 0.3),
      rgba(254, 254, 254, 0.3)
    ),
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

  @media (max-width: 600px) {
    padding-top: ${({ theme }) => theme.spacing(5)}px;
  }
`

const MainTitle = styled(H2)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-family: ${({ theme }) => theme.typography.subtitle2.fontFamily};
  font-weight: ${({ theme }) => theme.typography.subtitle2.fontWeight};
  line-height: ${({ theme }) => theme.typography.subtitle2.lineHeight};
  letter-spacing: ${({ theme }) => theme.typography.subtitle2.letterSpacing};
  text-shadow: rgba(0, 0, 0, 0.4) 0px 1px 1px;

  @media (max-width: 600px) {
    font-size: 3rem;
  }
`

export default Scheduling
