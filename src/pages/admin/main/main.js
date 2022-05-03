import React, { Suspense } from 'react'
import {
  withStyles,
  CircularProgress
} from '@material-ui/core'
import ResponsiveDrawer from 'pages/admin/main/drawer'
import { Switch, Route } from 'react-router-dom'
import { ADMIN, ADMIN_PROFESSIONALS, ADMIN_PROCEDURES, ADMIN_SETTINGS } from 'routes'

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
          <Switch>
            <Route exact path={ADMIN} component={Dashboard} />
            <Route path={ADMIN_PROCEDURES} component={Procedures} />
            <Route path={ADMIN_SETTINGS} component={Settings} />
            <Route path={ADMIN_PROFESSIONALS} component={Professionals} />
          </Switch>
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
