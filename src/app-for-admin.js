import React, { Suspense, lazy, useEffect, useState } from "react"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import { LinearProgress } from "@material-ui/core"
import { auth } from "services/firebase"
import { onAuthStateChanged } from "firebase/auth"
import {
  adminNavigationRoutes as navRoutes,
  ADMIN
} from "routes"
import { useAdminAuth } from "hooks"

const Main = lazy(() => import("pages/admin/main"))

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
          <Route path={`${ADMIN}/*`} element={<Main />} />
      </Routes>
    </Suspense>
  )
}

export default AppForAdmin
