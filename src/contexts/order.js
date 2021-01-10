import React, { createContext, useState } from 'react'
import t from 'prop-types'
const ShoppingCartContext = createContext()

function ShoppingCartProvider ({ children }) {
  const [schedules, addSchedule] = useState([])

  function addScheduleToShoppingCart (schedule) {
    addSchedule((schedules) => schedules.concat(schedule))
  }

  function removeScheduleFromShoppingCart(){
    
  }

  return (
    <ShoppingCartContext.Provider value={{
      schedules,
      addScheduleToShoppingCart
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

ShoppingCartProvider.propTypes = {
  children: t.node.isRequired
}

export { ShoppingCartProvider, ShoppingCartContext }
