import React from 'react'
import styled from 'styled-components'
import { Button, Grid, TextField } from '@material-ui/core'
import { useAuth } from 'hooks'
function Login () {
  const { login } = useAuth()

  return (
    <Container>
      <Grid container justify='center' spacing={5}>
        <Grid item xs={12} container>
        <TextField
          label="Usuário"
          variant='outlined'
        />
         <TextField
          label="Senha"
          variant='outlined'
        />
          <LoginButton onClick={login}>
            Entrar
          </LoginButton>
        </Grid>
      </Grid>
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
  variant: 'contained',
  fullWidth: true
})`
  &&{
    font-size: ${({ theme }) => theme.typography.h5.fontSize};;
    max-width: 480px;
    padding: ${({ theme }) => theme.spacing(2)};
    text-transform: none;
  }
`

export default Login
