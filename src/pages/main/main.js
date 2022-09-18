import React, { Suspense } from 'react'
import {
  withStyles
} from '@material-ui/core'
import Header from './header'
import { Outlet } from 'react-router-dom'
import { Footer } from 'ui'
import { ROOT, SCHEDULE, RESERVATIONS, MORE } from 'routes'

const Scheduling = React.lazy(() => import("pages/scheduling"))
const Reservations = React.lazy(() => import("pages/reservations"))
const Schedule = React.lazy(() => import("pages/schedule"))

const Main = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Suspense fallback='Loading'>
        <Outlet/>
      </Suspense>
      <Footer />
    </>
  )
}

const style = (theme) => ({
  main: theme.mixins.toolbar
})

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))

export default Main
