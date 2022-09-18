import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  List as MaterialList,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button as MaterialButton,
  Grid as MaterialGrid,
  TextField as MaterialTextField,
  InputLabel
} from '@material-ui/core'

import mockProcedures from 'fake-data/procedures'
import { Link } from 'react-router-dom'
import { CHOOSE_PROFESSIONAL } from 'routes'
import accentRemove from 'utils/accent-remove'
import { useDatabase } from 'hooks'

const ChooseProcedure = () => {
  const { procedures: fetchedProcedures, fetchProcedures } = useDatabase()
  const [procedures, setProcedures] = useState(() => [])

  useEffect(() => {
    fetchProcedures()
  }, [])

  useEffect(() => {
    setProcedures(fetchedProcedures)
    console.log('procedimentos', fetchedProcedures)
  }, [fetchedProcedures])

  const handleSearch = (e) => {
    let procedureName = accentRemove(e.target.value)
    procedureName = procedureName.replace(/[^\w\s]+/g, '') // remove symbols
    const regex = new RegExp(procedureName, 'ig')
    const result = fetchedProcedures.filter((procedure) => {
      const match = accentRemove(procedure.name).search(regex) > -1
      return match
    })
    setProcedures(result)
  }

  return (
    <ProcedureContainer>
      <Grid container justify='center' style={{ padding: 10 }}>
        <InputLabel>Escolha um serviço</InputLabel>
        <TextField
          label='Buscar'
          variant='outlined'
          onChange={handleSearch}
        />
      </Grid>
      <Grid>
        <List element='nav'>
          {procedures.map((procedure) => (
            <>
              <ListItem
                alignItems='center'
                key={procedure.id}
              >
                <ListItemText
                  primary={procedure.name}
                  secondary={`${procedure.time}`}
                />
                <ListItemSecondaryAction>
                  <Button
                    to={{
                      pathname: CHOOSE_PROFESSIONAL,
                      state: { procedure }
                    }}
                    variant='outlined'
                    color='primary'
                    size='small'
                  >
                    Reservar
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Grid>
    </ProcedureContainer>
  )
}

const Button = styled(MaterialButton).attrs({
  component: Link
})`
`

const ProcedureContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  margin-bottom: ${({ theme }) => theme.spacing(8)}px;
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
const TextField = styled(MaterialTextField)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

export default ChooseProcedure
