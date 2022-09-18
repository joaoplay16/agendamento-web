import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
    <Routes>
      <Route path={ADMIN_PROFESSIONALS} element={<ProfessionalsList/>} />
      <Route path={ADMIN_PROFESSIONALS_ADD} element={<AddProfessional/>} />
      <Route path={ADMIN_PROFESSIONALS_UPDATE} element={<UpdateProfessional/>} />
    </Routes>
  )
}

export default Professionals
