import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Button,
  Chip,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  ListItem,
  ListItemText
} from '@material-ui/core'
import weekDays from 'static-data/week-days'
import hours from 'static-data/hours'
import { Content, PaperContainer, TextField, H5 } from 'ui'
import { Route, Switch } from 'react-router-dom'
import { ADMIN_PROFESSIONALS, ADMIN_PROFESSIONALS_ADD } from 'routes'

const ProfessionalsList = React.lazy(() =>
  import('pages/admin/professionals/main')
)
const AddProfessional = React.lazy(() =>
  import('pages/admin/professionals/add')
)

function Professionals () {
  return (
    <Switch>
      <Route exact path={ADMIN_PROFESSIONALS} component={ProfessionalsList} />
      <Route path={ADMIN_PROFESSIONALS_ADD} component={AddProfessional} />
    </Switch>
  )
}


export default Professionals
