import React, { createContext, useState, useEffect } from 'react'
import t from 'prop-types'
import {
  Home as HomeIcon,
  Event as EventIcon,
  AddBox as AddBoxIcon,
  MoreHoriz as MoreHorizIcon
} from '@material-ui/icons'
import { navigationRoutes as navRoutes} from 'routes'
const ApplicationContext = createContext()

function ApplicationProvider ({ children }) {
  useEffect(() => {
    // console.log("ApplicationContext", location)
  })

  const items = [
    {
      label: 'Home',
      icon: <HomeIcon />,
      to: { pathname: "/" }
    },
    {
      label: 'Reservas',
      icon: <EventIcon />,
      to: { pathname: navRoutes.RESERVATIONS }
    },
    {
      label: 'Agendar',
      icon: <AddBoxIcon />,
      to: { pathname: navRoutes.SCHEDULE }
    },
    {
      label: 'Mais',
      icon: <MoreHorizIcon />,
      to: { pathname: navRoutes.MORE }
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
