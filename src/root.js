import React from 'react'
import { hot } from 'react-hot-loader'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'
import {
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider
} from '@material-ui/core'
import { AuthProvider, DatabaseProvider, ShoppingCartProvider, ApplicationProvider } from 'contexts'
import App from './app'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      contrastText: '#fff',
      dark: '#560027',
      light: '#bc477b',
      main: '#880e4f'
    },
    secondary: {
      contrastText: '#fff',
      dark: '#78002e',
      light: '#e35083',
      main: '#ad1357'
    }
  }
})

console.log('theme', theme)

const Root = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <DatabaseProvider>
            <ShoppingCartProvider>
              <ApplicationProvider>
                <CssBaseline />
                <GlobalStyle />
                <BrowserRouter>
                  <Route component={App} />
                </BrowserRouter>
              </ApplicationProvider>
            </ShoppingCartProvider>
          </DatabaseProvider>
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
