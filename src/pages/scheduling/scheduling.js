import React from 'react'
import styled from 'styled-components'
import { Grid as MaterialGrid, Card as MaterialCard } from '@material-ui/core'
import { CardLink, Content, Footer, H3, H4, H5, HeaderContent } from 'ui'

const Scheduling = () => {

  return (
    <>
    <Content style={{ marginTop: 50 }}>
      <HeaderContent>
        <MainTitle>Agendamento <br /> online</MainTitle>
      </HeaderContent>
      <Grid >
        <Card backgroundColor="#1db198">
          <CardLink to='/'>
            <H5>AGENDAR</H5>
          </CardLink>
        </Card>
        <Card backgroundColor="#34425a">
          <CardLink to='/checkout' >
            <H5>RESERVAS</H5>
          </CardLink>
        </Card>
      </Grid>
    </Content>
    </>
  )
}

const MainTitle = styled(H3)`
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
`


export default Scheduling