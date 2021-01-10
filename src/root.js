import React from 'react'
import { hot } from 'react-hot-loader'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core'
import { AuthProvider, ShoppingCartProvider, ApplicationProvider } from 'contexts'
import App from './app'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
})

console.log('theme', theme)

const Root = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ShoppingCartProvider>
            <ApplicationProvider>
              <CssBaseline />
              <GlobalStyle />
              <BrowserRouter>
                <Route component={App} />
              </BrowserRouter>
            </ApplicationProvider>
          </ShoppingCartProvider>
        </AuthProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  #root{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`

export default hot(module)(Root)
