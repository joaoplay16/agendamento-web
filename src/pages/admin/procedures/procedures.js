import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  ADMIN_PROCEDURES_ADD,
  ADMIN_PROCEDURES_UPDATE
} from 'routes'

const ProceduresList = React.lazy(() =>
  import('pages/admin/procedures/procedures-list')
)
const AddProcedure = React.lazy(() =>
  import('pages/admin/procedures/add')
)
const UpdateProcedure = React.lazy(() =>
  import('pages/admin/procedures/update')
)

function Procedures () {
  return (
    <Routes>
      <Route index element={<ProceduresList/>} />
      <Route path={ADMIN_PROCEDURES_ADD} element={<AddProcedure/>} />
      <Route path={ADMIN_PROCEDURES_UPDATE} element={<UpdateProcedure/>} />
    </Routes>
  )
}

export default Procedures
