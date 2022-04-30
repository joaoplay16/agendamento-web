import React, { createContext, useState, useEffect } from 'react'
import t from 'prop-types'
import {
  Home as HomeIcon,
  Event as EventIcon,
  AddBox as AddBoxIcon,
  MoreHoriz as MoreHorizIcon
} from '@material-ui/icons'
import { HOME, RESERVATIONS, SCHEDULE, MORE } from 'routes'
const ApplicationContext = createContext()

function ApplicationProvider ({ children }) {
  useEffect(() => {
    // console.log("ApplicationContext", location)
  })

  const items = [
    {
      label: 'Home',
      icon: <HomeIcon />,
      to: { pathname: HOME }
    },
    {
      label: 'Reservas',
      icon: <EventIcon />,
      to: { pathname: RESERVATIONS }
    },
    {
      label: 'Agendar',
      icon: <AddBoxIcon />,
      to: { pathname: SCHEDULE }
    },
    {
      label: 'Mais',
      icon: <MoreHorizIcon />,
      to: { pathname: MORE }
    }
  ]
  const [toolbarItems] = useState(items)

  return (
    <ApplicationContext.Provider value={{
      appState: { toolbarItems }
    }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}

ApplicationProvider.propTypes = {
  children: t.node.isRequired
}

export { ApplicationProvider, ApplicationContext }
