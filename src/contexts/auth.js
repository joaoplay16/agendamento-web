import React, {
  createContext,
  useState
} from 'react'
import PropTypes from 'prop-types'
import { auth } from 'services/firebase'
import { 
  signInWithRedirect, 
  signOut,
  GoogleAuthProvider } from 'firebase/auth'

const AuthContext = createContext()

function AuthProvider ({ children }) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  const login = () => {
    const provider = new GoogleAuthProvider()
    signInWithRedirect(auth, provider)
  }

  const logout = () => {
     signOut(auth).then(() => {
      console.log('o cara deslogou')
      setUserInfo({
        isUserLoggedIn: false,
        user: null
      })
    })
  }

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
