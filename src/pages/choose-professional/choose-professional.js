import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  List as MaterialList,
  ListItem,
  ListItemText,
  Divider,
  Button as MaterialButton,
  Grid as MaterialGrid,
  InputLabel,
  Typography
} from '@material-ui/core'
import mockProfessionals from 'fake-data/professionals'
import { toMoney } from 'utils/index'
const Scheduling = ({ location }) => {
  const [professionals, setProfessionals] = useState(() => [])
  const { procedure } = location.state

  useEffect(() => {
    const professionalPrices = Object.keys(procedure.price)
    const result = professionalPrices.map((professionalID) => ({
      ...mockProfessionals[professionalID],
      price: procedure.price[professionalID]
    }))
    setProfessionals(result)
  }, [])

  useEffect(() => {

    console.log("professionals", professionals)
  })

  return (
    <ProfessionalsContainer>
      <Grid>
        <Typography variant='h4'>{procedure.name}</Typography>
        <List component='nav'>
          {professionals.map((professional) => (
            <ListItem
              alignItems="flex-center"
            >
              <ListItemText
                primary={professional.name}
                secondary={toMoney(professional.price)}
                />

              <Button
                variant='outlined'
                color='primary'>
                Escolher
                  </Button>
            </ListItem>
          ))}
        </List>
      </Grid>
    </ProfessionalsContainer>
  )
}

const Button = styled(Link).attrs({
  component: MaterialButton
})`
`

const ProfessionalsContainer = styled.main`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

const Grid = styled(MaterialGrid).attrs({
  container: true,
  xs: 12,
  sm: 8
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const List = styled(MaterialList)`
  width: 100%;
`

export default Scheduling