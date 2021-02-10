import React , { useEffect}from 'react'
import styled from 'styled-components'
import { Button, Grid, TextField } from '@material-ui/core'
import { useAuth, useDatabase } from 'hooks'
import { Content } from 'ui'
function Dashboard () {
  // const { login } = useAuth()
  const { schedules, fetchSchedules } = useDatabase()

  useEffect(()=> {
    fetchSchedules()
  }, [])
  return (
   <Content>
      {schedules.length > 0 && schedules.map(schedule => (
        <p>{schedule.paymentInfo.id}  {schedule.paymentInfo.description} {` -->> `} {schedule.paymentInfo.status}</p>
      ))}
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

export default Dashboard
