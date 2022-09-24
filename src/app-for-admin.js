import React, { Suspense, lazy, useEffect, useState } from "react"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import { LinearProgress } from "@material-ui/core"
import { adminNavigationRoutes as navRoutes, ADMIN, ADMIN_LOGIN } from "routes"
import { useAdminAuth } from "hooks"

const Main = lazy(() => import("pages/admin/main"))
const AdminLogin = React.lazy(() => import("pages/admin/login"))

function AppForAdmin() {
  const location = useLocation()

  const { adminInfo, verifyAdminIsLoggedIn } = useAdminAuth()
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)
  const isLoggedIn = adminInfo.isLoggedIn

  useEffect(() => {
    verifyAdminIsLoggedIn()

  }, [])
  
  useEffect(() => {
    setDidCheckUserIn(true)
  }, [isLoggedIn])

  useEffect(() => {
    console.log("admin logged? ", adminInfo.isLoggedIn)
  }, [isLoggedIn])

  useEffect(() => {
    console.log("didCheckUserIn? ", didCheckUserIn)
  }, [didCheckUserIn])

  if (didCheckUserIn == false) {
    return <LinearProgress />
  }

  if (isLoggedIn && location.pathname === navRoutes.ADMIN_LOGIN) {
    return <Navigate to={navRoutes.ADMIN} />
  }

  if (!isLoggedIn && location.pathname !== navRoutes.ADMIN_LOGIN) {
    return <Navigate to={navRoutes.ADMIN_LOGIN} />
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path={`${ADMIN}/${ADMIN_LOGIN}`} element={<AdminLogin />} />
        <Route path={`${ADMIN}/*`} element={<Main />} />
      </Routes>
    </Suspense>
  )
}

export default AppForAdmin
