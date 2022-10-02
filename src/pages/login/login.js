import React from "react"
import styled from "styled-components"
import { Grid } from "@material-ui/core"
import { useAuth } from "hooks"
import { Content, PaperContainer } from "ui"
import { VisitorIcon, GoogleIcon } from "icons"
function Login() {
  const { login } = useAuth()

  return (
    <Content container alignItems="center" justifyContent="center">
      <PaperContainer>
        <Grid item container justifyContent="center" direction="column">
          <Greeting>
            <img src={VisitorIcon} alt="visitor icon" />
            <h1>Olá, <span>visitante!</span></h1>
          </Greeting>
          <GitHubButton onClick={login}>
            <img src={GoogleIcon} alt="google icon" />
           <span>Login com Google</span> 
          </GitHubButton>
        </Grid>
      </PaperContainer>
    </Content>
  )
}

const GitHubButton = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;
  justify-content: center;
  align-items: center;

  background-color: #efecef;
  padding: 12px;
  max-width: 280px;
  border-radius: 30px;
  cursor: pointer;

  span {
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    font-weight: bold;
    color: #343434;
  }

  img {
    width: 38px;
    height: 38px;
  }
`

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;

  h1 {
    margin-top: 10px;
    margin-bottom: 0px;
    text-align: center;
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
  }

  h1 span {
    color: rgb(92 69 191 / 90%);
  }

  img{
    width: 280px;
    height: 280px;
  }
`

export default Login
