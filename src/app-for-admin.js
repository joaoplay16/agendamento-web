import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import firebase from 'services/firebase'
import { HOME, LOGIN, ADMIN_LOGIN } from 'routes'
import { useAuth } from 'hooks'

const Main = lazy(() => import('pages/admin/main'))
const AdminLogin = React.lazy(
  () => import('pages/admin/login')
)


function AppForAdmin ({ location }) {

  useEffect(() => {
  
  }, [])

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route component={Main} />
        <Route path={ADMIN_LOGIN} component={AdminLogin} />
      </Switch>
    </Suspense>
  )
}

AppForAdmin.propTypes = {
  location: PropTypes.object.isRequired
}

export default AppForAdmin
