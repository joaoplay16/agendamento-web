import React, { Suspense } from 'react'
import {
  withStyles,
  CircularProgress
} from '@material-ui/core'
import ResponsiveDrawer from 'pages/admin/main/drawer'
import { Routes, Route } from 'react-router-dom'
import { ADMIN_PROFESSIONALS, ADMIN_PROCEDURES, ADMIN_SETTINGS } from 'routes'

const Dashboard = React.lazy(
  () => import('pages/admin/dashboard')
)
const Procedures = React.lazy(
  () => import('pages/admin/procedures')
)
const Professionals = React.lazy(
  () => import('pages/admin/professionals')
)
const Settings = React.lazy(
  () => import('pages/admin/settings')
)

const Main = () => {
  return (
    <>
      <ResponsiveDrawer>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path={`${ADMIN_PROCEDURES}/*`} element={<Procedures/>} />
            <Route path={ADMIN_SETTINGS} element={<Settings/>} />
            <Route path={`${ADMIN_PROFESSIONALS}/*`} element={<Professionals/>} />
          </Routes>
        </Suspense>
      </ResponsiveDrawer>
    </>
  )
}

const style = (theme) => ({
  main: theme.mixins.toolbar
})

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))

export default Main
