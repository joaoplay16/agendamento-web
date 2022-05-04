import t from 'prop-types'
import React, { createContext, useState } from 'react'
const ShoppingCartContext = createContext()

function ShoppingCartProvider ({ children }) {
  const [schedules, addSchedule] = useState(() => {
    let items = localStorage.getItem('schedules')
    
    if (items !== null) {
      const schedulesObj = JSON.parse(items).map( item => ({
        ...item,
        selectedDate: new Date(item.selectedDate)
      }))
      return schedulesObj
    }
    localStorage.setItem('schedules', JSON.stringify([]))
    return []
  })

  const [paymentDetails, setPaymentDetails] = useState(() => ({}))

  function addScheduleToShoppingCart (schedule) {
    addSchedule((schedules) => {
      const items = schedules.concat({
        ...schedule,
        selectedDate: new Date(schedule.selectedDate).toISOString()
      })
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
