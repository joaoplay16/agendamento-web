import React from 'react'
import { Grid, TextField as MaterialTextField } from '@material-ui/core'

function TextField ({ xs, sm, md, lg, autoFocus, ...props }) {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <MaterialTextField
        fullWidth
        variant='outlined'
        inputProps={{
          autoFocus
        }}
        {...props}
      />
    </Grid>
  )
}

export default TextField
