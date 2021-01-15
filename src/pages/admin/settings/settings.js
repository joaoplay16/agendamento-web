import React from 'react'
import styled from 'styled-components'
import { Button, Grid, TextField } from '@material-ui/core'
import { useAuth } from 'hooks'
import { Content } from 'ui'
function Settings () {
  // const { login } = useAuth()
  return (
   <Content>
      <h1>Configurações</h1>
   </Content>
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

export default Settings
