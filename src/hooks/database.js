import { useContext } from 'react'
import { DatabaseContext } from 'contexts'

function useDatabase () {
  return useContext(DatabaseContext)
}

export default useDatabase
