import React from 'react'
import { Grid } from '@material-ui/core'
import t from 'prop-types'
const HeaderContent = ({ children }) => {
  return (
    <>
      <Grid container direction='column' alignItems='center'>
        {children}
      </Grid>
    </>
  )
}

HeaderContent.propTypes = {
  children: t.node.isRequired
}

export default HeaderContent
