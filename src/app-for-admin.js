import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import { auth } from 'services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ADMIN, ADMIN_LOGIN } from 'routes'
import { useAdminAuth } from 'hooks'

const Main = lazy(() => import('pages/admin/main'))
const AdminLogin = React.lazy(
  () => import('pages/admin/login')
)

function AppForAdmin ({ location }) {
  const { adminInfo, setAdminInfo } = useAdminAuth()
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)
  const { isAdminUserLoggedIn } = adminInfo

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAdminInfo({
        isAdminUserLoggedIn: !!user,
        // isUserLoggedIn: true,
        user
      })
      setDidCheckUserIn(true)
    })
  }, [setAdminInfo])

  if (!didCheckUserIn) {
    return <LinearProgress />
  }

  if (isAdminUserLoggedIn && location.pathname === ADMIN_LOGIN) {
    return <Redirect to={ADMIN} />
  }

  if (!isAdminUserLoggedIn && location.pathname !== ADMIN_LOGIN) {
    return <Redirect to={ADMIN_LOGIN} />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={ADMIN_LOGIN} component={AdminLogin} />
        <Route component={Main} />
      </Switch>
    </Suspense>
  )
}

AppForAdmin.propTypes = {
  location: PropTypes.object.isRequired
}

export default AppForAdmin
