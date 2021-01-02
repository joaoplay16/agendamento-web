import { useContext } from 'react'
import { ApplicationContext } from 'contexts'

function useApplication () {
  return useContext(ApplicationContext)
}

export default useApplication