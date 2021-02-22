import React, { useState } from "react"
import styled from "styled-components"
import { Button, Grid, TextField } from "@material-ui/core"
import { useAdminAuth } from "hooks"
function Login() {
  const { login, createUser } = useAdminAuth()

  const [adminUser, setAdminUser] = useState({
    name: "",
    pass: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const pass = e.target.pass.value

    login(email, pass)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container justify="center" spacing={5}>
          <Grid item xs={12} container>
            <TextField label="Usuário" variant="outlined" id="email" type='email' />
            <TextField
              label="Senha"
              variant="outlined"
              id="pass"
              type="password"
            />
            <LoginButton type='submit'>Entrar</LoginButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;
`
// const Logo = styled(MainLogo)`
//   width: 100%;
// `
const LoginButton = styled(Button).attrs({
  variant: "contained",
  fullWidth: true,
})`
  && {
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    max-width: 480px;
    padding: ${({ theme }) => theme.spacing(2)};
    text-transform: none;
  }
`

export default Login
