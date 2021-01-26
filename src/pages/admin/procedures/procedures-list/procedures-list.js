import {
  Grid
} from '@material-ui/core'
import React from 'react'
import { ADMIN_PROCEDURES_ADD } from 'routes'
import { Button, Content, H5, PaperContainer } from 'ui'
function ProceduresList () {

  

  return (
    <Content>
      <Grid container spacing={4}>
        <Grid item xs={12}>

          <PaperContainer>
            <H5>Procedimentos</H5>
            <Button variant='contained' color='secondary' to={ADMIN_PROCEDURES_ADD}>ADD</Button>
          </PaperContainer>
        </Grid>

      </Grid>
    </Content>
  )
}

export default ProceduresList
