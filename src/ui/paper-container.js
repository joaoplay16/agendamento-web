import styled from 'styled-components'
import { Paper } from '@material-ui/core'

const PaperContainer = styled(Paper)`
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export default PaperContainer
