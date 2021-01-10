import React, { Suspense } from 'react'
import {
  withStyles
} from '@material-ui/core'
import Header from './header'
import { Switch, Route } from 'react-router-dom'

import * as routes from 'routes'
import { Footer } from 'ui'

const Scheduling = React.lazy(
  () => import('pages/scheduling')
)

const Schedule = React.lazy(
  () => import('pages/schedule')
)

const ChooseProfessional = React.lazy(
  () => import('pages/choose-professional')
)

const ChooseDate = React.lazy(
  () => import('pages/choose-date')
)

const Checkout = React.lazy(
  () => import('pages/checkout')
)

const Main = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Suspense fallback='Loading'>
        <Switch>
          <Route path={routes.HOME} exact component={Scheduling} />
          <Route path={routes.RESERVATIONS} component={Scheduling} />
          <Route path={routes.SCHEDULE} component={Schedule} />
          <Route path={routes.CHOOSE_PROFESSIONAL} component={ChooseProfessional} />
          <Route path={routes.CHOOSE_DATE} component={ChooseDate} />
          <Route path={routes.CHECKOUT} component={Checkout} />
          <Route path={routes.MORE} component={Scheduling} />
        </Switch>
      </Suspense>
    <Footer/>
    <Spacer />

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
