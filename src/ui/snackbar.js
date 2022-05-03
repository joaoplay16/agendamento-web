import React from 'react'
import { Snackbar as MaterialSnackbar, Slide } from '@material-ui/core'

function SlideTransition (props) {
  return <Slide {...props} direction='up' />
}

const Snackbar = (props) =>
  (
    <MaterialSnackbar
      {...props}
      TransitionComponent={SlideTransition}
    >
      {props.children}
    </MaterialSnackbar>
  )

export default Snackbar
