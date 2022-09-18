import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import { auth } from 'services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { CHECKOUT, LOGIN, RESERVATIONS } from 'routes'
import { useAuth } from 'hooks'

const MainPage = lazy(() => import('pages/main'))
const Login = lazy(() => import('pages/login'))

function AppForUsers () {

  const location = useLocation()
  const { userInfo, setUserInfo } = useAuth()
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)
  const { isUserLoggedIn } = userInfo
  
  useEffect(() => {
   onAuthStateChanged(auth, (user) => {

      setUserInfo({
        isUserLoggedIn: !!user,
        user: user && {
          ...user,
          firstName: user.displayName.split(' ')[0]
        }
      })
      setDidCheckUserIn(true)
    })
    
  }, [])

  useEffect(()=>{
    localStorage.setItem("currentUserId", isUserLoggedIn ? userInfo.user?.uid : "guest")
  },[isUserLoggedIn])

  if (!didCheckUserIn) {
    return <LinearProgress />
  }

  if (isUserLoggedIn && location.pathname === LOGIN) {
    return <Navigate to={CHECKOUT} />
  }

  if (!isUserLoggedIn && location.pathname === CHECKOUT) {
    return <Navigate to={LOGIN} />
  }

  if (!isUserLoggedIn && location.pathname === RESERVATIONS) {
    return <Navigate to={LOGIN} />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path={LOGIN} element={<Login/>} />
        <Route index element={<MainPage/>} />
      </Routes>
    </Suspense>
  )
}

AppForUsers.propTypes = {
  location: PropTypes.object.isRequired
}

export default AppForUsers
