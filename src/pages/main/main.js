import React, { Suspense } from 'react'
import {
  withStyles
} from '@material-ui/core'
import Header from './header'
import { Switch, Route } from 'react-router-dom'

import { Footer } from 'ui'
import { HOME, SCHEDULE, RESERVATIONS, MORE } from 'routes'

const Scheduling = React.lazy(
  () => import('pages/scheduling')
)

const Reservations = React.lazy(
  () => import('pages/reservations')
)
const Schedule = React.lazy(
  () => import('pages/schedule')
)

const Main = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Suspense fallback='Loading'>
        <Switch>
          <Route path={HOME} exact component={Scheduling} />
          <Route path={SCHEDULE} component={Schedule} />
          <Route path={RESERVATIONS} component={Reservations} />
          <Route path={MORE} component={Scheduling} />
        </Switch>
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
