import styled from 'styled-components'
import { Button as MaterialButton } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Button = styled(MaterialButton).attrs({
  component: Link
})`
 
`
export default Button
