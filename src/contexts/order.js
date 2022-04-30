import t from 'prop-types'
import React, { createContext, useState, useEffect } from 'react'
const ShoppingCartContext = createContext()

function ShoppingCartProvider ({ children }) {
  const [schedules, addSchedule] = useState(() => {
    const items = localStorage.getItem('schedules')
    if (items !== null) {
      return JSON.parse(items)
    }
    localStorage.setItem('schedules', JSON.stringify([]))
    return []
  })

  const [paymentDetails, setPaymentDetails] = useState(() => ({}))

  function addScheduleToShoppingCart (schedule) {
    addSchedule((schedules) => {
      const items = schedules.concat(schedule)
      localStorage.setItem('schedules', JSON.stringify(items))
      return items
    })
  }

  function removeScheduleFromShoppingCart (scheduleToRemove) {
    addSchedule((schedules) => {
      const items = schedules.filter((item) => item !== scheduleToRemove)
      localStorage.setItem('schedules', JSON.stringify(items))
      return items
    })
  }

  function resetShoppingCart () {
    addSchedule([])
    localStorage.setItem('schedules', JSON.stringify([]))
  }

  function setPaymentStatusDetails (paymentStatusDetails) {
    setPaymentDetails(paymentStatusDetails)
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        schedules,
        addScheduleToShoppingCart,
        removeScheduleFromShoppingCart,
        paymentDetails,
        setPaymentStatusDetails,
        resetShoppingCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

ShoppingCartProvider.propTypes = {
  children: t.node.isRequired
}

export { ShoppingCartProvider, ShoppingCartContext }
