import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  Grid,

} from '@material-ui/core'
import { Content, PaperContainer, TextField, H5 } from 'ui'
import { useDatabase } from 'hooks'

function ProceduresList () {

  const { professionals, fetchProfessionals } = useDatabase()

  useEffect(() => {
    fetchProfessionals()
    console.log(professionals)

  }, [])


  return (
    <Content>
      <Grid container spacing={4}>
        <Grid item xs={12}>

          <PaperContainer>
            <H5>Adicionar</H5>
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

export default ProceduresList
