import React from 'react'
import PropTypes from 'prop-types'
import { ADMIN } from 'routes'
import AppForUsers from './app-for-users'
import AppForAdmin from './app-for-admin'
import pathStartWith from 'utils/path-comparator'

function App (props) {
  const currentPathname = props.location.pathname
  if(pathStartWith(ADMIN, currentPathname)){
    return (<AppForAdmin {...props}/>)
  }
  return (<AppForUsers {...props}/>)
}

App.propTypes = {
  location: PropTypes.object.isRequired
}

export default App
