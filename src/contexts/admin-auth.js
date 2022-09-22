import React, { createContext, useState } from "react"
import PropTypes from "prop-types"
import { auth } from "services/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
const AdminAuthContext = createContext()

function AdminAuthProvider({ children }) {
  const [adminInfo, setAdminInfo] = useState({
    isUserLoggedIn: false,
    user: null,
  })

  const login = (email, pass) => {
    console.log(email, pass)

    signInWithEmailAndPassword(auth, email, pass)
      .then((user) => {
        setAdminInfo({
          isUserLoggedIn: !!user,
          user,
        })
        console.log("user ", user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        console.log("login error", errorCode, errorMessage)
      })
  }

  const createUser = (email, pass) => {
 
      createUserWithEmailAndPassword(auth, email, pass)
      .then((user) => {
        setAdminInfo({
          isUserLoggedIn: !!user,
          user,
        })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        console.log("error on creating user", errorCode, errorMessage)
      })
  }

  const logout = () => {
    signOut()
    .then(() => {
      console.log("admin disconnected")
      setAdminInfo({
        isUserLoggedIn: false,
        user: null,
      })
    })
  }

  return (
    <AdminAuthContext.Provider
      value={{
        login,
        logout,
        createUser,
        adminInfo,
        setAdminInfo,
      }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

AdminAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AdminAuthProvider, AdminAuthContext }
