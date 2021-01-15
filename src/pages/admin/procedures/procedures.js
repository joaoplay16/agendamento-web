import React from 'react'
import styled from 'styled-components'
import {
  Button,
  Grid,
 
} from '@material-ui/core'
import { Content, PaperContainer, TextField, H5 } from 'ui'
import weekDays from 'static-data/week-days'
function Procedures () {
  return (
    <Content>
      <Grid container spacing={4}>
        <Grid item xs={12}>

          <PaperContainer>
            <Grid container spacing={1}>
              <TextField variant='outlined' label='Nome' sm={9} xs={12} />
              <TextField variant='outlined' label='Tempo' sm={3} xs={4} />
            </Grid>
            <H5>preços</H5>
           
          </PaperContainer>
        </Grid>

      </Grid>
    </Content>
  )
}

export default Procedures
