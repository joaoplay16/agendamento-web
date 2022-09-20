import React, { Suspense, lazy, useEffect, useState } from "react"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import { LinearProgress } from "@material-ui/core"
import { auth } from "services/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { navigationRoutes as navRoutes, CHECKOUT, LOGIN, RESERVATIONS, SCHEDULE, MORE } from "routes"
import { useAuth } from "hooks"

const MainPage = lazy(() => import("pages/main"))
const Login = lazy(() => import("pages/login"))
const Scheduling = React.lazy(() => import("pages/scheduling"))
const Reservations = React.lazy(() => import("pages/reservations"))
const Schedule = React.lazy(() => import("pages/schedule"))

function AppForUsers() {
  const location = useLocation()

  const { userInfo, setUserInfo } = useAuth()
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)
  const { isUserLoggedIn } = userInfo

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo({
        isUserLoggedIn: user != null,
        user: user && {
          ...user,
          firstName: user.displayName?.split(" ")[0],
        },
      })
      setDidCheckUserIn(true)
    })
  }, [])

  useEffect(() => {
    localStorage.setItem(
      "currentUserId",
      isUserLoggedIn ? userInfo.user?.uid : "guest"
    )
    console.log("pathname ", location.pathname);
  }, [isUserLoggedIn])

  if (!didCheckUserIn) {
    return <LinearProgress />
  }

  if (isUserLoggedIn && location.pathname === navRoutes.LOGIN) {
    return <Navigate to={navRoutes.CHECKOUT} />
  }

  if (!isUserLoggedIn && location.pathname === navRoutes.CHECKOUT) {
    return <Navigate to={navRoutes.LOGIN} />
  }

  if (!isUserLoggedIn && location.pathname === navRoutes.RESERVATIONS) {
    return <Navigate to={navRoutes.LOGIN} />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path={'/'} element={<MainPage />}>
          <Route path={'/'} element={<Scheduling/>}/>
          <Route path={`${SCHEDULE}/*`} element={<Schedule/>}/>
          <Route path={RESERVATIONS} element={<Reservations/>}/>
          <Route path={MORE} element={<Navigate to={'/'}/>}/>
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  )
}

export default AppForUsers
