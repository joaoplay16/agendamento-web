import React, { useState } from "react"
import styled from "styled-components"
import { Button, Grid, TextField, Paper } from "@material-ui/core"
import { useAdminAuth } from "hooks"
import { H4 } from "ui"
function Login() {
  const { login } = useAdminAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const pass = e.target.pass.value

    login(email, pass)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container container justifyContent="center" alignItems="center">
        <Paper style={{ 
          paddingTop: 60,
          paddingBottom: 60,
          paddingLeft: 100,
          paddingRight: 100 
          }}>
          <Grid container spacing={2} direction="column">
            <H4>Painel de controle</H4>
            <Grid item>
              <TextField
                id="email"
                label="Usuário"
                variant="outlined"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                id="pass"
                label="Senha"
                variant="outlined"
                type="password"
                fullWidth
              />
            </Grid>
            <Grid item>
              <LoginButton
                variant="contained"
                color="secondary"
                type="submit"
                fullWidth>
                Entrar
              </LoginButton>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </form>
  )
}

const Container = styled(Grid)`
  height: 100vh;
`
// const Logo = styled(MainLogo)`
//   width: 100%;
// `
const LoginButton = styled(Button).attrs({
  variant: "contained",
  fullWidth: true,
})`
  && {
    /* font-size: ${({ theme }) => theme.typography.h6.fontSize}; */
    padding: ${({ theme }) => theme.spacing(2)};
    text-transform: none;
  }
`

export default Login
