import React from 'react'

import { Switch, Route } from 'react-router-dom'

import * as routes from 'routes'

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

const Intermediate = () => {
  
  return (
    <>
        <Switch>
          <Route exact path={routes.SCHEDULE} component={Schedule} />
          <Route path={routes.CHOOSE_PROFESSIONAL} component={ChooseProfessional} />
          <Route path={routes.CHOOSE_DATE} component={ChooseDate} />
          <Route path={routes.CHECKOUT} component={Checkout} />
        </Switch>
    </>
  )
}

export default Intermediate
