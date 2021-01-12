import React, {
  createContext,
  useCallback,
  useState
} from 'react'
import PropTypes from 'prop-types'
import firebase from 'services/firebase'

const AuthContext = createContext()

function AuthProvider ({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  const login = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
    console.log('login')
  }, [])

  const logout = useCallback(() => {
    firebase.auth().signOut().then(() => {
      console.log('o cara deslogou')
      setUserInfo({
        isUserLoggedIn: false,
        user: null
      })
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      userInfo,
      setUserInfo
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { AuthProvider, AuthContext }
