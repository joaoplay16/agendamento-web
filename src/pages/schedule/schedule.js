import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { 
  SCHEDULE,
  CHOOSE_DATE,
  CHOOSE_PROFESSIONAL,
  CHECKOUT } from 'routes'

const ChooseProcedure = React.lazy(
  () => import('pages/choose-procedure')
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

const Schedule = () => {
  
  return (
    <>
        <Switch>
          <Route exact path={SCHEDULE} component={ChooseProcedure} />
          <Route path={CHOOSE_PROFESSIONAL} component={ChooseProfessional} />
          <Route path={CHOOSE_DATE} component={ChooseDate} />
          <Route path={CHECKOUT} component={Checkout} />
        </Switch>
    </>
  )
}

export default Schedule
