import t from "prop-types"
import React, { createContext, useState } from "react"
import { v4 } from "uuid"
const ShoppingCartContext = createContext()

function ShoppingCartProvider({ children }) {
  const [paymentDetails, setPaymentDetails] = useState(() => ({}))

  const [schedules, setSchedules] = useState([])
    /* 
    Retrieve the scheduling data in localStorage.
    if it is the user's first login, copies the pre-login scheduling data
    to the storage of the currently logged-in user.
  */
  function fetchLocalSchedules() {
    const userSchedules =
      JSON.parse(localStorage.getItem(getStoredUserId("currentUserId"))) || []
    //schedules data before the user login
    const guestSchedules = JSON.parse(getStoredUserId("guest")) || []

    //if userSchedules doesn't have any items, use guestSchedules
    const items = userSchedules.length === 0 ? guestSchedules : userSchedules

    const schedulesObj = items.map((item) => ({
      ...item,
      selectedDate: new Date(item.selectedDate),
    }))

     //To keep schedules state updated
    userSchedules.length === 0
      // stores in the localStorage and updates the state
      ? saveInLocalStorage(schedulesObj) 
      : setSchedules(schedulesObj) // updates the state

    //clear previous scheduling data before user login
    localStorage.setItem("guest", JSON.stringify([]))
  }

  function addScheduleToShoppingCart(schedule) {
    const items = schedules?.concat({
      localId: v4(),
      ...schedule,
      selectedDate: new Date(schedule.selectedDate).toISOString(),
    })
    saveInLocalStorage(items)
  }

  function removeScheduleFromShoppingCart(scheduleToRemove) {
    const items = schedules?.filter((item) => {
      return item.localId !== scheduleToRemove.localId
    })
    saveInLocalStorage(items)
  }

  function resetShoppingCart() {
    saveInLocalStorage([])
  }

  function setPaymentStatusDetails(paymentStatusDetails) {
    setPaymentDetails(paymentStatusDetails)
  }

  //saves in localStorage and update the state
  function saveInLocalStorage(items) {
    setSchedules(items)
    localStorage.setItem(
      //it can be the id of the logged-in user or the "guest" id
      getStoredUserId("currentUserId"),
      JSON.stringify(items)
    )
  }

  function getStoredUserId(key) {
    return localStorage.getItem(key)
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        schedules,
        fetchLocalSchedules,
        addScheduleToShoppingCart,
        removeScheduleFromShoppingCart,
        paymentDetails,
        setPaymentStatusDetails,
        resetShoppingCart,
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

ShoppingCartProvider.propTypes = {
  children: t.node.isRequired,
}

export { ShoppingCartProvider, ShoppingCartContext }
