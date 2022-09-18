import React from 'react'
import { ADMIN } from 'routes'
import AppForUsers from './app-for-users'
import AppForAdmin from './app-for-admin'
import pathStartWith from 'utils/path-comparator'
import { AdminAuthProvider } from 'contexts'
import { useLocation } from 'react-router'

function App (props) {
  const currentPathname = useLocation().pathname
  console.log("currentPathname = ", currentPathname);
  if (pathStartWith(ADMIN, currentPathname)) {
    return (
      <AdminAuthProvider>
        <AppForAdmin {...props} />
      </AdminAuthProvider>
    )
  }
  return <AppForUsers {...props} />
}

export default App
