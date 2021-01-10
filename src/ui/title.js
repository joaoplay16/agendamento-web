import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
const Title = styled(Typography).attrs(({ align }) => ({
  gutterBottom: true, // margin-bottom
  align: align !== undefined ? align : 'center'
}))``
export const H1 = (props) => <Title variant='h1' {...props} />
export const H2 = (props) => <Title variant='h2' {...props} />
export const H3 = (props) => <Title variant='h3' {...props} />
export const H4 = (props) => <Title variant='h4' {...props} />
export const H5 = (props) => <Title variant='h5' {...props} />
export const H6 = (props) => <Title variant='h6' {...props} />

export default Title
