import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { Content } from 'ui'
import { useShoppingCart } from 'hooks'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}))

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function FullScreenDialog ({ children, isOpen, handleOpenClose }) {
  const classes = useStyles()
  const { paymentDetails } = useShoppingCart()

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleOpenClose}>
        Concluir agendamento
      </Button>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleOpenClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleOpenClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Fechar
            </Typography>
          </Toolbar>
        </AppBar>
        <Content>
          {children}
        </Content>
      </Dialog>
    </div>
  )
}
