import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Route, Switch, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import firebase from 'services/firebase'
import { CHECKOUT, HOME, LOGIN } from 'routes'
import { useAuth } from 'hooks'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

function AppForUsers ({ location }) {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useAuth()
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)
  const { isUserLoggedIn } = userInfo

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUserInfo({
        isUserLoggedIn: !!user,
        // isUserLoggedIn: true,
        user: user && {
          ...user,
          firstName: user.displayName.split(' ')[0]
        }
      })
      setDidCheckUserIn(true)
    })
  }, [setUserInfo])

  if (!didCheckUserIn) {
    return <LinearProgress />
  }

  if (isUserLoggedIn && location.pathname === LOGIN) {
    navigate(CHECKOUT)
  }

  if (!isUserLoggedIn && location.pathname == CHECKOUT) {
    navigate(LOGIN)
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  )
}

AppForUsers.propTypes = {
  location: PropTypes.object.isRequired
}

export default AppForUsers
