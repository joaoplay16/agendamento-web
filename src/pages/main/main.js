import React, { Suspense } from "react"
import { withStyles } from "@material-ui/core"
import Header from "./header"
import { Outlet } from "react-router-dom"
import { Footer } from "ui"

const Main = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Suspense fallback="Loading">
        <Outlet />
      </Suspense>
      <Spacer />
      <Footer />
    </>
  )
}

const style = (theme) => ({
  main: theme.mixins.toolbar,
})

const Spacer = withStyles(style)(({ classes }) => (
  <div className={classes.main} />
))

export default Main
