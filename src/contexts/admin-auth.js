import React, { createContext, useState } from "react"
import PropTypes from "prop-types"
import { getAdminToken, adminTokenLogin } from "services/admin-authentication"
const AdminAuthContext = createContext()

const ADMIN_TOKEN = "adminToken"

function AdminAuthProvider({ children }) {
  const [adminInfo, setAdminInfo] = useState({
    isLoggedIn: false,
  })

  const login = (email, pass) => {
    verifyAdminIsLoggedIn()

    //if admin is not authenticated, authenticate and get a new token
    if (!adminInfo.isLoggedIn) {
      getAdminToken({ email: email, password: pass })
        .then((response) => {
          setAdminInfo({ isLoggedIn: true })

          const { token } = response.data
          localStorage.setItem(ADMIN_TOKEN, token)
        })
        .catch((error) => {
          console.log("login error", error)
        })
    }
  }

  const loginWithToken = (token) => {
    adminTokenLogin({ token })
      .then((response) => {
        if (response.status == 200) {
          setAdminInfo({ isLoggedIn: true })
        }
      })
      .catch((error) => {
        console.log("loginWithToken error", error)
        setAdminInfo({ isLoggedIn: false })
      })
  }

  const verifyAdminIsLoggedIn = () => {
    const token = localStorage.getItem(ADMIN_TOKEN)

    if (!token) {
      setAdminInfo({ isLoggedIn: false })
    } else {
      setAdminInfo({ isLoggedIn: true })
      loginWithToken(token)
    }
  }

  const logout = () => {}
  window.location.logout = logout

  return (
    <AdminAuthContext.Provider
      value={{
        login,
        logout,
        adminInfo,
        verifyAdminIsLoggedIn,
      }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

AdminAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AdminAuthProvider, AdminAuthContext }
