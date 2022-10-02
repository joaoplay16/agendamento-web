import { Grid } from '@material-ui/core'
import styled from 'styled-components'

const Content = styled(Grid)`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(3)}px;
  height: 100vh;
`
export default Content
