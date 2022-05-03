import React, { createContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import firebase from 'services/firebase'

const AdminAuthContext = createContext()

function AdminAuthProvider ({ children }) {
  const [adminInfo, setAdminInfo] = useState({
    isUserLoggedIn: false,
    user: null
  })

  const login = useCallback((email, pass) => {
    console.log(email, pass)
    firebase.auth()
      .signInWithEmailAndPassword(email, pass)
      .then((user) => {
        setAdminInfo({
          isUserLoggedIn: !!user,
          user
        })
        console.log('USUARIO ', user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        console.log('ERRO ADMIN LOGIN ', errorCode, errorMessage)
      })
  }, [])

  const createUser = useCallback((email, pass) => {
    firebase.auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((user) => {
        setAdminInfo({
          isUserLoggedIn: !!user,
          user
        })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        console.log('ERRRO CRIAR USER ', errorCode, errorMessage)
      })
  }, [])

  const logout = useCallback(() => {
    firebase.auth()
      .signOut()
      .then(() => {
        console.log('o cara deslogou')
        setAdminInfo({
          isUserLoggedIn: false,
          user: null
        })
      })
  }, [])

  return (
    <AdminAuthContext.Provider
      value={{
        login,
        logout,
        createUser,
        adminInfo,
        setAdminInfo
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

AdminAuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export { AdminAuthProvider, AdminAuthContext }
