import { useContext } from 'react'
import { AdminAuthContext } from 'contexts'

function useAdminAuth () {
  return useContext(AdminAuthContext)
}

export default useAdminAuth
