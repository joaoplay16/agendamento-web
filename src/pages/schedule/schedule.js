import React from "react"
import { Routes, Route } from "react-router-dom"
import {
  CHOOSE_DATE,
  CHOOSE_PROFESSIONAL,
  CHECKOUT,
} from "routes"

const ChooseProcedure = React.lazy(() => import("pages/choose-procedure"))

const ChooseProfessional = React.lazy(() => import("pages/choose-professional"))

const ChooseDate = React.lazy(() => import("pages/choose-date"))

const Checkout = React.lazy(() => import("pages/checkout"))

const Schedule = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChooseProcedure />} />
        <Route path={CHOOSE_PROFESSIONAL} element={<ChooseProfessional/>} />
        <Route path={CHOOSE_DATE} element={<ChooseDate/>} />
        <Route path={CHECKOUT} element={<Checkout/>} />
      </Routes>
    </>
  )
}

export default Schedule
