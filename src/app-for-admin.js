import React, { Suspense, lazy, useEffect, useState } from "react"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import { LinearProgress } from "@material-ui/core"
import { auth } from "services/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { adminNavigationRoutes as navRoutes, ADMIN, ADMIN_LOGIN } from "routes"
import { useAdminAuth } from "hooks"

const Main = lazy(() => import("pages/admin/main"))
const AdminLogin = React.lazy(() => import("pages/admin/login"))

function AppForAdmin() {
  const location = useLocation()

  const { adminInfo, setAdminInfo } = useAdminAuth()
  const [didCheckUserIn, setDidCheckUserIn] = useState(false)
  const { isAdminUserLoggedIn } = adminInfo

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAdminInfo({
        isAdminUserLoggedIn: !!user,
        // isUserLoggedIn: true,
        user,
      })
      setDidCheckUserIn(true)
    })
  }, [setAdminInfo])
  useEffect(() => {
    console.log("admin logged? ", isAdminUserLoggedIn)
  }, [isAdminUserLoggedIn])

  if (!didCheckUserIn) {
    return <LinearProgress />
  }

  if (isAdminUserLoggedIn && location.pathname === navRoutes.ADMIN_LOGIN) {
    return <Navigate to={navRoutes.ADMIN} />
  }

  if (!isAdminUserLoggedIn && location.pathname !== navRoutes.ADMIN_LOGIN) {
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
