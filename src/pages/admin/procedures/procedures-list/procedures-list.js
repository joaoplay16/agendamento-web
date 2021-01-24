import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  Grid,
 
} from '@material-ui/core'
import { Content, PaperContainer, TextField, H5, Button } from 'ui'
import { ADMIN_PROCEDURES_ADD } from 'routes'
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
