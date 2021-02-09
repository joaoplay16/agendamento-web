import React, { createContext, useState } from 'react'
import t from 'prop-types'
const ShoppingCartContext = createContext()

function ShoppingCartProvider ({ children }) {
  const [schedules, addSchedule] = useState(() => [])
  const [paymentDetails, setPaymentDetails] = useState(() => ({}))

  function addScheduleToShoppingCart (schedule) {
    addSchedule((schedules) => schedules.concat(schedule))
  }

  function removeScheduleFromShoppingCart(scheduleToRemove){
    addSchedule((schedules) => schedules.filter(item => item !== scheduleToRemove))
  }

  function setPaymentStatusDetails (paymentStatusDetails) {
    setPaymentDetails(paymentStatusDetails)
  }

  return (
    <ShoppingCartContext.Provider value={{
      schedules,
      addScheduleToShoppingCart,
      removeScheduleFromShoppingCart,
      paymentDetails,
      setPaymentStatusDetails
    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

ShoppingCartProvider.propTypes = {
  children: t.node.isRequired
}

export { ShoppingCartProvider, ShoppingCartContext }
