import React, { Suspense } from "react"
import { withStyles } from "@material-ui/core"
import Header from "./header"
import { Outlet } from "react-router-dom"
import { Footer } from "ui"
import styled from "styled-components"
import { CrackedSurface } from "assets"

const Main = () => {
  return (
    <>
      <Header />
      <Spacer />
      <Suspense fallback="Loading">
        <Background>
          <Outlet />
        </Background>
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

const Background = styled.main`
  height: 100vh;
  position: relative;

::before{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(${CrackedSurface});
  background-repeat: repeat;
  opacity: 0.2;
  z-index: -1;
}
`

export default Main
