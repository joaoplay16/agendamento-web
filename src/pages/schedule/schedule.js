import React from 'react'
import styled from 'styled-components'
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Grid
} from '@material-ui/core'
import {
  Content,
} from 'ui'
import procedures from 'fake-data/procedures'
const Scheduling = () => {

  return (
    <Content>
      <Grid container alignItems='align-content-xs-center' justify='justify-xs-center'>
        <List component='nav'>
          {procedures.map((procedure) => (
            <>
              <ListItem
                alignItems="flex-center"
                key={procedure.id}>
                <ListItemText
                  primary={procedure.name}
                  secondary={`${procedure.time} min`} />
                <Button variant='outlined' color='primary'>Reservar</Button>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Grid>
    </Content>
  )
}



export default Scheduling