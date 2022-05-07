import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  ADMIN_PROFESSIONALS,
  ADMIN_PROFESSIONALS_ADD,
  ADMIN_PROFESSIONALS_UPDATE
} from 'routes'

const ProfessionalsList = React.lazy(() =>
  import('pages/admin/professionals/main')
)
const AddProfessional = React.lazy(() =>
  import('pages/admin/professionals/add')
)
const UpdateProfessional = React.lazy(() =>
  import('pages/admin/professionals/update')
)

function Professionals () {
  return (
    <Switch>
      <Route exact path={ADMIN_PROFESSIONALS} component={ProfessionalsList} />
      <Route path={ADMIN_PROFESSIONALS_ADD} component={AddProfessional} />
      <Route path={ADMIN_PROFESSIONALS_UPDATE} component={UpdateProfessional} />
    </Switch>
  )
}

export default Professionals
