import React, {
  createContext,
  useCallback,
  useEffect,
  useState
} from 'react'
import PropTypes from 'prop-types'
import firebase from 'services/firebase'

const DatabaseContext = createContext()

function DatabaseProvider ({ children }) {
  const db = firebase.firestore()
  const [procedures, setProcedures] = useState(() => [])
  const [professionals, setProfessionals] = useState(() => {})

  const fetchProcedures = useCallback(() => {
    db.collection('admin/scheduling/procedures')
      .get().then(querySnapshot => {
        let procedures = querySnapshot.docs.map(doc => doc.data())
        setProcedures(procedures)
      })
  }, [])

  const fetchProfessionals = useCallback(() => {
    db.collection('admin/scheduling/professionals')
      .get().then(querySnapshot => {
        let objects = {}
        querySnapshot.forEach(doc => {
          Object.assign(objects, {
            [doc.id]: doc.data()
          })
        })
        setProfessionals(objects)
      })
  }, [])

  return (
    <DatabaseContext.Provider value={{
      procedures,
      fetchProcedures,
      professionals,
      fetchProfessionals
    }}
    >
      {children}
    </DatabaseContext.Provider>
  )
}

DatabaseProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { DatabaseProvider, DatabaseContext }
